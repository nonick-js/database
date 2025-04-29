﻿import { z } from '../../../lib/i18n';
import { embed } from './embed';

export const snowflakeRegex = /^\d{17,19}$/;
export const snowflake = z.string().regex(snowflakeRegex);

export const messageOptions = z
  .object({
    content: z.string().max(2000).optional(),
    embeds: z.array(embed).max(10).optional(),
    // 必要に応じて他のプロパティを追加
  })
  .superRefine((v, ctx) => {
    if (!v.content && !v.embeds?.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        params: { i18n: 'message_content_required' },
        path: ['content'],
      });
    }
  });
