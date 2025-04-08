import { ChannelType, GuildVerificationLevel } from 'discord-api-types/v10';
import {
  autoChangeVerifyLevelSetting,
  autoCreateThreadSetting,
  autoModSetting,
  autoPublicSetting,
  banLogSetting,
  joinMessageSetting,
  kickLogSetting,
  leaveMessageSetting,
  msgDeleteLogSetting,
  msgEditLogSetting,
  msgExpandSetting,
  reportSetting,
  timeoutLogSetting,
  voiceLogSetting,
} from '../../drizzle/schema/guild-setting';
import { createInsertSchema } from '../lib/drizzle';
import { z } from '../lib/i18n';
import { domainRegex, isUniqueArray } from '../utils';
import { Limits, messageOptions, snowflakeRegex } from '../utils/discord';

// 入室メッセージ
export const joinMessageSettingFormSchema = createInsertSchema(joinMessageSetting, {
  channel: (schema) => schema.regex(snowflakeRegex),
  message: messageOptions,
})
  .omit({ guildId: true, createdAt: true, updatedAt: true })
  .superRefine((v, ctx) => {
    if (v.enabled && !v.channel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'missing_channel' },
        path: ['channel'],
      });
    }
  });

// 退室メッセージ
export const leaveMessageSettingFormSchema = createInsertSchema(leaveMessageSetting, {
  channel: (schema) => schema.regex(snowflakeRegex),
  message: messageOptions,
})
  .omit({ guildId: true, createdAt: true, updatedAt: true })
  .superRefine((v, ctx) => {
    if (v.enabled && !v.channel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'missing_channel' },
        path: ['channel'],
      });
    }
  });

// サーバー内通報
export const reportSettingFormSchema = createInsertSchema(reportSetting, {
  channel: (schema) => schema.regex(snowflakeRegex),
  mentionRoles: z
    .array(z.string().regex(snowflakeRegex))
    .max(Limits.Guild.Roles)
    .refine(isUniqueArray, { params: { i18n: 'duplicate_item' } }),
})
  .omit({ guildId: true, createdAt: true, updatedAt: true })
  .superRefine((v, ctx) => {
    if (v.enableMention && !v.mentionRoles.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'missing_role' },
        path: ['mentionRoles'],
      });
    }
  });

// イベントログ (タイムアウト)
export const timeoutLogSettingFormSchema = createInsertSchema(timeoutLogSetting, {
  channel: (schema) => schema.regex(snowflakeRegex),
})
  .omit({ guildId: true, createdAt: true, updatedAt: true })
  .superRefine((v, ctx) => {
    if (v.enabled && !v.channel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'missing_channel' },
        path: ['channel'],
      });
    }
  });

// イベントログ (Kick)
export const kickLogSettingFormSchema = createInsertSchema(kickLogSetting, {
  channel: (schema) => schema.regex(snowflakeRegex),
})
  .omit({ guildId: true, createdAt: true, updatedAt: true })
  .superRefine((v, ctx) => {
    if (v.enabled && !v.channel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'missing_channel' },
        path: ['channel'],
      });
    }
  });

// イベントログ (Ban)
export const banLogSettingFormSchema = createInsertSchema(banLogSetting, {
  channel: (schema) => schema.regex(snowflakeRegex),
})
  .omit({ guildId: true, createdAt: true, updatedAt: true })
  .superRefine((v, ctx) => {
    if (v.enabled && !v.channel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'missing_channel' },
        path: ['channel'],
      });
    }
  });

// イベントログ (VC)
export const voiceLogSettingFormSchema = createInsertSchema(voiceLogSetting, {
  channel: (schema) => schema.regex(snowflakeRegex),
})
  .omit({ guildId: true, createdAt: true, updatedAt: true })
  .superRefine((v, ctx) => {
    if (v.enabled && !v.channel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'missing_channel' },
        path: ['channel'],
      });
    }
  });

// イベントログ (メッセージ削除)
export const msgDeleteLogSettingFormSchema = createInsertSchema(msgDeleteLogSetting, {
  channel: (schema) => schema.regex(snowflakeRegex),
})
  .omit({ guildId: true, createdAt: true, updatedAt: true })
  .superRefine((v, ctx) => {
    if (v.enabled && !v.channel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'missing_channel' },
        path: ['channel'],
      });
    }
  });

