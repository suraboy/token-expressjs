import express from 'express';

import passportManager from '../../app/middleware/passport';
import PaymentConfigController from '../../app/api/controllers/PaymentConfigController';
import request from '../../app/request/payment-config';

const router = express.Router();

router.route('/').get([passportManager.authenticate, request.indexPaymentConfigRequest] ,PaymentConfigController.index);
router.route('/:id').get([passportManager.authenticate, request.readPaymentConfigRequest] ,PaymentConfigController.show);
router.route('/').post([passportManager.authenticate, request.createPaymentConfigRequest] ,PaymentConfigController.create);
router.route('/:id').put([passportManager.authenticate, request.updatePaymentConfigRequest] ,PaymentConfigController.update);
router.route('/:id').delete([passportManager.authenticate, request.deletePaymentConfigRequest] ,PaymentConfigController.delete);

export default router;