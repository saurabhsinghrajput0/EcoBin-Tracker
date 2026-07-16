import React from 'react';
import { motion } from 'framer-motion';
import { Truck, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

const timelineData = [
  { id: 1, type: 'completed', title: 'Downtown Collection Route', time: '08:00 AM', driver: 'Alex M.', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-100 dark:bg-emerald-500/20' },
  { id: 2, type: 'in-progress', title: 'Financial District Route', time: '10:30 AM (In Progress)', driver: 'Sarah J.', icon: Truck, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-500/20' },
  { id: 3, type: 'alert', title: 'Critical Bin Alert - Mission', time: '11:15 AM', driver: 'Unassigned', icon: AlertTriangle, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-500/20' },
  { id: 4, type: 'pending', title: 'Sunset District Route', time: '02:00 PM (Scheduled)', driver: 'Mike R.', icon: Clock, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-white/10' },
];

const CollectionTimeline = () => {
  return (
    <div className="glass-card p-6 border border-white/40 dark:border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Collection Timeline</h3>
        <button className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline">View All</button>
      </div>

      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-300 dark:before:via-gray-700 before:to-transparent">
        {timelineData.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
          >
            {/* Icon */}
            <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-light-bg dark:border-dark-bg ${item.bg} ${item.color} shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 relative z-10`}>
              <item.icon size={16} />
            </div>
            
            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-200/50 dark:border-white/5 bg-white/40 dark:bg-[#111111]/40 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">{item.title}</h4>
                <time className="text-xs font-medium text-gray-500 dark:text-gray-400">{item.time}</time>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 font-medium flex items-center gap-1.5 mt-2">
                <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-600 dark:text-gray-300">{item.driver.charAt(0)}</div>
                {item.driver}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CollectionTimeline;
