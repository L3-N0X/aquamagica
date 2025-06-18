// Frontend-specific chat types
// Note: This is a subset of the full chat types, containing only what the frontend needs

export interface ChatMessage {
  id: string;
  content: string;
  type: "user" | "bot" | "system";
  timestamp: Date;
  isTyping?: boolean;
  // Context fields for conversation flow support
  interactionId?: string;
  responseId?: string;
  contextGroupId?: string;
}

export interface ChatState {
  messages: ChatMessage[];
  isOpen: boolean;
  isTyping: boolean;
  unreadCount: number;
  escalationLevel: number;
  fallbackCount: number;
}

export interface ChatContextType {
  state: ChatState;
  toggleChat: () => void;
  closeChat: () => void;
  openChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => void;
  markAsRead: () => void;
}

export interface BotResponse {
  content: string;
  delay?: number;
}

// API Types for the chat endpoint - shared between frontend and backend
export interface ChatHistoryItem {
  messageId: string;
  interactionId?: string;
  responseId?: string;
  contextGroupId?: string;
  timestamp: Date;
  type: "user" | "bot";
  content: string;
}

export interface ChatApiRequest {
  message: string;
  currentPage: string;
  chatHistory: ChatHistoryItem[];
  escalationLevel?: number;
  fallbackCount?: number;
}

export interface ChatApiResponse {
  success: boolean;
  data?: {
    messageId: string;
    content: string;
    interactionId?: string;
    responseId?: string;
    contextGroupId?: string;
    suggestedFollowUps?: string[];
  };
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
