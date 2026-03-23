"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/authStore';
import { Home, Compass, BookOpen, User, LogOut, Search, CreditCard, ChevronRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    setIsLogoutModalOpen(true);
  };

  const executeLogout = () => {
    logout();
    router.push('/login');
  };

  const navs = [
    { name: 'Console', path: '/dashboard', icon: Home },
    { name: 'Browse Library', path: '/dashboard/browse', icon: Compass },
    { name: 'My Learning', path: '/dashboard/my-courses', icon: BookOpen },
    { name: 'Identity', path: '/dashboard/profile', icon: User },
  ];

  return (
    <>
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass p-8 rounded-3xl max-w-sm w-full text-center border border-white/10 shadow-2xl relative z-10 m-4">
            <LogOut size={48} className="mx-auto text-red-500 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-2">Terminate Session?</h2>
            <p className="text-gray-400 mb-8 text-sm leading-relaxed">Are you sure you want to securely log out of your account?</p>
            <div className="flex gap-4">
              <button onClick={() => setIsLogoutModalOpen(false)} className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-colors">Cancel</button>
              <button 
                onClick={executeLogout} 
                className="flex-1 py-3 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-500 font-medium transition-colors"
               >
                Log Out
              </button>
            </div>
          </motion.div>
        </div>
      )}
      <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="w-72 h-screen flex flex-col sticky top-0 shrink-0 z-50 p-6"
    >
      <div className="glass h-full rounded-[2.5rem] flex flex-col overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        {/* Brand */}
        <div className="p-8 pb-10">
          <Link href="/dashboard" className="group flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.3)] group-hover:scale-110 transition-transform duration-500">
              <div className="w-5 h-5 bg-black rounded-sm rotate-45" />
            </div>
            <span className="text-2xl font-black text-white tracking-tighter group-hover:text-glow transition-all">
              KODLEARN
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 mt-2">
          {navs.map((n) => {
            const active = pathname === n.path;
            return (
              <Link 
                key={n.name} 
                href={n.path} 
                className="relative group block"
              >
                {active && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute inset-0 bg-white rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  active 
                    ? 'text-black font-bold' 
                    : 'text-gray-400 group-hover:text-white group-hover:bg-white/5'
                }`}>
                  <n.icon size={22} className={active ? 'text-black' : 'group-hover:scale-110 transition-transform'} />
                  <span className="text-[15px] tracking-tight">{n.name}</span>
                  {active && <ChevronRight size={16} className="ml-auto" />}
                </div>
              </Link>
            )
          })}
        </nav>

        {/* User Module */}
        <div className="p-6 mt-auto">
          <div className="glass-card rounded-[2rem] p-4 border border-white/5 group hover:border-white/20 transition-all duration-500">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                <User size={20} className="text-white/70" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold text-white truncate">
                  {user?.name || 'Authorized User'}
                </p>
                <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                  Premium Tier
                </p>
              </div>
            </div>
            
            <button 
              onClick={handleLogout} 
              className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-red-500/10 text-gray-400 hover:text-red-500 rounded-xl transition-all duration-300 text-xs font-bold uppercase tracking-widest group/logout"
            >
              <LogOut size={14} className="group-hover/logout:-translate-x-1 transition-transform" /> 
              Term. Session
            </button>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
}
