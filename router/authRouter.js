const express = require('express');
const router = express.Router();
const auth = require('../controller/auth')

const authentication= require('../middleware/authentication')


router.post('/register',auth.register)
router.post('/login',authentication.auth,auth.login)

module.exports = router;