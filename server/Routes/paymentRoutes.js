const express = require('express');
const paymentController = require('../Controller/paymentController');

const router = express.Router();

router.post('/processPayment', paymentController.processPayment);
router.post('/validate', paymentController.paymentValidation);

module.exports = router;
