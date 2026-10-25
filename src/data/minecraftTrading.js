// Comprehensive Data for Minecraft Java Edition Trading & Villager Economy
// Verified against official Minecraft Wiki (https://minecraft.wiki/w/Trading)

export const VILLAGER_TIERS = [
  { level: 1, name: 'Novice', badge: 'Stone', color: '#8c8c8c', xpRequired: 0, badgeIcon: '🪨' },
  { level: 2, name: 'Apprentice', badge: 'Iron', color: '#d8d8d8', xpRequired: 10, badgeIcon: '⚔️' },
  { level: 3, name: 'Journeyman', badge: 'Gold', color: '#f59e0b', xpRequired: 70, badgeIcon: '🪙' },
  { level: 4, name: 'Expert', badge: 'Emerald', color: '#10b981', xpRequired: 150, badgeIcon: '💎' },
  { level: 5, name: 'Master', badge: 'Diamond', color: '#38bdf8', xpRequired: 250, badgeIcon: '👑' }
];

export const VILLAGER_PROFESSIONS = [
  {
    id: 'armorer',
    name: 'Armorer',
    workstation: 'Blast Furnace',
    workstationId: 'blast_furnace',
    role: 'Forges iron, chainmail, and diamond protective armor and shields.',
    themeColor: '#71717a',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'coal', name: 'Coal', count: 15 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 5 }],
        output: { id: 'iron_helmet', name: 'Iron Helmet', count: 1 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'iron_ingot', name: 'Iron Ingot', count: 4 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 36 }],
        output: { id: 'bell', name: 'Bell', count: 1 },
        maxUses: 12,
        xp: 5
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'lava_bucket', name: 'Lava Bucket', count: 1 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 5 }],
        output: { id: 'shield', name: 'Shield', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'diamond', name: 'Diamond', count: 1 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 19 }],
        output: { id: 'diamond_leggings', name: 'Enchanted Diamond Leggings', count: 1, enchanted: true },
        maxUses: 3,
        xp: 15
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 27 }],
        output: { id: 'diamond_chestplate', name: 'Enchanted Diamond Chestplate', count: 1, enchanted: true },
        maxUses: 3,
        xp: 30
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 13 }],
        output: { id: 'diamond_helmet', name: 'Enchanted Diamond Helmet', count: 1, enchanted: true },
        maxUses: 3,
        xp: 30
      }
    ]
  },
  {
    id: 'butcher',
    name: 'Butcher',
    workstation: 'Smoker',
    workstationId: 'smoker',
    role: 'Purchases raw meat and kelp, supplies cooked meals and rabbit stew.',
    themeColor: '#ef4444',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'chicken', name: 'Raw Chicken', count: 14 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'rabbit_stew', name: 'Rabbit Stew', count: 1 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'porkchop', name: 'Raw Porkchop', count: 7 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'cooked_porkchop', name: 'Cooked Porkchop', count: 5 },
        maxUses: 16,
        xp: 5
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'coal', name: 'Coal', count: 15 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 20
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'beef', name: 'Raw Beef', count: 10 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 20
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'dried_kelp_block', name: 'Dried Kelp Block', count: 10 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'sweet_berries', name: 'Sweet Berries', count: 10 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      }
    ]
  },
  {
    id: 'cartographer',
    name: 'Cartographer',
    workstation: 'Cartography Table',
    workstationId: 'cartography_table',
    role: 'Provides Ocean, Woodland, and Trial Chambers Explorer Maps.',
    themeColor: '#3b82f6',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'paper', name: 'Paper', count: 24 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 7 }],
        output: { id: 'map', name: 'Empty Map', count: 1 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'glass_pane', name: 'Glass Pane', count: 11 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 13 }, { id: 'compass', name: 'Compass', count: 1 }],
        output: { id: 'ocean_explorer_map', name: 'Ocean Explorer Map', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'compass', name: 'Compass', count: 1 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 14 }, { id: 'compass', name: 'Compass', count: 1 }],
        output: { id: 'woodland_explorer_map', name: 'Woodland Explorer Map', count: 1 },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 12 }, { id: 'compass', name: 'Compass', count: 1 }],
        output: { id: 'buried_trial_chambers_map', name: 'Trial Chambers Map', count: 1 },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 7 }],
        output: { id: 'item_frame', name: 'Item Frame', count: 1 },
        maxUses: 12,
        xp: 15
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 8 }],
        output: { id: 'banner_pattern', name: 'Globe Banner Pattern', count: 1 },
        maxUses: 12,
        xp: 30
      }
    ]
  },
  {
    id: 'cleric',
    name: 'Cleric',
    workstation: 'Brewing Stand',
    workstationId: 'brewing_stand',
    role: 'Alchemist buying rotten flesh and gold; sells redstone, lapis, ender pearls, and XP bottles.',
    themeColor: '#a855f7',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'rotten_flesh', name: 'Rotten Flesh', count: 32 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'redstone', name: 'Redstone Dust', count: 2 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'gold_ingot', name: 'Gold Ingot', count: 3 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'lapis_lazuli', name: 'Lapis Lazuli', count: 1 },
        maxUses: 12,
        xp: 5
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'rabbits_foot', name: "Rabbit's Foot", count: 2 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 4 }],
        output: { id: 'glowstone', name: 'Glowstone Block', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'armadillo_scute', name: 'Scute / Turtle Scute', count: 4 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 5 }],
        output: { id: 'ender_pearl', name: 'Ender Pearl', count: 1 },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'nether_wart', name: 'Nether Wart', count: 22 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 3 }],
        output: { id: 'experience_bottle', name: "Bottle o' Enchanting", count: 1 },
        maxUses: 12,
        xp: 30
      }
    ]
  },
  {
    id: 'farmer',
    name: 'Farmer',
    workstation: 'Composter',
    workstationId: 'composter',
    role: 'Agricultural specialist buying staple crops; sells golden carrots, glistering melons, and suspicious stews.',
    themeColor: '#84cc16',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'wheat', name: 'Wheat', count: 20 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'potato', name: 'Potato', count: 26 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'bread', name: 'Bread', count: 6 },
        maxUses: 16,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'pumpkin', name: 'Pumpkin', count: 6 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'pumpkin_pie', name: 'Pumpkin Pie', count: 4 },
        maxUses: 12,
        xp: 5
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'melon', name: 'Melon Slice', count: 4 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 3 }],
        output: { id: 'cookie', name: 'Cookie', count: 18 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'cake', name: 'Cake', count: 1 },
        maxUses: 12,
        xp: 15
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'suspicious_stew', name: 'Suspicious Stew (Saturation)', count: 1 },
        maxUses: 12,
        xp: 15
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 3 }],
        output: { id: 'golden_carrot', name: 'Golden Carrot (Best Saturation)', count: 3 },
        maxUses: 12,
        xp: 30
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 4 }],
        output: { id: 'glistering_melon_slice', name: 'Glistering Melon Slice', count: 3 },
        maxUses: 12,
        xp: 30
      }
    ]
  },
  {
    id: 'fisherman',
    name: 'Fisherman',
    workstation: 'Barrel',
    workstationId: 'barrel',
    role: 'Maritime trader buying string and raw fish; sells campfires and enchanted fishing rods.',
    themeColor: '#06b6d4',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'string', name: 'String', count: 20 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'raw_cod', name: 'Raw Cod', count: 15 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 2 }],
        output: { id: 'campfire', name: 'Campfire', count: 1 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'raw_salmon', name: 'Raw Salmon', count: 13 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 3 }],
        output: { id: 'cooked_cod', name: 'Cooked Cod', count: 6 },
        maxUses: 16,
        xp: 5
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 8 }],
        output: { id: 'fishing_rod', name: 'Enchanted Fishing Rod', count: 1, enchanted: true },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'tropical_fish', name: 'Tropical Fish', count: 6 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'boat', name: 'Wooden Boat', count: 1 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      }
    ]
  },
  {
    id: 'fletcher',
    name: 'Fletcher',
    workstation: 'Fletching Table',
    workstationId: 'fletching_table',
    role: 'Trades sticks for emeralds (top emerald farm!); crafts bows, crossbows, and tipped arrows.',
    themeColor: '#d97706',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'stick', name: 'Stick (Easiest Emerald Source)', count: 32 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'flint', name: 'Flint', count: 26 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'arrow', name: 'Arrow', count: 16 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'string', name: 'String', count: 14 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 2 }],
        output: { id: 'bow', name: 'Bow', count: 1 },
        maxUses: 12,
        xp: 5
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'feather', name: 'Feather', count: 24 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 20
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 3 }],
        output: { id: 'crossbow', name: 'Crossbow', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 7 }],
        output: { id: 'bow', name: 'Enchanted Bow', count: 1, enchanted: true },
        maxUses: 12,
        xp: 15
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 2 }, { id: 'arrow', name: 'Arrow', count: 5 }],
        output: { id: 'tipped_arrow', name: 'Tipped Arrow (Harming / Slowness)', count: 5, enchanted: true },
        maxUses: 12,
        xp: 30
      }
    ]
  },
  {
    id: 'leatherworker',
    name: 'Leatherworker',
    workstation: 'Cauldron',
    workstationId: 'cauldron',
    role: 'Tans hides and leather; supplies saddles, leather horse armor, and dyed protective garments.',
    themeColor: '#78350f',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'leather', name: 'Leather', count: 6 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 3 }],
        output: { id: 'leather_leggings', name: 'Dyed Leather Pants', count: 1 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'flint', name: 'Flint', count: 26 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 10
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'rabbit_hide', name: 'Rabbit Hide', count: 9 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 6 }],
        output: { id: 'leather_horse_armor', name: 'Leather Horse Armor', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'armadillo_scute', name: 'Scute', count: 4 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 6 }],
        output: { id: 'saddle', name: 'Saddle (Rideable Mounts)', count: 1 },
        maxUses: 12,
        xp: 15
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 5 }],
        output: { id: 'leather_chestplate', name: 'Master Leather Tunic', count: 1 },
        maxUses: 12,
        xp: 30
      }
    ]
  },
  {
    id: 'librarian',
    name: 'Librarian',
    workstation: 'Lectern',
    workstationId: 'lectern',
    role: 'Most sought-after villager: Sells Enchanted Books (Mending, Unbreaking, Fortune), Name Tags, and Lanterns.',
    themeColor: '#eab308',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'paper', name: 'Paper', count: 24 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 10 }, { id: 'book', name: 'Book', count: 1 }],
        output: { id: 'enchanted_book', name: 'Enchanted Book (Mending / Unbreaking III)', count: 1, enchanted: true },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 9 }],
        output: { id: 'bookshelf', name: 'Bookshelf', count: 1 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'book', name: 'Book', count: 4 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'lantern', name: 'Lantern', count: 1 },
        maxUses: 12,
        xp: 5
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'ink_sac', name: 'Ink Sac', count: 5 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'glass', name: 'Glass', count: 4 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'compass', name: 'Compass', count: 1 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 5 }],
        output: { id: 'clock', name: 'Clock', count: 1 },
        maxUses: 12,
        xp: 15
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 20 }],
        output: { id: 'name_tag', name: 'Name Tag (Name Mobs)', count: 1 },
        maxUses: 12,
        xp: 30
      }
    ]
  },
  {
    id: 'mason',
    name: 'Mason',
    workstation: 'Stonecutter',
    workstationId: 'stonecutter',
    role: 'Stoneworker buying raw stone and clay; sells bricks, dripstone, and glazed terracotta.',
    themeColor: '#64748b',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'clay_ball', name: 'Clay Ball', count: 10 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'bricks', name: 'Bricks', count: 10 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'stone', name: 'Stone', count: 20 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'chiseled_stone_bricks', name: 'Chiseled Stone Bricks', count: 4 },
        maxUses: 12,
        xp: 5
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'granite', name: 'Granite / Andesite / Diorite', count: 16 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 20
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'dripstone_block', name: 'Dripstone Block', count: 4 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'terracotta', name: 'Glazed Terracotta', count: 1 },
        maxUses: 12,
        xp: 15
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'quartz', name: 'Nether Quartz', count: 12 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'quartz_pillar', name: 'Quartz Pillar', count: 1 },
        maxUses: 12,
        xp: 30
      }
    ]
  },
  {
    id: 'shepherd',
    name: 'Shepherd',
    workstation: 'Loom',
    workstationId: 'loom',
    role: 'Textile master buying all 16 wools and dyes; sells shears, beds, and decorative banners.',
    themeColor: '#ec4899',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'wool', name: 'White Wool', count: 18 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 2 }],
        output: { id: 'shears', name: 'Shears', count: 1 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'dye', name: 'Dyes (All 16 Colors)', count: 12 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'carpet', name: 'Colored Carpet', count: 4 },
        maxUses: 12,
        xp: 5
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 3 }],
        output: { id: 'bed', name: 'Colored Bed', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 3 }],
        output: { id: 'banner', name: 'Colored Banner', count: 1 },
        maxUses: 12,
        xp: 15
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 2 }],
        output: { id: 'painting', name: 'Painting', count: 3 },
        maxUses: 12,
        xp: 30
      }
    ]
  },
  {
    id: 'toolsmith',
    name: 'Toolsmith',
    workstation: 'Smithing Table',
    workstationId: 'smithing_table',
    role: 'Forges iron and enchanted diamond mining pickaxes, axes, shovels, and hoes.',
    themeColor: '#14b8a6',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'coal', name: 'Coal', count: 15 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 1 }],
        output: { id: 'stone_pickaxe', name: 'Stone Pickaxe', count: 1 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'iron_ingot', name: 'Iron Ingot', count: 4 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 36 }],
        output: { id: 'bell', name: 'Bell', count: 1 },
        maxUses: 12,
        xp: 5
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'flint', name: 'Flint', count: 30 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 6 }],
        output: { id: 'iron_axe', name: 'Enchanted Iron Axe', count: 1, enchanted: true },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'diamond', name: 'Diamond', count: 1 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 12 }],
        output: { id: 'diamond_axe', name: 'Enchanted Diamond Axe', count: 1, enchanted: true },
        maxUses: 3,
        xp: 15
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 13 }],
        output: { id: 'diamond_pickaxe', name: 'Enchanted Diamond Pickaxe', count: 1, enchanted: true },
        maxUses: 3,
        xp: 30
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 5 }],
        output: { id: 'diamond_shovel', name: 'Enchanted Diamond Shovel', count: 1, enchanted: true },
        maxUses: 3,
        xp: 30
      }
    ]
  },
  {
    id: 'weaponsmith',
    name: 'Weaponsmith',
    workstation: 'Grindstone',
    workstationId: 'grindstone',
    role: 'Bladesmith supplying combat iron and enchanted diamond swords and battleaxes.',
    themeColor: '#f43f5e',
    trades: [
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'coal', name: 'Coal', count: 15 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 16,
        xp: 2
      },
      {
        tier: 1,
        tierName: 'Novice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 3 }],
        output: { id: 'iron_axe', name: 'Iron Axe', count: 1 },
        maxUses: 12,
        xp: 1
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'iron_ingot', name: 'Iron Ingot', count: 4 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 10
      },
      {
        tier: 2,
        tierName: 'Apprentice',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 36 }],
        output: { id: 'bell', name: 'Bell', count: 1 },
        maxUses: 12,
        xp: 5
      },
      {
        tier: 3,
        tierName: 'Journeyman',
        inputs: [{ id: 'flint', name: 'Flint', count: 24 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 20
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'diamond', name: 'Diamond', count: 1 }],
        output: { id: 'emerald', name: 'Emerald', count: 1 },
        maxUses: 12,
        xp: 30
      },
      {
        tier: 4,
        tierName: 'Expert',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 12 }],
        output: { id: 'diamond_axe', name: 'Enchanted Diamond Axe', count: 1, enchanted: true },
        maxUses: 3,
        xp: 15
      },
      {
        tier: 5,
        tierName: 'Master',
        inputs: [{ id: 'emerald', name: 'Emerald', count: 15 }],
        output: { id: 'diamond_sword', name: 'Enchanted Diamond Sword', count: 1, enchanted: true },
        maxUses: 3,
        xp: 30
      }
    ]
  }
];

