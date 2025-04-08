import { guild } from '../../drizzle/schema/guild';
import { createInsertSchema } from '../lib/drizzle';

export const guildFormSchema = createInsertSchema(guild).pick({
  enableExperimentalFeatures: true,
  locale: true,
});
