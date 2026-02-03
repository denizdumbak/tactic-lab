import express, { type Express } from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function serveStatic(app: Express) {
  // Try multiple possible build output locations so the server works across hosts
  const candidates = [
    path.resolve(process.cwd(), "dist", "public"),
    path.resolve(process.cwd(), "client", "dist", "public"),
    path.resolve(__dirname, "..", "dist", "public"),
  ];

  let distPath: string | null = null;
  for (const c of candidates) {
    try {
      const stat = fs.statSync(c);
      if (stat && stat.isDirectory()) {
        distPath = c;
        break;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!distPath) {
    // No frontend build found; log candidates for debugging and keep existing behavior
    console.error("Frontend build not found. Checked paths:\n", candidates.join("\n"));
  } else {
    console.log("Serving frontend from:", distPath);
  }

  const serveFrom = distPath ?? path.resolve(process.cwd(), "dist", "public");

  app.use(express.static(serveFrom));

  app.get("*", (req, res, next) => {
    if (req.path.startsWith("/api")) return next();

    res.sendFile(path.join(serveFrom, "index.html"), (err) => {
      if (err) {
        res.status(404).send("Frontend build bulunamadı. Lütfen Build Loglarını kontrol edin.");
      }
    });
  });
}