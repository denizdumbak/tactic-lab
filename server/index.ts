import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { serveStatic } from "./static.js";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

(async () => {
  // 1. ÖNCELİK: API Rotaları
  await registerRoutes(httpServer, app);

  // 2. SONRA: Statik Dosyalar (Production) veya Vite (Dev)
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite.js");
    await setupVite(httpServer, app);
    
    const port = 5001;
    httpServer.listen(port, "127.0.0.1", () => {
      console.log(`[express] serving on port ${port}`);
    });
  }

  // 3. EN SON: Global Hata Yakalayıcı
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });
})();

export default app;