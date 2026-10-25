import React, { useState, useEffect, Suspense, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortalHub from './components/PortalHub';
import { PageHeaderNav, PageFooterNav } from './components/PageNavigationFrame';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingFallback from './components/LoadingFallback';
import Footer from './components/Footer';

import { ArrowUp } from 'lucide-react';
import { playLevelUp, playClick } from './utils/soundFX';
import { NAVIGATION_ITEMS } from './data/navigationRoutes';

// Code-Split Lazy Loaded Interactive Section Components (Loaded on Demand)
const EncyclopediaHub = lazy(() => import('./components/EncyclopediaHub'));
const GameDropsTimeline = lazy(() => import('./components/GameDropsTimeline'));
const CraftingTableExplorer = lazy(() => import('./components/CraftingTableExplorer'));
const FurnaceSmelterExplorer = lazy(() => import('./components/FurnaceSmelterExplorer'));
const SmithingTableExplorer = lazy(() => import('./components/SmithingTableExplorer'));
const TradingExplorer = lazy(() => import('./components/TradingExplorer'));
const StructureExplorer = lazy(() => import('./components/StructureExplorer'));
const IconGallery = lazy(() => import('./components/IconGallery'));
const MobBestiary = lazy(() => import('./components/MobBestiary'));
const BiomeExplorer = lazy(() => import('./components/BiomeExplorer'));
const PotionBrewer = lazy(() => import('./components/PotionBrewer'));
const EnchantmentLab = lazy(() => import('./components/EnchantmentLab'));
const ResourcePackStudio = lazy(() => import('./components/ResourcePackStudio'));
const RedstoneLab = lazy(() => import('./components/RedstoneLab'));
const ModdingHub = lazy(() => import('./components/ModdingHub'));
const FeedbackHub = lazy(() => import('./components/FeedbackHub'));
const SurvivalChecklistModule = lazy(() => import('./components/SurvivalChecklistModule'));

export default function App() {
  // Navigation State with resilient URL Hash sync
  const getInitialSection = () => {
    const hash = window.location.hash.replace('#', '').trim();
    const validIds = ['home', ...NAVIGATION_ITEMS.map(i => i.id)];
    return validIds.includes(hash) ? hash : 'home';
  };

  const [activeSection, setActiveSection] = useState(getInitialSection);
  const [viewMode, setViewMode] = useState('page'); // 'page' (dedicated single page view) | 'scroll' (all sections continuous)
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync state with URL hash and browser Back / Forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      const validIds = ['home', ...NAVIGATION_ITEMS.map(i => i.id)];
      if (validIds.includes(hash)) {
        setActiveSection(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (!hash) {
        setActiveSection('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    window.addEventListener('popstate', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      window.removeEventListener('popstate', handleHashChange);
    };
  }, []);

  // Floating Return to Top Button Listener
  useEffect(() => {
    const checkScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Meaningful document.title updates for browser tabs
  useEffect(() => {
    if (activeSection === 'home') {
      document.title = 'Minecraft Java Edition Portal & Encyclopedia | Java 26.3 Wilderness Bound';
    } else {
      const section = NAVIGATION_ITEMS.find(i => i.id === activeSection);
      if (section) {
        document.title = `${section.fullTitle} | Minecraft Java Codex`;
      }
    }
  }, [activeSection]);

  // Central Navigation Dispatcher
  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    window.location.hash = sectionId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollToTop = () => {
    playLevelUp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render the currently active single component in Page View Mode
  const renderActivePageComponent = () => {
    switch (activeSection) {
      case 'encyclopedia': return <EncyclopediaHub onNavigateToSection={handleNavigate} />;
      case 'drops': return <GameDropsTimeline />;
      case 'crafting': return <CraftingTableExplorer />;
      case 'furnace': return <FurnaceSmelterExplorer />;
      case 'smithing': return <SmithingTableExplorer />;
      case 'trading': return <TradingExplorer />;
      case 'structures': return <StructureExplorer />;
      case 'icons': return <IconGallery />;
      case 'mobs': return <MobBestiary />;
      case 'biomes': return <BiomeExplorer />;
      case 'brewing': return <PotionBrewer />;
      case 'enchanting': return <EnchantmentLab />;
      case 'resourcepacks': return <ResourcePackStudio />;
      case 'redstone': return <RedstoneLab />;
      case 'modding': return <ModdingHub />;
      case 'checklists': return <SurvivalChecklistModule onNavigateToSection={handleNavigate} />;
      case 'feedback': return <FeedbackHub />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0d12] text-[#e0e0e0] font-sans selection:bg-[#5c8e32] selection:text-white relative">
      {/* Top Fixed Navigation & Minecraft XP Bar */}
      <Navbar 
        activeSection={activeSection} 
        onSelectSection={handleNavigate}
        viewMode={viewMode}
        onToggleViewMode={setViewMode}
      />

      {/* VIEW MODE 1: DEDICATED SINGLE PAGE VIEW (DEFAULT) */}
      {viewMode === 'page' ? (
        activeSection === 'home' ? (
          /* HOME PAGE: Hero Banner + Interactive Portal Directory Hub */
          <main className="animate-fadeIn">
            <Hero />
            <PortalHub 
              onSelectSection={handleNavigate} 
              onToggleViewMode={setViewMode}
              viewMode={viewMode}
            />
          </main>
        ) : (
          /* DEDICATED SECTION PAGE: Breadcrumbs + Component + Pagination */
          <main className="animate-fadeIn">
            <PageHeaderNav 
              currentSectionId={activeSection} 
              onNavigateHome={() => handleNavigate('home')}
              onSelectSection={handleNavigate}
              viewMode={viewMode}
              onToggleViewMode={setViewMode}
            />
            <ErrorBoundary onReset={() => handleNavigate('home')}>
              <Suspense fallback={<LoadingFallback message={`GENERATING ${activeSection.toUpperCase()} CHUNK...`} />}>
                {renderActivePageComponent()}
              </Suspense>
            </ErrorBoundary>
            <PageFooterNav 
              currentSectionId={activeSection}
              onSelectSection={handleNavigate}
              onNavigateHome={() => handleNavigate('home')}
            />
          </main>
        )
      ) : (
        /* VIEW MODE 2: CONTINUOUS SCROLL MODE (ALL SECTIONS SEQUENTIALLY) */
        <main className="animate-fadeIn">
          <Hero />
          <ErrorBoundary onReset={() => handleNavigate('home')}>
            <Suspense fallback={<LoadingFallback message="STREAMING CHUNKS..." />}>
              <EncyclopediaHub onNavigateToSection={handleNavigate} />
              <GameDropsTimeline />
              <CraftingTableExplorer />
              <FurnaceSmelterExplorer />
              <SmithingTableExplorer />
              <TradingExplorer />
              <StructureExplorer />
              <IconGallery />
              <MobBestiary />
              <BiomeExplorer />
              <PotionBrewer />
              <EnchantmentLab />
              <ResourcePackStudio />
              <RedstoneLab />
              <ModdingHub />
              <FeedbackHub />
            </Suspense>
          </ErrorBoundary>
        </main>
      )}

      {/* Footer */}
      <Footer />

      {/* Floating Minecraft "Totem of Undying / Return to Top" Button */}
      {showScrollTop && (
        <button
          onClick={handleScrollToTop}
          title="Return to Surface (Top)"
          className="fixed bottom-6 right-6 z-40 p-2.5 rounded-xl bg-[#171822]/90 backdrop-blur-md border-2 border-[#3b3d52] hover:border-[#ffd700] text-amber-300 shadow-2xl transition-all duration-200 transform hover:scale-110 active:scale-95 group flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:outline-none"
        >
          <div className="w-8 h-8 relative flex items-center justify-center">
            <img 
              src="/icons/minecraft/totem_of_undying.svg" 
              alt="Totem of Undying" 
              onError={(e) => { e.currentTarget.src = '/icons/minecraft/totem_of_undying.png'; }}
              className="w-full h-full object-contain filter drop-shadow group-hover:rotate-12 transition-transform"
              style={{ imageRendering: 'pixelated' }}
            />
          </div>

          <div className="hidden sm:flex flex-col text-left pr-1">
            <span className="font-pixel text-[9px] text-[#ffd700] mc-shadow leading-tight">ASCEND</span>
            <span className="font-mono text-[9px] text-zinc-400">SURFACE</span>
          </div>
        </button>
      )}
    </div>
  );
}
