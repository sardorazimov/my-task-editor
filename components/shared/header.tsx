"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Terminal } from "lucide-react";

export default function AnimatedHeader() {
  const { scrollY } = useScroll();

  // 0 ile 100px arası scroll yapıldığında değerleri dönüştür:
  // 1. Üstten 0px'den 15px'e iner
  const top = useTransform(scrollY, [0, 100], [0, 15]);
  
  // 2. Genişlik %100'den %90'a (veya max-w-6xl'e) düşer
  const width = useTransform(scrollY, [0, 100], ["100%", "90%"]);
  
  // 3. Kenar yuvarlaklığı 0'dan 2rem'e çıkar
  const borderRadius = useTransform(scrollY, [0, 100], ["0px", "2rem"]);
  
  // 4. Arka plan şeffaflığı ve border belirginliği
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(9, 9, 11, 0.8)"]
  );
  const borderColor = useTransform(
    scrollY,
    [0, 100],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.1)"]
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none">
      <motion.header
        style={{
          top,
          width,
          borderRadius,
          backgroundColor,
          borderColor,
        }}
        className="pointer-events-auto border backdrop-blur-md flex items-center justify-between px-8 h-16 transition-colors shadow-2xl shadow-black/50"
      >
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group">
          <Terminal size={20} className="text-blue-500" />
          <span className="font-black italic uppercase tracking-tighter text-white text-lg">
            Lumina<span className="text-blue-500">.AI</span>
          </span>
        </Link>

        {/* MENÜ LİNKLERİ */}
        <nav className="hidden md:flex items-center gap-6">
          {["Analyze", "History", "Upgrades"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* AKSİYON BUTONU */}
        <button className="bg-white text-black text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-zinc-200 transition-all">
          Initialize
        </button>
      </motion.header>
    </div>
  );
}