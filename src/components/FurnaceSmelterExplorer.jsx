import React, { useState, useMemo, useEffect } from 'react';
import { 
  SMELTING_RECIPES, 
  SMELTING_CATEGORIES, 
  APPLIANCE_DATA, 
  SMELTING_FUELS 
} from '../data/minecraftSmelting';
import { 
  Flame, 
  Search, 
  Zap, 
  Sparkles, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  AlertTriangle, 
  Timer, 
  Award, 
  Layers, 
  ChevronRight, 
  RotateCcw 
} from 'lucide-react';
import { playClick, playPop, playLevelUp, playSizzle } from '../utils/soundFX';
import confetti from 'canvas-confetti';

export default function FurnaceSmelterExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeAppliance, setActiveAppliance] = useState('furnace');
  const [selectedRecipe, setSelectedRecipe] = useState(SMELTING_RECIPES[0]);
  const [selectedFuel, setSelectedFuel] = useState(SMELTING_FUELS[4]); // Coal by default
  const [isSmelting, setIsSmelting] = useState(false);
  const [smeltProgress, setSmeltProgress] = useState(0);
  const [smeltCount, setSmeltCount] = useState(0);
  const [totalXpEarned, setTotalXpEarned] = useState(0);

  // Filter recipes based on category, search query, and compatibility
  const filteredRecipes = useMemo(() => {
    return SMELTING_RECIPES.filter(recipe => {
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesInput = recipe.input.name.toLowerCase().includes(q);
      const matchesOutput = recipe.output.name.toLowerCase().includes(q);
      const matchesName = recipe.name.toLowerCase().includes(q);
      const matchesTags = recipe.tags?.some(tag => tag.toLowerCase().includes(q));
      const matchesDesc = recipe.transformation.toLowerCase().includes(q);

      return matchesCategory && (matchesInput || matchesOutput || matchesName || matchesTags || matchesDesc);
    });
  }, [selectedCategory, searchQuery]);

  // Check if current recipe is compatible with selected appliance
  const isCompatible = useMemo(() => {
    return selectedRecipe.appliances.includes(activeAppliance);
  }, [selectedRecipe, activeAppliance]);

  // Calculate actual cooking time in seconds for the active appliance
  const cookingTimeSeconds = useMemo(() => {
    if (activeAppliance === 'blast_furnace' || activeAppliance === 'smoker') {
      return 5.0; // 2x speed (100 ticks)
    }
    if (activeAppliance === 'campfire') {
      return 30.0; // Passive cooking (600 ticks)
    }
    return 10.0; // Standard Furnace (200 ticks)
  }, [activeAppliance]);

  // Handle switching recipe
  const handleSelectRecipe = (recipe) => {
    playClick();
    setSelectedRecipe(recipe);
    setSmeltProgress(0);
    setIsSmelting(false);

    // If active appliance is incompatible, auto-switch to a compatible one
    if (!recipe.appliances.includes(activeAppliance)) {
      setActiveAppliance(recipe.appliances[0]);
    }
  };

  // Handle switching appliance
  const handleSelectAppliance = (applianceKey) => {
    playClick();
    setActiveAppliance(applianceKey);
    setSmeltProgress(0);
    setIsSmelting(false);
  };

  // Smelt simulation
  const handleIgniteSmelt = () => {
    if (isSmelting) return;
    if (!isCompatible) {
      playPop();
      return;
    }

    playSizzle();
    setIsSmelting(true);
    setSmeltProgress(0);

    const duration = cookingTimeSeconds * 100; // Fast preview scale (e.g. 500ms or 1000ms)
    const intervalTime = 25;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = Math.min(100, Math.round((currentStep / steps) * 100));
      setSmeltProgress(progress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setIsSmelting(false);
        playLevelUp();
        setSmeltCount(prev => prev + 1);
        setTotalXpEarned(prev => +(prev + selectedRecipe.experience).toFixed(2));

        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.65 },
          colors: ['#ff8800', '#ffd700', '#55ff55']
        });
      }
    }, intervalTime);
  };

  return (
    <section id="furnace" className="py-20 bg-[#0d0d14] border-t-4 border-[#252535] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#2b180d] border border-[#d96414] text-[11px] font-silkscreen text-[#f39c12]">
            <Flame className="w-3.5 h-3.5 text-[#ff8800] animate-pulse" />
            <span>OFFICIAL MINECRAFT SMELTING & COOKING LAB</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            FURNACE, BLAST FURNACE & SMOKER
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Discover <strong className="text-[#ff9d3b]">what becomes of every item</strong> after being smelted, roasted, or blasted. Compare 2× speed appliances, experience rewards, and fuel efficiency metrics.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-8">
          {SMELTING_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { playClick(); setSelectedCategory(cat); }}
                className={`px-3 py-1.5 rounded text-xs font-silkscreen transition-all border ${
                  isSelected
                    ? 'bg-[#d96414] text-white border-[#f39c12] shadow-md scale-105'
                    : 'bg-[#181924] text-zinc-400 border-[#2b2c3d] hover:bg-[#202130] hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search & Suggestions Bar */}
        <div className="max-w-4xl mx-auto mb-8 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search input or output (e.g. raw iron, ancient debris, beef, sponge, cactus, kelp)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-[#141520] border-2 border-[#2b2c3e] rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 font-mono shadow-inner"
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

          {/* Quick Popular Chips */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono text-zinc-400">
            <span className="text-[11px] font-silkscreen text-zinc-500">QUICK SMELT:</span>
            {['Ancient Debris', 'Raw Iron', 'Raw Beef', 'Wet Sponge', 'Cactus', 'Cobblestone', 'Kelp'].map((item) => (
              <button
                key={item}
                onClick={() => { playClick(); setSearchQuery(item); }}
                className="px-2 py-0.5 rounded bg-[#181824] hover:bg-[#222232] text-zinc-300 hover:text-orange-400 border border-[#2b2b3d] text-[11px]"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Main Smelting Lab Grid (Item Catalog on Left, Interactive Smelting GUI on Right) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Smelting Catalog & Formula List */}
          <div className="lg:col-span-5 mc-panel p-5 rounded-xl bg-[#171822] border-4 border-[#353648] shadow-2xl flex flex-col h-[620px]">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-[#272838] pb-3 mb-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#7a3407] flex items-center justify-center border border-[#d96414]">
                  <Flame className="w-3 h-3 text-orange-300" />
                </div>
                <span className="font-silkscreen text-xs text-white font-bold">SMELTABLE CATALOG</span>
              </div>
              <span className="text-[10px] font-mono text-orange-400 font-semibold">
                {filteredRecipes.length} FORMULAS
              </span>
            </div>

            {/* Scrollable Recipe Item Grid */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-2 custom-scrollbar">
              {filteredRecipes.map((recipe) => {
                const isSelected = selectedRecipe.id === recipe.id;
                return (
                  <div
                    key={recipe.id}
                    onClick={() => handleSelectRecipe(recipe)}
                    className={`p-2.5 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#331c10] border-[#d96414] shadow-md translate-x-1'
                        : 'bg-[#12131c] border-[#222332] hover:bg-[#1a1b28] hover:border-[#38394e]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      
                      {/* Input Icon Slot */}
                      <div className="w-10 h-10 rounded bg-[#1c1d29] border border-[#2e2f42] flex items-center justify-center p-1 shrink-0 group-hover:scale-105 transition-transform">
                        <img 
                          src={recipe.input.icon} 
                          alt={recipe.input.name} 
                          className="w-7 h-7 object-contain filter drop-shadow" 
                          style={{ imageRendering: 'pixelated' }} 
                        />
                      </div>

                      {/* Small Arrow */}
                      <ArrowRight className="w-3 h-3 text-zinc-600 shrink-0" />

                      {/* Output Icon Slot */}
                      <div className="w-10 h-10 rounded bg-[#1c1d29] border border-[#2e2f42] flex items-center justify-center p-1 shrink-0 group-hover:scale-105 transition-transform">
                        <img 
                          src={recipe.output.icon} 
                          alt={recipe.output.name} 
                          className="w-7 h-7 object-contain filter drop-shadow" 
                          style={{ imageRendering: 'pixelated' }} 
                        />
                      </div>

                      <div className="min-w-0">
                        <span className={`font-silkscreen text-xs block truncate ${isSelected ? 'text-orange-300 font-bold' : 'text-zinc-200 group-hover:text-white'}`}>
                          {recipe.output.name}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mt-0.5">
                          <span className="text-zinc-400">from {recipe.input.name}</span>
                          <span>•</span>
                          <span className="text-yellow-400 font-semibold">+{recipe.experience} XP</span>
                        </div>
                      </div>

                    </div>

                    <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'text-orange-400 rotate-0' : 'text-zinc-600'}`} />
                  </div>
                );
              })}

              {filteredRecipes.length === 0 && (
                <div className="text-center py-20 text-zinc-500 font-mono text-xs">
                  No smelting formulas match "{searchQuery}". Try searching for another ore, meat, or block!
                </div>
              )}
            </div>

            {/* Quick Status Footer */}
            <div className="pt-3 border-t border-[#272838] mt-2 shrink-0 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>CLICK TO LOAD INTO FURNACE</span>
              <span className="text-orange-400 font-semibold">AUTHENTIC JAVA DATA</span>
            </div>

          </div>

          {/* Right Column: Interactive Smelting GUI Chamber & Transformation Breakdown */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Appliance Selector Tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {Object.values(APPLIANCE_DATA).map((appliance) => {
                const isActive = activeAppliance === appliance.id;
                const canCookCurrent = selectedRecipe.appliances.includes(appliance.id);

                return (
                  <button
                    key={appliance.id}
                    onClick={() => handleSelectAppliance(appliance.id)}
                    className={`p-3 rounded-lg border-2 text-left transition-all relative flex flex-col justify-between ${
                      isActive
                        ? 'bg-[#29170e] border-[#d96414] shadow-lg scale-[1.02]'
                        : canCookCurrent
                          ? 'bg-[#161722] border-[#292a3c] hover:bg-[#1e1f2e] hover:border-[#3d3e58]'
                          : 'bg-[#12131a] border-[#1e1f2a] opacity-60 hover:opacity-90'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <img 
                        src={appliance.icon} 
                        alt={appliance.name} 
                        className="w-6 h-6 object-contain" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                      <span className="font-silkscreen text-[11px] text-white truncate">
                        {appliance.name.split(' ')[0]}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[9px] font-mono">
                      <span className={`px-1.5 py-0.5 rounded font-bold ${
                        appliance.speedMultiplier > 1 
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' 
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {appliance.badge}
                      </span>
                      <span className="text-zinc-400">{appliance.timeSeconds}s</span>
                    </div>

                    {!canCookCurrent && (
                      <span className="absolute top-1 right-1 text-[8px] font-mono text-red-400 bg-red-950/80 px-1 rounded">
                        CANNOT COOK
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Compatibility Banner */}
            {!isCompatible ? (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/80 text-red-300 flex items-center gap-3 text-xs font-mono">
                <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
                <div>
                  <strong className="font-silkscreen block text-red-200">INCOMPATIBLE WORKBENCH</strong>
                  <span>
                    A {APPLIANCE_DATA[activeAppliance].name} cannot process {selectedRecipe.input.name}! Switch to{' '}
                    <strong className="text-white underline">{APPLIANCE_DATA[selectedRecipe.appliances[0]].name}</strong>.
                  </span>
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-800/60 text-emerald-300 flex items-center justify-between text-xs font-mono">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Compatible with <strong className="text-white">{APPLIANCE_DATA[activeAppliance].name}</strong>! Smelt time: <strong className="text-emerald-400">{cookingTimeSeconds}s</strong>
                  </span>
                </div>
                <span className="text-[10px] text-yellow-400 font-bold">
                  +{selectedRecipe.experience} XP YIELD
                </span>
              </div>
            )}

            {/* Interactive Minecraft Furnace GUI Chamber */}
            <div className="mc-panel p-6 rounded-xl bg-[#1b1c28] border-4 border-[#3c3d52] shadow-2xl relative overflow-hidden">
              
              {/* Background Glow when Smelting */}
              {isSmelting && (
                <div className="absolute inset-0 bg-gradient-to-t from-orange-600/10 via-transparent to-transparent pointer-events-none animate-pulse" />
              )}

              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-[#2b2c3e] pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <Flame className={`w-4 h-4 ${isSmelting ? 'text-orange-400 animate-bounce' : 'text-zinc-500'}`} />
                  <span className="font-silkscreen text-xs text-white font-bold">
                    {APPLIANCE_DATA[activeAppliance].name.toUpperCase()} (GUI)
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="text-zinc-400">SMELTED: <strong className="text-white font-silkscreen">{smeltCount}</strong></span>
                  <span className="text-yellow-400 font-semibold">TOTAL XP: +{totalXpEarned}</span>
                </div>
              </div>

              {/* 3-Slot Minecraft Furnace Layout */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-4">
                
                {/* Left: Input Slot & Fuel Slot */}
                <div className="flex flex-col items-center gap-4">
                  
                  {/* Top Input Slot */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-silkscreen text-zinc-400 mb-1">INPUT ITEM</span>
                    <div className="w-16 h-16 rounded bg-[#13141d] border-4 border-[#2b2c3e] shadow-inner flex items-center justify-center relative p-2 group">
                      <img 
                        src={selectedRecipe.input.icon} 
                        alt={selectedRecipe.input.name} 
                        className={`w-11 h-11 object-contain filter drop-shadow ${isSmelting ? 'animate-pulse' : ''}`}
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <span className="absolute bottom-1 right-1 text-[10px] font-mono font-bold text-white bg-black/60 px-1 rounded">
                        1
                      </span>
                    </div>
                  </div>

                  {/* Animated Fire Flame Indicator */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-7 h-7 relative flex items-center justify-center">
                      <Flame className={`w-7 h-7 transition-all ${
                        isSmelting 
                          ? 'text-[#ff6600] scale-125 filter drop-shadow-[0_0_8px_#ff8800] animate-bounce' 
                          : 'text-zinc-700'
                      }`} />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-500 mt-0.5">
                      {isSmelting ? 'BURNING' : 'IDLE'}
                    </span>
                  </div>

                  {/* Bottom Fuel Slot */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded bg-[#13141d] border-4 border-[#2b2c3e] shadow-inner flex items-center justify-center relative p-2">
                      <img 
                        src={selectedFuel.icon} 
                        alt={selectedFuel.name} 
                        className="w-10 h-10 object-contain filter drop-shadow"
                        style={{ imageRendering: 'pixelated' }}
                      />
                      <span className="absolute bottom-1 right-1 text-[10px] font-mono font-bold text-emerald-400 bg-black/60 px-1 rounded">
                        ∞
                      </span>
                    </div>
                    <span className="text-[9px] font-silkscreen text-zinc-400 mt-1">
                      {selectedFuel.name}
                    </span>
                  </div>

                </div>

                {/* Middle: Animated Smelting Progress Arrow */}
                <div className="flex flex-col items-center gap-2 px-4">
                  <div className="w-28 sm:w-36 bg-[#13141d] border-2 border-[#2b2c3e] h-6 rounded-md overflow-hidden relative p-0.5 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-[#d96414] via-[#ff8800] to-[#ffd700] rounded transition-all duration-75 flex items-center justify-end pr-1"
                      style={{ width: `${smeltProgress}%` }}
                    >
                      {smeltProgress > 25 && (
                        <span className="text-[9px] font-mono font-bold text-black">
                          {smeltProgress}%
                        </span>
                      )}
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">
                    {isSmelting ? `Smelting... (${cookingTimeSeconds}s)` : 'Ready to cook'}
                  </span>
                </div>

                {/* Right: Output Result Slot */}
                <div className="flex flex-col items-center">
                  <span className="text-[9px] font-silkscreen text-orange-400 mb-1">RESULT PRODUCT</span>
                  <div className="w-20 h-20 rounded-xl bg-[#13141d] border-4 border-[#d96414] shadow-2xl flex items-center justify-center relative p-2 mc-enchant-glint">
                    <img 
                      src={selectedRecipe.output.icon} 
                      alt={selectedRecipe.output.name} 
                      className={`w-14 h-14 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${
                        smeltProgress === 100 ? 'scale-110 transition-transform' : ''
                      }`}
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <span className="absolute bottom-1 right-1.5 text-xs font-mono font-bold text-yellow-300 bg-black/70 px-1.5 rounded">
                      {selectedRecipe.output.count || 1}
                    </span>
                  </div>
                  <span className="font-silkscreen text-xs text-white mt-1.5 text-center max-w-[120px] truncate">
                    {selectedRecipe.output.name}
                  </span>
                </div>

              </div>

              {/* Action Button: Ignite Furnace */}
              <div className="mt-6 pt-4 border-t border-[#2b2c3e] flex flex-col sm:flex-row items-center justify-between gap-4">
                
                {/* Fuel Switcher Dropdown */}
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 w-full sm:w-auto">
                  <span>FUEL:</span>
                  <select
                    value={selectedFuel.id}
                    onChange={(e) => {
                      playClick();
                      const fuel = SMELTING_FUELS.find(f => f.id === e.target.value);
                      if (fuel) setSelectedFuel(fuel);
                    }}
                    className="bg-[#12131c] border border-[#2e2f42] rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                  >
                    {SMELTING_FUELS.map(fuel => (
                      <option key={fuel.id} value={fuel.id}>
                        {fuel.name} ({fuel.itemsSmelted} items / {fuel.burnTimeSeconds}s)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Big Smelt Button */}
                <button
                  onClick={handleIgniteSmelt}
                  disabled={isSmelting || !isCompatible}
                  className={`w-full sm:w-auto py-2.5 px-6 font-silkscreen text-xs rounded transition-all flex items-center justify-center gap-2 shadow-lg ${
                    !isCompatible
                      ? 'bg-zinc-800 text-zinc-500 border border-zinc-700 cursor-not-allowed'
                      : isSmelting
                        ? 'bg-orange-700 text-white animate-pulse'
                        : 'mc-btn mc-btn-green'
                  }`}
                >
                  <Flame className="w-4 h-4 text-orange-300" />
                  <span>
                    {isSmelting ? 'SMELTING IN PROGRESS...' : 'IGNITE & SMELT ITEM'}
                  </span>
                </button>

              </div>

            </div>

            {/* "WHAT WILL BECOME OF THE ITEM" Detailed Transformation Breakdown Card */}
            <div className="mc-panel p-6 rounded-xl bg-[#171822] border-4 border-[#353648] shadow-2xl space-y-4">
              
              <div className="flex items-center justify-between border-b border-[#292a3a] pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  <span className="font-silkscreen text-xs text-white font-bold">
                    TRANSFORMATION DETAILS: WHAT HAPPENS TO THE ITEM?
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">
                  METAMORPHOSIS & REFINEMENT
                </span>
              </div>

              {/* Before vs After Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Before Card */}
                <div className="p-4 rounded-lg bg-[#12131b] border border-[#252636] space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-600" />
                    <span className="font-silkscreen text-xs text-zinc-300">
                      RAW / UNCOOKED STATE
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <img 
                      src={selectedRecipe.input.icon} 
                      alt={selectedRecipe.input.name} 
                      className="w-10 h-10 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <div>
                      <span className="font-silkscreen text-xs text-white block">
                        {selectedRecipe.input.name}
                      </span>
                      <p className="text-[11px] font-mono text-zinc-400 mt-0.5">
                        {selectedRecipe.changeDetails?.before}
                      </p>
                    </div>
                  </div>
                </div>

                {/* After Card */}
                <div className="p-4 rounded-lg bg-[#1a1c12] border border-[#526325] space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-silkscreen text-xs text-emerald-300">
                      REFINED / COOKED STATE
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1">
                    <img 
                      src={selectedRecipe.output.icon} 
                      alt={selectedRecipe.output.name} 
                      className="w-10 h-10 object-contain"
                      style={{ imageRendering: 'pixelated' }}
                    />
                    <div>
                      <span className="font-silkscreen text-xs text-white block">
                        {selectedRecipe.output.name}
                      </span>
                      <p className="text-[11px] font-mono text-zinc-300 mt-0.5">
                        {selectedRecipe.changeDetails?.after}
                      </p>
                    </div>
                  </div>
                </div>

              </div>

              {/* Summary Explanation Text */}
              <div className="p-3.5 rounded-lg bg-[#141520] border border-[#2b2c3e] text-xs font-mono text-zinc-300 space-y-1.5">
                <div className="flex items-center gap-2 text-orange-400 font-silkscreen text-[11px]">
                  <Info className="w-3.5 h-3.5" />
                  <span>PROCESS SUMMARY:</span>
                </div>
                <p>{selectedRecipe.transformation}</p>
                {selectedRecipe.changeDetails?.bonusTip && (
                  <div className="pt-2 text-yellow-300 text-[11px] flex items-center gap-1.5 font-semibold">
                    <span>💡 PRO TIP:</span>
                    <span>{selectedRecipe.changeDetails.bonusTip}</span>
                  </div>
                )}
              </div>

              {/* Stats Matrix Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-center font-mono">
                <div className="p-2.5 rounded bg-[#13141f] border border-[#232433]">
                  <span className="text-[10px] text-zinc-500 block">STANDARD TIME</span>
                  <span className="text-xs text-white font-bold">10.0s (200t)</span>
                </div>
                <div className="p-2.5 rounded bg-[#13141f] border border-[#232433]">
                  <span className="text-[10px] text-zinc-500 block">2× APPLIANCE</span>
                  <span className="text-xs text-emerald-400 font-bold">5.0s (100t)</span>
                </div>
                <div className="p-2.5 rounded bg-[#13141f] border border-[#232433]">
                  <span className="text-[10px] text-zinc-500 block">EXPERIENCE</span>
                  <span className="text-xs text-yellow-400 font-bold">+{selectedRecipe.experience} XP</span>
                </div>
                <div className="p-2.5 rounded bg-[#13141f] border border-[#232433]">
                  <span className="text-[10px] text-zinc-500 block">FUEL EFFICIENCY</span>
                  <span className="text-xs text-cyan-400 font-bold">{selectedFuel.itemsSmelted} Items / Fuel</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
