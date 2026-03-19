import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import icdRoutes from './routes/icdRoutes';
import leadRoutes from './routes/leadRoutes'; // At top

// 1. Initialize Environment
dotenv.config();

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());


app.use('/api/leads', leadRoutes);
app.use('/api/codes', icdRoutes);

app.use(cors({
  origin: 'http://localhost:3000' // Only allow your frontend
}));

// 2. Health Check Route (Internal Test)
app.get('/api/health', (req, res) => {
  res.json({ 
    status: "online", 
    db_connected: mongoose.connection.readyState === 1,
    time: new Date().toISOString() 
  });
});

const PORT = process.env.PORT || 5000;

// 3. Start Server & Connect DB
app.listen(PORT, async () => {
  console.log(`🚀 [Step 1] Server is running on http://localhost:${PORT}`);
  
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("❌ [Step 2] MONGO_URI is missing from .env file!");
    return;
  }

  try {
    console.log("⏳ [Step 3] Attempting to connect to MongoDB Atlas...");
    await mongoose.connect(uri);
    console.log("✅ [Step 4] Milestone 1 Success: Database is Connected!");
  } catch (err) {
    console.error("❌ [Step 5] Database Connection Failed:", err);
  }
});