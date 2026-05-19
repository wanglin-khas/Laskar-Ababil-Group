import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';
import { Lock, Shield, Cpu, Activity, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const loginAdmin = useStore(state => state.loginAdmin);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsScanning(true);
    
    // Simulate a high-tech delay
    setTimeout(() => {
      if (loginAdmin(username, password)) {
        navigate('/admin');
      } else {
        setError('ACCESS DENIED: IDENTITY_MISMATCH');
        setIsScanning(false);
      }
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 overflow-hidden relative font-mono">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
        
        {/* Futuristic Grid */}
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `linear-gradient(to right, rgba(16, 185, 129, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.05) 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} 
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-md w-full relative z-10"
      >
        {/* Holographic Projection Base Effect */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-48 h-8 bg-emerald-500/20 blur-2xl rounded-[100%] z-0" />
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-32 h-4 bg-emerald-400/40 blur-xl rounded-[100%] z-0 animate-pulse" />
        
        {/* Hologram Frame */}
        <div className="relative bg-[#020617]/60 backdrop-blur-3xl rounded-2xl border border-emerald-500/30 p-8 shadow-[0_0_80px_rgba(16,185,129,0.15)] overflow-hidden group">
          {/* Light Rays Effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 via-transparent to-transparent pointer-events-none" />
          
          {/* Scanning Line Animation */}
          <AnimatePresence>
            {isScanning && (
              <motion.div 
                initial={{ top: '-100%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,1)] z-20"
              />
            )}
          </AnimatePresence>

          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-emerald-400/50 rounded-tl-xl" />
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-emerald-400/50 rounded-tr-xl" />
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-emerald-400/50 rounded-bl-xl" />
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-emerald-400/50 rounded-br-xl" />

          <div className="flex flex-col items-center mb-8 relative">
            <motion.div 
              animate={{ 
                rotateY: [0, 180, 360],
                boxShadow: ["0 0 10px rgba(16, 185, 129, 0.2)", "0 0 30px rgba(16, 185, 129, 0.4)", "0 0 10px rgba(16, 185, 129, 0.2)"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 rounded-full flex items-center justify-center mb-4 relative z-10"
            >
              <Shield className="w-10 h-10 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              {/* Outer Ring */}
              <div className="absolute inset-[-4px] border border-dashed border-emerald-500/30 rounded-full animate-spin-slow" />
            </motion.div>
            
            <h2 className="text-2xl font-black text-emerald-50 uppercase tracking-[0.2em] drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]">
              ADMIN_ACCESS
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
              <p className="text-emerald-500/70 text-[10px] font-bold uppercase tracking-widest">Secure Terminal v3.1</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 relative">
            <div className="space-y-4">
              <div className="relative group/input">
                <label className="block text-[10px] font-bold text-emerald-500/70 uppercase tracking-widest mb-1.5 ml-1">
                  IDENT_IDENTIFIER
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Cpu className="h-4 w-4 text-emerald-500/50 group-focus-within/input:text-emerald-400 transition-colors" />
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => { setUsername(e.target.value); setError(''); }}
                    className="w-full bg-black/40 border border-emerald-500/30 rounded-lg pl-10 pr-4 py-3 text-emerald-50 text-sm focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all placeholder:text-emerald-900"
                    placeholder="ENTER_USERNAME"
                    autoFocus
                    required
                  />
                </div>
              </div>

              <div className="relative group/input">
                <label className="block text-[10px] font-bold text-emerald-500/70 uppercase tracking-widest mb-1.5 ml-1">
                  ACCESS_KEY_PHRASE
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-emerald-500/50 group-focus-within/input:text-emerald-400 transition-colors" />
                  </div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    className="w-full bg-black/40 border border-emerald-500/30 rounded-lg pl-10 pr-4 py-3 text-emerald-50 text-sm focus:outline-none focus:border-emerald-400 focus:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-all placeholder:text-emerald-900"
                    placeholder="ENTER_PASSCODE"
                    required
                  />
                </div>
              </div>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-500/10 border border-red-500/30 p-2 rounded flex items-center gap-2"
                >
                  <Zap className="w-3 h-3 text-red-500" />
                  <p className="text-[10px] text-red-400 font-bold uppercase tracking-tighter line-clamp-1">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isScanning}
              type="submit"
              className="w-full relative group/btn h-12 overflow-hidden rounded-lg bg-emerald-500/10 border border-emerald-500/50 text-emerald-400 transition-all hover:bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
            >
              <div className="absolute inset-0 flex items-center justify-center font-black uppercase tracking-[0.3em] text-xs">
                {isScanning ? 'ESTABLISHING_LINK...' : 'INITIATE_AUTH'}
              </div>
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-400/20 to-transparent translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-1000" />
            </motion.button>
          </form>

          <div className="mt-8 pt-6 border-t border-emerald-400/10 text-center">
            <a 
              href="/" 
              className="text-[10px] font-bold text-emerald-500/50 hover:text-emerald-300 transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-2"
            >
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
              ABORT_TO_USER_SPACE
            </a>
          </div>
        </div>

        {/* Floating Data Bits */}
        <div className="absolute -right-20 top-0 text-[8px] text-emerald-500/20 space-y-1 pointer-events-none select-none">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.2}s` }}>
              {Math.random().toString(36).substring(7).toUpperCase()} :: STATUS_OK
            </div>
          ))}
        </div>
      </motion.div>
      
      {/* CSS for custom animations */}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}
