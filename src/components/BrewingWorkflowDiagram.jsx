import React, { useState } from 'react';
import BrewingItemSprite from './BrewingItemSprite';
import PotionSprite from './PotionSprite';
import { POTION_COLORS } from '../data/brewingAssets';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Zap, 
  RotateCcw, 
  Flame, 
  Layers, 
  ChevronRight,
  Info
} from 'lucide-react';
import { playClick, playPop } from '../utils/soundFX';

export default function BrewingWorkflowDiagram({ onSelectIngredient, onSelectRecipe }) {
  const [activeBranch, setActiveBranch] = useState('all'); // 'all' | 'redstone' | 'glowstone' | 'corrupt' | 'splash' | 'lingering'

  return (
    <div className="bg-[#12131b]/95 border-2 border-[#2b2d3e] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
      
      {/* SECTION HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#252738]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider">
              ALCHEMICAL SEQUENCE ARCHITECTURE
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-mono text-zinc-400">Java Edition 1.0 – 26.3+</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-pixel text-white mc-shadow">
            BREWING WORKFLOW &amp; BRANCHES
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
            Every potion in Minecraft follows a verified three-stage progression: 
            <strong> Solvent → Primary Effect → Alchemical Modifier</strong>.
          </p>
        </div>

        {/* Branch Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-zinc-400 mr-1 hidden lg:inline">Highlight Branch:</span>
          {[
            { id: 'all', label: 'All Branches' },
            { id: 'redstone', label: '⏱️ +Redstone (Duration)' },
            { id: 'glowstone', label: '⚡ +Glowstone (Tier II)' },
            { id: 'corrupt', label: '👁️ +Fermented Eye (Invert)' },
            { id: 'splash', label: '💣 +Gunpowder (Splash)' }
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => {
                playClick();
                setActiveBranch(btn.id);
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-mono transition-all border ${
                activeBranch === btn.id
                  ? 'bg-purple-900/80 text-purple-200 border-purple-400 shadow-sm font-bold'
                  : 'bg-[#181926] text-zinc-400 border-[#2a2c3d] hover:text-white'
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>

      {/* THREE-STAGE ALCHEMICAL DIAGRAM (HORIZONTAL TIMELINE) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        
        {/* STAGE 1: THE SOLVENT (WATER + NETHER WART) */}
        <div className="lg:col-span-3 bg-[#151622] border-2 border-[#2b2d3d] rounded-2xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">
                STAGE 01 • SOLVENT
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Baseline</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-2">Awkward Transformation</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Fill glass bottles with water and brew Nether Wart in the brewing stand.
            </p>

            {/* Visual Formula Box */}
            <div className="bg-[#0e0f17] p-3 rounded-xl border border-[#232435] flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <PotionSprite type="bottle" color={POTION_COLORS.water} size={28} alt="Water Bottle" />
                <span className="text-xs font-mono text-zinc-300">Water Bottle</span>
              </div>
              <span className="text-zinc-500 font-bold">+</span>
              <div 
                onClick={() => onSelectIngredient?.('nether_wart')}
                className="flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-transform" 
                title="Filter by Nether Wart"
              >
                <BrewingItemSprite itemId="nether_wart" size={26} />
                <span className="text-xs font-mono text-purple-300 font-bold">Nether Wart</span>
              </div>
            </div>
          </div>

          {/* Result: Awkward Potion */}
          <div className="pt-3 border-t border-[#232435] flex items-center justify-between bg-purple-950/30 p-2.5 rounded-xl border border-purple-500/20">
            <div className="flex items-center gap-2">
              <PotionSprite type="bottle" color={POTION_COLORS.awkward} size={30} alt="Awkward Potion" />
              <div>
                <span className="text-xs font-bold text-white block">Awkward Potion</span>
                <span className="text-[10px] font-mono text-purple-300">No status effect • Universal base</span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-purple-400 shrink-0" />
          </div>
        </div>

        {/* STAGE 2: PRIMARY EFFECT INFUSION */}
        <div className="lg:col-span-5 bg-[#151622] border-2 border-[#2b2d3d] rounded-2xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                STAGE 02 • EFFECT INFUSION
              </span>
              <span className="text-[10px] font-mono text-zinc-500">14 Core Recipes</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-2">Add Specific Botanical / Mob Ingredient</h3>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Add one primary ingredient to the Awkward Potion to impart the targeted status effect:
            </p>

            {/* Quick Interactive Ingredient Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'sugar', name: 'Sugar', effect: 'Speed', color: POTION_COLORS.swiftness },
                { id: 'blaze_powder', name: 'Blaze Powder', effect: 'Strength', color: POTION_COLORS.strength },
                { id: 'glistering_melon_slice', name: 'Glistering Melon', effect: 'Healing', color: POTION_COLORS.healing },
                { id: 'ghast_tear', name: 'Ghast Tear', effect: 'Regeneration', color: POTION_COLORS.regeneration },
                { id: 'magma_cream', name: 'Magma Cream', effect: 'Fire Resist', color: POTION_COLORS.fire_resistance },
                { id: 'pufferfish', name: 'Pufferfish', effect: 'Water Breath', color: POTION_COLORS.water_breathing },
                { id: 'golden_carrot', name: 'Golden Carrot', effect: 'Night Vision', color: POTION_COLORS.night_vision },
                { id: 'rabbits_foot', name: "Rabbit's Foot", effect: 'Leaping', color: POTION_COLORS.leaping },
                { id: 'breeze_rod', name: 'Breeze Rod', effect: 'Wind Charged', color: POTION_COLORS.wind_charged }
              ].map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    playPop();
                    onSelectIngredient?.(item.id);
                  }}
                  className="p-2 rounded-xl bg-[#0e0f17] border border-[#232435] hover:border-cyan-400/60 cursor-pointer transition-all flex items-center gap-2 group"
                  title={`Click to filter catalog by ${item.name}`}
                >
                  <BrewingItemSprite itemId={item.id} size={24} />
                  <div className="min-w-0">
                    <span className="text-[11px] font-bold text-white group-hover:text-cyan-300 block truncate">
                      {item.effect}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 block truncate">
                      +{item.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>Click any ingredient above to isolate its recipes in the catalog below.</span>
          </div>
        </div>

        {/* STAGE 3: ALCHEMICAL MODIFIERS (REDSTONE / GLOWSTONE / GUNPOWDER) */}
        <div className="lg:col-span-4 bg-[#151622] border-2 border-[#2b2d3d] rounded-2xl p-4 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">
                STAGE 03 • MODIFIERS
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Custom Variants</span>
            </div>
            <h3 className="font-bold text-sm text-white mb-2">Expand Duration, Amplify, or Convert</h3>
            
            {/* 4 Branch Options */}
            <div className="space-y-2 mt-2">
              
              {/* Branch A: Redstone (Duration) */}
              <div className={`p-2 rounded-xl border transition-all ${
                activeBranch === 'redstone' || activeBranch === 'all'
                  ? 'bg-red-950/30 border-red-500/40'
                  : 'opacity-40 bg-[#0e0f17] border-zinc-800'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <BrewingItemSprite itemId="redstone" size={20} />
                    <span className="font-bold text-white">+ Redstone Dust</span>
                  </div>
                  <span className="text-red-400 font-semibold text-[11px]">Duration: 3:00 → 8:00</span>
                </div>
              </div>

              {/* Branch B: Glowstone (Potency II) */}
              <div className={`p-2 rounded-xl border transition-all ${
                activeBranch === 'glowstone' || activeBranch === 'all'
                  ? 'bg-amber-950/30 border-amber-500/40'
                  : 'opacity-40 bg-[#0e0f17] border-zinc-800'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <BrewingItemSprite itemId="glowstone_dust" size={20} />
                    <span className="font-bold text-white">+ Glowstone Dust</span>
                  </div>
                  <span className="text-amber-400 font-semibold text-[11px]">Level I → Level II</span>
                </div>
              </div>

              {/* Branch C: Fermented Spider Eye (Corruption) */}
              <div className={`p-2 rounded-xl border transition-all ${
                activeBranch === 'corrupt' || activeBranch === 'all'
                  ? 'bg-purple-950/30 border-purple-500/40'
                  : 'opacity-40 bg-[#0e0f17] border-zinc-800'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <BrewingItemSprite itemId="fermented_spider_eye" size={20} />
                    <span className="font-bold text-white">+ Fermented Eye</span>
                  </div>
                  <span className="text-purple-300 font-semibold text-[11px]">Inverts Effect</span>
                </div>
              </div>

              {/* Branch D: Gunpowder (Splash) & Dragon's Breath (Lingering) */}
              <div className={`p-2 rounded-xl border transition-all ${
                activeBranch === 'splash' || activeBranch === 'all'
                  ? 'bg-cyan-950/30 border-cyan-500/40'
                  : 'opacity-40 bg-[#0e0f17] border-zinc-800'
              }`}>
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <BrewingItemSprite itemId="gunpowder" size={20} />
                    <span className="font-bold text-white">+ Gunpowder</span>
                  </div>
                  <span className="text-cyan-300 font-semibold text-[11px]">Splash Throwable</span>
                </div>
              </div>

            </div>
          </div>

          <div className="pt-2 border-t border-[#232435] text-[10px] font-mono text-zinc-500">
            ⚠️ <em>Redstone and Glowstone Dust are mutually exclusive on the same potion.</em>
          </div>
        </div>

      </div>

    </div>
  );
}
