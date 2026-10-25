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
import { GOD_GEAR_PRESETS } from '../data/godGearPresets';
import { PRIMARY_ITEM_CATALOG } from '../data/primaryEnchantmentCatalog';
import EnchantmentConflictMatrix from './EnchantmentConflictMatrix';
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
  Filter,
  CheckSquare,
  Undo2,
  RefreshCw,
  SlidersHorizontal,
  Bookmark
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

function sanitizeSearchQuery(raw) {
  if (!raw) return '';
  return raw
    .toLowerCase()
    .replace(/\b(i want|i need|give me|show me|find me|how to get|what is|search for|a|the|an)\b/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

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

export default function EnchantmentLab() {
  // Navigation Tabs: 'god_gear' | 'simulator' | 'matrix' | 'anvil_tree' | 'grindstone' | 'codex' | 'matrix_legacy' | 'epf'
  const [activeTab, setActiveTab] = useState('god_gear');
  
  // 02 · Primary Action Item Selector State
  const [selectedPrimaryItemId, setSelectedPrimaryItemId] = useState('sword');
  const [copiedItemEnchId, setCopiedItemEnchId] = useState(null);

  // Universal Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategoryFilter, setSearchCategoryFilter] = useState('all'); // 'all' | 'god' | 'codex' | 'mechanics' | 'materials' | 'matrix'
  
  // Codex category filter
  const [selectedCodexCategory, setSelectedCodexCategory] = useState('All');
  
  // God Gear Playstyle Presets State
  const [selectedPresetId, setSelectedPresetId] = useState(GOD_GEAR_PRESETS[0].id);
  const [copiedPresetAll, setCopiedPresetAll] = useState(false);
  const [copiedItemGiveKey, setCopiedItemGiveKey] = useState(null);

  // Simulator state
  const [selectedItem, setSelectedItem] = useState(SIMULATOR_ITEMS[0]);
  const [bookshelfCount, setBookshelfCount] = useState(15);
  const [playerLevel, setPlayerLevel] = useState(30);
  const [playerLapis, setPlayerLapis] = useState(32);
  const [enchantedResult, setEnchantedResult] = useState(null);
  const [copiedCommand, setCopiedCommand] = useState(false);
  const [priorWorkPenalty, setPriorWorkPenalty] = useState(0); // 0 to 6
  const [simHistory, setSimHistory] = useState([]); // Undo stack: { level, lapis, result }

  // Interactive Tools state
  const [grindstoneEnchantCount, setGrindstoneEnchantCount] = useState(3);
  const [epfSelections, setEpfSelections] = useState({
    helmet: 4, // Protection IV = 4 EPF
    chestplate: 4, // Protection IV = 4 EPF
    leggings: 4, // Protection IV = 4 EPF
    boots: 4, // Protection IV = 4 EPF
    featherFalling: 12 // Feather Falling IV = 12 EPF
  });

  // Selected item from Primary Catalog
  const currentPrimaryItem = useMemo(() => {
    return PRIMARY_ITEM_CATALOG.find(i => i.id === selectedPrimaryItemId) || PRIMARY_ITEM_CATALOG[0];
  }, [selectedPrimaryItemId]);

  // Selected God Gear Preset
  const currentPreset = useMemo(() => {
    return GOD_GEAR_PRESETS.find(p => p.id === selectedPresetId) || GOD_GEAR_PRESETS[0];
  }, [selectedPresetId]);

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

    // Match God Equipment Presets
    const matchedGod = GOD_GEAR_PRESETS.filter(preset => {
      const targetStr = [
        preset.name,
        preset.badge,
        preset.description,
        preset.tradeOff,
        ...(preset.highlights || []),
        ...preset.armor.map(a => `${a.piece} ${a.item} ${a.enchants.join(' ')}`),
        ...preset.weaponsAndTools.map(w => `${w.name} ${w.item} ${w.enchants.join(' ')}`)
      ].join(' ').toLowerCase();

      return searchTokens.every(token => targetStr.includes(token));
    });

    const isGodArmorMatch = searchClean.includes('armor') || searchClean.includes('god') || searchClean.includes('epf');

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
      lowerClean.includes('prior work') ||
      lowerClean.includes('repair')
    ) {
      matchedMechanics.push({
        id: 'mech_anvil',
        type: 'Anvil Tutorial',
        title: ANVIL_BINARY_TREE_TUTORIAL.title,
        subtitle: ANVIL_BINARY_TREE_TUTORIAL.subtitle,
        desc: ANVIL_BINARY_TREE_TUTORIAL.goldenRule,
        targetTab: 'anvil_tree',
        badge: 'Anvil Math'
      });
    }

    if (
      lowerClean.includes('formula') || 
      lowerClean.includes('bookshelf') || 
      lowerClean.includes('algorithm') || 
      lowerClean.includes('math')
    ) {
      matchedMechanics.push({
        id: 'mech_formula',
        type: 'Enchanting Algorithm',
        title: 'Enchanting Table Mathematical Formula',
        subtitle: 'Slot Level & Triangular Distribution Factor',
        desc: 'Base Level = random(1, 8) + floor(Bookshelves/2) + random(0, Bookshelves). With 15 bookshelves, guarantees Level 30 bottom slot.',
        targetTab: 'simulator',
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
        targetTab: 'grindstone',
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
        targetTab: 'matrix',
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

  // Filtered Codex Enchantments
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

  // Generate 3 authentic pseudo-random enchanting offers for simulator
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

  // Execute Enchantment in Simulator
  const handleEnchant = (offer) => {
    if (playerLevel < offer.levelReq) {
      alert(`Insufficient experience! You require Level ${offer.levelReq} (You currently have Level ${playerLevel}).`);
      return;
    }
    if (playerLapis < offer.lapisCost) {
      alert(`Insufficient Lapis Lazuli! You need ${offer.lapisCost} Lapis Lazuli.`);
      return;
    }

    // Save previous state to history stack for Undo
    setSimHistory(prev => [
      ...prev,
      {
        playerLevel,
        playerLapis,
        enchantedResult
      }
    ]);

    playLevelUp();
    playPop();
    confetti({
      particleCount: 45,
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

  // Undo Last Simulator Enchantment
  const handleUndoSimulator = () => {
    if (!simHistory.length) return;
    playPop();
    const lastState = simHistory[simHistory.length - 1];
    setPlayerLevel(lastState.playerLevel);
    setPlayerLapis(lastState.playerLapis);
    setEnchantedResult(lastState.enchantedResult);
    setSimHistory(prev => prev.slice(0, prev.length - 1));
  };

  // Reset Simulator Worktable
  const handleResetSimulator = () => {
    playPop();
    setPlayerLevel(30);
    setPlayerLapis(32);
    setBookshelfCount(15);
    setEnchantedResult(null);
    setSimHistory([]);
  };

  // Disenchant on Grindstone inside Simulator
  const handleDisenchant = () => {
    if (!enchantedResult) return;
    playPop();
    const refundedXp = Math.floor(enchantedResult.enchants.length * 4) + 2;
    setPlayerLevel(prev => prev + refundedXp);
    setEnchantedResult(null);
  };

  // 1-Click Copy Command
  const copyCommandToClipboard = (cmd) => {
    navigator.clipboard.writeText(cmd);
    playClick();
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2500);
  };

  // Copy Single Enchantment Give Command from Item Selector
  const handleCopyItemEnchantCommand = (ench) => {
    const itemId = currentPrimaryItem.itemKey;
    const level = romanToInt(ench.maxNormal);
    const cmd = `/give @p ${itemId}[minecraft:enchantments={levels:{'minecraft:${ench.id}':${level}}}] 1`;
    navigator.clipboard.writeText(cmd);
    playClick();
    setCopiedItemEnchId(ench.id);
    setTimeout(() => setCopiedItemEnchId(null), 2200);
  };

  // Copy All Commands for a God Gear Preset
  const handleCopyPresetAllCommands = () => {
    const allLines = [];
    currentPreset.armor.forEach(a => {
      const enchMap = a.enchants.map(e => {
        const parts = e.split(' ');
        const namePart = parts.slice(0, -1).join('_').toLowerCase();
        const lvlPart = romanToInt(parts[parts.length - 1]);
        return `'minecraft:${namePart}':${lvlPart}`;
      }).join(',');
      const itemKey = a.item.toLowerCase().replace(/\s+/g, '_');
      allLines.push(`/give @p ${itemKey}[minecraft:enchantments={levels:{${enchMap}}}] 1`);
    });
    currentPreset.weaponsAndTools.forEach(w => {
      if (w.name.includes('Formula')) return;
      const enchMap = w.enchants.map(e => {
        const parts = e.split(' ');
        const namePart = parts.slice(0, -1).join('_').toLowerCase();
        const lvlPart = romanToInt(parts[parts.length - 1]);
        return `'minecraft:${namePart}':${lvlPart}`;
      }).join(',');
      const itemKey = w.item === 'The Mace' ? 'mace' : w.item.toLowerCase().replace(/\s+/g, '_');
      allLines.push(`/give @p ${itemKey}[minecraft:enchantments={levels:{${enchMap}}}] 1`);
    });

    navigator.clipboard.writeText(allLines.join('\n'));
    playLevelUp();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.5 },
      colors: ['#10b981', '#3b82f6', '#a855f7']
    });
    setCopiedPresetAll(true);
    setTimeout(() => setCopiedPresetAll(false), 3000);
  };

  // Copy Single Piece Give Command from Preset
  const handleCopySinglePresetItem = (piece, key) => {
    const enchMap = piece.enchants.map(e => {
      const parts = e.split(' ');
      const namePart = parts.slice(0, -1).join('_').toLowerCase();
      const lvlPart = romanToInt(parts[parts.length - 1]);
      return `'minecraft:${namePart}':${lvlPart}`;
    }).join(',');
    const itemKey = piece.item === 'The Mace' ? 'mace' : piece.item.toLowerCase().replace(/\s+/g, '_');
    const cmd = `/give @p ${itemKey}[minecraft:enchantments={levels:{${enchMap}}}] 1`;
    navigator.clipboard.writeText(cmd);
    playClick();
    setCopiedItemGiveKey(key);
    setTimeout(() => setCopiedItemGiveKey(null), 2200);
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
    // Normalize target tabs
    const targetMap = {
      best_guide: 'god_gear',
      behavior: 'matrix',
      obtaining: 'anvil_tree',
      disenchanting: 'grindstone',
      simulator: 'simulator',
      codex: 'codex',
      epf: 'epf',
      matrix: 'matrix_legacy'
    };
    setActiveTab(targetMap[tabId] || tabId);
    setSearchQuery('');
    const el = document.getElementById('enchanting');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="enchanting" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-slate-100 font-sans">
      
      {/* ========================================================================= */}
      {/* 01 · PAGE HEADER & ENCHANTING TABLE CENTERPIECE */}
      {/* ========================================================================= */}
      <div className="bg-[#12131b] border-2 border-[#2b2d3e] hover:border-purple-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden mb-8 transition-colors">
        {/* Subtle decorative background runes */}
        <div className="absolute -top-12 -right-8 opacity-5 select-none font-mono text-7xl text-purple-300 pointer-events-none">
          ᓵ ᔑ ↸ ᒷ ⎓ ⊣
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          {/* Recognizable Enchanting Table Centerpiece */}
          <div className="relative group shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#181926] border-2 border-[#3d405b] group-hover:border-purple-400 rounded-2xl flex items-center justify-center p-3 shadow-inner shadow-purple-950/40 transition-all">
              <img 
                src="/icons/minecraft/enchanting_table.svg" 
                alt="Enchanting Table Centerpiece"
                onError={(e) => { e.currentTarget.src = '/icons/minecraft/enchanting_table.png'; }}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain filter drop-shadow-[0_4px_12px_rgba(168,85,247,0.4)]"
              />
            </div>
            {/* Runes floating badge */}
            <div className="absolute -bottom-2 -right-2 bg-purple-950 border border-purple-400/60 rounded-md px-1.5 py-0.5 text-[9px] font-mono text-purple-200 shadow">
              SGA ᔑ↸
            </div>
          </div>

          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
              <span className="bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Supported: {GAME_VERSION_CONFIG.toolCompatibility.enchanting.versionBadge}</span>
              </span>
              <span className="bg-slate-800/80 border border-slate-700 text-slate-300 text-[11px] font-mono px-2 py-0.5 rounded-full">
                Syntax: 1.20.5+ Components
              </span>
              <span className="text-xs font-mono text-zinc-400">
                Verified: {GAME_VERSION_CONFIG.toolCompatibility.enchanting.lastVerified}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center justify-center md:justify-start gap-2.5">
              <span>Enchantment Laboratory</span>
            </h2>
            <p className="mt-1 text-slate-300 text-xs sm:text-sm leading-relaxed max-w-3xl">
              Select any equipment item to inspect compatible enchantments, plain-English effects, obtaining channels, and mutual conflicts. Explore God Gear playstyle presets, interactive table simulations, and anvil merge algorithms verified against the official <a href="https://minecraft.wiki/w/Enchantment" target="_blank" rel="noopener noreferrer" className="text-purple-300 underline hover:text-purple-200">Minecraft Wiki</a>.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* COMPACT SEARCH FIELD & QUICK CHIPS */}
        {/* ========================================================================= */}
        <div className="mt-6 pt-5 border-t border-[#2b2d3e] relative z-10">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-mono font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
              <Search className="w-3.5 h-3.5 text-purple-400" />
              Search Enchantments &amp; Mechanics
            </span>
            {searchQuery && (
              <span className="text-[11px] font-mono text-emerald-400">
                Filtering for "{searchQuery}"
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
              className="w-full bg-[#0d0e15] border border-[#2e3146] hover:border-purple-400 focus:border-emerald-400 rounded-xl pl-11 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
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
                    : 'bg-[#181926] text-slate-300 border-[#2e3146] hover:border-purple-400 hover:text-white'
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* UNIVERSAL SEARCH RESULTS PANEL (Displayed when searching) */}
      {/* ========================================================================= */}
      {searchResults.hasQuery ? (
        <div className="space-y-6 mb-12 animate-in fade-in duration-200">
          <div className="bg-[#12131b] border-2 border-purple-500/50 rounded-2xl p-5 shadow-2xl">
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
                  { id: 'mechanics', label: `⚡ Mechanics (${searchResults.mechanicItems.length})` }
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
                        : 'bg-[#181926] text-slate-300 hover:bg-[#25283d] border border-slate-700/60'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Search Result Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.godItems.map(p => (
              <div key={p.id} className="bg-[#12131b] border border-emerald-500/40 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-emerald-400">{p.badge}</span>
                    <span className="bg-emerald-950 text-emerald-300 text-[10px] font-mono px-2 py-0.5 rounded">Preset</span>
                  </div>
                  <h4 className="font-bold text-white text-base">{p.name}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{p.description}</p>
                </div>
                <button
                  onClick={() => {
                    setSelectedPresetId(p.id);
                    jumpToTab('god_gear');
                  }}
                  className="mt-4 flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold py-1.5 px-3 rounded-lg transition-all"
                >
                  <span>Open God Gear Preset</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}

            {searchResults.codexItems.map(e => (
              <div key={e.id} className="bg-[#12131b] border border-purple-500/30 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-bold text-white text-base">{e.name} {e.maxRoman}</h4>
                    <span className="text-[10px] font-mono text-purple-300 bg-purple-950 px-2 py-0.5 rounded">{e.category}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{e.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Applies to: {e.items.slice(0, 2).join(', ')}</span>
                  <button 
                    onClick={() => jumpToTab('codex')}
                    className="text-purple-300 hover:underline"
                  >
                    View in Codex →
                  </button>
                </div>
              </div>
            ))}

            {searchResults.mechanicItems.map(m => (
              <div key={m.id} className="bg-[#12131b] border border-amber-500/40 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">{m.badge}</span>
                  <h4 className="font-bold text-white text-base mt-1">{m.title}</h4>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{m.desc}</p>
                </div>
                <button
                  onClick={() => jumpToTab(m.targetTab)}
                  className="mt-4 flex items-center justify-center gap-1.5 bg-amber-700 hover:bg-amber-600 text-white text-xs font-semibold py-1.5 px-3 rounded-lg transition-all"
                >
                  <span>Jump to {m.badge}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* ========================================================================= */}
          {/* 02 · PRIMARY ACTION: ITEM SELECTOR */}
          {/* ========================================================================= */}
          <div className="bg-[#12131b] border-2 border-[#2b2d3e] rounded-3xl p-6 sm:p-7 shadow-xl mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckSquare className="w-4 h-4 text-emerald-400" />
                  02 · Primary Action: Choose an Item
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Inspect All Compatible Enchantments &amp; Rules
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                12 Equipment Classes Available
              </span>
            </div>

            {/* 12 Primary Equipment Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
              {PRIMARY_ITEM_CATALOG.map(item => {
                const isSelected = selectedPrimaryItemId === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playClick();
                      setSelectedPrimaryItemId(item.id);
                    }}
                    className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'bg-purple-950/80 border-purple-400 text-white shadow-lg shadow-purple-950/50 scale-[1.02]'
                        : 'bg-[#181926] border-[#2e3146] text-slate-300 hover:bg-[#202234] hover:border-slate-500'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-black/40 border border-slate-700/60 flex items-center justify-center p-1 shrink-0">
                      <img 
                        src={`/icons/minecraft/${item.icon}.svg`}
                        alt={item.name}
                        onError={(e) => { e.currentTarget.src = `/icons/minecraft/${item.icon}.png`; }}
                        className="w-6 h-6 object-contain"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-bold truncate text-slate-100">{item.name}</div>
                      <div className="text-[10px] text-purple-300/80 font-mono truncate">{item.enchants.length} Enchants</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* ========================================================================= */}
            {/* 03 · RESULTS: COMPATIBLE ENCHANTMENTS FOR SELECTED ITEM */}
            {/* ========================================================================= */}
            <div className="mt-6 pt-5 border-t border-[#2b2d3e]">
              <div className="bg-[#181926] border border-[#2e3146] rounded-2xl p-4 sm:p-5 mb-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 bg-black/50 border border-purple-500/40 rounded-xl flex items-center justify-center p-2 shrink-0">
                    <img 
                      src={`/icons/minecraft/${currentPrimaryItem.icon}.svg`}
                      alt={currentPrimaryItem.name}
                      onError={(e) => { e.currentTarget.src = `/icons/minecraft/${currentPrimaryItem.icon}.png`; }}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-lg font-bold text-white">{currentPrimaryItem.name}</h4>
                      <span className="bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-mono px-2 py-0.2 rounded font-semibold">
                        {currentPrimaryItem.enchants.length} Compatible
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{currentPrimaryItem.summary}</p>
                  </div>
                </div>

                {/* Pro Tip Box */}
                <div className="bg-[#0e0f17] border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200/90 max-w-md">
                  <div className="flex items-center gap-1.5 font-bold text-amber-300 text-[11px] uppercase tracking-wider mb-0.5">
                    <Info className="w-3.5 h-3.5" />
                    Optimal Strategy Tip
                  </div>
                  {currentPrimaryItem.tip}
                </div>
              </div>

              {/* Grid of Compatible Enchantment Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPrimaryItem.enchants.map(ench => {
                  return (
                    <div 
                      key={ench.id}
                      className="bg-[#141522] border border-[#2e3146] hover:border-purple-500/50 rounded-xl p-4 transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Header: Title and Levels */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h5 className="font-bold text-white text-sm flex items-center gap-1.5">
                              <span>{ench.name}</span>
                              <span className="text-purple-300 font-mono text-xs">{ench.maxNormal}</span>
                            </h5>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] font-mono text-emerald-400">
                                Max Normal: Level {ench.maxNormal}
                              </span>
                              <span className="text-[10px] font-mono text-slate-500">
                                • Command Max: {ench.commandMax}
                              </span>
                            </div>
                          </div>

                          <div className="w-8 h-8 bg-black/40 border border-purple-500/30 rounded-lg flex items-center justify-center p-1 shrink-0">
                            <img 
                              src="/icons/minecraft/enchanted_book.svg"
                              alt="Enchanted Book"
                              onError={(e) => { e.currentTarget.src = '/icons/minecraft/enchanted_book.png'; }}
                              className="w-5 h-5 object-contain"
                            />
                          </div>
                        </div>

                        {/* Plain English Effect Description */}
                        <p className="text-xs text-slate-300 leading-relaxed mt-2 mb-3">
                          {ench.effect}
                        </p>

                        {/* Obtaining Methods Badges */}
                        <div className="space-y-1 mb-2">
                          <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">
                            Obtaining:
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {ench.obtaining.map((method, mi) => (
                              <span 
                                key={mi}
                                className="bg-[#1b1d2e] border border-slate-700 text-slate-300 text-[10px] font-mono px-1.5 py-0.5 rounded"
                              >
                                {method}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Explicit Non-Color Mutual Incompatibility Indicator */}
                        {ench.conflicts && ench.conflicts.length > 0 && (
                          <div className="bg-amber-950/40 border border-amber-500/40 rounded-lg p-2 mt-2 flex items-start gap-1.5 text-xs text-amber-200">
                            <XCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold block text-[11px] text-amber-300">
                                ✕ Incompatible with:
                              </span>
                              <span className="font-mono text-[11px] text-amber-100">
                                {ench.conflicts.join(', ')}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Quick Copy /give Command for this Enchantment */}
                      <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono text-slate-500">1.20.5+ Component</span>
                        <button
                          onClick={() => handleCopyItemEnchantCommand(ench)}
                          className="flex items-center gap-1 bg-[#202234] hover:bg-purple-900/50 hover:border-purple-400 text-slate-200 hover:text-white text-[11px] font-mono font-semibold px-2 py-1 rounded border border-slate-700 transition-all shrink-0"
                          title="Copy Minecraft 1.20.5+ /give command for this item and enchantment"
                        >
                          {copiedItemEnchId === ench.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-slate-400" />
                              <span>Copy /give</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* 04 · ADVANCED ENGINEERING TOOLS TABS */}
          {/* ========================================================================= */}
          <div className="bg-[#12131b] border-2 border-[#2b2d3e] rounded-3xl p-6 sm:p-7 shadow-xl mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 border-b border-[#2b2d3e] pb-3">
              <div>
                <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <SlidersHorizontal className="w-4 h-4 text-purple-400" />
                  04 · Advanced Engineering Tools
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                  Calculators, Preset Loadouts &amp; Merge Trees
                </h3>
              </div>

              {/* Mobile Tool Selector */}
              <div className="sm:hidden w-full">
                <select
                  value={activeTab}
                  onChange={(e) => {
                    playClick();
                    setActiveTab(e.target.value);
                  }}
                  aria-label="Select Advanced Tool"
                  className="w-full bg-[#181926] border border-purple-500/40 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                  <option value="god_gear">🏆 God Gear &amp; Playstyle Presets</option>
                  <option value="simulator">🔮 Enchanting Table Simulator</option>
                  <option value="matrix">⚡ Incompatibilities &amp; Conflict Matrix</option>
                  <option value="anvil_tree">🔨 Anvil Optimizer &amp; Prior Work</option>
                  <option value="grindstone">🪨 Grindstone &amp; Disenchanting</option>
                  <option value="codex">📖 All 42 Enchantments Codex</option>
                  <option value="matrix_legacy">⚔️ Item Enchantment Matrix</option>
                  <option value="epf">🛡️ EPF Caps &amp; Data Components</option>
                </select>
              </div>
            </div>

            {/* Desktop Flex-Wrap Tabs (No clipping!) */}
            <div className="hidden sm:flex flex-wrap items-center gap-2 mb-6">
              {[
                { id: 'god_gear', label: 'God Gear Presets', icon: Trophy, count: GOD_GEAR_PRESETS.length },
                { id: 'simulator', label: 'Enchanting Simulator', icon: Sparkles },
                { id: 'matrix', label: 'Conflict Matrix', icon: Zap, count: INCOMPATIBILITY_RULES.length },
                { id: 'anvil_tree', label: 'Anvil Optimizer', icon: Hammer },
                { id: 'grindstone', label: 'Grindstone', icon: RotateCcw },
                { id: 'codex', label: 'All 42 Enchants', icon: BookOpen, count: ENCHANTMENTS_LIST.length },
                { id: 'matrix_legacy', label: 'Item Matrix', icon: Sword, count: ITEM_ENCHANTMENT_MATRIX.length },
                { id: 'epf', label: 'EPF & Components', icon: Shield }
              ].map(tab => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      playClick();
                      setActiveTab(tab.id);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive 
                        ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400' 
                        : 'bg-[#181926] text-slate-300 hover:bg-[#202234] hover:text-white border border-[#2e3146]'
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

            {/* ========================================================================= */}
            {/* TAB 1: GOD GEAR & PLAYSTYLE PRESETS */}
            {/* ========================================================================= */}
            {activeTab === 'god_gear' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                {/* 6 Preset Selector Pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {GOD_GEAR_PRESETS.map(preset => {
                    const isSelected = selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        onClick={() => {
                          playClick();
                          setSelectedPresetId(preset.id);
                        }}
                        className={`p-3.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-emerald-950/60 border-emerald-400 text-white shadow-lg shadow-emerald-950/40'
                            : 'bg-[#181926] border-[#2e3146] text-slate-300 hover:bg-[#202234] hover:border-slate-500'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/90 border border-emerald-500/40 px-2 py-0.5 rounded">
                            {preset.badge}
                          </span>
                        </div>
                        <h4 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                          <span>{preset.name}</span>
                        </h4>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                          {preset.description}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Selected Preset Details Banner */}
                <div className="bg-[#161724] border-2 border-emerald-500/40 rounded-2xl p-5 sm:p-6 shadow-2xl">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 border-b border-[#2b2d3e] pb-5">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-emerald-500 text-slate-950 text-xs font-bold px-2.5 py-0.5 rounded-full">
                          ACTIVE PLAYSTYLE PRESET
                        </span>
                        <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
                          {currentPreset.badge}
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                        {currentPreset.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 max-w-3xl mt-1 leading-relaxed">
                        {currentPreset.description}
                      </p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {currentPreset.highlights.map((h, i) => (
                          <span key={i} className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono px-2 py-0.5 rounded flex items-center gap-1">
                            <Check className="w-3 h-3 text-emerald-400" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleCopyPresetAllCommands}
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg border border-emerald-400 transition-all shrink-0 hover:scale-[1.02]"
                    >
                      {copiedPresetAll ? <CheckCheck className="w-4 h-4 text-emerald-200" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedPresetAll ? 'Copied All /give Commands!' : 'Copy All Loadout Commands'}</span>
                    </button>
                  </div>

                  {/* Explicit Trade-Off Explanation Banner */}
                  <div className="mt-4 bg-[#0e0f17] border border-amber-500/40 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-bold text-amber-300 text-xs uppercase tracking-wider">
                        Strategic Trade-Off &amp; Mechanics
                      </h5>
                      <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                        {currentPreset.tradeOff}
                      </p>
                    </div>
                  </div>

                  {/* 4-Piece Armor Breakdown */}
                  <div className="mt-6">
                    <h5 className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      Defensive Armor Loadout
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {currentPreset.armor.map((piece, idx) => (
                        <div key={idx} className="bg-[#12131b] border border-slate-700/80 rounded-xl p-3.5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-bold text-white text-xs">{piece.piece}</span>
                              <span className="text-[10px] font-mono text-emerald-400">{piece.item}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 my-2">
                              {piece.enchants.map((ench, ei) => (
                                <span key={ei} className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-[11px] font-mono px-1.5 py-0.5 rounded">
                                  {ench}
                                </span>
                              ))}
                            </div>
                            {piece.note && (
                              <p className="text-[11px] text-slate-400 mt-2 bg-black/40 p-2 rounded border border-slate-800">
                                {piece.note}
                              </p>
                            )}
                          </div>
                          <button
                            onClick={() => handleCopySinglePresetItem(piece, `armor_${idx}`)}
                            className="mt-3 flex items-center justify-center gap-1 bg-[#1e2030] hover:bg-emerald-900/50 text-slate-300 hover:text-white text-[11px] font-mono py-1 px-2 rounded border border-slate-700 transition-all"
                          >
                            {copiedItemGiveKey === `armor_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                            <span>{copiedItemGiveKey === `armor_${idx}` ? 'Copied' : 'Copy /give'}</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Weapons & Tools Loadout */}
                  <div className="mt-6">
                    <h5 className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Sword className="w-3.5 h-3.5" />
                      Weapons, Harvesting Tools &amp; Equipment
                    </h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {currentPreset.weaponsAndTools.map((wt, idx) => (
                        <div key={idx} className="bg-[#12131b] border border-slate-700/80 rounded-xl p-3.5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <span className="font-bold text-white text-xs">{wt.name}</span>
                              <span className="text-[10px] font-mono text-purple-300">{wt.item}</span>
                            </div>
                            <div className="flex flex-wrap gap-1 my-2">
                              {wt.enchants.map((ench, ei) => (
                                <span key={ei} className="bg-purple-950/80 border border-purple-500/30 text-purple-200 text-[11px] font-mono px-1.5 py-0.5 rounded">
                                  {ench}
                                </span>
                              ))}
                            </div>
                            {wt.note && (
                              <p className="text-[11px] text-slate-400 mt-2 bg-black/40 p-2 rounded border border-slate-800">
                                {wt.note}
                              </p>
                            )}
                          </div>
                          {!wt.name.includes('Formula') && (
                            <button
                              onClick={() => handleCopySinglePresetItem(wt, `wt_${idx}`)}
                              className="mt-3 flex items-center justify-center gap-1 bg-[#1e2030] hover:bg-purple-900/50 text-slate-300 hover:text-white text-[11px] font-mono py-1 px-2 rounded border border-slate-700 transition-all"
                            >
                              {copiedItemGiveKey === `wt_${idx}` ? <Check className="w-3 h-3 text-purple-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
                              <span>{copiedItemGiveKey === `wt_${idx}` ? 'Copied' : 'Copy /give'}</span>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 2: INTERACTIVE ENCHANTING TABLE SIMULATOR */}
            {/* ========================================================================= */}
            {activeTab === 'simulator' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  
                  {/* LEFT CONFIGURATION PANEL */}
                  <div className="lg:col-span-5 bg-[#141522] border border-[#2e3146] rounded-2xl p-5 shadow-xl space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <h4 className="text-base font-bold text-purple-300 flex items-center gap-2">
                        <Sliders className="w-4 h-4 text-purple-400" />
                        Worktable Controls
                      </h4>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleUndoSimulator}
                          disabled={!simHistory.length}
                          className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border font-mono transition-all ${
                            simHistory.length
                              ? 'bg-purple-950 text-purple-200 border-purple-500 hover:bg-purple-900'
                              : 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed opacity-50'
                          }`}
                          title="Undo last enchantment"
                        >
                          <Undo2 className="w-3.5 h-3.5" />
                          <span>Undo</span>
                        </button>
                        <button
                          onClick={handleResetSimulator}
                          className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg border bg-slate-900 text-slate-300 border-slate-700 hover:bg-slate-800 transition-all"
                          title="Reset table settings"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Reset</span>
                        </button>
                      </div>
                    </div>

                    {/* 1. Item Selection */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                        1. Target Equipment
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {SIMULATOR_ITEMS.map(item => {
                          const isSel = selectedItem.id === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                playClick();
                                setSelectedItem(item);
                              }}
                              className={`p-2 rounded-xl text-center border transition-all flex flex-col items-center justify-center gap-1 ${
                                isSel 
                                  ? 'bg-purple-950/80 border-purple-400 text-white shadow-md' 
                                  : 'bg-[#181926] border-[#2e3146] text-slate-400 hover:text-white hover:bg-[#202234]'
                              }`}
                            >
                              <img 
                                src={`/icons/minecraft/${item.icon}.svg`}
                                alt={item.name}
                                onError={(e) => { e.currentTarget.src = `/icons/minecraft/${item.icon}.png`; }}
                                className="w-6 h-6 object-contain"
                              />
                              <span className="text-[10px] font-mono font-medium truncate max-w-full">
                                {item.name.replace('Diamond ', '').replace(' (1.21)', '')}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 2. Bookshelf Slider */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-400 uppercase tracking-wider">
                          2. Surrounding Bookshelves
                        </span>
                        <span className="text-purple-300 font-bold font-mono">
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
                      <div className="flex justify-between text-[10px] font-mono text-slate-500">
                        <span>0 (Level 8 Max)</span>
                        <span>15 Bookshelves (Level 30 Max)</span>
                      </div>
                    </div>

                    {/* 3. Player Resources */}
                    <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800">
                      <div className="bg-[#181926] p-2.5 rounded-xl border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-emerald-400 font-mono flex items-center gap-1">
                            <Zap className="w-3.5 h-3.5" /> Level:
                          </span>
                          <span className="font-bold text-emerald-300 font-mono">{playerLevel}</span>
                        </div>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => setPlayerLevel(prev => prev + 10)}
                            className="flex-1 py-0.5 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 text-[10px] font-bold rounded border border-emerald-500/40"
                          >
                            +10 Lvl
                          </button>
                          <button 
                            onClick={() => setPlayerLevel(30)}
                            className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded"
                          >
                            30
                          </button>
                        </div>
                      </div>

                      <div className="bg-[#181926] p-2.5 rounded-xl border border-slate-800">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-blue-400 font-mono flex items-center gap-1">
                            <Layers className="w-3.5 h-3.5" /> Lapis:
                          </span>
                          <span className="font-bold text-blue-300 font-mono">{playerLapis}</span>
                        </div>
                        <div className="flex gap-1">
                          <button 
                            onClick={() => setPlayerLapis(prev => prev + 16)}
                            className="flex-1 py-0.5 bg-blue-950 hover:bg-blue-900 text-blue-300 text-[10px] font-bold rounded border border-blue-500/40"
                          >
                            +16
                          </button>
                          <button 
                            onClick={() => setPlayerLapis(32)}
                            className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] rounded"
                          >
                            32
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT ENCHANTING TABLE GUI */}
                  <div className="lg:col-span-7 bg-[#1c1815] border-4 border-[#3f3224] rounded-2xl p-5 shadow-2xl relative">
                    <div className="flex items-center justify-between border-b-2 border-[#3f3224] pb-3 mb-4">
                      <div className="flex items-center gap-2">
                        <Wand2 className="w-4 h-4 text-amber-300" />
                        <h4 className="font-bold text-amber-200 tracking-wide text-sm uppercase font-mono">
                          Enchanting Table
                        </h4>
                      </div>
                      <div className="text-[11px] font-mono text-emerald-400 bg-black/40 px-2 py-0.5 rounded border border-emerald-900/50">
                        Source → Sacrifice → Result
                      </div>
                    </div>

                    {/* Slots & Offers Container */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* INVENTORY SLOTS (Source Equipment & Lapis Sacrifice) */}
                      <div className="md:col-span-4 flex flex-col items-center justify-center gap-3 bg-black/40 p-3 rounded-xl border-2 border-[#3f3224]">
                        {/* Source Item */}
                        <div className="text-center">
                          <span className="text-[10px] font-mono text-slate-400 block mb-1">Source Item</span>
                          <div className="w-16 h-16 bg-[#16120f] border-2 border-[#524131] rounded-lg flex items-center justify-center relative shadow-inner">
                            <img 
                              src={`/icons/minecraft/${selectedItem.icon}.svg`}
                              alt={selectedItem.name}
                              onError={(e) => { e.currentTarget.src = `/icons/minecraft/${selectedItem.icon}.png`; }}
                              className="w-10 h-10 object-contain"
                            />
                          </div>
                        </div>

                        {/* Sacrifice Slot */}
                        <div className="text-center">
                          <span className="text-[10px] font-mono text-blue-400 block mb-1">Sacrifice (Lapis)</span>
                          <div className="w-14 h-14 bg-[#16120f] border-2 border-[#524131] rounded-lg flex items-center justify-center relative shadow-inner">
                            <img 
                              src="/icons/minecraft/lapis_lazuli.svg"
                              alt="Lapis Lazuli"
                              onError={(e) => { e.currentTarget.src = `/icons/minecraft/lapis_lazuli.png`; }}
                              className="w-8 h-8 object-contain"
                            />
                            <span className="absolute bottom-1 right-1 bg-black/80 text-blue-300 text-[10px] font-mono px-1 rounded">
                              1–3
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* 3 Tiered Offers */}
                      <div className="md:col-span-8 space-y-2.5">
                        {enchantmentOffers.map((offer) => {
                          const hasLevels = playerLevel >= offer.levelReq;
                          const hasLapis = playerLapis >= offer.lapisCost;
                          const canAfford = hasLevels && hasLapis;

                          return (
                            <div
                              key={offer.slot}
                              onClick={() => canAfford && handleEnchant(offer)}
                              className={`group relative p-2.5 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                                canAfford 
                                  ? 'bg-[#2b2116] hover:bg-[#3d2f20] border-[#6b4f32] hover:border-amber-400 text-amber-100 shadow-md' 
                                  : 'bg-[#181310] border-[#292017] text-slate-500 opacity-60 cursor-not-allowed'
                              }`}
                            >
                              <div className="flex-1 pr-2">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-bold text-amber-400 font-mono">
                                    Tier {offer.slot}
                                  </span>
                                  <span className="text-[10px] text-purple-300 bg-purple-950/80 px-1.5 py-0.2 rounded border border-purple-500/30 font-mono">
                                    {offer.previewName} ... ?
                                  </span>
                                </div>
                                <div className="mt-1 font-mono tracking-widest text-xs text-purple-300 select-none">
                                  {offer.sgaRunic}
                                </div>
                                <div className="text-[10px] font-mono text-slate-400">
                                  "{offer.sgaEnglish}"
                                </div>
                              </div>

                              <div className="flex flex-col items-end gap-1">
                                <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border ${
                                  hasLevels 
                                    ? 'bg-emerald-950 border-emerald-500/40 text-emerald-300' 
                                    : 'bg-red-950 border-red-500/40 text-red-400'
                                }`}>
                                  Req {offer.levelReq} Lvl
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">
                                  -{offer.levelCost} Lvl &amp; -{offer.lapisCost} Lapis
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Result Slot & Details */}
                    {enchantedResult && (
                      <div className="mt-4 bg-[#14100c] border-2 border-purple-500/60 rounded-xl p-3.5 shadow-xl animate-in fade-in duration-200">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-purple-950/80 border-2 border-purple-400 rounded-lg flex items-center justify-center p-1.5 shadow-[0_0_12px_rgba(168,85,247,0.5)]">
                              <img 
                                src={`/icons/minecraft/${enchantedResult.icon}.svg`}
                                alt={enchantedResult.itemName}
                                onError={(e) => { e.currentTarget.src = `/icons/minecraft/${enchantedResult.icon}.png`; }}
                                className="w-8 h-8 object-contain"
                              />
                            </div>
                            <div>
                              <h5 className="font-bold text-white text-sm flex items-center gap-1.5">
                                <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                                {enchantedResult.itemName}
                              </h5>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {enchantedResult.enchants.map((e, idx) => (
                                  <span key={idx} className="bg-purple-950/80 border border-purple-400/40 text-purple-200 text-[10px] px-1.5 py-0.2 rounded font-mono font-semibold">
                                    {e.name} {e.level}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => copyCommandToClipboard(enchantedResult.command)}
                              className="flex items-center gap-1 bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow transition-all"
                            >
                              {copiedCommand ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>{copiedCommand ? 'Copied!' : 'Copy /give'}</span>
                            </button>
                            <button
                              onClick={handleDisenchant}
                              className="flex items-center gap-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-700 transition-all"
                              title="Disenchant on Grindstone (refunds XP)"
                            >
                              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                              <span>Grindstone</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Educational Simulator Disclaimer */}
                    <div className="mt-4 pt-3 border-t border-[#3f3224] text-[11px] text-amber-200/80 leading-relaxed font-mono flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        Note: Educational calculator modeling Java Edition bookshelf weighting, lapis consumption, and SGA rune generation. World seed RNG determines exact offers in client worlds.
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 3: INCOMPATIBILITIES & CONFLICT MATRIX */}
            {/* ========================================================================= */}
            {activeTab === 'matrix' && (
              <div className="animate-in fade-in duration-200">
                <EnchantmentConflictMatrix />
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 4: ANVIL BINARY MERGE TREE */}
            {/* ========================================================================= */}
            {activeTab === 'anvil_tree' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-[#141522] border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl space-y-6">
                  <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                    <div className="w-12 h-12 bg-amber-950/60 border border-amber-500/40 rounded-xl flex items-center justify-center p-2 shrink-0">
                      <GitBranch className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                        ANVIL COMBINING MATHEMATICS
                      </span>
                      <h4 className="text-lg sm:text-xl font-bold text-white">
                        {ANVIL_BINARY_TREE_TUTORIAL.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {ANVIL_BINARY_TREE_TUTORIAL.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* INTERACTIVE PENALTY CALCULATOR SLIDER */}
                  <div className="bg-[#0e0f17] p-4 rounded-xl border border-slate-800 space-y-3">
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

                  {/* SIDE BY SIDE: LINEAR TRAP VS BINARY SUCCESS */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* LINEAR TRAP */}
                    <div className="bg-red-950/20 border-2 border-red-500/40 rounded-xl p-4 space-y-3">
                      <div className="flex items-center gap-2 text-red-300 font-bold text-sm">
                        <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                        <span>The Linear Merge Trap (Sequential Adding)</span>
                      </div>
                      <p className="text-xs text-red-200/80 leading-relaxed">
                        Adding books one by one onto an item doubles the Prior Work Penalty every time: <code className="text-red-300 font-mono">Penalty = 2ⁿ - 1</code>.
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
                    <div className="bg-emerald-950/20 border-2 border-emerald-500/40 rounded-xl p-4 space-y-3">
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
            {/* TAB 5: GRINDSTONE & DISENCHANTING */}
            {/* ========================================================================= */}
            {activeTab === 'grindstone' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-[#141522] border border-[#2e3146] rounded-2xl p-6 shadow-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-black/50 border border-slate-700 rounded-xl flex items-center justify-center p-2.5 shadow-inner">
                      <img 
                        src={`/icons/minecraft/${DISENCHANTING_MECHANICS.workstationIcon}.svg`}
                        alt={DISENCHANTING_MECHANICS.workstation}
                        onError={(e) => { e.currentTarget.src = `/icons/minecraft/${DISENCHANTING_MECHANICS.workstationIcon}.png`; }}
                        className="w-10 h-10 object-contain"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{DISENCHANTING_MECHANICS.workstation} Mechanics</h3>
                      <p className="text-xs text-slate-400">{DISENCHANTING_MECHANICS.description}</p>
                    </div>
                  </div>

                  {/* INTERACTIVE GRINDSTONE XP REFUND CALCULATOR */}
                  <div className="bg-[#0e0f17] p-5 rounded-xl border border-slate-800 mb-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-purple-300 flex items-center gap-1.5 uppercase font-mono">
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
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {DISENCHANTING_MECHANICS.rules.map((rule, idx) => (
                      <div key={idx} className="bg-[#181926] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-xs font-mono font-bold text-purple-400 mb-1 block">
                            Rule 0{idx + 1}
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed">
                            {rule}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Curse Indelibility Warning */}
                  <div className="mt-6 bg-red-950/40 border border-red-500/40 rounded-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-sm font-bold text-red-300">Curse Indelibility Warning</h5>
                      <p className="text-xs text-red-200/80 mt-1 leading-relaxed">
                        The Grindstone cannot strip <strong>Curse of Binding</strong> or <strong>Curse of Vanishing</strong>. If an item has both normal enchantments and a curse, the normal enchantments will be removed for experience, but the curse will permanently remain intact on the item.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 6: ALL 42 ENCHANTMENTS CODEX */}
            {/* ========================================================================= */}
            {activeTab === 'codex' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {codexCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => {
                        playClick();
                        setSelectedCodexCategory(cat);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        selectedCodexCategory === cat 
                          ? 'bg-purple-600 text-white shadow-md' 
                          : 'bg-[#181926] text-slate-300 hover:bg-[#202234] border border-[#2e3146]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCodexEnchantments.map(ench => (
                    <div 
                      key={ench.id}
                      className="bg-[#141522] border border-[#2e3146] hover:border-purple-500/60 rounded-xl p-4 shadow-lg transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-2">
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

                          <span className="bg-purple-950/80 border border-purple-500/30 text-purple-300 text-[10px] font-mono px-2 py-0.5 rounded">
                            {ench.version}
                          </span>
                        </div>

                        <p className="text-xs text-slate-300 leading-relaxed my-2.5">
                          {ench.desc}
                        </p>
                      </div>

                      <div className="pt-2.5 border-t border-slate-800 space-y-1.5 text-[11px]">
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-slate-400">Rarity:</span>
                          <span className="text-purple-300 font-semibold">{ench.rarity}</span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          <span className="text-slate-400">Applies To:</span>
                          <span className="text-slate-200 font-mono truncate max-w-[200px]">{ench.items.join(', ')}</span>
                        </div>
                        {ench.incompatible.length > 0 && (
                          <div className="flex items-center gap-1 text-amber-300/90 font-mono bg-amber-950/30 p-1 rounded">
                            <XCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span>✕ Conflicts: {ench.incompatible.join(', ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 7: ITEM ENCHANTMENT MATRIX (LEGACY DIRECT VIEW) */}
            {/* ========================================================================= */}
            {activeTab === 'matrix_legacy' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ITEM_ENCHANTMENT_MATRIX.map((itemGroup, idx) => (
                    <div key={idx} className="bg-[#141522] border border-[#2e3146] rounded-xl p-4 shadow-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 bg-black/40 border border-purple-500/30 rounded-lg flex items-center justify-center p-1.5">
                            <img 
                              src={`/icons/minecraft/${itemGroup.icon}.svg`}
                              alt={itemGroup.category}
                              onError={(e) => { e.currentTarget.src = `/icons/minecraft/${itemGroup.icon}.png`; }}
                              className="w-7 h-7 object-contain"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-100 text-sm">{itemGroup.category}</h4>
                            <span className="text-[10px] text-purple-400">{itemGroup.enchantments.length} Available Enchants</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 my-2">
                          {itemGroup.enchantments.map((ench, i) => (
                            <span key={i} className="bg-[#0e0f17] border border-slate-800 text-purple-200 text-xs px-2 py-0.5 rounded font-mono">
                              {ench}
                            </span>
                          ))}
                        </div>
                      </div>

                      <p className="text-[11px] text-slate-400 mt-2 bg-black/40 p-2 rounded border border-slate-800">
                        💡 {itemGroup.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* TAB 8: EPF CAPS & DATA COMPONENTS */}
            {/* ========================================================================= */}
            {activeTab === 'epf' && (
              <div className="space-y-6 animate-in fade-in duration-200">
                <div className="bg-[#141522] border border-[#2e3146] rounded-2xl p-6 shadow-xl space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-950/60 border border-emerald-500/40 rounded-xl flex items-center justify-center p-2">
                      <Shield className="w-7 h-7 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-emerald-200">
                        Environmental Protection Factor (EPF) 20 Cap
                      </h4>
                      <p className="text-xs text-slate-400">
                        Total EPF is capped at <strong>20</strong>, granting an absolute maximum damage reduction of <strong>80%</strong> (4% per EPF point).
                      </p>
                    </div>
                  </div>

                  {/* Interactive EPF Meter */}
                  <div className="bg-[#0e0f17] p-5 rounded-2xl border border-slate-800 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">Live Armor Set EPF Calculation</span>
                      <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-500/40">
                        General EPF: {effectiveGeneralEpf}/20 ({generalDamageReduction}% Damage Cut) | Fall EPF: {effectiveFallEpf}/20 ({fallDamageReduction}% Cut)
                      </span>
                    </div>

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
                          <th className="p-3">Cap Rule &amp; Secondary Bonuses</th>
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

                {/* Java 1.20.5+ Data Components Syntax */}
                <div className="bg-[#141522] border border-purple-500/40 rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-950/60 border border-purple-500/40 rounded-xl flex items-center justify-center p-2">
                      <Copy className="w-6 h-6 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-purple-200">
                        Java 1.20.5+ / 1.21 Data Components Syntax
                      </h4>
                      <p className="text-xs text-slate-400">
                        Mojang permanently replaced raw string-based NBT formatting with bracketed data components in 1.20.5.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-xs">
                    <div className="bg-[#0e0f17] p-3 rounded-xl border border-slate-800">
                      <span className="text-emerald-400 font-bold block mb-1">Modern Java 1.21 Mace /give Command:</span>
                      <code className="text-purple-300 break-all">{DATA_COMPONENT_EXAMPLES.modernMace}</code>
                    </div>
                    <div className="bg-[#0e0f17] p-3 rounded-xl border border-slate-800">
                      <span className="text-blue-400 font-bold block mb-1">Stored Enchantments (Enchanted Book):</span>
                      <code className="text-purple-300 break-all">{DATA_COMPONENT_EXAMPLES.modernStoredBook}</code>
                    </div>
                  </div>
                </div>

                {/* Chronological History Timeline */}
                <div className="bg-[#141522] border border-slate-700/80 rounded-2xl p-6 shadow-xl">
                  <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <History className="w-5 h-5 text-purple-400" />
                    Enchanting Development History (Beta to 1.21 Tricky Trials)
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
          </div>
        </>
      )}
    </section>
  );
}
