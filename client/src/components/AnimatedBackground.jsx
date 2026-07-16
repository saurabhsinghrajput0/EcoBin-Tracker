import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Recycle, Map, Navigation } from 'lucide-react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transition-colors duration-700 bg-light-bg dark:bg-dark-bg">
      {/* City/Eco Image Base */}
      <div className="absolute inset-0 z-0 opacity-[0.08] dark:opacity-[0.03] transition-opacity duration-1000">
        <img 
          src="https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=2070&auto=format&fit=crop" 
          alt="Smart Eco City" 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Grid Overlay for technical/SaaS feel */}
      <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]"></div>

      {/* World Map Pattern */}
      <div className="absolute inset-0 z-0 opacity-10 dark:opacity-[0.05] flex items-center justify-center">
         {/* A stylized SVG World Map or Abstract Tech Map could go here, using an image for now */}
         <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" alt="Map" className="w-[120%] h-auto max-w-none opacity-20 filter invert dark:invert-0" />
      </div>
      
      {/* GPS Route Lines Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 dark:opacity-10 mix-blend-overlay">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 800 Q 400 400 800 600 T 1500 200" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" className="text-primary-500 animate-pulse-slow" />
          <path d="M0 300 Q 500 100 900 500 T 1800 700" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="10,10" className="text-blue-500 animate-pulse-slow animation-delay-2000" />
        </svg>
      </div>

      {/* Mesh Gradient Base */}
      <div className="absolute inset-0 z-10 opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary-100/50 via-transparent to-transparent dark:from-primary-900/40"></div>
      
      {/* Animated Glowing Orbs (Premium SaaS Style) */}
      <div className="absolute z-20 top-[-10%] left-[-5%] w-[45rem] h-[45rem] bg-primary-400/30 dark:bg-primary-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-80 animate-blob"></div>
      <div className="absolute z-20 top-[20%] right-[-10%] w-[40rem] h-[40rem] bg-blue-300/30 dark:bg-blue-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] opacity-70 animate-blob animation-delay-2000"></div>
      <div className="absolute z-20 bottom-[-20%] left-[20%] w-[50rem] h-[50rem] bg-emerald-300/20 dark:bg-emerald-800/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[130px] opacity-60 animate-blob-slow animation-delay-4000"></div>
      
      {/* Floating Particles and Leaves */}
      <div className="absolute inset-0 z-20">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`leaf-${i}`}
            className="absolute text-primary-500/20 dark:text-primary-400/10"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: window.innerHeight + 100,
              rotate: 0 
            }}
            animate={{ 
              y: -100,
              rotate: 360,
              x: `calc(${Math.random() * 100}vw - 50px)`
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            {i % 2 === 0 ? <Leaf size={Math.random() * 20 + 10} /> : <Recycle size={Math.random() * 20 + 10} />}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
