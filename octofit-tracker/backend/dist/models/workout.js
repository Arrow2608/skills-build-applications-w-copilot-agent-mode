import { Schema, model } from 'mongoose';
const workoutSchema = new Schema({
    name: { type: String, required: true },
    duration: { type: Number, required: true },
    difficulty: { type: String, required: true },
    focus: { type: String },
    caloriesBurned: { type: Number },
}, { timestamps: true });
const Workout = model('Workout', workoutSchema);
export default Workout;
