"use client";
import { useAuthStore } from '../../store/authStore';
import { BookOpen, Clock, Play, ArrowRight, Compass, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import api from '../../lib/api';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function DashboardHome() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ lessonsCompleted: 0, hoursWatched: 0 });
  const [recentCourses, setRecentCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get('/progress/stats').catch(() => ({ data: { lessonsCompleted: 0, hoursWatched: 0 } })),
      api.get('/subjects').catch(() => ({ data: [] })),
    ]).then(([statsRes, subjectsRes]) => {
      setStats(statsRes.data);
      setRecentCourses(subjectsRes.data.slice(0, 2));
      setLoading(false);
    });
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 pb-20 text-white min-h-[calc(100vh-80px)]">

      {/* ── Greeting ── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            animate={{ rotate: [0, 15, -10, 15, 0] }}
            transition={{ duration: 1.2, delay: 0.8 }}
          >
            <Sparkles size={18} className="text-yellow-400" />
          </motion.div>
          <span className="text-xs font-bold uppercase tracking-widest text-gray-500">
            Welcome back
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-3 tracking-tighter">
          {user?.name?.split(' ')[0] || 'Learner'}.
        </h1>
        <p className="text-gray-400 text-base sm:text-lg max-w-2xl">
          Pick up where you left off or discover new skills in the library.
        </p>
      </motion.div>

      {/* ── Stats ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16"
      >
        {/* Lessons stat */}
        <motion.div
          variants={item}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="glass shimmer-card p-8 rounded-[2rem] relative overflow-hidden group border border-white/5 hover:border-white/15 cursor-default"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-blue-500/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="card-accent-line" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Lessons Completed</p>
              <motion.h3
                key={stats.lessonsCompleted}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-black tracking-tighter"
              >
                {loading ? '—' : stats.lessonsCompleted}
              </motion.h3>
            </div>
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 350 }}
              className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/40 transition-colors"
            >
              <BookOpen size={26} className="text-blue-400" />
            </motion.div>
          </div>
        </motion.div>

        {/* Hours stat */}
        <motion.div
          variants={item}
          whileHover={{ y: -6, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          className="glass shimmer-card p-8 rounded-[2rem] relative overflow-hidden group border border-white/5 hover:border-white/15 cursor-default"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="card-accent-line" />
          <div className="flex items-center justify-between relative z-10">
            <div>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-2">Hours Watched</p>
              <motion.h3
                key={stats.hoursWatched}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl font-black tracking-tighter"
              >
                {loading ? '—' : stats.hoursWatched}
              </motion.h3>
            </div>
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 350 }}
              className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 group-hover:border-purple-500/40 transition-colors"
            >
              <Clock size={26} className="text-purple-400" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Main ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Jump Back In */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight">Jump Back In</h2>
            <Link
              href="/dashboard/my-courses"
              className="nav-link group text-sm font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-1.5"
            >
              View All
              <motion.span animate={{ x: [0,3,0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight size={14} />
              </motion.span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {!loading && recentCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8 }}
                className="glass shimmer-card rounded-3xl overflow-hidden group border border-white/5 hover:border-white/15 transition-all duration-400 flex flex-col"
              >
                <div className="card-accent-line" />
                <div className="h-44 relative overflow-hidden bg-black/40">
                  <div className={`absolute inset-0 bg-gradient-to-br ${
                    course.category === 'Frontend' ? 'from-blue-900/80 to-blue-950/80' :
                    course.category === 'Backend'  ? 'from-emerald-900/80 to-emerald-950/80' :
                    course.category === 'Data'     ? 'from-purple-900/80 to-purple-950/80' :
                    course.category === 'DevOps'   ? 'from-orange-900/80 to-orange-950/80' :
                                                    'from-gray-800/80 to-gray-900/80'
                  } flex items-center justify-center`}>
                    {course.thumbnail_url ? (
                      <motion.img
                        src={course.thumbnail_url}
                        alt={course.title}
                        whileHover={{ scale: 1.12 }}
                        transition={{ duration: 0.4 }}
                        className={`w-full h-full object-contain p-8 opacity-90 drop-shadow-2xl ${course.thumbnail_url.includes('nextjs') ? 'invert brightness-200' : ''}`}
                        onError={(e) => (e.currentTarget.style.display = 'none')}
                      />
                    ) : (
                      <BookOpen size={40} className="text-white/20" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-400" />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-lg mb-1 truncate group-hover:text-white transition-colors">{course.title}</h3>
                  <p className="text-sm text-gray-500 mb-6 truncate flex-1">{course.description}</p>
                  <Link
                    href={`/subjects/${course.id}`}
                    className="ripple-effect flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white hover:bg-gray-100 text-black font-semibold transition-all shadow-lg text-sm hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <Play size={14} className="fill-black" /> Resume sequence
                  </Link>
                </div>
              </motion.div>
            ))}
            {loading && Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="glass rounded-3xl h-72 skeleton" />
            ))}
          </div>
        </div>

        {/* Explore Card */}
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Explore</h2>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="glass shimmer-card rounded-3xl p-8 border border-white/5 hover:border-white/15 flex flex-col h-[calc(100%-3.5rem)] transition-all"
          >
            <div className="card-accent-line" />
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 350 }}
              className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 flex items-center justify-center mb-6 border border-emerald-500/20 shadow-[0_0_20px_rgba(52,211,153,0.1)]"
            >
              <Compass size={28} className="text-emerald-400" />
            </motion.div>
            <h3 className="text-xl font-bold mb-3 tracking-tight">Access Library</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 flex-1">
              Browse our catalog of premium programming courses. Discover new topics, from foundational
              web development to advanced container architecture.
            </p>
            <Link
              href="/dashboard/browse"
              className="ripple-effect inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/20 hover:bg-white hover:text-black text-gray-300 font-semibold transition-all hover:shadow-[0_0_24px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98]"
            >
              Browse Library <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
