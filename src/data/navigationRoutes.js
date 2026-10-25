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
  BookOpen
} from 'lucide-react';

export const NAVIGATION_CATEGORIES = [
  {
    id: 'survival',
    label: 'Survival & Crafting',
    shortLabel: 'Survival',
    icon: Hammer,
    badge: '6 Sections',
    itemIds: ['crafting', 'furnace', 'smithing', 'trading', 'brewing', 'enchanting']
  },
  {
    id: 'world',
    label: 'World & Ecology',
    shortLabel: 'World',
    icon: Compass,
    badge: '5 Sections',
    itemIds: ['encyclopedia', 'drops', 'structures', 'mobs', 'biomes']
  },
  {
    id: 'media',
    label: 'Vault & Visuals',
    shortLabel: 'Vault & Packs',
    icon: Eye,
    badge: '2 Sections',
    itemIds: ['icons', 'resourcepacks']
  },
  {
    id: 'tech',
    label: 'Technical & Engineering',
    shortLabel: 'Technical',
    icon: Cpu,
    badge: '2 Sections',
    itemIds: ['redstone', 'modding']
  },
  {
    id: 'community',
    label: 'Community & Feedback',
    shortLabel: 'Desk',
    icon: MessageSquare,
    badge: '1 Section',
    itemIds: ['feedback']
  }
];

export const NAVIGATION_ITEMS = [
  {
    id: 'encyclopedia',
    label: 'Encyclopedia',
    fullTitle: 'The Complete Minecraft Java Encyclopedia (19 Topics)',
    categoryId: 'world',
    categoryLabel: 'World & Ecology',
    icon: BookOpen,
    hash: '#encyclopedia',
    desc: 'Structured 19 canonical topics across 5 logical categories with live search, quick-reference data cards, and cross-topic jump navigation.',
    badge: '19 Topics & Search'
  },
  {
    id: 'drops',
    label: 'Game Drops',
    fullTitle: 'Game Drops & Snapshots Timeline',
    categoryId: 'world',
    categoryLabel: 'World & Ecology',
    icon: Sparkles,
    hash: '#drops',
    desc: 'Explore official releases: Bundles of Bravery (1.21.2/1.21.3), Tricky Trials (1.21), Armored Paws (1.20.5), and Pale Garden snapshots (24w40a+).',
    badge: 'Official Chronology'
  },
  {
    id: 'crafting',
    label: 'Crafting',
    fullTitle: 'Crafting Table & 1.21 Crafter Laboratory',
    categoryId: 'survival',
    categoryLabel: 'Survival & Crafting',
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
    categoryLabel: 'Survival & Crafting',
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
    categoryLabel: 'Survival & Crafting',
    icon: Shield,
    hash: '#smithing',
    desc: 'Netherite upgrade mechanics, 16 armor trim templates, 10 material palettes, and 3D preview renders.',
    badge: '16 Trim Templates'
  },
  {
    id: 'trading',
    label: 'Trading',
    fullTitle: 'Villager Trading & Economy Simulator',
    categoryId: 'survival',
    categoryLabel: 'Survival & Crafting',
    icon: Coins,
    hash: '#trading',
    desc: 'All 13 professions, 5 career tiers, cure discounts, and experimental Biome Trade Rebalance rules.',
    badge: '13 Professions'
  },
  {
    id: 'brewing',
    label: 'Brewing',
    fullTitle: 'Potion Brewer & Alchemical Stand',
    categoryId: 'survival',
    categoryLabel: 'Survival & Crafting',
    icon: Sparkle,
    hash: '#brewing',
    desc: 'Interactive brewing stand simulator, 20 blaze fuel charges, modifiers, cures, and 1.21 potions.',
    badge: '3.1–3.5 Recipes'
  },
  {
    id: 'enchanting',
    label: 'Enchanting',
    fullTitle: 'Enchantment Laboratory & Alchemical Codex',
    categoryId: 'survival',
    categoryLabel: 'Survival & Crafting',
    icon: Wand2,
    hash: '#enchanting',
    desc: 'Interactive table simulator with SGA runes, 15 bookshelves, 20 EPF cap, and 1.21 Mace enchants.',
    badge: '42 Enchantments'
  },
  {
    id: 'structures',
    label: 'Structures',
    fullTitle: 'World Structures & Trial Chambers Explorer',
    categoryId: 'world',
    categoryLabel: 'World & Ecology',
    icon: MapPin,
    hash: '#structures',
    desc: 'Trial Chambers, Ancient Cities, Strongholds, Ocean Monuments, Nether Fortresses, and End Cities.',
    badge: 'Overworld & Nether'
  },
  {
    id: 'biomes',
    label: 'Biomes',
    fullTitle: 'Biomes Explorer & World Cartography',
    categoryId: 'world',
    categoryLabel: 'World & Ecology',
    icon: Compass,
    hash: '#biomes',
    desc: 'Pale Garden, Cherry Groves, Deep Dark, Mangrove Swamps, and 70+ climate regions.',
    badge: '70+ Biomes'
  },
  {
    id: 'mobs',
    label: 'Bestiary',
    fullTitle: 'Creature Bestiary & Mob Ecology (Wiki 1–10)',
    categoryId: 'world',
    categoryLabel: 'World & Ecology',
    icon: ShieldAlert,
    hash: '#mobs',
    desc: '40+ mobs (3.1–3.11), 24/32/128 spawning spheres, knockback resistance, and weapon combat tester.',
    badge: 'Combat Simulator'
  },
  {
    id: 'icons',
    label: 'SVG Vault',
    fullTitle: 'Official Minecraft SVG Vault (1,750+ Assets)',
    categoryId: 'media',
    categoryLabel: 'Vault & Visuals',
    icon: ImageIcon,
    hash: '#icons',
    desc: 'Searchable directory of 1,750+ pixel-crisp official SVG and PNG Minecraft item and block assets.',
    badge: '1,750+ Assets'
  },
  {
    id: 'resourcepacks',
    label: 'Packs & X-Ray',
    fullTitle: 'Resource Pack Studio & Visual Customization',
    categoryId: 'media',
    categoryLabel: 'Vault & Visuals',
    icon: Eye,
    hash: '#resourcepacks',
    desc: 'Live X-Ray sandbox, Glowing Ores, Default Dark Mode UI, pack.mcmeta generator, and hotkeys.',
    badge: 'Live Texture Sandbox'
  },
  {
    id: 'redstone',
    label: 'Redstone',
    fullTitle: 'Redstone Engineering & Logic Gates Lab',
    categoryId: 'tech',
    categoryLabel: 'Technical & Engineering',
    icon: Cpu,
    hash: '#redstone',
    desc: 'Interactive logic gates, 15 signal levels, quasi-connectivity, comparators, and flying machines.',
    badge: 'Logic Gates'
  },
  {
    id: 'modding',
    label: 'Modding',
    fullTitle: 'Modding Ecosystem & Speedrunning Hub',
    categoryId: 'tech',
    categoryLabel: 'Technical & Engineering',
    icon: Layers,
    hash: '#modding',
    desc: 'Fabric vs NeoForge, Sodium performance stack, Iris shaders, and sub-7-minute speedrun world records.',
    badge: 'Performance Stack'
  },
  {
    id: 'feedback',
    label: 'Feedback',
    fullTitle: 'Verified Developer Desk & Feedback Hub',
    categoryId: 'community',
    categoryLabel: 'Community & Feedback',
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
