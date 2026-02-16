"use client";

import React from "react";
import { motion } from "framer-motion";
import { History, RotateCcw, Clock, ShieldCheck, Zap, Layers, GitBranch, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

import Link from "next/link";
import AnimatedHeader from "../../../components/shared/header";

export default function HistoryPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
      <AnimatedHeader />
      {/* BACKGROUND EFFECTS */}
      <div className="fixed inset-0 z-0">
       
      </div>

      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-8 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400"
          >
            <Clock size={12} className="animate-pulse" /> Archive Protocol v2.1
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none mb-8">
            History & <br />
            <span className="text-purple-500">Versioning</span>
          </h1>

          <p className="text-zinc-500 text-lg md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
            Welldraw includes a complete history tracking system. Review, restore, and 
            analyze every stroke in the <span className="text-zinc-300">canvas evolution timeline.</span>
          </p>
        </section>

        {/* DOCUMENTATION GRID */}
        <section className="max-w-6xl mx-auto px-6 pb-24 grid gap-4">
          
          {/* Main Highlights */}
          <div className="grid md:grid-cols-2 gap-4">
            <HistoryCard
              icon={<History size={20} />}
              title="Overview"
              content="The history system records every modification made to the canvas—drawing, editing, deleting—storing them as a structured timeline for precise reconstruction."
            />
            <HistoryCard
              icon={<GitBranch size={20} />}
              title="Version Tracking"
              content="Each board maintains a version sequence. Every snapshot contains the full structural state, enabling accurate project lifecycle restoration."
            />
          </div>

          {/* Special Feature Highlight */}
          <HistoryCard
            icon={<RotateCcw size={20} />}
            title="Undo and Redo Engine"
            content="A reliable mechanism to step backward and forward through actions. Built on a structured action stack to ensure consistent behavior during creative experimentation."
            className="bg-purple-500/5 border-purple-500/10"
          />

          <div className="grid md:grid-cols-3 gap-4">
            <HistoryCard
              icon={<Layers size={20} />}
              title="Timeline Reconstruction"
              content="Track project evolution and restore specific moments instantly."
            />
            <HistoryCard
              icon={<ShieldCheck size={20} />}
              title="Data Integrity"
              content="Encrypted records ensure recovery even after unexpected interruptions."
            />
            <HistoryCard
              icon={<Zap size={20} />}
              title="Optimization"
              content="Incremental updates reduce storage while maintaining smooth performance."
            />
          </div>

          {/* Collaboration Focus */}
          <HistoryCard
            title="Collaboration History"
            content="In collaborative sessions, Welldraw tracks contributions from all participants, ensuring transparency in how the shared board evolves over time."
          />
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 py-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">
            Welldraw Neural Archive // Full Control Secured
          </p>
        </footer>
      </div>
    </main>
  );
}

function HistoryCard({ 
  title, 
  content, 
  icon, 
  className 
}: { 
  title: string; 
  content: string; 
  icon?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className={cn(
        "p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-md transition-all hover:border-purple-500/20 group",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        {icon && (
          <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
        <h2 className="text-xs font-black uppercase tracking-widest text-zinc-300">
          {title}
        </h2>
      </div>
      <p className="text-zinc-500 text-sm leading-relaxed font-medium">
        {content}
      </p>
    </motion.div>
  );
}