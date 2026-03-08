const express = require('express');
const router = express.Router();
const adminController = require('../Controllers/adminController');
const auth = require('../Middleware/auth');

router.post('/login', adminController.login);
router.post('/logout', adminController.logout);
router.get('/check-auth', adminController.checkAuth);

module.exports = router;
