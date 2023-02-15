const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const {
  validateCreateApplicant,
  validateLogin,
} = require('../middleware/validation');

router.post(
  '/createAccount',
  validateCreateApplicant,
  authController.createApplicant,
);
router.post('/login', validateLogin, authController.login);
router.get('/logout', authController.logout);

module.exports = router;
