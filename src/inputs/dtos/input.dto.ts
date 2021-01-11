import { Orientation } from '../../robots/enums';

export interface IInputDto {
  dimensions: { xCoor: number; yCoord: number };
  position: { xCoord: number; yCoord: number; orientation: Orientation };
  instructions: [string];
}
