import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { writeFileSync, mkdirSync, renameSync, readFileSync } from "node:fs";
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
      const html = readFileSync("docs/index.html", "utf8");
      const pages: Record<string, string> = { "events": "Events", "events/anything-goes": "Anything Goes · Halloween Edition", "the-korps": "The Korps", "field-guide": "The Field Guide", "get-involved": "Get Involved" };
      for (const [path, title] of Object.entries(pages)) {
        mkdirSync(`docs/${path}`, { recursive: true });
        writeFileSync(`docs/${path}/index.html`, html.replace(/<title>.*?<\/title>/, `<title>${title} — Kink Korps</title>`));
      }
      writeFileSync("docs/404.html", html.replace(/<title>.*?<\/title>/, "<title>Page not found — Kink Korps</title>"));
    },
  }],
});
