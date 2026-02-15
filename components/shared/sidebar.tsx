"use client";
import { useState } from 'react';
import { Menu, X, FileText, Download, Save, Github, Settings } from 'lucide-react';

export default function Dashboard() {
  const [isMenuOpen, setMenuOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-[#121212] flex flex-col relative overflow-hidden">
      
      {/* SOL ÜST MENÜ BUTONU */}
      <div className="absolute top-4 left-4 z-[100]">
        <button 
          onClick={() => setMenuOpen(!isMenuOpen)}
          className="p-3 bg-[#232329] hover:bg-[#313138] rounded-xl shadow-xl transition-all border border-zinc-700"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* AÇILAN EXCALIDRAW TARZI MENÜ */}
        {isMenuOpen && (
          <div className="absolute top-14 left-0 w-64 bg-[#232329] border border-zinc-700 rounded-xl shadow-2xl py-3 flex flex-col gap-1 animate-in slide-in-from-left-5">
             <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#313138] text-sm"><FileText size={16}/> Open <span className="ml-auto opacity-40">Cmd+O</span></button>
             <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#313138] text-sm"><Save size={16}/> Save to...</button>
             <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#313138] text-sm border-b border-zinc-700 pb-3"><Download size={16}/> Export image...</button>
             
             <div className="px-4 py-3 text-[11px] font-bold text-zinc-500 uppercase tracking-widest">Preferences</div>
             <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#313138] text-sm"><Github size={16}/> GitHub</button>
             <button className="flex items-center gap-3 px-4 py-2 hover:bg-[#313138] text-sm"><Settings size={16}/> Settings</button>
          </div>
        )}
      </div>

      {/* ANA ÇALIŞMA ALANI (MAIN SECTION) */}
      <main className="flex-1 overflow-y-auto p-12 flex flex-col items-center">
        
        {/* TİMELİNE BURADA (MAİN'DE) */}
        <div className="w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-10 text-center">Proje Akış Çizelgesi</h2>
          
          <div className="space-y-0 relative">
            {/* O meşhur "İp" (Timeline Hattı) */}
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-zinc-800"></div>

            {/* Timeline Item - Yeşil */}
            <div className="relative pl-12 pb-10">
              <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>
              <div className="bg-[#1e1e1e] p-4 rounded-lg border border-zinc-800">
                <h3 className="text-green-500 font-bold uppercase text-xs">Bitti</h3>
                <p className="text-zinc-200">Veritabanı bağlantısı Neon ile kuruldu.</p>
              </div>
            </div>

            {/* Timeline Item - Sarı */}
            <div className="relative pl-12 pb-10">
              <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-yellow-500/20 border-2 border-yellow-500 flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              </div>
              <div className="bg-[#1e1e1e] p-4 rounded-lg border border-zinc-800">
                <h3 className="text-yellow-500 font-bold uppercase text-xs">Devam Ediyor</h3>
                <p className="text-zinc-200">Sidebar menü animasyonları yapılıyor.</p>
              </div>
            </div>

            {/* Timeline Item - Mavi */}
            <div className="relative pl-12">
              <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-blue-500/20 border-2 border-blue-500 flex items-center justify-center z-10">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
              <div className="bg-[#1e1e1e] p-4 rounded-lg border border-zinc-800">
                <h3 className="text-blue-500 font-bold uppercase text-xs">Sırada</h3>
                <p className="text-zinc-200">Txt dosyası yükleme ve okuma sistemi.</p>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}