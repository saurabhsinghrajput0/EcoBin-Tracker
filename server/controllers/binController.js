const Bin = require('../models/Bin');

// 1. Get all bins
const getBins = async (req, res) => {
  try {
    const bins = await Bin.find().sort({ createdAt: -1 });
    res.status(200).json(bins);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bins', error: error.message });
  }
};

// 2. Get a single bin by ID
const getBin = async (req, res) => {
  try {
    const { id } = req.params;
    const bin = await Bin.findById(id);
    
    if (!bin) {
      return res.status(404).json({ message: 'Bin not found' });
    }
    
    res.status(200).json(bin);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the bin', error: error.message });
  }
};

// 3. Create a new bin
const createBin = async (req, res) => {
  try {
    const { location, area, fillLevel, status, lastCollected } = req.body;
    
    // Simple validation
    if (!location || !area) {
      return res.status(400).json({ message: 'Location and Area are required' });
    }
    
    const newBin = new Bin({
      location,
      area,
      fillLevel,
      status,
      lastCollected
    });
    
    const savedBin = await newBin.save();
    res.status(201).json(savedBin);
  } catch (error) {
    res.status(500).json({ message: 'Error creating the bin', error: error.message });
  }
};

// 4. Update an existing bin
const updateBin = async (req, res) => {
  try {
    const { id } = req.params;
    const { location, area, fillLevel, status, lastCollected } = req.body;
    
    const updatedBin = await Bin.findByIdAndUpdate(
      id, 
      { location, area, fillLevel, status, lastCollected },
      { new: true, runValidators: true }
    );
    
    if (!updatedBin) {
      return res.status(404).json({ message: 'Bin not found' });
    }
    
    res.status(200).json(updatedBin);
  } catch (error) {
    res.status(500).json({ message: 'Error updating the bin', error: error.message });
  }
};

// 5. Delete a bin
const deleteBin = async (req, res) => {
  try {
    const { id } = req.params;
    
    const deletedBin = await Bin.findByIdAndDelete(id);
    
    if (!deletedBin) {
      return res.status(404).json({ message: 'Bin not found' });
    }
    
    res.status(200).json({ message: 'Bin deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the bin', error: error.message });
  }
};

module.exports = {
  getBins,
  getBin,
  createBin,
  updateBin,
  deleteBin
};
