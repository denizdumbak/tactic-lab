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
      emptyState: 'Henüz yayımlanmış bir yazı bulunmamaktadır.',
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
      emptyState: 'Bu kategoride henüz yazı bulunmamaktadır.',
    },
    post: {
      backToList: 'Listeye dön',
      notFound: 'Makale bulunamadı',
      backToHome: 'Ana Sayfaya Dön',
      readAnalysis: 'Analizi Oku',
      imageSource: 'Görsel kaynağı: Unsplash',
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
      paragraph1: 'Tactic Lab, kendi futbol yazılarımı ve analizlerimi yayımlamak amacıyla oluşturduğum kişisel bir platformdur. İlk çıkış noktası, çalışmalarımı bir portföy altında toplamak olsa da; zamanla oyuna benzer bir bakış açısıyla yaklaşan diğer yazarların katkılarına da açık bir yapı hedeflemektedir.',
      paragraph2: 'Bu platformdaki temel amacım, futbolu yalnızca skorlar ve sonuçlar üzerinden değil; taktiksel yapılar, teknik detaylar ve oyunu şekillendiren fikirler üzerinden incelemektir. Maç analizleri, taktik çözümlemeler ve kavramsal yazılar aracılığıyla futbol anlayışımı derinleştirmeyi ve analitik bakış açımı sürekli olarak geliştirmeyi amaçlıyorum.',
      contact: 'İletişim',
      contactIntro: 'Tactic Lab, benim için hem öğrenme sürecimin bir parçası hem de futbolun entelektüel ve taktik boyutlarına dair düşüncelerimi yansıttığım bir alan niteliğindedir. İletişim, scouting talepleri veya iş birliği için:',
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
        editorPlaceholder: 'Yazınızı buraya yazın...',
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
      emptyState: 'No posts published yet.',
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
      emptyState: 'No posts in this category yet.',
    },
    post: {
      backToList: 'Back to list',
      notFound: 'Article not found',
      backToHome: 'Back to Home',
      readAnalysis: 'Read Analysis',
      imageSource: 'Image source: Unsplash',
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
      paragraph1: 'Tactic Lab is a personal platform I created to publish my own football articles and analyses. While its initial purpose was to gather my work under a portfolio, over time it aims to become a structure open to contributions from other writers who share a similar perspective on the game.',
      paragraph2: 'My main goal on this platform is to examine football not only through scores and results, but through tactical structures, technical details, and the ideas that shape the game. Through match analyses, tactical breakdowns, and conceptual articles, I aim to deepen my understanding of football and continuously develop my analytical perspective.',
      contact: 'Contact',
      contactIntro: 'Tactic Lab is both part of my learning journey and a space where I reflect my thoughts on the intellectual and tactical dimensions of football. For contact, scouting requests, or collaboration:',
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
        editorPlaceholder: 'Write your content here...',
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
