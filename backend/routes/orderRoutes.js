const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getOrders, placeOrder, updateOrderStatus, cancelOrder } = require('../controllers/orderController');
const router = express.Router();

router.post('/', protect, authorize('customer'), placeOrder);
router.get('/', protect, authorize('customer', 'vendor', 'admin'), getOrders);
router.put('/:id/status', protect, authorize('vendor', 'admin'), updateOrderStatus);
router.put('/:id/cancel', protect, authorize('customer', 'admin'), cancelOrder);

module.exports = router;
