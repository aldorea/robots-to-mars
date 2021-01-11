import { NextFunction, Request, Response } from 'express';
import { IInput } from '../interfaces';
import { createInstructions } from '../services';

export const createInput = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    return res.json(await createInstructions(req.body as string));
  } catch (error) {
    return error;
  }
};
