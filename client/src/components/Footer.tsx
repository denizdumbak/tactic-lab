import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="mt-20 py-12 border-t border-border/40">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-sm text-muted-foreground font-serif italic">
          &copy; {new Date().getFullYear()} Futbol Analiz. All rights reserved.
        </div>
        
        <div className="flex gap-6">
          <Link href="/write" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Staff Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
