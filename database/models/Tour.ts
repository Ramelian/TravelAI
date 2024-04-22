import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface ITour extends Document {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
  city: string;
  country: string;
  title: string;
  description: string;
  image?: string;
  currency: string;
  stops: any[];
}

const tourSchema: Schema = new Schema({
  id: { type: String, required: true, default: uuidv4 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  city: { type: String, required: true },
  country: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  currency: { type: String, required: true },
  image: { type: String },
  stops: { type: [Schema.Types.Mixed], required: true }
}, {
  timestamps: true
});

const Tour = mongoose.models.Tour || mongoose.model<ITour>('Tour', tourSchema);
export default Tour;
