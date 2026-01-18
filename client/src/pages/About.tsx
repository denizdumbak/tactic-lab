import { Layout } from "@/components/Layout";
import { useLanguage } from "@/lib/language-context";

export default function About() {
  const { t, language } = useLanguage();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto pt-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-primary" data-testid="text-about-title">
          {t('about.title')}
        </h1>
        
        <div className="prose prose-lg prose-gray font-serif prose-p:font-sans">
          {language === 'tr' ? (
            <>
              <p>Tactic Lab, kendi futbol yazılarımı ve analizlerimi yayımlamak amacıyla oluşturduğum kişisel bir platformdur. İlk çıkış noktası, çalışmalarımı bir portföy altında toplamak olsa da; zamanla oyuna benzer bir bakış açısıyla yaklaşan diğer yazarların katkılarına da açık bir yapı hedeflemektedir.</p>
              <p>Bu platformdaki temel amacım, futbolu yalnızca skorlar ve sonuçlar üzerinden değil; taktiksel yapılar, teknik detaylar ve oyunu şekillendiren fikirler üzerinden incelemektir. Maç analizleri, taktik çözümlemeler ve kavramsal yazılar aracılığıyla futbol anlayışımı derinleştirmeyi ve analitik bakış açımı sürekli olarak geliştirmeyi amaçlıyorum.</p>
            </>
          ) : (
            <>
              <p>Tactic Lab is a personal platform I created to publish my own football articles and analyses. While its initial purpose was to gather my work under a portfolio, over time it aims to become a structure open to contributions from other writers who share a similar perspective on the game.</p>
              <p>My main goal on this platform is to examine football not only through scores and results, but through tactical structures, technical details, and the ideas that shape the game. Through match analyses, tactical breakdowns, and conceptual articles, I aim to deepen my understanding of football and continuously develop my analytical perspective.</p>
            </>
          )}
          
          <h3 className="text-xl font-bold mt-8 mb-4">{t('about.contact')}</h3>
          <p>
            {language === 'tr' 
              ? 'Tactic Lab, benim için hem öğrenme sürecimin bir parçası hem de futbolun entelektüel ve taktik boyutlarına dair düşüncelerimi yansıttığım bir alan niteliğindedir. İletişim, scouting talepleri veya iş birliği için:'
              : 'Tactic Lab is both part of my learning journey and a space where I reflect my thoughts on the intellectual and tactical dimensions of football. For contact, scouting requests, or collaboration:'}
            <br />
            <a href="mailto:tacticlab@gmail.com" className="text-primary hover:underline">tacticlab@gmail.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
