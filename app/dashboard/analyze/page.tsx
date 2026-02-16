"use client";

import React from "react";
import { motion } from "framer-motion";
import { Cpu, Zap, ShieldCheck, Activity, Share2, Layers, Network } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedHeader from "../../../components/shared/header";


export default function AnalysisPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-purple-500/30">
       <AnimatedHeader />
       
      {/* BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
     
      </div>

      <div className="relative z-10">
        {/* HERO SECTION */}
        <section className="max-w-5xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 mb-6 px-3 py-1 text-[10px] font-black uppercase tracking-[0.3em] rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400"
          >
            <Activity size={12} className="animate-pulse" /> System Analysis v1.0
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.9]">
            Realtime <br />
            <span className="text-purple-500">Architecture</span>
          </h1>

          <p className="mt-8 text-zinc-500 text-lg leading-relaxed max-w-3xl mx-auto font-medium">
            Welldraw is developing a modern realtime collaboration engine designed to enable 
            multiple users to interact on the same canvas simultaneously with <span className="text-zinc-300">zero-latency synchronization.</span>
          </p>
        </section>

        {/* ANALYSIS GRID */}
        <section className="max-w-6xl mx-auto px-6 pb-24 grid gap-4">
          
          <div className="grid md:grid-cols-2 gap-4">
            <AnalysisCard
              icon={<Layers size={20} />}
              title="Overview"
              content="The realtime collaboration system allows multiple connected users to create, edit, and visualize drawing elements simultaneously using persistent communication channels."
            />
            <AnalysisCard
              icon={<Cpu size={20} />}
              title="Core Components"
              content="The system consists of a client action capturer, a WebSocket-based communication layer, and a neural synchronization engine for state consistency."
            />
          </div>

          <AnalysisCard
            icon={<Network size={20} />}
            title="Realtime Communication Engine"
            content="Unlike traditional request-response systems, Welldraw uses bidirectional WebSocket technology. This architecture enables immediate propagation of changes without refresh delay, even under complex canvas loads."
            className="bg-purple-500/5 border-purple-500/10"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <AnalysisCard
              icon={<Zap size={20} />}
              title="State Synchronization"
              content="Each change is processed as an atomic update. Conflict resolution mechanisms ensure stability even when multiple users modify the same elements concurrently."
            />
            <AnalysisCard
              icon={<ShieldCheck size={20} />}
              title="Security & Reliability"
              content="All channels are secured and isolated per workspace. Access control ensures only authorized personnel can modify shared neural boards."
            />
          </div>

          <AnalysisCard
            icon={<Share2 size={20} />}
            title="Development Status"
            content="Initial infrastructure has been validated. The engine is moving towards a progressive release phase to maintain maximum performance and reliability standards."
          />
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/5 py-12 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-600">
            Welldraw Realtime Analysis // Built for the future of teamwork
          </p>
        </footer>
      </div>
    </main>
  );
}

function AnalysisCard({ 
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
        "p-8 rounded-[2rem] border border-white/5 bg-zinc-900/20 backdrop-blur-sm transition-all hover:border-purple-500/20 group",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <h2 className="text-sm font-black uppercase tracking-widest text-zinc-200">
          {title}
        </h2>
      </div>
      <p className="text-zinc-500 text-sm leading-relaxed font-medium">
        {content}
      </p>
    </motion.div>
  );
}