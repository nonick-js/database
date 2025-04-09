import { drizzle } from 'drizzle-orm/node-postgres';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
export const db = drizzle({ connection: process.env.DATABASE_URL!, casing: 'snake_case' });
