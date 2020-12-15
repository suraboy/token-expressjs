import express from 'express';
import PaymentController from "../../app/api/controllers/TokenController";

const router = express.Router();

/**
 * remove prefix /api use  to the future.
 */
router.route('/v1/authen').get([], PaymentController.testAuthenAcc);

export default router;