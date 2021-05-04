const express = require('express');
const router = express.Router();
module.exports = router;
const LoginController = require('../app/controllers/logincontroller');
router.get('/',LoginController.Loginstatus);
router.get('/',LoginController.login);
router.post('/',LoginController.store);
