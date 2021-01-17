/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Request, Response } from 'express';
import { createInstructions } from '../../inputs/services';
import { findOuputsByIds } from '../../outputs/services';
import { State } from '../enums';
import {
  assignSurfaceToExplore,
  exploreSurface,
  findRobotsByState
} from '../services/robot.service';
import { parseOutputsToText } from '../utils/utils.service';

export const createExploration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inputs = await createInstructions(req.body as string);
    const robots = await assignSurfaceToExplore(inputs);
    const robotsFinishedIds = (await exploreSurface(robots)).map(
      (robot) => robot._id
    );
    const outputs = await findOuputsByIds(robotsFinishedIds);
    const outputsTxt = parseOutputsToText(outputs);

    return res.status(200).send(outputsTxt);
  } catch (error) {
    next(error);
  }
};

export const getLostRobots = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.status(200).json(await findRobotsByState(State.LOST));
  } catch (error) {
    next(error);
  }
};
