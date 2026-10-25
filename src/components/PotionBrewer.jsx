import React, { useState, useMemo } from 'react';
import { 
  BREWING_EQUIPMENT, 
  INGREDIENT_MODIFIERS, 
  EFFECT_INGREDIENTS, 
  BREWING_RECIPES, 
  BREWING_CURES, 
  UNBREWABLE_POTIONS, 
  BREWING_HISTORY 
} from '../data/minecraftBrewing';
import { 
  Sparkles, 
  Flame, 
  Droplets, 
  RotateCcw, 
  Check, 
  Search, 
  Shield, 
  Zap, 
  Clock, 
  Info, 
  BookOpen, 
  History, 
  Layers, 
  AlertCircle, 
  Award, 
  ArrowRight,
  FlaskConical,
  Milk,
  Heart
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import confetti from 'canvas-confetti';

export default function PotionBrewer() {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'equipment' | 'ingredients' | 'recipes' | 'cures' | 'history'
  const [selectedRecipeId, setSelectedRecipeId] = useState('swiftness');
  
  // Brewing Simulator States
  const [blazeFuelCharges, setBlazeFuelCharges] = useState(20); // 0 to 20 charges
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewingProgress, setBrewingProgress] = useState(0);
  const [activeModifier, setActiveModifier] = useState('standard'); // 'standard' | 'redstone' | 'glowstone' | 'splash' | 'lingering'
  const [brewedCount, setBrewedCount] = useState(0);

  // Recipe Category Filter
  const [recipeCategory, setRecipeCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected recipe
  const selectedRecipe = useMemo(() => {
    return BREWING_RECIPES.find(r => r.id === selectedRecipeId) || BREWING_RECIPES[4]; // Default Swiftness
  }, [selectedRecipeId]);

  // Filtered recipes list
  const filteredRecipes = useMemo(() => {
    return BREWING_RECIPES.filter(r => {
      const matchesCategory = recipeCategory === 'All' || r.category.includes(recipeCategory);
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;
      return matchesCategory && (
        r.name.toLowerCase().includes(q) ||
        r.ingredient.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    });
  }, [recipeCategory, searchQuery]);

  // Handle Brew Action
  const handleStartBrewing = () => {
    if (blazeFuelCharges <= 0) {
      playClick();
      return;
    }

    playPop();
    setIsBrewing(true);
    setBrewingProgress(0);

    const interval = setInterval(() => {
      setBrewingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBrewing(false);
          setBlazeFuelCharges(c => Math.max(0, c - 1));
          setBrewedCount(c => c + 3); // 3 bottles per brew!
          playLevelUp();
          confetti({
            particleCount: 40,
            spread: 60,
            origin: { y: 0.72 },
            colors: [selectedRecipe.color || '#38bdf8', '#5c8e32', '#ffd700']
          });
          return 0;
        }
        return prev + 25;
      });
    }, 150);
  };

  // Helper to render icon
  const renderItemIcon = (id, sizeClass = "w-8 h-8") => {
    return (
      <img
        src={`/icons/minecraft/${id}.svg`}
        alt={id}
        className={`${sizeClass} object-contain filter drop-shadow`}
        style={{ imageRendering: 'pixelated' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/icons/minecraft/potion_bottle.svg';
        }}
      />
    );
  };

  // Formatted duration based on modifier
  const displayedDuration = useMemo(() => {
    if (activeModifier === 'redstone') {
      return 'Extended: 8:00 (Redstone Dust)';
    }
    if (activeModifier === 'glowstone') {
      return 'Potent II: 1:30 (Tier II Intensity)';
    }
    if (activeModifier === 'splash') {
      return 'Splash: Thrown Area of Effect (Gunpowder)';
    }
    if (activeModifier === 'lingering') {
      return "Lingering: 30s Persistent Cloud & Tipped Arrows (Dragon's Breath)";
    }
    return selectedRecipe.duration;
  }, [activeModifier, selectedRecipe]);

  return (
    <section id="brewing" className="py-20 bg-[#0d0e15] border-t-4 border-[#252535] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#20152b] border border-[#52297a] text-[11px] font-silkscreen text-[#c084fc]">
            <FlaskConical className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>OFFICIAL MINECRAFT ALCHEMICAL LAB & BREWING STAND</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            POTIONS & ALCHEMICAL LABORATORY
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Master the art of alchemy. From the fundamental <strong className="text-purple-400">Awkward Potion</strong> base to 1.21 Tricky Trials <strong className="text-cyan-400">Wind Charged</strong> and <strong className="text-emerald-400">Oozing</strong> concoctions, 20-charge Blaze fuel meters, and milk cures.
          </p>
        </div>

        {/* Navigation Mode Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'simulator', label: 'Brewing Stand (GUI)', icon: FlaskConical },
            { id: 'equipment', label: '1. Equipment & Fuel', icon: Flame },
            { id: 'ingredients', label: '2. Ingredients & Modifiers', icon: Sparkles },
            { id: 'recipes', label: '3. Complete Recipes Codex', icon: BookOpen },
            { id: 'cures', label: '3.3 Cures & Un-brewables', icon: Milk },
            { id: 'history', label: '4. Alchemical History', icon: History }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { playClick(); setActiveTab(tab.id); }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-silkscreen transition-all border ${
                  isSelected
                    ? 'bg-[#7e22ce] text-white border-[#c084fc] shadow-lg scale-105'
                    : 'bg-[#151622] text-zinc-400 border-[#2b2c3d] hover:bg-[#1d1f2e] hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-purple-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: INTERACTIVE BREWING STAND GUI */}
        {activeTab === 'simulator' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Quick Potion Presets Carousel */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {BREWING_RECIPES.map((recipe) => {
                const isSelected = selectedRecipeId === recipe.id;
                return (
                  <button
                    key={recipe.id}
                    onClick={() => { playClick(); setSelectedRecipeId(recipe.id); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 shrink-0 transition-all ${
                      isSelected
                        ? 'bg-[#29173b] text-white border-purple-400 shadow-lg scale-105'
                        : 'bg-[#151620] text-zinc-400 border-[#2a2c3d] hover:bg-[#1c1e2b] hover:text-white'
                    }`}
                  >
                    {renderItemIcon(recipe.ingredientId, "w-5 h-5")}
                    <span className="font-silkscreen text-xs">{recipe.name}</span>
                  </button>
                );
              })}
            </div>

            {/* In-Game Authentic Brewing Stand GUI Panel */}
            <div className="max-w-4xl mx-auto mc-panel p-6 sm:p-8 rounded-xl bg-[#1e1a29] border-4 border-[#3b3254] shadow-2xl space-y-6">
              
              {/* GUI Header & Blaze Fuel Meter */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-[#332b47] pb-4">
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-[#14121d] border-2 border-purple-500/60 p-2 flex items-center justify-center shrink-0 shadow-inner">
                    {renderItemIcon('brewing_stand', "w-10 h-10")}
                  </div>
                  <div>
                    <h3 className="font-pixel text-base text-white">{selectedRecipe.name}</h3>
                    <p className="text-xs font-mono text-purple-300 mt-0.5">
                      {selectedRecipe.description}
                    </p>
                  </div>
                </div>

                {/* Blaze Powder Fuel Gauge */}
                <div className="flex items-center gap-3 bg-[#13111b] px-4 py-2 rounded-lg border border-[#312a45]">
                  <div className="flex items-center gap-2">
                    {renderItemIcon('blaze_powder', "w-6 h-6")}
                    <div>
                      <span className="font-silkscreen text-[10px] text-amber-400 block">BLAZE FUEL:</span>
                      <span className="font-mono text-xs text-white font-bold">{blazeFuelCharges} / 20 CHARGES</span>
                    </div>
                  </div>
                  <button
                    onClick={() => { playPop(); setBlazeFuelCharges(20); }}
                    className="text-[9px] font-mono px-2 py-1 rounded bg-[#2a1e12] border border-amber-700 text-amber-400 hover:text-white"
                    title="Insert 1 Blaze Powder"
                  >
                    +REFILL
                  </button>
                </div>

              </div>

              {/* Central Alchemical Stand Diagram */}
              <div className="flex flex-col items-center justify-center py-6 relative">
                
                {/* Top Ingredient Slot */}
                <div className="flex flex-col items-center mb-4">
                  <span className="font-silkscreen text-[10px] text-zinc-400 mb-1">
                    TOP INGREDIENT ({selectedRecipe.ingredient})
                  </span>
                  <div className="mc-slot w-14 h-14 rounded-lg bg-[#13111b] border-2 border-[#41365c] flex items-center justify-center shadow-lg">
                    {renderItemIcon(selectedRecipe.ingredientId, "w-9 h-9")}
                  </div>
                </div>

                {/* Brewing Bubble Progress Track */}
                <div className="w-1.5 h-16 bg-[#13111b] rounded-full relative overflow-hidden mb-4 border border-[#3b3252]">
                  <div 
                    className="w-full bg-gradient-to-b from-amber-400 via-purple-400 to-cyan-400 transition-all duration-150"
                    style={{ height: `${isBrewing ? brewingProgress : 100}%` }}
                  />
                </div>

                {/* Bottom 3 Potion Slots (Tripod layout) */}
                <div className="flex items-center justify-center gap-8">
                  {['Bottle Left', 'Bottle Center', 'Bottle Right'].map((slot, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div className="mc-slot w-14 h-14 rounded-lg bg-[#13111b] border-2 border-[#41365c] flex items-center justify-center shadow-lg relative group">
                        {renderItemIcon('potion_bottle', "w-9 h-9")}
                        <div 
                          className="absolute inset-2 rounded opacity-50 filter blur-[1px] pointer-events-none"
                          style={{ backgroundColor: selectedRecipe.color || '#a855f7' }}
                        />
                      </div>
                      <span className="font-mono text-[9px] text-zinc-500 mt-1">{slot}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Modifier Selector Controls */}
              <div className="space-y-2 bg-[#14121d] p-4 rounded-lg border border-[#2d253f]">
                <span className="font-silkscreen text-[10px] text-zinc-400 block">
                  APPLY ALCHEMICAL MODIFIERS:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'standard', label: 'Standard', desc: 'Default Duration', icon: 'glass_bottle' },
                    { id: 'redstone', label: 'Extended', desc: '+Redstone (8:00)', icon: 'redstone' },
                    { id: 'glowstone', label: 'Potent II', desc: '+Glowstone (Tier II)', icon: 'glowstone_dust' },
                    { id: 'splash', label: 'Splash', desc: '+Gunpowder (Thrown)', icon: 'gunpowder' },
                    { id: 'lingering', label: 'Lingering', desc: "+Dragon's Breath (Cloud)", icon: 'dragons_breath' }
                  ].map((mod) => {
                    const isSelected = activeModifier === mod.id;
                    return (
                      <button
                        key={mod.id}
                        onClick={() => { playClick(); setActiveModifier(mod.id); }}
                        className={`p-2 rounded border text-left transition-all ${
                          isSelected
                            ? 'bg-[#2b1842] text-white border-purple-400 shadow-md font-bold'
                            : 'bg-[#100e17] text-zinc-400 border-[#241e30] hover:bg-[#181522] hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 mb-0.5">
                          {renderItemIcon(mod.icon, "w-4 h-4")}
                          <span className="font-silkscreen text-[10px]">{mod.label}</span>
                        </div>
                        <span className="text-[9px] font-mono text-zinc-500 block truncate">{mod.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Recipe Meta Banner & Action Row */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-lg bg-[#14121d] border border-[#2d253f]">
                
                <div className="space-y-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-silkscreen text-xs text-white">ACTIVE EFFECT SPECS:</span>
                    <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-700">
                      {selectedRecipe.category}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-emerald-400">
                    ⏱️ Duration / Potency: <strong>{displayedDuration}</strong>
                  </p>
                  <p className="text-[11px] font-mono text-zinc-400">
                    Formula: {selectedRecipe.base} + {selectedRecipe.ingredient}
                  </p>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={handleStartBrewing}
                    disabled={isBrewing || blazeFuelCharges <= 0}
                    className={`flex-1 sm:flex-initial py-3 px-6 mc-btn text-xs font-silkscreen flex items-center justify-center gap-2 shadow-lg ${
                      isBrewing || blazeFuelCharges <= 0
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border-zinc-700'
                        : 'mc-btn mc-btn-green'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isBrewing ? 'BREWING BATCH...' : 'BREW 3 BOTTLES'}</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* TAB 2: BREWING EQUIPMENT (1.1) */}
        {activeTab === 'equipment' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {BREWING_EQUIPMENT.map((eq) => (
              <div key={eq.id} className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
                <div className="flex items-center gap-4 border-b border-[#242533] pb-3">
                  <div className="w-12 h-12 rounded-lg bg-[#0e0f17] border border-[#2c2d3f] p-2 flex items-center justify-center">
                    {renderItemIcon(eq.icon, "w-8 h-8")}
                  </div>
                  <div>
                    <h3 className="font-pixel text-base text-white">{eq.name}</h3>
                    <span className="text-xs font-mono text-purple-400">{eq.crafting}</span>
                  </div>
                </div>

                <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                  {eq.desc}
                </p>

                <div className="p-3 bg-[#0d0e14] rounded-lg border border-[#1e1f2b] text-xs font-mono text-emerald-400">
                  ⚡ <strong>Capacity & Thermal Mechanics:</strong> {eq.capacity}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: INGREDIENTS & MODIFIERS (2.1 - 2.2) */}
        {activeTab === 'ingredients' && (
          <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
            
            {/* 2.1 Base Ingredients & Modifiers */}
            <div className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
              <h3 className="font-pixel text-base text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>2.1 BASE INGREDIENTS & ALCHEMICAL MODIFIERS</span>
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                These six core substances dictate potion base transformations, duration expansion, potency amplification, and corruptions:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {INGREDIENT_MODIFIERS.map((mod) => (
                  <div key={mod.id} className="p-4 rounded-lg bg-[#0e0f16] border border-[#242535] space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#161724] border border-[#2d2e40] p-1.5 flex items-center justify-center">
                        {renderItemIcon(mod.icon, "w-7 h-7")}
                      </div>
                      <div>
                        <span className="font-silkscreen text-xs text-white block">{mod.name}</span>
                        <span className="text-[10px] font-mono text-purple-400">{mod.role}</span>
                      </div>
                    </div>
                    <p className="text-xs font-mono text-zinc-300 leading-normal">{mod.effect}</p>
                    <span className="text-[10px] font-mono text-zinc-500 block">Applies to: {mod.appliesTo}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 2.2 Effect Ingredients Roster */}
            <div className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
              <h3 className="font-pixel text-base text-white flex items-center gap-2">
                <FlaskConical className="w-4 h-4 text-cyan-400" />
                <span>2.2 EFFECT INGREDIENTS ROSTER</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {EFFECT_INGREDIENTS.map((ing) => (
                  <div key={ing.id} className="p-3 rounded-lg bg-[#0e0f16] border border-[#242535] flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-[#161724] border border-[#2d2e40] p-1.5 flex items-center justify-center shrink-0">
                      {renderItemIcon(ing.icon, "w-7 h-7")}
                    </div>
                    <div>
                      <span className="font-silkscreen text-xs text-white block">{ing.name}</span>
                      <span className="text-[11px] font-mono text-emerald-400 font-semibold">{ing.creates}</span>
                      <p className="text-[10px] font-mono text-zinc-500">{ing.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: COMPLETE RECIPES CODEX (3.1 - 3.2) */}
        {activeTab === 'recipes' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {['All', 'Base', 'Positive', 'Negative', 'Mixed'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => { playClick(); setRecipeCategory(cat); }}
                    className={`px-3 py-1.5 rounded text-xs font-silkscreen transition-all border ${
                      recipeCategory === cat
                        ? 'bg-[#7e22ce] text-white border-purple-400 shadow-md scale-105'
                        : 'bg-[#151622] text-zinc-400 border-[#2b2c3d] hover:bg-[#1d1f2e] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search recipes, ingredients..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#141520] border-2 border-[#2b2c3e] rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 font-mono"
                />
              </div>
            </div>

            {/* Recipes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRecipes.map((rec) => (
                <div 
                  key={rec.id}
                  className="mc-panel p-5 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] hover:border-purple-500/50 shadow-xl space-y-3 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between border-b border-[#242533] pb-2">
                      <span className="font-silkscreen text-xs text-white font-bold">{rec.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                        {rec.tier}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="mc-slot w-12 h-12 rounded bg-[#0d0e14] border border-[#2b2c3d] flex items-center justify-center relative">
                        {renderItemIcon(rec.ingredientId, "w-8 h-8")}
                      </div>
                      <div className="text-xs font-mono">
                        <span className="text-zinc-500 block text-[10px]">BREWING INGREDIENT:</span>
                        <strong className="text-white">{rec.ingredient}</strong>
                        <span className="text-zinc-400 block text-[10px] mt-0.5">Base: {rec.base}</span>
                      </div>
                    </div>

                    <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                      {rec.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[#242533] flex items-center justify-between text-xs font-mono">
                    <span className="text-emerald-400">⏱️ {rec.duration}</span>
                    <button
                      onClick={() => {
                        playClick();
                        setSelectedRecipeId(rec.id);
                        setActiveTab('simulator');
                      }}
                      className="text-[10px] font-silkscreen text-purple-400 hover:text-white"
                    >
                      BREW THIS →
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: CURES & UNBREWABLES (3.3 - 3.4) */}
        {activeTab === 'cures' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            
            {/* 3.3 Status Effect Cures */}
            <div className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
              <h3 className="font-pixel text-base text-white flex items-center gap-2">
                <Milk className="w-4 h-4 text-emerald-400" />
                <span>3.3 REMEDIES & STATUS EFFECT CURES</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {BREWING_CURES.map((cure) => (
                  <div key={cure.id} className="p-4 rounded-lg bg-[#0e0f16] border border-[#242535] space-y-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-[#161724] border border-[#2d2e40] p-1.5 flex items-center justify-center">
                        {renderItemIcon(cure.icon, "w-7 h-7")}
                      </div>
                      <div>
                        <span className="font-silkscreen text-xs text-white block">{cure.name}</span>
                        <span className="text-[10px] font-mono text-emerald-400">{cure.action}</span>
                      </div>
                    </div>
                    <p className="text-xs font-mono text-zinc-300">{cure.desc}</p>
                    <span className="text-[10px] font-mono text-zinc-500 block">Cures: {cure.remedyFor}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 3.4 Un-brewable Potions & Ominous Bottles */}
            <div className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
              <h3 className="font-pixel text-base text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span>3.4 UN-BREWABLE POTIONS & OMINOUS BOTTLES</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {UNBREWABLE_POTIONS.map((unb) => (
                  <div key={unb.name} className="p-4 rounded-lg bg-[#0e0f16] border border-[#242535] space-y-2">
                    <div className="flex items-center justify-between border-b border-[#242535] pb-2">
                      <span className="font-silkscreen text-xs text-amber-300 font-bold">{unb.name}</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-400">
                        {unb.edition}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-zinc-300">{unb.effect}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 3.5 Custom NBT & Commands */}
            <div className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-3">
              <h3 className="font-pixel text-base text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-cyan-400" />
                <span>3.5 CUSTOM RECIPES & NBT COMMANDS</span>
              </h3>
              <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                Java Edition supports infinite custom potion attributes using NBT components and commands:
              </p>
              <pre className="p-3 rounded bg-black/60 border border-[#2b2c3e] font-mono text-xs text-emerald-400 overflow-x-auto">
                /give @p potion[potion_contents=&#123;custom_effects:[&#123;id:"minecraft:speed",amplifier:4,duration:6000&#125;]&#125;] 1
              </pre>
            </div>

          </div>
        )}

        {/* TAB 6: ALCHEMICAL HISTORY (4.1 JAVA) */}
        {activeTab === 'history' && (
          <div className="max-w-4xl mx-auto space-y-4 animate-fadeIn">
            {BREWING_HISTORY.map((hist, idx) => (
              <div key={idx} className="mc-panel p-5 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-silkscreen text-xs text-purple-400 font-bold">{hist.version}</span>
                    <span className="text-[10px] font-mono text-zinc-500">({hist.date})</span>
                  </div>
                  <h4 className="font-pixel text-xs text-white">{hist.highlight}</h4>
                  <p className="text-xs font-mono text-zinc-400">{hist.desc}</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-purple-950 border border-purple-700 flex items-center justify-center font-pixel text-xs text-purple-300 shrink-0">
                  {idx + 1}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
