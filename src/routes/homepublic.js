const express = require('express');
const router = express.Router();

module.exports = router;
const Publiccontroller = require('../app/controllers/publiccontroller');
router.get('/',Publiccontroller.home);