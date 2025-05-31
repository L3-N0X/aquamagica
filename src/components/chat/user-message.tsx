import type { ChatMessage } from "@/types/chat";
import { User } from "lucide-react";

interface UserMessageProps {
  message: ChatMessage;
}

export function UserMessage({ message }: UserMessageProps) {
  return (
    <div className="flex justify-end gap-3 items-start">
      <div className="flex flex-col items-end max-w-[75%]">
        <div className="bg-primary text-primary-foreground px-4 py-3 rounded-lg rounded-br-sm">
          <p className="text-sm leading-relaxed">{message.content}</p>
        </div>
        <div className="flex items-center">
          <span className="text-sm text-muted-foreground mt-1 mr-1">
            {message.timestamp.toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          <User className="w-4 h-4 text-muted-foreground inline-block" />
        </div>
      </div>
    </div>
  );
}
