import { Input } from '../src/inputs/models';
import {
  createInstructions,
  findInputs
} from '../src/inputs/services/input.service';
import mockingoose from 'mockingoose';
import {
  INTERNAL_SERVER_ERROR,
  MAX_COORDINATE_MESSAGE
} from '../src/constants';
import { BaseError, DataError } from '../src/errors';

const mockInputs = [
  {
    instructions: ['R', 'F', 'R', 'F', 'R', 'F', 'R', 'F'],
    _id: '60035dac8e4fac3eb1a06cd0',
    dimensions: { xCoord: 5, yCoord: 3 },
    position: { xCoord: 1, yCoord: 1, orientation: 'E' }
  },
  {
    instructions: [
      'F',
      'R',
      'R',
      'F',
      'L',
      'L',
      'F',
      'F',
      'R',
      'R',
      'F',
      'L',
      'L'
    ],
    _id: '60035dac8e4fac3eb1a06cd1',
    dimensions: { xCoord: 5, yCoord: 3 },
    position: { xCoord: 3, yCoord: 2, orientation: 'N' }
  },
  {
    instructions: ['L', 'L', 'F', 'F', 'F', 'L', 'F', 'L', 'F', 'L'],
    _id: '60035dac8e4fac3eb1a06cd2',
    dimensions: { xCoord: 5, yCoord: 3 },
    position: { xCoord: 0, yCoord: 3, orientation: 'W' }
  }
];

const mockTextInstructions = `5 3
1 1 E
RFRFRFRF
3 2 N
FRRFLLFFRRFLL
0 3 W
LLFFFLFLFL`;

describe('Input Service', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('should create a input', async () => {
    mockingoose(Input).toReturn(mockInputs, 'save');
    const input = await new Input().save();
    expect(createInstructions(mockTextInstructions)).resolves.toMatchObject(
      input
    );
  });

  it('should fail when  and y cordinates are bigger than 50', async () => {
    expect(createInstructions(`5 3\n51 50 E`)).rejects.toThrow(
      new DataError(MAX_COORDINATE_MESSAGE)
    );
  });

  it('should fail when trying to save', async () => {
    jest.spyOn(Input.prototype, 'save').mockImplementationOnce(() => {
      throw new DataError();
    });
    expect(
      async () => await createInstructions(mockTextInstructions)
    ).rejects.toThrow(new DataError());
  });

  it('should return all inputs', async () => {
    mockingoose(Input).toReturn(mockInputs, 'find');
    const inputs = Input.find().exec();
    expect(findInputs()).resolves.toMatchObject(inputs);
  });

  it('should fail when finding inputs', async () => {
    jest.spyOn(Input, 'find').mockImplementationOnce(() => {
      throw new BaseError(INTERNAL_SERVER_ERROR);
    });
    expect(async () => await findInputs()).rejects.toThrow(
      new BaseError(INTERNAL_SERVER_ERROR)
    );
  });
});
