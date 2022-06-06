const express = require('express');
const router = express.Router();

const controller = require('../controllers/product');

router.get('/', controller.getProducts);
router.get('/search', controller.searchProducts);
router.get('/:storeName/:sid', controller.getProduct);
router.get('/:storeName/:sid/morelikethis', controller.getMoreLikeThis);

router.post('/:storeId/:sid/buy', controller.makePurchase);

router.delete('/:storeId/:sid', controller.deleteProduct);

module.exports = router;
