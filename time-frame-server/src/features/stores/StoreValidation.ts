import * as Joi from 'joi';

export default {
  PostStore: {
    body: {
      name: Joi.string().required(),
      emailAddress: Joi.string().required(),
    },
  },

  GetStore: {
    params: {
      storeId: Joi.number().required(),
    },
  },

  GetAllStores: {
    params: {

    },
    body: {

    },
  },

};
