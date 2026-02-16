/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Alex Chen",
    role: "Product Designer",
    text: "Welldraw feels incredibly fast and intuitive. It makes brainstorming effortless.",
    color: "bg-blue-500"
  },
  {
    name: "Sarah Miller",
    role: "Frontend Engineer",
    text: "The simplicity and performance are impressive. It fits perfectly into our workflow.",
    color: "bg-purple-500"
  },
  {
    name: "David Kim",
    role: "Startup Founder",
    text: "Welldraw helps our team collaborate visually without friction.",
    color: "bg-emerald-500"
  },
  {
    name: "Emma Rodriguez",
    role: "UX Designer",
    text: "A clean, modern whiteboard experience. Exactly what we needed.",
    color: "bg-orange-500"
  },
  {
    name: "Noah Wilson",
    role: "Software Engineer",
    text: "Lightweight, fast, and reliable. A great tool for visual thinking.",
    color: "bg-pink-500"
  },
  {
    name: "Liam Anderson",
    role: "Tech Lead",
    text: "Welldraw is shaping up to be an excellent collaboration platform.",
    color: "bg-sky-500"
  }
];

export default function Testimonials() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-32 overflow-hidden">
      
      {/* Dekoratif Yan Işıklar */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-purple-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-blue-500/5 blur-[100px] pointer-events-none" />

      <div className="text-center mb-20">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-white"
        >
          Trusted by <span className="text-purple-500">modern teams</span>
        </motion.h2>

        <p className="mt-6 text-zinc-500 font-medium uppercase tracking-[0.3em] text-[10px] md:text-xs">
          Neural-grade feedback from global visionaries
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} index={i} {...t} />
        ))}
      </div>
    </section>
  );
}

function TestimonialCard({ name, role, text, color, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group relative p-8 rounded-[2.5rem] bg-zinc-900/20 border border-white/5 backdrop-blur-sm transition-all hover:border-purple-500/30 overflow-hidden"
    >
      {/* Köşe Parlaması (Hover Efekti) */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-500/10 blur-2xl group-hover:bg-purple-500/20 transition-all opacity-0 group-hover:opacity-100" />
      
      <Quote className="text-zinc-800 mb-6 group-hover:text-purple-500/40 transition-colors" size={32} fill="currentColor" />

      <p className="text-zinc-400 text-sm leading-relaxed font-medium relative z-10 italic">
        &ldquo;{text}&#34;
      </p>

      <div className="mt-8 flex items-center gap-4 border-t border-white/5 pt-6">
        {/* Avatar: İsmin ilk harfi ve dinamik renk */}
        <div className={cn(
          "w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black text-white shadow-lg",
          color
        )}>
          {name[0]}
        </div>

        <div>
          <div className="text-sm font-black uppercase tracking-widest text-zinc-200">
            {name}
          </div>
          <div className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
            {role}
          </div>
        </div>
      </div>
    </motion.div>
  );
}