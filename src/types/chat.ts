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
