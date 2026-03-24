import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import icdRoutes from './routes/icdRoutes';
import leadRoutes from './routes/leadRoutes';

dotenv.config();
const app = express();

app.use(helmet());
app.use(express.json());

// 🌍 Simplified CORS for Vercel
// Since your frontend and backend are on the same domain (/api), 
// origin checking is often less strict, but this covers all bases.
app.use(cors({
  origin: true, // Allows the requesting origin
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 🗄️ Optimized MongoDB Connection
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI; // Check both common names
  if (!uri) {
    console.error("❌ MONGO_URI missing!");
    return;
  }

  try {
    // Adding server selection timeout to prevent Vercel Function Timeout (10s limit)
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, 
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Database Connection Failed:", err);
  }
};

// Middleware to ensure DB is ready
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.use('/api/leads', leadRoutes);
app.use('/api/codes', icdRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'online', db: mongoose.connection.readyState });
});

export default app;
