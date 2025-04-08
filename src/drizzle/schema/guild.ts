import { boolean, integer, pgTable, text } from 'drizzle-orm/pg-core';
import { timestamps } from '../helpers';

export const guild = pgTable('guild', {
  id: text('id').primaryKey(),
  locale: text('locale').default('ja').notNull(),
  beforeVerifyLevel: integer('before_verify_level'),
  enableExperimentalFeatures: boolean('enable_experimental_features').default(false).notNull(),
  ...timestamps,
});
