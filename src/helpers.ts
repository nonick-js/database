import { text, timestamp } from "drizzle-orm/pg-core";
import { guild } from "./schema/guild";

export const timestamps = {
  createdAt: timestamp('create_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at'),
}

export const guildId = text('guild_id').primaryKey().references(() => guild.id, { onDelete: 'cascade' });
