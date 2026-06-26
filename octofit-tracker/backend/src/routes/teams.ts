import { Router } from 'express';
import Team from '../models/team.js';

const router = Router();

router.get('/', async (_req, res) => {
  const teams = await Team.find().populate('members');
  res.json({ data: teams });
});

router.post('/', async (req, res) => {
  const team = new Team(req.body);
  await team.save();
  res.status(201).json({ data: team });
});

export default router;
