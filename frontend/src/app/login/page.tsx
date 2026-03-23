"use client";
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/api';
import { Lock, Mail, ArrowRight, Loader, LogOut, Code, Terminal, Zap } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, login } = useAuthStore();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  useEffect(() => {
    if (user) {
      setShowLogoutConfirm(true);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.user, res.data.accessToken);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentication failed');
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
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">You are attempting to return to the login screen. Do you want to securely log out?</p>
            <div className="flex gap-4">
              <button onClick={() => router.push('/dashboard')} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-colors">Return</button>
              <button 
                onClick={() => { 
                  // Access the logout from store directly since we didn't destructure it initially
                  useAuthStore.getState().logout(); 
                  setShowLogoutConfirm(false); 
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
    <div className="flex min-h-screen bg-[#020202] text-white">
      {/* Left side: Premium Branding Split */}
      <div className="hidden lg:flex w-1/2 relative bg-[#0a0a0a] border-r border-white/5 items-center justify-center overflow-hidden">
        {/* Ambient Lights */}
        <motion.div animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
        <motion.div animate={{ opacity: [0.2, 0.4, 0.2], scale: [1.1, 0.9, 1.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[10%] -right-[10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
        
        <div className="relative z-10 max-w-lg px-12">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] mb-10">
            <div className="w-8 h-8 bg-black rounded-lg rotate-45" />
          </div>
          <h1 className="text-6xl font-black mb-6 tracking-tighter leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            Push your logic further.
          </h1>
          <p className="text-xl text-gray-400 mb-12">
            The premium environment built to escalate your engineering capabilities through curated sequential curriculums.
          </p>

          <div className="space-y-6">
            {[
              { icon: Code, title: 'Intelligent IDE Syntax', desc: 'Directly applicable code architectures.' },
              { icon: Terminal, title: 'Serverless Integration', desc: 'Pre-configured cloud backend deployments.' },
              { icon: Zap, title: 'Instant Live Metrics', desc: 'Real-time telemetry tracking your progression.' }
            ].map((f, i) => (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + (i*0.1) }} key={i} className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <f.icon size={20} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="font-bold text-white tracking-tight">{f.title}</h3>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 relative z-10 w-full lg:w-1/2">
        <Link href="/" className="absolute top-8 right-8 text-gray-500 hover:text-white transition-colors text-sm font-medium">
          Grid Access &rarr;
        </Link>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold mb-2 text-white tracking-tight">System Login</h2>
            <p className="text-gray-400 text-sm">Authenticate back into your secure learning instance</p>
          </div>
          
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-center text-sm font-bold flex items-center justify-center gap-2">
              <LogOut size={16} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-widest ml-1">Identity (Email)</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 focus:bg-white/10 transition-all font-mono shadow-inner"
                  placeholder="user@network.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs text-gray-500 font-bold uppercase tracking-widest ml-1">Passkey</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-500 group-focus-within:text-blue-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-white focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 focus:bg-white/10 transition-all font-mono shadow-inner"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-white hover:bg-gray-200 disabled:bg-white/20 disabled:text-gray-500 border border-white/50 rounded-xl py-3.5 flex items-center justify-center font-bold text-black transition-all shadow-[0_0_25px_rgba(255,255,255,0.15)] mt-6 group"
            >
              {loading ? <Loader className="animate-spin" size={20} /> : (
                <span className="flex items-center gap-2">Authorize Connection <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" /></span>
              )}
            </button>
          </form>
          
          <p className="text-center lg:text-left text-gray-500 text-sm mt-10 font-medium">
            Unregistered node? <Link href="/register" className="text-white hover:text-blue-400 hover:underline transition-colors underline-offset-4">Initialize account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