export const NON_TRADING_VILLAGERS = [
  {
    id: 'nitwit',
    name: 'Nitwit (Green Robe)',
    role: 'Town Slacker',
    appearance: 'Identifiable by their olive-green tunic and lack of tools/aprons.',
    schedule: 'Goes to sleep at tick 14,000 (2,000 ticks after ordinary villagers) and wakes up late at tick 2,000.',
    mechanics: [
      'Cannot claim any job site blocks or acquire any profession.',
      'Cannot trade or level up under any circumstances.',
      'Can still breed with other villagers to produce fertile offspring.',
      'Can detect beds and panic during village raids, contributing to Iron Golem spawning threshold.'
    ]
  },
  {
    id: 'unemployed',
    name: 'Unemployed Villager',
    role: 'Workstation Seeker',
    appearance: 'Wears the baseline cultural clothing of their native biome without a profession hat or tool belt.',
    schedule: 'Routinely pathfinds toward unclaimed workstations within a 48-block radius between 2,000 and 9,000 ticks.',
    mechanics: [
      'Will adopt any available workstation placed within proximity.',
      'Trades can be infinitely rerolled by breaking and placing the workstation until a trade is locked.',
      'Trading once locks in their profession, career level, and current trade offerings permanently.'
    ]
  },
  {
    id: 'baby_villager',
    name: 'Baby Villager',
    role: 'Future Generation',
    appearance: 'Diminutive villager with large head, runs at 1.5× speed.',
    schedule: 'Plays tag with other baby villagers, gathers near the village bell, and bounces on beds.',
    mechanics: [
      'Takes exactly 20 minutes (1 full in-game day) to mature into an adult.',
      'Inherits biome skin from parents or the biome where birth occurred.',
      'Can be transported in boats or minecarts without triggering iron golem aggression.'
    ]
  }
];

