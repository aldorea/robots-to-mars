import { Document } from 'mongoose';
import { Direction, Orientation } from '../../robots/enums';
import { IPosition } from '../../robots/interfaces';

export interface IInput extends Document {
  dimensions: { xCoord: number; yCoord: number };
  position: { xCoord: number; yCoord: number; orientation: Orientation };
  instructions: Direction[];
}
