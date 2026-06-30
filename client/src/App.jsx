import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import StatsCards from './components/StatsCards';
import SearchBar from './components/SearchBar';
import BinForm from './components/BinForm';
import BinCard from './components/BinCard';
import AreaList from './components/AreaList';
import Login from './components/Login';
import Register from './components/Register';
import { getBins } from './api';

function App() {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'dashboard'
  const [currentUser, setCurrentUser] = useState(null);
  
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  
  // State for form
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
    if (currentView === 'dashboard') {
      fetchBins();
    }
  }, [currentView]);

  // Filter bins based on search and status
  const filteredBins = bins.filter(bin => {
    const matchesSearch = bin.location.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          bin.area.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || bin.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleLogin = (username) => {
    setCurrentUser(username);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('login');
  };

  if (currentView === 'login') {
    return <Login onLogin={handleLogin} onSwitchToRegister={() => setCurrentView('register')} />;
  }

  if (currentView === 'register') {
    return <Register onRegisterSuccess={handleLogin} onSwitchToLogin={() => setCurrentView('login')} />;
  }

  return (
    <div className="min-h-screen bg-light text-dark font-sans relative">
      {/* Realistic Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/assets/realistic_dash_bg.png" 
          alt="Dashboard Background" 
          className="w-full h-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/80 to-gray-50/90 backdrop-blur-[2px]"></div>
      </div>
      
      <div className="relative z-10">
        <Navbar onLogout={handleLogout} />
        
        <main className="container mx-auto p-4 md:p-6 lg:p-8">
          
          <div className="mb-6 flex justify-between items-center bg-white/60 backdrop-blur-md p-4 rounded-xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
            <span className="text-gray-600 font-medium">Welcome, <span className="text-primary font-bold">{currentUser}</span></span>
          </div>

          {successMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-xl shadow-sm mb-6 flex items-center gap-3 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="font-medium">{successMsg}</span>
            </div>
          )}

          <StatsCards bins={bins} />
          
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
            
            <div className="lg:col-span-3">
              <SearchBar 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                filterStatus={filterStatus}
                setFilterStatus={setFilterStatus}
              />
              
              {loading ? (
                <div className="flex justify-center p-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
                </div>
              ) : filteredBins.length === 0 ? (
                <div className="bg-white/80 backdrop-blur-md p-16 text-center rounded-2xl shadow-soft border border-gray-100 flex flex-col items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  <p className="text-gray-500 font-medium text-lg">No bins found matching your criteria.</p>
                  <button onClick={() => {setSearchTerm(''); setFilterStatus('All');}} className="mt-4 text-primary hover:text-primaryDark underline font-medium">Clear filters</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredBins.map((bin) => (
                    <BinCard 
                      key={bin._id} 
                      bin={bin} 
                      setCurrentBin={setCurrentBin} 
                      fetchBins={fetchBins}
                      setSuccessMsg={setSuccessMsg}
                    />
                  ))}
                </div>
              )}
            </div>
            
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
