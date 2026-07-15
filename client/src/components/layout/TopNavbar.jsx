import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const TopNavbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="z-10 sticky top-0 px-4 md:px-8 py-4 flex items-center justify-between mb-4">
      {/* Background glass effect separate from content to avoid border issues on layout */}
      <div className="absolute inset-0 glass dark:bg-dark-bg/60 backdrop-blur-xl border-b border-white/40 dark:border-slate-800/60 shadow-sm -z-10"></div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2.5 rounded-xl text-gray-500 hover:bg-white/50 dark:text-gray-400 dark:hover:bg-slate-800/50 lg:hidden transition-all shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-5 py-2.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-inner transition-all focus-within:ring-2 focus-within:ring-primary-500/20 focus-within:bg-white dark:focus-within:bg-slate-800">
          <Search size={18} className="text-gray-400" />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="bg-transparent border-none focus:outline-none ml-3 text-sm font-medium text-gray-700 dark:text-gray-200 w-64 placeholder:text-gray-400"
          />
          <div className="flex gap-1 ml-2">
            <kbd className="px-2 py-1 text-[10px] font-semibold bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 rounded-md">Ctrl</kbd>
            <kbd className="px-2 py-1 text-[10px] font-semibold bg-gray-100 dark:bg-slate-700 text-gray-500 dark:text-gray-400 rounded-md">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full text-gray-500 hover:text-gray-900 bg-white/40 hover:bg-white/80 dark:bg-slate-800/40 dark:text-gray-400 dark:hover:text-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="p-2.5 rounded-full text-gray-500 hover:text-gray-900 bg-white/40 hover:bg-white/80 dark:bg-slate-800/40 dark:text-gray-400 dark:hover:text-white dark:hover:bg-slate-800 transition-all border border-transparent hover:border-gray-200 dark:hover:border-gray-700 shadow-sm relative group">
          <Bell size={20} className="group-hover:animate-swing" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-slate-900 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse-slow"></span>
        </button>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-3 md:pl-5 border-l border-gray-200/50 dark:border-gray-700/50"
          >
            <div className="text-right hidden sm:block transition-all">
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">{user?.username || 'Admin User'}</p>
              <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">{user?.role || 'Admin'}</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white/50 dark:ring-slate-800 transition-transform hover:scale-105">
              {user?.username?.charAt(0).toUpperCase() || 'A'}
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-56 glass-card border border-white/50 dark:border-slate-700/50 py-2 z-50 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-gray-100/50 dark:border-slate-700/50 sm:hidden">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.username || 'Admin User'}</p>
                  <p className="text-xs text-primary-600 dark:text-primary-400 truncate">{user?.email || 'admin@example.com'}</p>
                </div>
                
                <Link 
                  to="/profile" 
                  className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-slate-700/50 transition-colors"
                  onClick={() => setIsProfileOpen(false)}
                >
                  Your Profile
                </Link>
                <a href="#" className="block px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100/50 dark:hover:bg-slate-700/50 transition-colors">Preferences</a>
                
                <div className="h-px bg-gray-200/50 dark:bg-slate-700/50 my-1"></div>
                
                <button 
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50/50 dark:hover:bg-red-500/10 transition-colors"
                >
                  Sign out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
