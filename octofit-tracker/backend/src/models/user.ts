import { Document, Schema, model } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'member' | 'coach' | 'admin';
  joinedAt: Date;
  team: Schema.Types.ObjectId | null;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['member', 'coach', 'admin'], default: 'member' },
  joinedAt: { type: Date, required: true, default: () => new Date() },
  team: { type: Schema.Types.ObjectId, ref: 'Team', default: null },
});

export default model<IUser>('User', userSchema);
