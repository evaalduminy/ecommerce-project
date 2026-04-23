const Vendor = require('../models/Vendor');
const User = require('../models/User');

exports.getVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate('userId', 'name email');
    res.json({ success: true, vendors });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' });
    }

    await Vendor.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(vendor.userId, { role: 'customer' });

    res.json({ success: true, message: 'Vendor deleted and user downgraded to customer' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
