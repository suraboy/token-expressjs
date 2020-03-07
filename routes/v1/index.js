import express from 'express';
import weomniRouter from './weomni.route';
import bblRouter from './bbl.route';;
import paymentProvider from './payment-provider.route';
import paymentChannel from './payment-channel.route';
import paymentConfig from './payment-config.route';

const router = express.Router();

/**
 * remove prefix /api use  to the future.
 */
router.use('/v1/weomni', weomniRouter);


export default router;