const express = require('express');
const router = express.Router();

module.exports = router;
const LivestreamController = require('../app/controllers/Livestreamcontroller');
router.get('/',LivestreamController.Livestream);
