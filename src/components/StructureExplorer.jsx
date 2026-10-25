import React, { useState, useMemo } from 'react';
import { 
  MINECRAFT_STRUCTURES, 
  STRUCTURE_CATEGORIES, 
  STRUCTURE_FEATURES, 
  REMOVED_STRUCTURES, 
  GENERATION_RULES 
} from '../data/minecraftStructures';
import { 
  Compass, 
  Search, 
  MapPin, 
  Copy, 
  Check, 
  Sparkles, 
  ShieldAlert, 
  Layers, 
  Award, 
  Terminal, 
  HelpCircle, 
  History, 
  Cpu, 
  Maximize2, 
  ExternalLink 
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import confetti from 'canvas-confetti';

export default function StructureExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStructure, setActiveStructure] = useState(MINECRAFT_STRUCTURES[0]); // Trial Chambers default
  const [copiedCommand, setCopiedCommand] = useState(null);

  // Filtered structures
  const filteredStructures = useMemo(() => {
    return MINECRAFT_STRUCTURES.filter(st => {
      const matchesCategory = selectedCategory === 'All' || st.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesName = st.name.toLowerCase().includes(q);
      const matchesId = st.namespacedId.toLowerCase().includes(q);
      const matchesDim = st.dimension.toLowerCase().includes(q);
      const matchesLoot = st.lootHighlights.some(l => l.toLowerCase().includes(q));
      const matchesMobs = st.keyMobs.some(m => m.toLowerCase().includes(q));

      return matchesCategory && (matchesName || matchesId || matchesDim || matchesLoot || matchesMobs);
    });
  }, [selectedCategory, searchQuery]);

  // Copy locate command
  const handleCopyLocate = (cmd) => {
    playPop();
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(cmd);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  const handleSelectStructure = (structure) => {
    playClick();
    setActiveStructure(structure);
  };

  return (
    <section id="structures" className="py-20 bg-[#0c0d13] border-t-4 border-[#252535] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1e2538] border border-[#3b4c73] text-[11px] font-silkscreen text-[#6ea8fe]">
            <Compass className="w-3.5 h-3.5 text-[#6ea8fe] animate-pulse" />
            <span>OFFICIAL MINECRAFT JAVA WORLD STRUCTURES</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            STRUCTURES & EXPEDITION ATLAS
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Explore <strong className="text-indigo-400">Overworld underground, aboveground, ocean, Nether, and End structures</strong>. Inspect loot tables, procedural Jigsaw generation, `/locate` commands, and official advancements.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
          {STRUCTURE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { playClick(); setSelectedCategory(cat); }}
                className={`px-3 py-1.5 rounded text-xs font-silkscreen transition-all border ${
                  isSelected
                    ? 'bg-[#3b4c73] text-white border-[#6ea8fe] shadow-md scale-105'
                    : 'bg-[#151622] text-zinc-400 border-[#2b2c3d] hover:bg-[#1d1f2e] hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search & Popular Quick Jumps */}
        <div className="max-w-4xl mx-auto mb-8 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by structure name, namespace ID, loot (e.g. mace, elytra, silence), or mob..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-[#141520] border-2 border-[#2b2c3e] rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Filter Shortcuts */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono text-zinc-400">
            <span className="text-[11px] font-silkscreen text-zinc-500">POPULAR:</span>
            {['Trial Chambers', 'Ancient City', 'Stronghold', 'Woodland Mansion', 'Ocean Monument', 'Nether Fortress', 'End City'].map((stName) => {
              const matched = MINECRAFT_STRUCTURES.find(s => s.name.includes(stName));
              return (
                <button
                  key={stName}
                  onClick={() => {
                    if (matched) handleSelectStructure(matched);
                  }}
                  className="px-2 py-0.5 rounded bg-[#181824] hover:bg-[#222232] text-zinc-300 hover:text-indigo-400 border border-[#2b2b3d] text-[11px]"
                >
                  {stName}
                </button>
              );
            })}
          </div>
        </div>

        {/* Main 2-Column Explorer: Catalog on Left, Deep-Dive Showcase on Right */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          {/* Left Column: Structure Catalog Cards */}
          <div className="lg:col-span-5 mc-panel p-5 rounded-xl bg-[#171822] border-4 border-[#353648] shadow-2xl flex flex-col h-[680px]">
            <div className="flex items-center justify-between border-b-2 border-[#272838] pb-3 mb-3 shrink-0">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-indigo-400" />
                <span className="font-silkscreen text-xs text-white font-bold">STRUCTURE ARCHIVE</span>
              </div>
              <span className="text-[10px] font-mono text-indigo-400 font-semibold">
                {filteredStructures.length} STRUCTURES
              </span>
            </div>

            {/* Scrollable Structure List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 custom-scrollbar">
              {filteredStructures.map((structure) => {
                const isSelected = activeStructure.id === structure.id;
                return (
                  <div
                    key={structure.id}
                    onClick={() => handleSelectStructure(structure)}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#212538] border-[#6ea8fe] shadow-lg translate-x-1'
                        : 'bg-[#12131c] border-[#222332] hover:bg-[#1a1b28] hover:border-[#38394e]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-12 h-12 rounded bg-[#1c1d29] border border-[#2e2f42] flex items-center justify-center p-1.5 shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                        <img 
                          src={structure.image || structure.icon} 
                          alt={structure.name} 
                          className="w-full h-full object-cover rounded" 
                          style={{ imageRendering: 'pixelated' }} 
                        />
                      </div>
                      <div className="min-w-0">
                        <span className={`font-silkscreen text-xs block truncate ${isSelected ? 'text-[#6ea8fe] font-bold' : 'text-zinc-200 group-hover:text-white'}`}>
                          {structure.name}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mt-0.5 truncate">
                          <span className="text-zinc-400">{structure.dimension}</span>
                          <span>•</span>
                          <span className="truncate">{structure.category.replace('Overworld: ', '')}</span>
                        </div>
                      </div>
                    </div>

                    <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-indigo-300 border border-indigo-900/50 shrink-0">
                      {structure.difficulty.split(' ')[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-[#272838] mt-2 shrink-0 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>CLICK TO LOAD EXPEDITION INTEL</span>
              <span className="text-indigo-400 font-semibold">100% VANILLA DATA</span>
            </div>
          </div>

          {/* Right Column: Detailed Showcase & Mechanics View */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Active Structure Showcase Card */}
            <div className="mc-panel overflow-hidden rounded-xl bg-[#171824] border-4 border-[#3b3c50] shadow-2xl space-y-5">
              
              {/* Big Header Image Banner with Gradient Overlay */}
              <div className="h-64 sm:h-72 w-full relative bg-[#0e0f16] overflow-hidden border-b-4 border-[#2b2c3e]">
                <img 
                  src={activeStructure.image} 
                  alt={activeStructure.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171824] via-[#171824]/40 to-transparent" />
                
                {/* Header Information Floating Overlay */}
                <div className="absolute bottom-4 inset-x-6 flex items-end justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 rounded bg-black/80 text-cyan-400 font-mono text-[10px] border border-cyan-800">
                        {activeStructure.dimension.toUpperCase()}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-black/80 text-amber-400 font-mono text-[10px] border border-amber-800">
                        {activeStructure.difficulty}
                      </span>
                    </div>
                    <h3 className="font-silkscreen text-xl sm:text-2xl text-white font-bold mc-shadow">
                      {activeStructure.name}
                    </h3>
                    <code className="text-[11px] font-mono text-zinc-400 block mt-0.5">
                      {activeStructure.namespacedId}
                    </code>
                  </div>

                  <div className="w-12 h-12 rounded-lg bg-black/70 border border-white/20 p-2 flex items-center justify-center shrink-0">
                    <img 
                      src={activeStructure.icon} 
                      alt={activeStructure.name} 
                      className="w-8 h-8 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                  </div>
                </div>
              </div>

              {/* Body Details */}
              <div className="p-6 pt-0 space-y-5">
                
                {/* Description */}
                <p className="text-zinc-300 text-xs sm:text-sm font-mono leading-relaxed border-b border-[#292a3c] pb-4">
                  {activeStructure.description}
                </p>

                {/* Key Intel Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  
                  {/* Generation Depth & Rarity */}
                  <div className="p-3 rounded-lg bg-[#12131d] border border-[#252636] space-y-1">
                    <span className="text-[10px] font-silkscreen text-zinc-500 block">ELEVATION & RARITY:</span>
                    <div className="text-white font-semibold">{activeStructure.yLevel}</div>
                    <div className="text-zinc-400 text-[11px]">{activeStructure.rarity}</div>
                  </div>

                  {/* Locating Method & /locate Command */}
                  <div className="p-3 rounded-lg bg-[#12131d] border border-[#252636] space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-silkscreen text-zinc-500">LOCATE COMMAND (7.1):</span>
                      <button
                        onClick={() => handleCopyLocate(`/locate structure ${activeStructure.namespacedId}`)}
                        className="text-[10px] font-mono text-indigo-400 hover:text-white flex items-center gap-1"
                      >
                        {copiedCommand ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedCommand ? 'COPIED' : 'COPY'}</span>
                      </button>
                    </div>
                    <code className="text-[#4aedd9] text-[11px] block truncate bg-black/40 px-1.5 py-0.5 rounded">
                      /locate structure {activeStructure.namespacedId}
                    </code>
                    <span className="text-zinc-400 text-[10px] block truncate">{activeStructure.locatingMethod}</span>
                  </div>

                </div>

                {/* Key Mobs & Guardians */}
                <div className="space-y-2">
                  <span className="font-silkscreen text-[11px] text-zinc-400 block">KEY INHABITANTS & HOSTILES:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeStructure.keyMobs.map((mob, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#1f1624] border border-[#52256b] text-[11px] font-mono text-fuchsia-300"
                      >
                        {mob}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Loot Highlights */}
                <div className="space-y-2">
                  <span className="font-silkscreen text-[11px] text-amber-400 block">SIGNATURE LOOT & TREASURES:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeStructure.lootHighlights.map((loot, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 rounded-md bg-[#241e12] border border-[#6b5125] text-[11px] font-mono text-amber-300"
                      >
                        💎 {loot}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Advancements Unlocked */}
                {activeStructure.advancements && activeStructure.advancements.length > 0 && (
                  <div className="p-3 rounded-lg bg-[#131d1b] border border-[#254f47] space-y-1.5">
                    <span className="font-silkscreen text-[10px] text-emerald-400 block">OFFICIAL ADVANCEMENTS UNLOCKED:</span>
                    <div className="space-y-1">
                      {activeStructure.advancements.map(adv => (
                        <div key={adv.id} className="text-xs font-mono flex items-center gap-2">
                          <Award className="w-3.5 h-3.5 text-yellow-400 shrink-0" />
                          <strong className="text-white">{adv.title}:</strong>
                          <span className="text-zinc-400">{adv.desc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pro Survival Tip / Secret Feature */}
                {activeStructure.secretFeatures && (
                  <div className="p-3.5 rounded-lg bg-[#241a12] border border-[#b06f28] text-xs font-mono text-amber-200">
                    <span className="font-silkscreen text-[10px] text-amber-300 block mb-1">💡 PRO SURVIVAL MECHANIC:</span>
                    <p>{activeStructure.secretFeatures}</p>
                  </div>
                )}

              </div>

            </div>

          </div>

        </div>

        {/* Deep Dive Cards: 4. Features, 5. Removed, 6. Generation & 7. Data Values */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: 4 Structure-like features & 5 Removed structures */}
          <div className="mc-panel p-5 rounded-xl bg-[#161724] border-2 border-[#2b2c3e] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#292a3c] pb-2">
              <History className="w-4 h-4 text-orange-400" />
              <span className="font-silkscreen text-xs text-white">4 & 5. FEATURES & REMOVED</span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <strong className="text-cyan-400 font-silkscreen text-[10px] block">NATURAL FEATURES:</strong>
                {STRUCTURE_FEATURES.map(f => (
                  <div key={f.id} className="pt-1.5">
                    <span className="text-white font-bold">{f.name}:</span>{' '}
                    <span className="text-zinc-400 text-[11px]">{f.desc}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-[#232433]">
                <strong className="text-amber-400 font-silkscreen text-[10px] block">REMOVED HISTORICAL:</strong>
                {REMOVED_STRUCTURES.map((rem, i) => (
                  <div key={i} className="pt-1.5">
                    <span className="text-zinc-200 font-bold">{rem.name} ({rem.version}):</span>{' '}
                    <span className="text-zinc-400 text-[11px]">{rem.desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: 6 Generation Mechanics */}
          <div className="mc-panel p-5 rounded-xl bg-[#161724] border-2 border-[#2b2c3e] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#292a3c] pb-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <span className="font-silkscreen text-xs text-white">6. GENERATION MECHANICS</span>
            </div>

            <div className="space-y-3 text-xs font-mono text-zinc-300">
              <div>
                <strong className="text-emerald-400 block font-silkscreen text-[10px]">JIGSAW ASSEMBLY (.NBT):</strong>
                <p className="text-[11px] text-zinc-400 mt-1">{GENERATION_RULES.jigsawSystem}</p>
              </div>

              <div>
                <strong className="text-yellow-400 block font-silkscreen text-[10px]">SPACING & SEPARATION:</strong>
                <p className="text-[11px] text-zinc-400 mt-1">{GENERATION_RULES.spacingAndSeparation}</p>
              </div>

              <div className="p-2.5 rounded bg-[#10111a] border border-[#252636]">
                <span className="text-zinc-500 text-[10px] block">WORLD-GEN PIPELINE STEP:</span>
                <span className="text-white font-semibold">underground_structures & surface_structures</span>
              </div>
            </div>
          </div>

          {/* Card 3: 7 Data Values & Tags */}
          <div className="mc-panel p-5 rounded-xl bg-[#161724] border-2 border-[#2b2c3e] space-y-4">
            <div className="flex items-center gap-2 border-b border-[#292a3c] pb-2">
              <Terminal className="w-4 h-4 text-purple-400" />
              <span className="font-silkscreen text-xs text-white">7. DATA VALUES & TAGS</span>
            </div>

            <div className="space-y-3 text-xs font-mono">
              <div>
                <strong className="text-purple-400 block font-silkscreen text-[10px]">7.2 STRUCTURE TAGS:</strong>
                <div className="space-y-1 mt-1 text-[11px]">
                  <div className="text-zinc-300 font-mono"><code>#minecraft:eye_of_ender_located</code></div>
                  <div className="text-zinc-300 font-mono"><code>#minecraft:on_trial_chambers_maps</code></div>
                  <div className="text-zinc-300 font-mono"><code>#minecraft:on_woodland_explorer_maps</code></div>
                  <div className="text-zinc-300 font-mono"><code>#minecraft:on_ocean_explorer_maps</code></div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#232433]">
                <strong className="text-cyan-400 block font-silkscreen text-[10px]">LOCATE COMMAND USAGE:</strong>
                <code className="text-[#4aedd9] text-[11px] block mt-1 bg-black/40 p-2 rounded border border-white/5">
                  /locate structure minecraft:ancient_city
                </code>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
