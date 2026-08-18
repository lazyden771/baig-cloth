import { copyFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig, type Plugin, type ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

/**
 * GitHub Pages has no rewrite rules, but it does serve `404.html` for paths it
 * doesn't recognise. Shipping a copy of index.html as 404.html makes shared
 * deep links (e.g. /product/wu-1) load the app instead of GitHub's error page.
 *
 * Netlify uses `public/_redirects` and Vercel uses `vercel.json` for the same
 * thing — all three are harmless on hosts that ignore them.
 */
function spaFallbackHtml(): Plugin {
  let outDir = "dist";
  return {
    name: "spa-404-fallback",
    apply: "build",
    configResolved(config: ResolvedConfig) {
      outDir = config.build.outDir;
    },
    closeBundle() {
      const indexHtml = resolve(outDir, "index.html");
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, resolve(outDir, "404.html"));
      }
    },
  };
}

/**
 * WhatsApp and Facebook want an absolute URL for og:image — a root-relative
 * one often yields a preview card with no picture. The domain isn't known
 * until deploy time, so take it from whatever the host exposes and rewrite
 * index.html on the way out. Falls back to leaving the relative paths alone.
 */
function absoluteSocialUrls(): Plugin {
  // Hosts expose their domain under different names, and some omit the scheme.
  const withScheme = (value: string) =>
    /^https?:\/\//.test(value) ? value : `https://${value}`;
  const raw =
    process.env.SITE_URL ||
    process.env.URL || // Netlify
    process.env.CF_PAGES_URL || // Cloudflare Pages
    process.env.RAILWAY_PUBLIC_DOMAIN || // Railway (no scheme)
    process.env.RAILWAY_STATIC_URL || // Railway, older projects
    process.env.VERCEL_URL || // Vercel (no scheme)
    "";
  const site = raw ? withScheme(raw) : "";

  return {
    name: "absolute-social-urls",
    apply: "build",
    transformIndexHtml(html: string) {
      if (!site) return html;
      const base = site.replace(/\/+$/, "");
      return html.replaceAll('content="/og-image.png"', `content="${base}/og-image.png"`);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), spaFallbackHtml(), absoluteSocialUrls()],
});
