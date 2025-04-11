import { integer, jsonb, pgTable, text } from 'drizzle-orm/pg-core';
import { timestamps } from '../utils/drizzle';
import { guild } from './guild';

export const auditLog = pgTable('audit_log', {
  guildId: text()
    .primaryKey()
    .references(() => guild.id),
  authorId: text().notNull(),
  actionType: integer().notNull(),
  oldValue: jsonb(),
  newValue: jsonb(),
  createdAt: timestamps.createdAt,
});
