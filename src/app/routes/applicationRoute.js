const applicationController = require('../controllers/applicationController');
const express = require('express');
const router = express.Router();
const {
  validateChangeStatusOfApplication,
} = require('../middleware/validation');

router.get('/', applicationController.getAllApplications);

router.get('/:id', applicationController.getApplication);

router.put(
  '/:id',
  validateChangeStatusOfApplication,
  applicationController.changeStatusOfApplication,
);

module.exports = router;
