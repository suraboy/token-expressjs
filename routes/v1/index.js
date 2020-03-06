import express from 'express';
import weomniRouter from './weomni.route';
import bblRouter from './bbl.route';
import paymentRouter from './payment.route';
import paymentProvider from './payment-provider.route';
import paymentChannel from './payment-channel.route';
import paymentConfig from './payment-config.route';

const router = express.Router();

/**
 * remove prefix /api use  to the future.
 */
router.use('/v1/weomni', weomniRouter);
router.use('/v1/bbl', bblRouter);
router.use('/v1/payment', paymentRouter);
router.use('/v1/payment-providers', paymentProvider);
router.use('/v1/payment-channels', paymentChannel);
router.use('/v1/payment-configs', paymentConfig);

/**
 * Future will delete this end-point.
 */
router.use('/api/v1/weomni', weomniRouter);
router.use('/api/v1/bbl', bblRouter);
router.use('/api/v1/payment', paymentRouter);
router.use('/api/v1/payment-providers', paymentProvider);
router.use('/api/v1/payment-channels', paymentChannel);
router.use('/api/v1/payment-configs', paymentConfig);


export default router;