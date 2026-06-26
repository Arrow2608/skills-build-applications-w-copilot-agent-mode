import mongoose from 'mongoose';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboard.js';
import Workout from '../models/workout.js';
import { MONGO_URI } from '../config/database.js';

// Seed the octofit_db database with test data
const mongoUri = process.env.MONGODB_URI ?? MONGO_URI;

async function seed() {
  console.log('Connecting to MongoDB to seed the octofit_db database with test data...');
  await mongoose.connect(mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.create([
    { name: 'Avery Athlete', email: 'avery@octofit.com', role: 'member' },
    { name: 'Morgan Move', email: 'morgan@octofit.com', role: 'coach' },
    { name: 'Riley Runner', email: 'riley@octofit.com', role: 'member' },
  ]);

  const teams = await Team.create([
    { name: 'Octo Runners', members: [users[0]._id, users[2]._id], description: 'A fast-paced running team' },
    { name: 'Strength Crew', members: [users[1]._id], description: 'Strength training and conditioning' },
  ]);

  const workouts = await Workout.create([
    { name: 'Full Body HIIT', duration: 25, difficulty: 'medium', focus: 'full body', caloriesBurned: 320 },
    { name: 'Core Builder', duration: 20, difficulty: 'easy', focus: 'core', caloriesBurned: 180 },
    { name: 'Endurance Ride', duration: 45, difficulty: 'hard', focus: 'cardio', caloriesBurned: 520 },
  ]);

  await Activity.create([
    { userId: users[0]._id, type: 'run', duration: 30, calories: 320, notes: 'Morning trail run', date: new Date() },
    { userId: users[1]._id, type: 'strength', duration: 50, calories: 450, notes: 'Upper body session', date: new Date() },
    { userId: users[2]._id, type: 'yoga', duration: 40, calories: 220, notes: 'Recovery flow', date: new Date() },
  ]);

  await LeaderboardEntry.create([
    { userId: users[0]._id, rank: 1, score: 1920 },
    { userId: users[1]._id, rank: 2, score: 1780 },
    { userId: users[2]._id, rank: 3, score: 1640 },
  ]);

  console.log('Seeded users:', users.length);
  console.log('Seeded teams:', teams.length);
  console.log('Seeded workouts:', workouts.length);
  console.log('Seeded activities and leaderboard entries.');

  await mongoose.disconnect();
  console.log('Seeding complete.');
}

seed().catch((err) => {
  console.error('Seed script failed:', err);
  process.exit(1);
});
