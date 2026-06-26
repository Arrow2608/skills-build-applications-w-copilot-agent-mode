import mongoose from 'mongoose';

// Consolidated MongoDB connection for octofit_db and Mongoose.
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

export const MONGO_URI = mongoUri;

export async function connectToDatabase() {
  console.log(`Connecting to MongoDB at ${mongoUri}`);
  return mongoose.connect(mongoUri);
}
