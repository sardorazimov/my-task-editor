"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SmartUserCounter() {
  const [count, setCount] = useState(5600);

  useEffect(() => {
    const updateCount = () => {
      setCount((prevCount) => {
        let nextCount;
        // Yeni sayı eskisinden farklı olana kadar rastgele üret
        do {
          // 2000 ile 9999 arasında rastgele bir sayı üret
          nextCount = Math.floor(Math.random() * (9999 - 2000 + 1)) + 2000;
        } while (nextCount === prevCount);
        
        return nextCount;
      });
    };

    // Her 5 dakikada bir çalıştır (5 * 60 * 1000 ms)
    const interval = setInterval(updateCount, 300000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-xl">
        {/* Canlılık Sinyali */}
        <div className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center overflow-hidden h-8">
            <AnimatePresence mode="wait">
              <motion.span
                key={count}
                initial={{ y: 20, opacity: 0, filter: "blur(5px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -20, opacity: 0, filter: "blur(5px)" }}
                transition={{ duration: 0.8, ease: "circOut" }}
                className="text-2xl font-black italic tracking-tighter text-white"
              >
                {count.toLocaleString()}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
            Active Nodes
          </span>
        </div>
      </div>
    </div>
  );
}