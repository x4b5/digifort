import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const hoofdstukken = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/hoofdstukken' }),
  schema: z.object({
    nr: z.number().nullable(),
    titel: z.string(),
    kort: z.string(),
    // voor zoekmachines (120–155 tekens); zonder dit veld gebruikt de pagina `kort`
    omschrijving: z.string().optional(),
    datum: z.string(),
  }),
});

export const collections = { hoofdstukken };
