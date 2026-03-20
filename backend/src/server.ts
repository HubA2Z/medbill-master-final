import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import icdRoutes from './routes/icdRoutes';
import leadRoutes from './routes/leadRoutes';

dotenv.config();

const app = express();

// 🛡️ Middleware for Security and Parsing
app.use(helmet());
app.use(express.json());

// 🌍 Dynamic CORS: Bridges your Frontend and Backend
const allowedOrigins = [
  'http://localhost:3000',
  'https://enhancebilling.com',
  'https://www.enhancebilling.com'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl) or allowed list
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// 🗄️ MongoDB Connection (Optimized for Serverless cold-starts)
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ MONGO_URI is missing from Environment Variables!");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Database Connection Failed:", err);
  }
};

// Ensure DB is connected before processing any /api request
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// 🛣️ Route Handlers
app.use('/api/leads', leadRoutes);
app.use('/api/codes', icdRoutes);

// 🩺 Health Check (Useful for monitoring)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: "online", 
    db_connected: mongoose.connection.readyState === 1,
    env: process.env.NODE_ENV || 'development'
  });
});

// 🚀 CRITICAL: Export for Vercel Serverless Functions
export default app;

// 💻 Local Development Support (Only runs on your machine)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local Server: http://localhost:${PORT}`);
  });
}
