"use client";
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  BookOpen, Code, Database, GitBranch, Server, Layers,
  ArrowRight, CheckCircle, Users, Play, Sparkles, Zap,
} from 'lucide-react';

const courses = [
  { icon: Code,      title: 'React Masterclass',      level: 'Advanced',     tag: 'Frontend', students: '2.4k', color: 'from-blue-500/20 to-blue-600/10',   ring: 'rgba(59,130,246,0.4)'   },
  { icon: Server,    title: 'Node.js Backend',         level: 'Intermediate', tag: 'Backend',  students: '1.8k', color: 'from-emerald-500/20 to-emerald-600/10', ring: 'rgba(52,211,153,0.4)' },
  { icon: Database,  title: 'Python Data Science',     level: 'Beginner',     tag: 'Data',     students: '3.1k', color: 'from-purple-500/20 to-purple-600/10', ring: 'rgba(139,92,246,0.4)'  },
  { icon: GitBranch, title: 'Git Mastery',             level: 'Beginner',     tag: 'DevOps',   students: '4.2k', color: 'from-orange-500/20 to-orange-600/10', ring: 'rgba(249,115,22,0.4)'  },
  { icon: Layers,    title: 'Docker & Kubernetes',      level: 'Advanced',     tag: 'DevOps',   students: '1.2k', color: 'from-cyan-500/20 to-cyan-600/10',    ring: 'rgba(34,211,238,0.4)'  },
  { icon: BookOpen,  title: 'TypeScript Pro',           level: 'Intermediate', tag: 'Frontend', students: '2.9k', color: 'from-indigo-500/20 to-indigo-600/10', ring: 'rgba(99,102,241,0.4)'  },
];

const perks = [
  'Structured learning paths from beginner to expert',
  'Free access to 10+ professional engineering courses',
  'Track your progress across every lesson',
  'Videos from top educators like Traversy Media & freeCodeCamp',
];

const stats = [
  { value: '10+',   label: 'Courses',         icon: BookOpen },
  { value: '15k+',  label: 'Active Learners',  icon: Users },
  { value: '100%',  label: 'Free Forever',     icon: Sparkles },
  { value: '4.9★',  label: 'Avg Rating',       icon: Zap },
];

/* ─ Stagger container ─ */
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

/* ─ Course Card ─ */
function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mouse-x', `${x}%`);
    el.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.div
      variants={item}
      ref={ref}
      onMouseMove={handleMouseMove}
      className="glass-card shimmer-card p-8 rounded-3xl group cursor-pointer relative"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* Ambient glow on hover */}
      <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${course.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />
      <div className="card-accent-line" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.4 }}
          >
            <course.icon size={22} className="text-white/70 group-hover:text-white transition-colors" />
          </motion.div>
          <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-500 group-hover:text-gray-300 group-hover:border-white/20 transition-all">
            {course.tag}
          </span>
        </div>
        <h3 className="text-lg font-bold mb-2 tracking-tight group-hover:text-white transition-colors">{course.title}</h3>
        <div className="flex items-center justify-between mt-6">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider group-hover:text-gray-300 transition-colors">{course.level}</span>
          <span className="text-xs text-gray-600 flex items-center gap-1 group-hover:text-gray-400 transition-colors">
            <Users size={10} /> {course.students}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function LandingPage() {

  return (
    <div className="min-h-screen text-white overflow-x-hidden">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 px-8 py-5 flex items-center justify-between border-b border-white/5 backdrop-blur-2xl bg-black/50">
        <motion.span
          className="text-xl font-black tracking-tighter"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          KODLEARN
        </motion.span>
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="nav-link text-sm font-semibold text-gray-400 hover:text-white transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            href="/register"
            className="ripple-effect btn-pulse text-sm font-black px-5 py-2.5 bg-white text-black rounded-xl hover:bg-gray-100 transition-all shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:shadow-[0_0_36px_rgba(255,255,255,0.4)] hover:scale-105 active:scale-95"
          >
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-7xl mx-auto px-8 pt-10 pb-24 text-center relative">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-8 backdrop-blur-sm">
          <motion.div
            className="w-1.5 h-1.5 bg-emerald-400 rounded-full"
            animate={{ scale: [1, 1.6, 1], opacity: [1, 0.6, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          Platform Live — 10 Free Courses Available
        </div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-none"
        >
          Learn to code.<br />
          <span className="animated-gradient-text">
            Build your future.
          </span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-14 font-light leading-relaxed"
        >
          KodLearn gives you access to structured, high-quality programming courses —
          completely free. Track your progress, watch real tutorials, and level up your skills.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
        >
          <Link
            href="/register"
            className="ripple-effect group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-100 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(255,255,255,0.35)] text-lg hover:scale-105 active:scale-95"
          >
            Start Learning for Free
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowRight size={20} />
            </motion.span>
          </Link>
          <Link
            href="/login"
            className="ripple-effect inline-flex items-center justify-center gap-3 px-8 py-4 glass text-white font-semibold rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all text-lg hover:scale-105 active:scale-95"
          >
            <Play size={18} className="fill-white" /> Watch a Lesson
          </Link>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={item}
              whileHover={{ scale: 1.06, y: -3 }}
              className="glass rounded-2xl px-4 py-5 text-center hover:border-white/20 transition-all cursor-default"
            >
              <s.icon size={14} className="mx-auto mb-1 text-gray-500" />
              <div className="text-2xl font-black tracking-tighter">{s.value}</div>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-0.5">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── Courses ── */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-2">Available Courses</h2>
            <p className="text-gray-500">All free. No credit card required.</p>
          </div>
          <Link
            href="/login"
            className="nav-link group text-sm font-bold text-white/60 hover:text-white transition-colors flex items-center gap-2"
          >
            View all
            <motion.span animate={{ x: [0, 3, 0] }} transition={{ duration: 1.4, repeat: Infinity }}>
              <ArrowRight size={14} />
            </motion.span>
          </Link>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {courses.map((course, i) => (
            <CourseCard key={course.title} course={course} index={i} />
          ))}
        </motion.div>
      </section>

      {/* ── Perks ── */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="glass rounded-[3rem] p-16 border border-white/8 relative overflow-hidden"
        >
          {/* Corner glows */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-5xl font-black tracking-tighter mb-6 leading-tight">
                Why choose<br />
                <span className="animated-gradient-text">KodLearn?</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                We believe quality education should be accessible to everyone. No subscriptions,
                no paywalls — just a clean, focused learning experience.
              </p>
              <Link
                href="/register"
                className="ripple-effect btn-pulse inline-flex items-center gap-3 px-7 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-100 transition-all text-sm hover:scale-105 active:scale-95"
              >
                Create Free Account <ArrowRight size={16} />
              </Link>
            </div>

            <div className="space-y-5">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ x: 6 }}
                  className="flex items-start gap-4 cursor-default group"
                >
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 360 }}
                    transition={{ duration: 0.4 }}
                  >
                    <CheckCircle size={20} className="text-emerald-400 mt-0.5 shrink-0 group-hover:text-emerald-300 transition-colors" />
                  </motion.div>
                  <p className="text-gray-300 font-medium leading-relaxed group-hover:text-white transition-colors">{perk}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <motion.span
          className="font-black tracking-tighter text-white/40 text-lg hover:text-white/70 transition-colors cursor-default"
          whileHover={{ scale: 1.04 }}
        >
          KODLEARN
        </motion.span>
        <span>© {new Date().getFullYear()} KodLearn. Free to learn, forever.</span>
      </footer>
    </div>
  );
}
