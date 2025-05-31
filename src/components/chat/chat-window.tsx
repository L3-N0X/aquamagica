import React from "react";
import { Card } from "@/components/ui/card";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { useChat } from "@/hooks/use-chat";

export function ChatWindow() {
  const { state, closeChat, sendMessage, clearMessages } = useChat();

  return (
    <div className="fixed bottom-3 right-3 z-50 w-[90vw] max-w-[400px] h-[70vh] max-h-[500px] sm:w-[400px] sm:h-[500px]">
      <Card className="h-full flex flex-col shadow-xl border-border/50">
        <ChatHeader onClose={closeChat} onClearMessages={clearMessages} />

        <ChatMessages messages={state.messages} isTyping={state.isTyping} />

        <ChatInput
          onSendMessage={sendMessage}
          disabled={state.isTyping}
          placeholder="Wie kann ich dir helfen?"
        />
      </Card>
    </div>
  );
}
