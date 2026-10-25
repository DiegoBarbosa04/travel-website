import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Lê as variáveis VITE_* do .env da raiz do repo
  envDir: "..",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
