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
        console.log(`✓ Frontend found at: ${distPath}`);
        break;
      }
    } catch (e) {
      // ignore
    }
  }

  if (!distPath) {
    // No frontend build found; log candidates for debugging and keep existing behavior
    console.error("❌ Frontend build not found. Checked paths:\n", candidates.join("\n"));
  }

  const serveFrom = distPath ?? path.resolve(process.cwd(), "dist", "public");
  console.log(`📁 Serving static files from: ${serveFrom}`);
  console.log(`✓ index.html exists: ${fs.existsSync(path.join(serveFrom, "index.html"))}`);

  app.use(express.static(serveFrom));

  app.get("*", (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith("/api")) return next();
    
    // Skip asset requests (files with extensions)
    if (/\.\w+$/.test(req.path)) {
      return res.status(404).end();
    }

    // Serve index.html for all other routes (SPA routing)
    res.sendFile(path.join(serveFrom, "index.html"), (err) => {
      if (err) {
        console.error(`❌ Failed to serve index.html from ${serveFrom}:`, err.message);
        res.status(404).send("Frontend build bulunamadı. Lütfen Build Loglarını kontrol edin.");
      }
    });
  });
}