import { Button } from "@/components/ui/button";
import { RotateCcw, X } from "lucide-react";

interface ChatHeaderProps {
  onClose: () => void;
  onClearMessages?: () => void;
}

export function ChatHeader({ onClose, onClearMessages }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-border bg-card rounded-t-xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
          <span className="text-xs font-medium text-primary-foreground">AM</span>
        </div>
        <div>
          <h3 className="font-semibold text-md">Hilfe & Support</h3>
          <p className="text-sm text-muted-foreground">AquaMagica Team</p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {onClearMessages && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearMessages}
            className="h-12 w-12 p-0"
            title="Nachrichten löschen"
            aria-label="Nachrichten löschen"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="sr-only">Nachrichten löschen</span>
          </Button>
        )}

        <Button variant="ghost" size="sm" onClick={onClose} className="h-12 w-12 p-0">
          <X className="w-4 h-4" />
          <span className="sr-only">Chat schließen</span>
        </Button>
      </div>
    </div>
  );
}
