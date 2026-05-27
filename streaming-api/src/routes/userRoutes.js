const express = require('express');
const router = express.Router();
const StreamingController = require('../controllers/streaming');

router.post('/', StreamingController.createUser);

router.get('/:userId/history', StreamingController.getUserHistory);

module.exports = router;