import { Document } from 'mongoose';

export interface IOutput extends Document {
  dimensions: { xCoord: number; yCoord: number };
  position: { xCoord: number; yCoord: number; orientation: string };
  // instructions: [String]
  path: [{ xCoord: number; yCoord: number; orientation: string }];
}
