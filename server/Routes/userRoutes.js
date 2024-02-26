const express = require('express');
const userController = require('../Controller/userController');
const router = express.Router();

router.get('/fetchUserDetail',userController.fetchUserDetail)
router.post('/addUserDetail', userController.addUserDetail);
router.put('/updateUserDetail/:id',userController.updateUserDetail);

module.exports = router;
