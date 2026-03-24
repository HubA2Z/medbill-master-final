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
  'https://www.enhancebilling.com',
  // Allow all Vercel subdomains (useful for preview deployments)
  /\.vercel\.app$/ 
];

app.use(cors({
  origin: (origin, callback) => {
    // 1. Allow requests with no origin (like mobile apps or local testing)
    if (!origin) return callback(null, true);

    // 2. Check if the origin matches any string or regex in our list
    const isAllowed = allowedOrigins.some((allowed) => {
      if (allowed instanceof RegExp) return allowed.test(origin);
      // Remove trailing slashes for comparison
      return allowed.replace(/\/$/, '') === origin.replace(/\/$/, '');
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      // 📝 LOGGING: This helps you see the "culprit" in Vercel Logs
      console.error(`❌ CORS Blocked for origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
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

// 🩺 Health Check
app.get('/api/health', (req, res) => {
  const dbState = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  res.json({
    status:    'online',
    version:   '2.0.0',
    db:        dbState[mongoose.connection.readyState] ?? 'unknown',
    env:       process.env.NODE_ENV || 'production',
    timestamp: new Date().toISOString(),
    uptime_s:  Math.floor(process.uptime()),
  });
});

// 🚀 CRITICAL: Export for Vercel
export default app;

// 💻 Local Development Support
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Local Server: http://localhost:${PORT}`);
  });
}
