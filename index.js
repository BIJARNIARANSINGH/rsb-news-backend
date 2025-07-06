// backend/index.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(cors({
  origin: ['https://rsb-news-frontend.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Serve static uploads (images, videos)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');

// Base route
app.get('/', (req, res) => {
  res.send('📡 Welcome to RSB NEWS BACKEND — Powered by Express & MongoDB');
});

// API routes
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected');

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err.message);
  });
