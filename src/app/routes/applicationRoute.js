/**
 * This module sets up the routes for application related endpoints.
 * More granular endpoint-specific middleware can be added in this file.
 *
 * This module is what connects the express framework to the application controller.
 */

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
