import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { ChatProvider } from "@/contexts/chat-context";

interface RootProvidersProps {
  children: React.ReactNode;
}

export function RootProviders({ children }: RootProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ChatProvider>
        <Toaster />
        {children}
      </ChatProvider>
    </ThemeProvider>
  );
}
