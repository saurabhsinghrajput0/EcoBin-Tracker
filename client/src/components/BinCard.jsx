import React from 'react';
import { deleteBin } from '../api';

const BinCard = ({ bin, setCurrentBin, fetchBins, setSuccessMsg }) => {
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Empty': return 'bg-green-100 text-green-700 border-green-200';
      case 'Half Full': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Full': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getFillColor = (level) => {
    if (level < 50) return 'bg-gradient-to-r from-green-400 to-green-500';
    if (level < 80) return 'bg-gradient-to-r from-yellow-400 to-yellow-500';
    return 'bg-gradient-to-r from-red-400 to-red-500';
  };

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete the bin at ${bin.location}?`)) {
      try {
        await deleteBin(bin._id);
        setSuccessMsg('Bin deleted successfully!');
        fetchBins();
        setTimeout(() => setSuccessMsg(''), 3000);
      } catch (error) {
        alert('Failed to delete bin');
      }
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-soft border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
      <div className="p-5 border-b border-gray-50">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-primary transition-colors">{bin.location}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(bin.status)}`}>
            {bin.status}
          </span>
        </div>
        <p className="text-gray-500 text-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {bin.area}
        </p>
      </div>
      
      <div className="p-5">
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-500 font-medium">Fill Level</span>
          <span className="font-bold text-gray-700">{bin.fillLevel}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 mb-5 overflow-hidden inset-shadow">
          <div 
            className={`h-full rounded-full ${getFillColor(bin.fillLevel)} transition-all duration-1000 ease-out`} 
            style={{ width: `${bin.fillLevel}%` }}
          ></div>
        </div>
        
        <p className="text-xs text-gray-400 mb-5 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Updated: {new Date(bin.lastCollected).toLocaleDateString()}
        </p>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setCurrentBin(bin)}
            className="flex-1 bg-blue-50/50 text-blue-600 border border-blue-100 hover:bg-blue-500 hover:text-white py-2 rounded-xl transition-all text-sm font-semibold shadow-sm"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="flex-1 bg-red-50/50 text-red-600 border border-red-100 hover:bg-red-500 hover:text-white py-2 rounded-xl transition-all text-sm font-semibold shadow-sm"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BinCard;
