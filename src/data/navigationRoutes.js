// Central Navigation Blueprint & Route Registry for Minecraft Portal
// Meets all production specifications: defined destinations, keyboard accessibility, breadcrumbs, and pagination

import { 
  Sparkles, 
  Hammer, 
  Flame, 
  Shield, 
  Coins, 
  MapPin, 
  ImageIcon, 
  ShieldAlert, 
  Compass, 
  Sparkle, 
  Wand2, 
  Eye, 
  Cpu, 
  Layers, 
  MessageSquare,
  Home,
  BookOpen,
  Award
} from 'lucide-react';

export const NAVIGATION_CATEGORIES = [
  {
    id: 'survival',
    label: 'Survival: Items · Mobs · Biomes',
    shortLabel: 'Survival',
    icon: Hammer,
    badge: '6 Modules',
    itemIds: ['crafting', 'furnace', 'smithing', 'brewing', 'mobs', 'biomes']
  },
  {
    id: 'world',
    label: 'World: Dimensions · Structures',
    shortLabel: 'World',
    icon: Compass,
    badge: '2 Modules',
    itemIds: ['structures', 'drops']
  },
  {
    id: 'technical',
    label: 'Technical: Redstone · Commands',
    shortLabel: 'Technical',
    icon: Cpu,
    badge: '3 Modules',
    itemIds: ['redstone', 'encyclopedia', 'icons']
  },
  {
    id: 'guides',
    label: 'Guides & Tools: Tutorials · Simulators',
    shortLabel: 'Guides & Tools',
    icon: BookOpen,
    badge: '5 Modules',
    itemIds: ['enchanting', 'trading', 'modding', 'resourcepacks', 'checklists']
  },
  {
    id: 'community',
    label: 'Community & Feedback',
    shortLabel: 'Desk',
    icon: MessageSquare,
    badge: '1 Module',
    itemIds: ['feedback']
  }
];

