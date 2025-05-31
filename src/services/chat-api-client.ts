import type { ChatApiRequest, ChatApiResponse, ChatHistoryItem } from "@/types/chat";

/**
 * Client service for interacting with the chat API endpoint
 */
export class ChatApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = "") {
    this.baseUrl = baseUrl;
  }

  /**
   * Send a message to the chat API
   */
  async sendMessage(
    message: string,
    currentPage: string,
    chatHistory: ChatHistoryItem[]
  ): Promise<ChatApiResponse> {
    try {
      const request: ChatApiRequest = {
        message: message.trim(),
        currentPage,
        chatHistory,
      };

      const response = await fetch(`${this.baseUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ChatApiResponse = await response.json();
      return result;
    } catch (error) {
      console.error("Chat API request failed:", error);
      return {
        success: false,
        error: {
          code: "NETWORK_ERROR",
          message: "Failed to communicate with chat service",
          details: error instanceof Error ? { message: error.message } : {},
        },
      };
    }
  }

  /**
   * Create a chat history item from a user message
   */
  createUserHistoryItem(messageId: string, content: string): ChatHistoryItem {
    return {
      messageId,
      type: "user",
      content,
      timestamp: new Date(),
    };
  }

  /**
   * Create a chat history item from a bot response
   */
  createBotHistoryItem(
    messageId: string,
    content: string,
    interactionId?: string,
    responseId?: string,
    contextGroupId?: string
  ): ChatHistoryItem {
    return {
      messageId,
      type: "bot",
      content,
      timestamp: new Date(),
      interactionId,
      responseId,
      contextGroupId,
    };
  }

  /**
   * Generate a unique message ID
   */
  generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
  }

  /**
   * Trim chat history to keep only recent messages
   */
  trimChatHistory(history: ChatHistoryItem[], maxLength: number = 5): ChatHistoryItem[] {
    return history.slice(-maxLength);
  }
}

// Export a singleton instance for easy use
export const chatApiClient = new ChatApiClient();

// Example usage function
export async function exampleUsage() {
  const client = new ChatApiClient();

  // Simulate a conversation
  const chatHistory: ChatHistoryItem[] = [];

  // User sends a greeting
  const userMessageId = client.generateMessageId();
  const userMessage = "Hallo, wie viel kostet der Eintritt?";

  // Add user message to history
  chatHistory.push(client.createUserHistoryItem(userMessageId, userMessage));

  // Send to API
  const response = await client.sendMessage(userMessage, "/preise", chatHistory);

  if (response.success && response.data) {
    // Add bot response to history
    chatHistory.push(
      client.createBotHistoryItem(
        response.data.messageId,
        response.data.content,
        response.data.interactionId,
        response.data.responseId,
        response.data.contextGroupId
      )
    );

    console.log("Bot response:", response.data.content);
    console.log("Suggested follow-ups:", response.data.suggestedFollowUps);
  } else {
    console.error("Chat API error:", response.error);
  }

  return chatHistory;
}
