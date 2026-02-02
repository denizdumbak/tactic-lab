import express, { type Express } from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  // En güvenli yol: Proje kök dizininden dist/public'e bak
  const distPath = path.resolve(process.cwd(), "dist", "public");

  app.use(express.static(distPath));

  app.use("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        res.status(404).send("Frontend dosyaları (index.html) bulunamadı. Lütfen 'npm run build' yapıldığından emin olun.");
      }
    });
  });
}