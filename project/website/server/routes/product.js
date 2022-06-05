const express = require('express');
const router = express.Router();

const controller = require('../controllers/product');

router.get('/', controller.getProducts);
router.get('/:id', controller.getProduct);

router.put('/buy', controller.makePurchase);

module.exports = router;
