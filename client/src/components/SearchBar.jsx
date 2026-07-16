import React from 'react';
import { Search, Filter } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm, filterStatus, setFilterStatus }) => {
  return (
    <div className="glass-panel p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center relative z-20 border border-white/40 dark:border-white/10">
      <div className="flex-1 w-full relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-primary-500 text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search bins by location or area..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white/60 dark:bg-[#111111]/60 border border-gray-200/50 dark:border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 font-medium text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 shadow-inner backdrop-blur-md"
        />
        <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
          <div className="hidden sm:flex gap-1">
            <kbd className="px-2 py-1 text-[10px] font-bold bg-gray-100/80 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded border border-gray-200/50 dark:border-white/10">⌘</kbd>
            <kbd className="px-2 py-1 text-[10px] font-bold bg-gray-100/80 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded border border-gray-200/50 dark:border-white/10">F</kbd>
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-64 relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 group-focus-within:text-primary-500 text-gray-400">
          <Filter size={16} />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full pl-10 pr-10 py-3 bg-white/60 dark:bg-[#111111]/60 border border-gray-200/50 dark:border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 font-medium text-gray-700 dark:text-gray-200 appearance-none cursor-pointer shadow-inner backdrop-blur-md"
        >
          <option value="All" className="bg-white dark:bg-[#1a1a1a]">All Statuses</option>
          <option value="Empty" className="bg-white dark:bg-[#1a1a1a]">🟢 Clean (0-49%)</option>
          <option value="Half Full" className="bg-white dark:bg-[#1a1a1a]">🟡 Half Full (50-79%)</option>
          <option value="Full" className="bg-white dark:bg-[#1a1a1a]">🔴 Critical (80-100%)</option>
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-gray-500 dark:text-gray-400 transition-transform duration-300 group-focus-within:rotate-180">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
