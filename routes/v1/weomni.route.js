import express from 'express';

import passportManager from '../../app/middleware/passport';
import weOmniOfflineRequest from '../../app/request/weomni/payment/offline';
import weOmniOnlineRequest from '../../app/request/weomni/payment/online';
import weOmniPaymentTransactionRequest from "../../app/request/weomni/payment/transaction";
import WeOmniOnlinePaymentController from "../../app/api/controllers/WeOmniOnlinePaymentController";
import WeOmniOfflinePaymentController from '../../app/api/controllers/WeOmniOfflinePaymentController';
import PaymentController from "../../app/api/controllers/PaymentController";

const router = express.Router();
router.route('/offline/activate').post([passportManager.authenticate, weOmniOfflineRequest.activate], WeOmniOfflinePaymentController.activateCode);
router.route('/offline/charges').post([passportManager.authenticate, weOmniOfflineRequest.charge], WeOmniOfflinePaymentController.charge);
router.route('/offline/charges/:id/voids').post([passportManager.authenticate, weOmniOfflineRequest.void], WeOmniOfflinePaymentController.void);
router.route('/offline/charges/:client_trx_id/status').get([passportManager.authenticate], WeOmniOfflinePaymentController.getPaymentStatus);
router.route('/offline/charges/client-create/:client_trx_id/status').get([passportManager.authenticate, weOmniOfflineRequest.checkPayment], WeOmniOfflinePaymentController.getPaymentStatusByclientTxt);

router.route('/online/otp/request').post([passportManager.authenticate, weOmniOnlineRequest.requestOtp], WeOmniOnlinePaymentController.requestOtp);
router.route('/online/otp/verify').post([passportManager.authenticate, weOmniOnlineRequest.verifyOtp], WeOmniOnlinePaymentController.verifyOtp);
router.route('/online/payment/charge').post([passportManager.authenticate, weOmniOnlineRequest.chargePayment], WeOmniOnlinePaymentController.chargePayment);
router.route('/online/payment/cancel').post([passportManager.authenticate, weOmniOnlineRequest.cancelPayment], WeOmniOnlinePaymentController.cancelPayment);

//List Transaction Tmn
router.route('/offline/transactions').get([passportManager.authenticate], PaymentController.getTrueMoneyWalletOfflineTransactions);
router.route('/online/transactions').get([passportManager.authenticate], PaymentController.getTrueMoneyWalletOnlineTransactions);
//Create Transaction Tmn

router.route('/authen').get([], PaymentController.testAuthenAcc);

export default router;