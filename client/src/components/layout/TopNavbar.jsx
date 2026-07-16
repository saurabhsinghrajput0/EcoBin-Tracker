import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, Sun, Moon, Settings, User } from 'lucide-react';
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
      <div className="absolute inset-0 glass dark:bg-[#0a0a0a]/70 backdrop-blur-xl border-b border-white/40 dark:border-white/5 shadow-sm -z-10"></div>
      
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2.5 rounded-xl text-gray-500 hover:bg-white/50 dark:text-gray-400 dark:hover:bg-white/10 lg:hidden transition-all shadow-sm border border-transparent hover:border-gray-200 dark:hover:border-gray-700"
        >
          <Menu size={24} />
        </button>

        <div className="hidden md:flex items-center bg-white/60 dark:bg-[#111111]/80 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-gray-200/50 dark:border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all focus-within:ring-2 focus-within:ring-primary-500/30 focus-within:border-primary-500/50 group">
          <Search size={18} className="text-gray-400 group-focus-within:text-primary-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="bg-transparent border-none focus:outline-none ml-3 text-sm font-medium text-gray-700 dark:text-gray-200 w-72 placeholder:text-gray-400/80"
          />
          <div className="flex gap-1 ml-2 opacity-60 group-focus-within:opacity-100 transition-opacity">
            <kbd className="px-2 py-1 text-[10px] font-bold bg-gray-100/80 dark:bg-white/10 text-gray-500 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-700">⌘</kbd>
            <kbd className="px-2 py-1 text-[10px] font-bold bg-gray-100/80 dark:bg-white/10 text-gray-500 dark:text-gray-300 rounded-md border border-gray-200 dark:border-gray-700">K</kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 md:gap-5">
        <button 
          onClick={toggleTheme}
          className="p-2.5 rounded-full text-gray-500 hover:text-gray-900 bg-white/40 hover:bg-white/80 dark:bg-[#111111]/80 dark:text-gray-400 dark:hover:text-white transition-all border border-transparent hover:border-gray-200 dark:hover:border-white/10 shadow-sm"
        >
          <motion.div whileTap={{ rotate: 180 }} transition={{ duration: 0.3 }}>
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </motion.div>
        </button>

        <button className="p-2.5 rounded-full text-gray-500 hover:text-gray-900 bg-white/40 hover:bg-white/80 dark:bg-[#111111]/80 dark:text-gray-400 dark:hover:text-white transition-all border border-transparent hover:border-gray-200 dark:hover:border-white/10 shadow-sm relative group">
          <Bell size={20} className="group-hover:animate-swing" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-[#111111] shadow-[0_0_10px_rgba(16,185,129,0.8)] animate-pulse-slow"></span>
        </button>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-3 md:pl-5 border-l border-gray-200/50 dark:border-white/10 group"
          >
            <div className="text-right hidden sm:block transition-all">
              <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight group-hover:text-primary-500 dark:group-hover:text-primary-400 transition-colors">{user?.username || 'Admin User'}</p>
              <p className="text-xs text-primary-600 dark:text-primary-400/80 font-medium">{user?.role || 'Admin'}</p>
            </div>
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-500 to-emerald-400 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white/50 dark:ring-white/10 transition-transform group-hover:scale-105">
                {user?.username?.charAt(0).toUpperCase() || 'A'}
              </div>
              {/* Online Status Indicator */}
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-[#111111]"></div>
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-4 w-64 glass-card border border-white/50 dark:border-white/10 p-2 z-50 overflow-hidden shadow-2xl"
              >
                <div className="px-4 py-3 border-b border-gray-100/50 dark:border-white/10 mb-2">
                  <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.username || 'Admin User'}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email || 'admin@example.com'}</p>
                </div>
                
                <Link 
                  to="/profile" 
                  className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-colors"
                  onClick={() => setIsProfileOpen(false)}
                >
                  <User size={16} />
                  Your Profile
                </Link>
                <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-500/10 hover:text-primary-600 dark:hover:text-primary-400 rounded-xl transition-colors">
                  <Settings size={16} />
                  Preferences
                </a>
                
                <div className="h-px bg-gray-200/50 dark:bg-white/10 my-2"></div>
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-red-600 dark:text-red-400 bg-red-50/50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 rounded-xl transition-colors"
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
