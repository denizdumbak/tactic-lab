import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "client", "src"),
      "@shared": path.resolve(process.cwd(), "shared"),
    },
  },
  root: path.resolve(process.cwd(), "client"),
  build: {
    // Output to ../dist/public relative to client folder
    outDir: path.resolve(__dirname, "../dist/public"),
    emptyOutDir: true,
  },
});
