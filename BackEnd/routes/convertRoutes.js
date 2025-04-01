const express = require('express');
const router = express.Router();
const controller = require('../controllers/convertController');

router.post('/files', controller.convertFiles);
router.post('/urls', controller.convertUrls);

module.exports = router;
