const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const { getVendors, deleteVendor } = require('../controllers/vendorController');
const router = express.Router();

router.get('/', protect, authorize('admin'), getVendors);
router.delete('/:id', protect, authorize('admin'), deleteVendor);

module.exports = router;
