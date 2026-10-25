import React, { useState } from 'react';
import { GAME_DROPS } from '../data/minecraftData';
import { Sparkles, Calendar, ChevronRight, Layers, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { playClick } from '../utils/soundFX';

export default function GameDropsTimeline() {
  const [selectedDrop, setSelectedDrop] = useState(GAME_DROPS[0]);

  const handleSelect = (drop) => {
    playClick();
    setSelectedDrop(drop);
  };

  return (
    <section id="drops" className="py-16 sm:py-20 bg-[#101117] border-t-4 border-[#23232f] relative text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20202e] border border-[#3b3b4f] text-[11px] font-mono text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>OFFICIAL MOJANG STUDIOS RELEASE CHRONOLOGY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
            GAME DROPS & UPDATES TIMELINE
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
            On September 9, 2024, Mojang officially announced a release cadence shift: replacing the slow annual summer update model with frequent, focused <strong>Game Drops</strong> and regular snapshot testing throughout the year. Below is the verified canonical chronology from 1.19 through 1.21.3 and active 24w40a+ previews.
          </p>
        </div>

        {/* Grid: Selector on Left, Deep-Dive on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          
          {/* Left Column: Drop Cards List */}
          <div className="lg:col-span-5 space-y-3">
            {GAME_DROPS.map((drop) => {
              const isSelected = selectedDrop.id === drop.id;
              return (
                <div
                  key={drop.id}
                  onClick={() => handleSelect(drop)}
                  className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                    isSelected
                      ? 'bg-[#1e1f2b] border-emerald-500 shadow-lg shadow-emerald-950/40 translate-x-1'
                      : 'bg-[#15151e] border-[#252535] hover:bg-[#1a1b26] hover:border-[#38384f]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center p-2 shrink-0">
                        <img 
                          src={drop.icon} 
                          alt={drop.title}
                          onError={(e) => { e.currentTarget.src = drop.fallbackIcon || '/icons/minecraft/creeper.svg'; }}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{drop.title}</span>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                            drop.tag.includes('LATEST') 
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' 
                              : drop.tag.includes('PREVIEW')
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                              : 'bg-zinc-800 text-zinc-400'
                          }`}>
                            {drop.tag}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 mt-1">
                          <span className="text-emerald-400 font-semibold">{drop.version}</span>
                          <span>•</span>
                          <span>{drop.date}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-400 rotate-90 sm:rotate-0' : 'text-zinc-600'}`} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Drop Detailed Spotlight */}
          <div className="lg:col-span-7">
            <div className={`p-6 sm:p-8 rounded-2xl bg-gradient-to-br ${selectedDrop.bgGradient} border-2 border-slate-700/80 shadow-2xl space-y-5`}>
              
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-xl bg-black/60 border border-white/15 flex items-center justify-center p-3 shrink-0 shadow-inner">
                    <img 
                      src={selectedDrop.icon} 
                      alt={selectedDrop.title}
                      onError={(e) => { e.currentTarget.src = selectedDrop.fallbackIcon || '/icons/minecraft/creeper.svg'; }}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-emerald-400 font-bold tracking-wider uppercase block">
                      {selectedDrop.version}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">
                      {selectedDrop.title}
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-300 bg-black/50 px-3 py-1.5 rounded-xl border border-white/10">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" />
                  <span>{selectedDrop.date}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-zinc-200 text-sm sm:text-base leading-relaxed">
                {selectedDrop.description}
              </p>

              {/* Verified Features List */}
              <div className="space-y-3 pt-2">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Verified Feature Highlights (Official Documentation):
                </span>
                <div className="grid grid-cols-1 gap-2.5">
                  {selectedDrop.features.map((feature, idx) => (
                    <div 
                      key={idx} 
                      className="bg-black/40 border border-white/10 rounded-xl p-3 flex items-start gap-3 hover:border-emerald-500/40 transition-all"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-white text-xs sm:text-sm block">{feature.name}</strong>
                        <span className="text-zinc-400 text-xs leading-relaxed">{feature.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sourcing & Verification Notice */}
              <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-zinc-400">
                <span className="flex items-center gap-1 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Sourced from official Mojang release notes & Minecraft Wiki
                </span>
                <a 
                  href="https://minecraft.wiki/w/Java_Edition_version_history" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <span>Official Wiki Version History</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
