"use client";
import { useAuthStore } from '../../../store/authStore';
import { User, Mail, Shield, Clock, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Profile() {
  const { user } = useAuthStore();

  return (
    <div className="max-w-6xl mx-auto w-full px-8 py-12 relative z-10 text-white">
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">Identity Sequence</h1>
          <p className="text-gray-400 text-lg">Manage your secure node profile and learning statistics.</p>
        </div>
        <div className="px-5 py-2.5 bg-green-500/10 border border-green-500/30 rounded-full flex items-center gap-3">
          <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_#4ade80]" />
          <span className="text-green-400 font-bold tracking-widest text-sm uppercase">Active Node</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Identity Box */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 glass rounded-3xl overflow-hidden relative border border-white/10 shadow-2xl p-0">
          <div className="h-40 bg-gradient-to-r from-blue-600/30 to-purple-600/30 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay" />
          </div>
          <div className="px-10 pb-10 relative">
            <div className="w-28 h-28 bg-black border-4 border-[#0a0a0a] rounded-full flex items-center justify-center -mt-14 mb-6 shadow-2xl relative z-10 overflow-hidden">
              <User size={48} className="text-white/50" />
              <div className="absolute inset-0 bg-white/5" />
            </div>
            
            <h2 className="text-3xl font-extrabold">{user?.name || 'Unidentified'}</h2>
            <p className="text-gray-400 font-mono text-sm mt-1">{user?.email || 'N/A'}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className="glass-panel p-5 flex items-center gap-5">
                <div className="p-3 bg-white/10 rounded-xl"><Shield size={24} className="text-blue-400" /></div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Global Network ID</p>
                  <p className="font-mono font-semibold">USR-{user?.id || '0000'}</p>
                </div>
              </div>
              <div className="glass-panel p-5 flex items-center gap-5">
                <div className="p-3 bg-white/10 rounded-xl"><Mail size={24} className="text-purple-400" /></div>
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Authenticated Relay</p>
                  <p className="font-mono font-semibold truncate max-w-[150px]">{user?.email || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Column */}
        <div className="space-y-8 flex flex-col">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="glass p-8 rounded-3xl border border-white/10 flex-1 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-700" />
            <Trophy size={36} className="text-yellow-400 mb-4 relative z-10" />
            <h3 className="text-5xl font-extrabold mb-2 relative z-10">0</h3>
            <p className="text-gray-400 font-semibold relative z-10">Unlocked Certifications</p>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass p-8 rounded-3xl border border-white/10 flex-1 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
            <Clock size={36} className="text-blue-400 mb-4 relative z-10" />
            <h3 className="text-5xl font-extrabold mb-2 relative z-10">42</h3>
            <p className="text-gray-400 font-semibold relative z-10">Hours Documented</p>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
