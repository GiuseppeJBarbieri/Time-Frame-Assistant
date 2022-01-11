import TimeFrameRepository from './TimeFrameRepository';
import constants from '../../utils/constants/Constants';
import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';
import ITimeFrame from './ITimeFrame';

export default {
  /**
   * This function will add the given user
   * @param user The user to add
   * @returns {PromiseLike<>}
   */

  // TODO THIS
  // eslint-disable-next-line max-len
  async Add(data:ITimeFrame): Promise<IHTTPResponse> {
    console.log('>>>>>>>>>> Repo', data.customerName);
    try {
      const timeFrame = await TimeFrameRepository.Add(data);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
        id: timeFrame.orderId,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetByTimeFrameId(orderId: number) {
    try {
      const timeFrame = await TimeFrameRepository.GetById(orderId);

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [timeFrame],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  // TODO GET ALL BY DATE

  async GetAll() {
    try {
      const timeFrames = await TimeFrameRepository.GetAllTimeFrames();
      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...timeFrames],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};
