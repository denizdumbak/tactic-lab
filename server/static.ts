import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  // Vercel'de root'tan dist/public'e gitmek için yolu güncelledik
  const distPath = path.resolve(process.cwd(), "dist", "public");
  
  if (!fs.existsSync(distPath)) {
    // Loglarda hatayı görebilmek için console.error ekledik
    console.error(`Statik dizin bulunamadı: ${distPath}`);
    return; // Hata fırlatıp sunucuyu çökertmek yerine sessizce devam et (Vercel routes halledecek)
  }

  app.use(express.static(distPath));

  // Eğer istek bir API isteği değilse ve dosya bulunamadıysa index.html döndür (SPA yönlendirmesi)
  app.use("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}