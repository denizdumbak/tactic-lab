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
    <nav className="flex items-center space-x-5 md:space-x-8 text-base font-medium tracking-tight">
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
            // pb-1 ile hizalamayı destekledik
            className={cn(
              "hover:text-primary transition-all duration-200 border-b-2 border-transparent pb-1 text-[15px] md:text-[16px] leading-none flex items-center h-full",
              location === link.href ? "text-primary border-primary" : "text-muted-foreground"
            )}
          >
            {t(link.labelKey)}
          </Link>
        ))}
      </div>

      {/* ARAMA ALANI */}
      <div className="relative flex items-center">
        <div className={cn(
          "flex items-center transition-all duration-300 ease-in-out overflow-hidden bg-muted/5 rounded-full border border-transparent",
          isSearchOpen
            ? "w-[220px] md:w-[280px] border-border/50 bg-background px-3"
            : "w-0 opacity-0"
        )}>
          {/* Arama içindeki ikonu da ortaladık */}
          <Search className="w-5 h-5 text-muted-foreground shrink-0" />
          <Input
            ref={inputRef}
            className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 h-10 text-base"
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

        {/* TETİKLEYİCİ BUTON - Buradaki -translate-y-[1px] ikonu milimetrik yukarı taşır */}
        <div className="flex items-center h-full">
          {!isSearchOpen ? (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent text-muted-foreground hover:text-primary transition-transform hover:scale-110 h-auto p-0 -translate-y-[1px]"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="w-6 h-6 stroke-[2.5]" />
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="hover:bg-transparent ml-2 transition-transform hover:scale-110 h-auto p-0 -translate-y-[1px]"
              onClick={() => {
                setIsSearchOpen(false);
                handleSearchChange("");
              }}
            >
              <X className="w-6 h-6 text-muted-foreground stroke-[2.5]" />
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}