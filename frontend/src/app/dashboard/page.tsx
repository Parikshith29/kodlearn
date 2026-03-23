"use client";
import { useAuthStore } from '../../store/authStore';
import { BookOpen, MonitorPlay, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardHome() {
  const { user } = useAuthStore();
  
  return (
    <div className="max-w-7xl mx-auto w-full px-8 py-12 mb-20 relative z-10 text-white">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-2 tracking-tight">Main Console</h1>
      <p className="text-gray-400 mb-10 text-lg">Welcome back, Agent {user?.name || user?.email?.split('@')[0]}. Network connected.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass p-8 rounded-2xl flex flex-col justify-center items-center text-center">
          <BookOpen size={40} className="text-blue-400 mb-4" />
          <h3 className="text-3xl font-bold">3</h3>
          <p className="text-gray-400 font-medium mt-1">Active Modules</p>
        </div>
        <div className="glass p-8 rounded-2xl flex flex-col justify-center items-center text-center">
          <MonitorPlay size={40} className="text-purple-400 mb-4" />
          <h3 className="text-3xl font-bold">12</h3>
          <p className="text-gray-400 font-medium mt-1">Lessons Completed</p>
        </div>
        <div className="glass p-8 rounded-2xl flex flex-col justify-center items-center text-center">
          <Award size={40} className="text-green-400 mb-4" />
          <h3 className="text-3xl font-bold">2</h3>
          <p className="text-gray-400 font-medium mt-1">Certifications</p>
        </div>
      </div>

      <div className="glass p-10 rounded-3xl border border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none" />
        <h2 className="text-2xl font-bold mb-4 relative z-10">Continue Sequence</h2>
        <p className="text-gray-400 mb-8 relative z-10 max-w-xl">You were in the middle of <span className="text-white font-semibold">Advanced React & Next.js Engineering</span>. Initialize the link to resume your curriculum.</p>
        <Link href="/dashboard/my-courses" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors shadow-lg relative z-10">
          Resume Course <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  );
}
