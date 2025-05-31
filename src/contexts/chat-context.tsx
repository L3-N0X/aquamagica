import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import type {
  ChatState,
  ChatContextType,
  ChatMessage,
  ChatHistoryItem,
  ChatApiRequest,
} from "@/types/chat";
import { chatApiClient } from "@/services/chat-api-client";

const CHAT_STORAGE_KEY = "aquamagica-chat-state";

/**
 * Get current page context from URL for the chat API
 */
const getCurrentPageContext = (): string => {
  if (typeof window === "undefined") return "/";

  const pathname = window.location.pathname;

  // Map URL paths to page contexts that the bot understands
  switch (pathname) {
    case "/preise":
      return "/preise";
    case "/attraktionen":
      return "/attraktionen";
    case "/kontakt":
      return "/kontakt";
    case "/about":
      return "/about";
    default:
      return "/";
  }
};

const isLocalStorageAvailable = (): boolean => {
  try {
    return typeof window !== "undefined" && window.localStorage !== undefined;
  } catch {
    return false;
  }
};

const getInitialState = (): ChatState => {
  if (!isLocalStorageAvailable()) {
    return getDefaultState();
  }

  try {
    const savedState = localStorage.getItem(CHAT_STORAGE_KEY);
    if (savedState) {
      const parsed = JSON.parse(savedState);
      // Convert timestamp strings back to Date objects
      const messagesWithDates = parsed.messages.map((msg: ChatMessage & { timestamp: string }) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }));
      return {
        ...parsed,
        messages: messagesWithDates,
        isTyping: false, // Always reset typing state on page load
        escalationLevel: parsed.escalationLevel || 0,
        fallbackCount: parsed.fallbackCount || 0,
      };
    }
  } catch (error) {
    console.warn("Failed to load chat state from localStorage:", error);
  }

  return getDefaultState();
};

const getDefaultState = (): ChatState => ({
  messages: [
    {
      id: "1",
      content:
        "Hallo! Ich bin dein AquaMagica Assistent und helfe gerne bei Fragen zu unseren Attraktionen, Preisen, Öffnungszeiten und mehr. Wie kann ich dir helfen?",
      type: "bot",
      timestamp: new Date(),
    },
  ],
  isOpen: false,
  isTyping: false,
  unreadCount: 0,
  escalationLevel: 0,
  fallbackCount: 0,
});

const saveStateToStorage = (state: ChatState): void => {
  if (!isLocalStorageAvailable()) return;

  try {
    // Create a serializable version of the state (convert Date objects to strings)
    const serializableState = {
      ...state,
      messages: state.messages.map((msg) => ({
        ...msg,
        timestamp: msg.timestamp.toISOString(),
      })),
      isTyping: false, // Don't persist typing state
    };
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(serializableState));
  } catch (error) {
    console.warn("Failed to save chat state to localStorage:", error);
  }
};

const initialState: ChatState = getInitialState();

