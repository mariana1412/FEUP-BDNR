const express = require('express');
const router = express.Router();

const controller = require('../controllers/clients');

router.get('/', controller.getClient);
router.post('/', controller.editClient);

module.exports = router;
