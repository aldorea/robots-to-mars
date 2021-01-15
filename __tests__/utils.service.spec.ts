import { Direction, Orientation } from '../src/robots/enums';
import {
  changeOrientation,
  checkLimitsGrid,
  isSamePosition,
  moveForward
} from '../src/robots/utils/utils.service';

describe('Utils Service', () => {
  beforeEach(() => {
    jest.fn().mockClear();
  });
  it('Should change orientation', () => {
    expect(changeOrientation(Direction.LEFT, Orientation.N)).toBe(
      Orientation.W
    );
    expect(changeOrientation(Direction.RIGHT, Orientation.N)).toBe(
      Orientation.E
    );
    expect(changeOrientation(Direction.LEFT, Orientation.E)).toBe(
      Orientation.N
    );
    expect(changeOrientation(Direction.RIGHT, Orientation.E)).toBe(
      Orientation.S
    );
    expect(changeOrientation(Direction.LEFT, Orientation.S)).toBe(
      Orientation.E
    );
    expect(changeOrientation(Direction.RIGHT, Orientation.S)).toBe(
      Orientation.W
    );
    expect(changeOrientation(Direction.LEFT, Orientation.W)).toBe(
      Orientation.S
    );
    expect(changeOrientation(Direction.RIGHT, Orientation.W)).toBe(
      Orientation.N
    );
    expect(changeOrientation(Direction.LEFT, 'EAST' as Orientation)).toBe(
      'EAST'
    );
  });

  it('Should move forward', () => {
    expect(
      moveForward(Orientation.N, { xCoordinate: 0, yCoordinate: 0 })
    ).toStrictEqual({
      xCoordinate: 0,
      yCoordinate: 1
    });
    expect(
      moveForward(Orientation.E, { xCoordinate: 0, yCoordinate: 0 })
    ).toStrictEqual({
      xCoordinate: 1,
      yCoordinate: 0
    });
    expect(
      moveForward(Orientation.S, { xCoordinate: 0, yCoordinate: 0 })
    ).toStrictEqual({
      xCoordinate: 0,
      yCoordinate: -1
    });
    expect(
      moveForward(Orientation.W, { xCoordinate: 0, yCoordinate: 0 })
    ).toStrictEqual({
      xCoordinate: -1,
      yCoordinate: 0
    });
    expect(
      moveForward('EAST' as Orientation, { xCoordinate: 0, yCoordinate: 0 })
    ).toStrictEqual({
      xCoordinate: 0,
      yCoordinate: 0
    });
  });

  it('Should check limits grid', () => {
    expect(
      checkLimitsGrid(
        { xCoordinate: 5, yCoordinate: 3 },
        { xCoordinate: 0, yCoordinate: 0 }
      )
    ).toBeFalsy();
  });

  it('Should check is same position', () => {
    expect(
      isSamePosition(
        { xCoordinate: 1, yCoordinate: 2 },
        { xCoordinate: 1, yCoordinate: 2 }
      )
    ).toBeTruthy();
  });
});
