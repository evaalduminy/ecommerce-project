const Cart = require('../models/Cart');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity, price } = req.body;
    
    let cart = await Cart.findOne({ userId: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        userId: req.user._id,
        products: [{ productId, quantity, price }],
        totalPrice: quantity * price // legacy tracking, safe to keep alongside new DB scheme
      });
    } else {
      const itemIndex = cart.products.findIndex(item => item.productId.toString() === productId);
      if (itemIndex > -1) {
        cart.products[itemIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity, price });
      }
      cart.totalPrice = cart.products.reduce((acc, item) => acc + (item.quantity * item.price), 0);
      await cart.save();
    }

    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id }).populate('products.productId');
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.products = cart.products.filter(item => item.productId.toString() !== productId);
      cart.totalPrice = cart.products.reduce((acc, item) => acc + (item.quantity * item.price), 0);
      await cart.save();
    }
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.clearCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });
    if (cart) {
      cart.products = [];
      cart.totalPrice = 0;
      await cart.save();
    }
    res.status(200).json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
