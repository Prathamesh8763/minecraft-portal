import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  ENCYCLOPEDIA_CATEGORIES, 
  ENCYCLOPEDIA_TOPICS, 
  POPULAR_GUIDES, 
  RECENTLY_UPDATED_ENTRIES, 
  CURRENT_GAME_VERSION_STATUS,
  getEncyclopediaTopicById 
} from '../data/minecraftEncyclopediaData';
import { 
  BookOpen, 
  Search, 
  Compass, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight, 
  X, 
  Layers, 
  CheckCircle2, 
  AlertCircle, 
  AlertTriangle,
  Lightbulb,
  Info, 
  Filter, 
  Share2, 
  Bookmark, 
  Zap, 
  Flame, 
  Hammer, 
  Cpu, 
  Shield, 
  Clock, 
  Tag, 
  FlameKindling,
  Terminal,
  Grid,
  FileText,
  Copy,
  Check,
  Maximize2,
  Minimize2,
  ListOrdered
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import { useDebounce, precomputeSearchIndex, buildIdMap } from '../utils/searchEngine';
import { 
  isItemBookmarked, 
  toggleSavedBookmark, 
  recordRecentlyViewed, 
  setActiveTopicIdPref, 
  getActiveTopicIdPref 
} from '../utils/playerStorage';

export default function EncyclopediaHub({ onNavigateToSection }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedQuery = useDebounce(searchQuery, 120); // Prevents render thrashing during rapid typing
  const [activeTopicId, setActiveTopicId] = useState(() => {
    return getActiveTopicIdPref() || 1;
  });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [activePopularGuide, setActivePopularGuide] = useState(null);
  const [selectedResultIndex, setSelectedResultIndex] = useState(0);
  const [copiedCommandIndex, setCopiedCommandIndex] = useState(null);
  const [readingWidth, setReadingWidth] = useState('standard'); // 'standard' or 'wide'
  const [activeHeadingId, setActiveHeadingId] = useState('');
  const searchInputRef = useRef(null);

  // O(1) Hash Map for instantaneous topic lookup by ID
  const topicsByIdMap = useMemo(() => buildIdMap(ENCYCLOPEDIA_TOPICS, 'id'), []);

  // Active topic object retrieved in O(1) time
  const activeTopic = useMemo(() => {
    return topicsByIdMap.get(activeTopicId) || ENCYCLOPEDIA_TOPICS[0];
  }, [activeTopicId, topicsByIdMap]);

  // Clean search tokens for query based on debounced input
  const searchTokens = useMemo(() => {
    return debouncedQuery.toLowerCase().trim().split(' ').filter(Boolean);
  }, [debouncedQuery]);

  // Combined searchable items (Topics + Popular Guides)
  const allSearchableItems = useMemo(() => {
    const list = [];

    // 1. Popular Guides
    POPULAR_GUIDES.forEach(guide => {
      list.push({
        type: 'guide',
        id: guide.id,
        title: guide.title,
        category: guide.category,
        categoryId: guide.parentCategoryId,
        description: guide.summary,
        fullDetails: guide.details,
        version: guide.version,
        sourceUrl: guide.sourceUrl,
        topicId: guide.topicId,
        toolId: guide.toolId
      });
    });

    // 2. All 19 Topics
    ENCYCLOPEDIA_TOPICS.forEach(topic => {
      list.push({
        type: 'topic',
        id: `topic-${topic.id}`,
        title: topic.title,
        category: topic.categoryName,
        categoryId: topic.categoryId,
        description: topic.summary,
        version: topic.versionBadge,
        sourceUrl: topic.quickReference?.find(q => q.label.includes('Source'))?.value || 'minecraft.wiki',
        topicId: topic.id,
        toolId: topic.interactiveToolId,
        keyFacts: topic.keyFacts
      });
    });

    return list;
  }, []);

  // Precomputed search index (calculated once in O(N) time, zero string allocations per keystroke)
  const indexedSearchableItems = useMemo(() => {
    return precomputeSearchIndex(allSearchableItems, (item) => [
      item.title,
      item.category,
      item.description,
      item.version,
      ...(item.keyFacts || [])
    ]);
  }, [allSearchableItems]);

  // Precomputed index for all 19 topics
  const indexedTopics = useMemo(() => {
    return precomputeSearchIndex(ENCYCLOPEDIA_TOPICS, (topic) => [
      topic.title,
      topic.summary,
      topic.categoryName,
      topic.subtopicLabel,
      ...(topic.keyFacts || []),
      ...(topic.quickReference?.map(q => `${q.label} ${q.value}`) || [])
    ]);
  }, []);

  // Filtered search results (O(N) token check using pre-normalized haystack)
  const searchResults = useMemo(() => {
    if (!searchTokens.length && selectedCategory === 'all') return [];

    const results = [];
    for (let i = 0; i < indexedSearchableItems.length; i++) {
      const item = indexedSearchableItems[i];
      const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
      if (!matchesCategory) continue;

      if (!searchTokens.length) {
        results.push(item);
        continue;
      }

      const haystack = item._searchHaystack;
      let matches = true;
      for (let t = 0; t < searchTokens.length; t++) {
        if (!haystack.includes(searchTokens[t])) {
          matches = false;
          break;
        }
      }

      if (matches) {
        results.push(item);
        if (results.length >= 30) break; // Bounded window for fast DOM updates
      }
    }
    return results;
  }, [indexedSearchableItems, selectedCategory, searchTokens]);

  // Topics filtered for the 19-topics reader
  const filteredTopics = useMemo(() => {
    return indexedTopics.filter(topic => {
      const matchesCategory = selectedCategory === 'all' || topic.categoryId === selectedCategory;
      if (!searchTokens.length) return matchesCategory;

      const haystack = topic._searchHaystack;
      return matchesCategory && searchTokens.every(token => haystack.includes(token));
    });
  }, [indexedTopics, selectedCategory, searchTokens]);

  // Previous and Next topic calculation
  const currentTopicIndex = useMemo(() => {
    return ENCYCLOPEDIA_TOPICS.findIndex(t => t.id === activeTopic.id);
  }, [activeTopic.id]);

  const prevTopic = useMemo(() => {
    if (currentTopicIndex > 0) return ENCYCLOPEDIA_TOPICS[currentTopicIndex - 1];
    return null;
  }, [currentTopicIndex]);

  const nextTopic = useMemo(() => {
    if (currentTopicIndex < ENCYCLOPEDIA_TOPICS.length - 1) return ENCYCLOPEDIA_TOPICS[currentTopicIndex + 1];
    return null;
  }, [currentTopicIndex]);

  // Reset selected keyboard index when results change
  useEffect(() => {
    setSelectedResultIndex(0);
  }, [searchResults.length]);

  // Synchronize local bookmark status and record recent history whenever activeTopic changes
  useEffect(() => {
    if (activeTopic) {
      setIsBookmarked(isItemBookmarked(activeTopic.id));
      setActiveTopicIdPref(activeTopic.id);
      recordRecentlyViewed({
        id: activeTopic.id,
        title: activeTopic.title,
        category: activeTopic.categoryName,
        route: 'encyclopedia'
      });
    }
  }, [activeTopic?.id]);

  const handleToggleBookmark = () => {
    playPop();
    const nextSaved = toggleSavedBookmark(activeTopic.id);
    setIsBookmarked(nextSaved);
  };

  // Keyboard navigation for search results
  const handleKeyDown = (e) => {
    if (!searchResults.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedResultIndex(prev => (prev + 1) % searchResults.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedResultIndex(prev => (prev - 1 + searchResults.length) % searchResults.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const target = searchResults[selectedResultIndex];
      if (target) {
        handleSelectSearchItem(target);
      }
    } else if (e.key === 'Escape') {
      setSearchQuery('');
      searchInputRef.current?.blur();
    }
  };

  const handleSelectSearchItem = (item) => {
    playClick();
    if (item.type === 'guide') {
      setActivePopularGuide(item);
      setActiveTopicId(item.topicId);
    } else {
      setActivePopularGuide(null);
      setActiveTopicId(item.topicId);
    }
    const el = document.getElementById('encyclopedia-reader-zone');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectTopic = (id) => {
    playClick();
    setActivePopularGuide(null);
    setActiveTopicId(id);
    setActiveTopicIdPref(id);
    setActiveHeadingId('');
    const el = document.getElementById('encyclopedia-reader-zone');
    if (el && window.innerWidth < 1024) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catId) => {
    playClick();
    setSelectedCategory(catId);
  };

  const handleLaunchTool = (toolId) => {
    playLevelUp();
    if (onNavigateToSection) {
      onNavigateToSection(toolId);
    } else {
      window.location.hash = `#${toolId}`;
    }
  };

  // Copy command text with visual confirmation and sound
  const handleCopyCommand = (text, id) => {
    playPop();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedCommandIndex(id);
      setTimeout(() => {
        setCopiedCommandIndex(null);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy command:', err);
    });
  };

  // Scroll to section inside article
  const handleScrollToHeading = (headingId) => {
    playClick();
    setActiveHeadingId(headingId);
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="encyclopedia" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100">
      
      {/* ========================================================================= */}
      {/* 1. MASTER HEADER & CURRENT GAME-VERSION STATUS */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900/95 to-slate-950 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden mb-8">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-900 to-teal-950 border-2 border-emerald-400/50 rounded-2xl flex items-center justify-center p-3 shadow-inner shadow-emerald-500/20 shrink-0">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-300" />
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="bg-emerald-900/80 border border-emerald-400/40 text-emerald-300 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Factual Knowledge Base
              </span>
              <span className="bg-blue-950/70 border border-blue-500/30 text-blue-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                Java Edition Exclusives
              </span>
              <span className="bg-purple-950/70 border border-purple-500/30 text-purple-300 text-xs font-semibold px-2.5 py-1 rounded-full">
                19 Canonical Topics
              </span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent">
              Minecraft Java Edition Encyclopedia
            </h1>
            <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
              Authoritative, fully verified documentation for Minecraft Java Edition. Organized into 5 logical categories with instant multi-entry search, verified version changelogs (1.0 to 1.21.3), active snapshot mechanics, copyable command snippets, and no speculative fanon.
            </p>
          </div>
        </div>

        {/* CURRENT GAME-VERSION STATUS BAR */}
        <div className="mt-6 pt-4 border-t border-emerald-500/20 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="bg-slate-950/70 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block font-bold">Latest Stable Release</span>
              <span className="font-bold text-slate-100 text-sm">{CURRENT_GAME_VERSION_STATUS.latestRelease}</span>
              <span className="text-slate-400 text-[11px] block">{CURRENT_GAME_VERSION_STATUS.releaseDropName} ({CURRENT_GAME_VERSION_STATUS.releaseDate})</span>
            </div>
            <a 
              href={CURRENT_GAME_VERSION_STATUS.officialArticleUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300 hover:text-white transition-all ml-2"
              title="Official Mojang Release Notes"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-slate-950/70 border border-amber-500/30 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-400 block font-bold">Active Snapshot Testing</span>
              <span className="font-bold text-slate-100 text-sm">{CURRENT_GAME_VERSION_STATUS.activeSnapshots}</span>
              <span className="text-slate-400 text-[11px] block">Pale Garden &amp; The Creaking Drop</span>
            </div>
            <a 
              href={CURRENT_GAME_VERSION_STATUS.wikiSourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900 text-amber-300 hover:text-white transition-all ml-2"
              title="Official Wiki Snapshot History"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div className="bg-slate-950/70 border border-cyan-500/30 rounded-xl p-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-cyan-400 block font-bold">Editorial Verification</span>
              <span className="font-bold text-slate-100 text-sm">Last Checked: {CURRENT_GAME_VERSION_STATUS.lastAuditDate}</span>
              <span className="text-slate-400 text-[11px] block">{CURRENT_GAME_VERSION_STATUS.releaseCadence}</span>
            </div>
            <span className="p-1.5 rounded-lg bg-cyan-950/60 text-cyan-300 ml-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            </span>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. PROMINENT UNIVERSAL SEARCH BAR */}
        {/* ========================================================================= */}
        <div className="mt-6 pt-5 border-t border-emerald-500/20 relative z-20">
          <div className="relative">
            <Search className="w-5 h-5 text-emerald-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              ref={searchInputRef}
              type="text"
              placeholder="Search articles, mechanics, mobs, commands (e.g. Mending, Warden, Iron Farm, /execute)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-slate-950/95 border-2 border-emerald-500/40 hover:border-emerald-400 focus:border-cyan-400 rounded-2xl pl-12 pr-12 py-3.5 text-sm sm:text-base text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 transition-all shadow-inner"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  playPop();
                  setSearchQuery('');
                  searchInputRef.current?.focus();
                }}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 rounded-xl transition-all"
                title="Clear search"
                aria-label="Clear search input"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills by Search */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-3 text-xs scrollbar-thin">
            <span className="text-slate-400 font-mono text-[11px] mr-1 shrink-0 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-emerald-400" />
              Category:
            </span>
            <button
              onClick={() => handleSelectCategory('all')}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shrink-0 ${
                selectedCategory === 'all'
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                  : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-emerald-400 hover:text-emerald-200'
              }`}
            >
              All Categories
            </button>
            {ENCYCLOPEDIA_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => handleSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md'
                    : 'bg-slate-900/80 text-slate-300 border-slate-700 hover:border-emerald-400 hover:text-emerald-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Quick Preset Demonstrations */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-xs">
            <span className="text-slate-400 font-mono text-[11px] mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              Popular Search Queries:
            </span>
            {[
              { label: 'Mending', query: 'Mending' },
              { label: 'Warden', query: 'Warden' },
              { label: 'Iron Farm', query: 'Iron Farm' },
              { label: 'Nether Portal', query: 'Nether Portal' },
              { label: '/execute', query: '/execute' },
              { label: 'Redstone Comparator', query: 'Redstone Comparator' }
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playClick();
                  setSearchQuery(chip.query);
                  searchInputRef.current?.focus();
                }}
                className={`px-2.5 py-1 rounded-lg border text-xs font-semibold transition-all ${
                  searchQuery.toLowerCase() === chip.query.toLowerCase()
                    ? 'bg-cyan-600 text-white border-cyan-400 shadow-md'
                    : 'bg-slate-900/60 text-slate-300 border-slate-800 hover:border-emerald-400 hover:text-emerald-200'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* LIVE SEARCH RESULTS DROPDOWN / CARDS */}
          {searchQuery.trim().length > 0 && (
            <div className="mt-4 bg-slate-950/95 border-2 border-emerald-500/50 rounded-2xl p-4 shadow-2xl max-h-96 overflow-y-auto scrollbar-thin">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800 text-xs">
                <span className="font-mono text-emerald-400 font-bold">
                  Search Results for "{searchQuery}" ({searchResults.length})
                </span>
                <span className="text-slate-400 text-[11px]">Use ↑ ↓ arrows and Enter to open</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="p-6 text-center">
                  <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-2 opacity-80" />
                  <p className="text-slate-200 font-semibold text-sm">No encyclopedia entries found matching "{searchQuery}"</p>
                  <p className="text-slate-400 text-xs mt-1">
                    Try searching for common terms: <strong className="text-emerald-300">Mending</strong>, <strong className="text-emerald-300">Warden</strong>, <strong className="text-emerald-300">Iron Farm</strong>, <strong className="text-emerald-300">Nether Portal</strong>, <strong className="text-emerald-300">/execute</strong>, or <strong className="text-emerald-300">Redstone Comparator</strong>.
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {searchResults.map((item, idx) => {
                    const isKeyboardSelected = idx === selectedResultIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => handleSelectSearchItem(item)}
                        onMouseEnter={() => setSelectedResultIndex(idx)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left ${
                          isKeyboardSelected
                            ? 'bg-slate-800/90 border-emerald-400 shadow-md ring-1 ring-emerald-400/30 translate-x-1'
                            : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-white tracking-wide">
                              {item.title}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                              {item.category}
                            </span>
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                              {item.version}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 line-clamp-1">
                            {item.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1 group-hover:underline">
                            View Article <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. POPULAR GUIDES SECTION */}
      {/* ========================================================================= */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Popular Guides &amp; Quick Reference
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Instant-access cards for the community's most frequently consulted game mechanics and tutorials.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline-block">6 Guides</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {POPULAR_GUIDES.map(guide => {
            const isSelected = activePopularGuide?.id === guide.id;
            return (
              <div
                key={guide.id}
                onClick={() => {
                  playClick();
                  setActivePopularGuide(guide);
                  setActiveTopicId(guide.topicId);
                  const el = document.getElementById('encyclopedia-reader-zone');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden group ${
                  isSelected
                    ? 'bg-slate-800/95 border-amber-400 shadow-xl shadow-amber-950/30 ring-2 ring-amber-400/20'
                    : 'bg-slate-900/80 border-slate-800 hover:border-amber-400/60 hover:bg-slate-800/60 shadow-lg'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 block">
                      {guide.category}
                    </span>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-200 transition-colors">
                      {guide.title}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                    {guide.version}
                  </span>
                </div>

                <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                  {guide.summary}
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Topic #{guide.topicId.toString().padStart(2, '0')}
                  </span>
                  <span className="text-amber-400 font-semibold flex items-center gap-1 text-xs">
                    Read Guide <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. MAIN CATEGORY CARDS (THE 5 LOGICAL GROUPS) */}
      {/* ========================================================================= */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Grid className="w-5 h-5 text-emerald-400" />
              Explore by 5 Core Categories
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Jump directly to curated categories rather than scrolling through a huge text wall.
            </p>
          </div>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => handleSelectCategory('all')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline"
            >
              Reset to All Categories
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {ENCYCLOPEDIA_CATEGORIES.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  handleSelectCategory(cat.id);
                  setActiveTopicId(cat.topicIds[0]);
                }}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-slate-800/95 border-emerald-400 shadow-xl shadow-emerald-950/40 ring-2 ring-emerald-400/20 translate-y-[-2px]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-emerald-400/50 hover:bg-slate-800/60 shadow-lg'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950 text-emerald-300 border border-emerald-500/20 font-bold">
                      {cat.topicIds.length} Topics
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-200 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] font-mono text-emerald-400/80 mt-1 mb-2">
                    {cat.subtopics}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400">
                    {isSelected ? 'Active Filter' : 'Explore Category'}
                  </span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-emerald-400 translate-x-1' : 'text-slate-500 group-hover:text-slate-300'}`} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 5. RECENTLY UPDATED SECTION (ACCURATE TIMESTAMPS) */}
      {/* ========================================================================= */}
      <div className="mb-10 bg-slate-900/60 border border-slate-800 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Recently Verified Entries &amp; Snapshot Tracking
            </h3>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">Verified against official release notes</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {RECENTLY_UPDATED_ENTRIES.map((entry, idx) => (
            <div 
              key={idx}
              onClick={() => {
                playClick();
                setActivePopularGuide(null);
                setActiveTopicId(entry.topicId);
                const el = document.getElementById('encyclopedia-reader-zone');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 hover:border-cyan-500/40 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-mono text-cyan-400 font-semibold">{entry.type}</span>
                <span className="text-[10px] font-mono text-slate-400">{entry.date}</span>
              </div>
              <h4 className="text-xs font-bold text-white group-hover:text-cyan-200 transition-colors line-clamp-1">
                {entry.title}
              </h4>
              <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">
                {entry.summary}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 6. ARTICLE WORKSPACE: TOPICS LIST (LEFT) + STANDARDIZED DEEP READER (RIGHT) */}
      {/* ========================================================================= */}
      <div id="encyclopedia-reader-zone" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-slate-800">
        
        {/* LEFT COLUMN: FILTERED TOPICS LIST */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between px-1 mb-1">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
              {selectedCategory === 'all' ? 'All 19 Topics' : ENCYCLOPEDIA_CATEGORIES.find(c => c.id === selectedCategory)?.name} ({filteredTopics.length})
            </span>
            <span className="text-[11px] text-emerald-400 font-mono">Click to read</span>
          </div>

          <div className="space-y-2 max-h-[850px] overflow-y-auto pr-1 scrollbar-thin">
            {filteredTopics.map(topic => {
              const isSelected = activeTopic.id === topic.id && !activePopularGuide;
              return (
                <div
                  key={topic.id}
                  onClick={() => handleSelectTopic(topic.id)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border-2 text-left ${
                    isSelected
                      ? 'bg-slate-800/95 border-emerald-500 shadow-lg shadow-emerald-950/40 translate-x-1'
                      : 'bg-slate-900/70 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-black/60 text-emerald-300 border border-white/5">
                        #{topic.id.toString().padStart(2, '0')}
                      </span>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {topic.title}
                      </h4>
                    </div>
                    <ChevronRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? 'text-emerald-400 rotate-90 lg:rotate-0' : 'text-slate-600'}`} />
                  </div>

                  <p className="mt-1.5 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {topic.summary}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/5 text-[11px]">
                    <span className="text-slate-400 font-mono text-[10px]">
                      {topic.categoryName}
                    </span>
                    <span className="text-emerald-400 font-mono text-[10px] bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/20">
                      {topic.versionBadge}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: FULL READER ARTICLE WITH STANDARDIZED SECTIONS */}
        <div className={`lg:col-span-8 bg-slate-900/90 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden transition-all ${
          readingWidth === 'wide' ? 'lg:col-span-12' : ''
        }`}>
          
          {/* SPECIAL VIEW: If a popular guide is active */}
          {activePopularGuide ? (
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-500/30">
                    Popular Guide
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Category: {activePopularGuide.category}
                  </span>
                </div>
                <button
                  onClick={() => setActivePopularGuide(null)}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 font-mono"
                >
                  <X className="w-3.5 h-3.5" /> Back to Topic #{activePopularGuide.topicId}
                </button>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
                {activePopularGuide.title}
              </h2>
              <p className="text-base text-amber-200/90 font-medium mb-4">
                {activePopularGuide.summary}
              </p>

              <div className="p-4 rounded-xl bg-slate-950/80 border border-amber-500/30 mb-6 text-sm text-slate-200 leading-relaxed">
                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider mb-2">
                  Technical Specifications &amp; Mechanics
                </h4>
                <p>{activePopularGuide.details}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800">
                <a
                  href={activePopularGuide.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  Official Minecraft Wiki Documentation
                </a>

                {activePopularGuide.toolId && (
                  <button
                    onClick={() => handleLaunchTool(activePopularGuide.toolId)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold transition-all shadow-lg shadow-amber-600/30 ml-auto"
                  >
                    <span>Launch Interactive Simulator</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* STANDARD VIEW: Topic Deep-Dive Reader */
            <div>
              {/* TOP READING CONTROLS & BREADCRUMBS */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                  <span className="text-emerald-400 font-bold">Encyclopedia</span>
                  <span>/</span>
                  <span className="text-slate-300">{activeTopic.categoryName}</span>
                  <span>/</span>
                  <span className="text-white font-semibold">#{activeTopic.id.toString().padStart(2, '0')}</span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  {/* Private Local Bookmark Button */}
                  <button
                    onClick={handleToggleBookmark}
                    className={`px-2.5 py-1 rounded-lg border flex items-center gap-1.5 font-mono text-[11px] transition-all ${
                      isBookmarked
                        ? 'bg-amber-950/80 text-amber-300 border-amber-500/60 shadow-sm'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border-slate-700'
                    }`}
                    title={isBookmarked ? 'Remove Bookmark (Stored Locally)' : 'Save Guide to Bookmarks (Private, Zero Login)'}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : 'text-slate-400'}`} />
                    <span>{isBookmarked ? 'Saved' : 'Bookmark'}</span>
                  </button>

                  {/* Reading Width Preference Toggle */}
                  <button
                    onClick={() => {
                      playClick();
                      setReadingWidth(prev => prev === 'standard' ? 'wide' : 'standard');
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1.5 font-mono text-[11px]"
                    title="Toggle Comfortable Reading Width"
                  >
                    {readingWidth === 'standard' ? (
                      <>
                        <Maximize2 className="w-3 h-3 text-cyan-400" />
                        <span>Wide View</span>
                      </>
                    ) : (
                      <>
                        <Minimize2 className="w-3 h-3 text-cyan-400" />
                        <span>Standard Width</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* ARTICLE METADATA BAR */}
              <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2 font-mono">
                  <span className="bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
                    Java Edition Definitive
                  </span>
                  <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    Applicable: {activeTopic.applicableVersions || activeTopic.versionBadge}
                  </span>
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    Last Verified: {activeTopic.lastVerified}
                  </span>
                </div>

                <a
                  href={`https://${activeTopic.quickReference?.find(q => q.label.includes('Source'))?.value || 'minecraft.wiki'}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono text-[11px] underline"
                >
                  <ExternalLink className="w-3 h-3" />
                  Official Wiki Source
                </a>
              </div>

              {/* ARTICLE TITLE & SUMMARY */}
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mb-3">
                {activeTopic.title}
              </h1>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {activeTopic.summary}
              </p>

              {/* DYNAMIC ARTICLE TABLE OF CONTENTS (TOC) */}
              {activeTopic.sections && activeTopic.sections.length > 0 && (
                <div className="p-4 rounded-2xl bg-slate-950/90 border border-emerald-500/30 mb-8 shadow-inner">
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                    <ListOrdered className="w-4 h-4 text-emerald-400" />
                    Article Contents
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeTopic.sections.map((sec, sIdx) => {
                      const isActive = activeHeadingId === sec.id;
                      return (
                        <button
                          key={sIdx}
                          onClick={() => handleScrollToHeading(sec.id)}
                          className={`text-left px-2.5 py-1.5 rounded-lg transition-all flex items-center gap-2 ${
                            isActive
                              ? 'bg-emerald-950/80 text-emerald-300 font-semibold border border-emerald-500/40'
                              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                          }`}
                        >
                          <span className="text-slate-500 font-mono text-[10px]">§{sIdx + 1}</span>
                          <span className="truncate">{sec.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* QUICK REFERENCE PARAMETERS TABLE */}
              {activeTopic.quickReference && (
                <div className="mb-8">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-3">
                    <Info className="w-4 h-4 text-cyan-400" />
                    Key Reference Parameters
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {activeTopic.quickReference.map((ref, idx) => (
                      <div 
                        key={idx}
                        className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 flex items-center justify-between"
                      >
                        <span className="text-slate-400 font-mono">{ref.label}:</span>
                        <span className="font-semibold text-emerald-300 font-mono ml-2 text-right">{ref.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* VERIFIED KEY FACTS */}
              <div className="mb-8">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Verified Canonical Mechanics (Java Edition)
                </h3>
                <div className="space-y-2">
                  {activeTopic.keyFacts?.map((fact, idx) => (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                      <span>{fact}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RICH SUBSECTIONS (TABLES, CALLOUTS, COMMANDS, DIAGRAMS) */}
              {activeTopic.sections?.map((sec, sIdx) => (
                <div id={sec.id} key={sIdx} className="mb-10 pt-4 border-t border-slate-800/80">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    {sec.title}
                  </h3>
                  
                  {sec.content && (
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                      {sec.content}
                    </p>
                  )}

                  {/* CALLOUT BOX */}
                  {sec.callout && (
                    <div className={`p-4 rounded-xl border mb-4 text-xs sm:text-sm leading-relaxed ${
                      sec.callout.type === 'warning'
                        ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                        : sec.callout.type === 'tip'
                        ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                        : sec.callout.type === 'edition'
                        ? 'bg-purple-950/40 border-purple-500/50 text-purple-200'
                        : 'bg-slate-950 border-slate-700 text-slate-300'
                    }`}>
                      <div className="flex items-center gap-2 font-bold mb-1 font-mono text-xs uppercase tracking-wider">
                        {sec.callout.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
                        {sec.callout.type === 'tip' && <Lightbulb className="w-4 h-4 text-emerald-400" />}
                        {sec.callout.type === 'edition' && <Shield className="w-4 h-4 text-purple-400" />}
                        {sec.callout.type === 'note' && <Info className="w-4 h-4 text-cyan-400" />}
                        <span>{sec.callout.title}</span>
                      </div>
                      <p>{sec.callout.text}</p>
                    </div>
                  )}

                  {/* STRUCTURED TABLE (MOBILE-FRIENDLY HORIZONTAL SCROLL) */}
                  {sec.table && (
                    <div className="overflow-x-auto rounded-xl border border-slate-800 mb-4 scrollbar-thin">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-slate-950 border-b border-slate-800 text-slate-300 font-mono">
                            {sec.table.headers.map((h, hIdx) => (
                              <th key={hIdx} className="p-3 font-semibold whitespace-nowrap">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                          {sec.table.rows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-800/40 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className={`p-3 ${cIdx === 0 ? 'font-bold text-white font-mono' : 'text-slate-300'}`}>
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* CODE & COMMAND EXAMPLES WITH COPY BUTTON */}
                  {sec.commands && (
                    <div className="space-y-3 mb-4">
                      {sec.commands.map((cmd, cIdx) => {
                        const isCopied = copiedCommandIndex === `${sIdx}-${cIdx}`;
                        return (
                          <div key={cIdx} className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                            {cmd.description && (
                              <p className="text-[11px] text-slate-400 mb-2 font-mono">
                                # {cmd.description}
                              </p>
                            )}
                            <div className="relative group">
                              <pre className="font-mono text-xs text-emerald-300 overflow-x-auto p-3 pr-24 rounded-lg bg-black/80 border border-slate-800 select-all scrollbar-thin whitespace-pre-wrap break-all">
                                <code>{cmd.command}</code>
                              </pre>
                              <button
                                onClick={() => handleCopyCommand(cmd.command, `${sIdx}-${cIdx}`)}
                                className={`absolute right-2 top-2 px-2.5 py-1 rounded-md text-[11px] font-mono font-semibold flex items-center gap-1.5 transition-all ${
                                  isCopied
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700'
                                }`}
                                title="Copy exact command to clipboard"
                                aria-label="Copy command"
                              >
                                {isCopied ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Copied!</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy className="w-3.5 h-3.5" />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* VISUAL DIAGRAM / CODE FLOW */}
                  {sec.diagram && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 mb-4">
                      <div className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                        {sec.diagram.title}
                      </div>
                      <div className="space-y-2">
                        {sec.diagram.steps.map((step, stIdx) => (
                          <div key={stIdx} className="flex items-start gap-2 text-xs font-mono text-slate-300">
                            <span className="text-emerald-400 font-bold">[{stIdx + 1}]</span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* ARTICLE FOOTER & PREVIOUS / NEXT NAVIGATION */}
              <div className="pt-6 border-t border-slate-800 space-y-6">
                
                {/* PREVIOUS & NEXT TOPIC BUTTONS */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {prevTopic ? (
                    <button
                      onClick={() => handleSelectTopic(prevTopic.id)}
                      className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-left transition-all group"
                    >
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                        <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                        Previous Topic
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                        #{prevTopic.id} {prevTopic.title}
                      </h4>
                    </button>
                  ) : <div />}

                  {nextTopic && (
                    <button
                      onClick={() => handleSelectTopic(nextTopic.id)}
                      className="p-3.5 rounded-xl bg-slate-950/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-right transition-all group sm:ml-auto w-full"
                    >
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider flex items-center justify-end gap-1 mb-1">
                        Next Topic
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <h4 className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                        #{nextTopic.id} {nextTopic.title}
                      </h4>
                    </button>
                  )}
                </div>

                {/* INTERACTIVE TOOL LAUNCHER */}
                {activeTopic.interactiveToolId && (
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-white">Experience this topic interactively</h4>
                      <p className="text-xs text-slate-400">Launch the real-time simulation module for hands-on experimentation.</p>
                    </div>
                    <button
                      onClick={() => handleLaunchTool(activeTopic.interactiveToolId)}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-700/30 transition-all shrink-0"
                    >
                      <span>{activeTopic.interactiveToolLabel || 'Open Interactive Tool'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* UNOFFICIAL FAN-SITE DISCLAIMER & ATTRIBUTION */}
                <div className="text-[11px] font-mono text-slate-500 border-t border-slate-800/60 pt-4 space-y-1">
                  <p>
                    <strong>Unofficial Fan-Site Notice:</strong> This article is part of an independent community encyclopedia and is not affiliated with, endorsed by, or associated with Mojang Studios or Microsoft.
                  </p>
                  <p>
                    Content verified against canonical Java Edition release notes. Found an error? <a href="#feedback" className="text-emerald-400 underline hover:text-emerald-300">Submit an editorial correction</a>.
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>

    </section>
  );
}
