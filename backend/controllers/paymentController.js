const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_12345');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

exports.createCheckoutSession = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId).populate('products.productId');
    
    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    const lineItems = order.products.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.productId.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects cents
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cart?canceled=true`,
      metadata: {
        order_id: order._id.toString(),
        user_id: req.user._id.toString()
      }
    });

    res.status(200).json({ success: true, url: session.url });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    const orderId = session.metadata.order_id;
    const userId = session.metadata.user_id;

    // Create payment record
    await Payment.create({
      orderId,
      userId,
      amount: session.amount_total / 100,
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent,
      status: 'completed'
    });

    // Update order status
    await Order.findByIdAndUpdate(orderId, { paymentStatus: 'completed' });
  }

  res.status(200).json({ received: true });
};
