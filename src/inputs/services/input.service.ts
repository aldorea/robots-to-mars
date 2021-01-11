import { Orientation } from '../../robots/enums';
import { IInput } from '../interfaces';
import { Input } from '../models';

export const createInstructions = async (data: string): Promise<any> => {
  try {
    const [xDim, yDim] = data
      .split('\n')[0]
      .split(' ')
      .map((el) => parseInt(el));

    let inputPlain = {};

    const inputsRaw = data.split('\n');
    for (let i = 1; i < inputsRaw.length; i += 2) {
      const [xCoor, yCoord, orientation] = inputsRaw[i].split(' ');
      // TODO añadir constantes y tipo de error
      if (parseInt(xCoor) > 50 || parseInt(yCoord) > 50) {
        throw new Error('Too big');
      }

      inputPlain = {
        dimensions: { xCoord: xDim, yCoord: yDim },
        position: {
          xCoord: parseInt(xCoor),
          yCoord: parseInt(yCoord),
          orientation: (orientation as any) as Orientation
        },
        instructions: inputsRaw[i + 1].split('')
      };
      const input: IInput = new Input(inputPlain);
      await input.save();
    }
  } catch (error) {
    console.log(error);
    return error;
  }

  // return Input.find().exec();
};

export const getInputs = (): Promise<IInput[]> => {
  try {
    return Input.find().exec();
  } catch (error) {
    return error;
  }
};
// const parseOrientation = (orientation: string)
