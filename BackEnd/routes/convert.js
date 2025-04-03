
import express from 'express';
import { convertOfficeFiles, convertFromUrls } from '../controllers/convertController.js';

const router = express.Router();

router.post('/convert/files', convertOfficeFiles);
router.post('/convert/urls', convertFromUrls);

export default router;
