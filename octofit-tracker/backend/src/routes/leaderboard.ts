import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().sort('rank').populate('userId');
  res.json({ data: leaderboard });
});

export default router;
