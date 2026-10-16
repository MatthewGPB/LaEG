// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://laesquinaguatemalteca.com',
  integrations: [
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  output: 'static',
  // imageService off: AVIF/WebP variants are generated at build time by sharp and served as static files.
  adapter: vercel({ webAnalytics: { enabled: false }, imageService: false }),
  build: { inlineStylesheets: 'auto' },
  image: { domains: ['cdn.shopify.com'] },
});
