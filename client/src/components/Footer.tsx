import { useLanguage } from "@/lib/language-context";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const copyright = t('footer.copyright').replace('{year}', year.toString());

  return (
    <footer className="mt-20 py-16 border-t border-border/40" data-testid="footer">
      <div className="flex flex-col items-center gap-8">
        
        {/* Sosyal Medya Grubu */}
        <div className="flex items-center gap-6">
          <a 
            href="https://x.com/denizdumbak" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-12 h-12 rounded-full bg-secondary/30 hover:bg-black transition-all duration-300 shadow-md"
            title="X"
          >
            {/* Orijinal X Logo SVG */}
            <svg 
              viewBox="0 0 24 24" 
              className="h-5 w-5 fill-muted-foreground group-hover:fill-white transition-colors"
              aria-hidden="true"
            >
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
            </svg>
          </a>
        </div>

        {/* Telif Hakkı Metni */}
        <div className="text-sm text-muted-foreground/60 font-serif italic tracking-wide">
          {copyright}
        </div>
        
      </div>
    </footer>
  );
}