export const WANDERING_TRADER_DATA = {
  name: 'Wandering Trader',
  spawning: 'Spawns periodically within a 48-block radius of the player accompanied by 2 Trader Llamas on leashes.',
  nightSurvival: 'Drinks a Potion of Invisibility at dusk (nightfall) to evade hostile mobs, and consumes a Milk Bucket at sunrise to remove invisibility.',
  mechanics: 'Offers 5 randomized tier-1 regional goods and 1 tier-2 rare specialty. Trades do not restock; despawns after 40–60 minutes.',
  trades: [
    { name: 'Slimeball', cost: 4, count: 1, rarity: 'Common' },
    { name: 'Nautilus Shell', cost: 5, count: 1, rarity: 'Rare' },
    { name: 'Packed Ice', cost: 3, count: 1, rarity: 'Common' },
    { name: 'Blue Ice', cost: 6, count: 1, rarity: 'Rare' },
    { name: 'Gunpowder', cost: 1, count: 1, rarity: 'Common' },
    { name: 'Glowstone Block', cost: 2, count: 1, rarity: 'Common' },
    { name: 'Cherry Sapling', cost: 5, count: 1, rarity: 'Biome Exclusive' },
    { name: 'Mangrove Propagule', cost: 5, count: 1, rarity: 'Biome Exclusive' },
    { name: 'Jungle Sapling', cost: 5, count: 1, rarity: 'Biome Exclusive' },
    { name: 'Sea Pickle', cost: 2, count: 1, rarity: 'Ocean Exclusive' },
    { name: 'Fern / Large Fern', cost: 1, count: 1, rarity: 'Foliage' },
    { name: 'Pufferfish Bucket', cost: 5, count: 1, rarity: 'Aquatic' }
  ]
};

