/**
 * This module sets up the routes for auth related endpoints.
 * More granular endpoint-specific middleware can be added in this file.
 *
 * This module is what connects the express framework to the auth controller.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateRegister, validateLogin } = require('../middleware/validation');

router.post('/register', validateRegister, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/logout', authController.logout);

module.exports = router;
