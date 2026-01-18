import { Layout } from "@/components/Layout";
import { useLanguage } from "@/lib/language-context";

export default function About() {
  const { t } = useLanguage();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto pt-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-primary" data-testid="text-about-title">
          {t('about.title')}
        </h1>
        
        <div className="prose prose-lg prose-gray font-serif prose-p:font-sans">
          <p>{t('about.paragraph1')}</p>
          <p>{t('about.paragraph2')}</p>
          
          <h3 className="text-xl font-bold mt-8 mb-4">{t('about.contact')}</h3>
          <p>
            {t('about.contactIntro')}
            <br />
            <a href="mailto:tacticlab@gmail.com" className="text-primary hover:underline">tacticlab@gmail.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
