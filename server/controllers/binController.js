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
    const { location, area, fillLevel, status, lastCollected, lat, lng } = req.body;
    
    // Simple validation
    if (!location || !area || lat === undefined || lng === undefined) {
      return res.status(400).json({ message: 'Location, Area, lat, and lng are required' });
    }
    
    const newBin = new Bin({
      location,
      area,
      lat,
      lng,
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
    const { location, area, fillLevel, status, lastCollected, lat, lng } = req.body;
    
    const updatedBin = await Bin.findByIdAndUpdate(
      id, 
      { location, area, lat, lng, fillLevel, status, lastCollected },
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

// 6. Get Aggregated Analytics for Dashboard
const getBinStats = async (req, res) => {
  try {
    // Generate mock history since we don't have historical data structure yet
    const monthlyData = [
      { name: 'Jan', waste: 4000 },
      { name: 'Feb', waste: 3000 },
      { name: 'Mar', waste: 2000 },
      { name: 'Apr', waste: 2780 },
      { name: 'May', waste: 1890 },
      { name: 'Jun', waste: 2390 },
      { name: 'Jul', waste: 3490 },
    ];
    
    const categoryData = [
      { name: 'Plastic', value: 400 },
      { name: 'Organic', value: 300 },
      { name: 'Glass', value: 300 },
      { name: 'Paper', value: 200 },
    ];

    res.status(200).json({
      monthlyData,
      categoryData,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error generating stats', error: error.message });
  }
};

module.exports = {
  getBins,
  getBin,
  createBin,
  updateBin,
  deleteBin,
  getBinStats
};
