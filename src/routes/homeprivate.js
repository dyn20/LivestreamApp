const express = require('express');
const router = express.Router();

module.exports = router;
const Privatecontroller = require('../app/controllers/homeprivatecontroller');
router.get('/profile',Privatecontroller.profile)
router.get('/edit',Privatecontroller.editProfile);
router.post('/edit',Privatecontroller.editProfile);
router.get('/enteruser',Privatecontroller.EnterUsername);
router.get('/',Privatecontroller.home);