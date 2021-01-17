import { NextFunction, Request, Response } from 'express';
import { createInstructions } from '../../inputs/services';
import { findOuputsByIds } from '../../outputs/services';
import { State } from '../enums';
import { IRobot } from '../interfaces';
import {
  assignSurfaceToExplore,
  exploreSurface,
  findRobotsByState
} from '../services/robot.service';
import { parseOutputsToText } from '../utils/utils.service';

export const createExploration = async (
  req: Request,
  res: Response
): Promise<Response<string>> => {
  const inputs = await createInstructions(req.body as string);
  const robots = await assignSurfaceToExplore(inputs);
  const robotsFinishedIds = (await exploreSurface(robots)).map(
    (robot) => robot._id
  );
  const outputs = await findOuputsByIds(robotsFinishedIds);
  const outputsTxt = parseOutputsToText(outputs);

  return res.send(outputsTxt);
};

export const getLostRobots = async (
  req: Request,
  res: Response
): Promise<Response<IRobot[]>> => {
  return res.json(await findRobotsByState(State.LOST));
};
