import * as express from 'express';
import validate from '../../middleware/JoiValidator';
import DriverValidation from './DriverValidation';
import logger from '../../utils/logging/Logger';
import authenticationMiddleware from '../../middleware/Auth';
import DriverController from './DriverController';

const router = express.Router();

//= ==============================================================================================//
//  ROUTES                                                                                       //
//= ==============================================================================================//

/**
 * This route will add a driver.
 */
router.post('/', authenticationMiddleware, validate(DriverValidation.PostDriver),
  (req, res, next) => {
    logger.info('POST Driver');
    DriverController.Add(req.body)
      .then((response) => {
        res.status(201).json(response);
      })
      .catch((err) => next(err));
  });

/**
 * This route will fetch a driver by id
 */
router.get('/:id', authenticationMiddleware, validate(DriverValidation.GetDriver), (req, res, next) => {
  logger.info('GET Driver');

  DriverController.GetById(Number(req.params.id))
    .then((driver) => res.status(200).json(driver))
    .catch((err) => next(err));
});

/**
 * This route will fetch all drivers
 */
router.get('/', authenticationMiddleware, validate(DriverValidation.GetAllDrivers), (req, res, next) => {
  logger.info('GET ALL Drivers');

  DriverController.GetAll()
    .then((drivers) => res.status(200).json(drivers))
    .catch((err) => next(err));
});

export default router;
