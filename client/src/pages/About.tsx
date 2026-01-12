import { Layout } from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto pt-10">
        <h1 className="text-3xl md:text-4xl font-serif font-bold mb-8 text-primary">About</h1>
        
        <div className="prose prose-lg prose-gray font-serif prose-p:font-sans">
          <p>
            Futbol Analiz is an independent publication dedicated to the intellectual side of the beautiful game. 
            We believe that football is not just about results, but about the process, the systems, and the individual brilliance that shapes them.
          </p>
          <p>Bu platformdaki temel amacım, futbolu yalnızca skorlar ve sonuçlar üzerinden değil; taktiksel yapılar, teknik detaylar ve oyunu şekillendiren fikirler üzerinden incelemektir. Maç analizleri, taktik çözümlemeler ve kavramsal yazılar aracılığıyla futbol anlayışımı derinleştirmeyi ve analitik bakış açımı sürekli olarak geliştirmeyi amaçlıyorum.</p>
          
          <h3 className="text-xl font-bold mt-8 mb-4">Contact</h3>
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
