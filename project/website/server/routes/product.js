const express = require('express');
const router = express.Router();

const controller = require('../controllers/product');

router.get('/', controller.getProducts);
router.get('/:id', controller.getProduct);

router.put('/buy', controller.makePurchase);

router.delete('/:storeId/:sid', controller.deleteProduct);

module.exports = router;
