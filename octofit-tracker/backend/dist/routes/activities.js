import { Router } from 'express';
import Activity from '../models/activity.js';
const router = Router();
router.get('/', async (_req, res) => {
    const activities = await Activity.find().populate('userId');
    res.json({ data: activities });
});
router.post('/', async (req, res) => {
    const activity = new Activity(req.body);
    await activity.save();
    res.status(201).json({ data: activity });
});
export default router;
