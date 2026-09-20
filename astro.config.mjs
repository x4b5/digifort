// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import { rehypeTabelScroll, rehypeKamerAnkers } from './src/lib/rehype.mjs';

export default defineConfig({
  site: 'https://je-digitale-huis.vercel.app',
  integrations: [mdx({ rehypePlugins: [rehypeKamerAnkers, rehypeTabelScroll] })],
});
