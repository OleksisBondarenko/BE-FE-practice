const express = require('express');
const { addProduct, allProducts, deleteProducts, updateProduct } = require('../controllers/product');

const router = express.Router();

router.post('/', addProduct);
router.put('/', updateProduct);
router.get('/all', allProducts);
router.get('/', allProducts);
router.delete('/', deleteProducts)

module.exports = router;