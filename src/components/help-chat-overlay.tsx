import React from "react";
import { ChatButton } from "./chat/chat-button";
import { ChatWindow } from "./chat/chat-window";
import { useChat } from "@/hooks/use-chat";

export function HelpChatOverlay() {
  const { state, toggleChat } = useChat();

  return (
    <>
      {state.isOpen ? (
        <ChatWindow />
      ) : (
        <ChatButton onClick={toggleChat} unreadCount={state.unreadCount} />
      )}
    </>
  );
}
