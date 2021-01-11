import { Document } from 'mongoose';
import { Direction, Orientation, State } from '../enums';

export interface IRobot extends Document {
  state: State;
  dimensionToExplore: { xCoordinate: number; yCoordinate: number };
  currentPosition: {
    xCoordinate: number;
    yCoordinate: number;
    orientation: Orientation;
  };
  instructions: [Direction];
  path: [
    {
      xCoordinate: number;
      yCoordinate: number;
      orientation: Orientation;
    }
  ];
  outOfRangePosition: { xCoordinate: number; yCoordinate: number };
}
