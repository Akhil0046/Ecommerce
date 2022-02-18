const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment-controller')

router.get('/payment-data',authentication.auth,paymentController.getAllpaymentDetails)
router.post('/add-payment-data/:id',authentication.auth,paymentController.addpaymentDetails)
router.put('/update-payment-data/:id',authentication.auth,paymentController.UpdatepaymentdDetails)
router.delete('/delete-payment-data/:id',authentication.auth,paymentController.DeletepaymentdDetails)

module.exports = router;