type ChatAction =
  | { type: "TOGGLE_CHAT" }
  | { type: "OPEN_CHAT" }
  | { type: "CLOSE_CHAT" }
  | { type: "ADD_MESSAGE"; payload: ChatMessage }
  | { type: "SET_TYPING"; payload: boolean }
  | { type: "CLEAR_MESSAGES" }
  | { type: "MARK_AS_READ" }
  | { type: "INCREMENT_FALLBACK_COUNT" }
  | { type: "RESET_ESCALATION" };

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case "TOGGLE_CHAT":
      return {
        ...state,
        isOpen: !state.isOpen,
        unreadCount: !state.isOpen ? 0 : state.unreadCount,
      };
    case "OPEN_CHAT":
      return {
        ...state,
        isOpen: true,
        unreadCount: 0,
      };
    case "CLOSE_CHAT":
      return {
        ...state,
        isOpen: false,
      };
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
        unreadCount:
          !state.isOpen && action.payload.type === "bot"
            ? state.unreadCount + 1
            : state.unreadCount,
      };
    case "SET_TYPING":
      return {
        ...state,
        isTyping: action.payload,
      };
    case "CLEAR_MESSAGES":
      return {
        ...state,
        messages: [
          {
            id: "1",
            content:
              "Hallo! Ich bin dein AquaMagica Assistent und helfe gerne bei Fragen zu unseren Attraktionen, Preisen, Öffnungszeiten und mehr. Wie kann ich dir helfen?",
            type: "bot",
            timestamp: new Date(),
          },
        ],
        unreadCount: 0,
        escalationLevel: 0,
        fallbackCount: 0,
      };
    case "MARK_AS_READ":
      return {
        ...state,
        unreadCount: 0,
      };
    case "INCREMENT_FALLBACK_COUNT":
      return {
        ...state,
        fallbackCount: state.fallbackCount + 1,
        escalationLevel:
          state.fallbackCount >= 2 ? state.escalationLevel + 1 : state.escalationLevel,
      };
    case "RESET_ESCALATION":
      return {
        ...state,
        escalationLevel: 0,
        fallbackCount: 0,
      };
    default:
      return state;
  }
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  const toggleChat = useCallback(() => {
    dispatch({ type: "TOGGLE_CHAT" });
  }, []);

  const openChat = useCallback(() => {
    dispatch({ type: "OPEN_CHAT" });
  }, []);

  const closeChat = useCallback(() => {
    dispatch({ type: "CLOSE_CHAT" });
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      // Add user message
      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        content,
        type: "user",
        timestamp: new Date(),
      };
      dispatch({ type: "ADD_MESSAGE", payload: userMessage });

      // Set typing indicator
      dispatch({ type: "SET_TYPING", payload: true });

      try {
        // Get current page context from URL
        const currentPage = getCurrentPageContext();

        // Convert chat messages to chat history format for API
        const chatHistory: ChatHistoryItem[] = state.messages.map((msg) => ({
          messageId: msg.id,
          type: msg.type === "system" ? "bot" : msg.type,
          content: msg.content,
          timestamp: msg.timestamp,
          // Add additional context if available (could be enhanced later)
          ...(msg.type === "bot" && {
            interactionId: `interaction_${msg.id}`,
            contextGroupId: `context_${msg.id}`,
          }),
        }));

        // Add the current user message to history
        chatHistory.push({
          messageId: userMessage.id,
          type: "user",
          content: userMessage.content,
          timestamp: userMessage.timestamp,
        });

        // Prepare API request
        const apiRequest: ChatApiRequest = {
          message: content,
          currentPage,
          chatHistory,
          escalationLevel: state.escalationLevel,
          fallbackCount: state.fallbackCount,
        };

        console.log("🚀 Sending request to sophisticated chat API:", apiRequest);

        // Get bot response from sophisticated chat API service
        const apiResponse = await chatApiClient.sendMessage(content, currentPage, chatHistory);

        if (apiResponse.success && apiResponse.data) {
          // Add bot message with enhanced context
          const botMessage: ChatMessage = {
            id: apiResponse.data.messageId,
            content: apiResponse.data.content,
            type: "bot",
            timestamp: new Date(),
          };
          dispatch({ type: "ADD_MESSAGE", payload: botMessage });

          // Check if this was a fallback response to increment escalation
          if (apiResponse.data.interactionId === "fallback_interaction") {
            dispatch({ type: "INCREMENT_FALLBACK_COUNT" });
          } else {
            // Reset escalation on successful interaction
            dispatch({ type: "RESET_ESCALATION" });
          }

          console.log("✅ Received sophisticated bot response:", {
            interactionId: apiResponse.data.interactionId,
            responseId: apiResponse.data.responseId,
            contextGroupId: apiResponse.data.contextGroupId,
            suggestedFollowUps: apiResponse.data.suggestedFollowUps,
          });
        } else {
          throw new Error(apiResponse.error?.message || "API request failed");
        }
      } catch (error) {
        console.error("❌ Error getting sophisticated bot response:", error);

        // Add error message
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          content:
            "Entschuldigung, es gab einen Fehler. Bitte versuche es später erneut oder kontaktiere unser Team über die Kontakt-Seite.",
          type: "bot",
          timestamp: new Date(),
        };
        dispatch({ type: "ADD_MESSAGE", payload: errorMessage });
      } finally {
        dispatch({ type: "SET_TYPING", payload: false });
      }
    },
    [state.escalationLevel, state.fallbackCount, state.messages]
  );

  const clearMessages = useCallback(() => {
    dispatch({ type: "CLEAR_MESSAGES" });
    // Also clear from localStorage
    if (isLocalStorageAvailable()) {
      try {
        localStorage.removeItem(CHAT_STORAGE_KEY);
      } catch (error) {
        console.warn("Failed to clear chat state from localStorage:", error);
      }
    }
  }, []);

  const markAsRead = useCallback(() => {
    dispatch({ type: "MARK_AS_READ" });
  }, []);

  const contextValue: ChatContextType = {
    state,
    toggleChat,
    openChat,
    closeChat,
    sendMessage,
    clearMessages,
    markAsRead,
  };

  return <ChatContext.Provider value={contextValue}>{children}</ChatContext.Provider>;
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
