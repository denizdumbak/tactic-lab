import { Link } from "wouter";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { LanguageToggle } from "./LanguageToggle";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center">
      <div className="w-full max-w-[760px] px-6 md:px-8 flex-1 flex flex-col">
        <header className="py-12 md:py-16 flex flex-col items-center space-y-8">
          <div className="w-full flex justify-end">
            <LanguageToggle />
          </div>
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <h1 className="text-3xl md:text-4xl font-serif font-black tracking-tight text-primary">Tactic Lab</h1>
          </Link>
          <Navigation />
        </header>

        <main className="flex-1 w-full">
          {children}
        </main>

        <Footer />
      </div>
    </div>
  );
}
