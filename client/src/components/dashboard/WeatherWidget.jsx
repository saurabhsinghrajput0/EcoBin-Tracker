import React from 'react';
import { CloudRain, Wind, Droplets } from 'lucide-react';

const WeatherWidget = () => {
  return (
    <div className="glass-card p-6 relative overflow-hidden group h-full flex flex-col justify-between border border-white/40 dark:border-white/10 hover:border-blue-300 dark:hover:border-blue-500/50">
      <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition-all duration-500"></div>
      
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <h3 className="text-gray-900 dark:text-white font-bold text-lg">San Francisco</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Partly Cloudy</p>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-2xl text-blue-500 shadow-sm">
          <CloudRain size={28} />
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">18°C</span>
        </div>
        
        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/40 dark:border-white/10 shadow-sm backdrop-blur-sm">
            <Droplets size={14} className="text-blue-500" />
            45%
          </div>
          <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-white/5 px-2.5 py-1.5 rounded-lg border border-white/40 dark:border-white/10 shadow-sm backdrop-blur-sm">
            <Wind size={14} className="text-gray-500" />
            12 km/h
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
