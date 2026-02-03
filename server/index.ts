import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes.js";
import { serveStatic } from "./static.js";

const app = express();
const server = createServer(app);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = Number(process.env.PORT) || 5001;
const NODE_ENV = process.env.NODE_ENV ?? "development";

async function bootstrap() {
  try {
    // 1️⃣ ROUTES
    await registerRoutes(server, app);

    // 2️⃣ FRONTEND SERVING
    if (NODE_ENV === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite.js");
      await setupVite(server, app);
    }

    // 3️⃣ ERROR HANDLER (EN SON)
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      console.error("[server error]", err);
      res.status(err.status || 500).json({
        message: err.message || "Internal Server Error",
      });
    });

    // 4️⃣ LISTEN
    server.listen(PORT, "0.0.0.0", () => {
      console.log(`[server] ${NODE_ENV} running on port ${PORT}`);
    });

  } catch (err) {
    console.error("[bootstrap failed]", err);
    process.exit(1); // ⛔ ÇOK KRİTİK
  }
}

bootstrap();

export default app;
