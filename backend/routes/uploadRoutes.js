const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'crimson-market',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }]
  }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB max

// Upload single image
router.post('/', protect, authorize('vendor', 'admin'), upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }
    res.status(200).json({
      success: true,
      url: req.file.path,
      public_id: req.file.filename
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Upload multiple images (max 5)
router.post('/multiple', protect, authorize('vendor', 'admin'), upload.array('images', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No image files provided' });
    }
    const urls = req.files.map(file => ({
      url: file.path,
      public_id: file.filename
    }));
    res.status(200).json({ success: true, images: urls });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete image from Cloudinary
router.delete('/:publicId', protect, authorize('vendor', 'admin'), async (req, res) => {
  try {
    await cloudinary.uploader.destroy(`crimson-market/${req.params.publicId}`);
    res.status(200).json({ success: true, message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
