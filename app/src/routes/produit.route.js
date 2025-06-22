import express from 'express';
import * as produitController from '../controllers/produit.controller.js';

const router = express.Router();

router.get('/', produitController.getAll);
router.get('/:facture', produitController.getByFacture);
router.post('/', produitController.create);
router.put('/:nom', produitController.update);
router.delete('/:nom', produitController.remove);

export default router;
