import React from 'react';
import { motion } from 'framer-motion';
import { Map, MapPin } from 'lucide-react';

const AreaList = ({ bins }) => {
  // Extract unique areas and count bins per area
  const areaStats = bins.reduce((acc, bin) => {
    if (!acc[bin.area]) {
      acc[bin.area] = {
        total: 0,
        full: 0,
        empty: 0,
        halfFull: 0
      };
    }
    
    acc[bin.area].total += 1;
    if (bin.status === 'Full') acc[bin.area].full += 1;
    if (bin.status === 'Empty') acc[bin.area].empty += 1;
    if (bin.status === 'Half Full') acc[bin.area].halfFull += 1;
    
    return acc;
  }, {});

  const areas = Object.keys(areaStats).sort();

  return (
    <div className="glass-card p-6 relative overflow-hidden group border border-white/40 dark:border-white/10">
      <div className="absolute top-[-50%] right-[-50%] w-48 h-48 bg-primary-500/10 rounded-full blur-3xl group-hover:bg-primary-500/20 transition-all duration-700 pointer-events-none"></div>
      
      <div className="flex items-center justify-between mb-6 relative z-10">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Map size={20} className="text-primary-500" />
          Areas Overview
        </h2>
        <span className="bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400 px-3 py-1 rounded-full text-xs font-bold border border-primary-100 dark:border-primary-500/20 shadow-sm">
          {areas.length} Areas
        </span>
      </div>
      
      {areas.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">No areas available yet.</p>
        </div>
      ) : (
        <div className="space-y-3 relative z-10">
          {areas.map((area, idx) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={area} 
              className="group/item p-4 rounded-xl border border-gray-200/50 dark:border-white/5 bg-white/40 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 hover:border-primary-200 dark:hover:border-primary-500/30 hover:shadow-md transition-all cursor-default"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-bold text-gray-800 dark:text-gray-200 group-hover/item:text-primary-600 dark:group-hover/item:text-primary-400 transition-colors flex items-center gap-2">
                  <MapPin size={14} className="text-gray-400 group-hover/item:text-primary-400" />
                  {area}
                </h3>
                <span className="text-xs font-bold text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-md shadow-inner">
                  {areaStats[area].total} Bins
                </span>
              </div>
              <div className="flex gap-3 text-[11px] font-bold uppercase tracking-wide">
                {areaStats[area].full > 0 && (
                  <span className="text-red-600 dark:text-red-400 flex items-center gap-1.5 bg-red-50 dark:bg-red-500/10 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]"></span> {areaStats[area].full} Full
                  </span>
                )}
                {areaStats[area].halfFull > 0 && (
                  <span className="text-yellow-600 dark:text-yellow-400 flex items-center gap-1.5 bg-yellow-50 dark:bg-yellow-500/10 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shadow-[0_0_5px_rgba(234,179,8,0.8)]"></span> {areaStats[area].halfFull} Half
                  </span>
                )}
                {areaStats[area].empty > 0 && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.8)]"></span> {areaStats[area].empty} Clean
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AreaList;
