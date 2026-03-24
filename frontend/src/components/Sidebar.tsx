"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuthStore } from '../store/authStore';
import { Home, Compass, BookOpen, User, LogOut, ChevronRight } from 'lucide-react';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const handleLogout = () => setIsLogoutModalOpen(true);

  const executeLogout = () => {
    logout();
    router.push('/login');
  };

  const navs = [
    { name: 'Console',      path: '/dashboard',             icon: Home },
    { name: 'Browse Library', path: '/dashboard/browse',    icon: Compass },
    { name: 'My Learning',  path: '/dashboard/my-courses',  icon: BookOpen },
    { name: 'Identity',     path: '/dashboard/profile',     icon: User },
  ];

  return (
    <>
      {/* ── Logout modal ── */}
      <AnimatePresence>
        {isLogoutModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1,    opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="glass p-8 rounded-3xl max-w-sm w-full text-center border border-white/10 shadow-2xl relative z-10 m-4"
            >
              {/* Pulsing icon */}
              <motion.div
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center"
              >
                <LogOut size={32} className="text-red-400" />
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-2">Terminate Session?</h2>
              <p className="text-gray-400 mb-8 text-sm leading-relaxed">
                Are you sure you want to securely log out of your account?
              </p>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={executeLogout}
                  className="flex-1 py-3 rounded-xl bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 font-medium transition-colors"
                >
                  Log Out
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Sidebar ── */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-72 h-screen flex flex-col sticky top-0 shrink-0 z-50 p-6"
      >
        <div className="glass h-full rounded-[2.5rem] flex flex-col overflow-hidden border border-white/10 shadow-[0_0_60px_rgba(0,0,0,0.6)]">

          {/* Brand */}
          <div className="p-8 pb-10">
            <Link href="/dashboard" className="group flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 15 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-[0_0_24px_rgba(255,255,255,0.3)]"
              >
                <div className="w-5 h-5 bg-black rounded-sm rotate-45" />
              </motion.div>
              <span className="text-2xl font-black text-white tracking-tighter group-hover:text-glow transition-all duration-300">
                KODLEARN
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-1.5 mt-2">
            {navs.map((n) => {
              const active = pathname === n.path;
              return (
                <Link
                  key={n.name}
                  href={n.path}
                  className="relative group block"
                  onMouseEnter={() => setHovered(n.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Active pill */}
                  {active && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 bg-white rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.15)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Hover highlight for inactive */}
                  {!active && hovered === n.name && (
                    <motion.div
                      layoutId="hoverNav"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 bg-white/5 rounded-2xl border border-white/8"
                      transition={{ duration: 0.15 }}
                    />
                  )}

                  <div
                    className={`relative flex items-center gap-4 px-5 py-4 rounded-2xl transition-colors duration-200 ${
                      active
                        ? 'text-black font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <motion.div
                      animate={hovered === n.name && !active ? { x: 2, scale: 1.15 } : { x: 0, scale: 1 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                    >
                      <n.icon size={20} className={active ? 'text-black' : ''} />
                    </motion.div>
                    <span className="text-[15px] tracking-tight">{n.name}</span>
                    {active && (
                      <motion.div
                        initial={{ opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="ml-auto"
                      >
                        <ChevronRight size={15} />
                      </motion.div>
                    )}
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* User Module */}
          <div className="p-6 mt-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="glass-card rounded-[2rem] p-4 border border-white/5 group hover:border-white/15"
            >
              <div className="flex items-center gap-3 mb-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-12 h-12 bg-gradient-to-tr from-gray-800 to-gray-700 rounded-2xl flex items-center justify-center border border-white/10"
                >
                  <User size={20} className="text-white/70" />
                </motion.div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold text-white truncate">
                    {user?.name || 'Authorized User'}
                  </p>
                  <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">
                    Premium Tier
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 bg-white/5 hover:bg-red-500/12 text-gray-400 hover:text-red-400 rounded-xl transition-all duration-300 text-xs font-bold uppercase tracking-widest group/logout border border-transparent hover:border-red-500/20 ripple-effect"
              >
                <motion.span
                  animate={{ x: 0 }}
                  whileHover={{ x: -2 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                >
                  <LogOut size={14} />
                </motion.span>
                Term. Session
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
