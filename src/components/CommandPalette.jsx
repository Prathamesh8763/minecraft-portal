import React, { useState, useEffect, useRef } from 'react';
import { NAVIGATION_ITEMS } from '../data/navigationRoutes';
import { Search, X, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';
import { playClick, playPop } from '../utils/soundFX';

export default function CommandPalette({ isOpen, onClose, onSelectSection }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  const filteredItems = NAVIGATION_ITEMS.filter(item => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.label.toLowerCase().includes(q) ||
      item.fullTitle.toLowerCase().includes(q) ||
      item.categoryLabel.toLowerCase().includes(q) ||
      item.desc.toLowerCase().includes(q)
    );
  });

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation within command palette
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredItems[selectedIndex]) {
        handleSelect(filteredItems[selectedIndex].id);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const handleSelect = (id) => {
    playClick();
    onSelectSection(id);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/75 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Quick Navigation Command Palette"
    >
      <div 
        className="w-full max-w-2xl bg-[#14151e] border-2 border-[#383a4d] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-4 border-b border-[#252736] bg-[#1a1b26]">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a section name (e.g. Crafting, Enchanting, Mobs, X-Ray, Redstone)..."
            className="w-full bg-transparent text-sm text-slate-100 placeholder-zinc-500 focus:outline-none font-mono"
            aria-label="Search sections"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="text-zinc-400 hover:text-white p-1"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-zinc-400 bg-black/40 border border-zinc-700 rounded">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="overflow-y-auto p-2 divide-y divide-[#1e202d] space-y-1">
          {filteredItems.length === 0 ? (
            <div className="text-center py-10 text-zinc-500 text-xs font-mono">
              No matching sections found for "{query}".
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-[#222433] border border-[#5c8e32] text-white shadow-md' 
                      : 'hover:bg-[#1a1b24] text-zinc-300 border border-transparent'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center p-2 shrink-0 ${
                      isSelected ? 'bg-[#5c8e32] text-white' : 'bg-[#181922] text-emerald-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs sm:text-sm truncate text-slate-100">
                          {item.fullTitle}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-emerald-300 font-mono shrink-0">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline">
                      {item.categoryLabel}
                    </span>
                    <CornerDownLeft className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-zinc-600'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-2.5 bg-[#101117] border-t border-[#252736] flex items-center justify-between text-[10px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to open page</span>
            <span>ESC to close</span>
          </div>
          <span className="text-emerald-400 font-semibold">15 Interactive Sections</span>
        </div>
      </div>
    </div>
  );
}