export const NAVIGATION_ITEMS = [
  // --- SURVIVAL: Items · Mobs · Biomes ---
  {
    id: 'crafting',
    label: 'Crafting',
    fullTitle: 'Crafting Table & 1.21 Crafter Laboratory',
    categoryId: 'survival',
    categoryLabel: 'Survival',
    icon: Hammer,
    hash: '#crafting',
    desc: 'Interactive 3x3 crafting matrix, 400+ vanilla recipes, and 1.21 automated Crafter pulses.',
    badge: '400+ Recipes'
  },
  {
    id: 'furnace',
    label: 'Smelting',
    fullTitle: 'Furnace, Blast Furnace & Smoker Smeltery',
    categoryId: 'survival',
    categoryLabel: 'Survival',
    icon: Flame,
    hash: '#furnace',
    desc: 'Ore smelting, food smoking, metal blasting, and fuel combustion burn rates (Lava, Coal, Kelp).',
    badge: 'Fuel Calculator'
  },
  {
    id: 'smithing',
    label: 'Smithing',
    fullTitle: 'Smithing Table & Armor Trims Studio',
    categoryId: 'survival',
    categoryLabel: 'Survival',
    icon: Shield,
    hash: '#smithing',
    desc: 'Netherite upgrade mechanics, 16 armor trim templates, 10 material palettes, and 3D preview renders.',
    badge: '16 Trim Templates'
  },
  {
    id: 'brewing',
    label: 'Brewing',
    fullTitle: 'Potion Brewer & Alchemical Stand',
    categoryId: 'survival',
    categoryLabel: 'Survival',
    icon: Sparkle,
    hash: '#brewing',
    desc: 'Interactive brewing stand simulator, 20 blaze fuel charges, modifiers, cures, and 1.21 potions.',
    badge: '3.1–3.5 Recipes'
  },
  {
    id: 'mobs',
    label: 'Bestiary',
    fullTitle: 'Creature Bestiary & Mob Ecology (Wiki 1–10)',
    categoryId: 'survival',
    categoryLabel: 'Survival',
    icon: ShieldAlert,
    hash: '#mobs',
    desc: '40+ mobs (3.1–3.11), 24/32/128 spawning spheres, knockback resistance, and weapon combat tester.',
    badge: 'Combat Simulator'
  },
  {
    id: 'biomes',
    label: 'Biomes',
    fullTitle: 'Biomes Explorer & World Cartography',
    categoryId: 'survival',
    categoryLabel: 'Survival',
    icon: Compass,
    hash: '#biomes',
    desc: 'Pale Garden, Cherry Groves, Deep Dark, Mangrove Swamps, and 70+ climate regions.',
    badge: '70+ Biomes'
  },

  // --- WORLD: Dimensions · Structures ---
  {
    id: 'structures',
    label: 'Structures',
    fullTitle: 'World Structures & Trial Chambers Explorer',
    categoryId: 'world',
    categoryLabel: 'World',
    icon: MapPin,
    hash: '#structures',
    desc: 'Trial Chambers, Ancient Cities, Strongholds, Ocean Monuments, Nether Fortresses, and End Cities.',
    badge: 'Overworld & Nether'
  },
  {
    id: 'drops',
    label: 'Game Drops',
    fullTitle: 'Game Drops & Snapshots Timeline',
    categoryId: 'world',
    categoryLabel: 'World',
    icon: Sparkles,
    hash: '#drops',
    desc: 'Explore official releases: Java 26.3 Wilderness Bound (Stable), 26.1 Tiny Takeover, 1.21.3 Bundles of Bravery, and 26.4 Winter Drop snapshot previews.',
    badge: 'Official Chronology'
  },

  // --- TECHNICAL: Redstone · Commands ---
  {
    id: 'redstone',
    label: 'Redstone',
    fullTitle: 'Redstone Engineering & Logic Gates Lab',
    categoryId: 'technical',
    categoryLabel: 'Technical',
    icon: Cpu,
    hash: '#redstone',
    desc: 'Interactive logic gates, 15 signal levels, quasi-connectivity, comparators, and flying machines.',
    badge: 'Logic Gates'
  },
  {
    id: 'encyclopedia',
    label: 'Encyclopedia',
    fullTitle: 'The Complete Minecraft Java Encyclopedia (19 Topics)',
    categoryId: 'technical',
    categoryLabel: 'Technical',
    icon: BookOpen,
    hash: '#encyclopedia',
    desc: 'Structured 19 canonical topics across 5 logical categories with live search, quick-reference data cards, and cross-topic jump navigation.',
    badge: '19 Topics & Search'
  },
  {
    id: 'icons',
    label: 'SVG Vault',
    fullTitle: 'Official Minecraft SVG Vault (1,750+ Assets)',
    categoryId: 'technical',
    categoryLabel: 'Technical',
    icon: ImageIcon,
    hash: '#icons',
    desc: 'Searchable directory of 1,750+ pixel-crisp official SVG and PNG Minecraft item and block assets.',
    badge: '1,750+ Assets'
  },

  // --- GUIDES & TOOLS: Tutorials · Simulators ---
  {
    id: 'enchanting',
    label: 'Enchanting',
    fullTitle: 'Enchantment Laboratory & Alchemical Codex',
    categoryId: 'guides',
    categoryLabel: 'Guides & Tools',
    icon: Wand2,
    hash: '#enchanting',
    desc: 'Interactive table simulator with SGA runes, 15 bookshelves, 20 EPF cap, and 1.21 Mace enchants.',
    badge: '42 Enchantments'
  },
  {
    id: 'trading',
    label: 'Trading',
    fullTitle: 'Villager Trading & Economy Simulator',
    categoryId: 'guides',
    categoryLabel: 'Guides & Tools',
    icon: Coins,
    hash: '#trading',
    desc: 'All 13 professions, 5 career tiers, cure discounts, and experimental Biome Trade Rebalance rules.',
    badge: '13 Professions'
  },
  {
    id: 'modding',
    label: 'Modding',
    fullTitle: 'Modding Ecosystem & Speedrunning Hub',
    categoryId: 'guides',
    categoryLabel: 'Guides & Tools',
    icon: Layers,
    hash: '#modding',
    desc: 'Fabric vs NeoForge, Sodium performance stack, Iris shaders, and sub-7-minute speedrun world records.',
    badge: 'Performance Stack'
  },
  {
    id: 'resourcepacks',
    label: 'Packs & X-Ray',
    fullTitle: 'Resource Pack Studio & Visual Customization',
    categoryId: 'guides',
    categoryLabel: 'Guides & Tools',
    icon: Eye,
    hash: '#resourcepacks',
    desc: 'Live X-Ray sandbox, Glowing Ores, Default Dark Mode UI, pack.mcmeta generator, and hotkeys.',
    badge: 'Live Texture Sandbox'
  },
  {
    id: 'checklists',
    label: 'Checklists',
    fullTitle: 'Minecraft Progression & Survival Checklists',
    categoryId: 'guides',
    categoryLabel: 'Guides & Tools',
    icon: Award,
    hash: '#checklists',
    desc: 'Interactive step-by-step milestones from Day 1 survival to Netherite God Armor. 100% private local tracking.',
    badge: 'Learning Progress'
  },

  // --- COMMUNITY & FEEDBACK ---
  {
    id: 'feedback',
    label: 'Feedback',
    fullTitle: 'Verified Developer Desk & Feedback Hub',
    categoryId: 'community',
    categoryLabel: 'Desk',
    icon: MessageSquare,
    hash: '#feedback',
    desc: 'Send usability reports, suggestions, and feedback directly to the verified developer channel.',
    badge: 'Protected Channel'
  }
];

export function getSectionById(id) {
  return NAVIGATION_ITEMS.find(item => item.id === id) || null;
}

export function getAdjacentSections(currentId) {
  const index = NAVIGATION_ITEMS.findIndex(item => item.id === currentId);
  if (index === -1) {
    return { prev: null, next: null };
  }
  const prev = index > 0 ? NAVIGATION_ITEMS[index - 1] : null;
  const next = index < NAVIGATION_ITEMS.length - 1 ? NAVIGATION_ITEMS[index + 1] : null;
  return { prev, next, index, total: NAVIGATION_ITEMS.length };
}
