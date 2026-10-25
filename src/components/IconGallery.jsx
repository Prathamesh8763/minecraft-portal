import React, { useState, useMemo } from 'react';
import { MINECRAFT_ICONS, MINECRAFT_ICON_CATEGORIES } from '../data/minecraftIcons';
import { Image, Search, Copy, Check, Download, Sparkles, FolderDown, ShieldCheck, FileCode } from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import confetti from 'canvas-confetti';

const PAGE_SIZE = 80;

export default function IconGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState(null);
  const [activeIcon, setActiveIcon] = useState(MINECRAFT_ICONS[0] || null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredIcons = useMemo(() => {
    return MINECRAFT_ICONS.filter(icon => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
                            icon.name.toLowerCase().includes(q) ||
                            icon.id.toLowerCase().includes(q) ||
                            icon.category.toLowerCase().includes(q);
      if (!matchesSearch) return false;
      if (selectedCategory === 'All') return true;
      return icon.category === selectedCategory;
    });
  }, [selectedCategory, searchQuery]);

  const displayedIcons = useMemo(() => {
    // If searching, show all matching; otherwise paginate for speed
    if (searchQuery.trim()) return filteredIcons;
    return filteredIcons.slice(0, visibleCount);
  }, [filteredIcons, visibleCount, searchQuery]);

  const handleCopy = (icon, format = 'path') => {
    playPop();
    let textToCopy = icon.file;
    if (format === 'png') {
      textToCopy = icon.pngFile || icon.file.replace('.svg', '.png');
    } else if (format === 'html') {
      textToCopy = `<img src="${icon.file}" alt="${icon.name}" width="32" height="32" style="image-rendering: pixelated;" />`;
    }

    navigator.clipboard.writeText(textToCopy);
    setCopiedId(icon.id + '-' + format);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleIconSelect = (icon) => {
    playClick();
    setActiveIcon(icon);
  };

  const handleDownload = (format = 'svg') => {
    if (!activeIcon) return;
    playLevelUp();
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.8 },
      colors: ['#4aedd9', '#5c8e32', '#f8c53a']
    });

    const link = document.createElement('a');
    if (format === 'png') {
      link.href = activeIcon.pngFile || activeIcon.file.replace('.svg', '.png');
      link.download = `${activeIcon.id}.png`;
    } else {
      link.href = activeIcon.file;
      link.download = `${activeIcon.id}.svg`;
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="icons" className="py-20 bg-[#0e0f17] border-t-4 border-[#252535]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#20202e] border border-[#3b3b4f] text-[11px] font-silkscreen text-[#4aedd9]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>OFFICIAL MINECRAFT WIKI ASSET VAULT</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            MINECRAFT SVG & PNG ICONS
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Over <strong className="text-emerald-400 font-mono">1,750+</strong> authentic original Minecraft Java assets downloaded directly from the official <a href="https://minecraft.wiki/w/Category:Item_icons" target="_blank" rel="noreferrer" className="text-cyan-400 underline hover:text-cyan-300">Minecraft Wiki Category:Item_icons</a> & <a href="https://minecraft.wiki/w/Category:InvSprite_files" target="_blank" rel="noreferrer" className="text-cyan-400 underline hover:text-cyan-300">Category:InvSprite_files</a>. Pixel-perfect, crisp, offline-ready in <code className="text-emerald-400 bg-black/40 px-1.5 py-0.5 rounded border border-white/10 font-mono text-xs">/public/icons/minecraft/</code>.
          </p>
        </div>

        {/* Selected Icon Spotlight Box */}
        {activeIcon && (
          <div className="mb-10 max-w-3xl mx-auto mc-panel p-6 rounded-xl bg-[#171824] border-4 border-[#3b3c50] shadow-2xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-5">
                <div className="w-20 h-20 rounded-lg bg-[#0e0f16] border-2 border-[#2c2d3f] p-3 flex items-center justify-center mc-enchant-glint shadow-inner relative group">
                  <img 
                    src={activeIcon.file} 
                    alt={activeIcon.name} 
                    className="w-14 h-14 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-silkscreen text-base text-white font-bold">{activeIcon.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {activeIcon.category}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 block mt-1">
                    SVG: <code className="text-[#4aedd9]">{activeIcon.file}</code>
                  </span>
                  <span className="text-xs font-mono text-zinc-400 block">
                    PNG: <code className="text-emerald-400">{activeIcon.pngFile}</code>
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500 block mt-0.5">
                    Official Origin: {activeIcon.version}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => handleCopy(activeIcon, 'path')}
                  className="mc-btn text-xs py-2 px-3 flex items-center gap-1.5 flex-1 sm:flex-initial"
                >
                  {copiedId === activeIcon.id + '-path' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === activeIcon.id + '-path' ? 'COPIED SVG' : 'COPY SVG'}</span>
                </button>

                <button
                  onClick={() => handleCopy(activeIcon, 'png')}
                  className="mc-btn text-xs py-2 px-3 flex items-center gap-1.5 flex-1 sm:flex-initial"
                >
                  {copiedId === activeIcon.id + '-png' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === activeIcon.id + '-png' ? 'COPIED PNG' : 'COPY PNG'}</span>
                </button>

                <button
                  onClick={() => handleCopy(activeIcon, 'html')}
                  className="mc-btn text-xs py-2 px-3 flex items-center gap-1.5 flex-1 sm:flex-initial"
                >
                  {copiedId === activeIcon.id + '-html' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileCode className="w-3.5 h-3.5" />}
                  <span>{copiedId === activeIcon.id + '-html' ? 'COPIED TAG' : '<IMG> TAG'}</span>
                </button>

                <button
                  onClick={() => handleDownload('svg')}
                  className="mc-btn mc-btn-green text-xs py-2 px-3 flex items-center gap-1.5 flex-1 sm:flex-initial"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>SVG</span>
                </button>

                <button
                  onClick={() => handleDownload('png')}
                  className="mc-btn text-xs py-2 px-3 flex items-center gap-1.5 flex-1 sm:flex-initial bg-[#2b3a4a] hover:bg-[#34465a] border-[#415a75]"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>PNG</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Chips */}
          <div className="flex flex-wrap items-center gap-1.5">
            {MINECRAFT_ICON_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { playClick(); setSelectedCategory(cat); setVisibleCount(PAGE_SIZE); }}
                  className={`px-3 py-1.5 rounded text-xs font-silkscreen transition-all border ${
                    isSelected
                      ? 'bg-[#5c8e32] text-white border-[#89c44e] shadow'
                      : 'bg-[#181924] text-zinc-400 border-[#2b2c3d] hover:bg-[#202130] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search 1,750+ official icons & blocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#141520] border-2 border-[#292a3b] rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* Counter Bar */}
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-4 px-1">
          <span>
            SHOWING <strong className="text-white">{displayedIcons.length}</strong> OF <strong className="text-emerald-400">{filteredIcons.length}</strong> MATCHING ITEMS
          </span>
          <span className="text-[11px] text-zinc-500">
            100% ORIGINAL MINECRAFT WIKI ICONS
          </span>
        </div>

        {/* Icon Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {displayedIcons.map((icon) => {
            const isActive = activeIcon?.id === icon.id;
            return (
              <div
                key={icon.id}
                onClick={() => handleIconSelect(icon)}
                className={`p-3 rounded-lg border-2 cursor-pointer transition-all flex flex-col items-center justify-between text-center group ${
                  isActive
                    ? 'bg-[#232435] border-[#4aedd9] shadow-lg scale-105'
                    : 'bg-[#151622] border-[#252636] hover:bg-[#1c1d2c] hover:border-[#3d3e54]'
                }`}
                title={icon.name}
              >
                {/* Image container */}
                <div className="w-12 h-12 flex items-center justify-center p-1 relative mb-2">
                  <img 
                    src={icon.file} 
                    alt={icon.name} 
                    className="w-10 h-10 object-contain group-hover:scale-110 transition-transform filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
                    style={{ imageRendering: 'pixelated' }}
                    loading="lazy"
                  />
                </div>

                <div className="w-full">
                  <span className="font-silkscreen text-[10px] text-zinc-200 block truncate leading-tight group-hover:text-emerald-400">
                    {icon.name}
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 block truncate mt-0.5">
                    {icon.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show More Pagination Button */}
        {!searchQuery && visibleCount < filteredIcons.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => {
                playClick();
                setVisibleCount(prev => prev + PAGE_SIZE);
              }}
              className="mc-btn mc-btn-green py-2.5 px-6 font-silkscreen text-xs inline-flex items-center gap-2"
            >
              <FolderDown className="w-4 h-4" />
              <span>LOAD MORE ICONS (+{Math.min(PAGE_SIZE, filteredIcons.length - visibleCount)})</span>
            </button>
            <button
              onClick={() => {
                playClick();
                setVisibleCount(filteredIcons.length);
              }}
              className="ml-3 mc-btn py-2.5 px-4 font-silkscreen text-xs text-zinc-400 hover:text-white"
            >
              SHOW ALL ({filteredIcons.length})
            </button>
          </div>
        )}

        {filteredIcons.length === 0 && (
          <div className="text-center py-16 bg-[#141520] rounded-lg border border-[#252636]">
            <p className="font-silkscreen text-zinc-400">NO ICONS FOUND</p>
            <p className="text-xs text-zinc-500 mt-1">Try searching for a tool, block, mineral, or mob name.</p>
          </div>
        )}

      </div>
    </section>
  );
}
