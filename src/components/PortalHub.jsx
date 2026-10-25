import React, { useState } from 'react';
import { NAVIGATION_CATEGORIES, NAVIGATION_ITEMS } from '../data/navigationRoutes';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Layers, 
  Check, 
  ExternalLink,
  BookOpen,
  Eye,
  Sliders
} from 'lucide-react';
import { playClick, playPop } from '../utils/soundFX';

export default function PortalHub({ onSelectSection, onToggleViewMode, viewMode }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredItems = NAVIGATION_ITEMS.filter(item => {
    if (selectedCategory === 'All') return true;
    return item.categoryId === selectedCategory;
  });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100">
      
      {/* SECTION HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1c1d28] border border-[#3b3d52] text-xs font-silkscreen text-emerald-400">
          <BookOpen className="w-3.5 h-3.5" />
          <span>PORTAL DIRECTORY & KNOWLEDGE CODEX</span>
        </div>
        <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
          SELECT YOUR DOMAIN
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
          Each domain opens in its own dedicated, fast full-page laboratory with interactive simulators, formulas, and deep Wiki documentation.
        </p>

        {/* View Mode Toggle Pill */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <span className="text-xs font-mono text-zinc-400">Navigation Mode:</span>
          <button
            onClick={() => {
              playPop();
              onToggleViewMode(viewMode === 'page' ? 'scroll' : 'page');
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'page'
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-md shadow-emerald-950'
                : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300 shadow-md shadow-cyan-950'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{viewMode === 'page' ? '📄 Dedicated Page Mode (Active)' : '📜 Continuous Scroll Mode (Active)'}</span>
          </button>
        </div>
      </div>

      {/* CATEGORY FILTER PILLS */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
        <button
          onClick={() => { playClick(); setSelectedCategory('All'); }}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
            selectedCategory === 'All'
              ? 'bg-[#5c8e32] text-white border-[#89c44e] shadow-lg shadow-emerald-900/30'
              : 'bg-[#181922] text-zinc-400 border-[#282937] hover:text-white hover:bg-[#222330]'
          }`}
        >
          All Domains (15)
        </button>

        {NAVIGATION_CATEGORIES.map(cat => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => { playClick(); setSelectedCategory(cat.id); }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                isSelected
                  ? 'bg-[#5c8e32] text-white border-[#89c44e] shadow-lg shadow-emerald-900/30'
                  : 'bg-[#181922] text-zinc-400 border-[#282937] hover:text-white hover:bg-[#222330]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 15 DOMAIN CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => {
                playClick();
                onSelectSection(item.id);
              }}
              className="bg-[#14151e]/90 border-2 border-[#262837] hover:border-emerald-500/60 rounded-2xl p-5 shadow-xl hover:shadow-emerald-900/20 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[#1b1c28] border border-[#34364c] flex items-center justify-center p-2.5 text-emerald-400 group-hover:scale-110 group-hover:bg-[#5c8e32] group-hover:text-white transition-all shadow-inner">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded font-semibold">
                    {item.badge}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                  {item.categoryLabel}
                </div>
                <h3 className="font-bold text-slate-100 text-lg group-hover:text-emerald-300 transition-colors">
                  {item.fullTitle}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mt-2 line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-[#232433] mt-5 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                <span>Launch Interactive Module</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
