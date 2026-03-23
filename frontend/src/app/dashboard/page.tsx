"use client";
import { useAuthStore } from '../../store/authStore';
import { BookOpen, Clock, Play, ArrowRight, Compass } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import api from '../../lib/api';

export default function DashboardHome() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ lessonsCompleted: 0, hoursWatched: 0 });
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/progress/stats').catch(() => ({ data: { lessonsCompleted: 0, hoursWatched: 0 }})),
      api.get('/subjects').catch(() => ({ data: [] }))
    ]).then(([statsRes, subjectsRes]) => {
      setStats(statsRes.data);
      setRecentCourses(subjectsRes.data.slice(0, 2)); // Show 2 recent standard courses
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 pb-20 text-white min-h-[calc(100vh-80px)]">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 tracking-tighter">
          Welcome back, {user?.name?.split(' ')[0] || 'Learner'}.
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl">
          Pick up where you left off or discover new skills in the library.
        </p>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass p-8 rounded-[2rem] relative overflow-hidden group border border-white/5"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Lessons Completed</p>
              <h3 className="text-5xl font-black tracking-tighter">{loading ? '—' : stats.lessonsCompleted}</h3>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
              <BookOpen size={28} className="text-blue-400" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass p-8 rounded-[2rem] relative overflow-hidden group border border-white/5"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Hours Watched</p>
              <h3 className="text-5xl font-black tracking-tighter">{loading ? '—' : stats.hoursWatched}</h3>
            </div>
            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center border border-white/5 shadow-inner">
              <Clock size={28} className="text-purple-400" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Jump Back In */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Jump Back In</h2>
            <Link href="/dashboard/my-courses" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">
              View All Active
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {!loading && recentCourses.map((course, i) => (
              <motion.div 
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className="glass rounded-3xl overflow-hidden group border border-white/5 hover:border-white/15 transition-all duration-300"
              >
                <div className="h-40 relative overflow-hidden bg-black/40">
                  <div className={`absolute inset-0 bg-gradient-to-br ${course.category === 'Frontend' ? 'from-blue-900/80 to-blue-950/80' : course.category === 'Backend' ? 'from-emerald-900/80 to-emerald-950/80' : course.category === 'Data' ? 'from-purple-900/80 to-purple-950/80' : course.category === 'DevOps' ? 'from-orange-900/80 to-orange-950/80' : 'from-gray-800/80 to-gray-900/80'} flex items-center justify-center`}>
                    {course.thumbnail_url ? (
                      <img src={course.thumbnail_url} alt={course.title} className={`w-full h-full object-contain p-8 opacity-90 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 ${course.thumbnail_url.includes('nextjs') ? 'invert brightness-200' : ''}`} />
                    ) : (
                      <BookOpen size={40} className="text-white/20" />
                    )}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-lg mb-1 truncate">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-6 truncate">{course.description}</p>
                  <Link href={`/subjects/${course.id}`} className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white hover:bg-gray-200 text-black font-semibold transition-all shadow-lg text-sm">
                    <Play size={14} className="fill-black" /> Resume sequence
                  </Link>
                </div>
              </motion.div>
            ))}
            {loading && Array.from({ length: 2 }).map((_, i) => (
               <div key={i} className="glass rounded-3xl h-72 animate-pulse bg-white/5" />
            ))}
          </div>
        </div>

        {/* Explore Card */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Explore</h2>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-3xl p-8 border border-white/5 flex flex-col h-[calc(100%-3.5rem)]"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.1)]">
              <Compass size={28} className="text-green-400" />
            </div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Access Library</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
              Browse our catalog of premium programming courses. Discover new topics, from foundational web development to advanced container architecture.
            </p>
            <Link href="/dashboard/browse" className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/20 hover:bg-white text-gray-300 hover:text-black font-semibold transition-all">
              Browse Library <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
