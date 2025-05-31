import React, { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserMessage } from "./user-message";
import { BotMessage } from "./bot-message";
import { TypingIndicator } from "./typing-indicator";
import type { ChatMessage } from "@/types/chat";

interface ChatMessagesProps {
  messages: ChatMessage[];
  isTyping: boolean;
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">Noch keine Nachrichten</p>
          <p className="text-xs mt-1">Stelle eine Frage um zu beginnen!</p>
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="flex-1 px-4 py-2">
      <div className="space-y-1">
        {messages.map((message) => {
          if (message.type === "user") {
            return <UserMessage key={message.id} message={message} />;
          } else if (message.type === "bot") {
            return <BotMessage key={message.id} message={message} />;
          }
          return null;
        })}

        {isTyping && (
          <div className="flex justify-start gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-xs font-medium text-secondary-foreground">Bot</span>
            </div>
            <TypingIndicator />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </ScrollArea>
  );
}
