import { NextFunction, Request, Response } from 'express';
import { State } from '../enums';
import {
  assignSurfaceToExplore,
  exploreSurface,
  findRobotsByState
} from '../services/robot.service';

export const createExploration = async () => {
  await assignSurfaceToExplore();
  await exploreSurface();
};

export const getLostRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.json(await findRobotsByState(State.LOST));
};
