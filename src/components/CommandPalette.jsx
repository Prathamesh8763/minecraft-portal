import React, { useState, useEffect, useRef, useMemo } from 'react';
import { NAVIGATION_ITEMS } from '../data/navigationRoutes';
import { ENCYCLOPEDIA_TOPICS, POPULAR_GUIDES } from '../data/minecraftEncyclopediaData';
import { SURVIVAL_CHECKLISTS } from '../data/survivalChecklistsData';
import { 
  Search, 
  X, 
  ArrowRight, 
  CornerDownLeft, 
  Sparkles, 
  BookOpen, 
  Award, 
  Zap, 
  AlertCircle 
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import { precomputeSearchIndex } from '../utils/searchEngine';
import { setActiveTopicIdPref } from '../utils/playerStorage';

export default function CommandPalette({ isOpen, onClose, onSelectSection }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  // Unified Searchable Items Registry
  const allSearchItems = useMemo(() => {
    const list = [];

    // 1. Navigation Modules (16 items)
    NAVIGATION_ITEMS.forEach(item => {
      list.push({
        id: `nav-${item.id}`,
        type: 'module',
        typeBadge: 'Module',
        title: item.label,
        subtitle: item.fullTitle,
        description: item.desc,
        category: item.categoryLabel,
        targetRoute: item.id,
        icon: item.icon,
        badge: item.badge
      });
    });

    // 2. Encyclopedia Topics (19 items)
    ENCYCLOPEDIA_TOPICS.forEach(topic => {
      list.push({
        id: `topic-${topic.id}`,
        type: 'topic',
        typeBadge: 'Topic',
        title: topic.title,
        subtitle: `Java Edition #${topic.id.toString().padStart(2, '0')}`,
        description: topic.summary,
        category: topic.categoryName,
        targetRoute: 'encyclopedia',
        topicId: topic.id,
        icon: BookOpen,
        badge: topic.versionBadge
      });
    });

    // 3. Popular Guides (6 items)
    POPULAR_GUIDES.forEach(guide => {
      list.push({
        id: `guide-${guide.id}`,
        type: 'guide',
        typeBadge: 'Guide',
        title: guide.title,
        subtitle: guide.summary,
        description: guide.details,
        category: guide.category,
        targetRoute: guide.toolId || 'encyclopedia',
        topicId: guide.topicId,
        icon: Zap,
        badge: guide.version
      });
    });

    // 4. Survival Checklists (4 items)
    SURVIVAL_CHECKLISTS.forEach(cl => {
      list.push({
        id: `cl-${cl.id}`,
        type: 'checklist',
        typeBadge: 'Checklist',
        title: cl.title,
        subtitle: cl.description,
        description: `${cl.steps.length} verified steps • Estimated: ${cl.estimatedTime}`,
        category: cl.category,
        targetRoute: 'checklists',
        icon: Award,
        badge: cl.badge
      });
    });

    return list;
  }, []);

  // Precomputed index for fast O(1) string checks
  const indexedItems = useMemo(() => {
    return precomputeSearchIndex(allSearchItems, (item) => [
      item.title,
      item.subtitle,
      item.description,
      item.category,
      item.typeBadge,
      item.badge
    ]);
  }, [allSearchItems]);

  const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return indexedItems.slice(0, 30);
    const tokens = q.split(/\s+/).filter(Boolean);

    const matches = [];
    for (let i = 0; i < indexedItems.length; i++) {
      const item = indexedItems[i];
      if (tokens.every(token => item._searchHaystack.includes(token))) {
        matches.push(item);
        if (matches.length >= 25) break;
      }
    }
    return matches;
  }, [query, indexedItems]);

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
        handleSelect(filteredItems[selectedIndex]);
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  const handleSelect = (item) => {
    playLevelUp();
    if (item.topicId) {
      setActiveTopicIdPref(item.topicId);
    }
    onSelectSection(item.targetRoute);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-20 px-3 sm:px-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Universal Minecraft Codex Command Palette"
    >
      <div 
        className="w-full max-w-2xl bg-[#12131b] border-2 border-[#383a50] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 p-3.5 sm:p-4 border-b border-[#252738] bg-[#181926]">
          <Search className="w-5 h-5 text-emerald-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='Type to search: "Mending", "Crafter", "Warden", "Straw Bed", "Iron Farm", "/execute"...'
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none font-mono"
            aria-label="Search all modules, topics, guides, and checklists"
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
            <div className="text-center py-12 px-4 space-y-3">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto opacity-80" />
              <p className="text-sm font-bold text-white">No entries found matching "{query}"</p>
              <p className="text-xs text-zinc-400 max-w-sm mx-auto leading-relaxed">
                Try searching for canonical terms like <span className="text-emerald-400">Mending</span>, <span className="text-emerald-400">Warden</span>, <span className="text-emerald-400">Crafter</span>, <span className="text-emerald-400">Nether Portal</span>, or browse by module category.
              </p>
            </div>
          ) : (
            filteredItems.map((item, index) => {
              const Icon = item.icon;
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-[#222433] border border-emerald-500/80 text-white shadow-md' 
                      : 'hover:bg-[#1a1b26] text-zinc-300 border border-transparent'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center p-2 shrink-0 ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-[#1b1c28] text-emerald-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-xs sm:text-sm text-white truncate">
                          {item.title}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/50 text-emerald-300 font-mono border border-emerald-500/30">
                          {item.typeBadge}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300 font-mono hidden sm:inline">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 pl-2">
                    <span className="text-[10px] font-mono text-zinc-500 hidden md:inline">
                      {item.category}
                    </span>
                    <CornerDownLeft className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-400' : 'text-zinc-600'}`} />
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="p-3 bg-[#0d0e14] border-t border-[#252738] flex items-center justify-between text-[10px] font-mono text-zinc-400">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Dismiss</span>
          </div>
          <span className="text-emerald-400 font-semibold">
            Universal Codex Search (Ctrl+K)
          </span>
        </div>
      </div>
    </div>
  );
}
