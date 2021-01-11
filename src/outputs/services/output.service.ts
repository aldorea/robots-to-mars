import { State } from '../../robots/enums';
import { Robot } from '../../robots/models';

export const findOutputs = async () => {
  return Robot.aggregate([
    {
      $project: {
        _id: 0,
        xCoordinate: {
          $arrayElemAt: ['$path.xCoordinate', -1]
        },
        yCoordinate: { $arrayElemAt: ['$path.yCoordinate', -1] },
        orientation: { $arrayElemAt: ['$path.orientation', -1] },
        state: '$state'
      }
    }
  ]).exec();
};
