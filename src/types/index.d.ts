import type { z } from 'zod';

export type TableZodSchemas = {
  db: z.ZodSchema;
};

export type WithForm<T extends TableZodSchemas> = T & { form: z.ZodSchema };
