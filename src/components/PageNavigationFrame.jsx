import React from 'react';
import { NAVIGATION_ITEMS, getSectionById, getAdjacentSections } from '../data/navigationRoutes';
import { GAME_VERSION_CONFIG } from '../data/versionConfig';
import { 
  ArrowLeft, 
  ArrowRight, 
  Home, 
  ChevronRight, 
  Sliders, 
  ArrowUp,
  List
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';

export function PageHeaderNav({ currentSectionId, onNavigateHome, onSelectSection, viewMode, onToggleViewMode }) {
  const currentSection = getSectionById(currentSectionId);

  if (!currentSection) return null;

  const compat = GAME_VERSION_CONFIG.toolCompatibility[currentSectionId];

  return (
    <div className="pt-24 sm:pt-28 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#14151f]/90 border-2 border-[#2b2d3d] rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left: Breadcrumbs, Title & Version Compatibility */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 flex-wrap">
            <button
              onClick={() => { playClick(); onNavigateHome(); }}
              className="hover:text-emerald-400 flex items-center gap-1 transition-colors text-zinc-300"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Portal Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-zinc-600" />
            <span className="text-zinc-500">{currentSection.categoryLabel}</span>
            <ChevronRight className="w-3 h-3 text-zinc-600" />
            <span className="text-emerald-400 font-bold">{currentSection.label}</span>
          </div>

          <h1 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <span>{currentSection.fullTitle}</span>
          </h1>

          {/* Explicit Version Compatibility & Last-Verified Tag */}
          <div className="flex items-center gap-2 pt-0.5 text-xs font-mono text-zinc-400 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Supported: {compat ? compat.versionBadge : 'Java 1.0 – 26.3+'}</span>
            </span>
            <span className="text-[10px] text-zinc-400">
              Last Verified: {compat?.lastVerified || 'October 2026'}
            </span>
          </div>
        </div>

        {/* Right: Quick Controls */}
        <div className="flex items-center gap-2.5 flex-wrap w-full md:w-auto justify-between md:justify-end">
          {/* Quick Jump Selector */}
          <div className="flex items-center gap-1.5 bg-[#1b1c28] border border-[#3b3d52] px-2.5 py-1.5 rounded-xl">
            <List className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <select
              value={currentSectionId}
              onChange={(e) => {
                playClick();
                onSelectSection(e.target.value);
              }}
              className="bg-transparent text-xs font-mono text-slate-200 focus:outline-none cursor-pointer"
              aria-label="Jump to another section"
            >
              {NAVIGATION_ITEMS.map(item => (
                <option key={item.id} value={item.id} className="bg-[#1b1c28] text-white">
                  {item.label} — {item.categoryLabel}
                </option>
              ))}
            </select>
          </div>

          {/* Back to Home Button */}
          <button
            onClick={() => { playClick(); onNavigateHome(); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#1d1f2c] hover:bg-[#282a3c] text-zinc-300 hover:text-white border border-[#393c52] text-xs font-semibold transition-all"
            title="Return to Portal Directory Hub"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-emerald-400" />
            <span>Directory Hub</span>
          </button>

          {/* Toggle View Mode */}
          <button
            onClick={() => {
              playPop();
              onToggleViewMode('scroll');
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/30 text-xs font-mono transition-all"
            title="Switch to Continuous Scroll Mode (Browse all sections)"
          >
            <Sliders className="w-3.5 h-3.5 text-cyan-400" />
            <span className="hidden sm:inline">Scroll All Mode</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export function PageFooterNav({ currentSectionId, onSelectSection, onNavigateHome }) {
  const { prev, next, index, total } = getAdjacentSections(currentSectionId);

  const scrollToTop = () => {
    playLevelUp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-[#14151f]/90 border-2 border-[#2b2d3d] rounded-2xl p-4 sm:p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Previous Section */}
        {prev ? (
          <button
            onClick={() => {
              playClick();
              onSelectSection(prev.id);
            }}
            className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b1c28] hover:bg-[#252738] border border-[#3b3d52] text-xs font-semibold text-slate-300 hover:text-white transition-all text-left"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Previous Section</span>
              <span>{prev.label}</span>
            </div>
          </button>
        ) : (
          <button
            onClick={() => { playClick(); onNavigateHome(); }}
            className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b1c28] hover:bg-[#252738] border border-[#3b3d52] text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <Home className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Return to Portal Hub</span>
          </button>
        )}

        {/* Center: Section Indicator & Scroll To Top */}
        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[11px] font-mono text-zinc-500">
            Section {index + 1} of {total}
          </span>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 bg-black/40 px-3 py-1 rounded-full border border-emerald-900/50 transition-colors"
          >
            <ArrowUp className="w-3 h-3" />
            <span>Back to Top</span>
          </button>
        </div>

        {/* Next Section */}
        {next ? (
          <button
            onClick={() => {
              playClick();
              onSelectSection(next.id);
            }}
            className="w-full sm:w-auto flex items-center justify-between sm:justify-start gap-2 px-4 py-2.5 rounded-xl bg-[#1b1c28] hover:bg-[#252738] border border-[#3b3d52] text-xs font-semibold text-slate-300 hover:text-white transition-all text-right"
          >
            <div>
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Next Section</span>
              <span>{next.label}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0" />
          </button>
        ) : (
          <button
            onClick={() => { playClick(); onNavigateHome(); }}
            className="w-full sm:w-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1b1c28] hover:bg-[#252738] border border-[#3b3d52] text-xs font-semibold text-slate-300 hover:text-white transition-all"
          >
            <span>Return to Portal Hub</span>
            <Home className="w-4 h-4 text-emerald-400 shrink-0" />
          </button>
        )}

      </div>
    </div>
  );
}
