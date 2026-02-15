"use client";

import { motion } from "framer-motion";
import { MousePointer2, Share2, Shield, Zap } from "lucide-react";

const features = [
  {
    title: "Real-time Collaboration",
    description: "Draw and brainstorm with your team in real-time with zero latency.",
    icon: <MousePointer2 className="text-blue-500" />,
    className: "md:col-span-2",
  },
  {
    title: "Instant Export",
    description: "Export your neural diagrams to PNG, SVG, or clipboard instantly.",
    icon: <Zap className="text-emerald-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Encrypted Storage",
    description: "Your artifacts are protected with end-to-end neural encryption.",
    icon: <Shield className="text-purple-500" />,
    className: "md:col-span-1",
  },
  {
    title: "Neural Sharing",
    description: "Generate secure links to share your canvases with clients or peers.",
    icon: <Share2 className="text-orange-500" />,
    className: "md:col-span-2",
  },
];

export function FeaturesSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-24 mt-10">
      <div className="text-center mb-16">
        <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-4">Core Protocols</h2>
        <h3 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white">
          Powerful tools for <br /> neural thinkers.
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className={`p-8 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] hover:border-blue-500/20 transition-all ${f.className}`}
          >
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center border border-white/10 mb-6 text-2xl">
              {f.icon}
            </div>
            <h4 className="text-xl font-bold text-white mb-2">{f.title}</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">{f.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}