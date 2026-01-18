import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language-context";

export function Navigation() {
  const [location] = useLocation();
  const { t } = useLanguage();

  const links = [
    { href: "/scout", labelKey: "nav.scouting" },
    { href: "/taktik", labelKey: "nav.taktik" },
    { href: "/mac-analizi", labelKey: "nav.macAnalizi" },
    { href: "/about", labelKey: "nav.about" },
  ];

  return (
    <nav className="flex items-center space-x-6 md:space-x-8 text-sm md:text-base font-medium tracking-wide" data-testid="navigation">
      {links.map((link) => (
        <Link 
          key={link.href} 
          href={link.href}
          className={cn(
            "hover:text-primary transition-colors duration-200 border-b-2 border-transparent pb-0.5",
            location === link.href 
              ? "text-primary border-primary" 
              : "text-muted-foreground"
          )}
          data-testid={`link-${link.href.slice(1)}`}
        >
          {t(link.labelKey)}
        </Link>
      ))}
    </nav>
  );
}
