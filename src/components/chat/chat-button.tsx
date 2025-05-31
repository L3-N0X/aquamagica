import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { HelpCircle } from "lucide-react";

interface ChatButtonProps {
  onClick: () => void;
  unreadCount?: number;
}

export function ChatButton({ onClick, unreadCount = 0 }: ChatButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={onClick}
        size="lg"
        className="h-14 px-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 relative group"
      >
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5" />
          <span className="font-medium">Hilfe</span>
        </div>

        {unreadCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-6 w-6 p-0 flex items-center justify-center text-xs rounded-full"
          >
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>
    </div>
  );
}
