import { Navbar } from "@/components/navbar";
import { ModeToggle } from "@/components/mode-toggle";
import { MobileNav } from "@/components/mobile-nav";
import { HelpChatOverlay } from "@/components/help-chat-overlay";
import { Link } from "react-router";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="flex justify-between items-center p-2 sm:p-4 border-b border-border bg-header-background">
        <MobileNav />
        <Navbar />
        <div className="flex items-center gap-2">
          <ModeToggle />
        </div>
      </header>
      <main className="flex flex-col items-center justify-start min-h-[calc(100vh-140px)]">
        {children}
      </main>
      <footer className="mt-auto bg-muted/30 border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <div className="mb-2 md:mb-0">
              <p>&copy; 2024 AquaMagica Freiburg GmbH. Alle Rechte vorbehalten.</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/impressum" className="hover:text-foreground transition-colors">
                Impressum
              </Link>
              <Link to="/contact" className="hover:text-foreground transition-colors">
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </footer>
      <HelpChatOverlay />
    </div>
  );
}
