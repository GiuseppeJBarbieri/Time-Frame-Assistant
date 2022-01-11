import StoreRepository from './StoreRepository';
import constants from '../../utils/constants/Constants';
import IHTTPResponse from '../../utils/interfaces/IHTTPResponse';

export default {
  /**
   * This function will add the given user
   * @param user The user to add
   * @returns {PromiseLike<>}
   */
  async Add(storeName: string, emailAddress: string): Promise<IHTTPResponse> {
    try {
      const store = await StoreRepository.Add(storeName, emailAddress);

      return {
        ...constants.HTTP.SUCCESS.CREATED,
        id: store.storeId,
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetById(storeId: number) {
    try {
      const store = await StoreRepository.GetById(storeId);

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [store],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },

  async GetAll() {
    try {
      const stores = await StoreRepository.GetAllStores();

      return {
        ...constants.HTTP.SUCCESS.SELECTED,
        payload: [...stores],
      };
    } catch (err) {
      return Promise.reject(err);
    }
  },
};
