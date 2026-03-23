"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '../../lib/api';
import { useAuthStore } from '../../store/authStore';
import { Lock, Mail, UserPlus, Loader, User, Zap, Terminal, Code, LogOut } from 'lucide-react';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  
  const { user } = useAuthStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      setShowLogoutConfirm(true);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', { email, password, name });
      router.push('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (showLogoutConfirm) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
         <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 rounded-3xl max-w-sm w-full text-center border border-white/10 shadow-2xl relative z-10 m-4">
            <LogOut size={48} className="mx-auto text-red-500 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Terminate Session?</h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">You are attempting to return to the registration screen. Do you want to securely log out?</p>
            <div className="flex gap-4">
              <button onClick={() => router.push('/dashboard')} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-colors">Return</button>
              <button 
                onClick={() => { 
                  useAuthStore.getState().logout(); 
                  setShowLogoutConfirm(false); 
                  router.push('/login'); 
                }} 
                className="flex-1 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-500 font-medium transition-colors"
               >
                Log Out
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#020202] text-white overflow-hidden">
      
      {/* Left side: Register Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 relative z-10 w-full lg:w-1/2">
        <Link href="/" className="absolute top-8 left-8 text-gray-500 hover:text-white transition-colors text-sm font-medium">
          &larr; Grid Access
        </Link>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2 text-white tracking-tight">Initialize Identity</h2>
            <p className="text-gray-400 text-sm">Create a new node instance in the learning network</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center text-sm font-bold flex items-center justify-center gap-2">
              <LogOut size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2 flex-1">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-widest ml-1">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:bg-white/10 transition-all font-mono shadow-inner"
                  placeholder="Agent JD"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-widest ml-1">Construct Email</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:bg-white/10 transition-all font-mono shadow-inner"
                  placeholder="new_user@network.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-widest ml-1">Generate Passkey</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:bg-white/10 transition-all font-mono shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-widest ml-1">Confirm Passkey</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-emerald-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 focus:bg-white/10 transition-all font-mono shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white hover:bg-gray-200 disabled:bg-white/20 disabled:text-gray-500 border border-white/50 rounded-xl py-3.5 flex items-center justify-center font-bold text-black transition-all shadow-[0_0_25px_rgba(255,255,255,0.15)] mt-8 group"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : (
                <span className="flex items-center gap-2">Initialize Core <UserPlus size={18} className="group-hover:scale-110 transition-transform" /></span>
              )}
            </button>
          </form>
          
          <p className="text-center lg:text-left text-gray-500 text-sm mt-10 font-medium">
            Already a registered node? <Link href="/login" className="text-white hover:text-emerald-400 hover:underline transition-colors underline-offset-4">Access panel</Link>
          </p>
        </motion.div>
      </div>

      {/* Right side: Premium Branding Split */}
      <div className="hidden lg:flex w-1/2 relative bg-[#0a0a0a] border-l border-white/5 items-center justify-center overflow-hidden">
        {/* Ambient Lights */}
        <motion.div animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] bg-emerald-600/20 rounded-full blur-[100px]" />
        <motion.div animate={{ opacity: [0.2, 0.4, 0.2], scale: [1.1, 0.9, 1.1] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-xl px-12">
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 shadow-lg backdrop-blur-md">
            <UserPlus size={28} className="text-emerald-400" />
          </div>
          <h1 className="text-6xl font-black mb-6 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-white">
            Access the network.
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            Build your foundational knowledge with highly contextual AI-driven project sequences.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-6 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <Terminal size={24} className="text-blue-400 mb-4" />
                <h4 className="font-bold text-white mb-2 tracking-tight">Backend Scalability</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Construct high-traffic APIs using industry standard relational practices.</p>
            </div>
            <div className="glass p-6 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                <Code size={24} className="text-emerald-400 mb-4" />
                <h4 className="font-bold text-white mb-2 tracking-tight">Full-Stack Interface</h4>
                <p className="text-xs text-gray-500 leading-relaxed">Master React, Next.js, and globally recognized modern CSS tooling.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
