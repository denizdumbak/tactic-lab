import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

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
    // Çıktıyı tam olarak sunucunun beklediği yere (Ana dizin -> dist -> public) atıyoruz
    outDir: "dist/public",
    emptyOutDir: true,
  },
});