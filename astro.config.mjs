import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://guzelyalidonercisi.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory'
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && !page.includes('/admin')
    })
  ]
});
