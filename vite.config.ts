import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        app: resolve(__dirname, "app.html"),
        // variant B of today's delivery — see README-AB.md
        appB: resolve(__dirname, "app-b.html"),
        // the page being taken forward — see src/landing-main.tsx
        landing: resolve(__dirname, "landing.html"),
        onboarding: resolve(__dirname, "onboarding.html"),
        // dev-facing catalog of Chat/Agents components — see src/library-main.tsx
        library: resolve(__dirname, "library.html"),
      },
    },
  },
});
