import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Public assets must resolve from the repository root on GitHub Pages. Local
  // previews retain relative paths so each HTML entry can still be opened alone.
  base: process.env.GITHUB_ACTIONS === "true" ? "/starchild/" : "./",
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        // variant B of today's delivery — see README-AB.md
        // the page being taken forward — see src/landing-main.tsx
        landing: resolve(__dirname, "design/landing.html"),
        designSystem: resolve(__dirname, "design/design-system.html"),
        // "Version B" product architecture (see sitemap.html) — Main Agent +
        // Jobs + optional Agents, built on the prototype/ tree since that's
        // the one with the Jobs/Automations feature already in it
        // a dedicated link that always shows the mobile layout, regardless of
        // the actual window it's opened in — wraps onboarding.html in a
        // phone-width frame; see onboarding-mobile.html for why an iframe
        // dev-facing catalog of Chat/Agents components — see src/library-main.tsx
      },
    },
  },
});
