const Admin = require('../Models/Admin');
const jwt = require('jsonwebtoken');

// Admin Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 86400000 // 1 day
    });

    res.status(200).json({ message: 'Login successful', token, admin: { email: admin.email, role: admin.role } });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// Admin Logout
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logged out successfully' });
};

// Check Auth Status (for dashboard refresh)
exports.checkAuth = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ authenticated: false });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) return res.status(401).json({ authenticated: false });

    res.status(200).json({ authenticated: true, admin });
  } catch (err) {
    res.status(401).json({ authenticated: false });
  }
};
