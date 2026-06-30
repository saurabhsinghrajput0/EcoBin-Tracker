import React from 'react';

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
    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-soft border border-gray-100 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">Areas Overview</h2>
        <span className="bg-primary/10 text-primaryDark px-3 py-1 rounded-full text-sm font-semibold">
          {areas.length} Areas
        </span>
      </div>
      
      {areas.length === 0 ? (
        <p className="text-gray-500 text-sm italic">No areas available yet.</p>
      ) : (
        <div className="space-y-3">
          {areas.map(area => (
            <div key={area} className="group p-4 rounded-xl border border-gray-100 hover:border-primary/30 hover:bg-primary/5 transition-all duration-300">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-gray-800 group-hover:text-primaryDark transition-colors">{area}</h3>
                <span className="text-sm font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-md group-hover:bg-primary/10 transition-colors">
                  {areaStats[area].total} Bins
                </span>
              </div>
              <div className="flex gap-2 text-xs">
                {areaStats[area].full > 0 && (
                  <span className="text-red-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span> {areaStats[area].full} Full
                  </span>
                )}
                {areaStats[area].halfFull > 0 && (
                  <span className="text-yellow-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-yellow-500"></span> {areaStats[area].halfFull} Half
                  </span>
                )}
                {areaStats[area].empty > 0 && (
                  <span className="text-green-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span> {areaStats[area].empty} Empty
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AreaList;
