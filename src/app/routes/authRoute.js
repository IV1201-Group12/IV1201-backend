const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authorizeRequest } = require('../middleware/authorization');

router.post('/createAccount', authController.createApplicant);
router.post('/login', authController.login);
router.get('/test', authorizeRequest, (req, res) => {
  res.status(200).send('hej');
});
module.exports = router;
