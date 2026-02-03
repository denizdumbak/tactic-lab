import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes.js";
import { serveStatic } from "./static.js";

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
  await registerRoutes(httpServer, app);

  if (process.env.NODE_ENV !== "production") {
    const { setupVite } = await import("./vite.js");
    await setupVite(httpServer, app);
  } else {
    serveStatic(app);
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
