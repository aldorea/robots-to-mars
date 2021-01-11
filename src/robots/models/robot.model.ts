import mongoose from 'mongoose';
import { IRobot } from '../interfaces';

const robotSchema = new mongoose.Schema({
  state: { type: String, enum: ['LOST', 'WORKING', 'FINISHED'] },
  dimensionToExplore: { xCoordinate: Number, yCoordinate: Number },
  currentPosition: {
    xCoordinate: Number,
    yCoordinate: Number,
    orientation: { type: String, enum: ['N', 'W', 'S', 'E'] }
  },
  instructions: [{ type: String, enum: ['F', 'R', 'L'] }],
  path: [
    {
      xCoordinate: Number,
      yCoordinate: Number,
      orientation: { type: String, enum: ['N', 'W', 'S', 'E'] }
    }
  ],
  outOfRangePosition: { xCoordinate: Number, yCoordinate: Number }
});

export const Robot = mongoose.model<IRobot>('Robot', robotSchema);
