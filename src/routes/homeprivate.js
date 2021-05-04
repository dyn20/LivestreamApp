const express = require('express');
const router = express.Router();

module.exports = router;
const Publiccontroller = require('../app/controllers/homeprivatecontroller');
router.get('/',Publiccontroller.home);