import { NextFunction, Request, response, Response } from 'express';
import { State } from '../../robots/enums';
import { findOutputs } from '../services';

export const getOutputs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const outputs = await findOutputs();
    return res.json(outputs);
  } catch (error) {
    next(error);
  }
};
