import type {
  ChatApiRequest,
  ChatApiResponse,
  ChatHistoryItem,
  InteractionResponse,
  Topic,
} from "@/types/chat";
import { configManager } from "./config-manager";
import type { DetectedKeyword } from "./keyword-detector";

/**
 * Service for handling chat API requests and responses
 * Implements sophisticated word spotting bot logic with contextual awareness
 */
export class ChatApiService {
  private responseUsage = new Map<string, number>(); // Track response usage for variation

  constructor() {
    this.initializeIfNeeded();
  }

  /**
   * Initialize the service if not already initialized
   */
  private async initializeIfNeeded(): Promise<void> {
    if (!configManager.isReady()) {
      console.log("🔧 Initializing ChatApiService...");
      await configManager.initialize();
    }
  }

  /**
   * Process a chat request and return a bot response
   * This is the main entry point that implements the sophisticated bot logic
   */
  async processMessage(request: ChatApiRequest): Promise<ChatApiResponse> {
    try {
      // Ensure initialization
      await this.initializeIfNeeded();

      // Validate the request
      const validationError = this.validateRequest(request);
      if (validationError) {
        return {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: validationError,
          },
        };
      }

      console.log(`💬 Processing message: "${request.message}"`);
      console.log(`📍 Current page: ${request.currentPage}`);
      console.log(`📚 Chat history length: ${request.chatHistory.length}`);

      // Generate a unique message ID
      const messageId = this.generateMessageId();

      // Step 1: Check Global Commands (highest priority)
      const globalCommand = this.checkGlobalCommands(request.message);
      if (globalCommand) {
        console.log(`🌐 Global command detected: ${globalCommand.command_id}`);
        return {
          success: true,
          data: {
            messageId,
            content: globalCommand.response,
            interactionId: globalCommand.command_id,
            responseId: globalCommand.command_id,
            contextGroupId: "global_command_group",
          },
        };
      }

      // Step 2: Detect Keywords using our advanced keyword detector
      const detectedKeywords = this.detectKeywords(request.message);
      console.log(
        `🔍 Detected keywords:`,
        detectedKeywords.map((k) => `${k.text}(${k.confidence.toFixed(2)})`)
      );

      // Step 3: Get contextual information
      const recentContextGroups = this.extractRecentContextGroups(request.chatHistory);
      const pageTopics = configManager.getPageContextTopics(request.currentPage);

      console.log(`📋 Recent context groups:`, Array.from(recentContextGroups.keys()));
      console.log(`📄 Page context topics:`, pageTopics);

      // Step 4: Try Contextual Interactions (high priority)
      const contextualResponse = this.tryContextualInteractions(
        request.message,
        detectedKeywords,
        recentContextGroups,
        pageTopics
      );

      if (contextualResponse) {
        console.log(`🎯 Contextual interaction found: ${contextualResponse.interactionId}`);
        return {
          success: true,
          data: {
            messageId,
            ...contextualResponse,
          },
        };
      }

      // Step 5: Try Entry Interactions (medium priority)
      const entryResponse = this.tryEntryInteractions(
        request.message,
        detectedKeywords,
        pageTopics
      );

      if (entryResponse) {
        console.log(`🚪 Entry interaction found: ${entryResponse.interactionId}`);
        return {
          success: true,
          data: {
            messageId,
            ...entryResponse,
          },
        };
      }

      // Step 6: Fallback handling (lowest priority)
      console.log(`🔄 No specific interaction found, using fallback`);
      const fallbackResponse = this.generateFallbackResponse(request);

      return {
        success: true,
        data: {
          messageId,
          ...fallbackResponse,
        },
      };
    } catch (error) {
      console.error("❌ Error processing chat message:", error);
      return {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An error occurred while processing your message",
          details: error instanceof Error ? { message: error.message } : {},
        },
      };
    }
  }

  /**
   * Check for global commands in the message
   */
  private checkGlobalCommands(message: string): { command_id: string; response: string } | null {
    return configManager.getGlobalCommand(message);
  }

  /**
   * Detect keywords in the message using our advanced keyword detector
   */
  private detectKeywords(message: string): DetectedKeyword[] {
    const keywordDetector = configManager.getKeywordDetector();
    return keywordDetector.detectKeywords(message);
  }

  /**
   * Extract recent context groups from chat history
   */
  private extractRecentContextGroups(chatHistory: ChatHistoryItem[]): Map<string, number> {
    const contextGroups = new Map<string, number>();
    const memorySettings = configManager.getContextMemorySettings();

    // Only look at recent history (limited by history_length)
    const recentHistory = chatHistory.slice(-memorySettings.history_length);

    // Apply decay based on active_topic_decay
    for (let i = recentHistory.length - 1; i >= 0; i--) {
      const item = recentHistory[i];
      if (item.type === "bot" && item.contextGroupId) {
        const age = recentHistory.length - 1 - i;
        const strength = Math.max(0, 1 - age / memorySettings.active_topic_decay);

        if (strength > 0) {
          contextGroups.set(item.contextGroupId, strength);
        }
      }
    }

    return contextGroups;
  }

  /**
   * Try to find matching contextual interactions
   */
  private tryContextualInteractions(
    message: string,
    detectedKeywords: DetectedKeyword[],
    recentContextGroups: Map<string, number>,
    pageTopics: string[]
  ): {
    content: string;
    interactionId: string;
    responseId: string;
    contextGroupId: string;
    suggestedFollowUps?: string[];
  } | null {
    // Get all topics that might be relevant
    const relevantTopicIds = new Set([
      ...detectedKeywords.flatMap((k) => k.topicIds),
      ...pageTopics,
    ]);

    for (const topicId of relevantTopicIds) {
      const topic = configManager.getTopicById(topicId);
      if (!topic?.contextual_interactions) continue;

      for (const interaction of topic.contextual_interactions) {
        // Check if any recent context group matches the trigger
        const hasContextTrigger = interaction.trigger_if_previous_group_ids_in_history.some(
          (groupId) => recentContextGroups.has(groupId)
        );

        if (hasContextTrigger) {
          // Check if current message matches spotting keywords
          const hasKeywordMatch = this.messageMatchesKeywords(
            message,
            interaction.spotting_keywords
          );

          if (hasKeywordMatch) {
            const response = this.selectResponse(interaction.responses, message);
            const processedContent = this.replacePlaceholders(response.text, topic);

            return {
              content: processedContent,
              interactionId: interaction.interaction_id,
              responseId: response.response_id,
              contextGroupId: response.context_group_id,
              suggestedFollowUps: response.suggested_follow_ups,
            };
          }
        }
      }
    }

    return null;
  }

  /**
   * Try to find matching entry interactions
   */
  private tryEntryInteractions(
    message: string,
    detectedKeywords: DetectedKeyword[],
    pageTopics: string[]
  ): {
    content: string;
    interactionId: string;
    responseId: string;
    contextGroupId: string;
    suggestedFollowUps?: string[];
  } | null {
    // Get all topics that might be relevant
    const relevantTopicIds = new Set([
      ...detectedKeywords.flatMap((k) => k.topicIds),
      ...pageTopics,
    ]);

    for (const topicId of relevantTopicIds) {
      const topic = configManager.getTopicById(topicId);
      if (!topic?.entry_interactions) continue;

      for (const interaction of topic.entry_interactions) {
        const hasKeywordMatch = this.messageMatchesKeywords(message, interaction.spotting_keywords);

        if (hasKeywordMatch) {
          // Check if clarification is needed
          if (
            interaction.requires_clarification_if_too_general &&
            this.isMessageTooGeneral(message, interaction.spotting_keywords)
          ) {
            const clarificationPrompt = configManager.getClarificationPrompt(topic.name);
            return {
              content: clarificationPrompt.text,
              interactionId: "clarification_request",
              responseId: clarificationPrompt.id,
              contextGroupId: "clarification_group",
            };
          }

          const response = this.selectResponse(interaction.responses, message);
          const processedContent = this.replacePlaceholders(response.text, topic);

          return {
            content: processedContent,
            interactionId: interaction.interaction_id,
            responseId: response.response_id,
            contextGroupId: response.context_group_id,
            suggestedFollowUps: response.suggested_follow_ups,
          };
        }
      }
    }

    return null;
  }

  /**
   * Check if message matches any of the spotting keywords
   */
  private messageMatchesKeywords(message: string, keywords: string[]): boolean {
    const normalizedMessage = message.toLowerCase();

    return keywords.some((keyword) => {
      const normalizedKeyword = keyword.toLowerCase();

      // Check for exact word match
      const wordBoundaryRegex = new RegExp(`\\b${normalizedKeyword}\\b`);
      if (wordBoundaryRegex.test(normalizedMessage)) {
        return true;
      }

      // Check for substring match (useful for compound German words)
      if (normalizedMessage.includes(normalizedKeyword)) {
        return true;
      }

      return false;
    });
  }

  /**
   * Check if a message is too general for a specific interaction
   */
  private isMessageTooGeneral(message: string, keywords: string[]): boolean {
    const normalizedMessage = message.toLowerCase().trim();

    // If the message is very short and only contains generic keywords
    if (normalizedMessage.length < 10) {
      return keywords.some(
        (keyword) =>
          normalizedMessage === keyword.toLowerCase() ||
          normalizedMessage.includes(keyword.toLowerCase())
      );
    }

    return false;
  }

  /**
   * Select the most appropriate response from an interaction's responses
   */
  private selectResponse(responses: InteractionResponse[], message: string): InteractionResponse {
    if (responses.length === 1) {
      return responses[0];
    }

    // Try to find a response with specific applies_to_keywords
    for (const response of responses) {
      if (response.applies_to_keywords) {
        const matches = this.messageMatchesKeywords(message, response.applies_to_keywords);
        if (matches) {
          return response;
        }
      }
    }

    // Use response variation to avoid repetition
    const responseId = responses[0].response_id.split("_")[0]; // Get base ID
    const usageCount = this.responseUsage.get(responseId) || 0;
    const selectedIndex = usageCount % responses.length;

    this.responseUsage.set(responseId, usageCount + 1);

    return responses[selectedIndex];
  }

  /**
   * Replace placeholders in response text
   */
  private replacePlaceholders(text: string, topic?: Topic): string {
    let processedText = text;

    // Replace [detected_topic_placeholder]
    if (processedText.includes("[detected_topic_placeholder]") && topic) {
      processedText = processedText.replace("[detected_topic_placeholder]", topic.name);
    }

    // Add more placeholder replacements as needed
    // [last_mentioned_plan_placeholder], [relevant_link_placeholder], etc.

    return processedText;
  }

  /**
   * Generate fallback response when no specific interaction matches
   */
  private generateFallbackResponse(request: ChatApiRequest): {
    content: string;
    interactionId: string;
    responseId: string;
    contextGroupId: string;
  } {
    // Get recent topic IDs for contextual fallback
    const recentTopicIds = this.extractRecentTopicIds(request.chatHistory);

    // Use client-side escalation data
    const escalationLevel = request.escalationLevel || 0;
    const fallbackCount = request.fallbackCount || 0;

    const fallbackMessage = configManager.getFallbackMessage(
      recentTopicIds,
      fallbackCount,
      escalationLevel
    );

    return {
      content: fallbackMessage.text,
      interactionId: "fallback_interaction",
      responseId: fallbackMessage.id,
      contextGroupId: "fallback_group",
    };
  }

  /**
   * Extract recent topic IDs from chat history
   */
  private extractRecentTopicIds(chatHistory: ChatHistoryItem[]): string[] {
    const topicIds: string[] = [];

    for (const item of chatHistory.slice(-3)) {
      // Look at last 3 items
      if (item.type === "bot" && item.contextGroupId) {
        // Try to map context group to topic (simplified)
        const topics = configManager.getAllTopics();
        for (const topic of topics) {
          // This is a simplified mapping - in reality you'd need more sophisticated logic
          if (item.contextGroupId.includes(topic.topic_id)) {
            topicIds.push(topic.topic_id);
            break;
          }
        }
      }
    }

    return [...new Set(topicIds)]; // Remove duplicates
  }

  /**
   * Validate the incoming chat request
   */
  private validateRequest(request: ChatApiRequest): string | null {
    if (!request.message || typeof request.message !== "string") {
      return "Message is required and must be a string";
    }

    if (request.message.trim().length === 0) {
      return "Message cannot be empty";
    }

    if (!request.currentPage || typeof request.currentPage !== "string") {
      return "Current page is required and must be a string";
    }

    if (!Array.isArray(request.chatHistory)) {
      return "Chat history must be an array";
    }

    // Validate chat history items
    for (const item of request.chatHistory) {
      if (!item.messageId || typeof item.messageId !== "string") {
        return "Each chat history item must have a valid messageId";
      }
      if (!item.type || !["user", "bot"].includes(item.type)) {
        return "Each chat history item must have a valid type (user or bot)";
      }
      if (!item.content || typeof item.content !== "string") {
        return "Each chat history item must have valid content";
      }
      if (!item.timestamp || !(item.timestamp instanceof Date)) {
        return "Each chat history item must have a valid timestamp";
      }
    }

    return null;
  }

  /**
   * Generate a unique message ID
   */
  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  /**
   * Get debug information about the bot's decision-making process
   */
  async getDebugInfo(request: ChatApiRequest): Promise<Record<string, unknown>> {
    await this.initializeIfNeeded();

    const detectedKeywords = this.detectKeywords(request.message);
    const recentContextGroups = this.extractRecentContextGroups(request.chatHistory);
    const pageTopics = configManager.getPageContextTopics(request.currentPage);

    return {
      message: request.message,
      detectedKeywords,
      recentContextGroups: Array.from(recentContextGroups.entries()),
      pageTopics,
      globalCommand: this.checkGlobalCommands(request.message),
      systemStats: configManager.getSystemStats(),
    };
  }
}

// Export a singleton instance
export const chatApiService = new ChatApiService();
