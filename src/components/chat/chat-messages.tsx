import React, { useEffect, useRef } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserMessage } from "./user-message";
import { BotMessage } from "./bot-message";
import { TypingIndicator } from "./typing-indicator";
import type { ChatMessage } from "@/types/chat";
import { Bot } from "lucide-react";

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
    <div className="flex-1 overflow-y-auto py-4 px-3 scrollbar-thin scrollbar-thumb-border/50">
      <div className="space-y-3">
        {messages.map((message) => {
          if (message.type === "user") {
            return <UserMessage key={message.id} message={message} />;
          } else if (message.type === "bot") {
            return <BotMessage key={message.id} message={message} />;
          }
          return null;
        })}

        {isTyping && (
          <div className="flex justify-start gap-3 items-start">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarFallback className="bg-accent text-accent-foreground">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex items-center">
              <TypingIndicator />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
