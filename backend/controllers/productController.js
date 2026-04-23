const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate('category', 'name slug');
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'name slug');
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    let vendorId;
    if (req.user.role === 'admin') {
      vendorId = req.body.vendorId;
      if (!vendorId) {
         return res.status(400).json({ success: false, message: 'Admin must provide vendorId to create a product' });
      }
    } else if (req.user.role === 'vendor') {
      const vendor = await Vendor.findOne({ userId: req.user._id });
      if (!vendor) {
        return res.status(404).json({ success: false, message: 'Vendor profile not found' });
      }
      vendorId = vendor._id;
    }

    const product = await Product.create({
      ...req.body,
      vendorId
    });

    res.status(201).json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Ownership check
    if (req.user.role === 'vendor') {
      const vendor = await Vendor.findOne({ userId: req.user._id });
      if (!vendor || product.vendorId.toString() !== vendor._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized to update this product' });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, product: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // Ownership check
    if (req.user.role === 'vendor') {
      const vendor = await Vendor.findOne({ userId: req.user._id });
      if (!vendor || product.vendorId.toString() !== vendor._id.toString()) {
        return res.status(403).json({ success: false, message: 'Not authorized to delete this product' });
      }
    }

    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
