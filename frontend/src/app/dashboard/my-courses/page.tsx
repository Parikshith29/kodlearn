"use client";
import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function MyCourses() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    // Simulated enrolled instances for UX flow
    api.get('/subjects').then(res => setSubjects(res.data.slice(0, 3))).catch(console.error);
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
            <div className="h-48 bg-black/60 relative overflow-hidden shrink-0">
              {sub.thumbnail_url && (
                <img src={sub.thumbnail_url} alt={sub.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 scale-100 group-hover:scale-105" />
              )}
            </div>
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <h2 className="text-xl font-bold text-white mb-2 line-clamp-2 leading-snug">{sub.title}</h2>
                <div className="w-full bg-white/5 h-2 rounded-full mt-4 overflow-hidden border border-white/5">
                    <div className="h-full bg-white shadow-[0_0_10px_white]" style={{ width: `${(i+1)*25}%` }} />
                </div>
                <p className="text-gray-400 text-xs mt-3 font-mono">{(i+1)*25}% MODULE UNLOCKED</p>
              </div>
              <Link href={`/subjects/${sub.id}`} className="mt-4 flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/20 hover:bg-white text-gray-300 hover:text-black font-semibold transition-all group/btn">
                <Play size={16} className="group-hover/btn:fill-black" /> Resume Module
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
