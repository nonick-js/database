import { integer, pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers";

export const guild = pgTable('guild', {
  id: text('id').primaryKey(),
  beforeVerifyLevel: integer('before_verify_level'),
  betaEnabled: boolean('beta_enabled').default(false).notNull(),
  ...timestamps
});

