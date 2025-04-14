import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from '../lib/drizzle';
import type { TableZodSchemas, WithForm } from '../types';
import { timestamps } from '../utils/drizzle';

export const guild = pgTable('guild', {
  id: text().primaryKey(),
  locale: text().default('ja').notNull(),
  beforeVerifyLevel: integer(),
  ...timestamps,
});

export const guildSchema: WithForm<TableZodSchemas> = {
  db: createInsertSchema(guild),
  form: createInsertSchema(guild).pick({
    locale: true,
  }),
};
