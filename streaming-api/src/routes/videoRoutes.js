const express = require('express');
const router = express.Router();
const StreamingController = require('../controllers/streaming');

router.post('/', StreamingController.createVideo);
router.get('/ranking', StreamingController.getRanking);
router.delete('/:videoId', StreamingController.deleteVideo);

module.exports = router;