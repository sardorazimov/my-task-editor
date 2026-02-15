"use client";

import React from "react";
import Link from "next/link";
import { Terminal, Github, Twitter, Linkedin, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

export default function MagicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-white/5 bg-[#050505] pt-24 pb-12 overflow-hidden">
      
      {/* ARKA PLAN EFEKTLERİ */}
      {/* Alt orta kısımdan yukarı doğru vuran hafif mavi bir ışık */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* MARKA BÖLÜMÜ */}
          <div className="md:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-zinc-900 rounded-xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-all">
                <Terminal size={20} className="text-blue-500" />
              </div>
              <span className="text-2xl font-black italic uppercase tracking-tighter text-white">
                Lumina<span className="text-blue-500">.AI</span>
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm font-medium">
              Revolutionizing code analysis with neural intelligence. 
              Build faster, secure better, and explore the limits of AI-driven development.
            </p>
          </div>

          {/* LİNKLER */}
          <div className="grid grid-cols-2 gap-8 md:col-span-2">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">Protocol</h4>
              <ul className="space-y-4">
                {["Neural Engine", "Analysis logs", "Upgrades"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="group flex items-center gap-1 text-sm text-zinc-500 hover:text-blue-400 transition-colors">
                      {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-300">Company</h4>
              <ul className="space-y-4">
                {["Privacy", "Terms", "Documentation"].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="group flex items-center gap-1 text-sm text-zinc-500 hover:text-blue-400 transition-colors">
                      {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ALT BAR */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
              © {currentYear} LUMINA INTELLIGENCE // ALL RIGHTS RESERVED
            </p>
            <div className="hidden md:block h-4 w-px bg-zinc-800" />
            <div className="flex items-center gap-4">
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors"><Github size={18} /></Link>
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors"><Twitter size={18} /></Link>
              <Link href="#" className="text-zinc-500 hover:text-white transition-colors"><Linkedin size={18} /></Link>
            </div>
          </div>

          {/* SİSTEM DURUMU */}
          <div className="flex items-center gap-3 px-4 py-2 bg-zinc-900/50 border border-white/5 rounded-full">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
              Neural Nodes: Online
            </span>
          </div>
        </div>
      </div>
      
      {/* EN ALTTAKİ İNCE ÇİZGİ PARLAMASI */}
      <div className="absolute bottom-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
    </footer>
  );
}