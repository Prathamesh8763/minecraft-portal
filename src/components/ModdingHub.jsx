import React from 'react';
import { Layers, Zap, Award, Flame, ExternalLink, Trophy, Users } from 'lucide-react';
import { playClick } from '../utils/soundFX';

export default function ModdingHub() {
  const optiMods = [
    { name: "Sodium", role: "Rendering Engine Rewrite", desc: "Replaces the OpenGL pipeline. Eliminates micro-stutter and boosts FPS by up to 400%." },
    { name: "Lithium", role: "Physics & Mob AI Optimization", desc: "Optimizes server/client tick calculations without altering any vanilla game logic." },
    { name: "FerriteCore", role: "Memory / RAM Reduction", desc: "Drastically lowers memory footprint, making 200+ modpacks run smoothly on 4GB-8GB RAM." },
    { name: "Iris Shaders", role: "Modern Shader Loader", desc: "Full shader pack support running directly on top of Sodium with native frame rates." },
  ];

  const modpacks = [
    { name: "Better MC (v26+)", style: "Vanilla Plus Overhaul", desc: "The ultimate 'Minecraft 2.0' pack with 300+ balanced mods, quests, and new bosses." },
    { name: "RLCraft", style: "Brutal Survival RPG", desc: "Hardcore challenge with thirst, body temperature, dynamic seasons, and lethal dragons." },
    { name: "Create: Perfect World", style: "Mechanical Automation", desc: "Focuses on kinetic rotational power, trains, conveyor belts, and factory engineering." },
    { name: "Prominence II", style: "Fantasy ARPG", desc: "Custom talent trees, spellbooks, dungeon raids, and boss health bar combat." },
  ];

  return (
    <section id="modding" className="py-20 bg-[#101118] border-t-4 border-[#252535]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#20202e] border border-[#3b3b4f] text-[11px] font-silkscreen text-[#38bdf8]">
            <Layers className="w-3.5 h-3.5" />
            <span>COMMUNITY ECOSYSTEM (OCTOBER 2026)</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            MODDING & SPEEDRUNNING
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            From the battle between NeoForge and Fabric to landmark sub-7-minute speedrun world records and Hermitcraft Season 11.
          </p>
        </div>

        {/* Loaders & FPS Stack Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left: Mod Loaders Comparison */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-silkscreen text-sm text-zinc-300 tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>THE 2026 MOD LOADERS</span>
            </h3>

            <div className="mc-panel p-5 rounded-lg bg-[#161722] border-2 border-[#2b2c3d] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-silkscreen text-sm text-white font-bold">NeoForge</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-400 border border-amber-800">
                  DOMINANT FOR TECH / PACKS
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                The community-driven successor to legacy Forge. Built specifically for massive tech, magic, and dimension overhaul packs that require rich APIs like Curios.
              </p>
              <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/5">
                Recommended for: <em>All The Mods, Create, Heavy Kitchen-Sink Packs</em>
              </div>
            </div>

            <div className="mc-panel p-5 rounded-lg bg-[#161722] border-2 border-[#2b2c3d] space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-silkscreen text-sm text-white font-bold">Fabric</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                  DOMINANT FOR PERFORMANCE
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Lightweight, lightning-fast loader that updates within hours of every snapshot release. The home of Sodium, Lithium, and client-side utility mods.
              </p>
              <div className="text-[11px] font-mono text-zinc-400 pt-2 border-t border-white/5">
                Recommended for: <em>Vanilla+, Max FPS, Proximity Voice, Quick Updates</em>
              </div>
            </div>
          </div>

          {/* Right: The Essential FPS Optimization Stack */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-silkscreen text-sm text-zinc-300 tracking-wider flex items-center gap-2">
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>THE ESSENTIAL FPS OPTIMIZATION STACK</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {optiMods.map((mod, idx) => (
                <div 
                  key={idx}
                  onClick={() => playClick()}
                  className="p-4 bg-[#141520] rounded-lg border border-[#27283a] hover:border-emerald-500/50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-silkscreen text-xs text-white group-hover:text-emerald-400 transition-colors">
                      {mod.name}
                    </span>
                    <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/60 px-1.5 py-0.5 rounded">
                      ESSENTIAL
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400 block mb-2">{mod.role}</span>
                  <p className="text-xs text-zinc-400 leading-snug">{mod.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-3 bg-black/40 rounded border border-white/5 text-[11px] font-mono text-zinc-400 flex items-center justify-between">
              <span>Platform distribution: Modrinth & CurseForge</span>
              <span className="text-[#38bdf8]">Free & Open-Source</span>
            </div>
          </div>

        </div>

        {/* Speedrunning Records & Hermitcraft Highlights Banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Speedrunning WR */}
          <div className="mc-panel p-6 rounded-lg bg-gradient-to-br from-[#1a1728] to-[#12111d] border-2 border-purple-500/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl p-2 rounded bg-purple-950/80 border border-purple-700/50">🏆</span>
              <div>
                <span className="text-[10px] font-silkscreen text-purple-400">OFFICIAL SPEEDRUN WORLD RECORD</span>
                <h4 className="font-pixel text-lg text-white">6m 39s 813ms (RSG)</h4>
              </div>
            </div>
            <div className="space-y-1.5 text-xs font-mono text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-500">RUNNER:</span>
                <span className="text-white font-bold">Skycrab 🇳🇴</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">DATE RECORDED:</span>
                <span className="text-amber-400">July 27, 2026</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">SEED META:</span>
                <span className="text-cyan-400">1.16.1 Bastion + Zero-Cycle Perch</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 mt-4 leading-relaxed">
              Achieved through optimal ocean buried treasure routing, rapid piglin bartering in the Nether, mathematical stronghold triangulation, and explosive bed damage to zero-cycle the Ender Dragon.
            </p>
          </div>

          {/* Creators & Hermitcraft */}
          <div className="mc-panel p-6 rounded-lg bg-gradient-to-br from-[#121c17] to-[#0e1411] border-2 border-emerald-500/30">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl p-2 rounded bg-emerald-950/80 border border-emerald-700/50">👑</span>
              <div>
                <span className="text-[10px] font-silkscreen text-emerald-400">COMMUNITY SMP & TOURNAMENTS</span>
                <h4 className="font-pixel text-lg text-white">HERMITCRAFT S11 & MCC</h4>
              </div>
            </div>
            <div className="space-y-1.5 text-xs font-mono text-zinc-300">
              <div className="flex justify-between">
                <span className="text-zinc-500">HERMITCRAFT:</span>
                <span className="text-white font-bold">Season 11 Active (doFireTick: true)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">TOURNAMENT:</span>
                <span className="text-amber-400">MCC Season 6 (Magic & Fantasy)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">CHARITY MILESTONE:</span>
                <span className="text-emerald-400">$1.1M+ Raised for Gamers Outreach</span>
              </div>
            </div>
            <p className="text-[11px] text-zinc-400 mt-4 leading-relaxed">
              Featuring legends like Grian, Mumbo Jumbo, GoodTimesWithScar, Etho, GeminiTay, and TangoTek creating massive collaborative mega-districts and interactive minigames.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
