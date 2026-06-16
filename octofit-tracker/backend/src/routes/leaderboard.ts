import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('subject');
  res.json({ message: 'Leaderboard endpoint', leaderboard });
});

export default router;
