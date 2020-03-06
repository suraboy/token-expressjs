import express from 'express';

import BBLController from '../../app/api/controllers/BBLController';
import passportManager from '../../app/middleware/passport';
import request from '../../app/request/bbl';

const router = express.Router();

//Credit List
router.route('/outlets/:outlet_id/terminals/:terminal_id/members/:member_id/credits').get([passportManager.authenticate, request.creditListRequest], BBLController.creditList);
router.route('/outlets/:outlet_id/terminals/:terminal_id/members/:member_id/get-token').get([passportManager.authenticate, request.creditListRequest], BBLController.creditToken);

router.route('/callback').post([request.callbackRequest], BBLController.BBLcallback);

export default router;