import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export const SkeletonCard = ({ className }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className={clsx("glass-card p-6 relative overflow-hidden", className)}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"></div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className="w-12 h-12 bg-gray-200/80 dark:bg-slate-700/80 rounded-xl animate-pulse"></div>
      <div className="w-20 h-6 bg-gray-200/80 dark:bg-slate-700/80 rounded-full animate-pulse"></div>
    </div>
    <div className="h-6 bg-gray-200/80 dark:bg-slate-700/80 rounded-lg w-3/4 mb-3 animate-pulse relative z-10"></div>
    <div className="h-4 bg-gray-200/80 dark:bg-slate-700/80 rounded-lg w-1/2 mb-6 animate-pulse relative z-10"></div>
    <div className="flex justify-between relative z-10">
      <div className="w-1/3 h-4 bg-gray-200/80 dark:bg-slate-700/80 rounded-lg animate-pulse"></div>
      <div className="w-1/4 h-4 bg-gray-200/80 dark:bg-slate-700/80 rounded-lg animate-pulse"></div>
    </div>
  </motion.div>
);

export const SkeletonStat = ({ className }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className={clsx("glass-card p-6 flex items-center gap-4 relative overflow-hidden", className)}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 dark:via-white/5 to-transparent"></div>
    <div className="w-16 h-16 bg-gray-200/80 dark:bg-slate-700/80 rounded-2xl animate-pulse relative z-10"></div>
    <div className="flex-1 space-y-3 relative z-10">
      <div className="h-4 bg-gray-200/80 dark:bg-slate-700/80 rounded-lg w-1/2 animate-pulse"></div>
      <div className="h-8 bg-gray-200/80 dark:bg-slate-700/80 rounded-lg w-3/4 animate-pulse"></div>
    </div>
  </motion.div>
);
