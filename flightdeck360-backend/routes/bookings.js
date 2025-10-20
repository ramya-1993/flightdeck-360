const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const bookingController = require('../controllers/bookingController');

router.post('/', protect, bookingController.createBooking);
router.get('/', protect, bookingController.getBookings);
router.get('/:id', protect, bookingController.getBooking);

// Admin only to update status
router.put('/:id/status', protect, authorize('admin'), bookingController.updateBookingStatus);

module.exports = router;
