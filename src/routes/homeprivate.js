const express = require('express');
const router = express.Router();

module.exports = router;
const Privatecontroller = require('../app/controllers/homeprivatecontroller');
router.get('/profile',Privatecontroller.profile)
router.get('/edit',Privatecontroller.editProfile);
router.post('/edit',Privatecontroller.editProfile);
router.get('/about',Privatecontroller.ShowSomethingAbout);
router.get('/',Privatecontroller.home);
router.get('/create',Privatecontroller.create);
router.post('/create',Privatecontroller.create);
router.get('/',Privatecontroller.join);
router.post('/',Privatecontroller.join);

