import { Schema, model } from 'mongoose';
const teamSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    description: { type: String },
}, { timestamps: true });
const Team = model('Team', teamSchema);
export default Team;
