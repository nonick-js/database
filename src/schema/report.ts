import { pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import { timestamps } from '../utils/drizzle';
import { guild } from './guild';

export const reportTypeEnum = pgEnum('report_type', ['message', 'user']);

export const report = pgTable('report', {
  guildId: text('guild_id')
    .references(() => guild.id, { onDelete: 'cascade' })
    .notNull(),
  type: reportTypeEnum('type').notNull(),
  userId: text('user_id').notNull(),
  channelId: text('channel_id'),
  messageId: text('message_id'),
  createAt: timestamps.createdAt,
});
