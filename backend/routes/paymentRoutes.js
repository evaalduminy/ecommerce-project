const express = require('express');
const { protect } = require('../middleware/auth');
const { createCheckoutSession } = require('../controllers/paymentController');

const router = express.Router();

router.post('/create-checkout-session', protect, createCheckoutSession);
// The webhook is registered heavily in server.js directly due to rawBody needs.

module.exports = router;
