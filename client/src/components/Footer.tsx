export function Footer() {
  return (
    <footer className="mt-20 py-12 border-t border-border/40">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <div className="text-sm text-muted-foreground font-serif italic">
          &copy; {new Date().getFullYear()} Tactic Lab. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
}
