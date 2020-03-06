import express from 'express';

import passportManager from '../../app/middleware/passport';
import PaymentController from '../../app/api/controllers/PaymentController';
import request from '../../app/request/payment';

const router = express.Router();

router.route('/transactions').post([passportManager.authenticate, request.createPaymentTransactionRequest], PaymentController.createPaymentTransaction);
router.route('/transactions/:transaction_id').get([request.showPaymentTransactionRequest], PaymentController.getPaymentTransactionDetail);
router.route('/transactions').get([request.listPaymentTransactionRequest], PaymentController.getPaymentTransactions);
router.route('/transactions/:transaction_id/void').put([passportManager.authenticate], PaymentController.getPaymentVoid);
router.route('/transactions/orders/:order_id').get([request.showCreditCardTransactionByOrderIdRequest], PaymentController.getCreditCardTransactionByOrderId);

export default router;