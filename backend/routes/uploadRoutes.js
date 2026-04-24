const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { storage } = require('../config/firebase'); // Our new Firebase storage bucket
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// Configure multer for memory storage
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// Helper function to upload to Firebase Storage
const uploadToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) reject('No file provided');

    const fileName = `crimson-market/${uuidv4()}_${file.originalname}`;
    const fileUpload = storage.file(fileName);

    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    blobStream.on('error', (error) => {
      reject(error);
    });

    blobStream.on('finish', async () => {
      try {
        // Make the file public (optional, but convenient for dev)
        await fileUpload.makePublic();
        
        // Construct the public URL
        const publicUrl = `https://storage.googleapis.com/${storage.name}/${fileUpload.name}`;
        
        resolve({
          url: publicUrl,
          public_id: fileUpload.name
        });
      } catch (err) {
        reject(err);
      }
    });

    blobStream.end(file.buffer);
  });
};

// Upload single image
router.post('/', protect, authorize('vendor', 'admin'), upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    const result = await uploadToFirebase(req.file);
    res.status(200).json({
      success: true,
      url: result.url,
      public_id: result.public_id
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

    const uploadPromises = req.files.map(file => uploadToFirebase(file));
    const results = await Promise.all(uploadPromises);

    res.status(200).json({ 
      success: true, 
      images: results.map(r => ({ url: r.url, public_id: r.public_id }))
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete image from Firebase Storage
router.delete('/:publicId', protect, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const file = storage.file(decodeURIComponent(req.params.publicId));
    await file.delete();
    res.status(200).json({ success: true, message: 'Image deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
