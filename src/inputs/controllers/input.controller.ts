import { NextFunction, Request, Response } from 'express';
import { IInput } from '../interfaces';
import { findInputs } from '../services';

export const getInputs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<IInput[]> | undefined> => {
  try {
    const inputs = await findInputs();
    return res.status(200).json(inputs);
  } catch (error) {
    next(error);
  }
};
