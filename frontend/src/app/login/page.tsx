"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '../../store/authStore';
import api from '../../lib/api';
import { Lock, Mail, ArrowRight, Loader } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

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

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <Link href="/" className="absolute top-8 left-8 text-gray-400 hover:text-white transition-colors">
        ← Back to Grid
      </Link>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-10 md:p-14 rounded-3xl w-full max-w-md relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
        <h2 className="text-3xl font-bold mb-2 neon-text text-center text-white">System Login</h2>
        <p className="text-gray-400 text-center mb-8 text-sm">Authenticate to initialize learning sequence</p>
        
        {error && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-center text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium ml-1">Identity (Email)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono"
                placeholder="user@network.com"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm text-gray-400 font-medium ml-1">Passkey</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white focus:outline-none focus:border-white/50 focus:ring-1 focus:ring-white/50 transition-all font-mono"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white hover:bg-gray-200 disabled:bg-gray-800 border border-white/50 rounded-xl py-3.5 flex items-center justify-center font-semibold text-black transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] mt-4"
          >
            {loading ? <Loader className="animate-spin" size={20} /> : (
              <span className="flex items-center gap-2">Authorize <ArrowRight size={18} /></span>
            )}
          </button>
        </form>
        
        <p className="text-center text-gray-400 text-sm mt-8 relative z-10">
          Unregistered node? <Link href="/register" className="text-white hover:text-gray-300 transition-colors">Initialize account</Link>
        </p>
      </motion.div>
    </div>
  );
}
