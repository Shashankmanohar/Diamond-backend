const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://127.0.0.1:5173', 
    'http://localhost:8080', 
    'http://127.0.0.1:8080', 
    'https://diamondresort.in', 
    'http://diamondresort.in',
    'https://diamond-frontend-lyart.vercel.app'
  ],
  credentials: true
}));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Basic Route
app.get('/', (req, res) => {
  res.send('Dimond Resort API is running...');
});

// Routes
app.use('/api/bookings', require('./Routes/bookingRoutes'));
app.use('/api/admin', require('./Routes/adminRoutes'));
app.use('/api/blogs', require('./Routes/blogRoutes'));
app.use('/api/upload', require('./Routes/uploadRoutes'));

// 404 Handler for API
app.use((req, res, next) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global Error Handler (Returns JSON instead of HTML)
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(err.status || 500).json({ 
    message: err.message || 'An internal server error occurred',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
