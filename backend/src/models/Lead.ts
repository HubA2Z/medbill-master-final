import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Define the Interface
export interface ILead extends Document {
  name: string;
  email: string;
  clinicName: string;
  monthlyVolume?: string;
  source?: string;
  lastSearch?: string;
  createdAt: Date;
}

// 2. Define the Schema
const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  clinicName: { type: String, required: true },
  monthlyVolume: { type: String },
  source: { type: String, default: 'Website' },
  lastSearch: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// 3. Use a named constant for the model
// This "mongoose.models.Lead" check is CRITICAL for Vercel/Next.js
const Lead: Model<ILead> = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
