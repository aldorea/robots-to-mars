import mongoose from 'mongoose';
import { IOutput } from '../interfaces';

const inputSchema = new mongoose.Schema({
  dimensions: { xCoord: Number, yCoord: Number },
  position: {
    xCoord: Number,
    yCoord: Number,
    orientation: { type: String, enum: ['E', 'W', 'N', 'S'] }
  },
  // instructions: [String]
  path: [
    {
      xCoord: Number,
      yCoord: Number,
      orientation: { type: String, enum: ['E', 'W', 'N', 'S'] }
    }
  ]
});

export const Output = mongoose.model<IOutput>('Output', inputSchema);
