import DriverRepository from './DriverRepository';
import constants from '../../utils/constants/Constants';
import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';

export default {
  /**
   * This function will add the given user
   * @param user The user to add
   * @returns {PromiseLike<>}
   */
  async Add(driverName: string): Promise<IHTTPResponse> {
    try {
      const driver = await DriverRepository.Add(driverName);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
        id: driver.driverId,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetById(driverId: number) {
    try {
      const driver = await DriverRepository.GetById(driverId);

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [driver],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetAll() {
    try {
      const drivers = await DriverRepository.GetAllDrivers();

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...drivers],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};
