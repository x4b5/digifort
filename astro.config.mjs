// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://digi-fort.nl',
  integrations: [mdx(), sitemap()],
  // bronnen.html in plaats van bronnen/index.html: de links wijzen naar /bronnen,
  // en zo serveert de host die meteen, zonder eerst door te sturen naar /bronnen/
  build: { format: 'file' },
  // de hoofdstukken zijn klein en de bezoeker leest ze op volgorde:
  // haal een pagina alvast op zodra de link in beeld komt
  prefetch: { prefetchAll: true, defaultStrategy: 'viewport' },
});