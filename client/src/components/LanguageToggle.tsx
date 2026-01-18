import { useLanguage } from '@/lib/language-context';
import { Button } from '@/components/ui/button';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1" data-testid="language-toggle">
      <Button
        variant={language === 'tr' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('tr')}
        className="px-2 py-1 h-7 text-xs font-medium"
        data-testid="button-lang-tr"
      >
        TR
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="px-2 py-1 h-7 text-xs font-medium"
        data-testid="button-lang-en"
      >
        EN
      </Button>
    </div>
  );
}
