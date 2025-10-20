const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/roles');
const flightController = require('../controllers/flightController');

router.post('/', protect, authorize('admin'), flightController.createFlight);
router.get('/', flightController.getFlights);
router.get('/:id', flightController.getFlight);
router.put('/:id', protect, authorize('admin'), flightController.updateFlight);
router.delete('/:id', protect, authorize('admin'), flightController.deleteFlight);

module.exports = router;
