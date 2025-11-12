import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig(({ command }) => ({
  root: __dirname,
  envDir: "../backend",
  base: command === "serve" ? "" : "/build/",
  plugins: [
    laravel({
      input: ["src/app.jsx"],
      publicDirectory: "../backend/public", // Correctly points to backend's public dir
      refresh: [
        {
          paths: ["../backend/resources/views/**/*.blade.php"],
          config: { delay: 300 },
        },
      ],
    }),
    react(),
  ],
  server: {
    host: "0.0.0.0",
  },
  build: {
    outDir: "../backend/public/build", // Correctly points to backend's public/build dir
    emptyOutDir: true,
    manifest: true,
  },
}));
