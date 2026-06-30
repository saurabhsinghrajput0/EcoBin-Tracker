import React, { useState } from 'react';
import { registerUser } from '../api';

const Register = ({ onSwitchToLogin, onRegisterSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    if (password.length < 5) {
      return setError('Password must be at least 5 characters');
    }

    setLoading(true);
    try {
      const response = await registerUser({ username, password });
      onRegisterSuccess(response.data.username);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to register. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/realistic_auth_bg.png" 
          alt="Eco City Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent"></div>
      </div>

      <div className="z-10 w-full max-w-md p-8 bg-white/20 backdrop-blur-2xl rounded-2xl shadow-glass border border-white/30 text-white">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primaryDark text-white rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Create Account</h2>
          <p className="text-gray-200 mt-2">Join the smart waste management team</p>
        </div>

        {error && (
          <div className="bg-red-500/20 border-l-4 border-red-500 p-4 mb-6 rounded-r">
            <p className="text-red-100 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-white/10 text-white placeholder-gray-300"
              placeholder="Choose a username"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-white/10 text-white placeholder-gray-300"
              placeholder="Create a password"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-1">Confirm Password</label>
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/20 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none bg-white/10 text-white placeholder-gray-300"
              placeholder="Confirm your password"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primaryDark hover:from-primaryDark hover:to-primary text-white font-bold rounded-xl shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70"
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-200">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="text-primary hover:text-white font-bold transition-colors underline">
            Log in here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
