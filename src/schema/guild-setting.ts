import type { BaseMessageOptions } from 'discord.js';
import { boolean, integer, jsonb, pgSchema, text } from 'drizzle-orm/pg-core';
import { guildId, timestamps } from '../helpers';

export const guildSettingSchema = pgSchema('guild_setting');

// 入室メッセージ
export const joinMessageSetting = guildSettingSchema.table('join_message', {
  guildId,
  enabled: boolean('enabled').notNull(),
  channel: text('channel'),
  ignoreBot: boolean('ignore_bot').notNull(),
  message: jsonb('message').$type<BaseMessageOptions>().notNull(),
  ...timestamps,
});

// 退室メッセージ
export const leaveMessageSetting = guildSettingSchema.table('leave_message', {
  guildId,
  enabled: boolean('enabled').notNull(),
  channel: text('channel').notNull(),
  ignoreBot: boolean('ignore_bot').notNull(),
  message: jsonb('message').$type<BaseMessageOptions>().notNull(),
  ...timestamps,
});

// サーバー内通報
export const reportSetting = guildSettingSchema.table('report', {
  guildId,
  channel: text('channel'),
  includeModerator: boolean('include_moderator').notNull(),
  showProgressButton: boolean('show_progress_button').notNull(),
  enableMention: boolean('enable_mention').notNull(),
  mentionRoles: text('mention_roles').array(),
  ...timestamps,
});

// イベントログ
const baseLogSetting = {
  guildId,
  enabled: boolean('enabled').notNull(),
  channel: text('channel'),
  ...timestamps,
};

export const timeoutLogSetting = guildSettingSchema.table('timeout_log', baseLogSetting);
export const kickLogSetting = guildSettingSchema.table('kick_log', baseLogSetting);
export const banLogSetting = guildSettingSchema.table('ban_log', baseLogSetting);
export const voiceLogSetting = guildSettingSchema.table('voice_log', baseLogSetting);
export const msgDeleteLogSetting = guildSettingSchema.table('message_delete_log', baseLogSetting);
export const msgEditLogSetting = guildSettingSchema.table('message_edit_log', baseLogSetting);

// メッセージURL展開
export const msgExpandSetting = guildSettingSchema.table('message_expand', {
  guildId,
  enabled: boolean('enabled').notNull(),
  allowExternalGuild: boolean('allow_external_guild').notNull(),
  ignoreChannels: text('ignore_channels').array(),
  ignoreChannelTypes: text('ignore_channel_types').array(),
  ignorePrefixes: text('ignore_prefixes').array(),
  ...timestamps,
});

// 自動認証レベル変更
export const autoChangeVerifyLevelSetting = guildSettingSchema.table('auto_change_verify_level', {
  guildId,
  enabled: boolean('enabled').notNull(),
  startHour: integer('start_hour').notNull(),
  endHour: integer('end_hour').notNull(),
  level: integer('level').notNull(),
  enableLog: boolean('enable_log').notNull(),
  logChannel: text('log_channel'),
  ...timestamps,
});

// 自動アナウンス公開
export const autoPublicSetting = guildSettingSchema.table('auto_public', {
  guildId,
  enabled: boolean('enabled').notNull(),
  channels: text('channels').array(),
  ...timestamps,
});

// 自動スレッド作成
export const autoCreateThreadSetting = guildSettingSchema.table('auto_create_thread', {
  guildId,
  enabled: boolean('enabled').notNull(),
  channels: text('channels').array(),
  ...timestamps,
});

// AutoMod Plus
export const autoModSetting = guildSettingSchema.table('auto_mod', {
  guildId,
  enabled: boolean('enabled').notNull(),
  enableDomainFilter: boolean('enable_domain_filter').notNull(),
  enableInviteUrlFilter: boolean('enable_invite_url_filter').notNull(),
  enableTokenFilter: boolean('enable_token_filter').notNull(),
  domainList: text('domain_list').array(),
  ignoreChannels: text('ignore_channels').array(),
  ignoreRoles: text('ignore_roles').array(),
  enableLog: boolean('enable_log').notNull(),
  logChannel: text('log_channel'),
  ...timestamps,
});
