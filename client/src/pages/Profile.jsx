import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Shield, Award, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  // Calculate joined date (mocked if not available in JWT)
  const joinedDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6 relative z-10"
    >
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">My Profile</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your account settings and preferences.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="md:col-span-1 glass-card p-6 flex flex-col items-center text-center">
          <div className="w-32 h-32 bg-gradient-to-tr from-primary-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg mb-4 text-white">
            <span className="text-5xl font-bold uppercase">{user?.username?.charAt(0) || 'U'}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{user?.username}</h2>
          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-xs font-bold uppercase tracking-wide mb-4 inline-flex items-center gap-1">
            <Shield size={12} />
            {user?.role || 'User'}
          </span>
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center gap-2 justify-center w-full">
            <Calendar size={14} /> Joined {joinedDate}
          </p>
        </div>

        {/* Details & Settings */}
        <div className="md:col-span-2 space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">Account Information</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                  <User size={16} /> Username
                </label>
                <div className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white">
                  {user?.username}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2">
                  <Mail size={16} /> Email Address
                </label>
                <div className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 text-gray-900 dark:text-white">
                  {user?.email}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button className="px-6 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg shadow-md transition-colors font-medium">
                Save Changes
              </button>
            </div>
          </div>

          <div className="glass-card p-6 bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/10 dark:to-cyan-900/10">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <Award className="text-emerald-500" /> Eco Impact
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Thank you for contributing to a cleaner environment! 
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">12</p>
                <p className="text-xs text-gray-500 font-medium uppercase mt-1">Reports</p>
              </div>
              <div className="bg-white/60 dark:bg-slate-800/60 p-4 rounded-xl text-center">
                <p className="text-3xl font-bold text-cyan-600 dark:text-cyan-400">45</p>
                <p className="text-xs text-gray-500 font-medium uppercase mt-1">Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
