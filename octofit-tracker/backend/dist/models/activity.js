import { Schema, model } from 'mongoose';
const activitySchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    notes: { type: String },
    date: { type: Date, default: () => new Date() },
}, { timestamps: true });
const Activity = model('Activity', activitySchema);
export default Activity;
