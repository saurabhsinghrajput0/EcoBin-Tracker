import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, MapPin, Trash2, Settings, Users, LogOut, X, BarChart3, Activity } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const getNavItems = () => {
    const baseItems = [
      { name: 'Dashboard', path: '/', icon: LayoutDashboard },
      { name: 'Bins', path: '/bins', icon: Trash2 },
      { name: 'Analytics', path: '/analytics', icon: BarChart3 },
      { name: 'Activity', path: '/activity', icon: Activity },
    ];

    if (user?.role === 'Admin') {
      baseItems.push({ name: 'Users', path: '/users', icon: Users });
      baseItems.push({ name: 'Settings', path: '/settings', icon: Settings });
    }

    return baseItems;
  };

  const navItems = getNavItems();

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-dark-bg/60 backdrop-blur-sm lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className={clsx(
        "fixed inset-y-0 left-0 z-50 w-[280px] m-4 lg:m-6 rounded-[2rem] glass-panel border-white/40 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] flex flex-col transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-y-6 lg:h-[calc(100vh-3rem)] overflow-hidden",
        isOpen ? "translate-x-0" : "-translate-x-[120%]"
      )}>
        {/* Decorative background glow for sidebar */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-primary-500/10 to-transparent pointer-events-none"></div>

        <div className="flex items-center justify-between p-6 lg:p-8 relative z-10">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-400 to-emerald-600 flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:shadow-[0_0_25px_rgba(16,185,129,0.7)] transition-all duration-300 transform group-hover:scale-105">
              <span className="text-white font-bold text-xl tracking-tighter">E</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-emerald-400 bg-clip-text text-transparent text-glow">
              EcoBin
            </span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-2 px-4 scrollbar-hide relative z-10">
          <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4 ml-4">Main Menu</div>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 font-medium relative overflow-hidden group",
                    isActive 
                      ? "text-primary-700 dark:text-primary-300" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  )}
                >
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-primary-100/50 dark:bg-primary-500/10 backdrop-blur-md rounded-2xl -z-10 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)] border border-primary-200/50 dark:border-primary-500/20"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary-400 to-emerald-600 rounded-r-full shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    ></motion.div>
                  )}
                  <item.icon size={22} className={clsx(
                    "transition-all duration-300 relative z-10",
                    isActive ? "text-primary-600 dark:text-primary-400 transform scale-110" : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300 group-hover:scale-110"
                  )} />
                  <span className="relative z-10">{item.name}</span>
                </NavLink>
              )
            })}
          </nav>
        </div>

        <div className="p-4 lg:p-6 mt-auto relative z-10">
          <div className="glass-card p-4 rounded-[1.5rem] mb-4 bg-gradient-to-br from-primary-50/80 to-emerald-50/80 dark:from-primary-900/30 dark:to-emerald-900/30 border border-primary-200/50 dark:border-primary-500/20 text-center relative overflow-hidden group">
            <div className="absolute top-[-50%] right-[-50%] w-32 h-32 bg-primary-500/20 rounded-full blur-2xl group-hover:bg-primary-500/30 transition-all duration-500"></div>
            <div className="absolute bottom-[-50%] left-[-50%] w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">Eco Pro Plan</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">Upgrade for advanced analytics & AI routing</p>
              <button className="w-full text-xs font-bold bg-white dark:bg-slate-800 text-primary-600 dark:text-primary-400 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:bg-gray-50 dark:hover:bg-slate-700 transition-all transform hover:-translate-y-0.5">Upgrade Now</button>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3.5 text-red-500/90 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-2xl transition-all font-medium group"
          >
            <LogOut size={22} className="group-hover:-translate-x-1 transition-transform" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
