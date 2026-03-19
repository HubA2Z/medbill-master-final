import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI as string);
    console.log(`📡 Medical Database Online: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ DB Connection Error: ${error}`);
    process.exit(1); 
  }
};