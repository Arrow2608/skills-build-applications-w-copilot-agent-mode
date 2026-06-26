import { Schema, model } from 'mongoose';
const leaderboardSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
}, { timestamps: true });
const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
export default LeaderboardEntry;
