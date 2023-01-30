const thingController = require('../controllers/thingController.js');
const { authorizeRequest } = require('../middleware/authorization');
const express = require('express');
const router = express.Router();

router.get('/', thingController.getAllThings);
router.get('/:id', authorizeRequest, thingController.getThing);

module.exports = router;
