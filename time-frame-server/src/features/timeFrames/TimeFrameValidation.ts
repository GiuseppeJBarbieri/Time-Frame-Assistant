import * as Joi from 'joi';

export default {
  PostTimeFrame: {
    body: {
      storeId: Joi.number().required(),
      driverId: Joi.number().required(),
      customerName: Joi.string().required(),
      town: Joi.string().required(),
      orderNumber: Joi.string().required(),
      timeFrame: Joi.string().required(),
      orderDate: Joi.string().required(),
    },
  },

  GetTimeFrame: {
    params: {
      orderId: Joi.number().required(),
    },
  },

  GetAllTimeFrames: {
    params: {

    },
    body: {

    },
  },

};
