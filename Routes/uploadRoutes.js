const express = require('express');
const router = express.Router();
const { upload } = require('../Middleware/cloudinaryConfig');
const auth = require('../Middleware/auth');

router.post('/image', auth, upload.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    res.json({ url: req.file.path });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
