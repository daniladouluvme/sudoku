import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  base: "./",
  build: {
    assetsDir: "./assets",
    outDir: "../build/dist",
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, "../node_modules/@fontsource")],
    },
    proxy: {
      "/api": {
        target: "http://localhost:80",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components"),
      "@context": path.resolve(__dirname, "./src/context"),
      "@providers": path.resolve(__dirname, "./src/providers"),
      "@model": path.resolve(__dirname, "./src/models"),
      "@service": path.resolve(__dirname, "./src/services"),
      "@state": path.resolve(__dirname, "./src/state"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@utils": path.resolve(__dirname, "./src/utils"),
    },
  },
});
