const express = require('express');
const router = express.Router();
const cartController = require('../controller/cart-controller')
const authentication= require('../middleware/authentication')

router.get('/cart-data',authentication.auth,cartController.getAllCartDetails)
router.post('/add-cart-data',authentication.auth,cartController.addcartDetails)
// router.post('/add-to-cart/:id',authentication.auth,cartController.addproductToCart)
// router.delete('/delete-product/:id',authentication.auth,cartController.deleteProductFormCart)

router.put('/update-cart-data/:id',authentication.auth,cartController.UpdatecartdDetails)
router.delete('/delete-cart-data/:id',authentication.auth,cartController.DeletecartdDetails)

module.exports = router;