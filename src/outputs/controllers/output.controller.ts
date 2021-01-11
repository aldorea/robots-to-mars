import { NextFunction, Request, response, Response } from 'express';
import { State } from '../../robots/enums';
import { findOutputs } from '../services';

export const getOutputs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // console.log('hola');
    const outputs = (await findOutputs()) as any[];
    const outputsTxt = outputs
      .map((output) => {
        const state = output['state'] === State.LOST ? State.LOST : '';
        return `${output['xCoordinate']} ${output['yCoordinate']} ${output['orientation']} ${state}`;
      })
      .join('\n');
    return res.send(outputsTxt);
  } catch (error) {
    next(error);
  }
};
