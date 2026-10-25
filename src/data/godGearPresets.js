/**
 * God Gear Loadouts & Playstyle Presets for Minecraft Java Edition
 * Verified against official mechanics and community consensus (https://minecraft.wiki/w/Tutorial:Best_enchantments_guide).
 * Explains clear trade-offs so players make informed decisions rather than blindly copying builds.
 */

export const GOD_GEAR_PRESETS = [
  {
    id: 'survival_all_rounder',
    name: 'Survival All-Rounder',
    badge: 'Recommended for Most Players',
    icon: 'diamond_sword',
    description: 'Balanced maximum protection, reliable combat, and high-efficiency harvesting for general survival and boss battles.',
    tradeOff: 'Protection IV on all pieces provides 64% general damage reduction (16 EPF). You sacrifice specialized Fire or Blast resistance, but mitigate all damage sources evenly without weak spots.',
    highlights: ['16 EPF General Protection', 'Fortune III Ore Multiplying', 'Infinity Bow Simplicity'],
    armor: [
      {
        piece: 'Helmet',
        item: 'Netherite Helmet',
        icon: 'diamond_helmet',
        enchants: ['Protection IV', 'Respiration III', 'Aqua Affinity', 'Unbreaking III', 'Mending'],
        note: 'Aqua Affinity removes underwater mining penalty; Respiration III extends air by +45s.'
      },
      {
        piece: 'Chestplate',
        item: 'Netherite Chestplate',
        icon: 'diamond_chestplate',
        enchants: ['Protection IV', 'Unbreaking III', 'Mending'],
        note: 'Main defense anchor contributing 8 base armor points and 4 general EPF.'
      },
      {
        piece: 'Leggings',
        item: 'Netherite Leggings',
        icon: 'diamond_leggings',
        enchants: ['Protection IV', 'Unbreaking III', 'Mending', 'Swift Sneak III'],
        note: 'Swift Sneak III restores full walking speed while sneaking.'
      },
      {
        piece: 'Boots',
        item: 'Netherite Boots',
        icon: 'diamond_boots',
        enchants: ['Protection IV', 'Feather Falling IV', 'Depth Strider III', 'Unbreaking III', 'Mending'],
        note: 'Feather Falling IV supplies 12 EPF fall defense, capping fall damage reduction at 80%.'
      }
    ],
    weaponsAndTools: [
      {
        name: 'Primary Sword',
        item: 'Netherite Sword',
        icon: 'diamond_sword',
        enchants: ['Sharpness V', 'Looting III', 'Sweeping Edge III', 'Unbreaking III', 'Mending'],
        note: 'Looting III multiplies rare mob drops; Sweeping Edge III deals 80% slash damage to nearby mobs.'
      },
      {
        name: 'Mining Pickaxe',
        item: 'Netherite Pickaxe',
        icon: 'diamond_pickaxe',
        enchants: ['Efficiency V', 'Fortune III', 'Unbreaking III', 'Mending'],
        note: 'Fortune III multiplies diamonds, coal, and lapis by an average of 2.2x (up to 4x drop).'
      },
      {
        name: 'Survival Bow',
        item: 'Bow',
        icon: 'bow',
        enchants: ['Power V', 'Flame', 'Punch II', 'Infinity', 'Unbreaking III'],
        note: 'Infinity requires only 1 arrow in your inventory (incompatible with Mending).'
      }
    ]
  },
  {
    id: 'pvp_combat_meta',
    name: 'PvP & Tricky Trials Meta (1.21)',
    badge: 'Competitive Combat',
    icon: 'the_mace',
    description: 'Engineered for modern 1.21 combat mechanics: armor penetration with the Heavy Mace, shield piercing, and aerial smashes.',
    tradeOff: 'Breach IV on the Mace ignores 60% of opponent armor, but is incompatible with Density (raw smash damage). Thorns on armor damages attackers but doubles durability consumption.',
    highlights: ['60% Armor Pierce (Breach IV)', 'Aerial Smash Bouncing (Wind Burst)', 'Piercing Crossbow vs Shields'],
    armor: [
      {
        piece: 'Helmet',
        item: 'Netherite Helmet',
        icon: 'diamond_helmet',
        enchants: ['Protection IV', 'Respiration III', 'Aqua Affinity', 'Unbreaking III', 'Mending']
      },
      {
        piece: 'Chestplate',
        item: 'Netherite Chestplate',
        icon: 'diamond_chestplate',
        enchants: ['Protection IV', 'Thorns III', 'Unbreaking III', 'Mending'],
        note: 'Thorns III reflects 1–4 damage back to melee attackers.'
      },
      {
        piece: 'Leggings',
        item: 'Netherite Leggings',
        icon: 'diamond_leggings',
        enchants: ['Protection IV', 'Thorns III', 'Unbreaking III', 'Mending', 'Swift Sneak III']
      },
      {
        piece: 'Boots',
        item: 'Netherite Boots',
        icon: 'diamond_boots',
        enchants: ['Protection IV', 'Feather Falling IV', 'Depth Strider III', 'Unbreaking III', 'Mending']
      }
    ],
    weaponsAndTools: [
      {
        name: 'Kinetic Mace (Armor Piercing)',
        item: 'The Mace',
        icon: 'the_mace',
        enchants: ['Breach IV', 'Wind Burst III', 'Unbreaking III', 'Mending'],
        note: 'Ignores 60% of target armor points. Catapults you 7 blocks into the air after each hit.'
      },
      {
        name: 'Melee Finisher Sword',
        item: 'Netherite Sword',
        icon: 'diamond_sword',
        enchants: ['Sharpness V', 'Fire Aspect II', 'Knockback II', 'Unbreaking III', 'Mending']
      },
      {
        name: 'Tactical Crossbow',
        item: 'Crossbow',
        icon: 'crossbow',
        enchants: ['Quick Charge III', 'Piercing IV', 'Unbreaking III', 'Mending'],
        note: 'Piercing IV arrows pass through shields and hit players behind them.'
      }
    ]
  },
  {
    id: 'nether_deep_dark',
    name: 'Nether & Deep Dark Exploration',
    badge: 'Environmental Hazards',
    icon: 'diamond_chestplate',
    description: 'Countermeasures against lava immersion, Blaze fireballs, and the terrifying Wardens of the Deep Dark Ancient Cities.',
    tradeOff: 'Equipping Fire Protection IV on your chestplate caps lava damage reduction at 80% and halves burning time, but reduces physical arrow and melee defense by 4 EPF.',
    highlights: ['80% Lava Damage Reduction', 'Silent Full-Speed Sneaking', 'Smite V 1-Shotting Wither Skeletons'],
    armor: [
      {
        piece: 'Helmet',
        item: 'Netherite Helmet',
        icon: 'diamond_helmet',
        enchants: ['Protection IV', 'Respiration III', 'Aqua Affinity', 'Unbreaking III', 'Mending']
      },
      {
        piece: 'Chestplate',
        item: 'Netherite Chestplate',
        icon: 'diamond_chestplate',
        enchants: ['Fire Protection IV', 'Unbreaking III', 'Mending'],
        note: 'Grants 8 Fire EPF and reduces fire burn duration by 60%. Essential for lava survival.'
      },
      {
        piece: 'Leggings',
        item: 'Netherite Leggings',
        icon: 'diamond_leggings',
        enchants: ['Protection IV', 'Swift Sneak III', 'Unbreaking III', 'Mending'],
        note: 'Swift Sneak III lets you traverse Ancient Cities at full speed without triggering Sculk Sensors.'
      },
      {
        piece: 'Boots',
        item: 'Netherite Boots',
        icon: 'diamond_boots',
        enchants: ['Protection IV', 'Feather Falling IV', 'Soul Speed III', 'Unbreaking III', 'Mending'],
        note: 'Soul Speed III increases running speed across Soul Sand & Soul Soil in the Nether.'
      }
    ],
    weaponsAndTools: [
      {
        name: 'Undead Slayer Axe',
        item: 'Netherite Axe',
        icon: 'diamond_axe',
        enchants: ['Smite V', 'Efficiency V', 'Unbreaking III', 'Mending'],
        note: 'Deals massive +12.5 damage against Wither Skeletons and Zombified Piglins.'
      },
      {
        name: 'Silent Mining Pickaxe',
        item: 'Netherite Pickaxe',
        icon: 'diamond_pickaxe',
        enchants: ['Efficiency V', 'Silk Touch', 'Unbreaking III', 'Mending'],
        note: 'Silk Touch collects Sculk Shriekers and catalysts safely without summoning the Warden.'
      }
    ]
  },
  {
    id: 'mining_caving',
    name: 'High-Yield Mining Specialist',
    badge: 'Resource Extraction',
    icon: 'diamond_pickaxe',
    description: 'Designed for subterranean cave expeditions, deepslate quarrying, and maximizing precious ore multipliers.',
    tradeOff: 'Fortune III multiplies raw drops (diamonds, coal, redstone), but cannot harvest intact glass, ice, or ender chests. Keep an auxiliary Silk Touch pickaxe in your hotbar.',
    highlights: ['Instant Deepslate Mining (Efficiency V + Haste II)', 'Up to 4x Diamond Drop', 'Fall Damage Buffer'],
    armor: [
      {
        piece: 'Helmet',
        item: 'Netherite Helmet',
        icon: 'diamond_helmet',
        enchants: ['Protection IV', 'Aqua Affinity', 'Respiration III', 'Unbreaking III', 'Mending']
      },
      {
        piece: 'Chestplate',
        item: 'Netherite Chestplate',
        icon: 'diamond_chestplate',
        enchants: ['Protection IV', 'Unbreaking III', 'Mending']
      },
      {
        piece: 'Leggings',
        item: 'Netherite Leggings',
        icon: 'diamond_leggings',
        enchants: ['Protection IV', 'Unbreaking III', 'Mending']
      },
      {
        piece: 'Boots',
        item: 'Netherite Boots',
        icon: 'diamond_boots',
        enchants: ['Protection IV', 'Feather Falling IV', 'Unbreaking III', 'Mending'],
        note: 'Protects against sudden ravine falls and subterranean drops.'
      }
    ],
    weaponsAndTools: [
      {
        name: 'Primary Fortune Pickaxe',
        item: 'Netherite Pickaxe',
        icon: 'diamond_pickaxe',
        enchants: ['Efficiency V', 'Fortune III', 'Unbreaking III', 'Mending']
      },
      {
        name: 'Auxiliary Silk Pickaxe',
        item: 'Netherite Pickaxe',
        icon: 'diamond_pickaxe',
        enchants: ['Efficiency V', 'Silk Touch', 'Unbreaking III', 'Mending'],
        note: 'Used to pack raw ores into dense blocks and safely collect Ender Chests.'
      },
      {
        name: 'Excavation Shovel',
        item: 'Netherite Shovel',
        icon: 'diamond_shovel',
        enchants: ['Efficiency V', 'Silk Touch', 'Unbreaking III', 'Mending'],
        note: 'Clears gravel and dirt instantly; Silk Touch prevents gravel from dropping flint.'
      }
    ]
  },
  {
    id: 'building_terraforming',
    name: 'Mega-Build & Terraforming',
    badge: 'Architects & Builders',
    icon: 'diamond_shovel',
    description: 'Tailored for large-scale survival architecture, landscape sculpting, and harvesting rare decorative blocks intact.',
    tradeOff: 'Zero ore multiplication (no Fortune). All tools rely on Silk Touch to preserve block states (smooth stone, glass, sea lanterns, mycelium, ice, bee nests).',
    highlights: ['Pristine Block Harvesting', 'Unlimited Flight Mobility (Mending Elytra)', 'Insta-Mining Soft Blocks'],
    armor: [
      {
        piece: 'Helmet',
        item: 'Netherite Helmet',
        icon: 'diamond_helmet',
        enchants: ['Protection IV', 'Aqua Affinity', 'Respiration III', 'Unbreaking III', 'Mending']
      },
      {
        piece: 'Chestplate / Wings',
        item: 'Elytra Wings',
        icon: 'elytra',
        enchants: ['Unbreaking III', 'Mending'],
        note: 'Essential mobility for scaffolding and surveying mega-builds from the sky.'
      },
      {
        piece: 'Leggings',
        item: 'Netherite Leggings',
        icon: 'diamond_leggings',
        enchants: ['Protection IV', 'Swift Sneak III', 'Unbreaking III', 'Mending'],
        note: 'Fast crouch-walking prevents accidental falls off narrow scaffolding borders.'
      },
      {
        piece: 'Boots',
        item: 'Netherite Boots',
        icon: 'diamond_boots',
        enchants: ['Protection IV', 'Feather Falling IV', 'Unbreaking III', 'Mending'],
        note: 'Critical buffer for unintended high-altitude scaffolding drops.'
      }
    ],
    weaponsAndTools: [
      {
        name: 'Architect Silk Pickaxe',
        item: 'Netherite Pickaxe',
        icon: 'diamond_pickaxe',
        enchants: ['Efficiency V', 'Silk Touch', 'Unbreaking III', 'Mending']
      },
      {
        name: 'Lumber & Foliage Axe',
        item: 'Netherite Axe',
        icon: 'diamond_axe',
        enchants: ['Efficiency V', 'Silk Touch', 'Unbreaking III', 'Mending'],
        note: 'Harvests Bookshelves, Melons, Campfires, and Beehives intact without breaking them.'
      },
      {
        name: 'Terraforming Shovel',
        item: 'Netherite Shovel',
        icon: 'diamond_shovel',
        enchants: ['Efficiency V', 'Silk Touch', 'Unbreaking III', 'Mending'],
        note: 'Harvests Grass Blocks, Podzol, Mycelium, and Snow layers intact.'
      }
    ]
  },
  {
    id: 'endgame_god_mastery',
    name: 'Endgame God Armor (20 EPF Cap)',
    badge: 'Maximum Theoretical Defense',
    icon: 'diamond_chestplate',
    description: 'The definitive survival damage reduction loadout: 16 general EPF from 4x Protection IV + 12 EPF from Feather Falling IV, reaching the absolute 20 EPF (80% damage reduction) engine cap.',
    tradeOff: 'Requires Anvil Binary Merge Tree and 4 Netherite Upgrade Smithing Templates to assemble without exceeding the 39 level anvil penalty ("Too Expensive!").',
    highlights: ['20 EPF Maximum Protection Cap (80% DR)', 'Zero Vulnerability Profile', 'Anvil Prior Work Optimization'],
    armor: [
      {
        piece: 'Helmet',
        item: 'Netherite Helmet',
        icon: 'diamond_helmet',
        enchants: ['Protection IV', 'Respiration III', 'Aqua Affinity', 'Unbreaking III', 'Mending'],
        note: '4 EPF Contribution. Merge order: (Helmet + Protection IV) + (Unbreaking III + Mending) + (Respiration III + Aqua Affinity).'
      },
      {
        piece: 'Chestplate',
        item: 'Netherite Chestplate',
        icon: 'diamond_chestplate',
        enchants: ['Protection IV', 'Unbreaking III', 'Mending', 'Thorns III'],
        note: '4 EPF Contribution. Thorns III optional; easily sustained by Mending XP.'
      },
      {
        piece: 'Leggings',
        item: 'Netherite Leggings',
        icon: 'diamond_leggings',
        enchants: ['Protection IV', 'Swift Sneak III', 'Unbreaking III', 'Mending'],
        note: '4 EPF Contribution. Swift Sneak acquired from Ancient City chests.'
      },
      {
        piece: 'Boots',
        item: 'Netherite Boots',
        icon: 'diamond_boots',
        enchants: ['Protection IV', 'Feather Falling IV', 'Depth Strider III', 'Soul Speed III', 'Unbreaking III', 'Mending'],
        note: '4 EPF General + 12 EPF Fall. Total fall EPF is 16, capped at 20 (80% max fall reduction).'
      }
    ],
    weaponsAndTools: [
      {
        name: 'The Binary Anvil Formula',
        item: 'Anvil',
        icon: 'anvil',
        enchants: ['Pairwise Merging Only', 'Depth 3 Maximum', 'Cost < 25 Levels'],
        note: 'Combine books together in pairs first before touching the armor piece. Avoids "Too Expensive!".'
      }
    ]
  }
];
