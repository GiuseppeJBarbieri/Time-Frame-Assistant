import * as Joi from 'joi';

export default {
  PostDriver: {
    body: {
      name: Joi.string().required(),
    },
  },

  GetDriver: {
    params: {
      id: Joi.number().required(),
    },
  },

  GetAllDrivers: {
    params: {

    },
    body: {

    },
  },

};
