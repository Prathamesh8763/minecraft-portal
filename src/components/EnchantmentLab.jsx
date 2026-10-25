import React, { useState, useMemo } from 'react';
import { 
  ENCHANTMENTS_LIST, 
  OBTAINING_METHODS, 
  DISENCHANTING_MECHANICS, 
  EPF_CAP_DATA, 
  ENCHANTING_ADVANCEMENTS, 
  ENCHANTING_HISTORY,
  ITEM_ENCHANTMENT_MATRIX,
  INCOMPATIBILITY_RULES,
  DATA_COMPONENT_EXAMPLES,
  ENCHANTMENT_SOUNDS,
  BEDROCK_ACHIEVEMENTS,
  SGA_WORDS,
  BEST_ENCHANTMENTS_GUIDE,
  ANVIL_BINARY_TREE_TUTORIAL,
  ENCHANTABILITY_INDEX,
  ENCHANTING_FORMULAS
} from '../data/minecraftEnchantments';
import { 
  Sparkles, 
  BookOpen, 
  Shield, 
  Zap, 
  Flame, 
  Search, 
  RotateCcw, 
  Check, 
  Copy, 
  AlertCircle, 
  Info, 
  Volume2, 
  Trophy, 
  History, 
  Layers, 
  Sword, 
  Wand2, 
  Hammer, 
  Sliders,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  HelpCircle,
  Award,
  CheckCircle2,
  XCircle,
  GitBranch,
  X,
  CheckCheck,
  Calculator,
  Crown,
  Filter
} from 'lucide-react';
import { playClick, playPop, playLevelUp } from '../utils/soundFX';
import confetti from 'canvas-confetti';
import { GAME_VERSION_CONFIG } from '../data/versionConfig';

// English to Standard Galactic Alphabet (SGA) translation mapping
const SGA_MAP = {
  a: 'ᔑ', b: 'ʖ', c: 'ᓵ', d: '↸', e: 'ᒷ', f: '⎓', g: '⊣', h: '⍑', i: '╎',
  j: '⋮', k: 'ꖌ', l: '󠁬', m: 'ᒲ', n: 'リ', o: '𝙹', p: '!¡', q: 'ᑑ', r: '∷',
  s: 'ᓵ', t: 'ℸ', u: '⚍', v: '⍊', w: '∴', x: 'ᔫ', y: '||', z: '⨅'
};

function toSGA(text) {
  return text.toLowerCase().split('').map(char => SGA_MAP[char] || char).join('');
}

// Selectable items in the Enchanting Table Simulator
const SIMULATOR_ITEMS = [
  { id: 'diamond_sword', name: 'Diamond Sword', icon: 'diamond_sword', category: 'Melee Weapons', baseEnchants: ['sharpness', 'smite', 'knockback', 'fire_aspect', 'looting', 'unbreaking'] },
  { id: 'the_mace', name: 'The Mace (1.21)', icon: 'the_mace', category: 'Mace & Combat', baseEnchants: ['wind_burst', 'density', 'breach', 'smite', 'unbreaking'] },
  { id: 'diamond_pickaxe', name: 'Diamond Pickaxe', icon: 'diamond_pickaxe', category: 'Tools & Gathering', baseEnchants: ['efficiency', 'fortune', 'silk_touch', 'unbreaking'] },
  { id: 'diamond_chestplate', name: 'Diamond Chestplate', icon: 'diamond_chestplate', category: 'Armor & Defense', baseEnchants: ['protection', 'fire_protection', 'thorns', 'unbreaking'] },
  { id: 'diamond_boots', name: 'Diamond Boots', icon: 'diamond_boots', category: 'Armor & Defense', baseEnchants: ['protection', 'feather_falling', 'depth_strider', 'unbreaking'] },
  { id: 'bow', name: 'Bow', icon: 'bow', category: 'Bows & Ranged', baseEnchants: ['power', 'punch', 'flame', 'infinity', 'unbreaking'] },
  { id: 'crossbow', name: 'Crossbow', icon: 'crossbow', category: 'Bows & Ranged', baseEnchants: ['quick_charge', 'multishot', 'piercing', 'unbreaking'] },
  { id: 'trident', name: 'Trident', icon: 'trident', category: 'Melee Weapons', baseEnchants: ['impaling', 'loyalty', 'riptide', 'channeling', 'unbreaking'] },
  { id: 'book', name: 'Normal Book', icon: 'book', category: 'Curses & Utility', baseEnchants: ['mending', 'unbreaking', 'sharpness', 'protection', 'efficiency'] }
];

