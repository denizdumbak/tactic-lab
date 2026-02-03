import express, { type Express } from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  // Vercel'de hem local hem prod uyumlu yol
  const distPath = path.resolve(process.cwd(), "dist", "public");

  app.use(express.static(distPath));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        res.status(404).send("Frontend build bulunamadı. Lütfen Build Loglarını kontrol edin.");
      }
    });
  });
}