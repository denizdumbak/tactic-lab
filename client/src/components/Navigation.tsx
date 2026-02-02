import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navigation() {
  const [location] = useLocation();
  const { t } = useLanguage();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    setIsSearchOpen(false);
    setSearchQuery("");
    window.dispatchEvent(new CustomEvent("site-search", { detail: "" }));
  }, [location]);

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    window.dispatchEvent(new CustomEvent("site-search", { detail: val }));
  };

  return (
    // items-center: Tüm nav elemanlarını dikeyde tam merkeze alır
    <nav className="flex items-center space-x-5 md:space-x-8 text-base font-medium tracking-tight h-full">
      
      {/* LİNKLER */}
      <div className={cn(
        "hidden md:flex items-center space-x-6 md:space-x-8 transition-opacity duration-300",
        isSearchOpen ? "opacity-30" : "opacity-100"
      )}>
        {[
          { href: "/scout", labelKey: "nav.scouting" },
          { href: "/taktik", labelKey: "nav.taktik" },
          { href: "/mac-analizi", labelKey: "nav.macAnalizi" },
          { href: "/about", labelKey: "nav.about" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              // flex items-center: Yazıyı kutusunda ortalar
              // h-10: Buton yüksekliği ile uyumlu bir alan yaratır
              "flex items-center hover:text-primary transition-all duration-200 border-b-2 border-transparent pb-0.5 text-[15px] md:text-[16px] h-10 leading-none",
              location === link.href ? "text-primary border-primary" : "text-muted-foreground"
            )}
          >
            {t(link.labelKey)}
          </Link>
        ))}
      </div>

      {/* ARAMA VE BUTON GRUBU */}
      <div className="flex items-center gap-2">
        <div className={cn(
          "flex items-center transition-all duration-300 ease-in-out overflow-hidden bg-muted/5 rounded-full border border-transparent",
          isSearchOpen
            ? "w-[220px] md:w-[280px] border-border/50 bg-background px-3"
            : "w-0 opacity-0 invisible"
        )}>
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <Input
            ref={inputRef}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 text-base shadow-none"
            placeholder="Ara..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchQuery && (
            <X
              className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-destructive shrink-0"
              onClick={() => handleSearchChange("")}
            />
          )}
        </div>

        {/* TETİKLEYİCİ BUTON */}
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-transparent text-muted-foreground hover:text-primary transition-transform hover:scale-110 flex items-center justify-center h-10 w-10 p-0"
          onClick={() => {
            if (isSearchOpen) {
              setIsSearchOpen(false);
              handleSearchChange("");
            } else {
              setIsSearchOpen(true);
            }
          }}
        >
          {isSearchOpen ? (
            <X className="w-6 h-6 shrink-0 stroke-[2.5]" />
          ) : (
            <Search className="w-6 h-6 shrink-0 stroke-[2.5]" />
          )}
        </Button>
      </div>
    </nav>
  );
}