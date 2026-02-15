"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight, MoveUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DotPattern } from "../components/shared/dot-pattern";
import AnimatedHeader from "../components/shared/header";
import MagicFooter from "../components/shared/footer";
import { FeaturesSection } from "../components/shared/feature-sections";
import { CallToAction } from "../components/shared/call-to-actions";
import { Hero3DStage } from "../components/shared/hero-3d";
import { useRouter } from "next/navigation";
// Senin bileşenin yolu

export default function HeroSection() {
  const router = useRouter();
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden ">
      <div className="min-h-screen bg-gradient-to-b from-[#111] to-[#222] text-white px-8 py-6 font-sans w-full ">
        {/* Navbar */}
        <AnimatedHeader />

        {/* Main Content */}
        <main className="max-w-full  mx-auto mt-32">
          <h1 className="text-7xl md:text-[120px] font-bold leading-[0.9] tracking-tighter mb-8">
            AI Services <br />
            <span className="text-gray-500">for your Business <br /> Growth</span>
          </h1>

          <p className="text-gray-400 max-w-md text-lg mb-12">
            We&#39;ll pump your company with AI. As a leading AI automation agency
            with 99 years of experience, we deliver top results.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-6">
            <button 
             onClick={() => router.push("/dashboard")}
              className="bg-[#e2ff3b] text-black px-8 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform cursor-pointer">
              Get Started
            </button>
            

            <div className="flex items-center gap-3 ml-auto">
              <span className="text-xs text-gray-500 max-w-[80px] leading-tight">Loved by founders worldwide</span>
              <div className="flex -space-x-3">
                {/* Buraya profil resimleri gelecek */}
                <div className="w-10 h-10 rounded-full border-2 border-[#111] bg-gray-600" />
                <div className="w-10 h-10 rounded-full border-2 border-[#111] bg-gray-500" />
              </div>
              <div className="p-3 rounded-full bg-white/10 border border-white/20">
                <ArrowDown size={20} />
              </div>
            </div>
          </div>
        </main>
      </div>
      <FeaturesSection />
      <MagicFooter />

    </div>
  );
}