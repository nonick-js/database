import { Schema, model } from 'mongoose';
import type { NotificationSchema } from './types';

const schema = new Schema<NotificationSchema>({
  title: { required: true, type: Schema.Types.String },
  description: { required: true, type: Schema.Types.String },
  tags: [Schema.Types.String],
  category: [Schema.Types.String],
  createAt: { required: true, type: Schema.Types.Date },
  updateAt: { required: true, type: Schema.Types.Date },
});

export default model<NotificationSchema>('Notification', schema);
