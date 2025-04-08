import { integer, jsonb, pgTable, text } from 'drizzle-orm/pg-core';
import { guildId, timestamps } from '../helpers';
import { user } from './auth';

export const auditLog = pgTable('audit_log', {
  guildId,
  authorId: text('author_id')
    .notNull()
    .references(() => user.id),
  actionType: integer('action_type').notNull(),
  oldValue: jsonb('old_value'),
  newValue: jsonb('new_value'),
  createAt: timestamps.createdAt,
});
