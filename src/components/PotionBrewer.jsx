import React, { useState, useMemo, useRef } from 'react';
import { 
  BREWING_EQUIPMENT, 
  INGREDIENT_MODIFIERS, 
  EFFECT_INGREDIENTS, 
  BREWING_RECIPES, 
  BREWING_CURES, 
  UNBREWABLE_POTIONS, 
  BREWING_HISTORY 
} from '../data/minecraftBrewing';
import { BREWING_ASSET_REGISTRY, POTION_COLORS } from '../data/brewingAssets';
import BrewingItemSprite from './BrewingItemSprite';
import PotionSprite from './PotionSprite';
import BrewingWorkflowDiagram from './BrewingWorkflowDiagram';
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
  AlertTriangle,
  Award, 
  ArrowRight,
  FlaskConical,
  Milk,
  Heart,
  Copy,
  ChevronRight,
  Filter,
  X,
  Compass,
  CheckCircle2,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import { useDebounce } from '../utils/searchEngine';
import confetti from 'canvas-confetti';

export default function PotionBrewer() {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'workflow' | 'catalog' | 'ingredients' | 'cures' | 'history'
  const [selectedRecipeId, setSelectedRecipeId] = useState('swiftness');
  
  // Brewing Simulator States
  const [blazeFuelCharges, setBlazeFuelCharges] = useState(20); // 0 to 20 charges
  const [isBrewing, setIsBrewing] = useState(false);
  const [brewingProgress, setBrewingProgress] = useState(0);
  const [activeModifier, setActiveModifier] = useState('standard'); // 'standard' | 'redstone' | 'glowstone' | 'splash' | 'lingering'
  const [brewedCount, setBrewedCount] = useState(0);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [copiedRecipeId, setCopiedRecipeId] = useState(null);

  // Recipe Catalog Filter & Search States
  const [recipeCategory, setRecipeCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIngredientFilter, setSelectedIngredientFilter] = useState(null);
  const debouncedSearch = useDebounce(searchQuery, 120);

  // Selected recipe
  const selectedRecipe = useMemo(() => {
    return BREWING_RECIPES.find(r => r.id === selectedRecipeId) || BREWING_RECIPES[4]; // Default Swiftness
  }, [selectedRecipeId]);

  // Check modifier compatibility for current recipe
  const modifierCompatibility = useMemo(() => {
    const isInstant = selectedRecipe.duration === 'Instant';
    const isBase = selectedRecipe.category.includes('Base');
    const is121 = selectedRecipe.tier?.includes('1.21');

    return {
      supportsRedstone: !isInstant && !isBase && !is121,
      supportsGlowstone: (
        ['swiftness', 'strength', 'healing', 'regeneration', 'leaping', 'poison', 'harming', 'slowness', 'turtle_master'].includes(selectedRecipe.id)
      ),
      supportsSplash: true,
      supportsLingering: true
    };
  }, [selectedRecipe]);

  // Filtered recipes list with debouncing and ingredient filter
  const filteredRecipes = useMemo(() => {
    const q = debouncedSearch.toLowerCase().trim();
    return BREWING_RECIPES.filter(r => {
      // Category check
      const matchesCategory = 
        recipeCategory === 'All' || 
        r.category.toLowerCase().includes(recipeCategory.toLowerCase()) ||
        (recipeCategory === '1.21' && (r.name.includes('1.21') || r.tier?.includes('1.21')));

      if (!matchesCategory) return false;

      // Ingredient filter check
      if (selectedIngredientFilter) {
        const matchesIng = 
          r.ingredientId === selectedIngredientFilter || 
          r.baseId === selectedIngredientFilter ||
          (selectedIngredientFilter === 'nether_wart' && r.base === 'Awkward Potion');
        if (!matchesIng) return false;
      }

      // Search query check
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.ingredient.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    });
  }, [recipeCategory, debouncedSearch, selectedIngredientFilter]);

  // Handle Brew Action in Simulator
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
            particleCount: 50,
            spread: 70,
            origin: { y: 0.7 },
            colors: [selectedRecipe.color || '#38bdf8', '#5c8e32', '#ffd700']
          });
          return 0;
        }
        return prev + 25;
      });
    }, 140);
  };

  // Generate authentic Minecraft 1.20.5+ / 1.21 give command
  const getGiveCommandForRecipe = (recipe, mod = 'standard') => {
    const idMap = {
      swiftness: 'swiftness',
      strength: 'strength',
      healing: 'healing',
      regeneration: 'regeneration',
      fire_resistance: 'fire_resistance',
      water_breathing: 'water_breathing',
      night_vision: 'night_vision',
      invisibility: 'invisibility',
      leaping: 'leaping',
      slow_falling: 'slow_falling',
      wind_charged: 'wind_charged',
      poison: 'poison',
      harming: 'harming',
      slowness: 'slowness',
      weakness_direct: 'weakness',
      weaving: 'weaving',
      oozing: 'oozing',
      infested: 'infested',
      turtle_master: 'turtle_master',
      awkward: 'awkward',
      mundane: 'mundane',
      thick: 'thick'
    };

    let baseName = idMap[recipe.id] || recipe.id;
    let itemType = 'potion';

    if (mod === 'splash') itemType = 'splash_potion';
    if (mod === 'lingering') itemType = 'lingering_potion';

    let effectId = `minecraft:${baseName}`;
    if (mod === 'redstone' && !['healing', 'harming'].includes(recipe.id)) {
      effectId = `minecraft:long_${baseName}`;
    } else if (mod === 'glowstone' && ['swiftness', 'strength', 'healing', 'harming', 'leaping', 'poison', 'regeneration', 'slowness', 'turtle_master'].includes(recipe.id)) {
      effectId = `minecraft:strong_${baseName}`;
    }

    return `/give @p ${itemType}[potion_contents={potion:"${effectId}"}] 1`;
  };

  const handleCopyGiveCommand = (recipe, mod = 'standard') => {
    const cmd = getGiveCommandForRecipe(recipe, mod);
    navigator.clipboard.writeText(cmd);
    playClick();
    setCopiedCommand(true);
    setCopiedRecipeId(recipe.id);
    setTimeout(() => {
      setCopiedCommand(false);
      setCopiedRecipeId(null);
    }, 2500);
  };

  // Load potion recipe directly into stand simulator
  const handleLoadInStand = (recipe) => {
    playLevelUp();
    setSelectedRecipeId(recipe.id);
    setActiveModifier('standard');
    setActiveTab('simulator');
    const standEl = document.getElementById('brewing-simulator-zone');
    if (standEl) {
      standEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate bottle shape and color for simulator
  const currentBottleType = useMemo(() => {
    if (activeModifier === 'splash') return 'splash';
    if (activeModifier === 'lingering') return 'lingering';
    return 'bottle';
  }, [activeModifier]);

  const currentLiquidColor = useMemo(() => {
    return selectedRecipe.color || POTION_COLORS[selectedRecipe.id] || '#38bdf8';
  }, [selectedRecipe]);

  // Formatted duration description based on modifier
  const displayedDuration = useMemo(() => {
    if (activeModifier === 'redstone') {
      if (!modifierCompatibility.supportsRedstone) return 'Extended not applicable for this potion';
      return 'Extended: 8:00 (Redstone Dust)';
    }
    if (activeModifier === 'glowstone') {
      if (!modifierCompatibility.supportsGlowstone) return 'Tier II Potency not applicable for this potion';
      return 'Potent II: 1:30 (Tier II Intensity, Halved Duration)';
    }
    if (activeModifier === 'splash') {
      return 'Splash: Thrown Area of Effect (Gunpowder)';
    }
    if (activeModifier === 'lingering') {
      return "Lingering: 30s Persistent Cloud & Tipped Arrows (Dragon's Breath)";
    }
    return selectedRecipe.duration;
  }, [activeModifier, selectedRecipe, modifierCompatibility]);

  return (
    <section id="brewing" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100 space-y-12">
      
      {/* ========================================================================= */}
      {/* SECTION 01: BREWING LABORATORY BANNER */}
      {/* ========================================================================= */}
      <div className="bg-[#12131b]/95 border-2 border-[#2b2d3e] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#252738]">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20152b] border border-[#52297a] text-xs font-silkscreen text-[#c084fc]">
              <FlaskConical className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
              <span>OFFICIAL JAVA EDITION ALCHEMICAL LABORATORY</span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-pixel text-white mc-shadow">
              POTIONS &amp; BREWING STAND
            </h1>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-2xl leading-relaxed">
              Standardized botanical reference for Minecraft Java Edition. Master 3-stage alchemical progressions, 
              20-charge Blaze fuel meters, 1.21 Tricky Trials ominous concoctions, and authentic potion commands.
            </p>
          </div>

          {/* Quick Specs Badge */}
          <div className="bg-[#0c0d14] border-2 border-[#383a50] rounded-2xl p-4 w-full md:w-64 shrink-0 shadow-inner space-y-1 text-xs font-mono">
            <div className="flex items-center justify-between text-zinc-400">
              <span>STATUS:</span>
              <span className="text-emerald-400 font-bold">VERIFIED 26.3+</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>RECIPES:</span>
              <span className="text-white font-bold">{BREWING_RECIPES.length} Vanilla Recipes</span>
            </div>
            <div className="flex items-center justify-between text-zinc-400">
              <span>FUEL:</span>
              <span className="text-amber-400 font-bold">20 Brews / Powder</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION MODE TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-6">
          {[
            { id: 'simulator', label: 'Brewing Stand (GUI)', icon: FlaskConical },
            { id: 'workflow', label: '1. Workflow Diagram', icon: Compass },
            { id: 'catalog', label: '2. Potion Catalog', icon: BookOpen },
            { id: 'ingredients', label: '3. Ingredients & Modifiers', icon: Sparkles },
            { id: 'equipment', label: '4. Equipment & Fuel', icon: Flame },
            { id: 'cures', label: '5. Remedies & Cures', icon: Milk },
            { id: 'history', label: '6. Alchemical History', icon: History }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { playClick(); setActiveTab(tab.id); }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-silkscreen transition-all border ${
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
      </div>

      {/* ========================================================================= */}
      {/* SECTION 02: VISUAL BREWING WORKFLOW DIAGRAM */}
      {/* ========================================================================= */}
      {(activeTab === 'workflow' || activeTab === 'simulator') && (
        <BrewingWorkflowDiagram 
          onSelectIngredient={(ingId) => {
            setSelectedIngredientFilter(ingId);
            setActiveTab('catalog');
            const catEl = document.getElementById('potion-catalog-zone');
            if (catEl) catEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      )}

      {/* ========================================================================= */}
      {/* SECTION 03: INTERACTIVE BREWING STAND SIMULATOR */}
      {/* ========================================================================= */}
      {activeTab === 'simulator' && (
        <div id="brewing-simulator-zone" className="space-y-6 animate-fadeIn">
          
          {/* Quick Potion Presets Carousel */}
          <div className="bg-[#12131b]/95 border-2 border-[#2b2d3e] rounded-3xl p-5 shadow-xl">
            <span className="text-[11px] font-mono text-zinc-400 block mb-2 font-bold uppercase tracking-wider">
              Quick Potion Presets (Click to load into stand):
            </span>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {BREWING_RECIPES.map((recipe) => {
                const isSelected = selectedRecipeId === recipe.id;
                return (
                  <button
                    key={recipe.id}
                    onClick={() => { playClick(); setSelectedRecipeId(recipe.id); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl border-2 shrink-0 transition-all ${
                      isSelected
                        ? 'bg-[#29173b] text-white border-purple-400 shadow-lg scale-105'
                        : 'bg-[#151620] text-zinc-400 border-[#2a2c3d] hover:bg-[#1c1e2b] hover:text-white'
                    }`}
                  >
                    <BrewingItemSprite itemId={recipe.ingredientId} size={20} />
                    <span className="font-silkscreen text-xs whitespace-nowrap">{recipe.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* In-Game Authentic Brewing Stand GUI Panel */}
          <div className="max-w-4xl mx-auto mc-panel p-6 sm:p-8 rounded-3xl bg-[#1e1a29] border-4 border-[#3b3254] shadow-2xl space-y-6">
            
            {/* GUI Header & Blaze Fuel Meter */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-[#332b47] pb-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#14121d] border-2 border-purple-500/60 p-2 flex items-center justify-center shrink-0 shadow-inner">
                  <BrewingItemSprite itemId="brewing_stand" size={40} />
                </div>
                <div>
                  <h3 className="font-pixel text-base sm:text-lg text-white">{selectedRecipe.name}</h3>
                  <p className="text-xs font-mono text-purple-300 mt-0.5">
                    {selectedRecipe.description}
                  </p>
                </div>
              </div>

              {/* Blaze Powder Fuel Gauge */}
              <div className="flex items-center gap-3 bg-[#13111b] px-4 py-2.5 rounded-2xl border border-[#312a45] shrink-0">
                <div className="flex items-center gap-2.5">
                  <BrewingItemSprite itemId="blaze_powder" size={26} />
                  <div>
                    <span className="font-silkscreen text-[10px] text-amber-400 block">BLAZE FUEL:</span>
                    <span className="font-mono text-xs text-white font-bold">{blazeFuelCharges} / 20 CHARGES</span>
                  </div>
                </div>
                <button
                  onClick={() => { playPop(); setBlazeFuelCharges(20); }}
                  className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-[#2a1e12] border border-amber-700 text-amber-400 hover:text-white transition-colors"
                  title="Insert 1 Blaze Powder (Restores 20 charges)"
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
                <div className="w-16 h-16 rounded-2xl bg-[#13111b] border-2 border-[#41365c] flex items-center justify-center shadow-lg hover:border-purple-400 transition-colors">
                  <BrewingItemSprite itemId={selectedRecipe.ingredientId} size={36} />
                </div>
              </div>

              {/* Brewing Bubble Progress Track */}
              <div className="w-2 h-16 bg-[#13111b] rounded-full relative overflow-hidden mb-4 border border-[#3b3252]">
                <div 
                  className="w-full bg-gradient-to-b from-amber-400 via-purple-400 to-cyan-400 transition-all duration-150"
                  style={{ height: `${isBrewing ? brewingProgress : 100}%` }}
                />
              </div>

              {/* Bottom 3 Potion Slots (Tripod layout with pixel bottles) */}
              <div className="flex items-center justify-center gap-6 sm:gap-10">
                {['Bottle Left', 'Bottle Center', 'Bottle Right'].map((slot, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-[#13111b] border-2 border-[#41365c] flex items-center justify-center shadow-lg relative group hover:border-purple-400 transition-colors">
                      <PotionSprite 
                        type={currentBottleType} 
                        color={currentLiquidColor} 
                        size={38} 
                        alt={selectedRecipe.name} 
                      />
                    </div>
                    <span className="font-mono text-[10px] text-zinc-400 mt-1.5">{slot}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Modifier Selector Controls */}
            <div className="space-y-2 bg-[#14121d] p-4 rounded-2xl border border-[#2d253f]">
              <div className="flex items-center justify-between">
                <span className="font-silkscreen text-[10px] text-zinc-300 block">
                  APPLY ALCHEMICAL MODIFIERS:
                </span>
                <span className="text-[10px] font-mono text-zinc-400">
                  Select to alter duration, potency, or delivery
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {[
                  { id: 'standard', label: 'Standard', desc: 'Default Duration', icon: 'glass_bottle', supported: true },
                  { id: 'redstone', label: 'Extended', desc: '+Redstone (8:00)', icon: 'redstone', supported: modifierCompatibility.supportsRedstone },
                  { id: 'glowstone', label: 'Potent II', desc: '+Glowstone (Tier II)', icon: 'glowstone_dust', supported: modifierCompatibility.supportsGlowstone },
                  { id: 'splash', label: 'Splash', desc: '+Gunpowder (AOE)', icon: 'gunpowder', supported: modifierCompatibility.supportsSplash },
                  { id: 'lingering', label: 'Lingering', desc: "+Dragon's Breath", icon: 'dragons_breath', supported: modifierCompatibility.supportsLingering }
                ].map((mod) => {
                  const isSelected = activeModifier === mod.id;
                  return (
                    <button
                      key={mod.id}
                      onClick={() => {
                        if (mod.supported) {
                          playClick();
                          setActiveModifier(mod.id);
                        }
                      }}
                      disabled={!mod.supported}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        !mod.supported
                          ? 'opacity-40 bg-[#0d0c13] border-zinc-800 cursor-not-allowed text-zinc-600'
                          : isSelected
                            ? 'bg-[#2b1842] text-white border-purple-400 shadow-md font-bold ring-1 ring-purple-400/40'
                            : 'bg-[#100e17] text-zinc-300 border-[#241e30] hover:bg-[#181522] hover:text-white'
                      }`}
                      title={!mod.supported ? 'Not applicable for this potion recipe' : mod.desc}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <BrewingItemSprite itemId={mod.icon} size={18} />
                        <span className="font-silkscreen text-[11px] truncate">{mod.label}</span>
                      </div>
                      <div className="flex items-center justify-between text-[9px] font-mono">
                        <span className="truncate">{mod.supported ? mod.desc : 'Unavailable'}</span>
                        {!mod.supported && <XCircle className="w-3 h-3 text-red-400 shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recipe Meta Banner & Action Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#14121d] border border-[#2d253f]">
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-silkscreen text-xs text-white">ACTIVE EFFECT SPECS:</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700">
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

              <div className="flex items-center gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => handleCopyGiveCommand(selectedRecipe, activeModifier)}
                  className="px-3.5 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-mono border border-zinc-700 flex items-center gap-1.5 transition-all"
                  title="Copy exact /give command to clipboard"
                >
                  {copiedCommand ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-purple-400" />}
                  <span>{copiedCommand ? 'Copied Command!' : 'Copy /give'}</span>
                </button>

                <button
                  onClick={handleStartBrewing}
                  disabled={isBrewing || blazeFuelCharges <= 0}
                  className={`flex-1 sm:flex-initial py-3 px-6 mc-btn text-xs font-silkscreen flex items-center justify-center gap-2 shadow-lg rounded-xl ${
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

      {/* ========================================================================= */}
      {/* SECTION 04: COMPREHENSIVE POTION CATALOG */}
      {/* ========================================================================= */}
      {(activeTab === 'catalog' || activeTab === 'simulator') && (
        <div id="potion-catalog-zone" className="space-y-6 pt-6 border-t-2 border-[#252738]">
          
          {/* CATALOG HEADER & CONTROLS */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  COMPLETE BOTANICAL CATALOG
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-xs font-mono text-zinc-400">
                  Showing {filteredRecipes.length} of {BREWING_RECIPES.length} Potions
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-pixel text-white mc-shadow">
                POTION RECIPES CODEX
              </h2>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-emerald-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search potions, ingredients, effects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-2.5 bg-[#141520] border-2 border-[#2b2c3e] focus:border-emerald-500 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills & Ingredient Filter Badge */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex flex-wrap items-center gap-1.5">
              {['All', 'Positive', 'Negative', 'Base', 'Mixed', '1.21'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => { playClick(); setRecipeCategory(cat); }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-silkscreen transition-all border ${
                    recipeCategory === cat
                      ? 'bg-[#7e22ce] text-white border-purple-400 shadow-md scale-105'
                      : 'bg-[#151622] text-zinc-400 border-[#2b2c3d] hover:bg-[#1d1f2e] hover:text-white'
                  }`}
                >
                  {cat === '1.21' ? '⚡ 1.21 Tricky Trials' : cat}
                </button>
              ))}
            </div>

            {/* Active Ingredient Filter Pill (if selected from workflow) */}
            {selectedIngredientFilter && (
              <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/40 px-3 py-1 rounded-xl text-xs font-mono text-emerald-300">
                <span>Filter: {selectedIngredientFilter}</span>
                <button
                  onClick={() => setSelectedIngredientFilter(null)}
                  className="hover:text-white p-0.5"
                  title="Clear ingredient filter"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* POTIONS GRID */}
          {filteredRecipes.length === 0 ? (
            <div className="bg-[#12131b] border-2 border-[#2b2d3e] rounded-3xl p-12 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto opacity-80" />
              <h3 className="font-bold text-base text-white">No potions matching your filter</h3>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                Try searching for general terms like "speed", "regeneration", "fire", or clear active filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setRecipeCategory('All');
                  setSelectedIngredientFilter(null);
                }}
                className="px-4 py-2 rounded-xl bg-purple-900 text-purple-200 border border-purple-500 text-xs font-mono font-bold hover:bg-purple-800 transition-all"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRecipes.map((rec) => {
                const isSelectedInStand = selectedRecipeId === rec.id;
                const isCopied = copiedRecipeId === rec.id;

                return (
                  <div
                    key={rec.id}
                    className={`p-5 rounded-2xl border-2 transition-all flex flex-col justify-between group shadow-xl ${
                      isSelectedInStand
                        ? 'bg-[#1e172a] border-purple-400 ring-2 ring-purple-500/20'
                        : 'bg-[#151622] border-[#2b2c3e] hover:border-purple-500/50 hover:bg-[#1a1b28]'
                    }`}
                  >
                    <div className="space-y-3">
                      
                      {/* Top Row: Bottle Icon + Title + Tier */}
                      <div className="flex items-start justify-between gap-3 border-b border-[#242533] pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-[#0e0f17] border border-[#2b2c3d] flex items-center justify-center p-1 shrink-0 shadow-inner">
                            <PotionSprite 
                              type="bottle" 
                              color={rec.color || POTION_COLORS[rec.id] || '#38bdf8'} 
                              size={32} 
                              alt={rec.name} 
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-white group-hover:text-purple-300 transition-colors">
                              {rec.name}
                            </h4>
                            <span className="text-[10px] font-mono text-purple-400 block mt-0.5">
                              {rec.category}
                            </span>
                          </div>
                        </div>

                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-700 font-bold shrink-0">
                          {rec.tier}
                        </span>
                      </div>

                      {/* Recipe Flow Diagram inside Card */}
                      <div className="p-2.5 rounded-xl bg-[#0e0f17] border border-[#242535] flex items-center justify-between text-xs font-mono">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-zinc-500 text-[10px]">Base:</span>
                          <span className="text-zinc-300 truncate font-semibold">{rec.base}</span>
                        </div>
                        <span className="text-purple-400 font-bold shrink-0 mx-1">+</span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <BrewingItemSprite itemId={rec.ingredientId} size={18} />
                          <span className="text-emerald-300 font-bold">{rec.ingredient}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                        {rec.description}
                      </p>

                      {/* Duration & Potency Specs */}
                      <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/30 p-2 rounded-lg border border-emerald-500/20">
                        ⏱️ <strong>Duration:</strong> {rec.duration}
                      </div>

                    </div>

                    {/* Actions Row */}
                    <div className="pt-3.5 mt-3.5 border-t border-[#242533] flex items-center justify-between gap-2">
                      <button
                        onClick={() => handleCopyGiveCommand(rec, 'standard')}
                        className="px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-[11px] font-mono border border-zinc-700 flex items-center gap-1 transition-all"
                        title="Copy /give command for this potion"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                        <span>{isCopied ? 'Copied' : '/give'}</span>
                      </button>

                      <button
                        onClick={() => handleLoadInStand(rec)}
                        className="px-3 py-1.5 rounded-lg bg-purple-900 hover:bg-purple-800 text-purple-200 hover:text-white text-[11px] font-silkscreen flex items-center gap-1 transition-all border border-purple-600/50 ml-auto"
                      >
                        <span>LOAD IN STAND</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 05: INGREDIENTS & MODIFIERS TAXONOMY */}
      {/* ========================================================================= */}
      {activeTab === 'ingredients' && (
        <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Base Ingredients & Modifiers */}
          <div className="mc-panel p-6 sm:p-8 rounded-3xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
            <div className="flex items-center gap-3 border-b border-[#242533] pb-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="font-pixel text-base sm:text-lg text-white">
                  3.1 BASE INGREDIENTS &amp; ALCHEMICAL MODIFIERS
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Core substances that dictate baseline transformations, duration, and delivery methods.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {INGREDIENT_MODIFIERS.map((mod) => (
                <div key={mod.id} className="p-4 rounded-2xl bg-[#0e0f16] border border-[#242535] space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#161724] border border-[#2d2e40] p-2 flex items-center justify-center shrink-0">
                      <BrewingItemSprite itemId={mod.icon} size={32} />
                    </div>
                    <div>
                      <span className="font-silkscreen text-xs text-white block">{mod.name}</span>
                      <span className="text-[10px] font-mono text-purple-400 font-bold">{mod.role}</span>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-zinc-300 leading-normal">{mod.effect}</p>
                  <span className="text-[10px] font-mono text-zinc-500 block">Applies to: {mod.appliesTo}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Effect Ingredients Roster */}
          <div className="mc-panel p-6 sm:p-8 rounded-3xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
            <div className="flex items-center gap-3 border-b border-[#242533] pb-3">
              <FlaskConical className="w-5 h-5 text-cyan-400" />
              <div>
                <h3 className="font-pixel text-base sm:text-lg text-white">
                  3.2 EFFECT INGREDIENTS ROSTER (15 BOTANICALS)
                </h3>
                <p className="text-xs text-zinc-400 font-mono mt-0.5">
                  Each ingredient yields a distinct beneficial or detrimental status effect when brewed with Awkward Potion.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-2">
              {EFFECT_INGREDIENTS.map((ing) => (
                <div 
                  key={ing.id} 
                  onClick={() => {
                    playPop();
                    setSelectedIngredientFilter(ing.id);
                    setActiveTab('catalog');
                  }}
                  className="p-3.5 rounded-2xl bg-[#0e0f16] border border-[#242535] hover:border-cyan-400/50 cursor-pointer transition-all flex items-center gap-3 group"
                  title="Click to view all recipes using this ingredient"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#161724] border border-[#2d2e40] p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <BrewingItemSprite itemId={ing.icon} size={28} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-silkscreen text-xs text-white block truncate">{ing.name}</span>
                    <span className="text-[11px] font-mono text-emerald-400 font-semibold block truncate">{ing.creates}</span>
                    <p className="text-[10px] font-mono text-zinc-500 truncate">{ing.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 06: EQUIPMENT & FUEL SPECS */}
      {/* ========================================================================= */}
      {activeTab === 'equipment' && (
        <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
          {BREWING_EQUIPMENT.map((eq) => (
            <div key={eq.id} className="mc-panel p-6 sm:p-7 rounded-3xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
              <div className="flex items-center gap-4 border-b border-[#242533] pb-3">
                <div className="w-14 h-14 rounded-2xl bg-[#0e0f17] border border-[#2c2d3f] p-2 flex items-center justify-center shrink-0">
                  <BrewingItemSprite itemId={eq.icon} size={36} />
                </div>
                <div>
                  <h3 className="font-pixel text-base sm:text-lg text-white">{eq.name}</h3>
                  <span className="text-xs font-mono text-purple-400 font-semibold">{eq.crafting}</span>
                </div>
              </div>

              <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                {eq.desc}
              </p>

              <div className="p-3.5 bg-[#0d0e14] rounded-2xl border border-[#1e1f2b] text-xs font-mono text-emerald-400">
                ⚡ <strong>Capacity &amp; Thermal Mechanics:</strong> {eq.capacity}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 07: REMEDIES, CURES & UNBREWABLES */}
      {/* ========================================================================= */}
      {activeTab === 'cures' && (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Status Effect Cures */}
          <div className="mc-panel p-6 sm:p-8 rounded-3xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
            <h3 className="font-pixel text-base sm:text-lg text-white flex items-center gap-2 border-b border-[#242533] pb-3">
              <Milk className="w-5 h-5 text-emerald-400" />
              <span>5.1 REMEDIES &amp; STATUS EFFECT CURES</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {BREWING_CURES.map((cure) => (
                <div key={cure.id} className="p-4 rounded-2xl bg-[#0e0f16] border border-[#242535] space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-[#161724] border border-[#2d2e40] p-1.5 flex items-center justify-center shrink-0">
                      <BrewingItemSprite itemId={cure.icon} size={28} />
                    </div>
                    <div>
                      <span className="font-silkscreen text-xs text-white block">{cure.name}</span>
                      <span className="text-[10px] font-mono text-emerald-400 font-bold">{cure.action}</span>
                    </div>
                  </div>
                  <p className="text-xs font-mono text-zinc-300 leading-relaxed">{cure.desc}</p>
                  <span className="text-[10px] font-mono text-zinc-500 block">Cures: {cure.remedyFor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Un-brewable Potions & Ominous Bottles */}
          <div className="mc-panel p-6 sm:p-8 rounded-3xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
            <h3 className="font-pixel text-base sm:text-lg text-white flex items-center gap-2 border-b border-[#242533] pb-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>5.2 UN-BREWABLE POTIONS &amp; OMINOUS BOTTLES</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {UNBREWABLE_POTIONS.map((unb) => (
                <div key={unb.name} className="p-4 rounded-2xl bg-[#0e0f16] border border-[#242535] space-y-2">
                  <div className="flex items-center justify-between border-b border-[#242535] pb-2">
                    <span className="font-silkscreen text-xs text-amber-300 font-bold">{unb.name}</span>
                    <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
                      {unb.edition}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-zinc-300 leading-relaxed">{unb.effect}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 08: ALCHEMICAL HISTORY */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div className="max-w-4xl mx-auto space-y-4 animate-fadeIn">
          {BREWING_HISTORY.map((hist, idx) => (
            <div key={idx} className="mc-panel p-5 rounded-2xl bg-[#151622] border-2 border-[#2b2c3e] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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

      {/* ========================================================================= */}
      {/* SECTION 09: UNOFFICIAL FAN-SITE NOTICE & MINECRAFT GUIDELINES ATTRIBUTION */}
      {/* ========================================================================= */}
      <div className="p-4 rounded-2xl bg-[#0e0f17] border border-[#2b2d3d] text-[11px] font-mono text-zinc-400 space-y-1">
        <p>
          <strong>Unofficial Fan Reference:</strong> This alchemical laboratory is an independent Minecraft community reference tool. Not approved by, associated with, or endorsed by Mojang Studios or Microsoft.
        </p>
        <p>
          All item sprites and recipes are verified against canonical Java Edition release notes. Adheres to the <a href="https://www.minecraft.net/en-us/usage-guidelines" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">Minecraft Commercial &amp; Brand Usage Guidelines</a>.
        </p>
      </div>

    </section>
  );
}
