import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import newsRoutes from './routes/newsRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to RSB NEWS BACKEND');
});

app.use('/api/news', newsRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 10000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log('Server running on port ${PORT}'));
})
.catch(err => console.error(err));