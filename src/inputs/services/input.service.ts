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
      if (parseInt(xCoor) > 50 || parseInt(yCoord) > 50) {
        throw new Error('Too big');
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
      await input.save();
      inputs.push(input);
    }

    return inputs;
  } catch (error) {
    throw new Error(error);
  }
};

export const findInputs = (): Promise<IInput[]> => {
  try {
    return Input.find().exec();
  } catch (error) {
    throw new Error('error');
  }
};
