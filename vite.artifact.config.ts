import { resolve } from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// One-off config used only to produce a single-chunk build of app.html
// for bundling into a self-contained shareable artifact. Not used in
// normal dev/build — see vite.config.ts for that.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: "dist-artifact",
    cssCodeSplit: false,
    rollupOptions: {
      input: { app: resolve(__dirname, "app.html") },
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});
