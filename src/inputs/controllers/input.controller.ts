import { Response } from 'express';
import { IInput } from '../interfaces';
import { findInputs } from '../services';

export const getInputs = async (res: Response): Promise<Response<IInput[]>> => {
  const inputs = await findInputs();
  return res.json(inputs);
};
