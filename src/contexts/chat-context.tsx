import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
  useEffect,
  useRef,
} from "react";
import type { ChatMessage, ChatState, ChatHistoryItem } from "@/types/chat";
import { chatApiClient } from "@/services/chat-api-client";

interface ChatContextType {
  state: ChatState;
  sendMessage: (message: string) => Promise<void>;
  toggleChat: () => void;
  markAsRead: () => void;
  clearMessages: () => void;
}

type ChatAction =
  | { type: "TOGGLE_CHAT" }
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "ADD_BOT_MESSAGE"; payload: { message: ChatMessage; shouldIncrementUnread: boolean } }
  | { type: "SET_TYPING"; payload: boolean }
  | { type: "MARK_AS_READ" }
  | { type: "CLEAR_MESSAGES" }
  | { type: "INCREMENT_UNREAD" };

const initialState: ChatState = {
  messages: [],
  isOpen: false,
  isTyping: false,
  unreadCount: 0,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "TOGGLE_CHAT":
      return {
        ...state,
        isOpen: !state.isOpen,
        unreadCount: state.isOpen ? state.unreadCount : 0,
      };

    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };

    case "ADD_BOT_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload.message],
        isTyping: false,
        unreadCount: action.payload.shouldIncrementUnread
          ? state.unreadCount + 1
          : state.unreadCount,
      };

    case "SET_TYPING":
      return {
        ...state,
        isTyping: action.payload,
      };

    case "MARK_AS_READ":
      return {
        ...state,
        unreadCount: 0,
      };

    case "CLEAR_MESSAGES":
      return {
        ...state,
        messages: [],
        unreadCount: 0,
      };

    case "INCREMENT_UNREAD":
      return {
        ...state,
        unreadCount: state.unreadCount + 1,
      };

    default:
      return state;
  }
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);
  const welcomeMessageAddedRef = useRef(false);
  const stateRef = useRef(state);

  // Keep state ref updated
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  // Convert chat messages to history format for backend
  const formatChatHistory = useCallback((messages: ChatMessage[]): ChatHistoryItem[] => {
    return messages
      .filter((msg) => msg.type === "user" || msg.type === "bot")
      .map((msg) => ({
        messageId: msg.id,
        timestamp: msg.timestamp,
        type: msg.type as "user" | "bot",
        content: msg.content,
      }));
  }, []);

  const sendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;

      // Add user message
      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: message.trim(),
        type: "user",
        timestamp: new Date(),
      };

      dispatch({ type: "ADD_MESSAGE", payload: userMessage });
      dispatch({ type: "SET_TYPING", payload: true });

      try {
        // Get current messages for chat history
        const currentMessages = stateRef.current.messages;

        // Prepare chat history for backend (including the new user message)
        const chatHistory = formatChatHistory([...currentMessages, userMessage]);

        // Send to backend
        const response = await chatApiClient.sendMessage(message.trim(), chatHistory);

        if (response.success && response.response) {
          // Add bot response
          const botMessage: ChatMessage = {
            id: crypto.randomUUID(),
            content: response.response.content,
            type: "bot",
            timestamp: new Date(),
          };

          // Add delay if specified
          if (response.response.delay && response.response.delay > 0) {
            setTimeout(() => {
              dispatch({
                type: "ADD_BOT_MESSAGE",
                payload: {
                  message: botMessage,
                  shouldIncrementUnread: !stateRef.current.isOpen,
                },
              });
            }, response.response.delay);
          } else {
            dispatch({
              type: "ADD_BOT_MESSAGE",
              payload: {
                message: botMessage,
                shouldIncrementUnread: !stateRef.current.isOpen,
              },
            });
          }
        } else {
          // Handle error - stop typing and add error message
          const errorMessage: ChatMessage = {
            id: crypto.randomUUID(),
            content:
              response.error?.message || "Es ist ein Fehler aufgetreten. Bitte versuche es erneut.",
            type: "bot",
            timestamp: new Date(),
          };

          dispatch({
            type: "ADD_BOT_MESSAGE",
            payload: {
              message: errorMessage,
              shouldIncrementUnread: !stateRef.current.isOpen,
            },
          });
        }
      } catch (error) {
        console.error("Failed to send message:", error);

        const errorMessage: ChatMessage = {
          id: crypto.randomUUID(),
          content:
            "Verbindungsfehler. Bitte überprüfe deine Internetverbindung und versuche es erneut.",
          type: "bot",
          timestamp: new Date(),
        };

        dispatch({
          type: "ADD_BOT_MESSAGE",
          payload: {
            message: errorMessage,
            shouldIncrementUnread: !stateRef.current.isOpen,
          },
        });
      }
    },
    [formatChatHistory]
  );

  const toggleChat = useCallback(() => {
    dispatch({ type: "TOGGLE_CHAT" });
  }, []);

  const markAsRead = useCallback(() => {
    dispatch({ type: "MARK_AS_READ" });
  }, []);

  const clearMessages = useCallback(() => {
    dispatch({ type: "CLEAR_MESSAGES" });
  }, []);

  // Auto-mark as read when chat is opened
  useEffect(() => {
    if (state.isOpen && state.unreadCount > 0) {
      dispatch({ type: "MARK_AS_READ" });
    }
  }, [state.isOpen, state.unreadCount]);

  // Add welcome message on first load
  useEffect(() => {
    if (state.messages.length === 0 && !welcomeMessageAddedRef.current) {
      welcomeMessageAddedRef.current = true;
      const welcomeMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content:
          "Hallo! Wie kann ich dir bei AquaMagica helfen? Du kannst mich nach Öffnungszeiten, Preisen oder Attraktions-Empfehlungen fragen!",
        type: "bot",
        timestamp: new Date(),
      };

      setTimeout(() => {
        dispatch({ type: "ADD_MESSAGE", payload: welcomeMessage });
      }, 1000);
    }
  }, [state.messages.length]);

  const value: ChatContextType = {
    state,
    sendMessage,
    toggleChat,
    markAsRead,
    clearMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChat(): ChatContextType {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
