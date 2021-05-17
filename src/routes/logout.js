const express = require('express');
const router = express.Router();
module.exports = router;
const LogoutController = require('../app/controllers/logoutcontroller');
router.get('/',LogoutController.Logout);