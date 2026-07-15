import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { getBins } from '../api';
import { CloudRain, Sun, Moon, Activity, Download, Settings } from 'lucide-react';

import StatsCards from '../components/StatsCards';
import SearchBar from '../components/SearchBar';
import BinForm from '../components/BinForm';
import BinCard from '../components/BinCard';
import AreaList from '../components/AreaList';
import { SkeletonCard, SkeletonStat } from '../components/Skeleton';
import MonthlyAnalyticsChart from '../components/charts/MonthlyAnalyticsChart';
import WasteCategoryChart from '../components/charts/WasteCategoryChart';

const Dashboard = () => {
  const { user } = useAuth();
  
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [currentBin, setCurrentBin] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const fetchBins = async () => {
    try {
      const response = await getBins();
      setBins(response.data);
    } catch (error) {
      console.error('Error fetching bins:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBins();
  }, []);

  const filteredBins = bins.filter(bin => {
    const matchesSearch = bin.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bin.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || bin.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return { text: 'Good morning', icon: <Sun className="text-yellow-500" size={24} /> };
    if (hour < 18) return { text: 'Good afternoon', icon: <Sun className="text-orange-500" size={24} /> };
    return { text: 'Good evening', icon: <Moon className="text-blue-400" size={24} /> };
  };

  const greeting = getGreeting();
  const overallHealth = bins.length ? Math.round((bins.filter(b => b.status === 'Empty' || b.status === 'Half Full').length / bins.length) * 100) : 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 relative z-10"
    >
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-2xl shadow-sm border border-white/40 dark:border-slate-700/50 backdrop-blur-md">
            {greeting.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight flex items-center gap-2">
              {greeting.text}, <span className="bg-gradient-to-r from-primary-500 to-emerald-400 bg-clip-text text-transparent">{user?.username || 'Admin'}</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 font-medium">
              Here is what's happening with your waste management system today.
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 glass-panel text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-slate-700/80 transition-all font-semibold text-sm shadow-sm hover:shadow-md">
            <Download size={16} />
            Export Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-emerald-500 hover:from-primary-600 hover:to-emerald-600 text-white rounded-xl shadow-[0_4px_15px_rgba(16,185,129,0.3)] hover:shadow-[0_6px_20px_rgba(16,185,129,0.4)] transition-all font-semibold text-sm transform hover:-translate-y-0.5">
            <Settings size={16} />
            Optimize Routes
          </button>
        </div>
      </header>

      <AnimatePresence>
        {successMsg && (
          <motion.div 
            initial={{ opacity: 0, height: 0, scale: 0.9 }}
            animate={{ opacity: 1, height: 'auto', scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9 }}
            className="bg-emerald-50/80 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 px-6 py-4 rounded-2xl shadow-sm flex items-center gap-3 backdrop-blur-md"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <span className="font-semibold">{successMsg}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <SkeletonStat /><SkeletonStat /><SkeletonStat /><SkeletonStat />
            </div>
          ) : (
            <StatsCards bins={bins} />
          )}
          
          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 glass-card p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Collection Analytics</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total waste collected over the last 7 months</p>
                </div>
                <select className="bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 text-sm rounded-lg px-3 py-2 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>This Year</option>
                  <option>Last Year</option>
                </select>
              </div>
              <MonthlyAnalyticsChart />
            </div>
            <div className="lg:col-span-1 glass-card p-6 flex flex-col">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Waste Breakdown</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Composition of collected waste</p>
              <div className="flex-1 min-h-[250px]">
                <WasteCategoryChart />
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar Widget (System Health) */}
        <div className="w-full lg:w-80 space-y-6">
          <div className="glass-card p-6 relative overflow-hidden group">
            <div className="absolute -right-10 -top-10 w-32 h-32 bg-primary-500/10 rounded-full blur-2xl group-hover:bg-primary-500/20 transition-all"></div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">System Health</h3>
            <p className="text-sm text-gray-500 mb-6">Real-time capacity tracking</p>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100 dark:text-slate-700" />
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray={`${overallHealth * 2.51} 251`} 
                    className="text-primary-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-1000" 
                  />
                </svg>
                <div className="absolute text-3xl font-bold text-gray-900 dark:text-white">{overallHealth}%</div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Operational Bins</span>
                <span className="font-bold text-gray-900 dark:text-white">{bins.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400">Critical Status</span>
                <span className="font-bold text-red-500">{bins.filter(b => b.status === 'Full').length}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity size={18} className="text-primary-500" /> Recent Activity
              </h3>
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] flex-shrink-0"></div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Bin collected at Downtown Area</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{i + 1} hours ago</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm font-semibold text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-colors">View All Activity</button>
          </div>
        </div>
      </div>

      {/* Bin Management Section */}
      <div className="pt-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Bin Management</h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <AreaList bins={bins} />
            <BinForm 
              fetchBins={fetchBins} 
              currentBin={currentBin} 
              setCurrentBin={setCurrentBin}
              setSuccessMsg={setSuccessMsg}
            />
          </div>
          
          <div className="lg:col-span-3 space-y-6">
            <SearchBar 
              searchTerm={searchTerm} 
              setSearchTerm={setSearchTerm}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
            />
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard /><SkeletonCard />
              </div>
            ) : filteredBins.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-16 text-center flex flex-col items-center justify-center border-dashed border-2 border-gray-300 dark:border-gray-700"
              >
                <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-gray-400">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                </div>
                <p className="text-gray-500 font-medium text-lg">No bins found matching your criteria.</p>
                <button onClick={() => {setSearchTerm(''); setFilterStatus('All');}} className="mt-4 px-4 py-2 bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-500/20 font-medium transition-colors">Clear all filters</button>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <AnimatePresence>
                  {filteredBins.map((bin) => (
                    <motion.div
                      key={bin._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <BinCard 
                        bin={bin} 
                        setCurrentBin={setCurrentBin} 
                        fetchBins={fetchBins}
                        setSuccessMsg={setSuccessMsg}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
