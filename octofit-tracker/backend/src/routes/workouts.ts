import { Router } from 'express';
import Workout from '../models/workout.js';

const router = Router();

router.get('/', async (_req, res) => {
  const workouts = await Workout.find();
  res.json({ data: workouts });
});

router.post('/', async (req, res) => {
  const workout = new Workout(req.body);
  await workout.save();
  res.status(201).json({ data: workout });
});

export default router;
