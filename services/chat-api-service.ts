import type { ChatApiResponse, ChatHistoryItem, BotConfig, FlowState } from "../types/chat";
import { readFile } from "fs/promises";
import { join } from "path";

class WordSpottingBot {
  private config: BotConfig | null = null;
  private configPath = join(process.cwd(), "chatbot-config.json");

  /**
   * Load configuration from JSON file
   */
  private async loadConfig(): Promise<BotConfig> {
    if (!this.config) {
      try {
        const configData = await readFile(this.configPath, "utf-8");
        this.config = JSON.parse(configData);
      } catch (error) {
        console.error("Failed to load chatbot config:", error);
        // Fallback configuration
        this.config = {
          version: "1.0.0",
          defaultResponses: {
            greeting: ["Hallo! Wie kann ich dir helfen?"],
            unknown: ["Das habe ich nicht verstanden."],
            flowInterrupted: ["Du befindest dich gerade in einem Gespräch."],
            flowCancelled: ["Gespräch beendet."],
          },
          simpleKeywords: {},
          flows: {},
        };
      }
    }
    return this.config!;
  }

  /**
   * Main entry point for processing user messages
   */
  async processMessage(message: string, chatHistory: ChatHistoryItem[]): Promise<ChatApiResponse> {
    try {
      await this.loadConfig();

      const userMessage = message.trim().toLowerCase();

      // 1. Check for flow cancellation
      if (this.isFlowCancellation(userMessage)) {
        return this.handleFlowCancellation();
      }

      // 2. Check for active flow
      const currentFlow = this.extractCurrentFlow(chatHistory);
      if (currentFlow) {
        return await this.continueFlow(currentFlow, userMessage);
      }

      // 3. Check for new flow triggers
      const newFlowId = this.detectNewFlow(userMessage);
      if (newFlowId) {
        return this.startFlow(newFlowId);
      }

      // 4. Handle simple keywords
      return this.handleSimpleKeywords(userMessage);
    } catch (error) {
      console.error("Error processing message:", error);
      return {
        success: false,
        error: {
          code: "PROCESSING_ERROR",
          message: "Failed to process your message",
        },
      };
    }
  }

  /**
   * Extract current flow state from chat history
   */
  private extractCurrentFlow(chatHistory: ChatHistoryItem[]): FlowState | null {
    // Look for flow markers in recent bot messages (reverse order)
    for (let i = chatHistory.length - 1; i >= 0; i--) {
      const item = chatHistory[i];
      if (item.type === "bot") {
        const flowMatch = item.content.match(/\[FLOW_(START|CONTINUE):([^:]+):([^\]]+)\]/);
        if (flowMatch) {
          const [, , flowId, state] = flowMatch;
          return {
            flowId,
            currentState: state,
            startedAt: item.timestamp,
          };
        }

        // Check for flow end marker
        if (item.content.includes("[FLOW_END]")) {
          return null;
        }
      }
    }
    return null;
  }

  /**
   * Check if message is a flow cancellation command
   */
  private isFlowCancellation(message: string): boolean {
    const cancelKeywords = ["abbrechen", "stopp", "ende", "cancel", "quit"];
    return cancelKeywords.some((keyword) => message.includes(keyword));
  }

  /**
   * Handle flow cancellation
   */
  private handleFlowCancellation(): ChatApiResponse {
    const responses = this.config!.defaultResponses.flowCancelled;
    const message = Array.isArray(responses)
      ? responses[Math.floor(Math.random() * responses.length)]
      : responses;

    return {
      success: true,
      response: {
        content: `${message}\n\n[FLOW_END]`,
        delay: 500,
      },
    };
  }

  /**
   * Detect if message should start a new flow
   */
  private detectNewFlow(message: string): string | null {
    for (const [flowId, flow] of Object.entries(this.config!.flows)) {
      for (const keyword of flow.startKeywords) {
        if (message.includes(keyword.toLowerCase())) {
          return flowId;
        }
      }
    }
    return null;
  }

  /**
   * Start a new conversation flow
   */
  private startFlow(flowId: string): ChatApiResponse {
    const flow = this.config!.flows[flowId];
    if (!flow || !flow.states.start) {
      return this.getDefaultResponse("unknown");
    }

    const startState = flow.states.start;
    return {
      success: true,
      response: {
        content: `${startState.message}\n\n[FLOW_START:${flowId}:start]`,
        delay: 1000,
      },
    };
  }

  /**
   * Continue an existing flow
   */
  private async continueFlow(flowState: FlowState, message: string): Promise<ChatApiResponse> {
    const flow = this.config!.flows[flowState.flowId];
    if (!flow) {
      return this.getDefaultResponse("unknown");
    }

    const currentStateConfig = flow.states[flowState.currentState];
    if (!currentStateConfig) {
      return this.getDefaultResponse("unknown");
    }

    // Check for expected keywords
    if (currentStateConfig.expectedKeywords) {
      const matchedKeyword = this.findMatchingKeyword(message, currentStateConfig.expectedKeywords);

      if (matchedKeyword) {
        const nextStateId = currentStateConfig.expectedKeywords[matchedKeyword];
        const nextState = flow.states[nextStateId];

        if (!nextState) {
          return this.getDefaultResponse("unknown");
        }

        if (nextState.isEnd) {
          return {
            success: true,
            response: {
              content: `${nextState.message}\n\n[FLOW_END]`,
              delay: 1000,
            },
          };
        } else {
          return {
            success: true,
            response: {
              content: `${nextState.message}\n\n[FLOW_CONTINUE:${flowState.flowId}:${nextStateId}]`,
              delay: 1000,
            },
          };
        }
      }
    }

    // No keyword match - show fallback
    const fallbackMessage = currentStateConfig.fallback || this.config!.defaultResponses.unknown;
    return {
      success: true,
      response: {
        content: `${fallbackMessage}\n\n[FLOW_CONTINUE:${flowState.flowId}:${flowState.currentState}]`,
        delay: 500,
      },
    };
  }

  /**
   * Find matching keyword in expected keywords
   */
  private findMatchingKeyword(
    message: string,
    expectedKeywords: Record<string, string>
  ): string | null {
    for (const keyword of Object.keys(expectedKeywords)) {
      if (message.includes(keyword.toLowerCase())) {
        return keyword;
      }
    }
    return null;
  }

  /**
   * Handle simple keyword responses
   */
  private handleSimpleKeywords(message: string): ChatApiResponse {
    for (const [keyword, response] of Object.entries(this.config!.simpleKeywords)) {
      if (message.includes(keyword.toLowerCase())) {
        if (Array.isArray(response)) {
          // Reference to default response
          return this.getDefaultResponse(response[0]);
        } else if (response === "flow_cancel") {
          return this.handleFlowCancellation();
        } else {
          return {
            success: true,
            response: {
              content: response,
              delay: 500,
            },
          };
        }
      }
    }

    // No match found - return default unknown response
    return this.getDefaultResponse("unknown");
  }

  /**
   * Get a default response by key with random selection
   */
  private getDefaultResponse(key: string): ChatApiResponse {
    const responses = this.config!.defaultResponses[key] || this.config!.defaultResponses.unknown;
    const message = Array.isArray(responses)
      ? responses[Math.floor(Math.random() * responses.length)]
      : responses;

    return {
      success: true,
      response: {
        content: message,
        delay: 500,
      },
    };
  }
}

// Export singleton instance
export const chatApiService = new WordSpottingBot();
