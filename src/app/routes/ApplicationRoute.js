const applicationController = require('../controllers/applicationController');
const express = require('express');
const Router = express.Router();

Router.get('/', applicationController.getAllApplications);

module.exports = Router;
