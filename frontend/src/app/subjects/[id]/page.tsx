"use client";
import { useEffect, useState } from 'react';
import api from '../../../lib/api';
import Navbar from '../../../components/Navbar';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PlayCircle, ChevronLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function SubjectPage() {
  const { id } = useParams();
  const [subject, setSubject] = useState<any>(null);

  useEffect(() => {
    api.get(`/subjects/${id}/tree`).then(res => setSubject(res.data)).catch(console.error);
  }, [id]);

  if (!subject) return <div className="min-h-screen text-white flex items-center justify-center font-mono animate-pulse">Establishing Connection...</div>;

  return (
    <div className="max-w-5xl mx-auto w-full px-4 mb-20 relative z-10">
      <Navbar />
      
      <div className="mb-12">
        <Link href="/dashboard/my-courses" className="text-blue-400 hover:text-blue-300 flex items-center gap-2 mb-6 transition-colors w-max font-medium">
          <ChevronLeft size={18} /> Disconnect from Module
        </Link>
        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 tracking-tight neon-text">{subject.title}</h1>
        <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">{subject.description}</p>
      </div>

      <div className="space-y-8">
        {subject.sections?.map((section: any, sIdx: number) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: sIdx * 0.1, duration: 0.5 }}
            className="glass-panel p-8 border-l-4 border-l-blue-500 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
            <h3 className="text-2xl font-bold text-white mb-6 relative z-10 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 text-sm border border-blue-500/30">
                {sIdx + 1}
              </span>
              {section.title}
            </h3>
            
            <div className="space-y-3 relative z-10">
              {section.videos?.map((vid: any, vIdx: number) => (
                <Link 
                  href={`/learn/${subject.id}/${vid.id}`} 
                  key={vid.id}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 hover:neon-border border border-white/5 transition-all group/vid cursor-pointer text-gray-300 hover:text-white"
                >
                  <div className="text-blue-500 group-hover/vid:text-blue-400 transition-colors">
                    <PlayCircle size={24} />
                  </div>
                  <div className="flex-1 font-medium text-lg">
                    {vid.title}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
