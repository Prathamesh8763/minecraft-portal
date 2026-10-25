import React, { useState } from 'react';
import { Sparkles, ArrowRight, Shield, Zap, Compass, Award } from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import confetti from 'canvas-confetti';

export default function Hero() {
  const [hearts, setHearts] = useState(10);
  const [level, setLevel] = useState(26);

  const handleHeartClick = () => {
    playPop();
    setHearts(prev => (prev <= 1 ? 10 : prev - 1));
  };

  const handleLevelClick = () => {
    playLevelUp();
    setLevel(prev => prev + 1);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#5c8e32', '#4aedd9', '#f8c53a']
    });
  };

  return (
    <section id="home" className="relative min-h-[92vh] pt-28 pb-16 flex flex-col justify-between overflow-hidden bg-[#0c0d12]">
      
      {/* Background Pixel & Gradient Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(92,142,50,0.22),transparent_70%)] pointer-events-none"></div>
      
      {/* Decorative Star/Block Particle Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:32px_32px]"></div>

      {/* Floating Ambient Blocks & Items with real SVGs */}
      <div className="absolute top-24 left-[8%] w-16 h-16 opacity-40 animate-float pointer-events-none hidden md:block">
        <img src="/icons/minecraft/the_mace.svg" alt="Mace" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]" style={{ imageRendering: 'pixelated' }} />
      </div>
      <div className="absolute top-44 right-[10%] w-14 h-14 opacity-40 animate-float [animation-delay:1.5s] pointer-events-none hidden md:block">
        <img src="/icons/minecraft/spear.svg" alt="Spear" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" style={{ imageRendering: 'pixelated' }} />
      </div>
      <div className="absolute bottom-36 left-[14%] w-12 h-12 opacity-35 animate-float [animation-delay:2.5s] pointer-events-none hidden lg:block">
        <img src="/icons/minecraft/brittle_ice.svg" alt="Ice" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(125,211,252,0.5)]" style={{ imageRendering: 'pixelated' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Version Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#1b1c24] border border-[#3b3c4f] shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-silkscreen text-[11px] text-[#4aedd9] tracking-wider">
                JAVA 26.3 WILDERNESS BOUND (STABLE) // 26.4 SNAPSHOT 5
              </span>
            </div>

            {/* Hero Main Heading */}
            <h1 className="font-pixel text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.2] mc-shadow-lg tracking-tight">
              THE JAVA <br />
              <span className="text-[#5c8e32] mc-shadow">COMPENDIUM</span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Experience the authoritative, factual knowledge base of Minecraft Java Edition. Track official 
              <strong className="text-emerald-400 font-semibold"> Game Drops (Wilderness Bound)</strong>, explore 
              <strong className="text-cyan-400 font-semibold"> Dappled Forests &amp; Trial Chambers</strong>, master the 
              <strong className="text-yellow-400 font-semibold"> 3×3 Crafter &amp; Straw Beds</strong>, and simulate brewing with zero latency.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a 
                href="#drops"
                onClick={() => playClick()}
                className="mc-btn mc-btn-green text-xs sm:text-sm py-3 px-6 flex items-center gap-2.5"
              >
                <span>EXPLORE 2026 DROPS</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a 
                href="#crafting"
                onClick={() => playClick()}
                className="mc-btn mc-btn-diamond text-xs sm:text-sm py-3 px-6 flex items-center gap-2.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>OPEN CRAFTING TABLE</span>
              </a>

              <a 
                href="#icons"
                onClick={() => playClick()}
                className="mc-btn text-xs sm:text-sm py-3 px-5 flex items-center gap-2"
              >
                <img src="/icons/minecraft/diamond.svg" alt="Diamond" className="w-4 h-4" style={{ imageRendering: 'pixelated' }} />
                <span>SVG VAULT</span>
              </a>
            </div>

            {/* Interactive Player HUD Bar */}
            <div className="pt-6">
              <div className="inline-block p-3 rounded-lg bg-[#15151c]/90 border-2 border-[#2b2b3a] shadow-xl backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  
                  {/* Hearts with Real SVGs */}
                  <div>
                    <div className="text-[10px] font-silkscreen text-zinc-400 mb-1 flex items-center justify-between">
                      <span>HEALTH POINTS</span>
                      <span className="text-red-400 font-bold">{hearts * 2} / 20 HP</span>
                    </div>
                    <div 
                      onClick={handleHeartClick}
                      className="flex items-center gap-1 cursor-pointer p-1 rounded hover:bg-black/30 transition-colors"
                      title="Click to take damage or heal!"
                    >
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="relative w-5 h-5 flex items-center justify-center">
                          <img 
                            src="/icons/minecraft/heart_full.svg" 
                            alt="Heart"
                            className={`w-4 h-4 transition-transform ${
                              i < hearts 
                                ? 'filter drop-shadow hover:scale-125' 
                                : 'opacity-20 grayscale'
                            }`}
                            style={{ imageRendering: 'pixelated' }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Level & XP bar */}
                  <div className="w-full sm:w-44">
                    <div className="text-[10px] font-silkscreen text-zinc-400 mb-1 flex items-center justify-between">
                      <span>EXPERIENCE</span>
                      <button 
                        onClick={handleLevelClick}
                        className="text-[#a3e635] hover:underline font-bold"
                        title="Click to gain XP!"
                      >
                        LVL {level}
                      </button>
                    </div>
                    <div 
                      onClick={handleLevelClick}
                      className="w-full h-3 bg-[#181820] rounded-sm border border-[#2e2e3c] overflow-hidden cursor-pointer"
                    >
                      <div className="h-full bg-gradient-to-r from-[#5c8e32] to-[#a3e635] w-[78%] animate-pulse"></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Isometric Showcase */}
          <div className="lg:col-span-5 flex justify-center relative">
            
            {/* Glowing Backdrop Ring */}
            <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-[#5c8e32]/30 via-[#38bdf8]/20 to-transparent blur-3xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

            {/* Interactive 3D Card / Showcase Block */}
            <div className="mc-panel p-6 w-full max-w-md relative z-10 space-y-5 bg-[#181822]/95 border-4 border-[#3a3a4c]">
              
              {/* Card Header */}
              <div className="flex items-center justify-between border-b-2 border-[#2b2b3a] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-none border border-black"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-none border border-black"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-none border border-black"></div>
                  <span className="font-silkscreen text-xs text-zinc-300 ml-2">WORLD_SEED_VANILLA.NBT</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">JAVA_EDITION</span>
              </div>

              {/* Centerpiece with real SVG grass block */}
              <div className="h-48 flex items-center justify-center relative">
                <div className="w-28 h-28 relative transform hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <img 
                    src="/icons/minecraft/grass_block.svg" 
                    alt="Grass Block" 
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>

                {/* Floating Tag */}
                <div className="absolute bottom-2 bg-[#121218]/90 px-3 py-1 rounded border border-[#2e2e40] text-[11px] font-silkscreen text-emerald-400 shadow">
                  BLOCK TYPE: GRASS_BLOCK
                </div>
              </div>

              {/* Key Highlights Table */}
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2 bg-[#13131a] rounded border border-[#252532]">
                  <span className="text-zinc-400">CURRENT ENGINE:</span>
                  <span className="text-white font-semibold">Java 21 Runtime (LTS)</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#13131a] rounded border border-[#252532]">
                  <span className="text-zinc-400">ACTIVE SNAPSHOT:</span>
                  <span className="text-[#38bdf8] font-semibold">24w40a+ (Pale Garden)</span>
                </div>
                <div className="flex items-center justify-between p-2 bg-[#13131a] rounded border border-[#252532]">
                  <span className="text-zinc-400">LATEST STABLE:</span>
                  <span className="text-[#5c8e32] font-semibold">1.21.3 Bundles of Bravery</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Global Statistics Ribbon */}
        <div className="mt-14 pt-8 border-t-2 border-[#1f202b] grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="p-3 bg-[#13131a] rounded border border-[#252534] text-center">
            <div className="font-pixel text-xl sm:text-2xl text-[#4aedd9]">1,750+</div>
            <div className="text-[11px] font-silkscreen text-zinc-400 mt-1">ITEMS & BLOCKS</div>
          </div>
          <div className="p-3 bg-[#13131a] rounded border border-[#252534] text-center">
            <div className="font-pixel text-xl sm:text-2xl text-[#a3e635]">80+</div>
            <div className="text-[11px] font-silkscreen text-zinc-400 mt-1">UNIQUE MOBS</div>
          </div>
          <div className="p-3 bg-[#13131a] rounded border border-[#252534] text-center">
            <div className="font-pixel text-xl sm:text-2xl text-[#f8c53a]">15</div>
            <div className="text-[11px] font-silkscreen text-zinc-400 mt-1">WOOD FAMILIES</div>
          </div>
          <div className="p-3 bg-[#13131a] rounded border border-[#252534] text-center">
            <div className="font-pixel text-xl sm:text-2xl text-[#c084fc]">3</div>
            <div className="text-[11px] font-silkscreen text-zinc-400 mt-1">DIMENSIONS</div>
          </div>
          <div className="p-3 bg-[#13131a] rounded border border-[#252534] text-center col-span-2 md:col-span-1">
            <div className="font-pixel text-xl sm:text-2xl text-[#ff4b4b]">6:39</div>
            <div className="text-[11px] font-silkscreen text-zinc-400 mt-1">RSG SPEEDRUN WR</div>
          </div>
        </div>

      </div>

    </section>
  );
}
