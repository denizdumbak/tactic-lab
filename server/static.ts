import express, { type Express } from "express";
import path from "path";

export function serveStatic(app: Express) {
  // process.cwd() Vercel'de projenin ana dizinini verir
  const distPath = path.resolve(process.cwd(), "dist", "public");

  // Mevcut fiziksel dosyaları sun
  app.use(express.static(distPath));

  // SPA (Single Page Application) Yönlendirmesi
  // API olmayan ve dosya karşılığı bulunmayan her şeyi index.html'e yönlendir
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next(); // API isteklerini asla HTML'e yönlendirme
    }
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        // Eğer index.html bile yoksa, build hatalıdır
        res.status(404).send("Frontend build bulunamadı. Lütfen Build Loglarını kontrol edin.");
      }
    });
  });
}