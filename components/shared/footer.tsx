"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Twitter, Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#050505] overflow-hidden">
      {/* Dekoratif Arka Plan Işığı */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 lg:gap-24">
          
          {/* Brand Bölümü */}
          <div className="col-span-2 space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <img
                src="/logo.svg"
                alt="Welldraw Logo"
                className="w-40 brightness-110"
              />
            </motion.div>
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed font-medium">
              Welldraw is a neural-grade collaborative whiteboard built for fast thinking, 
              high-fidelity visual collaboration, and seamless team synchronization.
            </p>
            <div className="flex items-center gap-4">
               <SocialIcon icon={<Github size={18} />} href="#" />
               <SocialIcon icon={<Twitter size={18} />} href="#" />
               <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          {/* Menü Grupları */}
          <FooterSection title="Product">
            <FooterLink href="/board/new">Open board</FooterLink>
            <FooterLink href="/realtime">Realtime collaboration</FooterLink>
            <FooterLink href="/history">Version history</FooterLink>
          </FooterSection>

          <FooterSection title="System">
            <FooterLink href="/realtime-analysis">Realtime engine</FooterLink>
            <FooterLink href="/history">History system</FooterLink>
            <FooterLink href="/architecture">Architecture</FooterLink>
          </FooterSection>

          <FooterSection title="Legal">
            <FooterLink href="/privacy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
          </FooterSection>
        </div>

        {/* Alt Bar */}
        <div className="border-t border-white/5 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
              © 2026 Welldraw Protocol
            </div>
            <div className="h-4 w-px bg-zinc-800 hidden md:block" />
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
              </span>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Nodes Online</span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            {["Home", "Realtime", "History"].map((item) => (
              <Link 
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Yardımcı Alt Bileşenler
function FooterSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">{title}</h4>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-1 text-sm text-zinc-500 hover:text-purple-400 transition-all duration-300"
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-px bg-purple-500 transition-all group-hover:w-full" />
      </span>
      <ArrowUpRight size={12} className="opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all" />
    </Link>
  );
}

function SocialIcon({ icon, href }: { icon: React.ReactNode, href: string }) {
  return (
    <a 
      href={href} 
      className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-zinc-500 hover:text-white hover:border-purple-500/50 transition-all"
    >
      {icon}
    </a>
  );
}