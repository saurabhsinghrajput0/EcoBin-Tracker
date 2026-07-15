import React from 'react';
import { Trash2, CheckCircle2, AlertTriangle, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const StatCard = ({ title, value, icon: Icon, colorClass, gradientClass, trend, isPositive, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="glass-card p-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden group border border-white/40 dark:border-slate-700/50 hover:border-primary-200 dark:hover:border-primary-500/30"
  >
    <div className={clsx("absolute top-0 right-0 w-32 h-32 rounded-bl-full -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-125 opacity-70", gradientClass)}></div>
    <div className="flex justify-between items-start relative z-10 mb-4">
      <div className={clsx("p-3.5 rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110", colorClass)}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className={clsx("flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full", isPositive ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400" : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400")}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trend}
        </div>
      )}
    </div>
    <div className="relative z-10">
      <h3 className="text-gray-500 dark:text-gray-400 text-sm font-semibold uppercase tracking-wider mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</p>
    </div>
  </motion.div>
);

const StatsCards = ({ bins }) => {
  const total = bins.length;
  const empty = bins.filter(bin => bin.status === 'Empty').length;
  const halfFull = bins.filter(bin => bin.status === 'Half Full').length;
  const full = bins.filter(bin => bin.status === 'Full').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <StatCard 
        title="Total Bins" 
        value={total} 
        icon={Trash2} 
        colorClass="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 dark:from-blue-900/40 dark:to-blue-800/40 dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
        gradientClass="bg-blue-500/10 dark:bg-blue-500/5"
        trend="+12%"
        isPositive={true}
        delay={0.1}
      />
      <StatCard 
        title="Empty (Clean)" 
        value={empty} 
        icon={CheckCircle2} 
        colorClass="bg-gradient-to-br from-emerald-100 to-emerald-200 text-emerald-600 dark:from-emerald-900/40 dark:to-emerald-800/40 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
        gradientClass="bg-emerald-500/10 dark:bg-emerald-500/5"
        trend="+5%"
        isPositive={true}
        delay={0.2}
      />
      <StatCard 
        title="Half Full" 
        value={halfFull} 
        icon={AlertTriangle} 
        colorClass="bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 dark:from-yellow-900/40 dark:to-yellow-800/40 dark:text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.2)]"
        gradientClass="bg-yellow-500/10 dark:bg-yellow-500/5"
        delay={0.3}
      />
      <StatCard 
        title="Full & Critical" 
        value={full} 
        icon={AlertCircle} 
        colorClass="bg-gradient-to-br from-red-100 to-red-200 text-red-600 dark:from-red-900/40 dark:to-red-800/40 dark:text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.2)]"
        gradientClass="bg-red-500/10 dark:bg-red-500/5"
        trend="-2%"
        isPositive={false}
        delay={0.4}
      />
    </div>
  );
};

export default StatsCards;
