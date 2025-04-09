import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { createInsertSchema } from '../lib/drizzle';
import { timestamps } from '../utils/drizzle';

export const guild = pgTable('guild', {
  id: text().primaryKey(),
  locale: text().default('ja').notNull(),
  beforeVerifyLevel: integer(),
  enableExperimentalFeatures: boolean().default(false).notNull(),
  ...timestamps,
});

export const guildFormSchema = createInsertSchema(guild).pick({
  enableExperimentalFeatures: true,
  locale: true,
});
