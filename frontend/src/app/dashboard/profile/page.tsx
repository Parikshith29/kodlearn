"use client";
import { useAuthStore } from '../../../store/authStore';
import { User, Mail, BookOpen, Clock, Trophy, CheckCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import api from '../../../lib/api';

export default function Profile() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ lessonsCompleted: 0, coursesStarted: 0, hoursWatched: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/progress/stats').then(res => {
      setStats(res.data);
    }).catch(() => {
      // Silently fail, keep defaults at 0
    }).finally(() => setLoading(false));
  }, []);

  const joinDate = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="max-w-6xl mx-auto w-full px-8 py-12 relative z-10 text-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-5xl font-black mb-2 tracking-tighter">My Profile</h1>
        <p className="text-gray-400 text-lg">Your account details and learning progress.</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Profile Box */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-2 glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Banner */}
          <div className="h-36 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=1000&q=80')] bg-cover bg-center opacity-20" />
          </div>

          <div className="px-10 pb-10 relative">
            {/* Avatar */}
            <div className="w-24 h-24 bg-white/5 border-4 border-black rounded-full flex items-center justify-center -mt-12 mb-6 shadow-2xl ring-2 ring-white/10">
              <User size={36} className="text-white/50" />
            </div>
            
            <h2 className="text-3xl font-black tracking-tight">{user?.name || 'User'}</h2>
            <p className="text-gray-500 text-sm mt-1 mb-8">{user?.email}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="glass p-5 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="p-2.5 bg-white/5 rounded-xl"><Mail size={18} className="text-gray-400" /></div>
                <div className="overflow-hidden">
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-0.5">Email Address</p>
                  <p className="font-semibold text-sm truncate">{user?.email || 'N/A'}</p>
                </div>
              </div>
              <div className="glass p-5 rounded-2xl flex items-center gap-4 border border-white/5">
                <div className="p-2.5 bg-white/5 rounded-xl"><Calendar size={18} className="text-gray-400" /></div>
                <div>
                  <p className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-0.5">Member Since</p>
                  <p className="font-semibold text-sm">{joinDate}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Column */}
        <div className="space-y-6 flex flex-col">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}
            className="glass p-7 rounded-3xl border border-white/8 flex-1 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700" />
            <BookOpen size={28} className="text-blue-400 mb-4 relative z-10" />
            <h3 className="text-5xl font-black mb-1 relative z-10">{loading ? '—' : stats.lessonsCompleted}</h3>
            <p className="text-gray-500 font-semibold text-sm relative z-10">Lessons Completed</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
            className="glass p-7 rounded-3xl border border-white/8 flex-1 flex flex-col justify-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700" />
            <Clock size={28} className="text-purple-400 mb-4 relative z-10" />
            <h3 className="text-5xl font-black mb-1 relative z-10">{loading ? '—' : stats.hoursWatched}</h3>
            <p className="text-gray-500 font-semibold text-sm relative z-10">Hours Watched</p>
          </motion.div>

        </div>

      </div>
    </div>
  );
}
