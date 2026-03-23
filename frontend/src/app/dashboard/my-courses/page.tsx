"use client";
import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function MyCourses() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    api.get('/subjects/enrolled').then(res => setSubjects(res.data)).catch(console.error);
  }, []);

  return (
    <div className="max-w-7xl mx-auto w-full px-8 py-12 mb-20 relative z-10 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">My Courses</h1>
      <p className="text-gray-400 mb-10 text-lg">Pick up right where you left off on your active learning sequences.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {subjects.map((sub: any, i) => (
          <motion.div 
            key={sub.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.3 }}
            className="glass group hover:shadow-[0_8px_32px_0_rgba(255,255,255,0.15)] transition-all duration-300 overflow-hidden flex flex-col h-[400px]"
          >
            <div className="h-48 relative overflow-hidden shrink-0 bg-black/40">
              <div className={`absolute inset-0 bg-gradient-to-br ${sub.category === 'Frontend' ? 'from-blue-900/80 to-blue-950/80' : sub.category === 'Backend' ? 'from-emerald-900/80 to-emerald-950/80' : sub.category === 'Data' ? 'from-purple-900/80 to-purple-950/80' : sub.category === 'DevOps' ? 'from-orange-900/80 to-orange-950/80' : 'from-gray-800/80 to-gray-900/80'} flex items-center justify-center`}>
                {sub.thumbnail_url && (
                  <img src={sub.thumbnail_url} alt={sub.title} className={`w-full h-full object-contain p-10 opacity-90 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500 ${sub.thumbnail_url.includes('nextjs') ? 'invert brightness-200' : ''}`} />
                )}
              </div>
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-snug">{sub.title}</h2>
                {(() => {
                  const pct = sub.total_videos > 0 ? Math.round((sub.completed_videos / sub.total_videos) * 100) : 0;
                  const isDone = pct >= 100;
                  return (
                    <>
                      <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden border border-white/5 relative">
                          <div className={`h-full ${isDone ? 'bg-green-400 shadow-[0_0_10px_rgba(74,222,128,0.8)]' : 'bg-white shadow-[0_0_10px_white]'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <p className={`text-xs mt-3 font-mono ${isDone ? 'text-green-400' : 'text-gray-400'}`}>
                        {isDone ? '100% SEQUENCE COMPLETED' : `${pct}% SEQUENCE UNLOCKED`}
                      </p>
                    </>
                  );
                })()}
              </div>
              <Link href={`/subjects/${sub.id}`} className={`mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/20 hover:bg-white text-gray-300 hover:text-black font-semibold transition-all group/btn ${sub.completed_videos >= sub.total_videos ? 'bg-green-500/10 border-green-500/30' : ''}`}>
                <Play size={16} className="group-hover/btn:fill-black" /> {sub.completed_videos >= sub.total_videos ? 'Review Sequence' : 'Resume Sequence'}
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
