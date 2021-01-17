import { findOuputsByIds, findOutputs } from '../src/outputs/services';
import mockingoose from 'mockingoose';
import { Robot } from '../src/robots/models';

const mockRobot = [
  {
    dimensionToExplore: {
      xCoordinate: 5,
      yCoordinate: 3
    },
    currentPosition: {
      xCoordinate: 3,
      yCoordinate: 3,
      orientation: 'N'
    },
    // outOfRangePosition: {
    //   xCoordinate: 3,
    //   yCoordinate: 4
    // },
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
    _id: '5ffb644418c6c352a4588025',
    state: 'LOST',
    path: [
      {
        _id: '5ffb644418c6c352a458802f',
        xCoordinate: 3,
        yCoordinate: 3,
        orientation: 'N'
      },
      {
        _id: '5ffb644418c6c352a4588030',
        xCoordinate: 3,
        yCoordinate: 3,
        orientation: 'E'
      },
      {
        _id: '5ffb644418c6c352a4588031',
        xCoordinate: 3,
        yCoordinate: 3,
        orientation: 'S'
      },
      {
        _id: '5ffb644418c6c352a4588032',
        xCoordinate: 3,
        yCoordinate: 2,
        orientation: 'S'
      },
      {
        _id: '5ffb644418c6c352a4588033',
        xCoordinate: 3,
        yCoordinate: 2,
        orientation: 'E'
      },
      {
        _id: '5ffb644418c6c352a4588034',
        xCoordinate: 3,
        yCoordinate: 2,
        orientation: 'N'
      },
      {
        _id: '5ffb644418c6c352a4588035',
        xCoordinate: 3,
        yCoordinate: 3,
        orientation: 'N'
      }
    ]
  }
];

const mockOutputs = [
  {
    xCoordinate: 1,
    yCoordinate: 1,
    orientation: 'E',
    state: 'FINISHED'
  },
  { xCoordinate: 3, yCoordinate: 3, orientation: 'N', state: 'LOST' },
  {
    xCoordinate: 2,
    yCoordinate: 3,
    orientation: 'S',
    state: 'FINISHED'
  }
];

describe('Output Service', () => {
  beforeEach(() => {
    mockingoose.resetAll();
    jest.clearAllMocks();
  });
  it('Should return all outputs', async () => {
    mockingoose(Robot).toReturn(mockOutputs, 'aggregate');
    const outputs = Robot.aggregate().exec();
    expect(findOutputs()).resolves.toMatchObject(outputs);
  });
  it('Should return ouputs by robot ids', async () => {
    mockingoose(Robot).toReturn(mockOutputs[1], 'aggregate');
    expect(findOuputsByIds([mockRobot[0]._id])).resolves.toMatchObject(
      mockOutputs[1]
    );
  });
});
