import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import TimeFrameValidation from './TimeFrameValidation';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import TimeFrameController from './TimeFrameController';

const router = express.Router();

//= ==============================================================================================//
//  ROUTES                                                                                       //
//= ==============================================================================================//

/**
 * This route will add a store.
 */
router.post('/', authenticationMiddleware, validate(TimeFrameValidation.PostTimeFrame),
  (req, res, next) => {
    logger.info('POST TimeFrame');
    TimeFrameController.Add(req.body.data)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
 * This route will fetch a store by id
 */
router.get('/:id', authenticationMiddleware, validate(TimeFrameValidation.GetTimeFrame), (req, res, next) => {
  logger.info('GET TimeFrame');

  TimeFrameController.GetByTimeFrameId(Number(req.params.id))
    .then((store) => res.status(200).json(store))
    .catch((err) => next(err));
});

/**
 * This route will fetch all stores
 */
router.get('/', authenticationMiddleware, validate(TimeFrameValidation.GetAllTimeFrames), (req, res, next) => {
  logger.info('GET ALL TimeFrames');

  TimeFrameController.GetAll()
    .then((stores) => res.status(200).json(stores))
    .catch((err) => next(err));
});

export default router;
