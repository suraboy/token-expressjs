import express from 'express';
import TokenController from "../../app/api/controllers/TokenController";

const router = express.Router();

/**
 * remove prefix /api use  to the future.
 */
router.route('/authen').get([], TokenController.testAuthenAcc);

export default router;