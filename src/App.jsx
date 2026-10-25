import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PortalHub from './components/PortalHub';
import { PageHeaderNav, PageFooterNav } from './components/PageNavigationFrame';

// All 15 Interactive Section Components
import EncyclopediaHub from './components/EncyclopediaHub';
import GameDropsTimeline from './components/GameDropsTimeline';
import CraftingTableExplorer from './components/CraftingTableExplorer';
import FurnaceSmelterExplorer from './components/FurnaceSmelterExplorer';
import SmithingTableExplorer from './components/SmithingTableExplorer';
import TradingExplorer from './components/TradingExplorer';
import StructureExplorer from './components/StructureExplorer';
import IconGallery from './components/IconGallery';
import MobBestiary from './components/MobBestiary';
import BiomeExplorer from './components/BiomeExplorer';
import PotionBrewer from './components/PotionBrewer';
import EnchantmentLab from './components/EnchantmentLab';
import ResourcePackStudio from './components/ResourcePackStudio';
import RedstoneLab from './components/RedstoneLab';
import ModdingHub from './components/ModdingHub';
import FeedbackHub from './components/FeedbackHub';
import Footer from './components/Footer';

import { ArrowUp } from 'lucide-react';
import { playLevelUp, playClick } from './utils/soundFX';
import { NAVIGATION_ITEMS } from './data/navigationRoutes';

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
            {renderActivePageComponent()}
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
