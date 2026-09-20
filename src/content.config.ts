import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const hoofdstukken = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/hoofdstukken' }),
  schema: z.object({
    nr: z.number().nullable(),
    titel: z.string(),
    kort: z.string(),
    datum: z.string(),
  }),
});

export const collections = { hoofdstukken };
