import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-700 bg-slate-50 dark:bg-dark-bg">
      {/* Background Image (faint) */}
      <div className="absolute inset-0 z-0 opacity-[0.2] dark:opacity-[0.05] transition-opacity duration-1000">
        <img 
          src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Nature Background" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark mode specific subtle grid / noise */}
      <div className="absolute inset-0 z-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] dark:opacity-[0.08] mix-blend-overlay"></div>
      
      {/* Mesh Gradient Base */}
      <div className="absolute inset-0 z-10 opacity-30 dark:opacity-20 mix-blend-multiply dark:mix-blend-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary-100 via-transparent to-transparent dark:from-primary-900"></div>
      
      {/* Animated Blobs (Premium SaaS Style) */}
      <div className="absolute z-20 top-[-15%] left-[-10%] w-[40rem] h-[40rem] bg-primary-400/20 dark:bg-primary-500/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-80 animate-blob"></div>
      <div className="absolute z-20 top-[10%] right-[-10%] w-[35rem] h-[35rem] bg-teal-300/30 dark:bg-teal-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-80 animate-blob animation-delay-2000"></div>
      <div className="absolute z-20 bottom-[-20%] left-[20%] w-[45rem] h-[45rem] bg-cyan-300/20 dark:bg-cyan-800/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-80 animate-blob-slow animation-delay-4000"></div>
      <div className="absolute z-20 bottom-[10%] right-[20%] w-[30rem] h-[30rem] bg-emerald-300/20 dark:bg-emerald-700/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[90px] opacity-60 animate-blob animation-delay-2000"></div>
    </div>
  );
};

export default AnimatedBackground;
