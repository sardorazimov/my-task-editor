/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Users, MousePointer2, Zap, Share2, Activity, Globe, ArrowRight } from "lucide-react";
// Senin efsane dot-pattern
import { cn } from "@/lib/utils";
import AnimatedHeader from "../../../components/shared/header";

export default function CollaborationComingSoon() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden relative">
      <AnimatedHeader />
      {/* BACKGROUND EFFECTS */}
    
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-purple-500/10 blur-[120px] pointer-events-none" />

      {/* HERO SECTION */}
      <section className="relative z-10 px-6 py-32 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-[0.2em]"
        >
          <Activity size={14} className="animate-pulse" /> Protocol: Under Development
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none"
        >
          Realtime <br />
          <span className="text-purple-500 bg-gradient-to-b from-purple-400 to-purple-700 bg-clip-text text-transparent">
            Collaboration
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-zinc-500 text-lg md:text-xl max-w-2xl mx-auto font-medium"
        >
          We are re-engineering the way teams think. Multiple users, one infinite canvas, 
          zero latency. The future of teamwork is being coded right now.
        </motion.p>
      </section>

      {/* FEATURES GRID - Bento Style */}
      <section className="relative z-10 px-6 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4">
          <FeatureCard 
            icon={<MousePointer2 className="text-purple-400" />}
            title="Live Cursors"
            desc="Visual identity for every team member in the workspace."
          />
          <FeatureCard 
            icon={<Zap className="text-purple-400" />}
            title="Instant Sync"
            desc="WebSocket driven delta-updates for fluid drawing."
          />
          <FeatureCard 
            icon={<Users className="text-purple-400" />}
            title="Presence"
            desc="Always know who's on the board and what they're focusing on."
          />
          <div className="md:col-span-3 p-8 rounded-[2.5rem] border border-white/5 bg-zinc-900/20 backdrop-blur-sm relative overflow-hidden group">
             <div className="relative z-10">
                <h3 className="text-2xl font-black italic uppercase tracking-tight mb-4">Built with modern realtime architecture</h3>
                <p className="text-zinc-500 max-w-3xl leading-relaxed">
                  Welldraw&lsquo;s engine uses a specialized binary protocol over WebSockets, ensuring that even complex 
                  diagrams with hundreds of objects sync in under 50ms. High reliability, seamless synchronization.
                </p>
             </div>
             <Globe className="absolute -right-10 -bottom-10 w-64 h-64 text-purple-500/5 group-hover:text-purple-500/10 transition-colors duration-700" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 pb-32 text-center">
        <h3 className="text-3xl font-black italic uppercase tracking-tighter">Stay tuned for updates</h3>
        <p className="text-zinc-500 mt-4 uppercase text-[10px] tracking-[0.3em] font-bold">
          The engine is warming up. Release imminent.
        </p>

        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-10 px-10 py-4 rounded-full bg-purple-600 hover:bg-purple-500 transition-all font-black uppercase tracking-widest text-sm shadow-[0_0_40px_rgba(168,85,247,0.3)] flex items-center gap-2 mx-auto"
        >
          Back to Welldraw <ArrowRight size={18} />
        </motion.button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 text-center py-12 text-zinc-600">
        <p className="text-[10px] font-bold uppercase tracking-[0.5em]">
          © 2026 Welldraw Neural Protocol // All Rights Reserved
        </p>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="p-8 rounded-[2rem] border border-white/5 bg-zinc-900/30 hover:border-purple-500/30 transition-all"
    >
      <div className="w-12 h-12 rounded-2xl bg-black border border-white/10 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h4 className="text-lg font-bold mb-2 text-zinc-200">{title}</h4>
      <p className="text-sm text-zinc-500 leading-relaxed font-medium">{desc}</p>
    </motion.div>
  );
}