import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes.js";
import { serveStatic } from "./static.js";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 1. Önce statik dosyaları sun (Auth'a takılmasın)
if (process.env.NODE_ENV === "production") {
  serveStatic(app);
}

(async () => {
  // 2. Sonra API rotalarını kaydet
  await registerRoutes(httpServer, app);

  // Global Hata Yakalayıcı
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  // 3. Vite ayarı (Sadece Development'ta)
  if (process.env.NODE_ENV !== "production") {
    const { setupVite } = await import("./vite.js");
    await setupVite(httpServer, app);
    
    const port = 5001;
    httpServer.listen(port, "127.0.0.1", () => {
      console.log(`[express] serving on port ${port}`);
    });
  }
})();

export default app;