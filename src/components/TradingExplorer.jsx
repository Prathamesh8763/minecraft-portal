import React, { useState, useMemo } from 'react';
import { 
  VILLAGER_PROFESSIONS, 
  VILLAGER_TIERS, 
  NON_TRADING_VILLAGERS, 
  WANDERING_TRADER_DATA, 
  BIOME_CLOTHING_VARIANTS, 
  TRADING_ADVANCEMENTS 
} from '../data/minecraftTrading';
import { 
  Coins, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Flame, 
  BookOpen, 
  Award, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  CheckCircle2, 
  Compass, 
  Heart, 
  Info, 
  ShoppingBag, 
  Users, 
  Sun, 
  Moon, 
  ArrowRight,
  Zap,
  Tag
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import confetti from 'canvas-confetti';

export default function TradingExplorer() {
  const [activeTab, setActiveTab] = useState('simulator'); // 'simulator' | 'professions' | 'mechanics' | 'nontrading' | 'wandering' | 'advancements'
  const [selectedProfessionId, setSelectedProfessionId] = useState(VILLAGER_PROFESSIONS[0].id);
  const [selectedTierLevel, setSelectedTierLevel] = useState(1);
  const [heroDiscountLevel, setHeroDiscountLevel] = useState(0); // 0 to 5
  const [isZombieCured, setIsZombieCured] = useState(false);
  
  // Simulated Player Inventory / Wallet
  const [playerEmeralds, setPlayerEmeralds] = useState(64);
  const [playerTradedCount, setPlayerTradedCount] = useState(0);
  const [villagerXp, setVillagerXp] = useState(0);

  // Active profession object
  const currentProfession = useMemo(() => {
    return VILLAGER_PROFESSIONS.find(p => p.id === selectedProfessionId) || VILLAGER_PROFESSIONS[0];
  }, [selectedProfessionId]);

  // Current tier object
  const currentTier = useMemo(() => {
    return VILLAGER_TIERS.find(t => t.level === selectedTierLevel) || VILLAGER_TIERS[0];
  }, [selectedTierLevel]);

  // Trades available for current profession & tier
  const activeTrades = useMemo(() => {
    return currentProfession.trades.filter(t => t.tier === selectedTierLevel);
  }, [currentProfession, selectedTierLevel]);

  // Calculate dynamic discounted emerald price
  const calculatePrice = (baseCost) => {
    if (baseCost <= 1) return 1;
    let discount = 0;
    
    // Hero of the Village: Tier I gives ~20%, Tier V gives ~50%
    if (heroDiscountLevel > 0) {
      discount += Math.floor(baseCost * (0.15 + heroDiscountLevel * 0.08));
    }

    // Zombie Cured bonus: massive flat reduction
    if (isZombieCured) {
      discount += Math.min(20, Math.floor(baseCost * 0.4) + 3);
    }

    return Math.max(1, baseCost - discount);
  };

  // Execute trade simulation
  const handleExecuteTrade = (trade) => {
    playPop();
    const isEmeraldInput = trade.inputs.some(i => i.id === 'emerald');
    const emeraldInput = trade.inputs.find(i => i.id === 'emerald');
    const actualCost = emeraldInput ? calculatePrice(emeraldInput.count) : 0;

    if (isEmeraldInput && playerEmeralds < actualCost) {
      playClick();
      return;
    }

    if (isEmeraldInput) {
      setPlayerEmeralds(prev => prev - actualCost);
    } else if (trade.output.id === 'emerald') {
      setPlayerEmeralds(prev => prev + trade.output.count);
    }

    setPlayerTradedCount(prev => prev + 1);
    setVillagerXp(prev => {
      const nextXp = prev + (trade.xp || 5);
      // Auto-level up if XP crosses tier boundary
      if (nextXp >= 250 && selectedTierLevel < 5) {
        setSelectedTierLevel(5);
        playLevelUp();
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } else if (nextXp >= 150 && selectedTierLevel < 4) {
        setSelectedTierLevel(4);
      } else if (nextXp >= 70 && selectedTierLevel < 3) {
        setSelectedTierLevel(3);
      } else if (nextXp >= 10 && selectedTierLevel < 2) {
        setSelectedTierLevel(2);
      }
      return nextXp;
    });
  };

  // Helper to render icon
  const renderItemIcon = (id, sizeClass = "w-8 h-8") => {
    return (
      <img
        src={`/icons/minecraft/${id}.svg`}
        alt={id}
        className={`${sizeClass} object-contain filter drop-shadow`}
        style={{ imageRendering: 'pixelated' }}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/icons/minecraft/emerald.svg';
        }}
      />
    );
  };

  return (
    <section id="trading" className="py-20 bg-[#0d0e15] border-t-4 border-[#252535] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#1b2816] border border-[#3b6320] text-[11px] font-silkscreen text-[#84e036]">
            <Coins className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
            <span>OFFICIAL VILLAGER MARKETPLACE & WORKSTATIONS</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            VILLAGER TRADING & MARKET ECONOMY
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Master the village emerald economy across all <strong className="text-emerald-400">13 profession workstations</strong>, level progression from Novice to Master, Hero of the Village discounts, and Wandering Trader transactions.
          </p>
        </div>

        {/* Navigation Mode Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'simulator', label: 'Trade Simulator (GUI)', icon: ShoppingBag },
            { id: 'professions', label: '13 Professions Catalog', icon: Users },
            { id: 'mechanics', label: 'Market Mechanics & Discounts (1.1-1.3)', icon: TrendingUp },
            { id: 'nontrading', label: 'Nitwit & Unemployed (2.1-2.3)', icon: AlertCircle },
            { id: 'wandering', label: 'Wandering Trader (4)', icon: Compass },
            { id: 'advancements', label: 'Advancements & Biomes (5-7)', icon: Award }
          ].map((tab) => {
            const isSelected = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => { playClick(); setActiveTab(tab.id); }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded text-xs font-silkscreen transition-all border ${
                  isSelected
                    ? 'bg-[#5c8e32] text-white border-[#89c44e] shadow-lg scale-105'
                    : 'bg-[#151622] text-zinc-400 border-[#2b2c3d] hover:bg-[#1d1f2e] hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-emerald-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: INTERACTIVE TRADE SIMULATOR GUI */}
        {activeTab === 'simulator' && (
          <div className="space-y-8 animate-fadeIn">
            
            {/* Top Profession Selection Carousel */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {VILLAGER_PROFESSIONS.map((prof) => {
                const isSelected = selectedProfessionId === prof.id;
                return (
                  <button
                    key={prof.id}
                    onClick={() => { playClick(); setSelectedProfessionId(prof.id); }}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 shrink-0 transition-all ${
                      isSelected
                        ? 'bg-[#222436] text-white border-emerald-400 shadow-lg scale-105'
                        : 'bg-[#151620] text-zinc-400 border-[#2a2c3d] hover:bg-[#1c1e2b] hover:text-white'
                    }`}
                  >
                    {renderItemIcon(prof.workstationId, "w-5 h-5")}
                    <span className="font-silkscreen text-xs">{prof.name}</span>
                  </button>
                );
              })}
            </div>

            {/* In-Game Style Villager Trading GUI Interface */}
            <div className="max-w-4xl mx-auto mc-panel p-6 sm:p-8 rounded-xl bg-[#1e1f2b] border-4 border-[#3b3d52] shadow-2xl space-y-6">
              
              {/* GUI Header & Villager Belt Badge */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b-2 border-[#2c2d3f] pb-4">
                
                <div className="flex items-center gap-4">
                  {/* Workstation Avatar */}
                  <div className="w-14 h-14 rounded-lg bg-[#141520] border-2 border-emerald-500/60 p-2 flex items-center justify-center shrink-0 shadow-inner">
                    {renderItemIcon(currentProfession.workstationId, "w-10 h-10")}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-pixel text-base text-white">{currentProfession.name}</h3>
                      <span className="font-silkscreen text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-700 font-bold">
                        {currentProfession.workstation}
                      </span>
                    </div>
                    <p className="text-xs font-mono text-zinc-400 mt-1">
                      {currentProfession.role}
                    </p>
                  </div>
                </div>

                {/* Player Emerald Wallet & Traded Counter */}
                <div className="flex items-center gap-4 bg-[#141520] px-4 py-2 rounded-lg border border-[#2b2c3e]">
                  <div className="flex items-center gap-1.5" title="Simulated Emerald Pouch">
                    {renderItemIcon('emerald', "w-5 h-5")}
                    <span className="font-pixel text-xs text-emerald-400">{playerEmeralds}</span>
                    <span className="text-[10px] font-mono text-zinc-500">EMERALDS</span>
                  </div>
                  <div className="h-4 w-[1px] bg-zinc-700"></div>
                  <span className="text-[10px] font-mono text-zinc-400">
                    TRADES: <strong className="text-white">{playerTradedCount}</strong>
                  </span>
                </div>

              </div>

              {/* Career Tier Progression & XP Bar */}
              <div className="space-y-2 bg-[#141520] p-4 rounded-lg border border-[#2b2c3e]">
                <div className="flex items-center justify-between text-xs font-silkscreen">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-400">CAREER TIER:</span>
                    <span className="text-white font-bold" style={{ color: currentTier.color }}>
                      {currentTier.name} ({currentTier.badge} Badge {currentTier.badgeIcon})
                    </span>
                  </div>
                  <span className="font-mono text-emerald-400">
                    {villagerXp} / 250 TOTAL XP
                  </span>
                </div>

                {/* Villager Career XP Progress Bar (Novice -> Master) */}
                <div className="w-full h-3 bg-[#0a0b10] rounded-full overflow-hidden border border-[#232433] relative">
                  <div 
                    className="h-full bg-gradient-to-r from-[#10b981] via-[#38bdf8] to-[#f59e0b] transition-all duration-300"
                    style={{ width: `${Math.min(100, (villagerXp / 250) * 100)}%` }}
                  />
                </div>

                {/* Tier Selector Buttons */}
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {VILLAGER_TIERS.map((tier) => {
                    const isSelected = selectedTierLevel === tier.level;
                    return (
                      <button
                        key={tier.level}
                        onClick={() => { playClick(); setSelectedTierLevel(tier.level); }}
                        className={`py-1.5 px-1 rounded text-center text-[10px] font-silkscreen transition-all border ${
                          isSelected
                            ? 'bg-[#292c3f] text-white border-cyan-400 shadow font-bold'
                            : 'bg-[#101118] text-zinc-500 border-[#20212e] hover:text-zinc-300'
                        }`}
                      >
                        {tier.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Economy Modifier Controls: Hero of the Village & Zombie Cure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-[#141520] border border-[#2b2c3e]">
                
                {/* Hero of the Village Slider */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-silkscreen">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <Award className="w-3.5 h-3.5" />
                      <span>HERO OF THE VILLAGE:</span>
                    </span>
                    <span className="text-white font-mono">
                      {heroDiscountLevel === 0 ? 'INACTIVE (0)' : `TIER ${heroDiscountLevel} (-${heroDiscountLevel * 10}%)`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={heroDiscountLevel}
                    onChange={(e) => { playClick(); setHeroDiscountLevel(Number(e.target.value)); }}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>

                {/* Cured Zombie Villager Toggle */}
                <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
                  <div className="text-left sm:text-right">
                    <span className="font-silkscreen text-[11px] text-purple-400 block">ZOMBIE CURE DISCOUNT:</span>
                    <span className="text-[10px] font-mono text-zinc-400">Splash Weakness + Golden Apple</span>
                  </div>
                  <button
                    onClick={() => { playPop(); setIsZombieCured(!isZombieCured); }}
                    className={`px-3 py-1.5 rounded text-xs font-silkscreen transition-all border ${
                      isZombieCured
                        ? 'bg-purple-950 text-purple-300 border-purple-500 shadow-md font-bold'
                        : 'bg-[#101118] text-zinc-500 border-[#232433]'
                    }`}
                  >
                    {isZombieCured ? 'ACTIVE (-40%)' : 'DISABLED'}
                  </button>
                </div>

              </div>

              {/* Active Trades Roster */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-silkscreen text-zinc-400 px-1">
                  <span>AVAILABLE {currentTier.name.toUpperCase()} TRADE OFFERS</span>
                  <span>MAX USES: 12-16 (RESTOCKS 2X/DAY)</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {activeTrades.map((trade, idx) => {
                    const hasEmeraldInput = trade.inputs.some(i => i.id === 'emerald');
                    const emeraldInput = trade.inputs.find(i => i.id === 'emerald');
                    const regularCost = emeraldInput ? emeraldInput.count : null;
                    const finalCost = regularCost ? calculatePrice(regularCost) : null;
                    const hasDiscount = regularCost && finalCost < regularCost;

                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg bg-[#151622] border-2 border-[#2b2c3e] hover:border-[#3d3f56] flex flex-col sm:flex-row items-center justify-between gap-4 transition-all"
                      >
                        {/* Trade Row: Inputs -> Output */}
                        <div className="flex items-center gap-3">
                          
                          {/* Inputs */}
                          <div className="flex items-center gap-2">
                            {trade.inputs.map((inp, iIdx) => (
                              <div key={iIdx} className="mc-slot w-12 h-12 rounded bg-[#101118] border border-[#2d2e3f] flex items-center justify-center relative">
                                {renderItemIcon(inp.id, "w-8 h-8")}
                                <span className={`absolute bottom-0.5 right-1 font-pixel text-[10px] ${
                                  inp.id === 'emerald' && hasDiscount ? 'text-emerald-400 font-bold' : 'text-white'
                                } mc-shadow`}>
                                  {inp.id === 'emerald' ? finalCost : inp.count}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Arrow */}
                          <div className="flex flex-col items-center px-1 text-zinc-500">
                            <ArrowRight className="w-4 h-4 text-emerald-400" />
                            {hasDiscount && (
                              <span className="text-[9px] font-mono text-emerald-400 line-through">
                                {regularCost}E
                              </span>
                            )}
                          </div>

                          {/* Output Item */}
                          <div className="mc-slot w-12 h-12 rounded bg-[#101118] border border-[#2d2e3f] flex items-center justify-center relative group">
                            {renderItemIcon(trade.output.id, "w-8 h-8")}
                            <span className="absolute bottom-0.5 right-1 font-pixel text-[10px] text-white mc-shadow">
                              {trade.output.count}
                            </span>
                            {trade.output.enchanted && (
                              <div className="absolute inset-0 mc-enchant-glint rounded pointer-events-none"></div>
                            )}
                          </div>

                          {/* Description */}
                          <div className="ml-2 text-left">
                            <p className="font-silkscreen text-xs text-white">
                              {trade.output.name}
                            </p>
                            <span className="text-[10px] font-mono text-zinc-400">
                              Yields +{trade.xp} XP • Max {trade.maxUses} uses
                            </span>
                          </div>

                        </div>

                        {/* Execute Button */}
                        <button
                          onClick={() => handleExecuteTrade(trade)}
                          className="mc-btn mc-btn-green py-2 px-4 text-xs font-silkscreen flex items-center gap-2 w-full sm:w-auto"
                        >
                          <Coins className="w-3.5 h-3.5" />
                          <span>TRADE NOW</span>
                        </button>

                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: 13 PROFESSIONS COMPLETE CATALOG */}
        {activeTab === 'professions' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
            {VILLAGER_PROFESSIONS.map((prof) => (
              <div 
                key={prof.id}
                className="mc-panel p-5 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] hover:border-emerald-500/50 shadow-xl space-y-4 transition-all"
              >
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-[#242533] pb-3">
                  <div className="w-12 h-12 rounded-lg bg-[#0e0f17] border border-[#2c2d3f] p-2 flex items-center justify-center">
                    {renderItemIcon(prof.workstationId, "w-8 h-8")}
                  </div>
                  <div>
                    <h3 className="font-pixel text-sm text-white">{prof.name}</h3>
                    <p className="text-[11px] font-silkscreen text-emerald-400 mt-0.5">
                      Workstation: {prof.workstation}
                    </p>
                  </div>
                </div>

                <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                  {prof.role}
                </p>

                {/* Trade Tiers Preview */}
                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-silkscreen text-zinc-400 block">KEY TRADE HIGHLIGHTS:</span>
                  <div className="space-y-1">
                    {prof.trades.slice(0, 4).map((t, i) => (
                      <div key={i} className="flex items-center justify-between text-xs font-mono bg-[#0d0e14] px-2.5 py-1.5 rounded border border-[#1e1f2b]">
                        <span className="text-zinc-400">{t.tierName}:</span>
                        <span className="text-white truncate max-w-[180px]">{t.output.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Test in Simulator CTA */}
                <button
                  onClick={() => {
                    playClick();
                    setSelectedProfessionId(prof.id);
                    setActiveTab('simulator');
                  }}
                  className="w-full mc-btn py-1.5 text-xs font-silkscreen text-zinc-300 hover:text-white"
                >
                  SIMULATE {prof.name.toUpperCase()} TRADES
                </button>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: TRADING MECHANICS & DISCOUNT FORMULAS */}
        {activeTab === 'mechanics' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            
            {/* Mechanics 1.1: Level & XP System */}
            <div className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
              <h3 className="font-pixel text-base text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>1.1 VILLAGER CAREER TIERS & BADGES</span>
              </h3>
              <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                Villagers level up through 5 career tiers by trading. As they advance, a metallic badge appears on their belt:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                {VILLAGER_TIERS.map((tier) => (
                  <div key={tier.level} className="p-3 rounded-lg bg-[#0e0f16] border border-[#222332] text-center space-y-1">
                    <span className="text-xl select-none">{tier.badgeIcon}</span>
                    <span className="font-silkscreen text-xs text-white block">{tier.name}</span>
                    <span className="text-[10px] font-mono text-zinc-400 block">{tier.badge} Badge</span>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold block">{tier.xpRequired} XP</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mechanics 1.2: Restocking & Lockouts */}
            <div className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
              <h3 className="font-pixel text-base text-white flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-400" />
                <span>1.2 RESTOCKING, WORK HOURS & SUPPLY/DEMAND</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-zinc-300 leading-relaxed">
                <div className="space-y-2 bg-[#0e0f16] p-4 rounded-lg border border-[#222332]">
                  <strong className="text-white font-silkscreen block">DAILY RESTOCKING CYCLE:</strong>
                  <p>• Villagers work between ticks 2,000 and 9,000.</p>
                  <p>• They can restock depleted trades up to <strong>twice each in-game day</strong> when they reach their claimed job site block.</p>
                  <p>• When locked, a red ✕ overlays the arrow until restocked.</p>
                </div>
                <div className="space-y-2 bg-[#0e0f16] p-4 rounded-lg border border-[#222332]">
                  <strong className="text-white font-silkscreen block">SUPPLY & DEMAND INFLATION:</strong>
                  <p>• Using a trade to its maximum limit increases the demand value, raising the required item/emerald cost on subsequent restocks.</p>
                  <p>• Not using an inflated trade causes prices to naturally decay back down to the baseline over consecutive days.</p>
                </div>
              </div>
            </div>

            {/* Mechanics 1.3: Sale Prices & Discount Formulas */}
            <div className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
              <h3 className="font-pixel text-base text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>1.3 SALE PRICES & REPUTATION DISCOUNTS</span>
              </h3>
              <div className="space-y-3 text-xs font-mono text-zinc-300">
                <div className="p-3.5 rounded-lg bg-[#0e0f16] border border-[#222332] space-y-1.5">
                  <strong className="text-emerald-400 font-silkscreen block">HERO OF THE VILLAGE DISCOUNT:</strong>
                  <p>
                    Granted for 40 minutes after defeating an ominous Raid. Reduces item prices by <code>basePrice × (0.30 + 0.0625 × (level - 1))</code>, with a guaranteed minimum cost of 1 emerald.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0e0f16] border border-[#222332] space-y-1.5">
                  <strong className="text-purple-400 font-silkscreen block">ZOMBIE VILLAGER CURING (JAVA 1.20.2+ BALANCE):</strong>
                  <p>
                    Curing a zombie villager with Splash Weakness + Golden Apple unlocks a permanent personal discount (up to -20 emeralds). In modern Java Edition, curing discounts do not stack indefinitely to maintain economic balance.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#0e0f16] border border-[#222332] space-y-1.5">
                  <strong className="text-red-400 font-silkscreen block">VILLAGE POPULARITY & GOSSIP:</strong>
                  <p>
                    Trading increases player popularity (+1). Attacking villagers causes negative gossip (-10 to -20). If popularity drops below -15, Iron Golems become naturally hostile!
                  </p>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: NON-TRADING VILLAGERS */}
        {activeTab === 'nontrading' && (
          <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
            {NON_TRADING_VILLAGERS.map((villager) => (
              <div key={villager.id} className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
                <div className="flex items-center justify-between border-b border-[#242533] pb-3">
                  <div>
                    <h3 className="font-pixel text-base text-white">{villager.name}</h3>
                    <span className="text-[11px] font-silkscreen text-amber-400 font-bold">{villager.role}</span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-300">
                    NON-TRADING
                  </span>
                </div>

                <p className="text-xs font-mono text-zinc-300">
                  <strong className="text-white">Appearance:</strong> {villager.appearance}
                </p>

                <p className="text-xs font-mono text-zinc-300">
                  <strong className="text-white">Daily Schedule:</strong> {villager.schedule}
                </p>

                <div className="space-y-1.5 bg-[#0e0f16] p-3.5 rounded-lg border border-[#222332]">
                  <strong className="text-[11px] font-silkscreen text-emerald-400 block">KEY BEHAVIORS & MECHANICS:</strong>
                  {villager.mechanics.map((m, i) => (
                    <p key={i} className="text-xs font-mono text-zinc-400">
                      • {m}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: WANDERING TRADER LEDGER */}
        {activeTab === 'wandering' && (
          <div className="max-w-4xl mx-auto mc-panel p-6 sm:p-8 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-[#242533] pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#141520] border-2 border-cyan-500/60 p-2 flex items-center justify-center">
                  <Compass className="w-8 h-8 text-cyan-400 animate-spin" />
                </div>
                <div>
                  <h3 className="font-pixel text-base text-white">{WANDERING_TRADER_DATA.name}</h3>
                  <span className="text-xs font-mono text-cyan-400">Accompanied by 2 Trader Llamas</span>
                </div>
              </div>
              <span className="text-[10px] font-silkscreen px-3 py-1 rounded bg-[#101924] text-cyan-300 border border-cyan-800">
                WANDERING EXPEDITIONS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono text-zinc-300">
              <div className="bg-[#0e0f16] p-4 rounded-lg border border-[#222332] space-y-2">
                <strong className="text-white font-silkscreen block">SPAWNING & DESPAWNING:</strong>
                <p>• {WANDERING_TRADER_DATA.spawning}</p>
                <p>• Spawns are attempted every 24,000 ticks (1 in-game day) with increasing spawn probability.</p>
              </div>

              <div className="bg-[#0e0f16] p-4 rounded-lg border border-[#222332] space-y-2">
                <strong className="text-white font-silkscreen block">NIGHT SURVIVAL TACTIC:</strong>
                <p>• {WANDERING_TRADER_DATA.nightSurvival}</p>
                <p>• Only particles and the held milk bucket/potion remain faintly visible.</p>
              </div>
            </div>

            {/* Wandering Trader Stock Roster */}
            <div className="space-y-3">
              <span className="font-silkscreen text-xs text-white block">TRADER STOCK CATALOG:</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {WANDERING_TRADER_DATA.trades.map((item, i) => (
                  <div key={i} className="p-3 rounded-lg bg-[#0e0f16] border border-[#222332] flex items-center justify-between">
                    <div>
                      <span className="font-silkscreen text-xs text-white block">{item.name}</span>
                      <span className="text-[10px] font-mono text-zinc-500">{item.rarity}</span>
                    </div>
                    <div className="flex items-center gap-1 font-mono text-xs text-emerald-400 font-bold bg-[#142318] px-2 py-0.5 rounded border border-emerald-800">
                      {item.cost}E
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: ADVANCEMENTS & BIOME CLOTHING */}
        {activeTab === 'advancements' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
            
            {/* 7 Biome Clothing Styles */}
            <div className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
              <h3 className="font-pixel text-base text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-400" />
                <span>7 REGIONAL BIOME CLOTHING STYLES</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {BIOME_CLOTHING_VARIANTS.map((b) => (
                  <div key={b.biome} className="p-3 rounded-lg bg-[#0e0f16] border border-[#222332] space-y-1">
                    <span className="font-silkscreen text-xs text-emerald-400 block">{b.biome} Villager</span>
                    <p className="text-[11px] font-mono text-zinc-300">{b.outfit}</p>
                    <span className="text-[9px] font-mono text-zinc-500 block">Badge: {b.badgeLocation}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trading Advancements & Achievements */}
            <div className="mc-panel p-6 rounded-xl bg-[#151622] border-2 border-[#2b2c3e] space-y-4">
              <h3 className="font-pixel text-base text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                <span>OFFICIAL TRADING ADVANCEMENTS</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRADING_ADVANCEMENTS.map((adv) => (
                  <div key={adv.title} className="p-3.5 rounded-lg bg-[#0e0f16] border border-[#222332] flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-[#161824] border border-[#2c2d3f] p-1.5 flex items-center justify-center shrink-0">
                      {renderItemIcon(adv.icon, "w-6 h-6")}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-silkscreen text-xs text-white font-bold">{adv.title}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-950 text-amber-400 border border-amber-800">
                          {adv.badge}
                        </span>
                      </div>
                      <p className="text-[11px] font-mono text-zinc-400 mt-1 leading-normal">
                        {adv.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
