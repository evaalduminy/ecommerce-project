const Order = require('../models/Order');
const Vendor = require('../models/Vendor');
const User = require('../models/User');
const { sendOrderEmail } = require('../utils/emailService');

exports.getOrders = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === 'customer') {
      filter = { userId: req.user._id };
    } else if (req.user.role === 'vendor') {
      const vendor = await Vendor.findOne({ userId: req.user._id });
      if (!vendor) {
        return res.status(404).json({ success: false, message: 'Vendor profile not found' });
      }
      filter = { 'products.vendorId': vendor._id };
    } else if (req.user.role === 'admin') {
      filter = {};
    }

    const orders = await Order.find(filter).populate('products.productId');
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.placeOrder = async (req, res) => {
  try {
    const { products, shippingAddress, paymentMethod, totalAmount } = req.body;
    
    const order = await Order.create({
      userId: req.user._id,
      products,
      shippingAddress,
      paymentMethod,
      totalAmount
    });

    const populatedOrder = await Order.findById(order._id).populate('products.vendorId');
    
    // Notify Customer
    const user = await User.findById(req.user._id);
    if (user) await sendOrderEmail(user.email, order, 'created');

    // Notify Vendors
    const uniqueVendorIds = [...new Set(populatedOrder.products.map(p => p.vendorId._id.toString()))];
    for (const vendorId of uniqueVendorIds) {
      const vendorUser = await Vendor.findById(vendorId).populate('userId');
      if (vendorUser && vendorUser.userId) {
        await sendOrderEmail(vendorUser.userId.email, order, 'created');
      }
    }

    res.status(201).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Not found' });

    order.status = status;
    await order.save();

    const user = await User.findById(order.userId);
    if (user) {
      if (status === 'processing') await sendOrderEmail(user.email, order, 'accepted');
      else if (status === 'cancelled') await sendOrderEmail(user.email, order, 'rejected'); // Mapping rejected to cancelled
      else await sendOrderEmail(user.email, order, 'updated');
    }

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.vendorId');
    if (!order) return res.status(404).json({ success: false, message: 'Not found' });

    order.status = 'cancelled';
    await order.save();

    const user = await User.findById(order.userId);
    if (user) await sendOrderEmail(user.email, order, 'cancelled');

    const uniqueVendorIds = [...new Set(order.products.map(p => p.vendorId._id.toString()))];
    for (const vendorId of uniqueVendorIds) {
      const vendorUser = await Vendor.findById(vendorId).populate('userId');
      if (vendorUser && vendorUser.userId) {
        await sendOrderEmail(vendorUser.userId.email, order, 'cancelled');
      }
    }

    res.status(200).json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
