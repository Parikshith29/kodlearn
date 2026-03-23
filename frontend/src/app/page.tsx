"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { BookOpen, Code, Database, GitBranch, Server, Layers, ArrowRight, CheckCircle, Star, Users, Play } from 'lucide-react';

const courses = [
  { icon: Code, title: 'React Masterclass', level: 'Advanced', tag: 'Frontend', students: '2.4k' },
  { icon: Server, title: 'Node.js Backend', level: 'Intermediate', tag: 'Backend', students: '1.8k' },
  { icon: Database, title: 'Python Data Science', level: 'Beginner', tag: 'Data', students: '3.1k' },
  { icon: GitBranch, title: 'Git Mastery', level: 'Beginner', tag: 'DevOps', students: '4.2k' },
  { icon: Layers, title: 'Docker & Kubernetes', level: 'Advanced', tag: 'DevOps', students: '1.2k' },
  { icon: BookOpen, title: 'TypeScript Pro', level: 'Intermediate', tag: 'Frontend', students: '2.9k' },
];

const perks = [
  'Structured learning paths from beginner to expert',
  'Free access to 10+ professional engineering courses',
  'Track your progress across every lesson',
  'Videos from top educators like Traversy Media & freeCodeCamp',
];

export default function LandingPage() {
  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      
      {/* Nav */}
      <nav className="sticky top-0 z-50 px-8 py-5 flex items-center justify-between border-b border-white/5 backdrop-blur-xl bg-black/40">
        <span className="text-xl font-black tracking-tighter">KODLEARN</span>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Sign In</Link>
          <Link href="/register" className="text-sm font-black px-5 py-2.5 bg-white text-black rounded-xl hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            Get Started Free
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-8 pt-24 pb-32 text-center relative">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
            Platform Live — 10 Free Courses Available
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-none">
            Learn to code.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
              Build your future.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-light leading-relaxed">
            KodLearn gives you access to structured, high-quality programming courses — 
            completely free. Track your progress, watch real tutorials, and level up your skills.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] text-lg">
              Start Learning for Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="inline-flex items-center justify-center gap-3 px-8 py-4 glass text-white font-semibold rounded-2xl hover:bg-white/10 transition-all text-lg">
              <Play size={18} className="fill-white" /> Watch a Lesson
            </Link>
          </div>


        </motion.div>
      </section>

      {/* Course preview */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-black tracking-tighter mb-2">Available Courses</h2>
            <p className="text-gray-500">All free. No credit card required.</p>
          </div>
          <Link href="/login" className="text-sm font-bold text-white/60 hover:text-white transition-colors flex items-center gap-2">
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass-card p-8 rounded-3xl group cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/3 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/10 group-hover:bg-white/10 transition-colors">
                  <course.icon size={22} className="text-white/70" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-white/5 border border-white/10 rounded-full text-gray-500">{course.tag}</span>
              </div>
              <h3 className="text-lg font-bold mb-2 tracking-tight">{course.title}</h3>
              <div className="flex items-center justify-between mt-6">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{course.level}</span>
                <span className="text-xs text-gray-600 flex items-center gap-1"><Users size={10} /> {course.students} learners</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Perks */}
      <section className="max-w-7xl mx-auto px-8 pb-32">
        <div className="glass rounded-[3rem] p-16 border border-white/8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/3 to-transparent pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
            <div>
              <h2 className="text-5xl font-black tracking-tighter mb-6 leading-tight">Why choose KodLearn?</h2>
              <p className="text-gray-400 text-lg leading-relaxed mb-10">
                We believe quality education should be accessible to everyone. No subscriptions, no paywalls — just a clean, focused learning experience.
              </p>
              <Link href="/register" className="inline-flex items-center gap-3 px-7 py-4 bg-white text-black font-black rounded-2xl hover:bg-gray-200 transition-all text-sm">
                Create Free Account <ArrowRight size={16} />
              </Link>
            </div>
            <div className="space-y-5">
              {perks.map((perk, i) => (
                <motion.div
                  key={perk}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <CheckCircle size={20} className="text-green-400 mt-0.5 shrink-0" />
                  <p className="text-gray-300 font-medium leading-relaxed">{perk}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
        <span className="font-black tracking-tighter text-white/40 text-lg">KODLEARN</span>
        <span>© {new Date().getFullYear()} KodLearn. Free to learn, forever.</span>
      </footer>
    </div>
  );
}
