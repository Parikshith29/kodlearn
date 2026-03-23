"use client";
import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, BookOpen } from 'lucide-react';

// Topic-based gradient fallback colors so every course always looks intentional
const categoryGradients: Record<string, string> = {
  Frontend:        'from-blue-900/80 to-blue-950/80',
  Backend:         'from-emerald-900/80 to-emerald-950/80',
  Data:            'from-purple-900/80 to-purple-950/80',
  DevOps:          'from-orange-900/80 to-orange-950/80',
  'Computer Science': 'from-red-900/80 to-red-950/80',
  'Full Stack':    'from-teal-900/80 to-teal-950/80',
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
          className={`w-full h-full object-contain p-10 opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 drop-shadow-2xl ${needsInvert ? 'invert brightness-200' : ''}`} 
        />
      )}
    </div>
  );
}

export default function BrowseCourses() {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/subjects').then(res => setSubjects(res.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const grouped = subjects.reduce((acc: any, sub: any) => {
    const cat = sub.category || 'Technology';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(sub);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10 text-white">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="glass rounded-2xl h-80 animate-pulse bg-white/5" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 pb-20 relative z-10 text-white">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter mb-3">Browse Courses</h1>
        <p className="text-gray-400 text-base sm:text-lg">High-quality programming courses, completely free.</p>
      </div>

      {Object.entries(grouped).map(([category, groupSubs]: any) => (
        <div key={category} className="mb-14">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 pb-3 border-b border-white/10 flex items-center gap-3">
            <span className="w-1 h-6 rounded-full bg-white/50 inline-block" />
            {category}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {groupSubs.map((sub: any, i: number) => (
              <motion.div
                key={sub.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (i % 6) * 0.06 }}
                className="glass group rounded-2xl overflow-hidden flex flex-col hover:shadow-[0_8px_32px_rgba(255,255,255,0.08)] transition-all duration-300 border border-white/5 hover:border-white/15"
              >
                {/* Thumbnail */}
                <div className="h-44 relative overflow-hidden shrink-0 bg-black/40">
                  <CourseImage src={sub.thumbnail_url} alt={sub.title} category={sub.category || 'Technology'} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
                  <div className="absolute top-3 left-3 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold border border-white/10">
                    {sub.category || 'Technology'}
                  </div>
                  <div className="absolute top-3 right-3 bg-green-500 px-2.5 py-1 rounded-full text-xs font-black text-white shadow">
                    FREE
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base sm:text-lg leading-snug mb-1.5 line-clamp-2">{sub.title}</h3>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{sub.description}</p>
                  </div>
                  <Link
                    href={`/subjects/${sub.id}`}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white hover:bg-gray-100 text-black text-sm font-bold transition-all"
                  >
                    <Play size={14} className="fill-black" /> Begin Course
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {subjects.length === 0 && (
        <div className="text-center py-24 text-gray-500 text-lg">
          No courses found. Check back later.
        </div>
      )}
    </div>
  );
}
