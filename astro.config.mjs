// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://laesquinaguatemalteca.com',
  integrations: [
    tailwind({
      applyBaseStyles: false, // we apply our own base in global.css
    }),
    sitemap(),
  ],
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: false }, // we use GA4 instead
    imageService: true,
  }),
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    // Allow Shopify CDN fallback if any old assets need to be referenced briefly
    domains: ['cdn.shopify.com'],
  },
});
