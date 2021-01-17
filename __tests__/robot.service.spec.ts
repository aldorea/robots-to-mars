import { Robot } from '../src/robots/models';
import { assignSurfaceToExplore } from '../src/robots/services';
import { Input } from '../src/inputs/models';
import mockingoose from 'mockingoose';
import { Orientation, State } from '../src/robots/enums';
import {
  exploreSurface,
  findRobots,
  findRobotsByState
} from '../src/robots/services/robot.service';
import { IInput } from '../src/inputs/interfaces';

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

const mockRobotsAssginment = [
  {
    _id: '6003713936d3365459efb024',
    currentPosition: { orientation: 'E', xCoordinate: 1, yCoordinate: 1 },
    dimensionToExplore: { xCoordinate: 5, yCoordinate: 3 },
    instructions: ['L', 'F', 'F', 'R', 'R'],
    path: [],
    state: 'WORKING'
  },
  {
    _id: '6003713936d3365459efb025',
    currentPosition: { orientation: 'E', xCoordinate: 2, yCoordinate: 3 },
    dimensionToExplore: { xCoordinate: 5, yCoordinate: 3 },
    instructions: ['L', 'F', 'F', 'R', 'R'],
    path: [],
    state: 'WORKING'
  }
];

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

describe('Robot service', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    mockingoose.resetAll();
    jest.clearAllMocks();
  });

  it('Should assign an input to a robot', async () => {
    const _doc = {
      dimensionToExplore: {
        xCoordinate: 5,
        yCoordinate: 3
      },
      currentPosition: {
        xCoordinate: 3,
        yCoordinate: 3,
        orientation: 'N'
      },
      outOfRangePosition: {
        xCoordinate: 3,
        yCoordinate: 4
      },
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
    };

    mockingoose(Robot).toReturn(mockRobotsAssginment, 'save');
    const robot = await new Robot(_doc).save();

    expect(
      assignSurfaceToExplore(mockInputs as IInput[])
    ).resolves.toMatchObject(robot);
  });

  it('should fail when trying to save an assignment', async () => {
    jest.spyOn(Robot.prototype, 'save').mockImplementation(() => {
      throw new Error('error');
    });
    expect(async () => {
      await assignSurfaceToExplore(mockInputs as IInput[]);
    }).rejects.toThrow('error');
  });

  it('Should create a exploration surface', async () => {
    const _docs = mockRobot;
    mockingoose(Robot).toReturn(_docs, 'find');
    const robots = await Robot.find().sort({ _id: 1 }).exec();

    expect(exploreSurface(robots)).resolves.toMatchObject(robots);
  });

  it('Should find all robots', async () => {
    const _docs = mockRobot;
    mockingoose(Robot).toReturn(_docs, 'find');
    const robots = Robot.find().sort({ _id: 1 }).exec();
    expect(findRobots()).resolves.toMatchObject(robots);
  });

  it('Should throw an error when find all robots', async () => {
    jest.spyOn(Robot, 'find').mockImplementationOnce(() => {
      throw new Error('error');
    });
    expect(async () => {
      await findRobots();
    }).rejects.toThrow('error');
  });

  it('Should find robots by state', async () => {
    const _docs = mockRobot;
    mockingoose(Robot).toReturn(_docs, 'find');

    const robots = Robot.find({ state: State.FINISHED }).exec();
    expect(findRobotsByState(State.FINISHED)).resolves.toMatchObject(robots);
  });

  it('Should throw an error when find all robots', async () => {
    jest.spyOn(Robot, 'find').mockImplementationOnce(() => {
      throw new Error('error');
    });
    expect(async () => {
      await findRobotsByState(State.FINISHED);
    }).rejects.toThrow('error');
  });
});
