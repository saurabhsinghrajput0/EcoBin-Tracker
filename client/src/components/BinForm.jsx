import React, { useState, useEffect, useRef } from 'react';
import { createBin, updateBin } from '../api';
import { Plus, Edit3, MapPin, Navigation, BarChart2, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BinForm = ({ fetchBins, currentBin, setCurrentBin, setSuccessMsg }) => {
  const [formData, setFormData] = useState({
    location: '',
    area: '',
    lat: 40.7128,
    lng: -74.0060,
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
        lat: currentBin.lat || 40.7128,
        lng: currentBin.lng || -74.0060,
        fillLevel: currentBin.fillLevel,
        status: currentBin.status
      });
    } else {
      setFormData({
        location: '',
        area: '',
        lat: 40.7128,
        lng: -74.0060,
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
      setFormData({ location: '', area: '', lat: 40.7128, lng: -74.0060, fillLevel: 0, status: 'Empty' });
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
    setFormData({ location: '', area: '', lat: 40.7128, lng: -74.0060, fillLevel: 0, status: 'Empty' });
    setError('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
      className="glass-card p-6 md:p-8 relative overflow-hidden"
    >
      {/* Decorative gradient blur */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

      <div className="flex items-center gap-3 mb-8 relative z-10">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-emerald-100 dark:from-primary-900/40 dark:to-emerald-900/40 text-primary-600 dark:text-primary-400 flex items-center justify-center shadow-sm">
          {currentBin ? <Edit3 size={20} /> : <Plus size={20} />}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
            {currentBin ? 'Edit Bin Details' : 'Add New Bin'}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {currentBin ? 'Update information for this specific bin location' : 'Register a new smart bin in the system'}
          </p>
        </div>
      </div>
      
      <AnimatePresence>
        {error && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-red-50/80 dark:bg-red-500/10 text-red-700 dark:text-red-400 p-4 rounded-xl border border-red-100 dark:border-red-500/20 mb-6 text-sm font-medium flex items-center gap-2 backdrop-blur-sm"
          >
            <Activity size={16} /> {error}
          </motion.div>
        )}
      </AnimatePresence>
      
      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="space-y-5 mb-8">
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              <MapPin size={14} className="text-gray-400" /> Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              ref={locationInputRef}
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400 shadow-inner backdrop-blur-sm"
              placeholder="e.g. Central Park North Gate"
            />
          </div>
          
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
              <Navigation size={14} className="text-gray-400" /> Area *
            </label>
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200 text-gray-900 dark:text-white placeholder:text-gray-400 shadow-inner backdrop-blur-sm"
              placeholder="e.g. Downtown District"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Latitude *</label>
              <input
                type="number"
                step="any"
                name="lat"
                value={formData.lat}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200 text-gray-900 dark:text-white shadow-inner backdrop-blur-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">Longitude *</label>
              <input
                type="number"
                step="any"
                name="lng"
                value={formData.lng}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200 text-gray-900 dark:text-white shadow-inner backdrop-blur-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                <BarChart2 size={14} className="text-gray-400" /> Fill Level (%)
              </label>
              <input
                type="number"
                name="fillLevel"
                value={formData.fillLevel}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200 text-gray-900 dark:text-white shadow-inner backdrop-blur-sm"
              />
            </div>
            
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-2">
                Status
              </label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500 transition-all duration-200 text-gray-900 dark:text-white appearance-none cursor-pointer shadow-inner backdrop-blur-sm font-medium"
                >
                  <option value="Empty">Empty (0-49%)</option>
                  <option value="Half Full">Half Full (50-79%)</option>
                  <option value="Full">Full (80-100%)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-gradient-to-r from-primary-500 to-emerald-500 hover:from-primary-600 hover:to-emerald-600 text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transform hover:-translate-y-0.5 transition-all duration-200 flex justify-center items-center gap-2"
          >
            {currentBin ? 'Save Changes' : 'Register Bin'}
          </button>
          
          {currentBin && (
            <button
              type="button"
              onClick={cancelEdit}
              className="flex-1 bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-slate-600 font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default BinForm;
