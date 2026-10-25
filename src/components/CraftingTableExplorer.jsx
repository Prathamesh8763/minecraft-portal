import React, { useState, useMemo } from 'react';
import { AUTHENTIC_RECIPES, RECIPE_CATEGORIES } from '../data/minecraftRecipes';
import { Hammer, Search, Sparkles, BookOpen, Check, Layers, ArrowRight, RotateCcw, Flame } from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import confetti from 'canvas-confetti';

export default function CraftingTableExplorer() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState(AUTHENTIC_RECIPES[0]);
  const [craftCount, setCraftCount] = useState(0);
  const [isCrafting, setIsCrafting] = useState(false);

  // Filter recipes based on category and search query
  const filteredRecipes = useMemo(() => {
    return AUTHENTIC_RECIPES.filter(recipe => {
      const matchesCategory = selectedCategory === 'All' || recipe.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesName = recipe.name.toLowerCase().includes(q);
      const matchesCategoryName = recipe.category.toLowerCase().includes(q);
      const matchesTags = recipe.tags?.some(tag => tag.toLowerCase().includes(q));
      const matchesIngredients = recipe.ingredients?.some(ing => ing.name.toLowerCase().includes(q));

      return matchesCategory && (matchesName || matchesCategoryName || matchesTags || matchesIngredients);
    });
  }, [selectedCategory, searchQuery]);

  const handleSelectRecipe = (recipe) => {
    playClick();
    setSelectedRecipe(recipe);
  };

  const handleCraft = () => {
    playPop();
    setIsCrafting(true);
    setTimeout(() => {
      setIsCrafting(false);
      setCraftCount(prev => prev + (selectedRecipe.outputCount || 1));
      playLevelUp();
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.72 },
        colors: ['#4aedd9', '#5c8e32', '#f8c53a']
      });
    }, 220);
  };

  const renderSlotIcon = (item, sizeClass = "w-8 h-8") => {
    if (!item || !item.icon) return null;
    return (
      <img
        src={item.icon}
        alt={item.name}
        className={`${sizeClass} object-contain filter drop-shadow`}
        style={{ imageRendering: 'pixelated' }}
        loading="lazy"
      />
    );
  };

  return (
    <section id="crafting" className="py-20 bg-[#0d0e14] border-t-4 border-[#252535] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1c2e17] border border-[#4a7528] text-[11px] font-silkscreen text-[#9ee256]">
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>OFFICIAL JAVA RECIPE BOOK</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            CRAFTING TABLE & COMBINATIONS
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Search 100% real, official Minecraft Java crafting combinations. Discover required ingredients, exact 3×3 grid patterns, and output yields.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mb-6">
          {RECIPE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => { playClick(); setSelectedCategory(cat); }}
                className={`px-3 py-1.5 rounded text-xs font-silkscreen transition-all border ${
                  isSelected
                    ? 'bg-[#5c8e32] text-white border-[#89c44e] shadow-md scale-105'
                    : 'bg-[#181924] text-zinc-400 border-[#2b2c3d] hover:bg-[#202130] hover:text-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search & Suggestions Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 max-w-5xl mx-auto">
          
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search recipe or ingredient (e.g. pickaxe, iron, mace, piston)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-[#141520] border-2 border-[#2b2c3e] rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

          {/* Quick Suggestions Tags */}
          <div className="flex items-center gap-1.5 flex-wrap text-xs font-mono text-zinc-400">
            <span className="text-[11px] font-silkscreen text-zinc-500">POPULAR:</span>
            {['The Mace', 'Diamond Pickaxe', 'Piston', 'Crafter', 'Shield', 'Golden Apple'].map((item) => (
              <button
                key={item}
                onClick={() => { playClick(); setSearchQuery(item); }}
                className="px-2 py-0.5 rounded bg-[#181824] hover:bg-[#222232] text-zinc-300 hover:text-emerald-400 border border-[#2b2b3d] text-[11px]"
              >
                {item}
              </button>
            ))}
          </div>

        </div>

        {/* Main Crafting Workspace Grid (Recipe Book on Left, Workbench on Right) */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Authentic Recipe Book (Item Grid) */}
          <div className="lg:col-span-5 mc-panel p-5 rounded-xl bg-[#171822] border-4 border-[#353648] shadow-2xl flex flex-col h-[560px]">
            
            {/* Recipe Book Header */}
            <div className="flex items-center justify-between border-b-2 border-[#272838] pb-3 mb-3 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded bg-[#4a7528] flex items-center justify-center border border-[#75af3e]">
                  <BookOpen className="w-3 h-3 text-white" />
                </div>
                <span className="font-silkscreen text-xs text-white font-bold">RECIPE BOOK</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                {filteredRecipes.length} FORMULAS AVAILABLE
              </span>
            </div>

            {/* Scrollable Recipe Item Grid */}
            <div className="flex-1 overflow-y-auto pr-1 space-y-1.5 custom-scrollbar">
              {filteredRecipes.map((recipe) => {
                const isSelected = selectedRecipe.id === recipe.id;
                return (
                  <div
                    key={recipe.id}
                    onClick={() => handleSelectRecipe(recipe)}
                    className={`p-2.5 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between group ${
                      isSelected
                        ? 'bg-[#22351c] border-[#75af3e] shadow-md translate-x-1'
                        : 'bg-[#12131c] border-[#222332] hover:bg-[#1a1b28] hover:border-[#38394e]'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {/* Icon with Slot Styling */}
                      <div className="w-10 h-10 rounded bg-[#1c1d29] border border-[#2e2f42] flex items-center justify-center p-1 shrink-0 relative group-hover:scale-105 transition-transform">
                        {renderSlotIcon(recipe.result, "w-7 h-7")}
                        {recipe.outputCount > 1 && (
                          <span className="absolute -bottom-1 -right-1 text-[9px] font-mono font-bold bg-emerald-950 text-emerald-400 px-1 rounded border border-emerald-800">
                            x{recipe.outputCount}
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <span className={`font-silkscreen text-xs block truncate ${isSelected ? 'text-emerald-300 font-bold' : 'text-zinc-200 group-hover:text-white'}`}>
                          {recipe.name}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-500 mt-0.5">
                          <span className="text-zinc-400">{recipe.category}</span>
                          <span>•</span>
                          <span className="truncate">{recipe.version}</span>
                        </div>
                      </div>
                    </div>

                    <ArrowRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isSelected ? 'text-emerald-400 rotate-0' : 'text-zinc-600'}`} />
                  </div>
                );
              })}

              {filteredRecipes.length === 0 && (
                <div className="text-center py-16 text-zinc-500 font-mono text-xs">
                  No recipes match "{searchQuery}". Try searching for another item or clearing filters!
                </div>
              )}
            </div>

            {/* Quick Status Footer */}
            <div className="pt-3 border-t border-[#272838] mt-2 shrink-0 flex items-center justify-between text-[10px] font-mono text-zinc-500">
              <span>CLICK TO LOAD INTO BENCH</span>
              <span className="text-emerald-400 font-semibold">100% VANILLA PARITY</span>
            </div>

          </div>

          {/* Right Column: 3×3 Workbench & Selected Recipe Detailed View */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Workbench GUI Panel */}
            <div className="mc-panel p-6 sm:p-8 rounded-xl bg-[#1b1c28] border-4 border-[#3c3d52] shadow-2xl">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b-2 border-[#2b2c3e] pb-3 mb-6">
                <div className="flex items-center gap-2">
                  <Hammer className="w-4 h-4 text-emerald-400" />
                  <span className="font-silkscreen text-xs text-white font-bold">CRAFTING TABLE (3×3)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    selectedRecipe.shapeless 
                      ? 'bg-amber-950/80 text-amber-400 border border-amber-800' 
                      : 'bg-cyan-950/80 text-cyan-400 border border-cyan-800'
                  }`}>
                    {selectedRecipe.shapeless ? 'SHAPELESS RECIPE' : 'SHAPED PATTERN'}
                  </span>
                </div>
              </div>

              {/* 3×3 Grid & Output Layout */}
              <div className="flex flex-col sm:flex-row items-center justify-around gap-8 py-4">
                
                {/* 3x3 Grid Box */}
                <div className="p-4 bg-[#12131d] rounded-lg border-2 border-[#2b2c3d] shadow-inner">
                  <div className="grid grid-cols-3 gap-2.5">
                    {selectedRecipe.grid.map((slot, idx) => (
                      <div
                        key={idx}
                        className={`mc-slot ${slot ? 'mc-slot-active' : ''}`}
                        title={slot ? slot.name : 'Empty Slot'}
                      >
                        {slot ? (
                          <div className="flex flex-col items-center justify-center p-1 animate-fadeIn">
                            {renderSlotIcon(slot, "w-7 h-7")}
                            <span className="text-[7.5px] font-mono text-zinc-400 truncate max-w-[44px] mt-0.5 text-center leading-none">
                              {slot.name.split(' ')[0]}
                            </span>
                          </div>
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-zinc-800"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex flex-col items-center justify-center space-y-1 text-zinc-500">
                  <div className="w-10 h-10 rounded-full bg-[#12131d] border-2 border-[#2b2c3d] flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="text-[9px] font-mono">CRAFTS</span>
                </div>

                {/* Output Slot */}
                <div className="flex flex-col items-center space-y-3">
                  <div className="p-4 bg-[#12131d] rounded-lg border-2 border-[#2b2c3d] shadow-inner flex items-center justify-center">
                    <div className="w-20 h-20 bg-[#252636] border-4 border-[#12131d] rounded flex flex-col items-center justify-center relative mc-enchant-glint shadow-md p-2">
                      {renderSlotIcon(selectedRecipe.result, "w-11 h-11")}
                      {selectedRecipe.outputCount > 1 && (
                        <span className="absolute bottom-1 right-1 text-xs font-mono font-bold bg-emerald-950 text-emerald-400 px-1 rounded border border-emerald-800">
                          x{selectedRecipe.outputCount}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={handleCraft}
                    disabled={isCrafting}
                    className="mc-btn mc-btn-green text-xs py-2 px-6 w-full flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isCrafting ? 'CRAFTING...' : 'CRAFT NOW'}</span>
                  </button>
                </div>

              </div>

              {/* Ingredients Checklist */}
              <div className="mt-6 pt-5 border-t border-[#2a2b3d]">
                <span className="text-[10px] font-silkscreen text-zinc-400 block tracking-wider mb-2">
                  REQUIRED INGREDIENTS:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedRecipe.ingredients.map((ing, i) => (
                    <div
                      key={i}
                      className="p-2 bg-[#12131c] rounded border border-[#252638] flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        {renderSlotIcon(ing, "w-5 h-5")}
                        <span className="text-zinc-200">{ing.name}</span>
                      </div>
                      <span className="text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-800/40">
                        x{ing.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Recipe Information Card */}
            <div className="mc-panel p-5 rounded-xl bg-[#141520] border-2 border-[#2b2c3d]">
              <div className="flex items-center justify-between border-b border-[#242536] pb-3 mb-3">
                <div>
                  <h3 className="font-silkscreen text-sm text-white font-bold">{selectedRecipe.name}</h3>
                  <span className="text-[10px] font-mono text-zinc-500">Category: {selectedRecipe.category}</span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {selectedRecipe.version}
                </span>
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-normal">
                {selectedRecipe.result.desc}
              </p>

              <div className="mt-4 pt-3 border-t border-[#242536] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span>Output Yield: <strong className="text-white">{selectedRecipe.outputCount}x {selectedRecipe.name}</strong></span>
                <span>Crafts completed: <strong className="text-emerald-400">{craftCount}</strong></span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
