const applicationController = require('../controllers/applicationController');
const express = require('express');
const router = express.Router();

router.get('/', applicationController.getAllApplications);

module.exports = router;
