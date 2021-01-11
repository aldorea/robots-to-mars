import { Orientation } from '../enums';

export interface IRobotDto {
  state: string;
  startPosition: {
    xCoordinate: number;
    yCoordinate: number;
    orientation: Orientation;
  };
  path?: [
    {
      xCoordinate: number;
      yCoordinate: number;
      orientation: Orientation;
    }
  ];
}
