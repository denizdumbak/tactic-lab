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
      {/* Container'ı max-w-7xl yaparak genişlettik */}
      <div className="w-full max-w-7xl px-6 md:px-12 flex-1 flex flex-col">
        
        <header className="pt-8 pb-10 md:pt-12 md:pb-12 flex flex-col items-center space-y-6">
          <div className="w-full flex items-center justify-between relative">
            <div className="w-10 md:w-20" /> 

            <Link href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-primary">
                Tactic Lab
              </h1>
            </Link>

            <div className="w-10 md:w-20 flex justify-end">
              <LanguageToggle />
            </div>
          </div>

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