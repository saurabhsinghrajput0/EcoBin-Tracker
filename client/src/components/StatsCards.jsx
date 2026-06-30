import React from 'react';

const StatsCards = ({ bins }) => {
  const total = bins.length;
  const empty = bins.filter(bin => bin.status === 'Empty').length;
  const halfFull = bins.filter(bin => bin.status === 'Half Full').length;
  const full = bins.filter(bin => bin.status === 'Full').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2 relative z-10">Total Bins</h3>
        <p className="text-4xl font-extrabold text-gray-800 relative z-10">{total}</p>
      </div>
      
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2 relative z-10">Empty Bins</h3>
        <p className="text-4xl font-extrabold text-green-600 relative z-10">{empty}</p>
      </div>
      
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2 relative z-10">Half Full</h3>
        <p className="text-4xl font-extrabold text-yellow-500 relative z-10">{halfFull}</p>
      </div>
      
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-soft border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
        <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider mb-2 relative z-10">Full & Alert</h3>
        <p className="text-4xl font-extrabold text-red-500 relative z-10">{full}</p>
      </div>
    </div>
  );
};

export default StatsCards;
