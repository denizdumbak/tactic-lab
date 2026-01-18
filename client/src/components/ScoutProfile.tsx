import { type ScoutProfile as IScoutProfile } from "@shared/schema";
import { useLanguage } from "@/lib/language-context";

interface ScoutProfileProps {
  profile: IScoutProfile;
}

export function ScoutProfile({ profile }: ScoutProfileProps) {
  const { t } = useLanguage();

  return (
    <div className="scout-card bg-[#EBEBE9] p-8 my-10 font-sans" data-testid="scout-profile">
      <h3 className="font-serif text-xl font-bold mb-6 text-primary border-b border-primary/20 pb-2">
        {t('scout.title')}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('scout.name')}</span>
          <span className="text-lg font-semibold">{profile.playerName}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('scout.age')}</span>
            <span className="text-lg font-medium">{profile.age}</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('scout.position')}</span>
            <span className="text-lg font-medium">{profile.position}</span>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">{t('scout.role')}</span>
        <p className="text-base">{profile.role}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t border-primary/10">
        <div>
          <h4 className="font-serif font-bold mb-3 text-primary">{t('scout.strengths')}</h4>
          <ul className="space-y-2">
            {profile.strengths.map((s, i) => (
              <li key={i} className="flex items-start text-sm">
                <span className="mr-2 text-primary">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h4 className="font-serif font-bold mb-3 text-muted-foreground">{t('scout.risks')}</h4>
          <ul className="space-y-2">
            {profile.risks.map((r, i) => (
              <li key={i} className="flex items-start text-sm text-muted-foreground">
                <span className="mr-2 opacity-50">•</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
