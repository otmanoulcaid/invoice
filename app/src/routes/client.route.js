import express from 'express';
import * as clientController from '../controllers/client.controller.js';

const router = express.Router();

router.get('/', clientController.getAll);
router.get('/:nom', clientController.getByName);
router.post('/', clientController.create);
router.put('/:nom', clientController.update);
router.delete('/:nom', clientController.remove);

export default router;
