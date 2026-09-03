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
        // the page being taken forward — see src/landing-main.tsx
        landing: resolve(__dirname, "landing.html"),
        onboarding: resolve(__dirname, "onboarding.html"),
      },
    },
  },
});
