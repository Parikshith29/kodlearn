"use client";
import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function BrowseCourses() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    api.get('/subjects').then(res => setSubjects(res.data)).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full px-8 py-12 mb-20 relative z-10 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Browse Courses</h1>
      <p className="text-gray-400 mb-10 text-lg">Discover the highest quality curriculum specifically tailored for your goals.</p>
      
      {Object.entries(
        subjects.reduce((acc: any, sub: any) => {
          const cat = sub.category || 'Technology';
          if (!acc[cat]) acc[cat] = [];
          acc[cat].push(sub);
          return acc;
        }, {})
      ).map(([category, groupSubs]: any) => (
        <div key={category} className="mb-16">
          <h2 className="text-2xl font-bold mb-8 border-b border-white/10 pb-3 block">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
            {groupSubs.map((sub: any, i: number) => (
              <motion.div 
                key={sub.id}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.3 }}
                className="glass group hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.15)] transition-all duration-300 overflow-hidden flex flex-col h-[400px]"
              >
                <div className="h-48 bg-black/60 relative overflow-hidden shrink-0">
                  {sub.thumbnail_url ? (
                    <img src={sub.thumbnail_url} alt={sub.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900" />
                  )}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors duration-500" />
                  
                  <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-xl px-3 py-1 rounded-full text-xs font-semibold text-white border border-white/20">
                    {sub.category || 'Technology'}
                  </div>
                  <div className="absolute top-4 right-4 bg-green-500/90 shadow-lg px-3 py-1 rounded-full text-xs font-extrabold text-white">
                    FREE
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-snug">{sub.title}</h2>
                    <p className="text-gray-400 text-sm line-clamp-2">{sub.description}</p>
                  </div>
                  <Link href={`/subjects/${sub.id}`} className="mt-6 flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white hover:bg-gray-200 text-black font-semibold transition-all shadow-lg">
                    <Play size={16} className="fill-black" /> Begin Course
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
        {subjects.length === 0 && (
          <div className="col-span-full py-24 text-center text-gray-400 glass-panel border-dashed border-white/20">
            No active modules linked to this sector.
          </div>
        )}
    </div>
  );
}
