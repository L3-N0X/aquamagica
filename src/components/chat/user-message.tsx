import React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { ChatMessage } from "@/types/chat";
import { User } from "lucide-react";

interface UserMessageProps {
  message: ChatMessage;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end gap-2 mb-4">
      <div className="flex flex-col items-end max-w-[80%]">
        <div className="bg-primary text-primary-foreground px-4 py-2 rounded-lg rounded-br-sm">
          <p className="text-sm">{message.content}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">
          {message.timestamp.toLocaleTimeString("de-DE", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
      <Avatar className="w-8 h-8">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <User className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
