import React, { useState, useEffect, useRef } from 'react';
import { createBin, updateBin } from '../api';

const BinForm = ({ fetchBins, currentBin, setCurrentBin, setSuccessMsg }) => {
  const [formData, setFormData] = useState({
    location: '',
    area: '',
    fillLevel: 0,
    status: 'Empty'
  });
  const [error, setError] = useState('');
  const locationInputRef = useRef(null);

  // Focus the first input field on load or when editing
  useEffect(() => {
    if (locationInputRef.current) {
      locationInputRef.current.focus();
    }
  }, [currentBin]);

  // Populate form if editing
  useEffect(() => {
    if (currentBin) {
      setFormData({
        location: currentBin.location,
        area: currentBin.area,
        fillLevel: currentBin.fillLevel,
        status: currentBin.status
      });
    } else {
      setFormData({
        location: '',
        area: '',
        fillLevel: 0,
        status: 'Empty'
      });
    }
  }, [currentBin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.location || !formData.area) {
      setError('Location and Area are required.');
      return;
    }

    try {
      if (currentBin) {
        // Update existing bin
        await updateBin(currentBin._id, formData);
        setSuccessMsg('Bin updated successfully!');
      } else {
        // Create new bin
        await createBin(formData);
        setSuccessMsg('Bin added successfully!');
      }
      
      // Reset form and refresh list
      setFormData({ location: '', area: '', fillLevel: 0, status: 'Empty' });
      setCurrentBin(null);
      fetchBins();
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch (err) {
      setError('Failed to save bin. Please try again.');
    }
  };

  const cancelEdit = () => {
    setCurrentBin(null);
    setFormData({ location: '', area: '', fillLevel: 0, status: 'Empty' });
    setError('');
  };

  return (
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-soft border border-gray-100">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
          {currentBin ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800">{currentBin ? 'Edit Bin' : 'Add New Bin'}</h2>
      </div>
      
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-xl border border-red-100 mb-4 text-sm font-medium">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              ref={locationInputRef}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-gray-700"
              placeholder="e.g. Central Park"
            />
          </div>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Area *</label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-gray-700"
              placeholder="e.g. Downtown"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Fill Level (%)</label>
              <input
                type="number"
                name="fillLevel"
                value={formData.fillLevel}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-gray-700"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 text-gray-700 appearance-none cursor-pointer"
              >
                <option value="Empty">Empty</option>
                <option value="Half Full">Half Full</option>
                <option value="Full">Full</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary to-primaryDark hover:from-primaryDark hover:to-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            {currentBin ? 'Update Bin' : 'Add Bin'}
          </button>
          
          {currentBin && (
            <button
              type="button"
              onClick={cancelEdit}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-xl transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BinForm;
