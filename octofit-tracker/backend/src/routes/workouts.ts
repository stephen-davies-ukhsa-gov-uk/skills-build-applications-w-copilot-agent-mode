import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find();
  res.json({ message: 'Workouts endpoint', workouts });
});

export default router;
