import mongoose, { Schema, Document } from 'mongoose';

export interface ILead extends Document {
  name: string;
  email: string;
  clinicName?: string;
  // 🚀 ADD THESE TWO:
  monthlyVolume?: string; 
  source?: string;
  lastSearch?: string;
  createdAt: Date;
}

const LeadSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true },
  clinicName: String, 
  monthlyVolume: String, // 🔍 This was in Schema but missing in ILead
  lastSearch: String,
  source: String,        // 🔍 This was in Schema but missing in ILead
  createdAt: { type: Date, default: Date.now }
});

// Important: Use 'models' check to prevent re-compilation errors in Next.js development
export default mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);