const applicationController = require('../controllers/applicationController');
const express = require('express');
const router = express.Router();

router.get('/', applicationController.getAllApplications);

router.get('/:id', applicationController.getApplication);

module.exports = router;
