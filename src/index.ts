﻿import { drizzle } from 'drizzle-orm/node-postgres';

import * as auditLogSchema from './schema/audit-log';
import * as guildSchema from './schema/guild';
import * as settingSchma from './schema/setting';

export const createDb = () => {
  return drizzle({
    connection: {
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      connectionString: process.env.DATABASE_URL!,
      ssl: false,
    },
    casing: 'snake_case',
    schema: { ...settingSchma, ...guildSchema, ...auditLogSchema },
  });
};
