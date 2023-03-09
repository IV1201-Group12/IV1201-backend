/**
 * This module sets up the routes for user related endpoints.
 * More granular endpoint-specific middleware can be added in this file.
 *
 * This module is what connects the express framework to the user controller.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id', userController.getUser);

module.exports = router;
