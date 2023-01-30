const express = require('express');
const router = express.Router();
const createAccountController = require('../controllers/createAccountController');

router.post('/', createAccountController.createApplicant);

module.exports = router;
