import React, { useState, useEffect, useRef } from 'react';
import { 
  NAVIGATION_CATEGORIES, 
  NAVIGATION_ITEMS, 
  getSectionById 
} from '../data/navigationRoutes';
import { GAME_VERSION_CONFIG } from '../data/versionConfig';
import { 
  Volume2, 
  VolumeX, 
  Search, 
  ChevronDown, 
  X, 
  Sliders, 
  Sparkles, 
  Home, 
  BookOpen, 
  Menu
} from 'lucide-react';
import { toggleSound, isSoundEnabled, playClick, playPop } from '../utils/soundFX';
import CommandPalette from './CommandPalette';

export default function Navbar({ 
  activeSection, 
  onSelectSection, 
  viewMode, 
  onToggleViewMode 
}) {
  const [soundOn, setSoundOn] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null); // 'survival' | 'world' | 'media' | 'tech' | null
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Scroll listener for XP progress and sticky background style
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 25);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollY / docHeight) * 100)) : 0;
      setScrollProgress(progress);

      // Calculate Minecraft player level (1 to 30) based on exploration depth
      const lvl = Math.min(30, Math.max(1, Math.floor((progress / 100) * 29) + 1));
      setCurrentLevel(lvl);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global Keyboard Shortcuts (Ctrl+K for search, Escape for mobile/dropdowns)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        playClick();
        setIsCommandPaletteOpen(prev => !prev);
      } else if (e.key === 'Escape') {
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
        if (activeDropdown) {
          setActiveDropdown(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen, activeDropdown]);

  // Click outside listener to close desktop dropdowns
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundOn(newState);
  };

  const handleLogoClick = () => {
    playClick();
    onSelectSection('home');
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  const handleNavClick = (id) => {
    playClick();
    onSelectSection(id);
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  // Find currently active item object for status badge
  const activeItem = getSectionById(activeSection);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-x-clip">
        {/* Main Navigation Bar */}
        <nav 
          aria-label="Main Navigation"
          className={`transition-all duration-300 ${
            scrolled 
              ? 'bg-[#101117]/95 backdrop-blur-md border-b-2 border-[#222330] py-2 shadow-2xl' 
              : 'bg-gradient-to-b from-[#0a0b0f]/98 via-[#0c0d12]/85 to-transparent py-2.5 sm:py-3'
          }`}
        >
          <div className="max-w-7xl mx-auto px-2.5 sm:px-4 lg:px-6 flex items-center justify-between gap-2 lg:gap-3">
            
            {/* BRAND / LOGO */}
            <div 
              onClick={handleLogoClick}
              className="flex items-center gap-2.5 cursor-pointer group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg p-1"
              title="Return to Minecraft Portal Home"
              tabIndex={0}
              role="button"
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleLogoClick()}
            >
              <div className="w-9 h-9 relative transform group-hover:scale-110 group-hover:rotate-6 transition-transform">
                <img 
                  src="/icons/minecraft/grass_block.svg" 
                  alt="Minecraft Grass Block" 
                  onError={(e) => { e.currentTarget.src = '/icons/minecraft/grass_block.png'; }}
                  className="w-full h-full object-contain filter drop-shadow" 
                  style={{ imageRendering: 'pixelated' }}
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-pixel text-xs sm:text-sm text-white tracking-wider mc-shadow">MINECRAFT</span>
                  <span 
                    title={`${GAME_VERSION_CONFIG.currentStable.fullBadge} — ${GAME_VERSION_CONFIG.currentStable.name}`}
                    className="text-[9px] font-silkscreen px-1 py-0.2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 rounded shrink-0"
                  >
                    {GAME_VERSION_CONFIG.currentStable.badgeText}
                  </span>
                </div>
                <p className="text-[9px] text-zinc-400 font-mono tracking-tight hidden sm:block">JAVA EDITION CODEX</p>
              </div>
            </div>

            {/* DESKTOP CATEGORY NAVIGATION (MEGA DROPDOWNS) */}
            <div 
              ref={dropdownRef} 
              className="hidden lg:flex items-center gap-1 bg-[#161720]/90 p-1 rounded-xl border border-[#282937] shadow-inner shrink-0"
            >
              {/* Home Link */}
              <button
                onClick={handleLogoClick}
                aria-current={activeSection === 'home' ? 'page' : undefined}
                className={`whitespace-nowrap shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-silkscreen rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                  activeSection === 'home'
                    ? 'bg-[#5c8e32] text-white shadow-md border border-[#89c44e]'
                    : 'text-zinc-400 hover:text-white hover:bg-[#222330]'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>

              {/* Categorized Dropdowns */}
              {NAVIGATION_CATEGORIES.map(category => {
                const isCatActive = category.itemIds.includes(activeSection);
                const isDropdownOpen = activeDropdown === category.id;
                const Icon = category.icon;

                return (
                  <div key={category.id} className="relative">
                    <button
                      onClick={() => {
                        playClick();
                        setActiveDropdown(isDropdownOpen ? null : category.id);
                      }}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                      className={`whitespace-nowrap shrink-0 flex items-center gap-1 px-2.5 py-1.5 text-xs font-silkscreen rounded-lg transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                        isCatActive
                          ? 'bg-[#5c8e32] text-white shadow-md border border-[#89c44e]'
                          : isDropdownOpen
                            ? 'bg-[#252738] text-white'
                            : 'text-zinc-400 hover:text-white hover:bg-[#222330]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{category.shortLabel}</span>
                      <ChevronDown className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Desktop Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute top-full left-0 mt-2 w-72 bg-[#14151f] border-2 border-[#383a4d] rounded-2xl p-2 shadow-2xl z-50 animate-fadeIn space-y-1">
                        <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-[#252738] flex items-center justify-between">
                          <span>{category.label}</span>
                          <span className="text-emerald-400">{category.badge}</span>
                        </div>

                        {category.itemIds.map(itemId => {
                          const item = getSectionById(itemId);
                          if (!item) return null;
                          const ItemIcon = item.icon;
                          const isItemActive = activeSection === item.id;

                          return (
                            <button
                              key={item.id}
                              onClick={() => handleNavClick(item.id)}
                              aria-current={isItemActive ? 'page' : undefined}
                              className={`w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
                                isItemActive
                                  ? 'bg-[#5c8e32] text-white shadow-sm'
                                  : 'hover:bg-[#202230] text-zinc-300'
                              }`}
                            >
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center p-1.5 shrink-0 ${
                                isItemActive ? 'bg-black/30 text-white' : 'bg-[#1b1c28] text-emerald-400'
                              }`}>
                                <ItemIcon className="w-4 h-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between">
                                  <span className="font-bold text-xs truncate">{item.label}</span>
                                  <span className="text-[9px] font-mono text-zinc-400">{item.badge}</span>
                                </div>
                                <p className="text-[10px] text-zinc-400 truncate leading-tight">
                                  {item.desc}
                                </p>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* RIGHT UTILITIES: COMPACT SEARCH, VIEW MODE, SFX, LEVEL & MOBILE HAMBURGER */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              
              {/* Quick Search & Command Palette Button */}
              <button
                onClick={() => {
                  playClick();
                  setIsCommandPaletteOpen(true);
                }}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-xl bg-[#1b1c28] hover:bg-[#252738] border border-[#37394c] text-xs text-zinc-300 hover:text-white transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
                title="Search encyclopedia (Ctrl+K)"
                aria-label="Open search command palette"
              >
                <Search className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="hidden xl:inline text-[11px] font-mono">Search</span>
                <kbd className="hidden sm:inline-block px-1 py-0.2 text-[9px] font-mono text-zinc-400 bg-black/50 border border-zinc-700 rounded">
                  Ctrl+K
                </kbd>
              </button>

              {/* View Mode Toggle: Page vs Scroll */}
              <button
                onClick={() => {
                  playPop();
                  onToggleViewMode(viewMode === 'page' ? 'scroll' : 'page');
                }}
                className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-xl border text-[10px] font-mono font-semibold transition-all focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none shrink-0 ${
                  viewMode === 'page'
                    ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-sm'
                    : 'bg-cyan-950/80 border-cyan-500/50 text-cyan-300 shadow-sm'
                }`}
                title="Toggle between single page mode and continuous scroll mode"
              >
                <Sliders className="w-3 h-3 shrink-0" />
                <span className="hidden lg:inline">{viewMode === 'page' ? 'PAGE VIEW' : 'SCROLL ALL'}</span>
                <span className="lg:hidden">{viewMode === 'page' ? 'PAGE' : 'SCROLL'}</span>
              </button>

              {/* Experience Level Pill */}
              <div 
                className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-xl bg-[#131b0e] border border-[#3e6320] text-[10px] font-pixel text-[#80ff20] mc-shadow cursor-default shrink-0"
                title={`Exploration XP: Level ${currentLevel} (${Math.round(scrollProgress)}% explored)`}
              >
                <span>LVL</span>
                <span className="font-bold">{currentLevel}</span>
              </div>

              {/* Sound FX Toggle */}
              <button
                onClick={handleSoundToggle}
                title={soundOn ? "Mute Web Audio SFX" : "Enable Web Audio SFX"}
                aria-label={soundOn ? "Mute Sound Effects" : "Enable Sound Effects"}
                className={`p-1.5 sm:px-2 sm:py-1 rounded-xl border transition-all flex items-center gap-1 text-xs font-mono focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none shrink-0 ${
                  soundOn 
                    ? 'bg-[#182613] text-[#9ee256] border-[#3e6320] hover:bg-[#233b1b]' 
                    : 'bg-[#291616] text-red-400 border-red-900/60 hover:bg-[#381f1f]'
                }`}
              >
                {soundOn ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span className="hidden 2xl:inline text-[10px] font-silkscreen">{soundOn ? 'SFX' : 'MUTED'}</span>
              </button>

              {/* Mobile Hamburger Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 bg-[#1b1c26] text-zinc-300 rounded-xl border border-[#353648] hover:bg-[#252636] transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none shrink-0"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-emerald-400" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>

            </div>

          </div>

          {/* MOBILE ACCESSIBLE DRAWER */}
          {mobileMenuOpen && (
            <div 
              id="mobile-menu"
              ref={mobileMenuRef}
              className="lg:hidden bg-[#12131b]/98 border-b-4 border-[#252535] px-4 pt-3 pb-6 mt-2 space-y-4 animate-fadeIn shadow-2xl max-h-[85vh] overflow-y-auto"
            >
              {/* Mobile Header Bar */}
              <div className="flex items-center justify-between pb-2 border-b border-[#252535]">
                <div className="flex items-center gap-2">
                  <span className="font-silkscreen text-[11px] text-zinc-300">NAVIGATION CODEX</span>
                  <span className="font-pixel text-[10px] text-[#80ff20] mc-shadow bg-[#131b0e] px-1.5 py-0.5 rounded border border-[#3e6320]">
                    LVL {currentLevel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      playPop();
                      onToggleViewMode(viewMode === 'page' ? 'scroll' : 'page');
                    }}
                    className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30"
                  >
                    {viewMode === 'page' ? 'Mode: Single Page' : 'Mode: Scroll All'}
                  </button>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-zinc-400 hover:text-white p-1"
                    aria-label="Close menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Mobile Home Button */}
              <button
                onClick={handleLogoClick}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-left text-xs font-silkscreen border transition-all ${
                  activeSection === 'home'
                    ? 'bg-[#5c8e32] text-white border-[#89c44e] shadow-md'
                    : 'bg-[#181924] text-zinc-300 border-[#2b2c3d]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Home className="w-4 h-4 text-emerald-400" />
                  <span>PORTAL OVERVIEW HUB</span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400">HOME</span>
              </button>

              {/* Mobile Categories Grouped Links */}
              {NAVIGATION_CATEGORIES.map(category => (
                <div key={category.id} className="space-y-1.5">
                  <div className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider px-1 flex items-center justify-between">
                    <span>{category.label}</span>
                    <span className="text-emerald-400">{category.badge}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {category.itemIds.map(itemId => {
                      const item = getSectionById(itemId);
                      if (!item) return null;
                      const ItemIcon = item.icon;
                      const isItemActive = activeSection === item.id;

                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavClick(item.id)}
                          aria-current={isItemActive ? 'page' : undefined}
                          className={`flex items-center gap-2 p-2.5 rounded-xl text-left text-xs font-silkscreen transition-all border ${
                            isItemActive
                              ? 'bg-[#5c8e32] text-white border-[#89c44e] shadow-md'
                              : 'bg-[#191a24] text-zinc-300 border-[#2b2c3d] hover:bg-[#232433] hover:text-white'
                          }`}
                        >
                          <ItemIcon className={`w-4 h-4 shrink-0 ${isItemActive ? 'text-white' : 'text-emerald-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Mobile Quick Action Buttons */}
              <div className="pt-2 border-t border-[#252535] flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsCommandPaletteOpen(true);
                  }}
                  className="flex-1 py-2.5 bg-[#1b1c28] hover:bg-[#252738] border border-[#3b3d52] rounded-xl text-xs font-semibold text-zinc-300 flex items-center justify-center gap-2"
                >
                  <Search className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Search All Codex</span>
                </button>
                <button
                  onClick={handleSoundToggle}
                  className="py-2.5 px-3 bg-[#1b1c28] border border-[#3b3d52] rounded-xl text-xs font-semibold text-zinc-300 flex items-center justify-center gap-1.5"
                >
                  {soundOn ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-red-400" />}
                </button>
              </div>

            </div>
          )}
        </nav>

        {/* Authentic Minecraft XP Progress Bar */}
        <div 
          className="w-full h-[6px] bg-[#0c0d12] border-b border-black relative overflow-hidden" 
          title={`Exploration XP: ${Math.round(scrollProgress)}% (Level ${currentLevel})`}
        >
          <div className="absolute inset-0 flex justify-between px-1 pointer-events-none z-10 opacity-30">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="w-[1px] h-full bg-black"></div>
            ))}
          </div>

          <div 
            className="h-full bg-gradient-to-r from-[#55cc11] via-[#80ff20] to-[#b3ff55] shadow-[0_0_8px_rgba(128,255,32,0.8)] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>
      </header>

      {/* Global Command Palette Search Modal */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onSelectSection={handleNavClick}
      />
    </>
  );
}
