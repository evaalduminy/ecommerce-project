const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Vendor can manage their own products, Admin can manage all products
router.post('/', protect, authorize('vendor', 'admin'), createProduct);

router.put('/:id', protect, authorize('vendor', 'admin'), updateProduct);

router.delete('/:id', protect, authorize('vendor', 'admin'), deleteProduct);

module.exports = router;
