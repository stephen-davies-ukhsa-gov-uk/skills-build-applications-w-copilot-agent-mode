import express from 'express';
import mongoose from 'mongoose';
import { API_BASE_PATH, CODESPACE_NAME, MONGO_URL, PORT } from './config';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();

app.use(express.json());
app.get('/_health', (_req, res) => res.json({ status: 'ok' }));

app.use(`${API_BASE_PATH}/users`, usersRouter);
app.use(`${API_BASE_PATH}/teams`, teamsRouter);
app.use(`${API_BASE_PATH}/activities`, activitiesRouter);
app.use(`${API_BASE_PATH}/leaderboard`, leaderboardRouter);
app.use(`${API_BASE_PATH}/workouts`, workoutsRouter);

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    console.log('Codespaces-aware API URL:', CODESPACE_NAME ? `https://${CODESPACE_NAME}-8000.githubpreview.dev${API_BASE_PATH}` : `http://localhost:${PORT}${API_BASE_PATH}`);
    app.listen(PORT, () => {
      console.log(`Server listening on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
