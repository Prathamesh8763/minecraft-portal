import React, { useState, useMemo } from 'react';
import { 
  SPAWNING_RULES, 
  BEHAVIOR_MECHANICS, 
  ALL_MOBS_CATALOG, 
  MOB_CLASSIFICATIONS_DATA, 
  KNOCKBACK_RESISTANCE_TABLE, 
  DAMAGE_DEALT_MATRIX, 
  MOB_ADVANCEMENTS, 
  MOB_HISTORY_TIMELINE 
} from '../data/minecraftMobsExpanded';
import { 
  ShieldAlert, 
  Search, 
  Heart, 
  Skull, 
  Sparkles, 
  Swords, 
  Moon, 
  Sun, 
  Brain, 
  Compass, 
  Trophy, 
  History, 
  Layers, 
  Zap, 
  Shield, 
  Info, 
  Check, 
  AlertTriangle, 
  RotateCcw, 
  ExternalLink,
  Sliders,
  Award
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import confetti from 'canvas-confetti';

const WEAPONS_LOADOUT = [
  { id: 'netherite_sword_sharp5', name: 'Netherite Sword (Sharpness V)', damage: 11.0, icon: 'diamond_sword' },
  { id: 'the_mace_density5', name: 'The Mace (Density V 10m Smash)', damage: 32.5, icon: 'the_mace' },
  { id: 'diamond_axe_crit', name: 'Diamond Axe (Sprint Crit)', damage: 13.5, icon: 'diamond_axe' },
  { id: 'bow_power5', name: 'Bow (Power V Full Draw)', damage: 15.0, icon: 'bow' },
  { id: 'trident_impaling5', name: 'Trident (Impaling V in Rain)', damage: 21.5, icon: 'trident' },
  { id: 'bare_fist', name: 'Bare Hand (Punch)', damage: 1.0, icon: 'feather' }
];

export default function MobBestiary() {
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'simulator' | 'spawning' | 'behavior' | 'combat_stats' | 'advancements'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Combat Simulator State
  const [simSelectedMob, setSimSelectedMob] = useState(ALL_MOBS_CATALOG.find(m => m.id === 'the_warden') || ALL_MOBS_CATALOG[0]);
  const [simWeapon, setSimWeapon] = useState(WEAPONS_LOADOUT[1]); // The Mace Density V
  const [simDifficulty, setSimDifficulty] = useState('Normal'); // Easy | Normal | Hard

  const categories = [
    'All',
    '3.1 Passive mobs',
    '3.2 Neutral mobs',
    '3.3 Hostile mobs',
    '3.3.1 Boss mobs',
    '3.4 Upcoming mobs',
    '3.5 Creators or Education mobs',
    '3.6 China Edition exclusive mobs',
    '3.7 Unused mobs',
    '3.8 Similar entities',
    '3.9 Removed mobs',
    '3.10 Joke mobs',
    '3.11 Unimplemented mobs'
  ];

  // Filtered Catalog Mobs
  const filteredMobs = useMemo(() => {
    return ALL_MOBS_CATALOG.filter(mob => {
      const matchesCategory = selectedCategory === 'All' || mob.category === selectedCategory;
      const matchesSearch = !searchQuery.trim() ||
        mob.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mob.dimension.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mob.drops.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mob.desc.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Calculate combat simulator hits to kill
  const hitsToKill = useMemo(() => {
    const rawHp = parseInt(simSelectedMob.health.replace(/[^0-9]/g, ''), 10) || 20;
    const hits = Math.ceil(rawHp / simWeapon.damage);
    return { rawHp, hits };
  }, [simSelectedMob, simWeapon]);

  return (
    <section id="mobs" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100">
      {/* SECTION BANNER */}
      <div className="bg-gradient-to-r from-red-950/80 via-slate-900/90 to-purple-950/80 border-2 border-red-500/40 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="relative group">
            <div className="w-24 h-24 bg-gradient-to-br from-red-900 to-slate-950 border-2 border-red-400/50 rounded-2xl flex items-center justify-center p-3 shadow-inner shadow-red-500/20 group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/icons/minecraft/warden.svg" 
                alt="Mob Bestiary"
                onError={(e) => { e.currentTarget.src = '/icons/minecraft/creeper_head.png'; }}
                className="w-16 h-16 object-contain filter drop-shadow-[0_0_12px_rgba(239,68,68,0.7)] animate-pulse"
              />
            </div>
            <span className="absolute -bottom-2 -right-2 bg-red-500 text-slate-950 text-xs font-bold px-2 py-0.5 rounded-full border border-red-300 shadow">
              40+ Mobs
            </span>
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="bg-red-900/60 border border-red-400/30 text-red-300 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                <Skull className="w-3.5 h-3.5 text-red-400" />
                Hostile, Boss & Neutral Ecology
              </span>
              <span className="bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Moon className="w-3.5 h-3.5 text-purple-400" />
                Light Level 0 Spawning Rules
              </span>
              <span className="bg-amber-950/70 border border-amber-500/30 text-amber-300 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Swords className="w-3.5 h-3.5 text-amber-400" />
                Damage & Knockback Matrices
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-red-200 via-orange-100 to-amber-200 bg-clip-text text-transparent">
              Minecraft Creature Bestiary & Mob Ecology
            </h2>
            <p className="mt-2 text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
              The definitive Java Edition wildlife and monster compendium: covers natural 20-tick spawning spheres, 128-block instant despawning, AI pathfinding and hazard avoidance, classifications (Undead, Arthropods, Illagers), knockback resistance, difficulty-scaled damage, and full coverage of <strong>all Wiki sections (3.1 to 3.11)</strong> including <strong className="text-red-300">The Creaking (1.21.4)</strong>, <strong className="text-red-300">The Breeze</strong>, <strong className="text-red-300">The Bogged</strong>, unused entities, and mob vote rejects.
            </p>
          </div>
        </div>

        {/* SUB-TABS NAVIGATION */}
        <div className="mt-8 flex flex-wrap gap-2 border-t border-red-500/20 pt-4">
          {[
            { id: 'catalog', label: 'All Mobs Catalog (3.1 - 3.11)', icon: Skull },
            { id: 'simulator', label: 'Combat & Weapon Simulator (9)', icon: Swords },
            { id: 'spawning', label: 'Spawning & Despawning (1 & 1.1)', icon: Moon },
            { id: 'behavior', label: 'AI Behavior & Pathfinding (2)', icon: Brain },
            { id: 'combat_stats', label: 'Knockback, Damage & Classes (4 - 6)', icon: Shield },
            { id: 'advancements', label: 'Advancements & History (7 - 10)', icon: Trophy }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playClick();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 ${
                  isActive 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/30 border border-red-400' 
                    : 'bg-slate-900/60 text-slate-300 hover:bg-red-900/30 hover:text-red-200 border border-slate-700/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-red-400'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-TAB 1: COMPLETE MOB CATALOG (3.1 - 3.11) */}
      {/* ========================================================================= */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* SEARCH & CATEGORY FILTER */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search mobs by name, drops, dimension, or version (e.g. Breeze, Bogged, Warden, Creaking, Giant)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-red-500"
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

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    playClick();
                    setSelectedCategory(cat);
                  }}
                  className={`px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold transition-all ${
                    selectedCategory === cat 
                      ? 'bg-red-600 text-white shadow-md shadow-red-600/30' 
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat.replace(/^3\.\d+(\.\d+)?\s*/, '')}
                </button>
              ))}
            </div>
          </div>

          {/* MOBS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMobs.map(mob => (
              <div 
                key={mob.id}
                className="bg-slate-900/90 border border-slate-700/70 hover:border-red-500/60 rounded-2xl p-5 shadow-xl hover:shadow-red-900/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-950 border border-red-500/30 rounded-xl flex items-center justify-center p-2 shadow-inner">
                        <img 
                          src={`/icons/minecraft/${mob.icon}.svg`}
                          alt={mob.name}
                          onError={(e) => { e.currentTarget.src = `/icons/minecraft/${mob.icon}.png`; }}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100 text-base">{mob.name}</h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                          <span className={`font-semibold ${
                            mob.type === 'Hostile' || mob.type === 'Boss' ? 'text-red-400' :
                            mob.type === 'Neutral' ? 'text-amber-400' :
                            mob.type === 'Upcoming' ? 'text-purple-400' : 'text-emerald-400'
                          }`}>
                            {mob.type}
                          </span>
                          <span>•</span>
                          <span>{mob.version}</span>
                        </div>
                      </div>
                    </div>

                    <span className="bg-red-950/80 border border-red-500/30 text-red-300 text-[10px] font-mono px-2 py-0.5 rounded">
                      {mob.health}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {mob.desc}
                  </p>

                  <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Dimension / Biome:</span>
                      <span className="text-slate-200 font-medium text-right truncate max-w-[180px]">{mob.dimension}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Classification:</span>
                      <span className="text-purple-300 font-medium">{mob.classification}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Knockback Res:</span>
                      <span className="text-amber-300 font-mono font-semibold">{mob.knockbackRes}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Primary Drops:</span>
                      <span className="text-emerald-300 font-medium text-right truncate max-w-[180px]">{mob.drops}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between mt-3">
                  <div className="text-[11px] text-slate-400">
                    <span className="text-red-400 font-semibold">Damage: </span>
                    <span className="text-slate-300 truncate max-w-[180px] inline-block align-bottom">{mob.damage}</span>
                  </div>
                  <button
                    onClick={() => {
                      playPop();
                      setSimSelectedMob(mob);
                      setActiveTab('simulator');
                    }}
                    className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1 bg-red-950/60 px-2 py-1 rounded border border-red-500/30"
                  >
                    Test in Arena →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 2: INTERACTIVE COMBAT & WEAPON SIMULATOR (SECTION 9) */}
      {/* ========================================================================= */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* WEAPON & DIFFICULTY SETUP (LEFT) */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl space-y-5">
              <h3 className="text-base font-bold text-red-300 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Swords className="w-4 h-4 text-red-400" />
                Combat Loadout Simulator
              </h3>

              {/* Weapon Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  1. Select Attack Weapon:
                </label>
                <div className="space-y-2">
                  {WEAPONS_LOADOUT.map(wp => (
                    <div
                      key={wp.id}
                      onClick={() => {
                        playClick();
                        setSimWeapon(wp);
                      }}
                      className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        simWeapon.id === wp.id 
                          ? 'bg-red-950/80 border-red-400 text-red-200 shadow-md' 
                          : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={`/icons/minecraft/${wp.icon}.svg`}
                          alt={wp.name}
                          onError={(e) => { e.currentTarget.src = `/icons/minecraft/${wp.icon}.png`; }}
                          className="w-7 h-7 object-contain"
                        />
                        <span className="text-xs font-bold text-slate-200">{wp.name}</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-amber-400">
                        {wp.damage} DMG
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* World Difficulty */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  2. World Difficulty:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Easy', 'Normal', 'Hard'].map(diff => (
                    <button
                      key={diff}
                      onClick={() => {
                        playClick();
                        setSimDifficulty(diff);
                      }}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all ${
                        simDifficulty === diff 
                          ? 'bg-red-600 text-white border-red-400 shadow-md' 
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* COMBAT ARENA RESULTS (RIGHT) */}
            <div className="lg:col-span-7 bg-[#151218] border-4 border-[#352538] rounded-2xl p-6 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b-2 border-slate-800 pb-3 mb-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-950 border border-red-500/40 rounded-xl flex items-center justify-center p-2">
                      <img 
                        src={`/icons/minecraft/${simSelectedMob.icon}.svg`}
                        alt={simSelectedMob.name}
                        onError={(e) => { e.currentTarget.src = `/icons/minecraft/${simSelectedMob.icon}.png`; }}
                        className="w-7 h-7 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-base">{simSelectedMob.name}</h4>
                      <span className="text-[11px] text-slate-400 font-mono">Classification: {simSelectedMob.classification}</span>
                    </div>
                  </div>

                  <span className="bg-red-950 border border-red-500/40 text-red-300 font-mono text-xs px-2.5 py-1 rounded">
                    {simSelectedMob.health}
                  </span>
                </div>

                {/* HIT CALCULATION CARD */}
                <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Weapon Strike Power:</span>
                    <span className="text-sm font-bold text-amber-300 font-mono">{simWeapon.damage} HP per hit</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">Target Knockback Resistance:</span>
                    <span className="text-sm font-bold text-purple-300 font-mono">{simSelectedMob.knockbackRes}</span>
                  </div>

                  <div className="p-4 rounded-xl bg-red-950/40 border border-red-500/40 text-center">
                    <span className="text-xs text-red-300 font-medium block mb-1">STRIKES REQUIRED TO DEFEAT:</span>
                    <span className="text-4xl font-extrabold text-red-400 font-mono tracking-tight">
                      {hitsToKill.hits} {hitsToKill.hits === 1 ? 'HIT' : 'HITS'}
                    </span>
                    <span className="text-[11px] text-slate-400 block mt-1">
                      (Total target health: {hitsToKill.rawHp} HP using {simWeapon.name})
                    </span>
                  </div>

                  {/* MOB COUNTER-ATTACK DAMAGE */}
                  <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-800 text-xs">
                    <span className="font-bold text-slate-300 block mb-1">Mob Retaliatory Damage ({simDifficulty} Mode):</span>
                    <p className="text-slate-400 leading-relaxed font-mono">
                      {simSelectedMob.damage}
                    </p>
                  </div>
                </div>
              </div>

              {/* QUICK MOB SELECTOR BAR */}
              <div className="mt-5 pt-4 border-t border-slate-800">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                  Select Another Mob to Test:
                </span>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {ALL_MOBS_CATALOG.slice(0, 10).map(m => (
                    <button
                      key={m.id}
                      onClick={() => {
                        playPop();
                        setSimSelectedMob(m);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border flex items-center gap-1.5 ${
                        simSelectedMob.id === m.id 
                          ? 'bg-red-600 text-white border-red-400' 
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <img 
                        src={`/icons/minecraft/${m.icon}.svg`}
                        alt={m.name}
                        onError={(e) => { e.currentTarget.src = `/icons/minecraft/${m.icon}.png`; }}
                        className="w-4 h-4 object-contain"
                      />
                      <span>{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 3: SPAWNING & DESPAWNING MECHANICS (SECTION 1 & 1.1) */}
      {/* ========================================================================= */}
      {activeTab === 'spawning' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-6">
            <div>
              <h3 className="text-xl font-bold text-red-200 mb-2 flex items-center gap-2">
                <Moon className="w-5 h-5 text-red-400" />
                Section 1 & 1.1: Spawning Spheres & Despawning Algorithm
              </h3>
              <p className="text-sm text-slate-400">
                Hostile mob spawning is evaluated every game tick (1/20th second) within a 128-block spherical radius around each player.
              </p>
            </div>

            {/* 4 DISTANCE SPHERES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {SPAWNING_RULES.distanceSpheres.map((sphere, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-red-400 block mb-1">
                      {sphere.range}
                    </span>
                    <h5 className="font-bold text-slate-200 text-sm mb-2">{sphere.title}</h5>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {sphere.rule}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* LIGHT LEVEL 0 RULE & MOB CAPS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                  <Sun className="w-4 h-4 text-amber-400" />
                  Java 1.18+ Light Level 0 Rule
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {SPAWNING_RULES.lightLevelRule}
                </p>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  Vanilla Mob Caps (Formula: 70 × Chunks / 289)
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-red-400 font-bold block">Hostile:</span>
                    <span className="text-slate-300">{SPAWNING_RULES.mobCaps.hostile}</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-emerald-400 font-bold block">Passive:</span>
                    <span className="text-slate-300">{SPAWNING_RULES.mobCaps.passive}</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-blue-400 font-bold block">Water Undergr.:</span>
                    <span className="text-slate-300">{SPAWNING_RULES.mobCaps.waterUnderground}</span>
                  </div>
                  <div className="bg-slate-900 p-2 rounded border border-slate-800">
                    <span className="text-amber-400 font-bold block">Axolotls:</span>
                    <span className="text-slate-300">{SPAWNING_RULES.mobCaps.axolotls}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PERSISTENCE EXEMPTIONS */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Despawn Immunity Rules (Persistent Mobs):
              </span>
              <ul className="text-xs text-slate-400 space-y-1.5">
                {SPAWNING_RULES.persistentExemptions.map((ex, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 4: BEHAVIOR & PATHFINDING (SECTION 2) */}
      {/* ========================================================================= */}
      {activeTab === 'behavior' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BEHAVIOR_MECHANICS.map((beh, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-red-200 mb-3 flex items-center gap-2">
                    <Brain className="w-4 h-4 text-red-400" />
                    {beh.category}
                  </h4>
                  <div className="space-y-2.5">
                    {beh.rules.map((r, i) => (
                      <div key={i} className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                        {r}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 5: COMBAT STATS, KNOCKBACK & CLASSIFICATIONS (SECTIONS 4 - 6) */}
      {/* ========================================================================= */}
      {activeTab === 'combat_stats' && (
        <div className="space-y-8">
          {/* SECTION 4: CLASSIFICATIONS */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
            <h4 className="text-lg font-bold text-red-200 mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-red-400" />
              Section 4: Mob Classifications & Combat Vulnerabilities
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOB_CLASSIFICATIONS_DATA.map((cls, idx) => (
                <div key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                  <div>
                    <h5 className="font-bold text-slate-100 text-sm mb-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-400"></span>
                      {cls.name}
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed mb-3">
                      {cls.mechanics}
                    </p>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono truncate">
                    Members: {cls.members.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 5: KNOCKBACK RESISTANCE */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
            <h4 className="text-lg font-bold text-purple-200 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-400" />
              Section 5: Innate Knockback Resistance
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Entity</th>
                    <th className="p-3">Knockback Resistance</th>
                    <th className="p-3">Combat Implication</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {KNOCKBACK_RESISTANCE_TABLE.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-red-300">{row.mob}</td>
                      <td className="p-3 text-purple-300 font-bold">{row.resistance}</td>
                      <td className="p-3 text-slate-400">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 6: DAMAGE DEALT MATRIX */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
            <h4 className="text-lg font-bold text-amber-200 mb-4 flex items-center gap-2">
              <Swords className="w-5 h-5 text-amber-400" />
              Section 6: Damage Dealt by Mobs (Easy / Normal / Hard)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Mob Attack Type</th>
                    <th className="p-3 text-emerald-400">Easy Mode</th>
                    <th className="p-3 text-amber-400">Normal Mode</th>
                    <th className="p-3 text-red-400">Hard Mode</th>
                    <th className="p-3">Special Threat Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {DAMAGE_DEALT_MATRIX.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-slate-200">{row.mob}</td>
                      <td className="p-3 text-emerald-300">{row.easy}</td>
                      <td className="p-3 text-amber-300">{row.normal}</td>
                      <td className="p-3 text-red-400 font-bold">{row.hard}</td>
                      <td className="p-3 text-slate-400">{row.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-TAB 6: ADVANCEMENTS & HISTORY (SECTIONS 7, 8, 10) */}
      {/* ========================================================================= */}
      {activeTab === 'advancements' && (
        <div className="space-y-8">
          {/* ADVANCEMENTS */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
            <h4 className="text-lg font-bold text-amber-200 mb-4 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Sections 7 & 8: Key Mob Advancements & Achievements
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {MOB_ADVANCEMENTS.map((adv, idx) => (
                <div key={idx} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                  <div className="w-10 h-10 bg-amber-950/60 rounded-lg flex items-center justify-center p-1.5 flex-shrink-0">
                    <img 
                      src={`/icons/minecraft/${adv.icon}.svg`}
                      alt={adv.title}
                      onError={(e) => { e.currentTarget.src = `/icons/minecraft/${adv.icon}.png`; }}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-slate-100">{adv.title}</span>
                      <span className="text-[10px] font-mono text-amber-300 bg-amber-950 px-1.5 py-0.2 rounded border border-amber-500/20">{adv.type}</span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">{adv.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* HISTORY TIMELINE */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
            <h4 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-red-400" />
              Section 10: Mob Evolution Timeline (Pre-Classic to 1.21 Tricky Trials)
            </h4>
            <div className="space-y-4 relative border-l-2 border-red-500/40 ml-4 pl-6">
              {MOB_HISTORY_TIMELINE.map((hist, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-red-500 border-2 border-slate-900"></div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-red-300 text-xs">{hist.version}</span>
                    <span className="text-[11px] text-slate-500 font-mono">({hist.date})</span>
                  </div>
                  <h5 className="font-semibold text-slate-200 text-sm mt-0.5">{hist.title}</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{hist.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
