import express from 'express';

import passportManager from '../../app/middleware/passport';
import PaymentProviderController from '../../app/api/controllers/PaymentProviderController';
import request from '../../app/request/payment-provider';

const router = express.Router();

router.route('/').get([passportManager.authenticate, request.indexPaymentProviderRequest] ,PaymentProviderController.index);
router.route('/:id').get([passportManager.authenticate, request.readPaymentProviderRequest] ,PaymentProviderController.show);
router.route('/').post([passportManager.authenticate, request.createPaymentProviderRequest] ,PaymentProviderController.create);
router.route('/:id').put([passportManager.authenticate, request.updatePaymentProviderRequest] ,PaymentProviderController.update);
router.route('/:id').delete([passportManager.authenticate, request.deletePaymentProviderRequest] ,PaymentProviderController.delete);

export default router;