// イベントログ (メッセージ編集)
export const msgEditLogSettingFormSchema = createInsertSchema(msgEditLogSetting, {
  channel: (schema) => schema.regex(snowflakeRegex),
})
  .omit({ guildId: true, createdAt: true, updatedAt: true })
  .superRefine((v, ctx) => {
    if (v.enabled && !v.channel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'missing_channel' },
        path: ['channel'],
      });
    }
  });

// メッセージURL展開
const ignorePrefixes = ['!', '?', '.', '#', '$', '%', '&', '^', '<'];

export const msgExpandSettingFormSchema = createInsertSchema(msgExpandSetting, {
  ignoreChannels: z
    .array(z.string().regex(snowflakeRegex))
    .max(Limits.Guild.Channels)
    .refine(isUniqueArray, { params: { i18n: 'duplicate_item' } }),
  ignoreChannelTypes: z
    .array(z.coerce.number().pipe(z.nativeEnum(ChannelType)))
    .refine(isUniqueArray, { params: { i18n: 'duplicate_item' } }),
  ignorePrefixes: z
    .array(z.string())
    .max(5)
    .refine(isUniqueArray, { params: { i18n: 'duplicate_item' } })
    .refine((v) => v.every((prefix) => ignorePrefixes.includes(prefix)), {
      params: { i18n: 'invalid_prefixes' },
    }),
}).omit({ guildId: true, createdAt: true, updatedAt: true });

// 自動認証レベル変更
export const autoChangeVerifyLevelSettingFormSchema = createInsertSchema(
  autoChangeVerifyLevelSetting,
  {
    level: (schema) => schema.pipe(z.nativeEnum(GuildVerificationLevel)),
    startHour: (schema) => schema.int().min(0).max(23),
    endHour: (schema) => schema.int().min(0).max(23),
    logChannel: (schema) => schema.regex(snowflakeRegex),
  },
)
  .omit({ guildId: true, createdAt: true, updatedAt: true })
  .superRefine((v, ctx) => {
    if (v.startHour === v.endHour) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'same_start_end_time' },
        path: ['endHour'],
      });
    }

    if (v.enabled && v.enableLog && !v.logChannel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'missing_channel' },
        path: ['logChannel'],
      });
    }
  });

// 自動アナウンス公開
export const autoPublicSettingFormSchema = createInsertSchema(autoPublicSetting, {
  channels: z
    .array(z.string().regex(snowflakeRegex))
    .max(Limits.Guild.Channels)
    .refine(isUniqueArray, { params: { i18n: 'duplicate_item' } }),
}).omit({ guildId: true, createdAt: true, updatedAt: true });

// 自動スレッド作成
export const autoCreateThreadSettingFormSchema = createInsertSchema(autoCreateThreadSetting, {
  channels: z
    .array(z.string().regex(snowflakeRegex))
    .max(Limits.Guild.Channels)
    .refine(isUniqueArray, { params: { i18n: 'duplicate_item' } }),
}).omit({ guildId: true, createdAt: true, updatedAt: true });

// AutoMod Plus
export const autoModSettingFormSchema = createInsertSchema(autoModSetting, {
  domainList: z.preprocess(
    (v) =>
      String(v)
        .split(/,|\n/)
        .reduce<string[]>((acc, item) => {
          const trimmed = item.trim();
          if (trimmed) acc.push(trimmed);
          return acc;
        }, []),
    z
      .array(z.string())
      .max(20)
      .refine((v) => v.every((domain) => domainRegex.test(domain)), {
        params: { i18n: 'invalid_domains' },
      }),
  ),
  ignoreChannels: z
    .array(z.string().regex(snowflakeRegex))
    .max(Limits.Guild.Channels)
    .refine(isUniqueArray, { params: { i18n: 'duplicate_item' } }),
  ignoreRoles: z
    .array(z.string().regex(snowflakeRegex))
    .max(Limits.Guild.Roles)
    .refine(isUniqueArray, { params: { i18n: 'duplicate_item' } }),
  logChannel: (schema) => schema.regex(snowflakeRegex),
})
  .omit({ guildId: true, createdAt: true, updatedAt: true })
  .superRefine((v, ctx) => {
    if (v.enabled && v.enableLog && !v.logChannel) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'missing_channel' },
        path: ['logChannel'],
      });
    }
  });
