import React, { useEffect, useState } from 'react';
import { Trash2, CheckCircle2, AlertTriangle, AlertCircle, TrendingUp, TrendingDown, Leaf } from 'lucide-react';
import clsx from 'clsx';
import { motion, useAnimation } from 'framer-motion';

// Animated Counter Component
const AnimatedCounter = ({ value }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value, 10);
    if (start === end) return;
    
    const duration = 1000;
    const incrementTime = Math.max(duration / end, 20);
    
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
};

const StatCard = ({ title, value, icon: Icon, colorClass, gradientClass, trend, isPositive, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay, ease: "easeOut" }}
    className="glass-card p-6 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden group border border-white/40 dark:border-white/10 hover:border-primary-300 dark:hover:border-primary-500/50"
  >
    <div className={clsx("absolute top-[-50%] right-[-20%] w-48 h-48 rounded-full transition-transform duration-700 group-hover:scale-150 opacity-40 blur-2xl", gradientClass)}></div>
    <div className="flex justify-between items-start relative z-10 mb-4">
      <div className={clsx("p-3.5 rounded-2xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3", colorClass)}>
        <Icon size={24} />
      </div>
      {trend && (
        <div className={clsx("flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md border", isPositive ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" : "bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20")}>
          {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          {trend}
        </div>
      )}
    </div>
    <div className="relative z-10">
      <h3 className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{title}</h3>
      <p className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        <AnimatedCounter value={value} />
      </p>
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
        title="Total Smart Bins" 
        value={total || '156'} // Fallback for demo
        icon={Trash2} 
        colorClass="bg-gradient-to-br from-blue-100 to-blue-200 text-blue-600 dark:from-blue-500/20 dark:to-blue-600/20 dark:text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        gradientClass="bg-blue-500/20"
        trend="+12%"
        isPositive={true}
        delay={0.1}
      />
      <StatCard 
        title="Carbon Saved (kg)" 
        value="842" 
        icon={Leaf} 
        colorClass="bg-gradient-to-br from-primary-100 to-emerald-200 text-emerald-600 dark:from-primary-500/20 dark:to-emerald-600/20 dark:text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        gradientClass="bg-emerald-500/20"
        trend="+24%"
        isPositive={true}
        delay={0.2}
      />
      <StatCard 
        title="Requires Attention" 
        value={halfFull || '32'} 
        icon={AlertTriangle} 
        colorClass="bg-gradient-to-br from-yellow-100 to-yellow-200 text-yellow-600 dark:from-yellow-500/20 dark:to-yellow-600/20 dark:text-yellow-400 shadow-[0_0_15px_rgba(234,179,8,0.3)]"
        gradientClass="bg-yellow-500/20"
        delay={0.3}
      />
      <StatCard 
        title="Critical Routes" 
        value={full || '8'} 
        icon={AlertCircle} 
        colorClass="bg-gradient-to-br from-red-100 to-red-200 text-red-600 dark:from-red-500/20 dark:to-red-600/20 dark:text-red-400 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
        gradientClass="bg-red-500/20"
        trend="-5%"
        isPositive={false}
        delay={0.4}
      />
    </div>
  );
};

export default StatsCards;
