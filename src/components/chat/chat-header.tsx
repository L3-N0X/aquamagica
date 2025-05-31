import React from "react";
import { Button } from "@/components/ui/button";
import { X, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  onClose: () => void;
  onClearMessages?: () => void;
}

export function ChatHeader({ onClose, onClearMessages }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card rounded-t-xl">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-xs font-medium text-primary-foreground">AM</span>
        </div>
        <div>
          <h3 className="font-semibold text-sm">Hilfe & Support</h3>
          <p className="text-xs text-muted-foreground">AquaMagica Team</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {onClearMessages && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreVertical className="w-4 h-4" />
                <span className="sr-only">Weitere Optionen</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onClearMessages}>Chat löschen</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="w-4 h-4" />
          <span className="sr-only">Chat schließen</span>
        </Button>
      </div>
    </div>
  );
}
