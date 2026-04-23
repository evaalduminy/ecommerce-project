const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { addToCart, getCart, removeFromCart, clearCart } = require('../controllers/cartController');
const router = express.Router();

router.post('/', protect, authorize('customer'), addToCart);
router.get('/', protect, authorize('customer'), getCart);
router.delete('/', protect, authorize('customer'), clearCart);
router.delete('/:productId', protect, authorize('customer'), removeFromCart);

module.exports = router;