// Helper to clean search query by stripping common conversational prefixes
function sanitizeSearchQuery(raw) {
  if (!raw) return '';
  return raw
    .toLowerCase()
    .replace(/\b(i want|i need|give me|show me|find me|how to get|what is|search for|a|the|an)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default function EnchantmentLab() {
  const [activeTab, setActiveTab] = useState('best_guide'); // 'best_guide' | 'simulator' | 'obtaining' | 'behavior' | 'disenchanting' | 'codex' | 'matrix' | 'epf'
  
  // Universal Omnisearch State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategoryFilter, setSearchCategoryFilter] = useState('all'); // 'all' | 'god' | 'codex' | 'mechanics' | 'materials' | 'matrix'
  
  // Codex category filter
  const [selectedCodexCategory, setSelectedCodexCategory] = useState('All');
  
  // Best Guide filter
  const [guideCategory, setGuideCategory] = useState('All');
  const [copiedGuideId, setCopiedGuideId] = useState(null);
  const [copiedAllArmor, setCopiedAllArmor] = useState(false);

  // Simulator state
  const [selectedItem, setSelectedItem] = useState(SIMULATOR_ITEMS[0]);
  const [bookshelfCount, setBookshelfCount] = useState(15);
  const [playerLevel, setPlayerLevel] = useState(30);
  const [playerLapis, setPlayerLapis] = useState(32);
  const [enchantedResult, setEnchantedResult] = useState(null);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [priorWorkPenalty, setPriorWorkPenalty] = useState(0); // 0 to 6

  // Interactive Tools state
  const [grindstoneEnchantCount, setGrindstoneEnchantCount] = useState(3);
  const [epfSelections, setEpfSelections] = useState({
    helmet: 4, // Protection IV = 4 EPF
    chestplate: 4, // Protection IV = 4 EPF
    leggings: 4, // Protection IV = 4 EPF
    boots: 4, // Protection IV = 4 EPF
    featherFalling: 12 // Feather Falling IV = 12 EPF
  });

  // Categories for the Codex tab
  const codexCategories = ['All', 'Mace & Combat', 'Melee Weapons', 'Bows & Ranged', 'Armor & Defense', 'Tools & Gathering', 'Curses & Utility'];

  // Cleaned search tokens
  const searchClean = useMemo(() => sanitizeSearchQuery(searchQuery), [searchQuery]);
  const searchTokens = useMemo(() => searchClean ? searchClean.split(' ').filter(Boolean) : [], [searchClean]);

  // Universal Search Matching Across ALL Domains
  const searchResults = useMemo(() => {
    if (!searchTokens.length) {
      return {
        hasQuery: false,
        godItems: [],
        codexItems: [],
        mechanicItems: [],
        materialItems: [],
        matrixItems: [],
        isGodArmorMatch: false,
        totalMatches: 0
      };
    }

    // Match God Equipment
    const matchedGod = BEST_ENCHANTMENTS_GUIDE.filter(item => {
      const targetStr = [
        item.name,
        item.item,
        item.category,
        item.description,
        item.debate,
        ...(item.tags || []),
        ...(item.mustHaves || []),
        ...(item.optional || [])
      ].join(' ').toLowerCase();

      // If user searched "god armor" or "armor", match all armor pieces
      if (searchClean.includes('armor') && (item.category === 'Armor' || (item.tags && item.tags.includes('armor')))) {
        return true;
      }
      return searchTokens.every(token => targetStr.includes(token));
    });

    // Check if God Armor (all 4 pieces) matched
    const isGodArmorMatch = matchedGod.some(g => g.category === 'Armor') && 
      (searchClean.includes('armor') || searchClean.includes('god') || searchClean.includes('helmet') || searchClean.includes('boots'));

    // Match Codex Enchantments
    const matchedCodex = ENCHANTMENTS_LIST.filter(ench => {
      const targetStr = [
        ench.name,
        ench.desc,
        ench.category,
        ench.rarity,
        ench.version,
        ...(ench.items || []),
        ...(ench.incompatible || [])
      ].join(' ').toLowerCase();

      return searchTokens.every(token => targetStr.includes(token));
    });

    // Match Mechanics, Anvil & Formulas
    const matchedMechanics = [];
    const lowerClean = searchClean;

    if (
      lowerClean.includes('anvil') || 
      lowerClean.includes('penalty') || 
      lowerClean.includes('too expensive') || 
      lowerClean.includes('binary tree') ||
      lowerClean.includes('tournament') ||
      lowerClean.includes('prior work') ||
      lowerClean.includes('repair')
    ) {
      matchedMechanics.push({
        id: 'mech_anvil',
        type: 'Anvil Tutorial',
        title: ANVIL_BINARY_TREE_TUTORIAL.title,
        subtitle: ANVIL_BINARY_TREE_TUTORIAL.subtitle,
        desc: ANVIL_BINARY_TREE_TUTORIAL.goldenRule,
        targetTab: 'best_guide',
        badge: 'Anvil Math'
      });
    }

    if (
      lowerClean.includes('formula') || 
      lowerClean.includes('bookshelf') || 
      lowerClean.includes('algorithm') || 
      lowerClean.includes('modified level') ||
      lowerClean.includes('math')
    ) {
      matchedMechanics.push({
        id: 'mech_formula',
        type: 'Enchanting Algorithm',
        title: 'Enchanting Table Mathematical Formula',
        subtitle: 'Slot Level & Triangular Distribution Factor',
        desc: 'Base Level = random(1, 8) + floor(Bookshelves/2) + random(0, Bookshelves). With 15 bookshelves, guarantees Level 30 bottom slot.',
        targetTab: 'obtaining',
        badge: 'Fandom Spec'
      });
    }

    if (
      lowerClean.includes('grindstone') || 
      lowerClean.includes('disenchant') || 
      lowerClean.includes('curse') ||
      lowerClean.includes('refund') ||
      lowerClean.includes('binding') ||
      lowerClean.includes('vanishing')
    ) {
      matchedMechanics.push({
        id: 'mech_grindstone',
        type: 'Disenchanting',
        title: 'Grindstone Mechanics & Curse Indelibility',
        subtitle: DISENCHANTING_MECHANICS.description,
        desc: 'Removes non-curse enchantments and refunds player XP. Curses of Binding & Vanishing can NEVER be removed.',
        targetTab: 'disenchanting',
        badge: 'Grindstone'
      });
    }

    if (
      lowerClean.includes('epf') || 
      lowerClean.includes('protection') || 
      lowerClean.includes('cap') || 
      lowerClean.includes('80%') || 
      lowerClean.includes('feather falling')
    ) {
      matchedMechanics.push({
        id: 'mech_epf',
        type: 'Protection Mechanics',
        title: 'Environmental Protection Factor (EPF) 20 Cap',
        subtitle: 'Maximum 80% Damage Reduction Mechanics',
        desc: 'Every EPF point gives 4% damage reduction up to a hard cap of 20 EPF (80% total reduction). Full Protection IV set yields 16 EPF.',
        targetTab: 'epf',
        badge: 'EPF 20 Cap'
      });
    }

    if (
      lowerClean.includes('conflict') || 
      lowerClean.includes('incompatible') || 
      lowerClean.includes('mending vs infinity') || 
      lowerClean.includes('density vs breach') || 
      lowerClean.includes('sharpness vs smite')
    ) {
      matchedMechanics.push({
        id: 'mech_conflicts',
        type: 'Incompatibility Rules',
        title: 'Mutual Exclusivity & Conflict Rules',
        subtitle: 'Why certain enchantments cannot co-exist',
        desc: 'Sharpness/Smite/Bane, Protection variants, Silk Touch/Fortune, Infinity/Mending, and 1.21 Density/Breach are strictly exclusive.',
        targetTab: 'behavior',
        badge: 'Conflict Matrix'
      });
    }

    // Match Material Enchantability
    const matchedMaterials = ENCHANTABILITY_INDEX.filter(mat => {
      const str = [mat.material, mat.rarityTier, mat.notes].join(' ').toLowerCase();
      return searchTokens.some(token => str.includes(token)) || 
        (lowerClean.includes('enchantability') || lowerClean.includes('gold') || lowerClean.includes('netherite') || lowerClean.includes('diamond'));
    });

    // Match Item Matrix
    const matchedMatrix = ITEM_ENCHANTMENT_MATRIX.filter(item => {
      const str = [item.category, item.notes, ...(item.enchantments || [])].join(' ').toLowerCase();
      return searchTokens.every(token => str.includes(token));
    });

    const totalMatches = matchedGod.length + matchedCodex.length + matchedMechanics.length + matchedMaterials.length + matchedMatrix.length;

    return {
      hasQuery: true,
      godItems: matchedGod,
      codexItems: matchedCodex,
      mechanicItems: matchedMechanics,
      materialItems: matchedMaterials,
      matrixItems: matchedMatrix,
      isGodArmorMatch,
      totalMatches
    };
  }, [searchTokens, searchClean]);

  // Filtered Best Guide Loadouts (for Tab 1 direct view)
  const filteredGuideLoadouts = useMemo(() => {
    return BEST_ENCHANTMENTS_GUIDE.filter(guide => {
      if (guideCategory === 'All') return true;
      if (guideCategory === 'Armor') return guide.category === 'Armor';
      if (guideCategory === 'Weapons') return guide.category.includes('Weapons');
      if (guideCategory === 'Tools') return guide.category.includes('Tools');
      if (guideCategory === 'Ranged & Utility') return guide.category === 'Ranged' || guide.category === 'Utility';
      return true;
    });
  }, [guideCategory]);

  // Filtered Codex Enchantments (for Tab 6 direct view)
  const filteredCodexEnchantments = useMemo(() => {
    return ENCHANTMENTS_LIST.filter(ench => {
      const matchesCategory = selectedCodexCategory === 'All' || ench.category === selectedCodexCategory;
      const matchesSearch = !searchTokens.length || 
        searchTokens.every(t => 
          ench.name.toLowerCase().includes(t) ||
          ench.desc.toLowerCase().includes(t) ||
          ench.items.some(it => it.toLowerCase().includes(t))
        );
      return matchesCategory && matchesSearch;
    });
  }, [searchTokens, selectedCodexCategory]);

  // Dynamic maximum enchanting level based on bookshelves (0 to 15)
  const maxTableLevel = useMemo(() => {
    if (bookshelfCount === 0) return 8;
    return Math.min(30, Math.floor(bookshelfCount * 2));
  }, [bookshelfCount]);

  // Generate 3 authentic pseudo-random enchanting offers for the simulator
  const enchantmentOffers = useMemo(() => {
    const req1 = Math.max(1, Math.floor(maxTableLevel / 4));
    const req2 = Math.max(req1 + 2, Math.floor((maxTableLevel * 2) / 3));
    const req3 = maxTableLevel;

    const rWords1 = [SGA_WORDS[(bookshelfCount * 3) % SGA_WORDS.length], SGA_WORDS[(bookshelfCount + 1) % SGA_WORDS.length]].join(' ');
    const rWords2 = [SGA_WORDS[(bookshelfCount * 5) % SGA_WORDS.length], SGA_WORDS[(bookshelfCount + 7) % SGA_WORDS.length]].join(' ');
    const rWords3 = [SGA_WORDS[(bookshelfCount * 7) % SGA_WORDS.length], SGA_WORDS[(bookshelfCount + 4) % SGA_WORDS.length], SGA_WORDS[(bookshelfCount + 9) % SGA_WORDS.length]].join(' ');

    const eligible = selectedItem.baseEnchants;
    const p1EnchId = eligible[0] || 'unbreaking';
    const p2EnchId = eligible[Math.min(1, eligible.length - 1)] || 'unbreaking';
    const p3EnchId = eligible[Math.min(eligible.length - 1, 2)] || 'sharpness';

    const p1Ench = ENCHANTMENTS_LIST.find(e => e.id === p1EnchId) || ENCHANTMENTS_LIST[0];
    const p2Ench = ENCHANTMENTS_LIST.find(e => e.id === p2EnchId) || ENCHANTMENTS_LIST[1];
    const p3Ench = ENCHANTMENTS_LIST.find(e => e.id === p3EnchId) || ENCHANTMENTS_LIST[2];

    return [
      {
        slot: 1,
        levelReq: req1,
        lapisCost: 1,
        levelCost: 1,
        sgaEnglish: rWords1,
        sgaRunic: toSGA(rWords1),
        previewName: `${p1Ench.name} I`,
        primaryEnch: p1Ench,
        tier: 'I',
        extraEnchants: []
      },
      {
        slot: 2,
        levelReq: req2,
        lapisCost: 2,
        levelCost: 2,
        sgaEnglish: rWords2,
        sgaRunic: toSGA(rWords2),
        previewName: `${p2Ench.name} II`,
        primaryEnch: p2Ench,
        tier: 'II',
        extraEnchants: ['unbreaking']
      },
      {
        slot: 3,
        levelReq: req3,
        lapisCost: 3,
        levelCost: 3,
        sgaEnglish: rWords3,
        sgaRunic: toSGA(rWords3),
        previewName: `${p3Ench.name} ${p3Ench.maxRoman}`,
        primaryEnch: p3Ench,
        tier: p3Ench.maxRoman,
        extraEnchants: ['unbreaking', 'mending']
      }
    ];
  }, [maxTableLevel, selectedItem, bookshelfCount]);

  const romanToInt = (roman) => {
    switch (roman) {
      case 'I': return 1;
      case 'II': return 2;
      case 'III': return 3;
      case 'IV': return 4;
      case 'V': return 5;
      default: return 1;
    }
  };

  // Execute Enchantment in Simulator
  const handleEnchant = (offer) => {
    if (playerLevel < offer.levelReq) {
      alert(`Insufficient experience! You require Level ${offer.levelReq} (You have Level ${playerLevel}).`);
      return;
    }
    if (playerLapis < offer.lapisCost) {
      alert(`Insufficient Lapis Lazuli! You need ${offer.lapisCost} Lapis Lazuli.`);
      return;
    }

    playLevelUp();
    playPop();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#a855f7', '#3b82f6', '#10b981', '#ec4899']
    });

    setPlayerLevel(prev => Math.max(0, prev - offer.levelCost));
    setPlayerLapis(prev => Math.max(0, prev - offer.lapisCost));

    const results = [{ name: offer.primaryEnch.name, level: offer.tier, id: offer.primaryEnch.id }];
    if (offer.slot >= 2 && offer.extraEnchants.includes('unbreaking')) {
      results.push({ name: 'Unbreaking', level: offer.slot === 3 ? 'III' : 'I', id: 'unbreaking' });
    }
    if (offer.slot === 3 && Math.random() > 0.4) {
      results.push({ name: 'Mending', level: 'I', id: 'mending' });
    }

    const isBook = selectedItem.id === 'book';
    const outputIcon = isBook ? 'enchanted_book' : selectedItem.icon;
    const outputName = isBook ? 'Enchanted Book' : `Enchanted ${selectedItem.name}`;

    const componentKey = isBook ? 'minecraft:stored_enchantments' : 'minecraft:enchantments';
    const enchLevelsObj = results.map(r => `'minecraft:${r.id}':${romanToInt(r.level)}`).join(',');
    const itemId = isBook ? 'enchanted_book' : selectedItem.id === 'the_mace' ? 'mace' : selectedItem.id;
    const giveCmd = `/give @p ${itemId}[${componentKey}={levels:{${enchLevelsObj}}}] 1`;

    setEnchantedResult({
      itemName: outputName,
      icon: outputIcon,
      enchants: results,
      command: giveCmd,
      costLevels: offer.levelCost,
      costLapis: offer.lapisCost
    });
  };

  const handleDisenchant = () => {
    if (!enchantedResult) return;
    playPop();
    const refundedXp = Math.floor(enchantedResult.enchants.length * 4) + 2;
    setPlayerLevel(prev => prev + refundedXp);
    setEnchantedResult(null);
    alert(`Item disenchanted on Grindstone! Refunded +${refundedXp} player experience levels.`);
  };

  const copyCommandToClipboard = (cmd, guideId = null) => {
    navigator.clipboard.writeText(cmd);
    playClick();
    if (guideId) {
      setCopiedGuideId(guideId);
      setTimeout(() => setCopiedGuideId(null), 2500);
    } else {
      setCopiedCommand(true);
      setTimeout(() => setCopiedCommand(false), 2500);
    }
  };

  // 1-Click Copy All 4 God Armor /give Commands
  const handleCopyAllGodArmor = () => {
    const armorGuides = BEST_ENCHANTMENTS_GUIDE.filter(g => g.category === 'Armor');
    const combinedCommands = armorGuides.map(g => g.giveCommand).join('\n');
    navigator.clipboard.writeText(combinedCommands);
    playLevelUp();
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#10b981', '#3b82f6', '#a855f7']
    });
    setCopiedAllArmor(true);
    setTimeout(() => setCopiedAllArmor(false), 3000);
  };

  const anvilPenaltyLevels = priorWorkPenalty === 0 ? 0 : Math.pow(2, priorWorkPenalty) - 1;
  const isTooExpensive = anvilPenaltyLevels >= 40;

  // Real-time EPF calculation
  const totalGeneralEpf = epfSelections.helmet + epfSelections.chestplate + epfSelections.leggings + epfSelections.boots;
  const effectiveGeneralEpf = Math.min(20, totalGeneralEpf);
  const generalDamageReduction = effectiveGeneralEpf * 4;

  const totalFallEpf = totalGeneralEpf + epfSelections.featherFalling;
  const effectiveFallEpf = Math.min(20, totalFallEpf);
  const fallDamageReduction = effectiveFallEpf * 4;

  // Jump to specific tab from search result
  const jumpToTab = (tabId) => {
    playClick();
    setActiveTab(tabId);
    setSearchQuery('');
    const el = document.getElementById('enchanting');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="enchanting" className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100">
      
      {/* ========================================================================= */}
      {/* 1. MASTER HEADER & CLEAN INFORMATION HIERARCHY */}
      {/* ========================================================================= */}
      <div className="bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-indigo-950/80 border-2 border-purple-500/30 rounded-3xl p-6 sm:p-7 backdrop-blur-md shadow-2xl relative overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row items-center gap-5 relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-purple-900 to-indigo-950 border border-purple-400/40 rounded-2xl flex items-center justify-center p-3 shadow-inner shadow-purple-500/20 shrink-0">
            <img 
              src="/icons/minecraft/enchanting_table.svg" 
              alt="Enchanting Table"
              onError={(e) => { e.currentTarget.src = '/icons/minecraft/enchanting_table.png'; }}
              className="w-14 h-14 object-contain filter drop-shadow-[0_0_15px_rgba(168,85,247,0.7)]"
            />
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
              <span className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Supported: {GAME_VERSION_CONFIG.toolCompatibility.enchanting.versionBadge}</span>
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Verified: {GAME_VERSION_CONFIG.toolCompatibility.enchanting.lastVerified}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Enchantment Laboratory
            </h2>
            <p className="mt-1 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Definitive Java Edition enchanting simulator, optimal god loadouts, and anvil merge algorithms. Sourced from official <a href="https://minecraft.wiki/w/Tutorial:Best_enchantments_guide" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline hover:text-purple-200">Minecraft Wiki: Best enchantments guide</a> and <a href="https://minecraft.wiki/w/Enchantment" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline hover:text-purple-200">Enchantment mechanics</a>.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. SEARCH ENCHANTMENTS AND GEAR */}
        {/* ========================================================================= */}
        <div className="mt-6 pt-5 border-t border-purple-500/20 relative z-10">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-purple-400" />
              Search enchantments and gear
            </span>
            {searchQuery && (
              <span className="text-[11px] font-mono text-emerald-400">
                Filtering results for "{searchQuery}"
              </span>
            )}
          </div>
          <div className="relative">
            <Search className="w-4 h-4 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder='Search enchantments or gear (e.g. "god armor", "the mace", "mending", "too expensive", "feather falling")...'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950/80 border border-purple-500/40 hover:border-purple-400 focus:border-emerald-400 rounded-xl pl-11 pr-10 py-3 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => {
                  playPop();
                  setSearchQuery('');
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white bg-slate-800 rounded-lg transition-all"
                title="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Quick Concise Search Suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 mt-2.5 text-xs">
            <span className="text-slate-400 font-mono text-[11px] mr-1">Suggestions:</span>
            {[
              { label: '🛡️ God Armor', query: 'god armor' },
              { label: '🔨 The Mace', query: 'mace' },
              { label: '✨ Mending', query: 'mending' },
              { label: '⚡ Anvil Tree', query: 'too expensive' },
              { label: '🛡️ EPF 20 Cap', query: 'epf' }
            ].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playClick();
                  setSearchQuery(chip.query);
                }}
                className={`px-2 py-0.5 rounded-lg border text-xs transition-all ${
                  searchQuery.toLowerCase() === chip.query.toLowerCase()
                    ? 'bg-purple-600 text-white border-purple-400 shadow-sm'
                    : 'bg-slate-900/60 text-slate-300 border-slate-700/60 hover:border-purple-400 hover:text-white'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CHOOSE A TOOL */}
        {/* ========================================================================= */}
        <div className="mt-6 pt-5 border-t border-purple-500/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              Choose a Tool
            </span>

            {/* Mobile / Narrow Screen Accessible Dropdown Selector */}
            <div className="sm:hidden w-full">
              <select
                value={activeTab}
                onChange={(e) => {
                  playClick();
                  setActiveTab(e.target.value);
                  if (searchResults.hasQuery) setSearchQuery('');
                }}
                aria-label="Select Enchanting Tool"
                className="w-full bg-[#181926] border border-purple-500/40 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
              >
                <option value="best_guide">🏆 Best Enchantments (God Gear)</option>
                <option value="simulator">🔮 Enchanting Simulator</option>
                <option value="obtaining">🔨 Anvil Optimizer &amp; Prior Work</option>
                <option value="behavior">⚡ Incompatibilities &amp; Conflict Matrix</option>
                <option value="disenchanting">🪨 Grindstone &amp; Disenchanting</option>
                <option value="codex">📖 All 42 Enchantments Codex</option>
                <option value="matrix">⚔️ Item Enchantment Matrix</option>
                <option value="epf">🛡️ EPF Caps &amp; Data Components</option>
              </select>
            </div>
          </div>

          {/* Desktop & Tablet Flex-Wrap Tool Navigation Tabs (No horizontal clipping!) */}
          <div className="hidden sm:flex flex-wrap items-center gap-2">
            {[
              { id: 'best_guide', label: 'Best Enchantments', icon: Trophy, count: BEST_ENCHANTMENTS_GUIDE.length },
              { id: 'simulator', label: 'Enchanting Simulator', icon: Sparkles },
              { id: 'obtaining', label: 'Anvil Optimizer', icon: Hammer },
              { id: 'behavior', label: 'Incompatibilities', icon: Zap, count: INCOMPATIBILITY_RULES.length },
              { id: 'disenchanting', label: 'Grindstone', icon: RotateCcw },
              { id: 'codex', label: 'All 42 Enchants', icon: BookOpen, count: ENCHANTMENTS_LIST.length },
              { id: 'matrix', label: 'Item Matrix', icon: Sword, count: ITEM_ENCHANTMENT_MATRIX.length },
              { id: 'epf', label: 'EPF & Components', icon: Shield }
            ].map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id && !searchResults.hasQuery;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    playClick();
                    setActiveTab(tab.id);
                    if (searchResults.hasQuery) setSearchQuery('');
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive 
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400' 
                      : 'bg-slate-900/70 text-slate-300 hover:bg-purple-900/30 hover:text-white border border-slate-700/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-purple-800 text-purple-200' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. UNIVERSAL SEARCH RESULTS PANEL (Displayed when searching) */}
      {/* ========================================================================= */}
      {searchResults.hasQuery && (
        <div className="space-y-6 mb-12 animate-in fade-in duration-200">
          {/* SEARCH HEADER WITH CATEGORY COUNTS */}
          <div className="bg-slate-900/90 border-2 border-purple-500/50 rounded-2xl p-5 shadow-2xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  UNIVERSAL OMNISEARCH RESULTS
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Search className="w-5 h-5 text-purple-400" />
                  Found {searchResults.totalMatches} matches for "{searchQuery}"
                </h3>
              </div>

              {/* Category Pills inside Search */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: `All (${searchResults.totalMatches})` },
                  { id: 'god', label: `🏆 God Loadouts (${searchResults.godItems.length})` },
                  { id: 'codex', label: `📖 Codex (${searchResults.codexItems.length})` },
                  { id: 'mechanics', label: `⚡ Mechanics (${searchResults.mechanicItems.length})` },
                  { id: 'materials', label: `🧪 Materials (${searchResults.materialItems.length})` },
                  { id: 'matrix', label: `⚔️ Item Matrix (${searchResults.matrixItems.length})` }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      playClick();
                      setSearchCategoryFilter(cat.id);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                      searchCategoryFilter === cat.id
                        ? 'bg-purple-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* SPECIAL GOD ARMOR SHOWCASE BANNER (Triggered on "god armor" search) */}
          {/* ========================================================================= */}
          {searchResults.isGodArmorMatch && (
            <div className="bg-gradient-to-r from-emerald-950/90 via-slate-900/95 to-purple-950/90 border-2 border-emerald-500/60 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-emerald-500 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Crown className="w-3.5 h-3.5" />
                      Definitive Meta
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                      The Complete 4-Piece God Armor Set
                    </span>
                  </div>
                  <h4 className="text-2xl font-black text-white">
                    Maximum Survival Protection Suit (Netherite)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    Combines God Helmet, God Chestplate, God Leggings, and God Boots. Achieves 20 Armor Points, +12 Toughness, +40% Knockback Resist, 16 General EPF + 12 Fall EPF (hitting the 20 EPF / 80% maximum damage reduction cap), +75% sneak speed, and water-breathing mining immunity.
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="bg-slate-950/80 border border-emerald-500/30 text-emerald-300 text-xs px-2.5 py-1 rounded-lg font-mono">
                      🛡️ 20 Armor (10 Full Shields)
                    </span>
                    <span className="bg-slate-950/80 border border-purple-500/30 text-purple-300 text-xs px-2.5 py-1 rounded-lg font-mono">
                      💎 +12 Armor Toughness
                    </span>
                    <span className="bg-slate-950/80 border border-blue-500/30 text-blue-300 text-xs px-2.5 py-1 rounded-lg font-mono">
                      ⚡ 80% Fall & Ender Pearl Cap
                    </span>
                    <span className="bg-slate-950/80 border border-amber-500/30 text-amber-300 text-xs px-2.5 py-1 rounded-lg font-mono">
                      🏃 +75% Swift Sneak III
                    </span>
                  </div>
                </div>

                {/* 1-Click Batch Copy All 4 Pieces */}
                <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 shrink-0 w-full sm:w-auto">
                  <button
                    onClick={handleCopyAllGodArmor}
                    className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm px-5 py-3 rounded-xl shadow-lg shadow-emerald-900/40 border border-emerald-400 transition-all hover:scale-[1.02]"
                  >
                    {copiedAllArmor ? <CheckCheck className="w-5 h-5 text-emerald-200" /> : <Copy className="w-5 h-5" />}
                    <span>{copiedAllArmor ? 'Copied All 4 /give Commands!' : 'Copy Complete Armor Set (4 /give Cmds)'}</span>
                  </button>
                  <button
                    onClick={() => jumpToTab('best_guide')}
                    className="flex items-center justify-center gap-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-4 py-2 rounded-xl border border-slate-600 transition-all"
                  >
                    <span>View in Best Enchantments Guide Tab</span>
                    <ArrowRight className="w-3.5 h-3.5 text-purple-400" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 1. MATCHED GOD EQUIPMENT */}
          {(searchCategoryFilter === 'all' || searchCategoryFilter === 'god') && searchResults.godItems.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-lg font-bold text-purple-300 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-400" />
                  God Equipment Matches ({searchResults.godItems.length})
                </h4>
                <button 
                  onClick={() => jumpToTab('best_guide')}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  Open in Best Guide Tab <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {searchResults.godItems.map(guide => (
                  <div
                    key={guide.id}
                    className="bg-slate-900/90 border-2 border-slate-700/80 hover:border-emerald-500/60 rounded-2xl p-5 shadow-xl transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-slate-950 border border-purple-500/30 rounded-xl flex items-center justify-center p-2 shadow-inner">
                            <img 
                              src={`/icons/minecraft/${guide.icon}.svg`}
                              alt={guide.name}
                              onError={(e) => { e.currentTarget.src = `/icons/minecraft/${guide.icon}.png`; }}
                              className="w-8 h-8 object-contain"
                            />
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-100 text-base">{guide.name}</h5>
                            <span className="text-[11px] text-emerald-400 font-mono">{guide.item}</span>
                          </div>
                        </div>

                        <span className="bg-purple-950/80 border border-purple-500/30 text-purple-300 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                          {guide.category}
                        </span>
                      </div>

                      {/* Must-Haves */}
                      <div className="my-2.5 space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                          Must-Have Enchantments:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {guide.mustHaves.map((ench, i) => (
                            <span key={i} className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                              <Check className="w-3 h-3 text-emerald-400" />
                              {ench}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Optional */}
                      {guide.optional.length > 0 && (
                        <div className="my-2 space-y-1">
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                            Optional / Debated:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {guide.optional.map((ench, i) => (
                              <span key={i} className="bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono px-2 py-0.5 rounded">
                                {ench}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                        {guide.description}
                      </p>

                      <div className="mt-2.5 bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                        <strong className="text-purple-300 block mb-0.5">Wiki Analysis & Debate:</strong>
                        {guide.debate}
                      </div>
                    </div>

                    {/* Copy /give Button */}
                    <div className="pt-3 border-t border-slate-800 mt-3 flex items-center justify-between gap-2">
                      <span className="font-mono text-[10px] text-slate-400">1.20.5+ /give command</span>
                      <button
                        onClick={() => copyCommandToClipboard(guide.giveCommand, guide.id)}
                        className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition-all shrink-0"
                      >
                        {copiedGuideId === guide.id ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedGuideId === guide.id ? 'Copied /give!' : 'Copy /give'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. MATCHED CODEX ENCHANTMENTS */}
          {(searchCategoryFilter === 'all' || searchCategoryFilter === 'codex') && searchResults.codexItems.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-lg font-bold text-purple-300 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-purple-400" />
                  Codex Enchantment Matches ({searchResults.codexItems.length})
                </h4>
                <button 
                  onClick={() => jumpToTab('codex')}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                >
                  Open in Codex Tab <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.codexItems.map(ench => (
                  <div 
                    key={ench.id}
                    className="bg-slate-900/90 border border-slate-700/70 hover:border-purple-500/60 rounded-2xl p-4 shadow-lg transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-950 border border-purple-500/30 rounded-xl flex items-center justify-center p-2">
                            <img 
                              src={`/icons/minecraft/${ench.primaryIcon}.svg`}
                              alt={ench.name}
                              onError={(e) => { e.currentTarget.src = `/icons/minecraft/${ench.primaryIcon}.png`; }}
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-100 text-sm flex items-center gap-1.5">
                              {ench.name}
                              <span className="text-purple-400 font-mono">{ench.maxRoman}</span>
                            </h5>
                            <span className="text-[11px] text-slate-400">{ench.category}</span>
                          </div>
                        </div>
                        <span className="bg-purple-950/80 border border-purple-500/30 text-purple-300 text-[10px] font-mono px-2 py-0.5 rounded">
                          {ench.version}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed my-2">{ench.desc}</p>
                    </div>

                    <div className="pt-2.5 border-t border-slate-800 text-[11px] space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Applies To:</span>
                        <span className="text-slate-200 font-mono">{ench.items.join(', ')}</span>
                      </div>
                      {ench.incompatible.length > 0 && (
                        <div className="flex justify-between text-red-300">
                          <span>Conflicts:</span>
                          <span className="font-mono">{ench.incompatible.join(', ')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. MATCHED MECHANICS, ANVIL TREE & FORMULAS */}
          {(searchCategoryFilter === 'all' || searchCategoryFilter === 'mechanics') && searchResults.mechanicItems.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <h4 className="text-lg font-bold text-purple-300 flex items-center gap-2">
                  <GitBranch className="w-5 h-5 text-amber-400" />
                  Mechanics, Anvil Tree & Formulas Matches ({searchResults.mechanicItems.length})
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.mechanicItems.map(mech => (
                  <div key={mech.id} className="bg-slate-900/90 border border-amber-500/40 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-mono font-bold px-2 py-0.5 rounded">
                          {mech.badge}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">{mech.type}</span>
                      </div>
                      <h5 className="font-bold text-slate-100 text-base">{mech.title}</h5>
                      <p className="text-xs text-purple-300 font-mono mt-0.5">{mech.subtitle}</p>
                      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed">{mech.desc}</p>
                    </div>

                    <div className="pt-4 mt-3 border-t border-slate-800 flex justify-end">
                      <button
                        onClick={() => jumpToTab(mech.targetTab)}
                        className="flex items-center gap-1.5 text-xs text-amber-300 hover:text-amber-200 font-semibold"
                      >
                        <span>Jump to full guide</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. MATCHED MATERIAL ENCHANTABILITY */}
          {(searchCategoryFilter === 'all' || searchCategoryFilter === 'materials') && searchResults.materialItems.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Material Enchantability Matches ({searchResults.materialItems.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.materialItems.map((mat, i) => (
                  <div key={i} className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 shadow-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-amber-300 text-base">{mat.material}</h5>
                      <span className="text-[10px] bg-slate-950 px-2 py-0.5 rounded font-mono text-purple-300 border border-slate-800">
                        {mat.rarityTier}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Tool Rating:</span>
                        <strong className="text-purple-300">{mat.toolEnchantability}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Armor Rating:</span>
                        <strong className="text-emerald-300">{mat.armorEnchantability}</strong>
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{mat.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. MATCHED ITEM MATRIX */}
          {(searchCategoryFilter === 'all' || searchCategoryFilter === 'matrix') && searchResults.matrixItems.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Sword className="w-5 h-5 text-indigo-400" />
                Item Enchantment Matrix Matches ({searchResults.matrixItems.length})
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {searchResults.matrixItems.map((mat, i) => (
                  <div key={i} className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 shadow-lg space-y-2">
                    <h5 className="font-bold text-slate-100 text-base">{mat.category}</h5>
                    <div className="flex flex-wrap gap-1.5">
                      {mat.enchantments.map((e, idx) => (
                        <span key={idx} className="bg-slate-950 border border-slate-800 text-purple-200 text-xs px-2 py-0.5 rounded font-mono">
                          {e}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-slate-400">{mat.notes}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No results fallback */}
          {searchResults.totalMatches === 0 && (
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <h4 className="text-lg font-bold text-slate-200">No results found for "{searchQuery}"</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Try searching for general terms like "god armor", "helmet", "mace", "pickaxe", "mending", "too expensive", or "gold".
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold rounded-xl"
              >
                Clear Search & View All
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 1: TUTORIAL - BEST ENCHANTMENTS GUIDE (WIKI TUTORIAL) */}
      {/* ========================================================================= */}
      {!searchResults.hasQuery && activeTab === 'best_guide' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* INTRO HERO BANNER */}
          <div className="bg-gradient-to-r from-emerald-950/70 via-slate-900/90 to-purple-950/70 border-2 border-emerald-500/40 rounded-2xl p-6 shadow-2xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  OFFICIAL MINECRAFT WIKI TUTORIAL BLUEPRINT
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-400" />
                  The Definitive "God Armor" & "God Tool" Loadouts
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
                  These 17 loadouts represent mathematically optimal enchantment configurations for survival. Each build maximizes damage reduction, mining velocity, durability longevity, and avoids mutually exclusive conflicts.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 shrink-0">
                {['All', 'Armor', 'Weapons', 'Tools', 'Ranged & Utility'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => {
                      playClick();
                      setGuideCategory(cat);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      guideCategory === cat 
                        ? 'bg-emerald-600 text-white shadow-md' 
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* SPOTLIGHT: COMPLETE GOD ARMOR SET OVERVIEW (When on All or Armor) */}
          {(guideCategory === 'All' || guideCategory === 'Armor') && (
            <div className="bg-gradient-to-r from-purple-950/80 via-slate-900/90 to-emerald-950/80 border-2 border-emerald-500/50 rounded-2xl p-6 shadow-2xl">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-emerald-500 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
                      FULL SET SPOTLIGHT
                    </span>
                    <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
                      Complete 4-Piece God Armor Blueprint
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white">
                    Netherite Helmet, Chestplate, Leggings & Boots
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mt-1">
                    Protection IV across all 4 pieces grants 16 EPF (64% general resistance). Feather Falling IV adds 12 EPF to fall damage, easily reaching the 20 EPF cap (80% maximum damage reduction). Respiration III + Aqua Affinity + Swift Sneak III + Depth Strider III cover all environmental mobility.
                  </p>
                </div>

                <button
                  onClick={handleCopyAllGodArmor}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg border border-emerald-400 transition-all shrink-0 hover:scale-[1.02]"
                >
                  {copiedAllArmor ? <CheckCheck className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedAllArmor ? 'Copied All 4 /give Commands!' : 'Copy All 4 God Armor /give Commands'}</span>
                </button>
              </div>
            </div>
          )}

          {/* GOD EQUIPMENT CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuideLoadouts.map(guide => (
              <div
                key={guide.id}
                className="bg-slate-900/90 border-2 border-slate-700/80 hover:border-emerald-500/60 rounded-2xl p-5 shadow-xl hover:shadow-emerald-900/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-950 border border-purple-500/30 rounded-xl flex items-center justify-center p-2 shadow-inner">
                        <img 
                          src={`/icons/minecraft/${guide.icon}.svg`}
                          alt={guide.name}
                          onError={(e) => { e.currentTarget.src = `/icons/minecraft/${guide.icon}.png`; }}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100 text-base">{guide.name}</h4>
                        <span className="text-[11px] text-emerald-400 font-mono">{guide.item}</span>
                      </div>
                    </div>

                    <span className="bg-purple-950/80 border border-purple-500/30 text-purple-300 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                      {guide.category}
                    </span>
                  </div>

                  {/* MUST-HAVE ENCHANTMENTS */}
                  <div className="my-3 space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Must-Have Enchantments:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {guide.mustHaves.map((ench, i) => (
                        <span key={i} className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-400" />
                          {ench}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* OPTIONAL / DEBATED ENCHANTMENTS */}
                  {guide.optional.length > 0 && (
                    <div className="my-2.5 space-y-1">
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                        Optional / Debated:
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {guide.optional.map((ench, i) => (
                          <span key={i} className="bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-mono px-2 py-0.5 rounded">
                            {ench}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-300 leading-relaxed mt-2.5">
                    {guide.description}
                  </p>

                  {/* STRATEGY & DEBATE HIGHLIGHT */}
                  <div className="mt-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                    <strong className="text-purple-300 block mb-0.5">Wiki Analysis & Debate:</strong>
                    {guide.debate}
                  </div>
                </div>

                {/* 1-CLICK COPY /GIVE COMMAND */}
                <div className="pt-4 border-t border-slate-800 mt-4 flex items-center justify-between gap-2">
                  <div className="font-mono text-[10px] text-slate-400 truncate max-w-[200px]">
                    1.20.5+ /give command
                  </div>
                  <button
                    onClick={() => copyCommandToClipboard(guide.giveCommand, guide.id)}
                    className="flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition-all shrink-0"
                  >
                    {copiedGuideId === guide.id ? <Check className="w-3.5 h-3.5 text-emerald-200" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedGuideId === guide.id ? 'Copied /give!' : 'Copy /give'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ========================================================================= */}
          {/* ANVIL BINARY MERGE TREE VISUAL TUTORIAL */}
          {/* ========================================================================= */}
          <div className="bg-slate-900/95 border-2 border-amber-500/50 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 bg-amber-950/60 border border-amber-500/40 rounded-xl flex items-center justify-center p-2 shrink-0">
                <GitBranch className="w-6 h-6 text-amber-400" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  ANVIL COMBINING MATHEMATICS
                </span>
                <h4 className="text-lg sm:text-xl font-bold text-slate-100">
                  {ANVIL_BINARY_TREE_TUTORIAL.title}
                </h4>
                <p className="text-xs text-slate-400">
                  {ANVIL_BINARY_TREE_TUTORIAL.subtitle}
                </p>
              </div>
            </div>

            {/* INTERACTIVE PENALTY CALCULATOR SLIDER */}
            <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-purple-400" />
                  Prior Work Penalty Simulator: Cost = 2ⁿ - 1
                </span>
                <span className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg border ${
                  priorWorkPenalty >= 6
                    ? 'bg-red-950 text-red-300 border-red-500 animate-pulse'
                    : priorWorkPenalty >= 4
                    ? 'bg-amber-950 text-amber-300 border-amber-500'
                    : 'bg-emerald-950 text-emerald-300 border-emerald-500'
                }`}>
                  Operation n = {priorWorkPenalty} | Prior Penalty = +{anvilPenaltyLevels} Lvl {isTooExpensive && '⚠️ "TOO EXPENSIVE!"'}
                </span>
              </div>

              <input 
                type="range"
                min="0"
                max="6"
                value={priorWorkPenalty}
                onChange={(e) => {
                  playPop();
                  setPriorWorkPenalty(parseInt(e.target.value, 10));
                }}
                className="w-full accent-amber-500 cursor-pointer"
              />

              <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px]">
                {[0, 1, 2, 3, 4, 5, 6].map(n => {
                  const p = n === 0 ? 0 : Math.pow(2, n) - 1;
                  return (
                    <div 
                      key={n} 
                      className={`p-1 rounded ${priorWorkPenalty === n ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 bg-black/40'}`}
                    >
                      <span>n={n}</span>
                      <span className="block text-[9px]">{p} lvl</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SIDE BY SIDE COMPARISON: LINEAR TRAP VS BINARY SUCCESS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LINEAR MERGE TRAP */}
              <div className="bg-red-950/30 border-2 border-red-500/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-red-300 font-bold text-sm">
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                  <span>The Linear Merge Trap (Sequential Adding)</span>
                </div>
                <p className="text-xs text-red-200/80 leading-relaxed">
                  Adding books onto an item one by one doubles the Prior Work Penalty every time: <code className="text-red-300 font-mono">Penalty = 2ⁿ - 1</code>.
                </p>

                <div className="space-y-1.5 font-mono text-xs">
                  {ANVIL_BINARY_TREE_TUTORIAL.linearFailure.map((step, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-black/40 p-2 rounded border border-red-900/40">
                      <span className="text-slate-300">{step.step}</span>
                      <span className="text-red-300 font-bold">{step.totalCost}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-red-400 bg-red-950/60 p-2.5 rounded border border-red-500/30 font-semibold">
                  ⚠️ Result: By Book 6, the anvil demands 42+ levels and shows <strong>"TOO EXPENSIVE!"</strong>, permanently locking the item in Survival!
                </div>
              </div>

              {/* BINARY TREE SOLUTION */}
              <div className="bg-emerald-950/30 border-2 border-emerald-500/40 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2 text-emerald-300 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>The Binary Merge Tree (Tournament Pairwise)</span>
                </div>
                <p className="text-xs text-emerald-200/80 leading-relaxed">
                  Combine books together in pairs first! When merging two items, the resulting penalty is <code className="text-emerald-300 font-mono">max(PenaltyA, PenaltyB) + 1</code>.
                </p>

                <div className="space-y-1.5 font-mono text-xs">
                  {ANVIL_BINARY_TREE_TUTORIAL.binaryTreeSuccess.map((step, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-black/40 p-2 rounded border border-emerald-900/40">
                      <span className="text-slate-300">{step.step}</span>
                      <span className="text-emerald-300 font-bold">{step.cost}</span>
                    </div>
                  ))}
                </div>
                <div className="text-[11px] text-emerald-300 bg-emerald-950/60 p-2.5 rounded border border-emerald-500/30 font-semibold">
                  ✨ Result: Total tree depth is only 3! Final step costs around 17–23 levels—guaranteed to succeed without exceeding the 39 level survival cap!
                </div>
              </div>
            </div>

            <div className="bg-black/60 p-4 rounded-xl border border-slate-800 text-xs text-amber-200/90 leading-relaxed">
              💡 <strong>The Golden Anvil Rule:</strong> {ANVIL_BINARY_TREE_TUTORIAL.goldenRule}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: INTERACTIVE ENCHANTING TABLE SIMULATOR */}
      {/* ========================================================================= */}
      {!searchResults.hasQuery && activeTab === 'simulator' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT CONFIGURATION PANEL */}
            <div className="lg:col-span-5 bg-slate-900/90 border border-slate-700/70 rounded-2xl p-5 shadow-xl space-y-5">
              <h3 className="text-lg font-bold text-purple-300 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Sliders className="w-5 h-5 text-purple-400" />
                Worktable Setup
              </h3>

              {/* 1. Item Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  1. Select Target Equipment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SIMULATOR_ITEMS.map(item => {
                    const isSelected = selectedItem.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          playClick();
                          setSelectedItem(item);
                          setEnchantedResult(null);
                        }}
                        className={`flex flex-col items-center p-2 rounded-xl border text-center transition-all ${
                          isSelected 
                            ? 'bg-purple-950/80 border-purple-400 text-purple-200 shadow-md shadow-purple-900/40' 
                            : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <img 
                          src={`/icons/minecraft/${item.icon}.svg`}
                          alt={item.name}
                          onError={(e) => { e.currentTarget.src = `/icons/minecraft/${item.icon}.png`; }}
                          className="w-8 h-8 object-contain mb-1 drop-shadow"
                        />
                        <span className="text-[11px] font-medium leading-tight truncate w-full">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 2. Bookshelf Slider */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
                    <img 
                      src="/icons/minecraft/bookshelf.svg" 
                      alt="Bookshelf" 
                      onError={(e) => { e.currentTarget.src = '/icons/minecraft/bookshelf.png'; }}
                      className="w-5 h-5"
                    />
                    Bookshelves Surrounding Table:
                  </span>
                  <span className="text-sm font-bold text-purple-400 bg-purple-950/80 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                    {bookshelfCount} / 15 ({maxTableLevel} Max Lvl)
                  </span>
                </div>
                <input 
                  type="range"
                  min="0"
                  max="15"
                  value={bookshelfCount}
                  onChange={(e) => {
                    playPop();
                    setBookshelfCount(parseInt(e.target.value, 10));
                  }}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <p className="text-[11px] text-slate-400 mt-1">
                  {bookshelfCount === 15 
                    ? '✨ Optimal setup: Level 30 max enchantments unlocked!' 
                    : `Requires 15 bookshelves placed with 1 air gap to achieve Level 30.`}
                </p>
              </div>

              {/* 3. Player Resources (Level & Lapis) */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      Player XP:
                    </span>
                    <span className="text-emerald-400 font-bold text-sm bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/40">
                      Lvl {playerLevel}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setPlayerLevel(prev => Math.min(60, prev + 5))}
                      className="flex-1 py-1 bg-emerald-900/40 hover:bg-emerald-800/60 text-emerald-300 text-xs font-bold rounded border border-emerald-700/50"
                    >
                      +5 Lvl
                    </button>
                    <button 
                      onClick={() => setPlayerLevel(30)}
                      className="py-1 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded"
                      title="Reset to 30"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-slate-400 flex items-center gap-1.5 font-medium">
                      <img 
                        src="/icons/minecraft/lapis_lazuli.svg" 
                        alt="Lapis" 
                        onError={(e) => { e.currentTarget.src = '/icons/minecraft/lapis_lazuli.png'; }}
                        className="w-4 h-4"
                      />
                      Lapis Lazuli:
                    </span>
                    <span className="text-blue-400 font-bold text-sm bg-blue-950/80 px-2 py-0.5 rounded border border-blue-500/40">
                      {playerLapis}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button 
                      onClick={() => setPlayerLapis(prev => prev + 16)}
                      className="flex-1 py-1 bg-blue-900/40 hover:bg-blue-800/60 text-blue-300 text-xs font-bold rounded border border-blue-700/50"
                    >
                      +16 Lapis
                    </button>
                    <button 
                      onClick={() => setPlayerLapis(32)}
                      className="py-1 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded"
                      title="Reset to 32"
                    >
                      Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT ENCHANTING TABLE GUI */}
            <div className="lg:col-span-7 bg-[#211d1a] border-4 border-[#3f3224] rounded-2xl p-6 shadow-2xl relative">
              <div className="flex items-center justify-between border-b-2 border-[#3f3224] pb-3 mb-5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 bg-[#3f3224] rounded flex items-center justify-center p-1">
                    <Wand2 className="w-4 h-4 text-purple-300" />
                  </div>
                  <h4 className="font-bold text-amber-200 tracking-wide text-base uppercase font-mono">
                    Enchanting Table
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-black/40 px-3 py-1 rounded border border-emerald-900/50">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Lapis Lazuli Slot Active
                </div>
              </div>

              {/* SLOTS & OFFERS CONTAINER */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                {/* INVENTORY SLOTS (LEFT) */}
                <div className="md:col-span-4 flex flex-col items-center justify-center gap-4 bg-black/40 p-4 rounded-xl border-2 border-[#3f3224]">
                  {/* Item Slot */}
                  <div className="text-center">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">Equipment</span>
                    <div className="w-20 h-20 bg-[#16120f] border-4 border-[#524131] rounded-lg flex items-center justify-center relative shadow-inner">
                      <img 
                        src={`/icons/minecraft/${selectedItem.icon}.svg`}
                        alt={selectedItem.name}
                        onError={(e) => { e.currentTarget.src = `/icons/minecraft/${selectedItem.icon}.png`; }}
                        className="w-12 h-12 object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                      />
                    </div>
                  </div>

                  {/* Lapis Lazuli Slot */}
                  <div className="text-center">
                    <span className="text-[11px] font-mono text-blue-400 block mb-1">Lapis Required</span>
                    <div className="w-16 h-16 bg-[#16120f] border-4 border-[#524131] rounded-lg flex items-center justify-center relative shadow-inner">
                      <img 
                        src="/icons/minecraft/lapis_lazuli.svg"
                        alt="Lapis Lazuli"
                        onError={(e) => { e.currentTarget.src = '/icons/minecraft/lapis_lazuli.png'; }}
                        className="w-9 h-9 object-contain"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-blue-300 text-xs font-mono font-bold px-1 rounded">
                        1–3
                      </span>
                    </div>
                  </div>
                </div>

                {/* 3 ENCHANTMENT OFFER ROWS (RIGHT) */}
                <div className="md:col-span-8 space-y-3">
                  {enchantmentOffers.map((offer) => {
                    const hasLevels = playerLevel >= offer.levelReq;
                    const hasLapis = playerLapis >= offer.lapisCost;
                    const canAfford = hasLevels && hasLapis;

                    return (
                      <div
                        key={offer.slot}
                        onClick={() => canAfford && handleEnchant(offer)}
                        className={`group relative p-3 rounded-lg border-2 transition-all cursor-pointer flex items-center justify-between ${
                          canAfford 
                            ? 'bg-[#312519] hover:bg-[#4a3622] border-[#6b4f32] hover:border-amber-400 text-amber-100 shadow-md' 
                            : 'bg-[#1a1410] border-[#292017] text-slate-500 opacity-60 cursor-not-allowed'
                        }`}
                      >
                        {/* SGA Runes & Translation */}
                        <div className="flex-1 pr-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-amber-400 font-mono">
                              Tier {offer.slot}
                            </span>
                            <span className="text-[11px] text-purple-300/80 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/20 font-mono">
                              Preview: {offer.previewName} ... ?
                            </span>
                          </div>

                          {/* Standard Galactic Alphabet Runes */}
                          <div className="mt-1 font-mono tracking-widest text-sm text-purple-300 select-none">
                            {offer.sgaRunic}
                          </div>
                          <div className="text-[10px] font-mono text-slate-400 group-hover:text-amber-200 transition-colors">
                            Deciphered: "{offer.sgaEnglish}"
                          </div>
                        </div>

                        {/* Cost & Requirements */}
                        <div className="flex flex-col items-end gap-1">
                          <div className={`flex items-center gap-1 font-mono font-bold text-xs px-2 py-1 rounded border ${
                            hasLevels 
                              ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300' 
                              : 'bg-red-950 border-red-500/40 text-red-400'
                          }`}>
                            <Zap className="w-3.5 h-3.5 text-emerald-400" />
                            Req Lvl {offer.levelReq}
                          </div>
                          <div className="text-[11px] font-mono text-slate-400">
                            Costs: -{offer.levelCost} Lvl & -{offer.lapisCost} Lapis
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* SIMULATION RESULT DISPLAY */}
              {enchantedResult && (
                <div className="mt-6 bg-[#16120f] border-2 border-purple-500/60 rounded-xl p-4 animate-in fade-in slide-in-from-top-4 duration-300 shadow-xl">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="relative p-2 bg-purple-950/80 border-2 border-purple-400 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                        <img 
                          src={`/icons/minecraft/${enchantedResult.icon}.svg`}
                          alt={enchantedResult.itemName}
                          onError={(e) => { e.currentTarget.src = `/icons/minecraft/${enchantedResult.icon}.png`; }}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div>
                        <h5 className="font-bold text-purple-200 text-base flex items-center gap-1.5">
                          <Sparkles className="w-4 h-4 text-purple-400" />
                          {enchantedResult.itemName}
                        </h5>
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {enchantedResult.enchants.map((e, idx) => (
                            <span key={idx} className="bg-purple-900/70 border border-purple-400/40 text-purple-200 text-xs px-2 py-0.5 rounded font-mono font-semibold">
                              {e.name} {e.level}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => copyCommandToClipboard(enchantedResult.command)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-3 py-2 rounded-lg shadow transition-all"
                      >
                        {copiedCommand ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                        {copiedCommand ? 'Copied /give!' : 'Copy /give Cmd'}
                      </button>
                      <button
                        onClick={handleDisenchant}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-3 py-2 rounded-lg border border-slate-600 shadow transition-all"
                        title="Disenchant on Grindstone (refunds XP)"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                        Grindstone Refund
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 bg-black/60 p-2.5 rounded-lg border border-slate-800 flex items-center justify-between font-mono text-xs text-purple-300 overflow-x-auto">
                    <code>{enchantedResult.command}</code>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: OBTAINING, ENCHANTABILITY & FORMULAS (WIKI & FANDOM) */}
      {/* ========================================================================= */}
      {!searchResults.hasQuery && activeTab === 'obtaining' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {OBTAINING_METHODS.map(method => (
              <div key={method.id} className="bg-slate-900/80 border border-slate-700/80 rounded-2xl p-6 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 bg-purple-950/60 border border-purple-500/40 rounded-xl flex items-center justify-center p-2.5 shadow">
                      <img 
                        src={`/icons/minecraft/${method.icon}.svg`}
                        alt={method.title}
                        onError={(e) => { e.currentTarget.src = `/icons/minecraft/${method.icon}.png`; }}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-200">{method.title}</h4>
                      <p className="text-xs text-slate-400">{method.desc}</p>
                    </div>
                  </div>

                  <div className="space-y-2 mt-4 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold text-purple-400 uppercase tracking-wider block mb-1">
                      Key Mechanics & Rules:
                    </span>
                    {method.mechanics.map((mech, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span>{mech}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* MATERIAL ENCHANTABILITY INDEX TABLE (FANDOM / WIKI) */}
          <div className="bg-slate-900/90 border border-purple-500/40 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <div>
                  <h4 className="text-lg font-bold text-purple-200">
                    Material Enchantability Index (Fandom & Wiki)
                  </h4>
                  <p className="text-xs text-slate-400">
                    Enchantability directly controls the probability of receiving top-tier enchantments and multiple secondary rolls.
                  </p>
                </div>
              </div>

              <span className="bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                Gold = #1 Highest Affinity
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono text-slate-300">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Material</th>
                    <th className="p-3">Tool Enchantability</th>
                    <th className="p-3">Armor Enchantability</th>
                    <th className="p-3">Rarity Tier</th>
                    <th className="p-3">Alchemical Behavior</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {ENCHANTABILITY_INDEX.map((mat, idx) => {
                    const isGold = mat.material === 'Gold';
                    return (
                      <tr key={idx} className={isGold ? 'bg-amber-950/20 hover:bg-amber-950/40' : 'hover:bg-slate-800/30'}>
                        <td className="p-3 font-bold text-amber-300 flex items-center gap-1.5">
                          {isGold && <Crown className="w-3.5 h-3.5 text-amber-400" />}
                          {mat.material}
                        </td>
                        <td className="p-3 text-purple-300 font-bold">{mat.toolEnchantability}</td>
                        <td className="p-3 text-emerald-300 font-bold">{mat.armorEnchantability}</td>
                        <td className="p-3 text-slate-300">{mat.rarityTier}</td>
                        <td className="p-3 text-slate-400">{mat.notes}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ENCHANTING TABLE MATHEMATICAL FORMULAS */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl space-y-4">
            <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <Sliders className="w-5 h-5 text-purple-400" />
              Enchanting Table Mathematical Algorithm (Fandom Wiki Specification)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ENCHANTING_FORMULAS.map((f, i) => (
                <div key={i} className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-xs font-bold text-purple-300 block">{f.step}</span>
                  <code className="text-xs text-amber-300 font-mono block bg-black/60 p-2 rounded border border-slate-800">
                    {f.formula}
                  </code>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{f.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: BEHAVIOR & INCOMPATIBILITIES (2) */}
      {/* ========================================================================= */}
      {!searchResults.hasQuery && activeTab === 'behavior' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
            <h3 className="text-xl font-bold text-purple-200 mb-2 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Mutual Incompatibility Rules & Conflict Matrices
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Certain enchantments are mutually exclusive in survival gameplay to prevent overpowered item combinations. Anvils and Enchanting Tables enforce these conflicts.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {INCOMPATIBILITY_RULES.map((rule, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-bold text-purple-300 text-sm">{rule.name}</h5>
                    <span className="bg-red-950 text-red-400 border border-red-500/40 text-[10px] font-bold px-2 py-0.5 rounded">
                      Mutually Exclusive
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 my-2.5">
                    {rule.items.map((it, i) => (
                      <span key={i} className="bg-purple-900/50 border border-purple-500/30 text-purple-200 text-xs px-2.5 py-1 rounded font-mono">
                        {it}
                      </span>
                    ))}
                  </div>
                  {rule.maceConflict.length > 0 && (
                    <div className="mt-2 text-xs text-amber-300/90 bg-amber-950/40 p-2 rounded border border-amber-500/20">
                      ⚡ <strong>Mace Conflict (1.21):</strong> {rule.maceConflict.join(' vs ')}
                    </div>
                  )}
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {rule.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: DISENCHANTING & GRINDSTONE (3) */}
      {/* ========================================================================= */}
      {!searchResults.hasQuery && activeTab === 'disenchanting' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-slate-950 border-2 border-slate-700 rounded-2xl flex items-center justify-center p-3 shadow-inner">
                <img 
                  src={`/icons/minecraft/${DISENCHANTING_MECHANICS.workstationIcon}.svg`}
                  alt={DISENCHANTING_MECHANICS.workstation}
                  onError={(e) => { e.currentTarget.src = `/icons/minecraft/${DISENCHANTING_MECHANICS.workstationIcon}.png`; }}
                  className="w-12 h-12 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-100">{DISENCHANTING_MECHANICS.workstation} Mechanics</h3>
                <p className="text-sm text-slate-400">{DISENCHANTING_MECHANICS.description}</p>
              </div>
            </div>

            {/* INTERACTIVE GRINDSTONE XP REFUND CALCULATOR */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 mb-6 space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-purple-300 flex items-center gap-1.5">
                  <Calculator className="w-4 h-4 text-purple-400" />
                  Grindstone XP Refund Calculator
                </h4>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40">
                  Refund ≈ +{Math.floor(grindstoneEnchantCount * 4) + 2} to +{Math.floor(grindstoneEnchantCount * 7) + 5} XP Points
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-400 whitespace-nowrap">Number of Enchantments on Item:</span>
                <input 
                  type="range"
                  min="1"
                  max="7"
                  value={grindstoneEnchantCount}
                  onChange={(e) => {
                    playPop();
                    setGrindstoneEnchantCount(parseInt(e.target.value, 10));
                  }}
                  className="w-full accent-purple-500 cursor-pointer"
                />
                <span className="text-xs font-bold font-mono text-purple-300 min-w-[30px] text-right">
                  {grindstoneEnchantCount}x
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Formula: Each enchantment yields between 50% and 100% of the minimum sacrifice levels converted directly into experience orbs. Prior work penalties are also completely wiped!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {DISENCHANTING_MECHANICS.rules.map((rule, idx) => (
                <div key={idx} className="bg-slate-950/70 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-purple-400 mb-1.5 block">
                      Rule 0{idx + 1}
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {rule}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-red-950/40 border border-red-500/40 rounded-xl p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <h5 className="text-sm font-bold text-red-300">Curse Indelibility Warning</h5>
                <p className="text-xs text-red-200/80 mt-1">
                  The Grindstone cannot strip <strong>Curse of Binding</strong> or <strong>Curse of Vanishing</strong>. If an item has both normal enchantments and a curse, the normal enchantments will be removed for experience, but the curse will permanently remain intact on the item.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: ALL 42 ENCHANTMENTS CODEX (4.1 & 4.2) */}
      {/* ========================================================================= */}
      {!searchResults.hasQuery && activeTab === 'codex' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-wrap gap-2">
              {codexCategories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    playClick();
                    setSelectedCodexCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    selectedCodexCategory === cat 
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                      : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCodexEnchantments.map(ench => (
              <div 
                key={ench.id}
                className="bg-slate-900/90 border border-slate-700/70 hover:border-purple-500/60 rounded-2xl p-4 shadow-lg hover:shadow-purple-900/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 bg-slate-950 border border-purple-500/30 rounded-xl flex items-center justify-center p-2 shadow-inner">
                        <img 
                          src={`/icons/minecraft/${ench.primaryIcon}.svg`}
                          alt={ench.name}
                          onError={(e) => { e.currentTarget.src = `/icons/minecraft/${ench.primaryIcon}.png`; }}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-slate-100 text-base flex items-center gap-1.5">
                          {ench.name}
                          <span className="text-purple-400 font-mono text-sm">
                            {ench.maxRoman}
                          </span>
                        </h4>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {ench.category}
                        </span>
                      </div>
                    </div>

                    <span className="bg-purple-950/80 border border-purple-500/30 text-purple-300 text-[10px] font-mono px-2 py-0.5 rounded">
                      {ench.version}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed my-3">
                    {ench.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                    <span className="text-slate-400">Rarity:</span>
                    <span className="text-purple-300 font-semibold">{ench.rarity}</span>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                    <span className="text-slate-400">Applies To:</span>
                    <span className="text-slate-200 font-mono">{ench.items.join(', ')}</span>
                  </div>

                  {ench.incompatible.length > 0 && (
                    <div className="flex flex-wrap items-center justify-between gap-1 text-[11px]">
                      <span className="text-red-400">Conflicts:</span>
                      <span className="text-red-300/90 font-mono">{ench.incompatible.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: ENCHANTMENTS BY ITEM MATRIX (4.2) */}
      {/* ========================================================================= */}
      {!searchResults.hasQuery && activeTab === 'matrix' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ITEM_ENCHANTMENT_MATRIX.map((itemGroup, idx) => (
              <div key={idx} className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-purple-950/50 border border-purple-500/30 rounded-xl flex items-center justify-center p-2">
                      <img 
                        src={`/icons/minecraft/${itemGroup.icon}.svg`}
                        alt={itemGroup.category}
                        onError={(e) => { e.currentTarget.src = `/icons/minecraft/${itemGroup.icon}.png`; }}
                        className="w-8 h-8 object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-100 text-base">{itemGroup.category}</h4>
                      <span className="text-[11px] text-purple-400">{itemGroup.enchantments.length} Available Enchants</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 my-3">
                    {itemGroup.enchantments.map((ench, i) => (
                      <span key={i} className="bg-slate-950 border border-slate-800 text-purple-200 text-xs px-2.5 py-1 rounded font-medium">
                        {ench}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mt-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                  💡 {itemGroup.notes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: EPF CAPS, DATA VALUES, SOUNDS & HISTORY (5, 6, 7, 8, 9, 11) */}
      {/* ========================================================================= */}
      {!searchResults.hasQuery && activeTab === 'epf' && (
        <div className="space-y-8 animate-in fade-in duration-200">
          
          {/* SECTION 5: EPF CAP MATHEMATICS & INTERACTIVE CALCULATOR */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center justify-center p-2">
                <Shield className="w-7 h-7 text-emerald-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-emerald-200">
                  Section 5: Environmental Protection Factor (EPF) 20 Cap
                </h4>
                <p className="text-xs text-slate-400">
                  Total EPF is capped at <strong>20</strong>, giving an absolute maximum damage reduction of <strong>80%</strong> (4% per EPF point).
                </p>
              </div>
            </div>

            {/* INTERACTIVE EPF DAMAGE REDUCTION METER */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300">Live Armor Set EPF Calculation</span>
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40">
                  General EPF: {effectiveGeneralEpf}/20 ({generalDamageReduction}% Damage Cut) | Fall EPF: {effectiveFallEpf}/20 ({fallDamageReduction}% Cut)
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-slate-400">General Damage Reduction:</span>
                  <span className="text-emerald-300 font-bold">{generalDamageReduction}% (Max 80%)</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-700 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-600 to-teal-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${(effectiveGeneralEpf / 20) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {[
                  { key: 'helmet', label: 'Helmet (Prot IV)', factor: 4 },
                  { key: 'chestplate', label: 'Chestplate (Prot IV)', factor: 4 },
                  { key: 'leggings', label: 'Leggings (Prot IV)', factor: 4 },
                  { key: 'boots', label: 'Boots (Prot IV)', factor: 4 }
                ].map(item => {
                  const isChecked = epfSelections[item.key] > 0;
                  return (
                    <button
                      key={item.key}
                      onClick={() => {
                        playClick();
                        setEpfSelections(prev => ({
                          ...prev,
                          [item.key]: isChecked ? 0 : item.factor
                        }));
                      }}
                      className={`p-2 rounded-xl text-xs font-mono border transition-all text-center ${
                        isChecked 
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300' 
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}
                    >
                      {item.label}: {isChecked ? '+4 EPF' : 'None'}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300 font-mono">
                <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="p-3">Protection Type</th>
                    <th className="p-3">Factor / Level</th>
                    <th className="p-3">Max EPF (Piece)</th>
                    <th className="p-3">Cap Rule & Secondary Bonuses</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {EPF_CAP_DATA.map((epf, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/30">
                      <td className="p-3 font-bold text-emerald-300">{epf.type}</td>
                      <td className="p-3 text-slate-200">{epf.factorPerLevel}</td>
                      <td className="p-3 text-purple-300">{epf.maxEPF} EPF</td>
                      <td className="p-3 text-slate-400">{epf.capRule}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* SECTION 6: MODERN DATA COMPONENTS */}
          <div className="bg-slate-900/90 border border-purple-500/40 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-950/60 border border-purple-500/40 rounded-xl flex items-center justify-center p-2">
                <Copy className="w-7 h-7 text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-purple-200">
                  Section 6: Java 1.20.5+ / 1.21 Data Components Syntax
                </h4>
                <p className="text-xs text-slate-400">
                  Mojang permanently phased out raw string-based NBT formatting for items in Java 1.20.5 in favor of type-safe brackets.
                </p>
              </div>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-emerald-400 font-bold block mb-1">Modern Java 1.21 Mace /give Command:</span>
                <code className="text-purple-300 break-all">{DATA_COMPONENT_EXAMPLES.modernMace}</code>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <span className="text-blue-400 font-bold block mb-1">Stored Enchantments (Enchanted Book):</span>
                <code className="text-purple-300 break-all">{DATA_COMPONENT_EXAMPLES.modernStoredBook}</code>
              </div>
            </div>
          </div>

          {/* SECTION 11: CHRONOLOGICAL HISTORY TIMELINE */}
          <div className="bg-slate-900/90 border border-slate-700/80 rounded-2xl p-6 shadow-xl">
            <h4 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
              <History className="w-5 h-5 text-purple-400" />
              Section 11: Enchanting Development History (Beta to 1.21 Tricky Trials)
            </h4>
            <div className="space-y-4 relative border-l-2 border-purple-500/40 ml-4 pl-6">
              {ENCHANTING_HISTORY.map((hist, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 rounded-full bg-purple-500 border-2 border-slate-900"></div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-purple-300 text-xs">{hist.version}</span>
                    <span className="text-[11px] text-slate-500 font-mono">({hist.date})</span>
                  </div>
                  <h5 className="font-semibold text-slate-200 text-sm mt-0.5">{hist.title}</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{hist.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}