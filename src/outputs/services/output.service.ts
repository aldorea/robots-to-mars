import { Robot } from '../../robots/models';
import mongoose from 'mongoose';

export const findOutputs = async () => {
  return Robot.aggregate([
    { $sort: { _id: 1 } },
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

export const findOuputsByIds = async (outputIds: string[]) => {
  const ids = outputIds.map((id) => mongoose.Types.ObjectId(id));
  return Robot.aggregate([
    { $match: { _id: { $in: ids } } },
    { $sort: { _id: 1 } },
    {
      $project: {
        _id: 1,
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
