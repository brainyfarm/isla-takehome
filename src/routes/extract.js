import express from 'express';
import ExtractController from '../controllers/extract/extract.js';

const router = express.Router();

router.get('/', ExtractController.getHome);
router.post('/', ExtractController.extractData);

export default router;

