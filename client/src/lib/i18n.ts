export type Language = 'tr' | 'en';

export const translations = {
  tr: {
    nav: {
      scouting: 'Scouting',
      taktik: 'Taktik',
      macAnalizi: 'Maç Analizi',
      about: 'Hakkında',
    },
    home: {
      manifesto: 'Skorun ötesinde, oyunun kalbinde. Her maçın hikayesini, her oyuncunun potansiyelini keşfedin.',
    },
    category: {
      scoutTitle: 'Scouting Raporları',
      scoutDescription: 'Potansiyel yetenekler ve transfer hedeflerine yönelik derinlemesine profil analizleri.',
      taktikTitle: 'Taktik Analiz',
      taktikDescription: 'Sistemlerin, dizilişlerin ve antrenör felsefelerinin ayrıntılı incelemeleri.',
      macAnaliziTitle: 'Maç Analizi',
      macAnaliziDescription: 'Detaylı maç sonu değerlendirmeleri ve kilit performans göstergeleri.',
      labels: {
        scout: 'SCOUTING',
        taktik: 'TAKTİK',
        macAnalizi: 'MAÇ ANALİZİ',
      },
    },
    post: {
      backToList: 'Listeye dön',
      notFound: 'Makale bulunamadı',
      backToHome: 'Ana Sayfaya Dön',
      readAnalysis: 'Analizi Oku',
    },
    scout: {
      title: 'Scout Profili',
      name: 'İsim',
      age: 'Yaş',
      position: 'Pozisyon',
      role: 'Rol',
      strengths: 'Güçlü Yönler',
      risks: 'Zayıf Yönler',
    },
    about: {
      title: 'Hakkında',
      content: 'Tactic Lab, profesyonel ve amatör futbolu taktiksel bir bakış açısıyla inceleyen bağımsız bir futbol analiz platformudur. Analiz perspektifi: Her maçı ve oyuncuyu sayıların ötesinde, stratejik ve teknik detaylarla değerlendiriyoruz. Bağımsız ve tarafsız: Herhangi bir kulüp, federasyon veya medya kuruluşuyla bağlantımız bulunmuyor. Taktik odaklı: Odak noktamız gol istatistikleri değil, oyun içi dinamikler, baskı kalıpları ve alan kontrolüdür.',
      contact: 'İletişim',
    },
    footer: {
      copyright: '© {year} Tactic Lab. Tüm hakları saklıdır.',
    },
    admin: {
      title: 'İçerik Yönetimi',
      newPost: 'Yeni Yazı',
      tableHeaders: {
        title: 'Başlık',
        category: 'Kategori',
        date: 'Tarih',
        actions: 'İşlemler',
      },
      emptyState: 'Henüz yazı bulunmuyor.',
      deleteDialog: {
        title: 'Yazıyı Sil',
        description: 'Bu yazıyı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
        cancel: 'İptal',
        confirm: 'Sil',
      },
      editor: {
        editTitle: 'Yazıyı Düzenle',
        createTitle: 'Yeni Yazı Oluştur',
        titleLabel: 'Başlık',
        titlePlaceholder: 'Yazı başlığı',
        categoryLabel: 'Kategori',
        categoryPlaceholder: 'Kategori seçin',
        summaryLabel: 'Özet',
        summaryPlaceholder: 'Kısa özet...',
        imageLabel: 'Kapak Görseli URL (Opsiyonel)',
        imagePlaceholder: 'https://example.com/image.jpg',
        contentLabel: 'İçerik',
        scoutProfile: 'Oyuncu Profili',
        playerName: 'Oyuncu Adı',
        playerAge: 'Yaş',
        playerPosition: 'Pozisyon',
        playerRole: 'Rol',
        playerStrengths: 'Güçlü Yönler (virgülle ayırın)',
        playerRisks: 'Riskler (virgülle ayırın)',
        saving: 'Kaydediliyor...',
        update: 'Güncelle',
        publish: 'Yayınla',
        back: 'Geri Dön',
      },
    },
  },
  en: {
    nav: {
      scouting: 'Scouting',
      taktik: 'Tactics',
      macAnalizi: 'Match Analysis',
      about: 'About',
    },
    home: {
      manifesto: 'Beyond the score, at the heart of the game. Discover the story of every match, the potential of every player.',
    },
    category: {
      scoutTitle: 'Scouting Reports',
      scoutDescription: 'In-depth profile analyses of potential talents and transfer targets.',
      taktikTitle: 'Tactical Analysis',
      taktikDescription: 'Detailed examinations of systems, formations, and coaching philosophies.',
      macAnaliziTitle: 'Match Analysis',
      macAnaliziDescription: 'Detailed post-match evaluations and key performance indicators.',
      labels: {
        scout: 'SCOUTING',
        taktik: 'TACTICS',
        macAnalizi: 'MATCH ANALYSIS',
      },
    },
    post: {
      backToList: 'Back to list',
      notFound: 'Article not found',
      backToHome: 'Back to Home',
      readAnalysis: 'Read Analysis',
    },
    scout: {
      title: 'Scout Profile',
      name: 'Name',
      age: 'Age',
      position: 'Position',
      role: 'Role',
      strengths: 'Strengths',
      risks: 'Weaknesses',
    },
    about: {
      title: 'About',
      content: 'Tactic Lab is an independent football analysis platform that examines professional and amateur football from a tactical perspective. Analysis perspective: We evaluate every match and player beyond the numbers, with strategic and technical details. Independent and unbiased: We have no affiliation with any club, federation, or media organization. Tactics-focused: Our focus is in-game dynamics, pressing patterns, and space control, not goal statistics.',
      contact: 'Contact',
    },
    footer: {
      copyright: '© {year} Tactic Lab. All rights reserved.',
    },
    admin: {
      title: 'Content Management',
      newPost: 'New Post',
      tableHeaders: {
        title: 'Title',
        category: 'Category',
        date: 'Date',
        actions: 'Actions',
      },
      emptyState: 'No posts yet.',
      deleteDialog: {
        title: 'Delete Post',
        description: 'Are you sure you want to delete this post? This action cannot be undone.',
        cancel: 'Cancel',
        confirm: 'Delete',
      },
      editor: {
        editTitle: 'Edit Post',
        createTitle: 'Create New Post',
        titleLabel: 'Title',
        titlePlaceholder: 'Post title',
        categoryLabel: 'Category',
        categoryPlaceholder: 'Select category',
        summaryLabel: 'Summary',
        summaryPlaceholder: 'Short summary...',
        imageLabel: 'Cover Image URL (Optional)',
        imagePlaceholder: 'https://example.com/image.jpg',
        contentLabel: 'Content',
        scoutProfile: 'Player Profile',
        playerName: 'Player Name',
        playerAge: 'Age',
        playerPosition: 'Position',
        playerRole: 'Role',
        playerStrengths: 'Strengths (comma separated)',
        playerRisks: 'Risks (comma separated)',
        saving: 'Saving...',
        update: 'Update',
        publish: 'Publish',
        back: 'Go Back',
      },
    },
  },
} as const;

export type TranslationKey = keyof typeof translations.tr;

export function t(lang: Language, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  
  return typeof value === 'string' ? value : key;
}

export function getCategoryLabel(lang: Language, slug: string): string {
  const labels = translations[lang].category.labels;
  if (slug === 'scout') return labels.scout;
  if (slug === 'taktik') return labels.taktik;
  if (slug === 'mac-analizi') return labels.macAnalizi;
  return slug.toUpperCase();
}

export function getCategoryTitle(lang: Language, slug: string): string {
  const cat = translations[lang].category;
  if (slug === 'scout') return cat.scoutTitle;
  if (slug === 'taktik') return cat.taktikTitle;
  if (slug === 'mac-analizi') return cat.macAnaliziTitle;
  return slug;
}

export function getCategoryDescription(lang: Language, slug: string): string {
  const cat = translations[lang].category;
  if (slug === 'scout') return cat.scoutDescription;
  if (slug === 'taktik') return cat.taktikDescription;
  if (slug === 'mac-analizi') return cat.macAnaliziDescription;
  return '';
}
