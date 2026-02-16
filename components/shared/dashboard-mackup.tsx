/* eslint-disable react-hooks/purity */
"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { MousePointer2 } from "lucide-react";
import SmartUserCounter from "./live-counter";

const USERS = [
  { id: 1, name: "Alex", color: "#A855F7" },
  { id: 2, name: "Sarah", color: "#3B82F6" },
  { id: 3, name: "David", color: "#10B981" },
  { id: 4, name: "Lumina", color: "#F43F5E" },
];

export default function HeroMockup() {
  const [cursors, setCursors] = useState(
    USERS.map(user => ({
      ...user,
      // Başlangıçta rastgele bir yere at
      left: Math.random() * 80 + 10, 
      top: Math.random() * 70 + 15,
    }))
  );

  const moveCursors = useCallback(() => {
    setCursors(prev =>
      prev.map(c => ({
        ...c,
        // KUTUNUN HER YERİNE: %5 ile %90 arasında her yere gitsinler
        left: Math.random() * 85 + 5,
        top: Math.random() * 80 + 10,
      }))
    );
  }, []);

  useEffect(() => {
    moveCursors();
    // 2 saniyede bir yeni bir "uzak" hedef belirle
    const interval = setInterval(moveCursors, 2500);
    return () => clearInterval(interval);
  }, [moveCursors]);

  return (
    <div className="relative w-full max-w-5xl mx-auto mt-20 px-4">
      {/* ANA TUVAL (CANVAS) */}
      <div className="relative h-[500px] w-full bg-[#09090b] border border-white/5 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-purple-500/5">
        
        {/* Arka plan gridi */}
        <div 
          className="absolute inset-0 opacity-[0.05]" 
          style={{ 
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }} 
        />

        {/* İMLEÇLER */}
        {cursors.map(cursor => (
          <motion.div
            key={cursor.id}
            // Transform yerine direkt left/top animasyonu kullanıyoruz
            animate={{ 
              left: `${cursor.left}%`, 
              top: `${cursor.top}%` 
            }}
            transition={{ 
              type: "spring", 
              damping: 30,    // Daha yumuşak duruş
              stiffness: 45,  // Daha akıcı süzülme
              mass: 1
            }}
            className="absolute z-50 pointer-events-none"
            style={{ position: 'absolute' }} // Kesinleşsin
          >
            <MousePointer2 
              size={24} 
              fill={cursor.color} 
              stroke={cursor.color} 
              className="drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
            />
            
            {/* İSİM ETİKETİ */}
            <div
              className="ml-4 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-[0.15em] text-white shadow-xl"
              style={{ backgroundColor: cursor.color }}
            >
              {cursor.name}
            </div>
          </motion.div>
        ))}

        {/* Estetik: Orta-Arka plandaki hayali çizimler */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
           <div className="absolute left-1/4 top-1/3 w-40 h-40 border-2 border-dashed border-zinc-800 rounded-full animate-pulse" />
           <div className="absolute right-1/4 bottom-1/4 w-60 h-32 border-2 border-zinc-800 rounded-2xl rotate-12" />
        </div>

        {/* Toolbar Mockup */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 p-2.5 bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-2xl z-[60]">
          <SmartUserCounter />
          {/* {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="w-9 h-9 rounded-xl bg-white/5 border border-white/5" />
          ))} */}
        </div>

      </div>
    </div>
  );
}