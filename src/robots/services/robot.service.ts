import { STATES } from 'mongoose';
import { getInputs } from '../../inputs/services';
import { IRobotDto } from '../dto';
import { Direction, State } from '../enums';
import { IPosition, IRobot } from '../interfaces';
import { Robot } from '../models';
import {
  changeOrientation,
  checkLimitsGrid,
  isSamePosition,
  moveForward
} from '../utils/utils.service';

export const assignSurfaceToExplore = async (): Promise<IRobot[]> => {
  try {
    const inputs = await getInputs();
    return Promise.all(
      inputs.map(async (input) => {
        return await new Robot({
          dimensionToExplore: {
            xCoordinate: input.dimensions.xCoord,
            yCoordinate: input.dimensions.yCoord
          },
          currentPosition: {
            xCoordinate: input.position.xCoord,
            yCoordinate: input.position.yCoord,
            orientation: input.position.orientation
          },
          instructions: input.instructions,
          state: State.WORKING
        }).save();
      })
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const exploreSurface = async () => {
  const robots: IRobot[] = await Robot.find().sort({ _id: 1 }).exec();
  const lostPositions: { xCoordinate: number; yCoordinate: number }[] = [];

  robots.map(async (robot) => {
    for (let i = 0; i < robot.instructions.length; i++) {
      if (robot.instructions[i] === Direction.FORWARD) {
        const { xCoordinate, yCoordinate } = moveForward(
          robot.currentPosition.orientation,
          {
            xCoordinate: robot.currentPosition.xCoordinate,
            yCoordinate: robot.currentPosition.yCoordinate
          }
        );
        if (
          !lostPositions.find((position) =>
            isSamePosition(
              { xCoordinate: xCoordinate, yCoordinate: yCoordinate },
              position
            )
          )
        ) {
          if (
            checkLimitsGrid(robot.dimensionToExplore, {
              xCoordinate,
              yCoordinate
            })
          ) {
            robot.state = State.LOST;
            robot.outOfRangePosition = {
              xCoordinate: xCoordinate,
              yCoordinate: yCoordinate
            };
            lostPositions.push(robot.outOfRangePosition);
            break;
          } else {
            robot.currentPosition = {
              xCoordinate: xCoordinate,
              yCoordinate: yCoordinate,
              orientation: robot.currentPosition.orientation
            };
            robot.path.push({
              xCoordinate: xCoordinate,
              yCoordinate: yCoordinate,
              orientation: robot.currentPosition.orientation
            });
          }
        }
      } else {
        robot.currentPosition.orientation = changeOrientation(
          robot.instructions[i],
          robot.currentPosition.orientation
        );
        robot.path.push({
          xCoordinate: robot.currentPosition.xCoordinate,
          yCoordinate: robot.currentPosition.yCoordinate,
          orientation: robot.currentPosition.orientation
        });
      }
    }
    if (robot.state === State.WORKING) {
      robot.state = State.FINISHED;
    }
    await robot.save();
  });
};

export const findRobots = (): Promise<IRobot[]> => {
  try {
    return Robot.find().sort({ _id: 1 }).exec();
  } catch (error) {
    return error;
  }
};

export const findRobotsByState = (state: State): Promise<IRobot[]> => {
  return Robot.find({ state: state }).exec();
};
