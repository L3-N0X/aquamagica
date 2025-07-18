import type { ChatMessage } from "@/types/chat";
import { Bot } from "lucide-react";

interface BotMessageProps {
  message: ChatMessage;
}

/**
 * Clean flow markers from bot message content and format markdown
 */
function formatBotMessage(content: string): string {
  // First clean flow markers
  let cleaned = content.replace(/\[FLOW_[^\]]+\]/g, "").trim();

  // Convert **text** to bold HTML
  cleaned = cleaned.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

  // Convert both actual newlines (\n) and escaped newlines (\\n) to line breaks
  cleaned = cleaned.replace(/\\n/g, "<br />");
  cleaned = cleaned.replace(/\n/g, "<br />");

  return cleaned;
}

export function BotMessage({ message }: BotMessageProps) {
  return (
    <div className="flex justify-start gap-3 items-start">
      <div className="flex flex-col items-start max-w-[75%]">
        <div className="bg-accent text-accent-foreground px-4 py-3 rounded-lg rounded-bl-sm">
          <p
            className="text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatBotMessage(message.content) }}
          />
        </div>
        <div className="flex items-center">
          <Bot className="w-4 h-4 text-muted-foreground inline-block" />
          <span className="text-sm text-muted-foreground mt-1 ml-1 flex items-center gap-1">
            {message.timestamp.toLocaleTimeString("de-DE", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
