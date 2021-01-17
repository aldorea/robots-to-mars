import {
  INTERNAL_SERVER_ERROR,
  MAX_COORDINATE,
  MAX_COORDINATE_MESSAGE,
  MAX_INSTRUCTIONS,
  MAX_INSTRUCTIONS_MESSAGE
} from '../../constants';
import { BaseError, DataError } from '../../errors';
import { Orientation } from '../../robots/enums';
import { IInput } from '../interfaces';
import { Input } from '../models';

export const createInstructions = async (data: string): Promise<IInput[]> => {
  try {
    const [xDim, yDim] = data
      .split('\n')[0]
      .split(' ')
      .map((el) => parseInt(el));

    const inputs = [];

    const inputsRaw = data.split('\n');

    for (let i = 1; i < inputsRaw.length; i += 2) {
      const [xCoor, yCoord, orientation] = inputsRaw[i].split(' ');
      // TODO añadir constantes y tipo de error
      if (
        parseInt(xCoor) > MAX_COORDINATE ||
        parseInt(yCoord) > MAX_COORDINATE
      ) {
        throw new DataError(MAX_COORDINATE_MESSAGE);
      }

      const input: IInput = new Input({
        dimensions: { xCoord: xDim, yCoord: yDim },
        position: {
          xCoord: parseInt(xCoor),
          yCoord: parseInt(yCoord),
          orientation: (orientation as any) as Orientation
        },
        instructions: inputsRaw[i + 1].split('')
      });
      if (inputsRaw[i + 1].length > MAX_INSTRUCTIONS) {
        throw new DataError(MAX_INSTRUCTIONS_MESSAGE);
      }
      await input.save();
      inputs.push(input);
    }

    return inputs;
  } catch (error) {
    throw new BaseError(error.message, error.status);
  }
};

export const findInputs = (): Promise<IInput[]> => {
  try {
    return Input.find().exec();
  } catch (error) {
    throw new BaseError(INTERNAL_SERVER_ERROR);
  }
};
