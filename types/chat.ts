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

// API Types for the chat endpoint
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

// Bot configuration types based on chatbot-config.json
export interface BotConfig {
  bot_name: string;
  greeting_messages: GreetingMessage[];
  clarification_prompts: ClarificationPrompt[];
  fallback_settings: FallbackSettings;
  context_memory: ContextMemory;
  global_commands: GlobalCommand[];
}

export interface GreetingMessage {
  id: string;
  text: string;
}

export interface ClarificationPrompt {
  id: string;
  text: string;
}

export interface FallbackSettings {
  strategy: string;
  max_fallback_repetitions_before_escalation: number;
  messages: FallbackMessage[];
}

export interface FallbackMessage {
  id: string;
  text: string;
  type: string;
  relevant_topic_id_hint?: string[];
}

export interface ContextMemory {
  history_length: number;
  active_topic_decay: number;
}

export interface GlobalCommand {
  command_id: string;
  keywords: string[];
  response: string;
}

export interface Topic {
  topic_id: string;
  name: string;
  keywords: string[];
  entry_interactions: EntryInteraction[];
  contextual_interactions?: ContextualInteraction[];
}

export interface EntryInteraction {
  interaction_id: string;
  spotting_keywords: string[];
  requires_clarification_if_too_general?: boolean;
  responses: InteractionResponse[];
}

export interface ContextualInteraction {
  interaction_id: string;
  trigger_if_previous_group_ids_in_history: string[];
  spotting_keywords: string[];
  responses: InteractionResponse[];
}

export interface InteractionResponse {
  response_id: string;
  text: string;
  context_group_id: string;
  suggested_follow_ups?: string[];
  applies_to_keywords?: string[];
  related_info_ids?: string[];
}

export interface ChatBotConfig {
  bot_config: BotConfig;
  topics: Topic[];
}
