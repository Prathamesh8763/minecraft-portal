import React, { useState, useMemo } from 'react';
import { 
  RESOURCE_PACK_CATEGORIES, 
  RESOURCE_PACKS_DATABASE, 
  PACK_FORMAT_TABLE, 
  PACK_STRUCTURE_CODE, 
  RESOURCE_PACK_HOTKEYS 
} from '../data/minecraftResourcePacks';
import { 
  Layers, 
  Eye, 
  Sparkles, 
  Shield, 
  Zap, 
  Search, 
  Flame, 
  RotateCcw, 
  Check, 
  Copy, 
  Download, 
  ExternalLink, 
  Sliders, 
  Folder, 
  FileCode, 
  Keyboard, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowUp, 
  ArrowDown, 
  Sun, 
  Moon, 
  Monitor,
  HelpCircle,
  Wand2
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import confetti from 'canvas-confetti';

export default function ResourcePackStudio() {
  const [activeSubTab, setActiveSubTab] = useState('sandbox'); // 'sandbox' | 'vault' | 'mcmeta' | 'installation'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Interactive Live Sandbox Layer States
  const [activeLayers, setActiveLayers] = useState({
    xray: false,
    glowOres: true,
    cleanGlass: true,
    darkMode: true,
    lowFire: false,
    bareBones: false,
    freshAnimations: false,
    clearWater: false
  });

  // Generator State for pack.mcmeta
  const [genPackName, setGenPackName] = useState('My Custom Tweaks');
  const [genVersionFormat, setGenVersionFormat] = useState(34); // 1.21 Tricky Trials
  const [genAuthor, setGenAuthor] = useState('Player');
  const [copiedMcmeta, setCopiedMcmeta] = useState(false);
  const [copiedPath, setCopiedPath] = useState(false);

  // Toggle specific layer in Sandbox
  const toggleLayer = (layerKey) => {
    playPop();
    setActiveLayers(prev => {
      const nextState = { ...prev, [layerKey]: !prev[layerKey] };
      return nextState;
    });
  };

  // Preset Configurations for the Sandbox
  const applyPreset = (presetName) => {
    playLevelUp();
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#38bdf8', '#a855f7', '#10b981', '#f59e0b']
    });

    if (presetName === 'xray_miner') {
      setActiveLayers({
        xray: true,
        glowOres: true,
        cleanGlass: false,
        darkMode: true,
        lowFire: false,
        bareBones: false,
        freshAnimations: false,
        clearWater: true
      });
    } else if (presetName === 'pvp_pro') {
      setActiveLayers({
        xray: false,
        glowOres: false,
        cleanGlass: true,
        darkMode: true,
        lowFire: true,
        bareBones: false,
        freshAnimations: false,
        clearWater: true
      });
    } else if (presetName === 'trailer_builder') {
      setActiveLayers({
        xray: false,
        glowOres: false,
        cleanGlass: true,
        darkMode: false,
        lowFire: false,
        bareBones: true,
        freshAnimations: true,
        clearWater: false
      });
    } else {
      // Reset Vanilla
      setActiveLayers({
        xray: false,
        glowOres: false,
        cleanGlass: false,
        darkMode: false,
        lowFire: false,
        bareBones: false,
        freshAnimations: false,
        clearWater: false
      });
    }
  };

  // Filtered Pack List
  const filteredPacks = useMemo(() => {
    return RESOURCE_PACKS_DATABASE.filter(pack => {
      const matchesCat = selectedCategory === 'All' || pack.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() ||
        pack.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pack.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pack.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pack.keyFeatures.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Generated pack.mcmeta JSON
  const generatedMcmetaCode = useMemo(() => {
    return JSON.stringify({
      pack: {
        pack_format: Number(genVersionFormat),
        description: `§d${genPackName} §7- §aVerified Pack §fby ${genAuthor}`
      }
    }, null, 2);
  }, [genPackName, genVersionFormat, genAuthor]);

  const handleCopyMcmeta = () => {
    navigator.clipboard.writeText(generatedMcmetaCode);
    playClick();
    setCopiedMcmeta(true);
    setTimeout(() => setCopiedMcmeta(false), 2000);
  };

  const handleCopyWinPath = () => {
    navigator.clipboard.writeText('%appdata%\\.minecraft\\resourcepacks');
    playClick();
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 2000);
  };

  return (
    <section id="resourcepacks" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100">
      {/* SECTION BANNER */}
      <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900/90 to-blue-950/80 border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan-900 to-blue-950 border-2 border-cyan-400/50 rounded-2xl flex items-center justify-center p-3 shadow-inner shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/icons/minecraft/diamond.svg" 
                alt="Resource Packs"
                onError={(e) => { e.currentTarget.src = '/icons/minecraft/diamond.png'; }}
                className="w-16 h-16 object-contain filter drop-shadow-[0_0_12px_rgba(56,189,248,0.7)] animate-pulse"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 bg-cyan-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-full border border-cyan-300 shadow">
              Format 34 (1.21)
            </span>
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="bg-cyan-900/60 border border-cyan-400/30 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                Texture Packs & Shaders Hub
              </span>
              <span className="bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Eye className="w-3.5 h-3.5 text-emerald-400" />
                X-Ray & Glowing Ores
              </span>
              <span className="bg-amber-950/70 border border-amber-500/30 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Trailer Style & Dark Mode
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-200 via-sky-100 to-blue-200 bg-clip-text text-transparent">
              Resource Pack Studio & Visual Vault
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              Experience the full power of Minecraft Java Edition texture customization: test live <strong className="text-cyan-300">X-Ray transparency</strong>, emissive <strong className="text-cyan-300">Glowing Ores</strong>, <strong className="text-cyan-300">Default Dark Mode</strong> UI, connected clean glass, PvP low fire, and generate error-free <code className="text-cyan-300 font-mono">pack.mcmeta</code> files for 1.21 Tricky Trials.
            </p>
          </div>
        </div>

        {/* SUB-TABS NAVIGATION */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-cyan-500/20 pt-4">
          {[
            { id: 'sandbox', label: 'Live Texture Sandbox', icon: Monitor },
            { id: 'vault', label: 'Top Community Packs (20+)', icon: Layers },
            { id: 'mcmeta', label: 'pack.mcmeta Generator & Format Table', icon: FileCode },
            { id: 'installation', label: 'Installation & Hotkeys', icon: Folder }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  setActiveSubTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400' 
                    : 'bg-slate-900/60 text-slate-300 hover:bg-cyan-900/30 hover:text-cyan-200 border border-slate-700/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-cyan-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: LIVE TEXTURE SANDBOX & LAYER STACK */}
      {/* ========================================================================= */}
      {activeSubTab === 'sandbox' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* CONTROLS & LAYER STACK (LEFT) */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-base font-bold text-cyan-300 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  Active Pack Layer Stack
                </h3>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  Top Layer Overrides
                </span>
              </div>

              {/* QUICK ONE-CLICK PRESETS */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Quick Gameplay Presets:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => applyPreset('xray_miner')}
                    className="p-2.5 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/40 text-cyan-200 text-xs font-bold text-left flex items-center gap-2 transition-all shadow-sm"
                  >
                    <Eye className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <span>X-Ray Mining Stack</span>
                  </button>
                  <button
                    onClick={() => applyPreset('pvp_pro')}
                    className="p-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-200 text-xs font-bold text-left flex items-center gap-2 transition-all shadow-sm"
                  >
                    <Flame className="w-4 h-4 text-red-400 flex-shrink-0" />
                    <span>Competitive PvP</span>
                  </button>
                  <button
                    onClick={() => applyPreset('trailer_builder')}
                    className="p-2.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/80 border border-amber-500/40 text-amber-200 text-xs font-bold text-left flex items-center gap-2 transition-all shadow-sm"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span>Trailer Aesthetic</span>
                  </button>
                  <button
                    onClick={() => applyPreset('vanilla')}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-300 text-xs font-semibold text-left flex items-center gap-2 transition-all"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <span>Default Vanilla</span>
                  </button>
                </div>
              </div>

              {/* INDIVIDUAL LAYER TOGGLES */}
              <div className="space-y-2.5">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                  Toggle Resource Pack Layers:
                </label>

                {[
                  {
                    key: 'xray',
                    name: 'X-Ray Ultimate',
                    desc: 'Renders Stone/Deepslate transparent to expose hidden veins',
                    icon: 'diamond',
                    activeColor: 'border-cyan-400 bg-cyan-950/60 text-cyan-200'
                  },
                  {
                    key: 'glowOres',
                    name: 'Visible Ores (Neon Glow)',
                    desc: 'Emissive luminescent outlines around all mineral ores',
                    icon: 'ancient_debris',
                    activeColor: 'border-amber-400 bg-amber-950/60 text-amber-200'
                  },
                  {
                    key: 'cleanGlass',
                    name: 'Connected Clean Glass',
                    desc: 'Removes center streaks; merges adjacent glass blocks',
                    icon: 'glass',
                    activeColor: 'border-sky-400 bg-sky-950/60 text-sky-200'
                  },
                  {
                    key: 'darkMode',
                    name: 'Default Dark Mode UI',
                    desc: 'Replaces 2011 light gray containers with sleek dark charcoal',
                    icon: 'coal',
                    activeColor: 'border-purple-400 bg-purple-950/60 text-purple-200'
                  },
                  {
                    key: 'lowFire',
                    name: 'Low Fire Overlay',
                    desc: 'Shrinks screen-burning flames to bottom 15% of screen',
                    icon: 'diamond_sword',
                    activeColor: 'border-orange-400 bg-orange-950/60 text-orange-200'
                  },
                  {
                    key: 'bareBones',
                    name: 'Bare Bones Trailer Style',
                    desc: 'Smooth flat colors matching official Minecraft update trailers',
                    icon: 'grass_block',
                    activeColor: 'border-emerald-400 bg-emerald-950/60 text-emerald-200'
                  },
                  {
                    key: 'clearWater',
                    name: 'Crystal Clear Water & Lava',
                    desc: 'Eliminates murky underwater fog for 100% visibility',
                    icon: 'glass',
                    activeColor: 'border-teal-400 bg-teal-950/60 text-teal-200'
                  }
                ].map(layer => {
                  const isActive = activeLayers[layer.key];
                  return (
                    <div
                      key={layer.key}
                      onClick={() => toggleLayer(layer.key)}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isActive 
                          ? `${layer.activeColor} shadow-md` 
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-black/40 flex items-center justify-center p-1">
                          <img 
                            src={`/icons/minecraft/${layer.icon}.svg`}
                            alt={layer.name}
                            onError={(e) => { e.currentTarget.src = `/icons/minecraft/${layer.icon}.png`; }}
                            className="w-6 h-6 object-contain"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm flex items-center gap-1.5">
                            {layer.name}
                            {isActive && (
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                            )}
                          </div>
                          <div className="text-[10px] text-slate-400 line-clamp-1">{layer.desc}</div>
                        </div>
                      </div>

                      <div className={`w-9 h-5 rounded-full p-0.5 transition-colors ${isActive ? 'bg-cyan-500' : 'bg-slate-700'}`}>
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isActive ? 'translate-x-4' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* LIVE IN-GAME VIEWPORT SIMULATOR (RIGHT) */}
            <div className="lg:col-span-7 bg-[#12131a] border-4 border-[#252836] rounded-2xl p-5 sm:p-6 shadow-2xl relative flex flex-col justify-between overflow-hidden">
              <div>
                {/* SIMULATOR TOP STATUS BAR */}
                <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="font-mono text-xs font-bold text-slate-300 uppercase tracking-wider">
                      Minecraft Java 1.21.4 Viewport
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-0.5 rounded border border-cyan-500/30">
                      {activeLayers.xray ? 'MODE: X-RAY ACTIVE' : 'MODE: SOLID TERRAIN'}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 bg-black/60 px-2 py-0.5 rounded border border-slate-800">
                      144 FPS
                    </span>
                  </div>
                </div>

                {/* THE SIMULATED UNDERGROUND CAVERN & BLOCKS */}
                <div className={`relative rounded-xl p-6 min-h-[340px] flex flex-col justify-between overflow-hidden border-2 transition-all duration-500 ${
                  activeLayers.xray 
                    ? 'bg-[#050608] border-cyan-500/40 shadow-[inset_0_0_30px_rgba(6,182,212,0.15)]' 
                    : activeLayers.bareBones 
                      ? 'bg-[#23252e] border-slate-700' 
                      : 'bg-[#181922] border-slate-800'
                }`}>
                  {/* Subtle 3D Depth Grid when X-Ray is ON */}
                  {activeLayers.xray && (
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#08334415_1px,transparent_1px),linear-gradient(to_bottom,#08334415_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
                  )}

                  {/* LOW FIRE OVERLAY SIMULATION */}
                  {activeLayers.lowFire ? (
                    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-orange-600/60 to-transparent pointer-events-none flex items-center justify-center font-mono text-[10px] text-amber-200 font-bold animate-pulse">
                      🔥 Low Fire: 15% Screen Height (Crosshair Clear)
                    </div>
                  ) : (
                    null
                  )}

                  {/* CAVERN CEILING STONE / WIREFRAME */}
                  <div className="flex justify-between items-center z-10">
                    <div className="flex gap-2">
                      {[1, 2, 3, 4].map(i => (
                        <div 
                          key={i} 
                          className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-mono font-bold transition-all ${
                            activeLayers.xray 
                              ? 'border border-cyan-500/20 bg-cyan-950/10 text-cyan-500/40 border-dashed' 
                              : activeLayers.bareBones
                                ? 'bg-[#505463] text-slate-300'
                                : 'bg-[#373946] border border-[#484a5a] text-slate-400'
                          }`}
                        >
                          {activeLayers.xray ? 'STONE' : 'Stone'}
                        </div>
                      ))}
                    </div>

                    {/* WATER / GLASS DEMO BLOCK */}
                    <div className={`p-2 rounded-xl border flex items-center gap-2 ${
                      activeLayers.cleanGlass 
                        ? 'bg-sky-400/10 border-sky-400/80 text-sky-200 shadow-[0_0_12px_rgba(56,189,248,0.3)]' 
                        : 'bg-slate-800/80 border-slate-600 text-slate-400'
                    }`}>
                      <img 
                        src="/icons/minecraft/glass.svg" 
                        alt="Glass" 
                        onError={(e) => { e.currentTarget.src = '/icons/minecraft/glass.png'; }}
                        className="w-6 h-6 object-contain"
                      />
                      <span className="text-[11px] font-mono font-semibold">
                        {activeLayers.cleanGlass ? 'Seamless Glass' : 'Streaked Glass'}
                      </span>
                    </div>
                  </div>

                  {/* CAVERN CENTER: GLOWING ORES VEIN IN 3D SPACE */}
                  <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-4 z-10">
                    {/* DIAMOND ORE BLOCK */}
                    <div className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                      activeLayers.glowOres 
                        ? 'border-2 border-cyan-400 bg-cyan-950/80 shadow-[0_0_20px_rgba(34,211,238,0.6)] animate-pulse scale-105' 
                        : activeLayers.xray
                          ? 'border border-cyan-500/60 bg-black/80'
                          : 'bg-[#292a36] border border-[#3f4153]'
                    }`}>
                      <img 
                        src="/icons/minecraft/diamond.svg" 
                        alt="Diamond" 
                        onError={(e) => { e.currentTarget.src = '/icons/minecraft/diamond.png'; }}
                        className={`w-10 h-10 object-contain drop-shadow ${activeLayers.glowOres ? 'filter drop-shadow-[0_0_8px_#22d3ee]' : ''}`}
                      />
                      <span className={`text-[11px] font-mono font-bold mt-1.5 ${activeLayers.glowOres ? 'text-cyan-300' : 'text-slate-300'}`}>
                        Diamond Ore
                      </span>
                      {activeLayers.glowOres && (
                        <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950 px-1 rounded">EMISSIVE</span>
                      )}
                    </div>

                    {/* ANCIENT DEBRIS BLOCK */}
                    <div className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                      activeLayers.glowOres 
                        ? 'border-2 border-amber-400 bg-amber-950/80 shadow-[0_0_20px_rgba(251,191,36,0.6)] animate-pulse scale-105' 
                        : activeLayers.xray
                          ? 'border border-amber-500/60 bg-black/80'
                          : 'bg-[#292a36] border border-[#3f4153]'
                    }`}>
                      <img 
                        src="/icons/minecraft/ancient_debris.svg" 
                        alt="Ancient Debris" 
                        onError={(e) => { e.currentTarget.src = '/icons/minecraft/ancient_debris.png'; }}
                        className={`w-10 h-10 object-contain drop-shadow ${activeLayers.glowOres ? 'filter drop-shadow-[0_0_8px_#fbbf24]' : ''}`}
                      />
                      <span className={`text-[11px] font-mono font-bold mt-1.5 ${activeLayers.glowOres ? 'text-amber-300' : 'text-slate-300'}`}>
                        Ancient Debris
                      </span>
                      {activeLayers.glowOres && (
                        <span className="text-[9px] font-mono text-amber-400 bg-amber-950 px-1 rounded">Y = 15 VEIN</span>
                      )}
                    </div>

                    {/* EMERALD ORE BLOCK */}
                    <div className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                      activeLayers.glowOres 
                        ? 'border-2 border-emerald-400 bg-emerald-950/80 shadow-[0_0_20px_rgba(52,211,153,0.6)] animate-pulse scale-105' 
                        : activeLayers.xray
                          ? 'border border-emerald-500/60 bg-black/80'
                          : 'bg-[#292a36] border border-[#3f4153]'
                    }`}>
                      <img 
                        src="/icons/minecraft/emerald.svg" 
                        alt="Emerald" 
                        onError={(e) => { e.currentTarget.src = '/icons/minecraft/emerald.png'; }}
                        className={`w-10 h-10 object-contain drop-shadow ${activeLayers.glowOres ? 'filter drop-shadow-[0_0_8px_#34d399]' : ''}`}
                      />
                      <span className={`text-[11px] font-mono font-bold mt-1.5 ${activeLayers.glowOres ? 'text-emerald-300' : 'text-slate-300'}`}>
                        Emerald Ore
                      </span>
                      {activeLayers.glowOres && (
                        <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950 px-1 rounded">MOUNTAIN</span>
                      )}
                    </div>

                    {/* REDSTONE ORE BLOCK */}
                    <div className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
                      activeLayers.glowOres 
                        ? 'border-2 border-red-500 bg-red-950/80 shadow-[0_0_20px_rgba(239,68,68,0.6)] animate-pulse scale-105' 
                        : activeLayers.xray
                          ? 'border border-red-500/60 bg-black/80'
                          : 'bg-[#292a36] border border-[#3f4153]'
                    }`}>
                      <img 
                        src="/icons/minecraft/redstone.svg" 
                        alt="Redstone" 
                        onError={(e) => { e.currentTarget.src = '/icons/minecraft/redstone.png'; }}
                        className={`w-10 h-10 object-contain drop-shadow ${activeLayers.glowOres ? 'filter drop-shadow-[0_0_8px_#ef4444]' : ''}`}
                      />
                      <span className={`text-[11px] font-mono font-bold mt-1.5 ${activeLayers.glowOres ? 'text-red-300' : 'text-slate-300'}`}>
                        Redstone Ore
                      </span>
                      {activeLayers.glowOres && (
                        <span className="text-[9px] font-mono text-red-400 bg-red-950 px-1 rounded">LIT ORE</span>
                      )}
                    </div>
                  </div>

                  {/* DEEPSLATE SURROUNDING BLOCKS */}
                  <div className="flex justify-between items-center z-10 text-xs font-mono">
                    <span className="text-slate-500">Subterranean Depth: Y = -58</span>
                    <span className="text-cyan-400">
                      {activeLayers.xray ? 'Visibility: 100% Unobstructed' : 'Visibility: Standard Lighting'}
                    </span>
                  </div>
                </div>

                {/* THE IN-GAME HOTBAR HUD (DARK MODE VS VANILLA) */}
                <div className="mt-5">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
                    <span>HUD Style: {activeLayers.darkMode ? 'Default Dark Mode (Charcoal)' : 'Classic 2011 Vanilla (Gray)'}</span>
                    <button 
                      onClick={() => toggleLayer('darkMode')}
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      Toggle Dark Mode
                    </button>
                  </div>

                  <div className={`p-2 rounded-xl border-2 flex items-center justify-center gap-2 transition-all ${
                    activeLayers.darkMode 
                      ? 'bg-[#181920] border-[#37394c] shadow-lg' 
                      : 'bg-[#c6c6c6] border-[#ffffff] text-slate-800'
                  }`}>
                    {[
                      { icon: 'diamond_sword', label: '1' },
                      { icon: 'diamond_pickaxe', label: '2' },
                      { icon: 'the_mace', label: '3' },
                      { icon: 'bow', label: '4' },
                      { icon: 'golden_carrot', label: '5' },
                      { icon: 'torch', label: '6' },
                      { icon: 'water_bucket', label: '7' },
                      { icon: 'ender_pearl', label: '8' },
                      { icon: 'totem_of_undying', label: '9' }
                    ].map((slot, idx) => (
                      <div 
                        key={idx}
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center relative border transition-all ${
                          idx === 0 
                            ? 'border-cyan-400 bg-cyan-950/40 shadow' 
                            : activeLayers.darkMode 
                              ? 'border-[#2d2f3e] bg-[#121318]' 
                              : 'border-[#8b8b8b] bg-[#8b8b8b]/20'
                        }`}
                      >
                        <img 
                          src={`/icons/minecraft/${slot.icon}.svg`}
                          alt={slot.icon}
                          onError={(e) => { e.currentTarget.src = `/icons/minecraft/${slot.icon}.png`; }}
                          className="w-6 h-6 object-contain"
                        />
                        <span className={`absolute bottom-0.5 right-1 text-[9px] font-mono font-bold ${
                          activeLayers.darkMode ? 'text-slate-400' : 'text-slate-700'
                        }`}>
                          {slot.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: TOP COMMUNITY PACKS VAULT */}
      {/* ========================================================================= */}
      {activeSubTab === 'vault' && (
        <div className="space-y-6">
          {/* SEARCH & CATEGORY FILTER */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search packs by name, features, or resolution (e.g. X-Ray, Glow Ores, Bare Bones, 32x)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl"
                >
                  Clear Search
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {RESOURCE_PACK_CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCategory === cat 
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' 
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* PACKS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPacks.map(pack => (
              <div 
                key={pack.id}
                className="bg-slate-900/90 border border-slate-700/70 hover:border-cyan-500/60 rounded-2xl p-5 shadow-xl hover:shadow-cyan-900/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-950 border border-cyan-500/30 rounded-xl flex items-center justify-center p-2 shadow-inner">
                        <img 
                          src={`/icons/minecraft/${pack.primaryIcon}.svg`}
                          alt={pack.name}
                          onError={(e) => { e.currentTarget.src = `/icons/minecraft/${pack.primaryIcon}.png`; }}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100 text-base">{pack.name}</h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <span>by {pack.author}</span>
                          <span>•</span>
                          <span className="text-cyan-400 font-mono font-semibold">{pack.resolution}</span>
                        </div>
                      </div>
                    </div>

                    <span className="bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[10px] font-mono px-2 py-0.5 rounded">
                      {pack.badge}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 font-medium italic mb-2 text-cyan-200/90">
                    "{pack.tagline}"
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {pack.description}
                  </p>

                  {/* KEY FEATURES LIST */}
                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1.5 mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      Key Pack Features:
                    </span>
                    {pack.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-300">
                        <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Performance Impact:</span>
                    <span className="text-emerald-400 font-mono font-semibold">{pack.fpsImpact}</span>
                  </div>

                  {pack.recommendedMods.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1 text-[11px]">
                      <span className="text-slate-400">Pair With:</span>
                      {pack.recommendedMods.map((mod, idx) => (
                        <span key={idx} className="bg-slate-800 text-slate-300 text-[10px] px-1.5 py-0.5 rounded">
                          {mod}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <a
                      href={pack.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold py-2 rounded-xl shadow transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Get on Modrinth
                    </a>
                    <button
                      onClick={() => {
                        playPop();
                        setActiveSubTab('sandbox');
                        if (pack.id.includes('xray')) applyPreset('xray_miner');
                        else if (pack.id.includes('fire') || pack.id.includes('sword')) applyPreset('pvp_pro');
                        else if (pack.id.includes('bare')) applyPreset('trailer_builder');
                      }}
                      className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl border border-slate-700 transition-all"
                      title="Test in Interactive Sandbox"
                    >
                      Test
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: pack.mcmeta GENERATOR & FORMAT VERSION TABLE */}
      {/* ========================================================================= */}
      {activeSubTab === 'mcmeta' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* pack.mcmeta INTERACTIVE BUILDER (LEFT) */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
                <FileCode className="w-5 h-5 text-cyan-400" />
                <h4 className="text-lg font-bold text-slate-100">pack.mcmeta Generator</h4>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Every resource pack requires a valid <code className="text-cyan-300 font-mono">pack.mcmeta</code> JSON file in the root folder. Use this generator to match your target Minecraft version with zero syntax errors.
              </p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pack Title / Name:</label>
                  <input 
                    type="text"
                    value={genPackName}
                    onChange={(e) => setGenPackName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Minecraft Version (pack_format):</label>
                  <select
                    value={genVersionFormat}
                    onChange={(e) => setGenVersionFormat(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  >
                    <option value={46}>1.21.4 (Winter Drop) — Format 46</option>
                    <option value={34}>1.21 – 1.21.1 (Tricky Trials) — Format 34</option>
                    <option value={32}>1.20.5 – 1.20.6 (Components) — Format 32</option>
                    <option value={15}>1.20 – 1.20.1 (Trails & Tales) — Format 15</option>
                    <option value={9}>1.19 – 1.19.2 (Wild Update) — Format 9</option>
                    <option value={8}>1.18 – 1.18.2 (Caves & Cliffs II) — Format 8</option>
                    <option value={6}>1.16.2 – 1.16.5 (Nether Update) — Format 6</option>
                    <option value={1}>1.8.9 (Legacy PvP) — Format 1</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Author Name:</label>
                  <input 
                    type="text"
                    value={genAuthor}
                    onChange={(e) => setGenAuthor(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-100 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* CODE OUTPUT */}
              <div className="relative mt-4">
                <pre className="bg-black/80 border border-slate-800 rounded-xl p-4 text-xs font-mono text-cyan-300 overflow-x-auto">
                  {generatedMcmetaCode}
                </pre>
                <button
                  onClick={handleCopyMcmeta}
                  className="absolute top-3 right-3 flex items-center gap-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs px-3 py-1.5 rounded-lg shadow transition-all font-semibold"
                >
                  {copiedMcmeta ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedMcmeta ? 'Copied JSON!' : 'Copy Code'}
                </button>
              </div>
            </div>

            {/* DIRECTORY ANATOMY TREE (RIGHT) */}
            <div className="lg:col-span-6 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 border-b border-slate-800 pb-3 mb-4">
                  <Folder className="w-5 h-5 text-amber-400" />
                  <h4 className="text-lg font-bold text-slate-100">Standard Directory Anatomy</h4>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mb-3">
                  A functional resource pack requires the exact folder hierarchy below. File and folder names in modern Java Edition <strong>must be strictly lowercase</strong> without spaces.
                </p>
                <pre className="bg-black/70 border border-slate-800 rounded-xl p-4 text-[11px] font-mono text-emerald-300/90 leading-relaxed overflow-x-auto">
                  {PACK_STRUCTURE_CODE.folderTree}
                </pre>
              </div>
            </div>
          </div>

          {/* HISTORICAL PACK_FORMAT VERSION TABLE */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
            <h4 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              pack_format History Across Minecraft Versions (1.6 to 1.21.4)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 font-mono">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Minecraft Version</th>
                    <th className="p-3">pack_format</th>
                    <th className="p-3">Release Year</th>
                    <th className="p-3">Key Technical Updates</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {PACK_FORMAT_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-cyan-300">{row.version}</td>
                      <td className="p-3 text-purple-300 font-bold">{row.packFormat}</td>
                      <td className="p-3 text-slate-400">{row.release}</td>
                      <td className="p-3 text-slate-300">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: INSTALLATION & IN-GAME HOTKEYS */}
      {/* ========================================================================= */}
      {activeSubTab === 'installation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* INSTALLATION PATHS */}
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Folder className="w-5 h-5 text-cyan-400" />
                How to Install Resource Packs
              </h4>
              <ol className="text-xs text-slate-300 space-y-3 list-decimal list-inside leading-relaxed">
                <li>Download your chosen pack <code className="text-cyan-300">.zip</code> file (do not unzip unless modifying).</li>
                <li>Launch Minecraft Java Edition and open <strong>Options... → Resource Packs...</strong></li>
                <li>Click the <strong>Open Pack Folder</strong> button at the bottom left.</li>
                <li>Drag and drop the <code className="text-cyan-300">.zip</code> into the opened folder.</li>
                <li>In Minecraft, move the pack from <strong>Available</strong> to <strong>Selected</strong> (right column).</li>
              </ol>

              {/* WINDOWS RUN SHORTCUT */}
              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                <span className="text-[11px] font-bold text-slate-400 block mb-1">
                  Windows Quick Run Path (Win + R):
                </span>
                <div className="flex items-center justify-between font-mono text-xs text-cyan-300 bg-black/60 p-2 rounded border border-slate-800">
                  <code>%appdata%\.minecraft\resourcepacks</code>
                  <button
                    onClick={handleCopyWinPath}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-2 py-1 rounded flex items-center gap-1"
                  >
                    {copiedPath ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
                    {copiedPath ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            {/* IN-GAME RELOAD HOTKEYS */}
            <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-4">
              <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Keyboard className="w-5 h-5 text-purple-400" />
                In-Game Debug Hotkeys (No Restart Needed!)
              </h4>
              <p className="text-xs text-slate-400">
                You never need to relaunch Minecraft to see texture edits or fix sound bugs:
              </p>

              <div className="space-y-2.5">
                {RESOURCE_PACK_HOTKEYS.map((hk, idx) => (
                  <div key={idx} className="bg-slate-950/70 p-3 rounded-xl border border-slate-800 flex items-start gap-3">
                    <span className="bg-purple-950 text-purple-300 border border-purple-500/40 text-xs font-mono font-bold px-2 py-1 rounded flex-shrink-0">
                      {hk.key}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {hk.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* THE "RED INCOMPATIBLE VERSION" FIX */}
          <div className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-6 shadow-xl">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-base font-bold text-amber-200">
                  How to Fix the "Made for an older/newer version" Red Warning
                </h5>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                  When a resource pack shows red text warning that it was made for another Minecraft version, you can almost always safely click <strong>Yes</strong> to load it anyway! Over 95% of block and item textures are completely backwards-compatible. To permanently eliminate the warning, open the pack's <code className="text-amber-300 font-mono">pack.mcmeta</code> and update <code className="text-amber-300 font-mono">pack_format</code> to your current version (e.g. <code className="text-amber-300 font-mono">34</code> for 1.21).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
