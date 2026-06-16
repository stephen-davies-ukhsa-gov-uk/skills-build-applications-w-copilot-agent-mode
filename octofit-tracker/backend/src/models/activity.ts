import { Document, Schema, model } from 'mongoose';

export interface IActivity extends Document {
  user: Schema.Types.ObjectId;
  type: string;
  durationMinutes: number;
  calories: number;
  date: Date;
  notes: string;
}

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  calories: { type: Number, required: true },
  date: { type: Date, required: true, default: () => new Date() },
  notes: { type: String, default: '' },
});

export default model<IActivity>('Activity', activitySchema);
