export const CATEGORY_LABELS: Record<string, string> = {
  "scout": "SCOUTING",
  "taktik": "TAKTİK",
  "mac-analizi": "MAÇ ANALİZİ"
};

export const CATEGORY_TITLES: Record<string, string> = {
  "scout": "Scouting Raporları",
  "taktik": "Taktik Analiz",
  "mac-analizi": "Maç Analizi"
};

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  "scout": "Potansiyel yetenekler ve transfer hedeflerine yönelik derinlemesine profil analizleri.",
  "taktik": "Sistemlerin, dizilişlerin ve antrenör felsefelerinin ayrıntılı incelemeleri.",
  "mac-analizi": "Detaylı maç sonu değerlendirmeleri ve kilit performans göstergeleri."
};

export const PLACEHOLDER_IMAGES: Record<string, string> = {
  "scout": "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
  "taktik": "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80",
  "mac-analizi": "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80",
  "default": "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80"
};

export function getCategoryLabel(slug: string): string {
  return CATEGORY_LABELS[slug] || slug.toUpperCase();
}

export function getPlaceholderImage(category: string): string {
  return PLACEHOLDER_IMAGES[category] || PLACEHOLDER_IMAGES.default;
}
