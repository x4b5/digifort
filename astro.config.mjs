// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://digifort-blue.vercel.app',
  integrations: [mdx(), sitemap()],
  // de hoofdstukken zijn klein en de bezoeker leest ze op volgorde:
  // haal een pagina alvast op zodra de link in beeld komt
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});