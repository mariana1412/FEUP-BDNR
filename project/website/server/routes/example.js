const express = require('express');
const router = express.Router();

const controller = require('../controllers/example');

router.get('/', controller.getExample);

module.exports = router;
