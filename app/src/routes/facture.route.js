import express from 'express';
import * as factureController from '../controllers/facture.controller.js';

const router = express.Router();

router.get('/', factureController.getAll);
router.get('/:numero', factureController.getByNumber);
router.post('/', factureController.create);
router.put('/:nom', factureController.update);
router.delete('/:numero', factureController.remove);

export default router;
