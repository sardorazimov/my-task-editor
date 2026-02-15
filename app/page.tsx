"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DotPattern } from "../components/shared/dot-pattern";
import AnimatedHeader from "../components/shared/header";
import MagicFooter from "../components/shared/footer";
import { FeaturesSection } from "../components/shared/feature-sections";
import { CallToAction } from "../components/shared/call-to-actions";
// Senin bileşenin yolu

export default function HeroSection() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#050505]">
      <AnimatedHeader />
      
      {/* 1. ÜSTTEKİ KÜÇÜK BADGE (Introducing Magic UI...) */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-20 mb-8"
      >
        <div className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md transition-all hover:bg-white/10">
          <span className="text-[10px] font-medium text-zinc-400">
            ✨ Introducing <span className="text-white font-bold">Lumina.AI v1.0</span>
          </span>
          <ChevronRight size={12} className="text-zinc-500 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </motion.div>

      {/* 2. ANA BAŞLIK (TEXT) */}
      <div className="z-20 flex flex-col items-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-8xl font-bold tracking-tighter text-white"
        >
          Lumina AI is the <br /> 
          <span className="bg-gradient-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            new way to build.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 max-w-2xl text-zinc-400 md:text-xl font-medium leading-relaxed"
        >
          Beautifully designed, animated components and templates built with <br className="hidden md:block" />
          Tailwind CSS, React, and Framer Motion.
        </motion.p>

        {/* 3. BUTON */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 rounded-full bg-white px-8 py-3 text-sm font-bold text-black hover:bg-zinc-200 transition-colors flex items-center gap-2"
        >
          Get Started for free <ChevronRight size={16} />
        </motion.button>
      </div>

      {/* 4. MAGIC UI IŞIK SÜZMESİ (BEAM EFFECT) */}
      {/* Bu kısım görseldeki o tepeden gelen sarımsı/beyaz ışığı yapar */}
      <div 
        className="absolute top-0 z-10 h-[600px] w-full pointer-events-none opacity-50"
        style={{
          background: "radial-gradient(circle 800px at 50% -100px, rgba(255,255,255,0.15), transparent)"
        }}
      />
      
      {/* Alt taraftaki hafif parlamalar */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_120%,rgba(59,130,246,0.1),transparent_50%)]" />

      {/* 5. DOT PATTERN (AYRI OLARAK EN ALTTA) */}
      <DotPattern
        width={32}
        height={32}
        cr={1}
        className={cn(
          "[mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,white,transparent)]",
          "opacity-40"
        )}
      /> 
      <CallToAction />
      <FeaturesSection />
       <MagicFooter />
    </div>
  );
}