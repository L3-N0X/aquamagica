export interface ChatMessage {
  id: string;
  content: string;
  type: "user" | "bot" | "system";
  timestamp: Date;
  isTyping?: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  unreadCount: number;
}

export interface BotResponse {
  content: string;
  delay?: number;
}

export interface ChatHistoryItem {
  messageId: string;
  timestamp: Date;
  type: "user" | "bot";
  content: string;
}

export interface ChatApiRequest {
  message: string;
  chatHistory: ChatHistoryItem[];
}

export interface ChatApiResponse {
  success: boolean;
  response?: BotResponse;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
