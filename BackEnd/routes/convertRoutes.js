import express from 'express';
import { convertFiles, convertUrls } from '../controllers/convertController.js';

const router = express.Router();

router.post('/files', convertFiles);
router.post('/urls', convertUrls);

export default router;
