// Comprehensive Official Minecraft Java Edition Smithing & Armor Trimming Database
// Directly grounded in official Minecraft Java Edition mechanics & Minecraft Wiki (1.20 - 1.21 Tricky Trials & 2026)

export const SMITHING_TEMPLATES = [
  // ==========================================
  // UPGRADE TEMPLATE
  // ==========================================
  {
    id: 'netherite_upgrade',
    name: 'Netherite Upgrade',
    type: 'Upgrade',
    icon: '/icons/minecraft/netherite_upgrade_smithing_template.svg',
    source: 'Bastion Remnants (Chests & Treasure Rooms)',
    rarity: 'Guaranteed 100% in Treasure Room chests; 10% in other Bastion chests',
    duplicationBlock: { name: 'Netherrack', icon: '/icons/minecraft/netherrack.svg' },
    appliesTo: 'Diamond Equipment (Armor & Tools)',
    ingredients: 'Netherite Ingot',
    desc: 'The only template that upgrades diamond gear to indestructible Netherite tier. Retains all existing enchantments, custom names, and repair history!',
    version: '1.20+'
  },

  // ==========================================
  // 1.21 TRICKY TRIALS TEMPLATES (NEWEST)
  // ==========================================
  {
    id: 'flow',
    name: 'Flow Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/flow_armor_trim_smithing_template.svg',
    source: 'Trial Chambers (Ominous Vaults / Standard Vaults)',
    rarity: 'Rare (22.5% from Ominous Vaults)',
    duplicationBlock: { name: 'Breeze Rod', icon: '/icons/minecraft/breeze_rod.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Dynamic swirling wind currents and atmospheric swirl accents inspired by the Breeze mob.',
    version: '1.21 Tricky Trials'
  },
  {
    id: 'bolt',
    name: 'Bolt Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/bolt_armor_trim_smithing_template.svg',
    source: 'Trial Chambers (Standard Vaults)',
    rarity: 'Uncommon (5.4% from Standard Vaults)',
    duplicationBlock: { name: 'Copper Block', icon: '/icons/minecraft/copper_ingot.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Angular industrial zigzag rivets and bolt-fastener seams reminiscent of Copper Grates and oxidized trial machinery.',
    version: '1.21 Tricky Trials'
  },

  // ==========================================
  // 1.20 TRAILS & TALES TEMPLATES
  // ==========================================
  {
    id: 'silence',
    name: 'Silence Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/silence_armor_trim_smithing_template.svg',
    source: 'Ancient Cities (Deep Dark Chests)',
    rarity: 'Extremely Rare (1.2% per chest) — Rarest trim in Minecraft!',
    duplicationBlock: { name: 'Cobbled Deepslate', icon: '/icons/minecraft/cobbled_deepslate.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'The most prestigious armor trim in the game. Covers almost the entire armor surface in ornate, glowing runic plates.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'ward',
    name: 'Ward Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/ward_armor_trim_smithing_template.svg',
    source: 'Ancient Cities (Deep Dark Chests)',
    rarity: 'Rare (5% per chest)',
    duplicationBlock: { name: 'Cobbled Deepslate', icon: '/icons/minecraft/cobbled_deepslate.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Warden-inspired resonant rib plates that mimic the shrieking sound-sensor chest of the Warden.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'eye',
    name: 'Eye Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/eye_armor_trim_smithing_template.svg',
    source: 'Strongholds (Library & Altar Chests)',
    rarity: 'Uncommon (100% in Library chests; 10% in Altar chests)',
    duplicationBlock: { name: 'End Stone', icon: '/icons/minecraft/stone.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Mystical Eye of Ender shaped emblem embossed into the breastplate and visor slits.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'spire',
    name: 'Spire Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/spire_armor_trim_smithing_template.svg',
    source: 'End Cities (Treasure Chests)',
    rarity: 'Uncommon (6.7% per chest)',
    duplicationBlock: { name: 'Purpur Block', icon: '/icons/minecraft/popped_chorus_fruit.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Futuristic upward-reaching spires and clean perpendicular geometric stripes from the outer End.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'tide',
    name: 'Tide Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/tide_armor_trim_smithing_template.svg',
    source: 'Ocean Monuments (Elder Guardian Drop)',
    rarity: 'Guaranteed 20% drop upon killing an Elder Guardian (increased with Looting)',
    duplicationBlock: { name: 'Prismarine', icon: '/icons/minecraft/diamond.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Aquatic wave motifs and marine crests honoring the ocean depths and monuments.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'snout',
    name: 'Snout Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/snout_armor_trim_smithing_template.svg',
    source: 'Bastion Remnants (Chests)',
    rarity: 'Common (8.3% per chest)',
    duplicationBlock: { name: 'Blackstone', icon: '/icons/minecraft/cobblestone.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Brutalist Piglin snout nose crest and heavy Nether bastion armor plating.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'rib',
    name: 'Rib Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/rib_armor_trim_smithing_template.svg',
    source: 'Nether Fortresses (Chests)',
    rarity: 'Common (6.7% per chest)',
    duplicationBlock: { name: 'Netherrack', icon: '/icons/minecraft/netherrack.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Skeletal Wither Skeleton ribcage pattern with bone-like lateral rib struts.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'vex',
    name: 'Vex Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/vex_armor_trim_smithing_template.svg',
    source: 'Woodland Mansions (Chests)',
    rarity: 'Rare (50% in specific mansion secret chests)',
    duplicationBlock: { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Vex wing curves and Evoker eyebrow eyebrows stamped in ceremonial woodland flair.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'sentry',
    name: 'Sentry Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/sentry_armor_trim_smithing_template.svg',
    source: 'Pillager Outposts (Chests)',
    rarity: 'Common (25% per chest)',
    duplicationBlock: { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Frontline pillager guard chevron patterns with reinforced shoulder caps.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'coast',
    name: 'Coast Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/coast_armor_trim_smithing_template.svg',
    source: 'Shipwrecks (Map / Treasure Chests)',
    rarity: 'Common (16.7% per chest)',
    duplicationBlock: { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Sailor hull patterns and nautical coastlines resembling oceanic drift.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'dune',
    name: 'Dune Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/dune_armor_trim_smithing_template.svg',
    source: 'Desert Pyramids (Chests)',
    rarity: 'Common (14.3% per chest)',
    duplicationBlock: { name: 'Sandstone', icon: '/icons/minecraft/sand.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Symmetrical desert pyramid tiers and pharaoh-like curved sand dune lines.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'wild',
    name: 'Wild Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/wild_armor_trim_smithing_template.svg',
    source: 'Jungle Pyramids (Chests)',
    rarity: 'Common (33.3% per chest)',
    duplicationBlock: { name: 'Mossy Cobblestone', icon: '/icons/minecraft/cobblestone.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Overgrown jungle vines and ancient tribal step-pyramid carvings.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'wayfinder',
    name: 'Wayfinder Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/wayfinder_armor_trim_smithing_template.svg',
    source: 'Trail Ruins (Suspicious Gravel Archaeology)',
    rarity: 'Archaeology brush find (8.3% from Rare gravel)',
    duplicationBlock: { name: 'Terracotta', icon: '/icons/minecraft/terracotta.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Nomadic navigator visor slits and compass directional road markings.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'raiser',
    name: 'Raiser Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/raiser_armor_trim_smithing_template.svg',
    source: 'Trail Ruins (Suspicious Gravel Archaeology)',
    rarity: 'Archaeology brush find (8.3% from Rare gravel)',
    duplicationBlock: { name: 'Terracotta', icon: '/icons/minecraft/terracotta.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Step-tiered ascending bands that rise up the breastplate and shins.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'shaper',
    name: 'Shaper Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/shaper_armor_trim_smithing_template.svg',
    source: 'Trail Ruins (Suspicious Gravel Archaeology)',
    rarity: 'Archaeology brush find (8.3% from Rare gravel)',
    duplicationBlock: { name: 'Terracotta', icon: '/icons/minecraft/terracotta.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Sculptor molding trims and geometric archway borders.',
    version: '1.20 Trails & Tales'
  },
  {
    id: 'host',
    name: 'Host Armor Trim',
    type: 'Trim',
    icon: '/icons/minecraft/host_armor_trim_smithing_template.svg',
    source: 'Trail Ruins (Suspicious Gravel Archaeology)',
    rarity: 'Archaeology brush find (8.3% from Rare gravel)',
    duplicationBlock: { name: 'Terracotta', icon: '/icons/minecraft/terracotta.svg' },
    appliesTo: 'Any Armor Piece',
    desc: 'Ceremonial banquet patterns with wide heraldic crest plates.',
    version: '1.20 Trails & Tales'
  }
];

export const TRIM_MATERIALS = [
  {
    id: 'amethyst',
    name: 'Amethyst Shard',
    icon: '/icons/minecraft/amethyst_shard.svg',
    hex: '#9a5cc6',
    darkHex: '#7a3da6',
    highlight: '#b87be6',
    tooltipCode: '§d',
    tooltipColorName: 'Light Purple',
    tooltipColorHex: '#d870ff',
    desc: 'Vibrant crystalline purple shimmer from amethyst geodes.'
  },
  {
    id: 'copper',
    name: 'Copper Ingot',
    icon: '/icons/minecraft/copper_ingot.svg',
    hex: '#b4684d',
    darkHex: '#8a4832',
    highlight: '#d4856b',
    tooltipCode: '§6',
    tooltipColorName: 'Gold / Orange',
    tooltipColorHex: '#ffaa00',
    desc: 'Warm industrial burnished metallic orange.'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    icon: '/icons/minecraft/diamond.svg',
    hex: '#64c7cc',
    darkHex: '#3f9ba0',
    highlight: '#8cf0f5',
    tooltipCode: '§b',
    tooltipColorName: 'Aqua',
    tooltipColorHex: '#55ffff',
    desc: 'Iconic glowing cyan brilliance; the quintessential flex.'
  },
  {
    id: 'emerald',
    name: 'Emerald',
    icon: '/icons/minecraft/emerald.svg',
    hex: '#17a153',
    darkHex: '#0f6f38',
    highlight: '#2bd171',
    tooltipCode: '§a',
    tooltipColorName: 'Green',
    tooltipColorHex: '#55ff55',
    desc: 'Rich royal green gemstone color from mountain villages.'
  },
  {
    id: 'gold',
    name: 'Gold Ingot',
    icon: '/icons/minecraft/gold_ingot.svg',
    hex: '#ecc141',
    darkHex: '#ba8e1e',
    highlight: '#ffdf6d',
    tooltipCode: '§e',
    tooltipColorName: 'Yellow',
    tooltipColorHex: '#ffff55',
    desc: 'Lustrous, radiant golden nobility.'
  },
  {
    id: 'iron',
    name: 'Iron Ingot',
    icon: '/icons/minecraft/iron_ingot.svg',
    hex: '#c6c6c6',
    darkHex: '#8f8f8f',
    highlight: '#e3e3e3',
    tooltipCode: '§f',
    tooltipColorName: 'White',
    tooltipColorHex: '#ffffff',
    desc: 'Polished silver-white industrial steel finish.'
  },
  {
    id: 'lapis',
    name: 'Lapis Lazuli',
    icon: '/icons/minecraft/lapis_lazuli.svg',
    hex: '#345ec3',
    darkHex: '#1d3b87',
    highlight: '#4a76db',
    tooltipCode: '§9',
    tooltipColorName: 'Blue',
    tooltipColorHex: '#5555ff',
    desc: 'Deep oceanic royal blue magical pigment.'
  },
  {
    id: 'quartz',
    name: 'Nether Quartz',
    icon: '/icons/minecraft/quartz.svg',
    hex: '#eae5de',
    darkHex: '#b3aba0',
    highlight: '#ffffff',
    tooltipCode: '§f',
    tooltipColorName: 'White',
    tooltipColorHex: '#ffffff',
    desc: 'Chalk-white crystalline contrast from Nether depths.'
  },
  {
    id: 'netherite',
    name: 'Netherite Ingot',
    icon: '/icons/minecraft/netherite_ingot.svg',
    hex: '#312c36',
    darkHex: '#1c1820',
    highlight: '#484250',
    tooltipCode: '§8',
    tooltipColorName: 'Dark Gray',
    tooltipColorHex: '#555555',
    desc: 'Dark stealth obsidian charcoal with volcanic undertones.'
  },
  {
    id: 'redstone',
    name: 'Redstone Dust',
    icon: '/icons/minecraft/redstone.svg',
    hex: '#cf2424',
    darkHex: '#8a1212',
    highlight: '#f54545',
    tooltipCode: '§c',
    tooltipColorName: 'Red',
    tooltipColorHex: '#ff5555',
    desc: 'Luminous vivid crimson redstone energy veins.'
  }
];

export const ARMOR_BASE_SETS = [
  {
    id: 'netherite',
    name: 'Netherite Armor',
    material: 'netherite',
    badge: 'Tier 6 (Endgame)',
    armorTotal: 20,
    toughnessTotal: 12,
    knockbackTotal: '+40% (4)',
    durabilitySummary: '481 - 592 per piece',
    lavaImmune: true,
    color: '#36343b',
    pieces: {
      helmet: { name: 'Netherite Helmet', icon: '/icons/minecraft/netherite_helmet.svg', armor: 3, toughness: 3, kb: 1 },
      chestplate: { name: 'Netherite Chestplate', icon: '/icons/minecraft/netherite_chestplate.svg', armor: 8, toughness: 3, kb: 1 },
      leggings: { name: 'Netherite Leggings', icon: '/icons/minecraft/netherite_leggings.svg', armor: 6, toughness: 3, kb: 1 },
      boots: { name: 'Netherite Boots', icon: '/icons/minecraft/netherite_boots.svg', armor: 3, toughness: 3, kb: 1 }
    }
  },
  {
    id: 'diamond',
    name: 'Diamond Armor',
    material: 'diamond',
    badge: 'Tier 5 (Diamond)',
    armorTotal: 20,
    toughnessTotal: 8,
    knockbackTotal: '0%',
    durabilitySummary: '363 - 528 per piece',
    lavaImmune: false,
    color: '#49c8ce',
    pieces: {
      helmet: { name: 'Diamond Helmet', icon: '/icons/minecraft/diamond_helmet.svg', armor: 3, toughness: 2, kb: 0 },
      chestplate: { name: 'Diamond Chestplate', icon: '/icons/minecraft/diamond_chestplate.svg', armor: 8, toughness: 2, kb: 0 },
      leggings: { name: 'Diamond Leggings', icon: '/icons/minecraft/diamond_leggings.svg', armor: 6, toughness: 2, kb: 0 },
      boots: { name: 'Diamond Boots', icon: '/icons/minecraft/diamond_boots.svg', armor: 3, toughness: 2, kb: 0 }
    }
  },
  {
    id: 'iron',
    name: 'Iron Armor',
    material: 'iron',
    badge: 'Tier 3 (Iron)',
    armorTotal: 15,
    toughnessTotal: 0,
    knockbackTotal: '0%',
    durabilitySummary: '165 - 240 per piece',
    lavaImmune: false,
    color: '#d8d8d8',
    pieces: {
      helmet: { name: 'Iron Helmet', icon: '/icons/minecraft/iron_helmet.svg', armor: 2, toughness: 0, kb: 0 },
      chestplate: { name: 'Iron Chestplate', icon: '/icons/minecraft/iron_chestplate.svg', armor: 6, toughness: 0, kb: 0 },
      leggings: { name: 'Iron Leggings', icon: '/icons/minecraft/iron_leggings.svg', armor: 5, toughness: 0, kb: 0 },
      boots: { name: 'Iron Boots', icon: '/icons/minecraft/iron_boots.svg', armor: 2, toughness: 0, kb: 0 }
    }
  },
  {
    id: 'golden',
    name: 'Golden Armor',
    material: 'gold',
    badge: 'Tier 2 (Gold / Piglin Friendly)',
    armorTotal: 11,
    toughnessTotal: 0,
    knockbackTotal: '0%',
    durabilitySummary: '77 - 112 per piece',
    lavaImmune: false,
    color: '#eec23b',
    pieces: {
      helmet: { name: 'Golden Helmet', icon: '/icons/minecraft/golden_helmet.svg', armor: 2, toughness: 0, kb: 0 },
      chestplate: { name: 'Golden Chestplate', icon: '/icons/minecraft/golden_chestplate.svg', armor: 5, toughness: 0, kb: 0 },
      leggings: { name: 'Golden Leggings', icon: '/icons/minecraft/golden_leggings.svg', armor: 3, toughness: 0, kb: 0 },
      boots: { name: 'Golden Boots', icon: '/icons/minecraft/golden_boots.svg', armor: 1, toughness: 0, kb: 0 }
    }
  },
  {
    id: 'chainmail',
    name: 'Chainmail Armor',
    material: 'chainmail',
    badge: 'Rare Mob Drop',
    armorTotal: 12,
    toughnessTotal: 0,
    knockbackTotal: '0%',
    durabilitySummary: '165 - 240 per piece',
    lavaImmune: false,
    color: '#909090',
    pieces: {
      helmet: { name: 'Chainmail Helmet', icon: '/icons/minecraft/chainmail_helmet.svg', armor: 2, toughness: 0, kb: 0 },
      chestplate: { name: 'Chainmail Chestplate', icon: '/icons/minecraft/chainmail_chestplate.svg', armor: 5, toughness: 0, kb: 0 },
      leggings: { name: 'Chainmail Leggings', icon: '/icons/minecraft/chainmail_leggings.svg', armor: 4, toughness: 0, kb: 0 },
      boots: { name: 'Chainmail Boots', icon: '/icons/minecraft/chainmail_boots.svg', armor: 1, toughness: 0, kb: 0 }
    }
  },
  {
    id: 'turtle',
    name: 'Turtle Shell',
    material: 'turtle',
    badge: 'Water Breathing',
    armorTotal: 2,
    toughnessTotal: 0,
    knockbackTotal: '0%',
    durabilitySummary: '275 durability',
    lavaImmune: false,
    color: '#288448',
    pieces: {
      helmet: { name: 'Turtle Shell', icon: '/icons/minecraft/turtle_shell.svg', armor: 2, toughness: 0, kb: 0 }
    }
  }
];

export const NETHERITE_UPGRADE_ITEMS = [
  // Armor
  {
    id: 'up_helmet',
    name: 'Diamond Helmet to Netherite Helmet',
    type: 'Armor',
    base: { name: 'Diamond Helmet', icon: '/icons/minecraft/diamond_helmet.svg' },
    result: { name: 'Netherite Helmet', icon: '/icons/minecraft/netherite_helmet.svg' },
    statsDiff: {
      durability: '363 → 407 (+44)',
      armor: '3 (Equal)',
      toughness: '2 → 3 (+1 Toughness)',
      knockback: '0% → 10% (1 Point)',
      perks: 'Does not burn in lava or fire (floats)'
    }
  },
  {
    id: 'up_chestplate',
    name: 'Diamond Chestplate to Netherite Chestplate',
    type: 'Armor',
    base: { name: 'Diamond Chestplate', icon: '/icons/minecraft/diamond_chestplate.svg' },
    result: { name: 'Netherite Chestplate', icon: '/icons/minecraft/netherite_chestplate.svg' },
    statsDiff: {
      durability: '528 → 592 (+64)',
      armor: '8 (Equal)',
      toughness: '2 → 3 (+1 Toughness)',
      knockback: '0% → 10% (1 Point)',
      perks: 'Immune to lava damage & floats on surface'
    }
  },
  {
    id: 'up_leggings',
    name: 'Diamond Leggings to Netherite Leggings',
    type: 'Armor',
    base: { name: 'Diamond Leggings', icon: '/icons/minecraft/diamond_leggings.svg' },
    result: { name: 'Netherite Leggings', icon: '/icons/minecraft/netherite_leggings.svg' },
    statsDiff: {
      durability: '495 → 555 (+60)',
      armor: '6 (Equal)',
      toughness: '2 → 3 (+1 Toughness)',
      knockback: '0% → 10% (1 Point)',
      perks: 'Lava-proof & +1 Armor Toughness'
    }
  },
  {
    id: 'up_boots',
    name: 'Diamond Boots to Netherite Boots',
    type: 'Armor',
    base: { name: 'Diamond Boots', icon: '/icons/minecraft/diamond_boots.svg' },
    result: { name: 'Netherite Boots', icon: '/icons/minecraft/netherite_boots.svg' },
    statsDiff: {
      durability: '429 → 481 (+52)',
      armor: '3 (Equal)',
      toughness: '2 → 3 (+1 Toughness)',
      knockback: '0% → 10% (1 Point)',
      perks: 'Full suit achieves +40% Knockback Resist!'
    }
  },
  // Weapons & Tools
  {
    id: 'up_sword',
    name: 'Diamond Sword to Netherite Sword',
    type: 'Weapon',
    base: { name: 'Diamond Sword', icon: '/icons/minecraft/diamond_sword.svg' },
    result: { name: 'Netherite Sword', icon: '/icons/minecraft/netherite_sword.svg' },
    statsDiff: {
      durability: '1561 → 2031 (+470 hits)',
      damage: '7.0 → 8.0 (+1 Attack Damage)',
      speed: '1.6 Attack Speed',
      perks: 'Floats on lava, preserves Sharpness/Looting'
    }
  },
  {
    id: 'up_pickaxe',
    name: 'Diamond Pickaxe to Netherite Pickaxe',
    type: 'Tool',
    base: { name: 'Diamond Pickaxe', icon: '/icons/minecraft/diamond_pickaxe.svg' },
    result: { name: 'Netherite Pickaxe', icon: '/icons/minecraft/netherite_pickaxe.svg' },
    statsDiff: {
      durability: '1561 → 2031 (+470 uses)',
      miningSpeed: '8.0× → 9.0× Mining Multiplier',
      damage: '5.0 → 6.0',
      perks: 'Fastest pickaxe in the game!'
    }
  },
  {
    id: 'up_axe',
    name: 'Diamond Axe to Netherite Axe',
    type: 'Tool',
    base: { name: 'Diamond Axe', icon: '/icons/minecraft/diamond_axe.svg' },
    result: { name: 'Netherite Axe', icon: '/icons/minecraft/netherite_axe.svg' },
    statsDiff: {
      durability: '1561 → 2031 (+470 uses)',
      damage: '9.0 → 10.0 (High single-hit burst)',
      speed: '1.0 Attack Speed',
      perks: 'Insta-chops logs with Efficiency V'
    }
  },
  {
    id: 'up_shovel',
    name: 'Diamond Shovel to Netherite Shovel',
    type: 'Tool',
    base: { name: 'Diamond Shovel', icon: '/icons/minecraft/diamond_shovel.svg' },
    result: { name: 'Netherite Shovel', icon: '/icons/minecraft/netherite_shovel.svg' },
    statsDiff: {
      durability: '1561 → 2031 (+470 uses)',
      damage: '5.5 → 6.5',
      perks: 'Clears dirt, gravel, sand instantly'
    }
  },
  {
    id: 'up_hoe',
    name: 'Diamond Hoe to Netherite Hoe',
    type: 'Tool',
    base: { name: 'Diamond Hoe', icon: '/icons/minecraft/diamond_hoe.svg' },
    result: { name: 'Netherite Hoe', icon: '/icons/minecraft/netherite_hoe.svg' },
    statsDiff: {
      durability: '1561 → 2031 (+470 uses)',
      damage: '1.0 (4.0 Speed)',
      perks: 'Unlocks the "Serious Dedication" Advancement!'
    }
  }
];

export const SMITHING_ADVANCEMENTS = [
  {
    id: 'crafting_a_new_look',
    title: 'Crafting a New Look',
    type: 'Normal Advancement',
    icon: '/icons/minecraft/coast_armor_trim_smithing_template.svg',
    category: 'Adventure',
    desc: 'Craft a trimmed armor at a smithing table using any smithing template.',
    xp: '50 EXP'
  },
  {
    id: 'smithing_with_style',
    title: 'Smithing with Style',
    type: 'Challenge Advancement',
    icon: '/icons/minecraft/silence_armor_trim_smithing_template.svg',
    category: 'Adventure',
    desc: 'Apply these 8 rare smithing templates at least once: Spire, Snout, Rib, Ward, Silence, Vex, Tide, Wayfinder.',
    xp: '150 EXP (Fanfare Trophy)'
  },
  {
    id: 'cover_me_in_debris',
    title: 'Cover Me in Debris',
    type: 'Advancement',
    icon: '/icons/minecraft/netherite_chestplate.svg',
    category: 'Nether',
    desc: 'Obtain a full suit of Netherite armor (Helmet, Chestplate, Leggings, Boots).',
    xp: '100 EXP'
  },
  {
    id: 'serious_dedication',
    title: 'Serious Dedication',
    type: 'Challenge Advancement',
    icon: '/icons/minecraft/netherite_hoe.svg',
    category: 'Husbandry',
    desc: 'Completely upgrade a Diamond Hoe with a Netherite Ingot, then re-evaluate your life choices.',
    xp: '100 EXP'
  }
];
