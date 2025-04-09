import { drizzle } from 'drizzle-orm/node-postgres';

import * as auditLogSchema from './schema/audit-log';
import * as authSchema from './schema/auth';
import * as guildSchema from './schema/guild';
import * as settingSchma from './schema/setting';

export const db = drizzle({
  connection: {
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    connectionString: process.env.DATABASE_URL!,
    ssl: false,
  },
  casing: 'snake_case',
  schema: { ...authSchema, ...settingSchma, ...guildSchema, ...auditLogSchema },
});
