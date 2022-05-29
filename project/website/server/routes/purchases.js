const express = require('express');
const router = express.Router();

const controller = require('../controllers/purchases');

router.get('/history', controller.getHistory);

module.exports = router;
