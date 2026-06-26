import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users.js';
import teamsRouter from './routes/teams.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import workoutsRouter from './routes/workouts.js';
const app = express();
const port = Number(process.env.PORT ?? 8000);
const codespaceHost = process.env.CODESPACE_NAME ? `${process.env.CODESPACE_NAME}-8000.githubpreview.dev` : null;
const apiHost = codespaceHost ? `https://${codespaceHost}` : `http://localhost:${port}`;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
app.use(express.json());
app.get('/', (_req, res) => {
    res.json({
        message: 'OctoFit Tracker backend is running',
        apiUrl: apiHost,
    });
});
app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);
mongoose
    .connect(mongoUri)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Backend listening on http://localhost:${port}`);
        if (codespaceHost) {
            console.log(`Codespaces API URL: https://${codespaceHost}`);
        }
    });
})
    .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});