export const BIOME_CLOTHING_VARIANTS = [
  { biome: 'Plains', outfit: 'Traditional brown tunic and leather belt', badgeLocation: 'Belt' },
  { biome: 'Desert', outfit: 'Light yellow-tinted caftan and protective desert turban', badgeLocation: 'Belt' },
  { biome: 'Savanna', outfit: 'Vibrant crimson-red wrap and beaded headband', badgeLocation: 'Belt' },
  { biome: 'Taiga', outfit: 'Thick brown shearling coat with wool fur collar', badgeLocation: 'Belt' },
  { biome: 'Snowy', outfit: 'Heavy insulated blue-grey parka with hood and mittens', badgeLocation: 'Belt' },
  { biome: 'Jungle', outfit: 'Lightweight tropical foliage wrap and decorative jungle leaf crest', badgeLocation: 'Belt' },
  { biome: 'Swamp', outfit: 'Olive-green waterproof garment crowned with a floating lilypad hat', badgeLocation: 'Belt' }
];

export const TRADING_ADVANCEMENTS = [
  {
    title: 'What a Deal!',
    desc: 'Successfully buy or sell an item with a villager for the first time.',
    icon: 'emerald',
    badge: 'Standard'
  },
  {
    title: 'Hero of the Village',
    desc: 'Successfully defeat an ominous Raid to protect the village and earn massive trade discounts.',
    icon: 'emerald_block',
    badge: 'Challenge'
  },
  {
    title: 'Zombie Doctor',
    desc: 'Weaken a zombie villager with a splash potion and cure them with a Golden Apple to unlock lifetime discounts.',
    icon: 'golden_apple',
    badge: 'Special'
  },
  {
    title: 'Star Trader',
    desc: 'Trade with a villager at the absolute world height limit (Y=319).',
    icon: 'diamond',
    badge: 'Secret'
  },
  {
    title: 'Hired Help',
    desc: 'Construct and summon an Iron Golem (4 Iron Blocks + Carved Pumpkin) to defend your village economy.',
    icon: 'iron_block',
    badge: 'Defense'
  }
];
