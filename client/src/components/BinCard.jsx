import React from 'react';
import { deleteBin } from '../api';
import { MapPin, Clock, Edit2, Trash2, Zap } from 'lucide-react';

const BinCard = ({ bin, setCurrentBin, fetchBins, setSuccessMsg }) => {
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'Empty': return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-400 dark:border-emerald-500/30';
      case 'Half Full': return 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30';
      case 'Full': return 'bg-red-100 text-red-700 border-red-200 dark:bg-red-500/20 dark:text-red-400 dark:border-red-500/30';
      default: return 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700';
    }
  };

  const getFillColor = (level) => {
    if (level < 50) return 'bg-gradient-to-r from-emerald-400 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
    if (level < 80) return 'bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]';
    return 'bg-gradient-to-r from-red-400 to-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
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
    <div className="glass-card flex flex-col h-full group">
      <div className="p-5 border-b border-gray-200/50 dark:border-slate-700/50">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{bin.location}</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${getStatusColor(bin.status)}`}>
            {bin.status}
          </span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-1.5 font-medium">
          <MapPin size={16} className="text-primary-500" />
          {bin.area}
        </p>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <div className="mb-2 flex justify-between items-center text-sm">
          <span className="text-gray-500 dark:text-gray-400 font-semibold flex items-center gap-1">
            <Zap size={14} className="text-amber-500" /> Fill Level
          </span>
          <span className="font-bold text-gray-900 dark:text-white">{bin.fillLevel}%</span>
        </div>
        <div className="w-full bg-gray-200/50 dark:bg-slate-700/50 rounded-full h-2.5 mb-5 overflow-hidden shadow-inner backdrop-blur-sm">
          <div 
            className={`h-full rounded-full ${getFillColor(bin.fillLevel)} transition-all duration-1000 ease-out relative`} 
            style={{ width: `${bin.fillLevel}%` }}
          >
            <div className="absolute top-0 right-0 bottom-0 left-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem] animate-[progress_1s_linear_infinite]"></div>
          </div>
        </div>
        
        <p className="text-xs text-gray-400 dark:text-gray-500 mb-6 flex items-center gap-1.5 mt-auto">
          <Clock size={14} />
          Updated: {new Date(bin.lastCollected).toLocaleDateString()}
        </p>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setCurrentBin(bin)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-50/80 text-blue-600 border border-blue-200/50 hover:bg-blue-500 hover:text-white dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 dark:hover:bg-blue-500 dark:hover:text-white py-2.5 rounded-xl transition-all text-sm font-semibold shadow-sm hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
          >
            <Edit2 size={16} /> Edit
          </button>
          <button 
            onClick={handleDelete}
            className="flex-1 flex items-center justify-center gap-2 bg-red-50/80 text-red-600 border border-red-200/50 hover:bg-red-500 hover:text-white dark:bg-red-500/10 dark:text-red-400 dark:border-red-500/20 dark:hover:bg-red-500 dark:hover:text-white py-2.5 rounded-xl transition-all text-sm font-semibold shadow-sm hover:shadow-[0_4px_12px_rgba(239,68,68,0.3)]"
          >
            <Trash2 size={16} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BinCard;
