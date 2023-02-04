const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authorizeRequest } = require('../middleware/authorization');

router.post('/createAccount', authController.createApplicant);
router.post('/login', authController.login);
router.get('/test', authorizeRequest, authController.testThing);

module.exports = router;
