import express, { type Express } from "express";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");

  // Mevcut dosyaları (js, css, png) sun
  app.use(express.static(distPath));

  // SPA yönlendirmesi: API olmayan her şeyi index.html'e yönlendir
  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"), (err) => {
      if (err) {
        res.status(404).send("Frontend build bulunamadı.");
      }
    });
  });
}