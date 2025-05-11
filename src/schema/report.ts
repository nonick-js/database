import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { timestamps } from '../utils/drizzle';
import { reportSetting } from './setting';

export const report = pgTable('report', {
  id: uuid('id').primaryKey().defaultRandom(),
  guildId: text('guild_id')
    .references(() => reportSetting.guildId, { onDelete: 'cascade' })
    .notNull(),
  channelId: text('channel_id').notNull(),
  threadId: text('thread_id').notNull(),
  targetUserId: text('target_user_id').notNull(),
  targetChannelId: text('target_channel_id'),
  targetMessageId: text('target_message_id'),
  createdAt: timestamps.createdAt,
  closedAt: timestamp('closed_at'),
});
