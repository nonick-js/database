import { drizzle } from 'drizzle-orm/node-postgres';

import * as auditLogSchema from './schema/audit-log';
import * as authSchema from './schema/auth';
import * as guildSchema from './schema/guild';
import * as settingSchma from './schema/setting';

export const db = drizzle({
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  connection: process.env.DATABASE_URL!,
  casing: 'snake_case',
  schema: { ...authSchema, ...settingSchma, ...guildSchema, ...auditLogSchema },
});
