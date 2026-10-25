import React, { useState } from 'react';
import { CRAFTING_RECIPES } from '../data/minecraftData';
import { Hammer, Sparkles, Check, ArrowRight, RotateCcw } from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import confetti from 'canvas-confetti';

export default function CraftingSimulator() {
  const [selectedRecipe, setSelectedRecipe] = useState(CRAFTING_RECIPES[0]);
  const [craftCount, setCraftCount] = useState(0);
  const [isCrafting, setIsCrafting] = useState(false);

  const handleSelectRecipe = (recipe) => {
    playClick();
    setSelectedRecipe(recipe);
  };

  const handleCraft = () => {
    playPop();
    setIsCrafting(true);
    setTimeout(() => {
      setIsCrafting(false);
      setCraftCount(prev => prev + 1);
      playLevelUp();
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ['#4aedd9', '#5c8e32', '#f8c53a']
      });
    }, 250);
  };

  const handleClear = () => {
    playClick();
    setSelectedRecipe({
      id: 'empty',
      name: 'Custom Grid',
      category: 'Empty',
      icon: '/icons/minecraft/crafting_table.svg',
      version: 'All',
      grid: Array(9).fill(null),
      result: null
    });
  };

  const renderIcon = (iconSrc, name, sizeClass = "w-7 h-7") => {
    if (!iconSrc) return null;
    if (typeof iconSrc === 'string' && (iconSrc.startsWith('/') || iconSrc.endsWith('.svg'))) {
      return (
        <img 
          src={iconSrc} 
          alt={name} 
          className={`${sizeClass} object-contain`} 
          style={{ imageRendering: 'pixelated' }} 
        />
      );
    }
    return <span className="text-xl select-none">{iconSrc}</span>;
  };

  return (
    <section id="crafting" className="py-20 bg-[#0d0e14] border-t-4 border-[#252535] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#20202e] border border-[#3b3b4f] text-[11px] font-silkscreen text-[#4aedd9]">
            <Hammer className="w-3.5 h-3.5" />
            <span>INTERACTIVE WORKBENCH</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            3×3 CRAFTING TABLE
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Select canonical recipes from 1.0 through 1.21.3 and 24w40a+ snapshots, powered by authentic Minecraft SVGs.
          </p>
        </div>

        {/* Recipe Selection Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {CRAFTING_RECIPES.map((recipe) => {
            const isSelected = selectedRecipe.id === recipe.id;
            return (
              <button
                key={recipe.id}
                onClick={() => handleSelectRecipe(recipe)}
                className={`px-3 py-2 rounded text-xs font-silkscreen transition-all flex items-center gap-2 border-2 ${
                  isSelected
                    ? 'bg-[#5c8e32] text-white border-[#89c44e] shadow-md scale-105'
                    : 'bg-[#181822] text-zinc-300 border-[#2d2d3e] hover:bg-[#222230] hover:border-[#45455c]'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {renderIcon(recipe.icon, recipe.name, "w-5 h-5")}
                </div>
                <span>{recipe.name}</span>
                <span className="text-[9px] font-mono opacity-80 bg-black/30 px-1 py-0.5 rounded">
                  {recipe.version}
                </span>
              </button>
            );
          })}
        </div>

        {/* Workbench Container */}
        <div className="max-w-4xl mx-auto">
          <div className="mc-panel p-6 sm:p-10 rounded-xl bg-[#1d1d26] border-4 border-[#3c3c4f] shadow-2xl">
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              
              {/* Left Side: 3x3 Grid */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-silkscreen text-xs text-zinc-300 tracking-wider">CRAFTING (3×3)</span>
                  <button 
                    onClick={handleClear}
                    className="text-[11px] font-mono text-zinc-400 hover:text-red-400 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                </div>

                <div className="p-4 bg-[#14141c] rounded-lg border-2 border-[#2b2b3a] inline-block shadow-inner">
                  <div className="grid grid-cols-3 gap-2.5">
                    {selectedRecipe.grid.map((item, idx) => (
                      <div
                        key={idx}
                        className={`mc-slot ${item ? 'mc-slot-active' : ''}`}
                        title={item ? item.name : 'Empty Slot'}
                      >
                        {item ? (
                          <div className="flex flex-col items-center justify-center animate-fadeIn p-1">
                            {renderIcon(item.icon, item.name, "w-7 h-7")}
                            <span className="text-[8px] font-mono text-zinc-400 truncate max-w-[44px] mt-0.5">
                              {item.name.split(' ')[0]}
                            </span>
                          </div>
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-zinc-800"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Arrow */}
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-[#14141c] border-2 border-[#2b2b3a] flex items-center justify-center text-zinc-400">
                  <ArrowRight className="w-6 h-6 text-emerald-400" />
                </div>
                <span className="text-[10px] font-mono text-zinc-500">CRAFTING</span>
              </div>

              {/* Right Side: Output Slot */}
              <div className="flex flex-col items-center space-y-3">
                <span className="font-silkscreen text-xs text-zinc-300 tracking-wider">RESULT</span>

                <div className="p-4 bg-[#14141c] rounded-lg border-2 border-[#2b2b3a] flex items-center justify-center shadow-inner">
                  <div className="w-20 h-20 bg-[#252530] border-4 border-[#121217] rounded flex flex-col items-center justify-center relative mc-enchant-glint shadow-md p-2">
                    {selectedRecipe.result ? (
                      <>
                        {renderIcon(selectedRecipe.result.icon, selectedRecipe.result.name, "w-11 h-11")}
                        <span className="text-[9px] font-silkscreen text-[#4aedd9] mt-1 text-center px-1 truncate max-w-full">
                          {selectedRecipe.result.name}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs font-mono text-zinc-500">No Recipe</span>
                    )}
                  </div>
                </div>

                {selectedRecipe.result && (
                  <button
                    onClick={handleCraft}
                    disabled={isCrafting}
                    className="mc-btn mc-btn-green text-xs py-2 px-5 w-full flex items-center justify-center gap-2 mt-2"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isCrafting ? 'CRAFTING...' : 'CRAFT ITEM'}</span>
                  </button>
                )}
              </div>

            </div>

            {/* Bottom: Result Details */}
            {selectedRecipe.result && (
              <div className="mt-8 pt-6 border-t-2 border-[#2a2a38] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 p-1.5 rounded bg-black/40 border border-white/10 shrink-0">
                    {renderIcon(selectedRecipe.result.icon, selectedRecipe.result.name, "w-full h-full")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-silkscreen text-sm text-white font-bold">{selectedRecipe.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                        Added in {selectedRecipe.version}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1 max-w-xl">
                      {selectedRecipe.result.desc}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-mono text-zinc-500 block">TOTAL CRAFTS THIS SESSION</span>
                  <span className="font-pixel text-lg text-emerald-400">{craftCount}</span>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
