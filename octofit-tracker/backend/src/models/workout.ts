import { Document, Schema, model } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  description: string;
  durationMinutes: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  focusAreas: string[];
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  focusAreas: [{ type: String, required: true }],
});

export default model<IWorkout>('Workout', workoutSchema);
