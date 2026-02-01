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
        {/* Header alanını daralttık ve öğeleri hizaladık */}
        <header className="pt-8 pb-10 md:pt-12 md:pb-12 flex flex-col items-center space-y-6">
          
          {/* Başlık ve Dil Butonu Aynı Satırda */}
          <div className="w-full flex items-center justify-between relative">
            {/* Boş bir div (Sol tarafı dengelemek için) */}
            <div className="w-10 md:w-20" /> 

            {/* Logo / Başlık */}
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-primary">
                Tactic Lab
              </h1>
            </Link>

            {/* Dil Seçeneği (Sağ taraf) */}
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