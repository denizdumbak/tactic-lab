import { type ScoutProfile as IScoutProfile } from "@shared/schema";

interface ScoutProfileProps {
  profile: IScoutProfile;
}

export function ScoutProfile({ profile }: ScoutProfileProps) {
  return (
    <div className="scout-card bg-[#EBEBE9] p-8 my-10 font-sans">
      <h3 className="font-serif text-xl font-bold mb-6 text-primary border-b border-primary/20 pb-2">
        Scout Profile
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Name</span>
          <span className="text-lg font-semibold">{profile.playerName}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Age</span>
            <span className="text-lg font-medium">{profile.age}</span>
          </div>
          <div>
            <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Position</span>
            <span className="text-lg font-medium">{profile.position}</span>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <span className="block text-xs uppercase tracking-wider text-muted-foreground mb-1">Role</span>
        <p className="text-base">{profile.role}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-6 border-t border-primary/10">
        <div>
          <h4 className="font-serif font-bold mb-3 text-primary">Strengths</h4>
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
          <h4 className="font-serif font-bold mb-3 text-muted-foreground">Risks / Weaknesses</h4>
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
