/**
 * Seed the octofit_db database with test data.
 *
 * This script creates sample users, teams, activities, leaderboard entries, and workouts.
 */
import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URL);
  console.log(`Connected to ${MONGO_URL}`);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const ava = await new User({ name: 'Ava Patel', email: 'ava.patel@example.com', role: 'member' }).save();
  const noah = await new User({ name: 'Noah Kim', email: 'noah.kim@example.com', role: 'coach' }).save();
  const mia = await new User({ name: 'Mia Rivera', email: 'mia.rivera@example.com', role: 'member' }).save();

  const sunriseSprinters = await new Team({
    name: 'Sunrise Sprinters',
    description: 'Early-risers who love cardio and outdoor runs.',
    members: [ava._id, mia._id],
    points: 820,
  }).save();

  const trailBlazers = await new Team({
    name: 'Trail Blazers',
    description: 'Adventure seekers training for trail challenges.',
    members: [noah._id],
    points: 670,
  }).save();

  await User.updateMany(
    { _id: { $in: [ava._id, mia._id] } },
    { $set: { team: sunriseSprinters._id } }
  );
  await User.updateOne(
    { _id: noah._id },
    { $set: { team: trailBlazers._id } }
  );

  const run = await new Activity({ user: ava._id, type: 'Running', durationMinutes: 45, calories: 420, date: new Date(), notes: 'Morning interval session' }).save();
  const cycle = await new Activity({ user: mia._id, type: 'Cycling', durationMinutes: 60, calories: 520, date: new Date(), notes: 'Road ride with hills' }).save();
  const strength = await new Activity({ user: noah._id, type: 'Strength', durationMinutes: 50, calories: 380, date: new Date(), notes: 'Coach-led HIIT workout' }).save();

  const workout1 = await new Workout({
    title: 'HIIT Core Crusher',
    description: 'A fast-paced core workout to build strength and endurance.',
    durationMinutes: 30,
    difficulty: 'intermediate',
    focusAreas: ['core', 'endurance'],
  }).save();

  const workout2 = await new Workout({
    title: 'Beginner Stretch Flow',
    description: 'A gentle stretching routine for mobility and recovery.',
    durationMinutes: 20,
    difficulty: 'beginner',
    focusAreas: ['flexibility', 'recovery'],
  }).save();

  const workout3 = await new Workout({
    title: 'Mountain Power Session',
    description: 'Advanced strength and cardio drills for serious athletes.',
    durationMinutes: 55,
    difficulty: 'advanced',
    focusAreas: ['strength', 'cardio'],
  }).save();

  await new LeaderboardEntry({ subjectType: 'User', subject: ava._id, score: 1420, rank: 1 }).save();
  await new LeaderboardEntry({ subjectType: 'User', subject: mia._id, score: 1180, rank: 2 }).save();
  await new LeaderboardEntry({ subjectType: 'Team', subject: sunriseSprinters._id, score: 820, rank: 1 }).save();
  await new LeaderboardEntry({ subjectType: 'Team', subject: trailBlazers._id, score: 670, rank: 2 }).save();

  console.log('Seed data inserted successfully');
  console.log({ users: 3, teams: 2, activities: 3, workouts: 3 });

  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

seed().catch(err => {
  console.error('Seed error:', err);
  process.exit(1);
});
