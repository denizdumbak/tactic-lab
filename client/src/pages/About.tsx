import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto pt-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-primary">Hakkında</h1>
        
        <div className="prose prose-lg prose-gray font-serif prose-p:font-sans">
          <p>Futbol Analiz, kendi futbol yazılarımı ve analizlerimi yayımlamak amacıyla oluşturduğum kişisel bir platformdur. İlk çıkış noktası, çalışmalarımı bir portföy altında toplamak olsa da; zamanla oyuna benzer bir bakış açısıyla yaklaşan diğer yazarların katkılarına da açık bir yapı hedeflemektedir.</p>
          <p>Bu platformdaki temel amacım, futbolu yalnızca skorlar ve sonuçlar üzerinden değil; taktiksel yapılar, teknik detaylar ve oyunu şekillendiren fikirler üzerinden incelemektir. Maç analizleri, taktik çözümlemeler ve kavramsal yazılar aracılığıyla futbol anlayışımı derinleştirmeyi ve analitik bakış açımı sürekli olarak geliştirmeyi amaçlıyorum.</p>
          
          <h3 className="text-xl font-bold mt-8 mb-4">İletişim</h3>
          <p>
            For inquiries, scouting requests, or collaboration:
            <br />
            <a href="mailto:hello@futbolanaliz.com" className="text-primary hover:underline">hello@futbolanaliz.com</a>
          </p>
        </div>
      </div>
    </Layout>
  );
}
