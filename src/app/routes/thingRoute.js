const thingController = require('../controllers/thingController.js');
const express = require('express');
const router = express.Router();

router.get('/', thingController.getAllThings);
router.get('/:id', thingController.getThing);

module.exports = router;
