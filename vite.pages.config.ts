import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { writeFileSync, mkdirSync, renameSync } from "node:fs";
import { grokPwaPlugin } from "./scripts/grok-pwa-plugin.mjs";
import { renderWebManifest } from "./scripts/grok-pwa-shared.mjs";

const base = "/kink-korps-propaganda-site/";
export default defineConfig({
  base,
  resolve: { tsconfigPaths: true },
  build: { outDir: "docs", emptyOutDir: true, rollupOptions: { input: "pages.html" } },
  plugins: [grokPwaPlugin(), tailwindcss(), react(), {
    name: "pages-static-paths",
    transformIndexHtml: { order: "post", handler: (html) => html.replaceAll('href="/__grok/', `href="${base}__grok/`) },
    closeBundle() {
      renameSync("docs/pages.html", "docs/index.html");
      mkdirSync("docs/__grok", { recursive: true });
      const manifest = JSON.parse(renderWebManifest("krystal929-afk.github.io"));
      manifest.start_url = base;
      manifest.scope = base;
      manifest.icons = manifest.icons.map((icon: { src: string }) => ({ ...icon, src: base + icon.src.replace(/^\//, "") }));
      writeFileSync("docs/__grok/manifest.webmanifest", JSON.stringify(manifest));
      writeFileSync("docs/.nojekyll", "");
    },
  }],
});
