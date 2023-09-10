// server/routes/dataRoute.js
const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');

// Route to retrieve and display data
router.get('/:filename', dataController.displayData);

module.exports = router;
