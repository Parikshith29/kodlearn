"use client";
import { useEffect, useState, useRef } from 'react';
import api from '../../../lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, BookOpen, Search, Filter } from 'lucide-react';

const categoryGradients: Record<string, string> = {
  Frontend:            'from-blue-900/80 to-blue-950/80',
  Backend:             'from-emerald-900/80 to-emerald-950/80',
  Data:                'from-purple-900/80 to-purple-950/80',
  DevOps:              'from-orange-900/80 to-orange-950/80',
  'Computer Science':  'from-red-900/80 to-red-950/80',
  'Full Stack':        'from-teal-900/80 to-teal-950/80',
};

const categoryAccent: Record<string, string> = {
  Frontend:            'rgba(59,130,246,0.25)',
  Backend:             'rgba(52,211,153,0.25)',
  Data:                'rgba(139,92,246,0.25)',
  DevOps:              'rgba(249,115,22,0.25)',
  'Computer Science':  'rgba(239,68,68,0.25)',
  'Full Stack':        'rgba(20,184,166,0.25)',
};

function CourseImage({ src, alt, category }: { src?: string; alt: string; category: string }) {
  const [failed, setFailed] = useState(false);
  const gradient = categoryGradients[category] || 'from-gray-800/80 to-gray-900/80';
  const needsInvert = src?.includes('nextjs');

  return (
    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      {(!src || failed) ? (
        <BookOpen size={40} className="text-white/20" />
      ) : (
        <img
          src={src}
          alt={alt}
          onError={() => setFailed(true)}
          className={`w-full h-full object-contain p-10 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 drop-shadow-2xl ${needsInvert ? 'invert brightness-200' : ''}`}
        />
      )}
    </div>
  );
}

function CourseCard({ sub, index }: { sub: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const accentColor = categoryAccent[sub.category] || 'rgba(255,255,255,0.05)';

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mouse-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty('--mouse-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index % 6) * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="glass-card shimmer-card group rounded-2xl overflow-hidden flex flex-col border border-white/5 hover:border-white/15 cursor-pointer"
      style={{ '--hover-glow': accentColor } as React.CSSProperties}
    >
      <div className="card-accent-line" />

      {/* Thumbnail */}
      <div className="h-48 relative overflow-hidden shrink-0 bg-black/40">
        <CourseImage src={sub.thumbnail_url} alt={sub.title} category={sub.category || 'Technology'} />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-400" />
        <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold border border-white/10 group-hover:border-white/20 transition-colors">
          {sub.category || 'Technology'}
        </div>
        <div className="absolute top-3 right-3 bg-emerald-500 px-2.5 py-1 rounded-full text-xs font-black text-white shadow-lg shadow-emerald-500/30">
          FREE
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div>
          <h3 className="font-bold text-base sm:text-lg leading-snug mb-1.5 line-clamp-2 group-hover:text-white transition-colors">
            {sub.title}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed group-hover:text-gray-400 transition-colors">
            {sub.description}
          </p>
        </div>
        <Link
          href={`/subjects/${sub.id}`}
          className="ripple-effect flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-gray-100 text-black text-sm font-bold transition-all hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] hover:scale-[1.03] active:scale-[0.98]"
          onClick={(e) => e.stopPropagation()}
        >
          <Play size={13} className="fill-black" /> Begin Course
        </Link>
      </div>
    </motion.div>
  );
}

export default function BrowseCourses() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/subjects').then(res => setSubjects(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const filtered = subjects.filter(s =>
    !search || s.title?.toLowerCase().includes(search.toLowerCase()) || s.category?.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce((acc: any, sub: any) => {
    const cat = sub.category || 'Technology';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(sub);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 text-white">
        <div className="h-10 skeleton rounded-2xl w-60 mb-3" />
        <div className="h-5 skeleton rounded-xl w-80 mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="skeleton rounded-2xl h-80" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 pb-20 relative z-10 text-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-3">Browse Courses</h1>
        <p className="text-gray-400 text-base sm:text-lg mb-6">High-quality programming courses, completely free.</p>

        {/* Search */}
        <div className="relative max-w-md group">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses or categories..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-10 pr-4 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/30 focus:bg-white/8 transition-all"
          />
        </div>
      </motion.div>

      {Object.entries(grouped).map(([category, groupSubs]: any, catIdx) => (
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: catIdx * 0.06 }}
          className="mb-14"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6 pb-3 border-b border-white/8 flex items-center gap-3">
            <motion.span
              className="w-1 h-6 rounded-full inline-block"
              style={{ background: Object.values(categoryAccent)[catIdx % 6]?.replace('0.25', '0.8') || 'rgba(255,255,255,0.5)' }}
              animate={{ scaleY: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: catIdx * 0.3 }}
            />
            {category}
            <span className="text-sm text-gray-600 font-normal">({groupSubs.length})</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {groupSubs.map((sub: any, i: number) => (
              <CourseCard key={sub.id} sub={sub} index={i} />
            ))}
          </div>
        </motion.div>
      ))}

      {filtered.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-24 text-gray-500"
        >
          <Search size={40} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">No courses found{search ? ` for "${search}"` : ''}.</p>
        </motion.div>
      )}
    </div>
  );
}
