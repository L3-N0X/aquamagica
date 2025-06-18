import type { ChatHistoryItem, ChatApiRequest, ChatApiResponse } from "@/types/chat";

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
  async sendMessage(message: string, chatHistory: ChatHistoryItem[]): Promise<ChatApiResponse> {
    try {
      const request: ChatApiRequest = {
        message: message.trim(),
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
}

export const chatApiClient = new ChatApiClient();
