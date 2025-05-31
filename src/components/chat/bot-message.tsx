import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ChatMessage } from "@/types/chat";
import { Bot } from "lucide-react";

interface BotMessageProps {
  message: ChatMessage;
}

export function BotMessage({ message }: BotMessageProps) {
  return (
    <div className="flex justify-start gap-2 mb-4">
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-secondary text-secondary-foreground">
          <Bot className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start max-w-[80%]">
        <div className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg rounded-bl-sm">
          <p className="text-sm">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {message.timestamp.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}
