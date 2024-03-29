import { Model, Schema, model, models } from 'mongoose';
import type { ModerateSettingSchema } from './types.d.ts';
import { serverId, snowflake } from './util';

const schema = new Schema<ModerateSettingSchema>({
  serverId,
  autoMod: {
    enable: Schema.Types.Boolean,
    log: {
      enable: Schema.Types.Boolean,
      channel: snowflake,
    },
    filter: {
      domain: {
        enable: Schema.Types.Boolean,
        list: [Schema.Types.String],
      },
      token: Schema.Types.Boolean,
      inviteUrl: Schema.Types.Boolean,
    },
    ignore: {
      channels: [snowflake],
      roles: [snowflake],
    },
  },
  report: {
    channel: snowflake,
    includeModerator: Schema.Types.Boolean,
    progressButton: Schema.Types.Boolean,
    mention: {
      enable: Schema.Types.Boolean,
      role: snowflake,
    },
  },
});

schema.pre('updateOne', async function (next) {
  this.setOptions({
    runValidators: true,
  });
  return next();
});

schema.pre('findOneAndUpdate', async function (next) {
  this.setOptions({
    runValidators: true,
  });
  return next();
});

export default models?.ModerateSetting
  ? (models.ModerateSetting as Model<ModerateSettingSchema>)
  : model<ModerateSettingSchema, Model<ModerateSettingSchema>>(
      'ModerateSetting',
      schema,
    );
