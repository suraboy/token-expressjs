import express from 'express';
import IndexController from '../../app/api/controllers/IndexController';
import passportManager from '../../app/middleware/passport';


const router = express.Router();

router.route('/').get([passportManager.authenticate], IndexController.index);
router.route('/').post([passportManager.authenticate], IndexController.store);
router.route('/:id').get([passportManager.authenticate], IndexController.show);
router.route('/:id').put([passportManager.authenticate], IndexController.update);
router.route('/:id').delete([passportManager.authenticate], IndexController.delete);

export default router;