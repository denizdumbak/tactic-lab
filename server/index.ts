import dotenv from 'dotenv';
import path from 'path';
import fs from "fs";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes.js";
import { DatabaseStorage } from "./storage.js";
import { serveStatic } from "./static.js";
import { createDbPool, createDb } from "./db.js";

// Initialize DB and storage after dotenv
const pool = createDbPool();
const db = createDb(pool);
const storage = new DatabaseStorage(db);

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Disable CSP to allow EditorJS (uses eval) - applied in both dev and production
app.use((req, res, next) => {
  res.removeHeader("Content-Security-Policy");
  next();
});

async function bootstrap() {
  await registerRoutes(httpServer, app, storage);

  if (process.env.NODE_ENV !== "production") {
    const { setupVite } = await import("./vite.js");
    await setupVite(httpServer, app);

  } else {
    // Serve static files from dist/public
    const staticDir = path.resolve(process.cwd(), "dist/public");
    if (!fs.existsSync(staticDir)) {
      console.error(`[server] static dir not found: ${staticDir}`);
    }
    app.use(express.static(staticDir));

    // SPA catch-all: serve index.html for any unmatched route
    app.get('*', (req, res) => {
      res.sendFile(path.join(staticDir, 'index.html'));
    });
  }

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    res.status(status).json({ message: err.message || "Internal Server Error" });
  });

  const port = Number(process.env.PORT) || 5001;
  httpServer.listen(port, "0.0.0.0", () => {
    console.log(`[server] running on port ${port}`);
  });
}

bootstrap();
export default app;
