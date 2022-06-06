const express = require('express');
const router = express.Router();

const controller = require('../controllers/product');

router.get('/', controller.getProducts);
router.get('/search', controller.searchProducts);
router.get('/:storeName/:sid', controller.getProduct);
router.get('/:storeName/:sid/morelikethis', controller.getMoreLikeThis);

module.exports = router;
