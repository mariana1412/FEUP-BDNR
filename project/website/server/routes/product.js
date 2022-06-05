const express = require('express');
const router = express.Router();

const controller = require('../controllers/product');

router.get('/', controller.getProducts);
router.get('/search', controller.searchProducts);
router.get('/:id', controller.getProduct);

module.exports = router;
