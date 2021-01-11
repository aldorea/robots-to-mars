import { Direction, Orientation } from '../enums';
import { IPosition } from '../interfaces';

export const changeOrientation = (
  direction: Direction,
  orientation: Orientation
): Orientation => {
  switch (orientation) {
    case Orientation.N:
      return direction === Direction.LEFT ? Orientation.W : Orientation.E;

    case Orientation.E:
      return direction === Direction.LEFT ? Orientation.N : Orientation.S;

    case Orientation.S:
      return direction === Direction.LEFT ? Orientation.E : Orientation.W;

    case Orientation.W:
      return direction === Direction.LEFT ? Orientation.S : Orientation.N;

    default:
      return orientation;
  }
};

export const moveForward = (
  orientation: Orientation,
  coords: IPosition
): IPosition => {
  switch (orientation) {
    case Orientation.N:
      return {
        xCoordinate: coords.xCoordinate,
        yCoordinate: coords.yCoordinate + 1
      };

    case Orientation.E:
      return {
        xCoordinate: coords.xCoordinate + 1,
        yCoordinate: coords.yCoordinate
      };

    case Orientation.S:
      return {
        xCoordinate: coords.xCoordinate,
        yCoordinate: coords.yCoordinate - 1
      };

    case Orientation.W:
      return {
        xCoordinate: coords.xCoordinate - 1,
        yCoordinate: coords.yCoordinate
      };

    default:
      return coords;
  }
};

export const checkLimitsGrid = (
  maxCoords: IPosition,
  coords: IPosition
): boolean => {
  return (
    coords.xCoordinate < 0 ||
    coords.yCoordinate < 0 ||
    coords.xCoordinate > maxCoords.xCoordinate ||
    coords.yCoordinate > maxCoords.yCoordinate
  );
};

export const isSamePosition = (
  newCoord: IPosition,
  coord: IPosition
): boolean => {
  return (
    newCoord.xCoordinate === coord.xCoordinate &&
    newCoord.yCoordinate === coord.yCoordinate
  );
};
