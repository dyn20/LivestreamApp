const express = require('express');
const router = express.Router();

module.exports = router;
const SignupController = require('../app/controllers/signupcontroller');
router.get('/',SignupController.signup);
router.post('/',SignupController.store);