const express = require('express');
const router = express.Router();

const {
  getBins,
  getBin,
  createBin,
  updateBin,
  deleteBin
} = require('../controllers/binController');

// Route: GET /bins
router.get('/', getBins);

// Route: GET /bins/:id
router.get('/:id', getBin);

// Route: POST /bins
router.post('/', createBin);

// Route: PUT /bins/:id
router.put('/:id', updateBin);

// Route: DELETE /bins/:id
router.delete('/:id', deleteBin);

module.exports = router;
