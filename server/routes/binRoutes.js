const express = require('express');
const router = express.Router();

const {
  getBins,
  getBin,
  createBin,
  updateBin,
  deleteBin,
  getBinStats
} = require('../controllers/binController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validateRequest = require('../middleware/validateRequest');
const { binSchema } = require('../validations');

// Route: GET /bins/stats (Admin Only)
router.get('/stats', protect, authorize('Admin'), getBinStats);

// Route: GET /bins (Public for now or protect later)
router.get('/', getBins);

// Route: GET /bins/:id
router.get('/:id', getBin);

// Route: POST /bins (Admin only)
router.post('/', protect, authorize('Admin'), validateRequest(binSchema), createBin);

// Route: PUT /bins/:id (Admin and Driver)
router.put('/:id', protect, authorize('Admin', 'Driver'), updateBin);

// Route: DELETE /bins/:id (Admin only)
router.delete('/:id', protect, authorize('Admin'), deleteBin);

module.exports = router;
