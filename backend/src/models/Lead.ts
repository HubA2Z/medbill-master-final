import mongoose, { Schema, Document } from 'mongoose';

// Define the interface for TypeScript
export interface ILead extends Document {
  name: string;
  email: string;
  clinicName: string;
  monthlyVolume?: string;
  source?: string;
  lastSearch?: string;
  createdAt: Date;
}

const LeadSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  clinicName: { type: String, required: true },
  monthlyVolume: { type: String },
  source: { type: String, default: 'Website' },
  lastSearch: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// ✅ THIS IS THE CRITICAL PART
// It checks if the model is already compiled to prevent "OverwriteModelError"
const Lead = mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema);

export default Lead;
