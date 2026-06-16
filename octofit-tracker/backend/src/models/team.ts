import { Document, Schema, model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  description: string;
  members: Schema.Types.ObjectId[];
  points: number;
  createdAt: Date;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  points: { type: Number, required: true, default: 0 },
  createdAt: { type: Date, required: true, default: () => new Date() },
});

export default model<ITeam>('Team', teamSchema);
