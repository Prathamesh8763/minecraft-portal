import React, { useState, useMemo } from 'react';
import { 
  SMITHING_TEMPLATES, 
  TRIM_MATERIALS, 
  ARMOR_BASE_SETS, 
  NETHERITE_UPGRADE_ITEMS, 
  SMITHING_ADVANCEMENTS 
} from '../data/minecraftSmithing';
import { 
  Hammer, 
  Sparkles, 
  Shield, 
  Search, 
  Award, 
  Layers, 
  Zap, 
  Check, 
  Copy, 
  Flame, 
  HelpCircle, 
  ArrowRight, 
  Crown, 
  Compass, 
  Palette, 
  FileCode, 
  ShieldCheck 
} from 'lucide-react';
import { playClick, playPop, playLevelUp, playAnvil } from '../utils/soundFX';
import confetti from 'canvas-confetti';

export default function SmithingTableExplorer() {
  const [activeTab, setActiveTab] = useState('trimming'); // 'trimming' | 'upgrading' | 'templates' | 'palettes' | 'advancements'
  
  // Trimming State
  const [selectedTemplate, setSelectedTemplate] = useState(SMITHING_TEMPLATES[3]); // Silence by default
  const [selectedArmorSet, setSelectedArmorSet] = useState(ARMOR_BASE_SETS[0]); // Netherite by default
  const [selectedPiece, setSelectedPiece] = useState('chestplate'); // helmet | chestplate | leggings | boots
  const [selectedMaterial, setSelectedMaterial] = useState(TRIM_MATERIALS[2]); // Diamond by default
  
  // Upgrading State
  const [selectedUpgrade, setSelectedUpgrade] = useState(NETHERITE_UPGRADE_ITEMS[1]); // Chestplate
  
  // Interactive UI state
  const [isForging, setIsForging] = useState(false);
  const [forgeCount, setForgeCount] = useState(0);
  const [templateSearch, setTemplateSearch] = useState('');
  const [styleCheckedTemplates, setStyleCheckedTemplates] = useState(['silence']);

  // Current piece info
  const currentPieceData = useMemo(() => {
    return selectedArmorSet.pieces[selectedPiece] || selectedArmorSet.pieces.chestplate;
  }, [selectedArmorSet, selectedPiece]);

  // Is matching material (triggers darker contrast palette)
  const isMatchingMaterial = useMemo(() => {
    return selectedArmorSet.material === selectedMaterial.id;
  }, [selectedArmorSet, selectedMaterial]);

  // Current active trim hex color
  const activeTrimColor = useMemo(() => {
    return isMatchingMaterial ? selectedMaterial.darkHex : selectedMaterial.hex;
  }, [isMatchingMaterial, selectedMaterial]);

  // Filter templates
  const filteredTemplates = useMemo(() => {
    const q = templateSearch.toLowerCase().trim();
    if (!q) return SMITHING_TEMPLATES;
    return SMITHING_TEMPLATES.filter(t => 
      t.name.toLowerCase().includes(q) ||
      t.source.toLowerCase().includes(q) ||
      t.desc.toLowerCase().includes(q) ||
      t.type.toLowerCase().includes(q)
    );
  }, [templateSearch]);

  // Trigger forge animation & sound
  const handleForge = () => {
    if (isForging) return;
    playAnvil();
    setIsForging(true);

    setTimeout(() => {
      setIsForging(false);
      playLevelUp();
      setForgeCount(prev => prev + 1);

      // Track for "Smithing with Style" advancement
      if (!styleCheckedTemplates.includes(selectedTemplate.id)) {
        setStyleCheckedTemplates(prev => [...prev, selectedTemplate.id]);
      }

      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.65 },
        colors: [selectedMaterial.hex, '#ffd700', '#ffffff', '#4aedd9']
      });
    }, 320);
  };

  return (
    <section id="smithing" className="py-20 bg-[#0d0e15] border-t-4 border-[#252535] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1e2030] border border-[#3f4363] text-[11px] font-silkscreen text-[#7e8cff]">
            <Hammer className="w-3.5 h-3.5 text-[#a2adff]" />
            <span>OFFICIAL MINECRAFT JAVA SMITHING TABLE</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            SMITHING, TRIMMING & UPGRADES
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Equip <strong className="text-indigo-400">18 Armor Trim Templates</strong> and <strong className="text-cyan-400">10 Mineral Palettes</strong>, forge diamond gear into indestructible <strong className="text-amber-400">Netherite</strong>, and unlock official smithing advancements.
          </p>
        </div>

        {/* Mode Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {[
            { id: 'trimming', label: 'Armor Trimming (1.2)', icon: Palette },
            { id: 'upgrading', label: 'Netherite Upgrades (1.1)', icon: Crown },
            { id: 'templates', label: '18 Trim Templates (1.2.1)', icon: Compass },
            { id: 'palettes', label: 'Color Palettes & Tooltips (1.2.3)', icon: FileCode },
            { id: 'advancements', label: 'Advancements & Style (2 & 3)', icon: Award }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { playClick(); setActiveTab(tab.id); }}
                className={`px-3.5 py-2 rounded text-xs font-silkscreen transition-all border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#3d426b] text-white border-[#7e8cff] shadow-lg scale-105'
                    : 'bg-[#151622] text-zinc-400 border-[#2b2c3d] hover:bg-[#1d1f2e] hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#7e8cff]' : 'text-zinc-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ============================================================== */}
        {/* TAB 1: ARMOR TRIMMING WORKBENCH & VISUAL RENDER */}
        {/* ============================================================== */}
        {activeTab === 'trimming' && (
          <div className="space-y-8">
            
            {/* Top Workspace Grid: Smithing Table on Left, Live Trim Render on Right */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Interactive Smithing Table GUI */}
              <div className="lg:col-span-7 mc-panel p-6 rounded-xl bg-[#181926] border-4 border-[#353648] shadow-2xl space-y-6">
                
                {/* Smithing Table Header */}
                <div className="flex items-center justify-between border-b-2 border-[#2b2c3e] pb-3">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src="/icons/minecraft/smithing_table.svg" 
                      alt="Smithing Table" 
                      className="w-6 h-6 object-contain" 
                      style={{ imageRendering: 'pixelated' }} 
                    />
                    <span className="font-silkscreen text-xs text-white font-bold">SMITHING TABLE (3-SLOT GUI)</span>
                  </div>
                  <span className="text-[10px] font-mono text-indigo-400 font-semibold">
                    1.20+ DECORATIVE REINFORCEMENT
                  </span>
                </div>

                {/* 3-Slot Minecraft Smithing Layout */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 py-4 bg-[#12131e] rounded-lg border border-[#232433] p-4">
                  
                  {/* Slot 1: Template Slot */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-silkscreen text-zinc-400 mb-1">SMITHING TEMPLATE</span>
                    <div className="w-16 h-16 rounded bg-[#161724] border-4 border-[#33354a] shadow-inner flex items-center justify-center p-2 relative group hover:border-indigo-500 transition-colors">
                      <img 
                        src={selectedTemplate.icon} 
                        alt={selectedTemplate.name} 
                        className="w-11 h-11 object-contain filter drop-shadow" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono text-zinc-400 bg-black/60 px-1 rounded">1</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-300 mt-1 max-w-[110px] truncate text-center">
                      {selectedTemplate.name.replace(' Smithing Template', '')}
                    </span>
                  </div>

                  {/* Plus Symbol */}
                  <span className="text-zinc-600 font-bold text-lg hidden sm:block">+</span>

                  {/* Slot 2: Armor Base Slot */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-silkscreen text-zinc-400 mb-1">ARMOR PIECE</span>
                    <div className="w-16 h-16 rounded bg-[#161724] border-4 border-[#33354a] shadow-inner flex items-center justify-center p-2 relative group hover:border-cyan-500 transition-colors">
                      <img 
                        src={currentPieceData.icon} 
                        alt={currentPieceData.name} 
                        className="w-11 h-11 object-contain filter drop-shadow" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono text-zinc-400 bg-black/60 px-1 rounded">1</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-300 mt-1 max-w-[110px] truncate text-center">
                      {currentPieceData.name}
                    </span>
                  </div>

                  {/* Plus Symbol */}
                  <span className="text-zinc-600 font-bold text-lg hidden sm:block">+</span>

                  {/* Slot 3: Ingot / Crystal Material Slot */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-silkscreen text-zinc-400 mb-1">INGOT / CRYSTAL</span>
                    <div className="w-16 h-16 rounded bg-[#161724] border-4 border-[#33354a] shadow-inner flex items-center justify-center p-2 relative group hover:border-yellow-500 transition-colors">
                      <img 
                        src={selectedMaterial.icon} 
                        alt={selectedMaterial.name} 
                        className="w-11 h-11 object-contain filter drop-shadow" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono text-zinc-400 bg-black/60 px-1 rounded">1</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-300 mt-1 max-w-[110px] truncate text-center">
                      {selectedMaterial.name}
                    </span>
                  </div>

                  {/* Arrow with Hammer Strike Animation */}
                  <div className="flex flex-col items-center justify-center px-1">
                    <Hammer className={`w-6 h-6 transition-transform ${isForging ? 'text-indigo-400 rotate-45 scale-125' : 'text-zinc-600'}`} />
                    <ArrowRight className="w-4 h-4 text-zinc-600 mt-1" />
                  </div>

                  {/* Output Slot: Resulting Trimmed Armor */}
                  <div className="flex flex-col items-center">
                    <span className="text-[9px] font-silkscreen text-[#7e8cff] mb-1">TRIMMED RESULT</span>
                    <div className="w-20 h-20 rounded-xl bg-[#161724] border-4 border-[#7e8cff] shadow-2xl flex items-center justify-center p-2 relative mc-enchant-glint">
                      <img 
                        src={currentPieceData.icon} 
                        alt="Trimmed Armor" 
                        className={`w-14 h-14 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] ${isForging ? 'scale-110' : ''}`} 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                      {/* Decorative Trim Corner Indicator */}
                      <div 
                        className="absolute top-1.5 right-1.5 w-3 h-3 rounded-full border border-black/80 shadow-md animate-pulse"
                        style={{ backgroundColor: activeTrimColor }}
                        title={`Trim Color: ${selectedMaterial.name}`}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300 font-bold mt-1 text-center max-w-[120px] truncate">
                      Trimmed {currentPieceData.name}
                    </span>
                  </div>

                </div>

                {/* Action Button: Forge & Hammer */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Cost: <strong className="text-white">1 Template + 1 Mineral + 0 EXP Levels</strong></span>
                  </div>

                  <button
                    onClick={handleForge}
                    disabled={isForging}
                    className={`py-2.5 px-6 font-silkscreen text-xs rounded transition-all flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto ${
                      isForging ? 'bg-indigo-600 text-white animate-pulse' : 'mc-btn mc-btn-green'
                    }`}
                  >
                    <Hammer className="w-4 h-4 text-amber-300" />
                    <span>{isForging ? 'STRIKING HAMMER...' : 'HAMMER & FORGE TRIM'}</span>
                  </button>
                </div>

                {/* Selectors Bar: Armor Set & Piece Picker */}
                <div className="space-y-3 pt-3 border-t border-[#292a3b]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-silkscreen text-zinc-400 text-[10px]">1. SELECT BASE ARMOR TIER:</span>
                    <span className="text-zinc-500 text-[10px]">{selectedArmorSet.name} ({selectedArmorSet.badge})</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {ARMOR_BASE_SETS.map((set) => {
                      const isSelected = selectedArmorSet.id === set.id;
                      return (
                        <button
                          key={set.id}
                          onClick={() => { playClick(); setSelectedArmorSet(set); }}
                          className={`px-2.5 py-1 rounded text-[11px] font-mono transition-all border ${
                            isSelected
                              ? 'bg-indigo-950 text-indigo-300 border-indigo-500 font-bold shadow'
                              : 'bg-[#141520] text-zinc-400 border-[#262738] hover:bg-[#1b1c2b] hover:text-white'
                          }`}
                        >
                          {set.name.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>

                  {/* Slot Piece Picker (Helmet / Chest / Legs / Boots) */}
                  <div className="flex items-center justify-between text-xs font-mono pt-2">
                    <span className="font-silkscreen text-zinc-400 text-[10px]">2. SELECT ARMOR SLOT:</span>
                    <span className="text-zinc-500 text-[10px]">Currently: {selectedPiece.toUpperCase()}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {['helmet', 'chestplate', 'leggings', 'boots'].map((slot) => {
                      const piece = selectedArmorSet.pieces[slot];
                      if (!piece) return null;
                      const isSelected = selectedPiece === slot;
                      return (
                        <button
                          key={slot}
                          onClick={() => { playClick(); setSelectedPiece(slot); }}
                          className={`p-2 rounded-lg border flex flex-col items-center gap-1 transition-all ${
                            isSelected
                              ? 'bg-indigo-950/80 border-indigo-500 shadow-md'
                              : 'bg-[#141520] border-[#262738] hover:bg-[#1b1c2b]'
                          }`}
                        >
                          <img 
                            src={piece.icon} 
                            alt={piece.name} 
                            className="w-6 h-6 object-contain" 
                            style={{ imageRendering: 'pixelated' }} 
                          />
                          <span className="font-silkscreen text-[9px] text-zinc-300 capitalize">{slot}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Trimming Material Picker (10 Materials) */}
                <div className="space-y-2 pt-3 border-t border-[#292a3b]">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-silkscreen text-zinc-400 text-[10px]">3. SELECT TRIM MATERIAL (1.2.2):</span>
                    <span className="text-[10px]" style={{ color: selectedMaterial.hex }}>
                      {selectedMaterial.name} ({selectedMaterial.tooltipColorName})
                    </span>
                  </div>
                  <div className="grid grid-cols-5 sm:grid-cols-10 gap-1.5">
                    {TRIM_MATERIALS.map((mat) => {
                      const isSelected = selectedMaterial.id === mat.id;
                      return (
                        <button
                          key={mat.id}
                          onClick={() => { playClick(); setSelectedMaterial(mat); }}
                          className={`p-1.5 rounded-lg border flex flex-col items-center justify-between transition-all group ${
                            isSelected
                              ? 'bg-[#252840] border-[#7e8cff] shadow-md scale-105'
                              : 'bg-[#13141f] border-[#232433] hover:bg-[#1b1d2c]'
                          }`}
                          title={`${mat.name} (${mat.tooltipCode})`}
                        >
                          <img 
                            src={mat.icon} 
                            alt={mat.name} 
                            className="w-6 h-6 object-contain group-hover:scale-110 transition-transform" 
                            style={{ imageRendering: 'pixelated' }} 
                          />
                          <div 
                            className="w-full h-1 rounded mt-1 shadow-sm"
                            style={{ backgroundColor: mat.hex }}
                          />
                        </button>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Right Column: 1.2.5 Armor Trim Render & Tooltip Preview */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* 1.2.5 Visual Render Display Box */}
                <div className="mc-panel p-6 rounded-xl bg-[#161725] border-4 border-[#353648] shadow-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-[#292a3c] pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="font-silkscreen text-xs text-white font-bold">1.2.5 ARMOR TRIM RENDER</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">LIVE PREVIEW</span>
                  </div>

                  {/* Stylized Mannequin / Trim Model Card */}
                  <div className="h-64 rounded-xl bg-gradient-to-b from-[#0f1019] to-[#0a0a10] border-2 border-[#2b2c3e] relative flex items-center justify-center overflow-hidden p-6 shadow-inner">
                    
                    {/* Background Runic Aura */}
                    <div 
                      className="absolute inset-0 opacity-15 blur-2xl transition-all duration-500 pointer-events-none"
                      style={{ backgroundColor: activeTrimColor }}
                    />

                    {/* Armor Model Representation */}
                    <div className="flex flex-col items-center gap-2 relative z-10">
                      
                      {/* Helmet Layer */}
                      <div className={`relative p-2 rounded-lg border-2 transition-all duration-300 ${
                        selectedPiece === 'helmet' ? 'scale-110 shadow-lg border-white' : 'border-transparent opacity-85'
                      }`} style={{ backgroundColor: selectedArmorSet.color + '40' }}>
                        <img 
                          src={selectedArmorSet.pieces.helmet?.icon || '/icons/minecraft/netherite_helmet.svg'} 
                          alt="Helmet" 
                          className="w-14 h-14 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                          style={{ imageRendering: 'pixelated' }} 
                        />
                        {/* Trim Overlay Accent */}
                        <div 
                          className="absolute inset-x-2 bottom-2 h-1.5 rounded-sm shadow-sm transition-all duration-300"
                          style={{ backgroundColor: activeTrimColor }}
                        />
                      </div>

                      {/* Chestplate Layer */}
                      <div className={`relative p-2 rounded-lg border-2 transition-all duration-300 ${
                        selectedPiece === 'chestplate' ? 'scale-110 shadow-lg border-white' : 'border-transparent opacity-85'
                      }`} style={{ backgroundColor: selectedArmorSet.color + '40' }}>
                        <img 
                          src={selectedArmorSet.pieces.chestplate?.icon || '/icons/minecraft/netherite_chestplate.svg'} 
                          alt="Chestplate" 
                          className="w-16 h-16 object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                          style={{ imageRendering: 'pixelated' }} 
                        />
                        {/* Trim Pattern Emblem Overlay */}
                        <div 
                          className="absolute inset-x-3 top-3 h-1 rounded-sm shadow-sm transition-all duration-300"
                          style={{ backgroundColor: activeTrimColor }}
                        />
                        <div 
                          className="absolute inset-x-5 top-5 h-2 rounded-sm shadow-sm transition-all duration-300"
                          style={{ backgroundColor: activeTrimColor }}
                        />
                      </div>

                      {/* Leggings & Boots Row */}
                      <div className="flex items-center gap-3">
                        {/* Leggings */}
                        <div className={`relative p-1.5 rounded-lg border-2 transition-all duration-300 ${
                          selectedPiece === 'leggings' ? 'scale-110 shadow-lg border-white' : 'border-transparent opacity-85'
                        }`} style={{ backgroundColor: selectedArmorSet.color + '40' }}>
                          <img 
                            src={selectedArmorSet.pieces.leggings?.icon || '/icons/minecraft/netherite_leggings.svg'} 
                            alt="Leggings" 
                            className="w-10 h-10 object-contain filter drop-shadow"
                            style={{ imageRendering: 'pixelated' }} 
                          />
                          <div 
                            className="absolute inset-x-2 bottom-1.5 h-1 rounded-sm shadow-sm"
                            style={{ backgroundColor: activeTrimColor }}
                          />
                        </div>

                        {/* Boots */}
                        <div className={`relative p-1.5 rounded-lg border-2 transition-all duration-300 ${
                          selectedPiece === 'boots' ? 'scale-110 shadow-lg border-white' : 'border-transparent opacity-85'
                        }`} style={{ backgroundColor: selectedArmorSet.color + '40' }}>
                          <img 
                            src={selectedArmorSet.pieces.boots?.icon || '/icons/minecraft/netherite_boots.svg'} 
                            alt="Boots" 
                            className="w-10 h-10 object-contain filter drop-shadow"
                            style={{ imageRendering: 'pixelated' }} 
                          />
                          <div 
                            className="absolute inset-x-1.5 bottom-1 h-1 rounded-sm shadow-sm"
                            style={{ backgroundColor: activeTrimColor }}
                          />
                        </div>
                      </div>

                    </div>

                    {/* Bottom Status Tag */}
                    <div className="absolute bottom-2 inset-x-4 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                      <span>Pattern: <strong className="text-white">{selectedTemplate.name.replace(' Armor Trim', '')}</strong></span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTrimColor }} />
                        <span style={{ color: selectedMaterial.hex }}>{selectedMaterial.name}</span>
                      </span>
                    </div>

                  </div>

                  {/* 1.2.4 In-Game Tooltip Preview Box */}
                  <div className="p-4 rounded-lg bg-[#100720] border-2 border-[#2c134d] font-mono shadow-2xl relative">
                    <div className="text-[10px] text-zinc-500 font-silkscreen mb-1 flex items-center justify-between">
                      <span>1.2.4 IN-GAME TOOLTIP HOVER (MINECRAFT PARITY)</span>
                      <span className="text-zinc-600">FORMATTING: {selectedMaterial.tooltipCode}</span>
                    </div>
                    
                    {/* Item Name in Cyan / Aqua */}
                    <div className="text-sm font-bold text-[#55ffff]">
                      {currentPieceData.name}
                    </div>

                    {/* Upgrade / Trim Tooltip Lines */}
                    <div className="text-xs text-zinc-400 mt-1">
                      Upgrade:
                    </div>
                    <div className="text-xs text-[#aaaaaa] pl-2">
                      {selectedTemplate.name}
                    </div>
                    <div className="text-xs text-zinc-400 mt-0.5">
                      Trim:
                    </div>
                    <div className="text-xs font-bold pl-2" style={{ color: selectedMaterial.tooltipColorHex }}>
                      {selectedMaterial.name} Material
                    </div>

                    {/* Armor Stats */}
                    <div className="text-[11px] text-[#5555ff] mt-2 pt-2 border-t border-[#291740] space-y-0.5">
                      <div>+{currentPieceData.armor} Armor</div>
                      {currentPieceData.toughness > 0 && <div>+{currentPieceData.toughness} Armor Toughness</div>}
                      {currentPieceData.kb > 0 && <div>+{currentPieceData.kb * 10}% Knockback Resistance</div>}
                    </div>
                  </div>

                  {/* Contrast Palette Rule Box */}
                  {isMatchingMaterial && (
                    <div className="p-2.5 rounded bg-amber-950/30 border border-amber-800/60 text-amber-300 text-[11px] font-mono flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 shrink-0 text-amber-400" />
                      <span>
                        <strong>Darker Palette Active:</strong> In Minecraft, when applying a trim of the exact same material as the armor, a high-contrast darker palette (<code className="text-white">{selectedMaterial.darkHex}</code>) is automatically rendered so the pattern stays visible!
                      </span>
                    </div>
                  )}

                </div>

              </div>

            </div>

            {/* Quick Template Selector Carousel */}
            <div className="mc-panel p-5 rounded-xl bg-[#161724] border-4 border-[#33354a] shadow-xl">
              <div className="flex items-center justify-between mb-3 border-b border-[#292a3c] pb-2">
                <span className="font-silkscreen text-xs text-white">SELECT ARMOR TRIM TEMPLATE (18 DISCOVERABLE IN JAVA):</span>
                <span className="text-[10px] font-mono text-zinc-500">CLICK TO APPLY TO BENCH</span>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-9 gap-2">
                {SMITHING_TEMPLATES.filter(t => t.type === 'Trim').map((tmpl) => {
                  const isSelected = selectedTemplate.id === tmpl.id;
                  return (
                    <button
                      key={tmpl.id}
                      onClick={() => { playClick(); setSelectedTemplate(tmpl); }}
                      className={`p-2 rounded-lg border flex flex-col items-center justify-between text-center transition-all group ${
                        isSelected
                          ? 'bg-indigo-950 border-indigo-500 shadow-md scale-105'
                          : 'bg-[#12131d] border-[#222332] hover:bg-[#1a1b28] hover:border-[#38394e]'
                      }`}
                      title={`${tmpl.name} (${tmpl.source})`}
                    >
                      <img 
                        src={tmpl.icon} 
                        alt={tmpl.name} 
                        className="w-8 h-8 object-contain group-hover:scale-110 transition-transform mb-1" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                      <span className="font-silkscreen text-[9px] text-zinc-200 block truncate w-full">
                        {tmpl.name.replace(' Armor Trim', '')}
                      </span>
                      <span className="text-[8px] font-mono text-zinc-500 block truncate w-full">
                        {tmpl.version.includes('1.21') ? '1.21 Trials' : '1.20'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: NETHERITE UPGRADING (1.1, 1.1.1, 1.1.2) */}
        {/* ============================================================== */}
        {activeTab === 'upgrading' && (
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Upgrade Banner */}
            <div className="p-5 rounded-xl bg-gradient-to-r from-[#211b15] via-[#2d2218] to-[#1a1410] border-2 border-[#b06f28] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-[#14100c] border-2 border-[#b06f28] flex items-center justify-center p-2 shrink-0">
                  <img 
                    src="/icons/minecraft/netherite_upgrade_smithing_template.svg" 
                    alt="Netherite Upgrade" 
                    className="w-10 h-10 object-contain"
                    style={{ imageRendering: 'pixelated' }}
                  />
                </div>
                <div>
                  <h3 className="font-silkscreen text-base text-amber-300 font-bold">
                    1.1 UPGRADING (NETHERITE TIER)
                  </h3>
                  <p className="text-xs text-zinc-300 font-mono mt-0.5">
                    Combine Diamond gear + Netherite Upgrade Template + 1 Netherite Ingot in a Smithing Table. Retains all enchantments, repair costs, and custom names!
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-black/60 text-amber-400 border border-amber-600/50">
                  LAVA-PROOF (FLOATS)
                </span>
              </div>
            </div>

            {/* Upgrade GUI & Stats Card */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Left Column: Select Item to Upgrade */}
              <div className="md:col-span-5 mc-panel p-5 rounded-xl bg-[#171822] border-4 border-[#353648] shadow-xl flex flex-col h-[520px]">
                <div className="flex items-center justify-between border-b border-[#292a3c] pb-3 mb-3">
                  <span className="font-silkscreen text-xs text-white">UPGRADE CANDIDATES:</span>
                  <span className="text-[10px] font-mono text-amber-400">9 RECIPES</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {NETHERITE_UPGRADE_ITEMS.map((item) => {
                    const isSelected = selectedUpgrade.id === item.id;
                    return (
                      <div
                        key={item.id}
                        onClick={() => { playClick(); setSelectedUpgrade(item); }}
                        className={`p-2.5 rounded-lg border-2 cursor-pointer transition-all flex items-center justify-between ${
                          isSelected
                            ? 'bg-[#332412] border-[#b06f28] shadow-md'
                            : 'bg-[#12131c] border-[#222332] hover:bg-[#1a1b28]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={item.base.icon} 
                            alt={item.base.name} 
                            className="w-7 h-7 object-contain" 
                            style={{ imageRendering: 'pixelated' }} 
                          />
                          <ArrowRight className="w-3 h-3 text-zinc-600" />
                          <img 
                            src={item.result.icon} 
                            alt={item.result.name} 
                            className="w-7 h-7 object-contain" 
                            style={{ imageRendering: 'pixelated' }} 
                          />
                          <div>
                            <span className="font-silkscreen text-xs text-white block">
                              {item.result.name}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-400">
                              {item.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Column: Detailed 1.1.1 & 1.1.2 Stats Breakdown */}
              <div className="md:col-span-7 mc-panel p-6 rounded-xl bg-[#171822] border-4 border-[#353648] shadow-xl space-y-6">
                
                {/* 3-Slot Visual Smithing Flow */}
                <div className="p-4 rounded-xl bg-[#11121b] border-2 border-[#2b2c3e] flex items-center justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded bg-[#181926] border-2 border-zinc-700 p-2 flex items-center justify-center">
                      <img 
                        src="/icons/minecraft/netherite_upgrade_smithing_template.svg" 
                        alt="Template" 
                        className="w-9 h-9 object-contain" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 mt-1">Upgrade Template</span>
                  </div>

                  <span className="text-zinc-600 font-bold">+</span>

                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded bg-[#181926] border-2 border-cyan-700 p-2 flex items-center justify-center">
                      <img 
                        src={selectedUpgrade.base.icon} 
                        alt="Base" 
                        className="w-9 h-9 object-contain" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 mt-1">{selectedUpgrade.base.name}</span>
                  </div>

                  <span className="text-zinc-600 font-bold">+</span>

                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 rounded bg-[#181926] border-2 border-amber-700 p-2 flex items-center justify-center">
                      <img 
                        src="/icons/minecraft/netherite_ingot.svg" 
                        alt="Netherite Ingot" 
                        className="w-9 h-9 object-contain" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 mt-1">Netherite Ingot</span>
                  </div>

                  <ArrowRight className="w-4 h-4 text-amber-400" />

                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-xl bg-[#26180a] border-2 border-amber-500 p-2 flex items-center justify-center mc-enchant-glint">
                      <img 
                        src={selectedUpgrade.result.icon} 
                        alt="Result" 
                        className="w-11 h-11 object-contain" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                    </div>
                    <span className="text-[9px] font-silkscreen text-amber-300 font-bold mt-1">FORGED RESULT</span>
                  </div>
                </div>

                {/* Stat Changes Comparison */}
                <div className="space-y-3">
                  <span className="font-silkscreen text-xs text-white block">
                    {selectedUpgrade.type === 'Armor' ? '1.1.1 ARMOR UPGRADE STATS:' : '1.1.2 TOOL UPGRADE STATS:'}
                  </span>

                  <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-[#12131c] border border-[#232433]">
                      <span className="text-zinc-500 text-[10px] block">DURABILITY INCREASE</span>
                      <strong className="text-emerald-400">{selectedUpgrade.statsDiff.durability}</strong>
                    </div>

                    {selectedUpgrade.statsDiff.armor && (
                      <div className="p-3 rounded-lg bg-[#12131c] border border-[#232433]">
                        <span className="text-zinc-500 text-[10px] block">ARMOR POINTS</span>
                        <strong className="text-white">{selectedUpgrade.statsDiff.armor}</strong>
                      </div>
                    )}

                    {selectedUpgrade.statsDiff.toughness && (
                      <div className="p-3 rounded-lg bg-[#12131c] border border-[#232433]">
                        <span className="text-zinc-500 text-[10px] block">ARMOR TOUGHNESS</span>
                        <strong className="text-cyan-400">{selectedUpgrade.statsDiff.toughness}</strong>
                      </div>
                    )}

                    {selectedUpgrade.statsDiff.knockback && (
                      <div className="p-3 rounded-lg bg-[#12131c] border border-[#232433]">
                        <span className="text-zinc-500 text-[10px] block">KNOCKBACK RESIST</span>
                        <strong className="text-amber-400">{selectedUpgrade.statsDiff.knockback}</strong>
                      </div>
                    )}

                    {selectedUpgrade.statsDiff.damage && (
                      <div className="p-3 rounded-lg bg-[#12131c] border border-[#232433]">
                        <span className="text-zinc-500 text-[10px] block">ATTACK DAMAGE</span>
                        <strong className="text-red-400">{selectedUpgrade.statsDiff.damage}</strong>
                      </div>
                    )}

                    {selectedUpgrade.statsDiff.miningSpeed && (
                      <div className="p-3 rounded-lg bg-[#12131c] border border-[#232433]">
                        <span className="text-zinc-500 text-[10px] block">MINING MULTIPLIER</span>
                        <strong className="text-yellow-400">{selectedUpgrade.statsDiff.miningSpeed}</strong>
                      </div>
                    )}
                  </div>

                  {/* Special Perk Callout */}
                  <div className="p-3.5 rounded-lg bg-[#241a12] border border-[#b06f28] text-xs font-mono text-amber-200">
                    <strong>Special Perk: </strong>
                    <span>{selectedUpgrade.statsDiff.perks}</span>
                  </div>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: 18 TRIM TEMPLATES & DUPLICATION GUIDE (1.2.1) */}
        {/* ============================================================== */}
        {activeTab === 'templates' && (
          <div className="space-y-6">
            
            {/* Search & Duplication Explainer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search template, structure, or biome..."
                  value={templateSearch}
                  onChange={(e) => setTemplateSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#141520] border-2 border-[#2b2c3e] rounded text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
                <span className="font-silkscreen text-[11px] text-amber-400">DUPLICATION RULE:</span>
                <span>1 Template + 7 Diamonds + 1 Target Block = 2 Templates</span>
              </div>
            </div>

            {/* Templates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <div 
                  key={template.id}
                  className="mc-panel p-5 rounded-xl bg-[#161725] border-2 border-[#2b2c3e] hover:border-indigo-500 transition-all space-y-3"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-lg bg-[#10111a] border-2 border-[#26283b] p-2 flex items-center justify-center shrink-0">
                      <img 
                        src={template.icon} 
                        alt={template.name} 
                        className="w-9 h-9 object-contain" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-silkscreen text-xs text-white font-bold">{template.name}</span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-semibold ${
                          template.type === 'Upgrade' ? 'bg-amber-950 text-amber-300' : 'bg-indigo-950 text-indigo-300'
                        }`}>
                          {template.version}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400 block mt-0.5">
                        Found in: <strong className="text-zinc-200">{template.source}</strong>
                      </span>
                      <span className="text-[10px] font-mono text-amber-400 block">
                        Rarity: {template.rarity}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-mono text-zinc-300 border-t border-[#232433] pt-2">
                    {template.desc}
                  </p>

                  {/* Duplication Recipe Box */}
                  <div className="pt-2 border-t border-[#232433] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-zinc-500">Cloning Block:</span>
                    <div className="flex items-center gap-1.5">
                      <img 
                        src={template.duplicationBlock.icon} 
                        alt={template.duplicationBlock.name} 
                        className="w-4 h-4 object-contain" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                      <strong className="text-cyan-400">{template.duplicationBlock.name}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: COLOR PALETTES & TOOLTIP COLORS (1.2.3 & 1.2.4) */}
        {/* ============================================================== */}
        {activeTab === 'palettes' && (
          <div className="max-w-5xl mx-auto space-y-6">
            
            <div className="text-center max-w-2xl mx-auto space-y-2 mb-6">
              <h3 className="font-silkscreen text-lg text-white">
                1.2.3 & 1.2.4 MATERIAL PALETTES & TOOLTIP CODES
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Official canonical hex color swatches, darker contrast overrides (for identical armor materials), and in-game formatting color codes.
              </p>
            </div>

            {/* Palettes Table */}
            <div className="mc-panel overflow-hidden rounded-xl bg-[#161724] border-4 border-[#353648] shadow-2xl">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-[#1e2030] text-[10px] font-silkscreen text-zinc-300 border-b border-[#2b2c3e]">
                  <tr>
                    <th className="p-3.5">MATERIAL (1.2.2)</th>
                    <th className="p-3.5">SWATCH</th>
                    <th className="p-3.5">PRIMARY HEX</th>
                    <th className="p-3.5">DARKER CONTRAST HEX</th>
                    <th className="p-3.5">FORMAT CODE (1.2.4)</th>
                    <th className="p-3.5">TOOLTIP TEXT COLOR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232433]">
                  {TRIM_MATERIALS.map((mat) => (
                    <tr key={mat.id} className="hover:bg-[#1a1b2a] transition-colors">
                      <td className="p-3.5 flex items-center gap-2.5">
                        <img 
                          src={mat.icon} 
                          alt={mat.name} 
                          className="w-6 h-6 object-contain" 
                          style={{ imageRendering: 'pixelated' }} 
                        />
                        <strong className="text-white">{mat.name}</strong>
                      </td>
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5">
                          <div 
                            className="w-5 h-5 rounded border border-black/80 shadow" 
                            style={{ backgroundColor: mat.hex }} 
                            title={`Primary: ${mat.hex}`}
                          />
                          <div 
                            className="w-5 h-5 rounded border border-black/80 shadow" 
                            style={{ backgroundColor: mat.darkHex }} 
                            title={`Contrast: ${mat.darkHex}`}
                          />
                        </div>
                      </td>
                      <td className="p-3.5">
                        <code className="text-[#4aedd9] bg-black/40 px-1.5 py-0.5 rounded">{mat.hex}</code>
                      </td>
                      <td className="p-3.5">
                        <code className="text-zinc-400 bg-black/40 px-1.5 py-0.5 rounded">{mat.darkHex}</code>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold text-white bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
                          {mat.tooltipCode}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className="font-bold" style={{ color: mat.tooltipColorHex }}>
                          {mat.tooltipColorName} ({mat.name})
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: ACHIEVEMENTS & ADVANCEMENTS (2 & 3) */}
        {/* ============================================================== */}
        {activeTab === 'advancements' && (
          <div className="max-w-4xl mx-auto space-y-8">
            
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h3 className="font-pixel text-2xl text-white">
                SMITHING ACHIEVEMENTS & ADVANCEMENTS
              </h3>
              <p className="text-xs font-mono text-zinc-400">
                Official Java Edition achievements and challenges unlocked through the Smithing Table.
              </p>
            </div>

            {/* Advancements Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SMITHING_ADVANCEMENTS.map((adv) => (
                <div 
                  key={adv.id}
                  className="mc-panel p-5 rounded-xl bg-[#171825] border-2 border-[#33354a] shadow-xl space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-[#10111a] border-2 border-amber-600/60 p-2 flex items-center justify-center shrink-0 mc-enchant-glint">
                      <img 
                        src={adv.icon} 
                        alt={adv.title} 
                        className="w-10 h-10 object-contain" 
                        style={{ imageRendering: 'pixelated' }} 
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-silkscreen text-sm text-white font-bold">{adv.title}</h4>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-400 border border-amber-800">
                          {adv.category}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-400 block mt-0.5">
                        Type: <strong className="text-yellow-400">{adv.type}</strong>
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 font-semibold">
                        Reward: {adv.xp}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs font-mono text-zinc-300 pt-2 border-t border-[#232433]">
                    {adv.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* "Smithing with Style" Challenge Interactive Tracker */}
            <div className="mc-panel p-6 rounded-xl bg-[#191a2a] border-4 border-[#3e4266] shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-[#2c304d] pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="font-silkscreen text-xs text-white font-bold">
                    "SMITHING WITH STYLE" 8-TEMPLATE CHALLENGE TRACKER
                  </span>
                </div>
                <span className="text-xs font-mono text-yellow-400 font-bold">
                  {styleCheckedTemplates.filter(t => ['spire', 'snout', 'rib', 'ward', 'silence', 'vex', 'tide', 'wayfinder'].includes(t)).length} / 8 COMPLETED
                </span>
              </div>

              <p className="text-xs font-mono text-zinc-300">
                To earn this prestigious advancement and 150 EXP, apply each of these 8 rare world templates at least once at a smithing table:
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                {[
                  { id: 'spire', name: 'Spire', loc: 'End City' },
                  { id: 'snout', name: 'Snout', loc: 'Bastion' },
                  { id: 'rib', name: 'Rib', loc: 'Nether Fortress' },
                  { id: 'ward', name: 'Ward', loc: 'Ancient City' },
                  { id: 'silence', name: 'Silence', loc: 'Ancient City' },
                  { id: 'vex', name: 'Vex', loc: 'Woodland Mansion' },
                  { id: 'tide', name: 'Tide', loc: 'Ocean Monument' },
                  { id: 'wayfinder', name: 'Wayfinder', loc: 'Trail Ruins' }
                ].map((item) => {
                  const isChecked = styleCheckedTemplates.includes(item.id);
                  return (
                    <div 
                      key={item.id}
                      onClick={() => {
                        playClick();
                        setStyleCheckedTemplates(prev => 
                          prev.includes(item.id) ? prev.filter(x => x !== item.id) : [...prev, item.id]
                        );
                      }}
                      className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                        isChecked 
                          ? 'bg-emerald-950/60 border-emerald-500 shadow' 
                          : 'bg-[#12131e] border-[#25263a] hover:bg-[#181926]'
                      }`}
                    >
                      <div>
                        <span className={`font-silkscreen text-[11px] block ${isChecked ? 'text-emerald-300' : 'text-zinc-300'}`}>
                          {item.name}
                        </span>
                        <span className="text-[9px] font-mono text-zinc-500">{item.loc}</span>
                      </div>
                      {isChecked ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <div className="w-4 h-4 rounded border border-zinc-600" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
