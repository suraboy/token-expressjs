import express from 'express';

import passportManager from '../../app/middleware/passport';
import PaymentChannelController from '../../app/api/controllers/PaymentChannelController';
import request from '../../app/request/payment-channel';

const router = express.Router();

router.route('/').get([passportManager.authenticate, request.indexPaymentChannelRequest] ,PaymentChannelController.index);
router.route('/:id').get([passportManager.authenticate, request.readPaymentChannelRequest] ,PaymentChannelController.show);
router.route('/').post([passportManager.authenticate, request.createPaymentChannelRequest] ,PaymentChannelController.create);
router.route('/:id').put([passportManager.authenticate, request.updatePaymentChannelRequest] ,PaymentChannelController.update);
router.route('/:id').delete([passportManager.authenticate, request.deletePaymentChannelRequest] ,PaymentChannelController.delete);

export default router;