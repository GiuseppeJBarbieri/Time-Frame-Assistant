import db from '../../models';
import logger from '../../utils/logging/Logger';
import IRepoError from '../../utils/interfaces/IRepoError';
import ITimeFrame from './ITimeFrame';

/// /////////////////
/// / INTERNALS /////
/// /////////////////

const repoErr: IRepoError = {
  location: 'TimeFrameRepository.js',
  statusCode: 500,
};

const standardError = (message: string) => {
  repoErr.message = message;
  logger.warn(repoErr);
};

export default {
  // eslint-disable-next-line max-len
  async Add(data:ITimeFrame): Promise<ITimeFrame> {
    try {
      // eslint-disable-next-line max-len
      return await db.TimeFrames.create(1, data.driverId, data.customerName, data.town, data.timeFrame, data.orderDate);
    } catch (err) {
      standardError(`${err.name} ${err.message}`);
      throw repoErr;
    }
  },

  async GetById(storeId: number): Promise<ITimeFrame> {
    try {
      return await db.TimeFrames.findOne({
        where: { storeId },
      });
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

  async GetAllTimeFrames(): Promise<ITimeFrame[]> {
    try {
      return await db.TimeFrames.findAll();
    } catch (err) {
      standardError(err.message);
      return Promise.reject(repoErr);
    }
  },

};