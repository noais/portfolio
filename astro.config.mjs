// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://davidferreira.dev',
  // /nursling/get/ only redirects to the stores, so keep it out of the sitemap.
  integrations: [sitemap({ filter: (page) => !page.endsWith('/nursling/get/') })],
  vite: {
    plugins: [tailwindcss()],
  },
});
