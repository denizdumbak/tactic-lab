import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

export function Navigation() {
  const [location] = useLocation();

  const links = [
    { href: "/scout", label: "Scout" },
    { href: "/taktik", label: "Taktik" },
    { href: "/mac-analizi", label: "Maç Analizi" },
    { href: "/about", label: "About" },
  ];

  return (
    <nav className="flex items-center space-x-6 md:space-x-8 text-sm md:text-base font-medium tracking-wide">
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
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
