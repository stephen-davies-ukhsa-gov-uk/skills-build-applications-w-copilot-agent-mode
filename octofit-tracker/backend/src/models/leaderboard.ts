import { Document, Schema, model } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  subjectType: 'User' | 'Team';
  subject: Schema.Types.ObjectId;
  score: number;
  rank: number;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  subjectType: { type: String, required: true, enum: ['User', 'Team'] },
  subject: { type: Schema.Types.ObjectId, required: true, refPath: 'subjectType' },
  score: { type: Number, required: true },
  rank: { type: Number, required: true },
});

export default model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
