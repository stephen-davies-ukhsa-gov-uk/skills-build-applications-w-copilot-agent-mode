import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  const activities = await Activity.find().populate('user', 'name email');
  res.json({ message: 'Activities endpoint', activities });
});

export default router;
