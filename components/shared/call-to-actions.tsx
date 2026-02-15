import { motion } from "framer-motion";

export function CallToAction() {
  return (
    <section className="relative w-full py-32 overflow-hidden border-t border-white/5">
      {/* Background Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_500px_at_50%_0%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-white">
            Ready to sketch the <br /> <span className="text-blue-500 text-glow">future?</span>
          </h2>
          <p className="text-zinc-500 text-lg font-medium">
            Join thousands of developers and designers building on Lumina.AI.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-black font-black uppercase tracking-widest rounded-full hover:bg-zinc-200 transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)]">
              Launch App Now
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/10 text-white font-black uppercase tracking-widest rounded-full hover:bg-white/5 transition-all">
              View Documentation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}