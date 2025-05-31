export function TypingIndicator() {
  return (
    <div className="flex items-center space-x-1 p-3 bg-muted rounded-lg max-w-[60px]">
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce"
          style={{ animationDelay: "300ms" }}
        />
      </div>
    </div>
  );
}
