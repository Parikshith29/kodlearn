"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <h1 className="text-6xl md:text-8xl font-extrabold mb-6 neon-text tracking-tighter text-white">
          KodLearn
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 font-light">
          A premium, high-performance learning management system engineered for the future.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link 
            href="/login" 
            className="px-10 py-4 w-full sm:w-auto rounded-full bg-white hover:bg-gray-200 text-black font-semibold transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
          >
            Access Platform
          </Link>
          <Link 
            href="/register" 
            className="px-10 py-4 w-full sm:w-auto rounded-full glass hover:bg-white/10 text-white font-semibold transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Initialize Account
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
