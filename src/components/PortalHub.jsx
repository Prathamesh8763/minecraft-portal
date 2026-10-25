import React, { useState, useMemo, useEffect } from 'react';
import { NAVIGATION_CATEGORIES, NAVIGATION_ITEMS } from '../data/navigationRoutes';
import { POPULAR_GUIDES, RECENTLY_UPDATED_ENTRIES } from '../data/minecraftEncyclopediaData';
import { GAME_VERSION_CONFIG } from '../data/versionConfig';
import { 
  ArrowRight, 
  Sparkles, 
  Compass, 
  Layers, 
  Check, 
  ExternalLink,
  BookOpen,
  Eye,
  Sliders,
  Search,
  Hammer,
  Wand2,
  Flame,
  Cpu,
  Shield,
  Clock,
  CheckCircle2,
  X,
  Bookmark,
  History,
  Trash2,
  ArrowUpRight
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import { useDebounce, precomputeSearchIndex, buildCategoryMultiMap, resolveNaturalPlayerQuery } from '../utils/searchEngine';
import { getSavedBookmarks, getRecentlyViewed, clearAllPlayerData, setActiveTopicIdPref } from '../utils/playerStorage';

export default function PortalHub({ onSelectSection, onToggleViewMode, viewMode }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 120);

  // Local storage bookmarks & recent history (100% private, zero accounts required)
  const [recentList, setRecentList] = useState([]);
  const [savedBookmarks, setSavedBookmarks] = useState([]);

  useEffect(() => {
    setRecentList(getRecentlyViewed(4));
    setSavedBookmarks(getSavedBookmarks());
  }, []);

  const handleClearHistory = () => {
    playClick();
    clearAllPlayerData();
    setRecentList([]);
    setSavedBookmarks([]);
  };

  const handleOpenRecent = (item) => {
    playClick();
    if (item.id) {
      setActiveTopicIdPref(item.id);
    }
    onSelectSection(item.route || 'encyclopedia');
  };

  // Precomputed search index for navigation items (calculated once in O(N) time)
  const indexedNavItems = useMemo(() => {
    return precomputeSearchIndex(NAVIGATION_ITEMS, (item) => [
      item.label,
      item.fullTitle,
      item.desc,
      item.categoryLabel,
      item.badge
    ]);
  }, []);

  // Precomputed search index for popular guides
  const indexedGuides = useMemo(() => {
    return precomputeSearchIndex(POPULAR_GUIDES, (guide) => [
      guide.title,
      guide.summary,
      guide.category,
      guide.details || ''
    ]);
  }, []);

  // Fast O(1) multi-map grouping by category
  const categoryMultiMap = useMemo(() => {
    return buildCategoryMultiMap(NAVIGATION_ITEMS, 'categoryId');
  }, []);

  // Natural query match based on conversational player inquiries
  const naturalMatch = useMemo(() => {
    return resolveNaturalPlayerQuery(debouncedQuery);
  }, [debouncedQuery]);

  // 1. Omnisearch filtering across navigation items, popular guides, and topics
  const searchResults = useMemo(() => {
    const q = debouncedQuery.toLowerCase().trim();
    if (!q) return null;
    const tokens = q.split(/\s+/).filter(Boolean);

    const matchedItems = indexedNavItems.filter(item => 
      tokens.every(token => item._searchHaystack.includes(token))
    );

    const matchedGuides = indexedGuides.filter(guide => 
      tokens.every(token => guide._searchHaystack.includes(token))
    );

    return {
      items: matchedItems,
      guides: matchedGuides,
      totalCount: matchedItems.length + matchedGuides.length
    };
  }, [debouncedQuery, indexedNavItems, indexedGuides]);

  // Filtered Items for Browse Categories section
  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All') return NAVIGATION_ITEMS;
    return categoryMultiMap.get(selectedCategory) || [];
  }, [selectedCategory, categoryMultiMap]);

  return (
    <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100 space-y-16">
      
      {/* ========================================================================= */}
      {/* 1. PROMINENT SITE-WIDE SEARCH */}
      {/* ========================================================================= */}
      <div className="bg-[#12131b]/95 border-2 border-[#2b2d3e] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center space-y-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b1c28] border border-[#3b3d52] text-xs font-silkscreen text-emerald-400">
            <Search className="w-3.5 h-3.5" />
            <span>UNIVERSAL CODEX SEARCH</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl text-white mc-shadow">
            SEARCH THE ENCYCLOPEDIA
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Quickly jump to any guide, simulator, crafting recipe, mob, command, or official release.
          </p>
        </div>

        {/* Search Input Bar */}
        <div className="max-w-3xl mx-auto relative">
          <Search className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder='Search: "Mending", "The Crafter", "Warden", "Iron Farm", "Straw Bed", "/execute"...'
            className="w-full bg-[#0a0b10] border-2 border-[#383a50] hover:border-emerald-500/60 focus:border-emerald-400 rounded-2xl pl-12 pr-12 py-3.5 text-sm sm:text-base text-white placeholder-zinc-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => { playPop(); setSearchQuery(''); }}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-zinc-400 hover:text-white bg-zinc-800 rounded-xl transition-all"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Search Chips */}
        <div className="max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
          <span className="text-zinc-400 font-mono text-[11px] mr-1">Quick jumps:</span>
          {[
            { label: '✨ Mending', query: 'Mending', target: 'enchanting' },
            { label: '⚙️ The Crafter', query: 'Crafter', target: 'crafting' },
            { label: '🛏️ Straw Bed', query: 'Straw Bed', target: 'drops' },
            { label: '👾 Warden', query: 'Warden', target: 'mobs' },
            { label: '🏰 Trial Chambers', query: 'Trial', target: 'structures' },
            { label: '🧪 Potion Brewer', query: 'Brewing', target: 'brewing' }
          ].map((chip, idx) => (
            <button
              key={idx}
              onClick={() => {
                playClick();
                setSearchQuery(chip.query);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#181924] hover:bg-[#252738] border border-[#2e3042] text-zinc-300 hover:text-emerald-300 transition-all"
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Search Results Dropdown/Box (if query active) */}
        {searchResults && (
          <div className="max-w-3xl mx-auto mt-6 pt-5 border-t border-[#252636] animate-fadeIn space-y-4">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
              <span>FOUND {searchResults.totalCount} MATCHES FOR "{searchQuery}"</span>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-emerald-400 hover:underline"
              >
                Close Search Results
              </button>
            </div>

            {/* Direct Conversational Answer / Natural Match */}
            {naturalMatch && (
              <div 
                onClick={() => {
                  playLevelUp();
                  onSelectSection(naturalMatch.targetRoute);
                }}
                className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-[#18231c] to-[#12131b] border-2 border-emerald-500/60 hover:border-emerald-400 cursor-pointer transition-all shadow-xl flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-900/60 border border-emerald-400/40 flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald-300 animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-500/30">
                        {naturalMatch.intentBadge}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400">Direct Answer Match</span>
                    </div>
                    <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                      {naturalMatch.title}
                    </h4>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 shrink-0 ml-3">
                  <span className="hidden sm:inline">Open Guide</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )}

            {searchResults.totalCount === 0 && !naturalMatch ? (
              <div className="text-center py-6 text-zinc-400 text-xs font-mono">
                No direct matches found. Try searching for general terms like "armor", "sword", "nether", or browse categories below.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {searchResults.items.map(item => (
                  <div
                    key={item.id}
                    onClick={() => {
                      playClick();
                      onSelectSection(item.id);
                    }}
                    className="p-3 bg-[#171824] hover:bg-[#202232] border border-[#303246] hover:border-emerald-500 rounded-xl cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div>
                      <div className="text-[10px] font-mono text-emerald-400">{item.categoryLabel}</div>
                      <div className="font-bold text-sm text-white group-hover:text-emerald-300">{item.fullTitle}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Resume Where You Left Off (Local & 100% Private) */}
        {!searchResults && recentList.length > 0 && (
          <div className="max-w-3xl mx-auto mt-6 pt-5 border-t border-[#252636] animate-fadeIn">
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <div className="flex items-center gap-2 text-zinc-300">
                <History className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-bold tracking-wider text-emerald-400 uppercase">RESUME WHERE YOU LEFT OFF</span>
                <span className="text-zinc-500 hidden sm:inline">(Local &amp; Private)</span>
              </div>
              <button
                onClick={handleClearHistory}
                className="text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                title="Clear recent viewing history from browser storage"
              >
                <Trash2 className="w-3 h-3" />
                <span className="text-[11px]">Clear</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {recentList.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOpenRecent(item)}
                  className="p-2.5 rounded-xl bg-[#171824] hover:bg-[#202232] border border-[#2e3042] hover:border-emerald-500/50 cursor-pointer transition-all flex items-center justify-between group text-left"
                >
                  <div className="min-w-0 pr-2">
                    <span className="text-[10px] font-mono text-emerald-400 block truncate">
                      {item.category}
                    </span>
                    <span className="font-semibold text-xs sm:text-sm text-white group-hover:text-emerald-300 truncate block">
                      {item.title}
                    </span>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 2. QUICK TOOLS (Crafting, Enchanting, Brewing, Commands) */}
      {/* ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              INTERACTIVE SUITE
            </span>
            <h3 className="font-pixel text-xl sm:text-2xl text-white mc-shadow">
              QUICK TOOLS & SIMULATORS
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
            Zero-latency calculators &amp; laboratories
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              id: 'crafting',
              title: 'Crafting & Crafter',
              subtitle: '400+ vanilla recipes & 1.21 Crafter automation',
              icon: Hammer,
              badge: '3×3 Matrix',
              color: 'from-amber-950/70 to-[#181924]',
              borderColor: 'hover:border-amber-400'
            },
            {
              id: 'enchanting',
              title: 'Enchantment Lab',
              subtitle: 'God armor loadouts & Anvil binary merge tree',
              icon: Wand2,
              badge: 'God Gear',
              color: 'from-purple-950/70 to-[#181924]',
              borderColor: 'hover:border-purple-400'
            },
            {
              id: 'brewing',
              title: 'Brewing Stand',
              subtitle: '20 blaze fuel simulator & all potion variants',
              icon: Flame,
              badge: 'Simulator',
              color: 'from-cyan-950/70 to-[#181924]',
              borderColor: 'hover:border-cyan-400'
            },
            {
              id: 'redstone',
              title: 'Redstone & Logic',
              subtitle: 'Tick timings, comparator subtraction & gates',
              icon: Cpu,
              badge: 'Engineering',
              color: 'from-red-950/70 to-[#181924]',
              borderColor: 'hover:border-red-400'
            }
          ].map(tool => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => {
                  playClick();
                  onSelectSection(tool.id);
                }}
                className={`p-5 rounded-2xl bg-gradient-to-b ${tool.color} border-2 border-[#2b2d3e] ${tool.borderColor} cursor-pointer transition-all duration-300 hover:scale-[1.02] shadow-xl group flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-black/40 border border-white/10 flex items-center justify-center p-2 text-white group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/50 text-zinc-300 border border-white/10">
                      {tool.badge}
                    </span>
                  </div>
                  <h4 className="font-bold text-base text-white group-hover:text-emerald-300 transition-colors">
                    {tool.title}
                  </h4>
                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {tool.subtitle}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold text-emerald-400">
                  <span>Launch Module</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BROWSE CATEGORIES (Survival, World, Tech, Customization) */}
      {/* ========================================================================= */}
      <div>
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
            STRUCTURED KNOWLEDGE
          </span>
          <h3 className="font-pixel text-2xl sm:text-3xl text-white mc-shadow">
            BROWSE BY CATEGORY
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm">
            Explore the 15 dedicated modules organized into five clear operational domains.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => { playClick(); setSelectedCategory('All'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
              selectedCategory === 'All'
                ? 'bg-[#5c8e32] text-white border-[#89c44e] shadow-md'
                : 'bg-[#181922] text-zinc-400 border-[#282937] hover:text-white hover:bg-[#222330]'
            }`}
          >
            All Categories ({NAVIGATION_ITEMS.length})
          </button>

          {NAVIGATION_CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { playClick(); setSelectedCategory(cat.id); }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[#5c8e32] text-white border-[#89c44e] shadow-md'
                    : 'bg-[#181922] text-zinc-400 border-[#282937] hover:text-white hover:bg-[#222330]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredItems.map(item => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={() => {
                  playClick();
                  onSelectSection(item.id);
                }}
                className="bg-[#14151e]/90 border-2 border-[#262837] hover:border-emerald-500/60 rounded-2xl p-5 shadow-xl hover:shadow-emerald-900/20 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-11 h-11 rounded-xl bg-[#1b1c28] border border-[#34364c] flex items-center justify-center p-2 text-emerald-400 group-hover:scale-110 group-hover:bg-[#5c8e32] group-hover:text-white transition-all shadow-inner">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded font-semibold">
                      {item.badge}
                    </span>
                  </div>

                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1">
                    {item.categoryLabel}
                  </div>
                  <h4 className="font-bold text-slate-100 text-base group-hover:text-emerald-300 transition-colors">
                    {item.fullTitle}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-2 line-clamp-2">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#232433] mt-4 flex items-center justify-between text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                  <span>Open Dedicated Page</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. POPULAR GUIDES */}
      {/* ========================================================================= */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
              ESSENTIAL READING
            </span>
            <h3 className="font-pixel text-xl sm:text-2xl text-white mc-shadow">
              POPULAR GUIDES & ARTICLES
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
            Tested mechanics for immediate gameplay
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {POPULAR_GUIDES.slice(0, 6).map(guide => (
            <div
              key={guide.id}
              onClick={() => {
                playClick();
                if (guide.toolId) onSelectSection(guide.toolId);
                else onSelectSection('encyclopedia');
              }}
              className="p-5 rounded-2xl bg-[#14151f] border-2 border-[#282a3a] hover:border-purple-400/60 cursor-pointer transition-all shadow-xl flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                    {guide.category}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950/70 border border-purple-500/30 text-purple-300">
                    {guide.version}
                  </span>
                </div>
                <h4 className="font-bold text-white text-base group-hover:text-purple-300 transition-colors">
                  {guide.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                  {guide.summary}
                </p>
                {guide.details && (
                  <p className="text-[11px] text-zinc-500 mt-1 line-clamp-2">
                    {guide.details}
                  </p>
                )}
              </div>

              <div className="pt-3 mt-4 border-t border-[#232433] flex items-center justify-between text-xs font-semibold text-purple-400">
                <span>Read Full Article</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. RECENT UPDATES (VERIFIED STATUS & CHANGELOGS) */}
      {/* ========================================================================= */}
      <div className="bg-[#101118] border-2 border-[#242535] rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              VERIFIED CHRONOLOGY
            </span>
            <h3 className="font-pixel text-xl sm:text-2xl text-white mc-shadow">
              OFFICIAL RELEASE TIMELINE &amp; NEWS
            </h3>
          </div>
          <a
            href={GAME_VERSION_CONFIG.currentStable.timelineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1.5"
          >
            <span>Official Minecraft Timeline</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {RECENTLY_UPDATED_ENTRIES.slice(0, 4).map((entry, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#151620] border border-[#2a2c3d] flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded font-bold ${
                    entry.type === 'Testing Snapshot'
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
                      : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                  }`}>
                    {entry.versionBadge}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {entry.date}
                  </span>
                </div>
                <h4 className="font-bold text-sm text-white">
                  {entry.title}
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-3">
                  {entry.summary}
                </p>
              </div>

              {entry.sourceUrl && (
                <div className="pt-2 border-t border-[#232433]">
                  <a
                    href={entry.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-emerald-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Official Patch Notes</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
