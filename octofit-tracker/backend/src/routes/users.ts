import { Router } from 'express';
import User from '../models/user';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().populate('team', 'name points');
  res.json({ message: 'Users endpoint', users });
});

export default router;
