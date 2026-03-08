const express = require('express');
const router = express.Router();
const bookingController = require('../Controllers/bookingController');
const auth = require('../Middleware/auth');

// Public route: Create a booking
router.post('/', bookingController.createBooking);

// Protected routes (Admin only)
router.get('/', auth, bookingController.getAllBookings);
router.put('/:id/status', auth, bookingController.updateBookingStatus);
router.delete('/:id', auth, bookingController.deleteBooking);

module.exports = router;
