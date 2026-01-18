import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const copyright = t('footer.copyright').replace('{year}', year.toString());

  return (
    <footer className="mt-20 py-12 border-t border-border/40" data-testid="footer">
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <div className="text-sm text-muted-foreground font-serif italic">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
