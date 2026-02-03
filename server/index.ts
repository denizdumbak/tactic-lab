import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes.js";
import { serveStatic } from "./static.js";

const app = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function bootstrap() {
  // 1️⃣ API ROUTES
  await registerRoutes(httpServer, app);

  // 2️⃣ STATIC / VITE
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite.js");
    await setupVite(httpServer, app);
  }

  // 3️⃣ GLOBAL ERROR HANDLER
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
  });

  const port = Number(process.env.PORT) || 5001;
  httpServer.listen(port, () => {
    console.log(`[server] running on http://localhost:${port}`);
  });
}

bootstrap();

export default app;
