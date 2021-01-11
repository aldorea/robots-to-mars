import mongoose from 'mongoose';
import { IInput } from '../interfaces/input.interface';

const inputSchema = new mongoose.Schema({
  dimensions: { xCoord: Number, yCoord: Number },
  position: {
    xCoord: Number,
    yCoord: Number,
    orientation: { type: String, enum: ['E', 'W', 'N', 'S'] }
  },
  instructions: [
    {
      type: String,
      enum: ['F', 'R', 'L']
    }
  ]
});

export const Input = mongoose.model<IInput>('Input', inputSchema);
