import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import grievanceRoutes from './routes/grievanceRoutes.js';
import developmentRoutes from './routes/developmentRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import leaderRoutes from './routes/leaderRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect Database
connectDB();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/grievances', grievanceRoutes);
app.use('/api/developments', developmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/leaders', leaderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'TVK API Server is online',
    time: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(`[SERVER] TVK REST API running on port ${PORT}`);
});
