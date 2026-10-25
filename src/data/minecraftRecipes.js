// Comprehensive Authentic Minecraft Java Edition Recipe Database
// All recipes strictly adhere to official Java Edition crafting mechanics!

export const RECIPE_CATEGORIES = [
  'All',
  'Tools',
  'Combat',
  'Armor',
  'Redstone',
  'Building',
  'Food',
  'Transport',
  'Modern 2024-2026'
];

export const AUTHENTIC_RECIPES = [
  // ==========================================
  // MODERN 2024–2026 GAME DROPS
  // ==========================================
  {
    id: 'the_mace',
    name: 'The Mace',
    category: 'Modern 2024-2026',
    outputCount: 1,
    version: '1.21 Tricky Trials',
    shapeless: false,
    tags: ['mace', 'weapon', 'hammer', 'heavy core', 'breeze rod', 'smash', 'combat'],
    grid: [
      null, null, null,
      null, { name: 'Heavy Core', icon: '/icons/minecraft/heavy_core.svg' }, null,
      null, { name: 'Breeze Rod', icon: '/icons/minecraft/breeze_rod.svg' }, null
    ],
    result: {
      name: 'The Mace',
      icon: '/icons/minecraft/the_mace.svg',
      count: 1,
      desc: 'High-impact smash melee weapon. Damage scales with fall distance. Landing a hit negates all fall damage!'
    },
    ingredients: [
      { name: 'Heavy Core', count: 1, icon: '/icons/minecraft/heavy_core.svg' },
      { name: 'Breeze Rod', count: 1, icon: '/icons/minecraft/breeze_rod.svg' }
    ]
  },
  {
    id: 'crafter',
    name: 'The Crafter',
    category: 'Modern 2024-2026',
    outputCount: 1,
    version: '1.21 Tricky Trials',
    shapeless: false,
    tags: ['crafter', 'automation', 'redstone', 'iron', 'crafting table', 'dropper'],
    grid: [
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Crafting Table', icon: '/icons/minecraft/crafting_table.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Redstone Dust', icon: '/icons/minecraft/redstone_dust.svg' }, { name: 'Dropper', icon: '/icons/minecraft/dropper.svg' }, { name: 'Redstone Dust', icon: '/icons/minecraft/redstone_dust.svg' }
    ],
    result: {
      name: 'The Crafter',
      icon: '/icons/minecraft/crafter.svg',
      count: 1,
      desc: 'Autonomous crafting block powered by redstone pulses. Automates 3x3 recipe loops and factories.'
    },
    ingredients: [
      { name: 'Iron Ingot', count: 5, icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Crafting Table', count: 1, icon: '/icons/minecraft/crafting_table.svg' },
      { name: 'Dropper', count: 1, icon: '/icons/minecraft/dropper.svg' },
      { name: 'Redstone Dust', count: 2, icon: '/icons/minecraft/redstone_dust.svg' }
    ]
  },
  {
    id: 'bundle',
    name: 'The Bundle',
    category: 'Modern 2024-2026',
    outputCount: 1,
    version: '1.21.2 Bundles of Bravery',
    shapeless: false,
    tags: ['bundle', 'storage', 'inventory', 'leather', 'string', 'bravery'],
    grid: [
      { name: 'String', icon: '/icons/minecraft/string.svg' }, { name: 'Leather', icon: '/icons/minecraft/leather.svg' }, { name: 'String', icon: '/icons/minecraft/string.svg' },
      { name: 'Leather', icon: '/icons/minecraft/leather.svg' }, null, { name: 'Leather', icon: '/icons/minecraft/leather.svg' },
      { name: 'Leather', icon: '/icons/minecraft/leather.svg' }, { name: 'Leather', icon: '/icons/minecraft/leather.svg' }, { name: 'Leather', icon: '/icons/minecraft/leather.svg' }
    ],
    result: {
      name: 'The Bundle',
      icon: '/icons/minecraft/bundle.svg',
      count: 1,
      desc: 'Portable storage pouch consolidating up to 64 mixed items in 1 slot. Can be dyed in 16 colors.'
    },
    ingredients: [
      { name: 'Leather', count: 6, icon: '/icons/minecraft/leather.svg' },
      { name: 'String', count: 2, icon: '/icons/minecraft/string.svg' }
    ]
  },
  {
    id: 'wolf_armor',
    name: 'Wolf Armor',
    category: 'Modern 2024-2026',
    outputCount: 1,
    version: '1.20.5 Armored Paws',
    shapeless: false,
    tags: ['wolf armor', 'armadillo', 'scute', 'armor', 'dog', 'pet'],
    grid: [
      { name: 'Armadillo Scute', icon: '/icons/minecraft/armadillo_scute.svg' }, null, null,
      { name: 'Armadillo Scute', icon: '/icons/minecraft/armadillo_scute.svg' }, { name: 'Armadillo Scute', icon: '/icons/minecraft/armadillo_scute.svg' }, { name: 'Armadillo Scute', icon: '/icons/minecraft/armadillo_scute.svg' },
      { name: 'Armadillo Scute', icon: '/icons/minecraft/armadillo_scute.svg' }, null, { name: 'Armadillo Scute', icon: '/icons/minecraft/armadillo_scute.svg' }
    ],
    result: {
      name: 'Wolf Armor',
      icon: '/icons/minecraft/armadillo_scute.svg',
      count: 1,
      desc: 'Equippable protective armor for tamed wolves. Absorbs damage, cracks visually, and dyes in 16 colors.'
    },
    ingredients: [
      { name: 'Armadillo Scute', count: 6, icon: '/icons/minecraft/armadillo_scute.svg' }
    ]
  },
  {
    id: 'wind_charge',
    name: 'Wind Charge',
    category: 'Modern 2024-2026',
    outputCount: 4,
    version: '1.21 Tricky Trials',
    shapeless: true,
    tags: ['wind charge', 'breeze rod', 'projectile', 'knockback', 'jump'],
    grid: [
      null, null, null,
      null, { name: 'Breeze Rod', icon: '/icons/minecraft/breeze_rod.svg' }, null,
      null, null, null
    ],
    result: {
      name: 'Wind Charge (x4)',
      icon: '/icons/minecraft/wind_charge.svg',
      count: 4,
      desc: 'Throwable aerodynamic projectile that propels players high into the air and activates redstone mechanisms.'
    },
    ingredients: [
      { name: 'Breeze Rod', count: 1, icon: '/icons/minecraft/breeze_rod.svg' }
    ]
  },
  {
    id: 'brush',
    name: 'Archaeology Brush',
    category: 'Modern 2024-2026',
    outputCount: 1,
    version: '1.20 Trails & Tales',
    shapeless: false,
    tags: ['brush', 'archaeology', 'copper', 'feather', 'stick', 'sherds'],
    grid: [
      null, { name: 'Feather', icon: '/icons/minecraft/feather.svg' }, null,
      null, { name: 'Copper Ingot', icon: '/icons/minecraft/copper_ingot.svg' }, null,
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null
    ],
    result: {
      name: 'Archaeology Brush',
      icon: '/icons/minecraft/brush.svg',
      count: 1,
      desc: 'Excavates Suspicious Sand and Suspicious Gravel to uncover ancient Pottery Sherds and Sniffer Eggs.'
    },
    ingredients: [
      { name: 'Feather', count: 1, icon: '/icons/minecraft/feather.svg' },
      { name: 'Copper Ingot', count: 1, icon: '/icons/minecraft/copper_ingot.svg' },
      { name: 'Stick', count: 1, icon: '/icons/minecraft/stick.svg' }
    ]
  },
  {
    id: 'chiseled_bookshelf',
    name: 'Chiseled Bookshelf',
    category: 'Modern 2024-2026',
    outputCount: 1,
    version: '1.20 Trails & Tales',
    shapeless: false,
    tags: ['chiseled bookshelf', 'bookshelf', 'storage', 'comparator', 'redstone', 'books'],
    grid: [
      { name: 'Oak Planks', icon: '/icons/minecraft/oak_planks.svg' }, { name: 'Oak Planks', icon: '/icons/minecraft/oak_planks.svg' }, { name: 'Oak Planks', icon: '/icons/minecraft/oak_planks.svg' },
      { name: 'Oak Slab', icon: '/icons/minecraft/oak_planks.svg' }, { name: 'Oak Slab', icon: '/icons/minecraft/oak_planks.svg' }, { name: 'Oak Slab', icon: '/icons/minecraft/oak_planks.svg' },
      { name: 'Oak Planks', icon: '/icons/minecraft/oak_planks.svg' }, { name: 'Oak Planks', icon: '/icons/minecraft/oak_planks.svg' }, { name: 'Oak Planks', icon: '/icons/minecraft/oak_planks.svg' }
    ],
    result: {
      name: 'Chiseled Bookshelf',
      icon: '/icons/minecraft/bookshelf.svg',
      count: 1,
      desc: 'Stores up to 6 books and outputs redstone signals through comparators proportional to accessed slots.'
    },
    ingredients: [
      { name: 'Wood Planks', count: 6, icon: '/icons/minecraft/oak_planks.svg' },
      { name: 'Wood Slabs', count: 3, icon: '/icons/minecraft/oak_planks.svg' }
    ]
  },
  {
    id: 'decorated_pot',
    name: 'Decorated Pot',
    category: 'Modern 2024-2026',
    outputCount: 1,
    version: '1.20 Trails & Tales',
    shapeless: false,
    tags: ['decorated pot', 'pottery sherd', 'brick', 'decor', 'archaeology'],
    grid: [
      null, { name: 'Pottery Sherd', icon: '/icons/minecraft/brick.svg' }, null,
      { name: 'Pottery Sherd', icon: '/icons/minecraft/brick.svg' }, null, { name: 'Pottery Sherd', icon: '/icons/minecraft/brick.svg' },
      null, { name: 'Pottery Sherd', icon: '/icons/minecraft/brick.svg' }, null
    ],
    result: {
      name: 'Decorated Pot',
      icon: '/icons/minecraft/flower_pot.svg',
      count: 1,
      desc: 'Crafted from 4 Pottery Sherds or Bricks. Stores 1 item stack and can be smashed with tools or projectiles.'
    },
    ingredients: [
      { name: 'Pottery Sherds or Bricks', count: 4, icon: '/icons/minecraft/brick.svg' }
    ]
  },

  // ==========================================
  // TOOLS & UTILITY
  // ==========================================
  {
    id: 'diamond_pickaxe',
    name: 'Diamond Pickaxe',
    category: 'Tools',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['pickaxe', 'diamond', 'mining', 'obsidian', 'tool'],
    grid: [
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' },
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null,
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null
    ],
    result: {
      name: 'Diamond Pickaxe',
      icon: '/icons/minecraft/diamond_pickaxe.svg',
      count: 1,
      desc: 'Essential mining tool capable of breaking Obsidian and Ancient Debris with 1561 durability.'
    },
    ingredients: [
      { name: 'Diamond', count: 3, icon: '/icons/minecraft/diamond.svg' },
      { name: 'Stick', count: 2, icon: '/icons/minecraft/stick.svg' }
    ]
  },
  {
    id: 'diamond_axe',
    name: 'Diamond Axe',
    category: 'Tools',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['axe', 'diamond', 'woodcutting', 'chop', 'weapon', 'shield disable'],
    grid: [
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, null,
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null,
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null
    ],
    result: {
      name: 'Diamond Axe',
      icon: '/icons/minecraft/diamond_axe.svg',
      count: 1,
      desc: 'Chops wood rapidly and delivers heavy 9-damage melee strikes that temporarily disable shields.'
    },
    ingredients: [
      { name: 'Diamond', count: 3, icon: '/icons/minecraft/diamond.svg' },
      { name: 'Stick', count: 2, icon: '/icons/minecraft/stick.svg' }
    ]
  },
  {
    id: 'diamond_shovel',
    name: 'Diamond Shovel',
    category: 'Tools',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['shovel', 'diamond', 'dig', 'dirt', 'sand', 'gravel'],
    grid: [
      null, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, null,
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null,
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null
    ],
    result: {
      name: 'Diamond Shovel',
      icon: '/icons/minecraft/diamond_shovel.svg',
      count: 1,
      desc: 'Excavates dirt, sand, gravel, and clay at high speed. Creates grass paths.'
    },
    ingredients: [
      { name: 'Diamond', count: 1, icon: '/icons/minecraft/diamond.svg' },
      { name: 'Stick', count: 2, icon: '/icons/minecraft/stick.svg' }
    ]
  },
  {
    id: 'diamond_hoe',
    name: 'Diamond Hoe',
    category: 'Tools',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['hoe', 'diamond', 'farming', 'till', 'sculk', 'leaves'],
    grid: [
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, null,
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null,
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null
    ],
    result: {
      name: 'Diamond Hoe',
      icon: '/icons/minecraft/diamond_hoe.svg',
      count: 1,
      desc: 'Tills soil into farmland and harvests sculk, hay bales, sponges, and leaf blocks rapidly.'
    },
    ingredients: [
      { name: 'Diamond', count: 2, icon: '/icons/minecraft/diamond.svg' },
      { name: 'Stick', count: 2, icon: '/icons/minecraft/stick.svg' }
    ]
  },
  {
    id: 'shears',
    name: 'Shears',
    category: 'Tools',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['shears', 'wool', 'sheep', 'leaves', 'cobweb', 'iron'],
    grid: [
      null, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, null,
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, null, null,
      null, null, null
    ],
    result: {
      name: 'Shears',
      icon: '/icons/minecraft/shears.svg',
      count: 1,
      desc: 'Shears wool from sheep, harvests leaf blocks without breaking them, and cuts cobwebs.'
    },
    ingredients: [
      { name: 'Iron Ingot', count: 2, icon: '/icons/minecraft/iron_ingot.svg' }
    ]
  },
  {
    id: 'flint_and_steel',
    name: 'Flint and Steel',
    category: 'Tools',
    outputCount: 1,
    version: 'Classic',
    shapeless: true,
    tags: ['flint and steel', 'fire', 'nether portal', 'ignite', 'tnt'],
    grid: [
      null, null, null,
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Flint', icon: '/icons/minecraft/flint.svg' }, null,
      null, null, null
    ],
    result: {
      name: 'Flint and Steel',
      icon: '/icons/minecraft/flint_and_steel.svg',
      count: 1,
      desc: 'Creates fire, ignites TNT blocks, and activates obsidian Nether Portals.'
    },
    ingredients: [
      { name: 'Iron Ingot', count: 1, icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Flint', count: 1, icon: '/icons/minecraft/flint.svg' }
    ]
  },
  {
    id: 'compass',
    name: 'Compass',
    category: 'Tools',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['compass', 'navigation', 'world spawn', 'iron', 'redstone', 'lodestone'],
    grid: [
      null, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, null,
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Redstone Dust', icon: '/icons/minecraft/redstone_dust.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' },
      null, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, null
    ],
    result: {
      name: 'Compass',
      icon: '/icons/minecraft/compass.svg',
      count: 1,
      desc: 'Points directly toward the world spawn point, or toward a linked Lodestone block.'
    },
    ingredients: [
      { name: 'Iron Ingot', count: 4, icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Redstone Dust', count: 1, icon: '/icons/minecraft/redstone_dust.svg' }
    ]
  },
  {
    id: 'clock',
    name: 'Clock',
    category: 'Tools',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['clock', 'time', 'day night', 'gold', 'redstone', 'sun'],
    grid: [
      null, { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' }, null,
      { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' }, { name: 'Redstone Dust', icon: '/icons/minecraft/redstone_dust.svg' }, { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' },
      null, { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' }, null
    ],
    result: {
      name: 'Clock',
      icon: '/icons/minecraft/clock.svg',
      count: 1,
      desc: 'Displays celestial time showing current sun and moon positions in the sky.'
    },
    ingredients: [
      { name: 'Gold Ingot', count: 4, icon: '/icons/minecraft/gold_ingot.svg' },
      { name: 'Redstone Dust', count: 1, icon: '/icons/minecraft/redstone_dust.svg' }
    ]
  },

  // ==========================================
  // COMBAT & DEFENSE
  // ==========================================
  {
    id: 'diamond_sword',
    name: 'Diamond Sword',
    category: 'Combat',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['sword', 'diamond', 'weapon', 'melee', 'sweep attack', 'combat'],
    grid: [
      null, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, null,
      null, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, null,
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null
    ],
    result: {
      name: 'Diamond Sword',
      icon: '/icons/minecraft/diamond_sword.svg',
      count: 1,
      desc: 'High-tier blade with +7 Attack Damage and 1.6 Attack Speed. Features sweep attacks in Java Edition.'
    },
    ingredients: [
      { name: 'Diamond', count: 2, icon: '/icons/minecraft/diamond.svg' },
      { name: 'Stick', count: 1, icon: '/icons/minecraft/stick.svg' }
    ]
  },
  {
    id: 'bow',
    name: 'Bow',
    category: 'Combat',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['bow', 'ranged', 'arrow', 'string', 'stick', 'weapon'],
    grid: [
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, { name: 'String', icon: '/icons/minecraft/string.svg' },
      { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null, { name: 'String', icon: '/icons/minecraft/string.svg' },
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, { name: 'String', icon: '/icons/minecraft/string.svg' }
    ],
    result: {
      name: 'Bow',
      icon: '/icons/minecraft/bow.svg',
      count: 1,
      desc: 'Standard ranged weapon. Fires arrows with variable velocity and can be enchanted with Infinity or Flame.'
    },
    ingredients: [
      { name: 'Stick', count: 3, icon: '/icons/minecraft/stick.svg' },
      { name: 'String', count: 3, icon: '/icons/minecraft/string.svg' }
    ]
  },
  {
    id: 'crossbow',
    name: 'Crossbow',
    category: 'Combat',
    outputCount: 1,
    version: '1.14 Village & Pillage',
    shapeless: false,
    tags: ['crossbow', 'ranged', 'tripwire hook', 'iron', 'multishot', 'piercing'],
    grid: [
      { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Stick', icon: '/icons/minecraft/stick.svg' },
      { name: 'String', icon: '/icons/minecraft/string.svg' }, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, { name: 'String', icon: '/icons/minecraft/string.svg' },
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null
    ],
    result: {
      name: 'Crossbow',
      icon: '/icons/minecraft/crossbow.svg',
      count: 1,
      desc: 'Heavy ranged weapon that holds loaded ammo. Compatible with fireworks and Multishot.'
    },
    ingredients: [
      { name: 'Stick', count: 3, icon: '/icons/minecraft/stick.svg' },
      { name: 'String', count: 2, icon: '/icons/minecraft/string.svg' },
      { name: 'Iron Ingot', count: 1, icon: '/icons/minecraft/iron_ingot.svg' }
    ]
  },
  {
    id: 'arrows',
    name: 'Arrow',
    category: 'Combat',
    outputCount: 4,
    version: 'Classic',
    shapeless: false,
    tags: ['arrow', 'flint', 'stick', 'feather', 'ammo', 'projectile'],
    grid: [
      null, { name: 'Flint', icon: '/icons/minecraft/flint.svg' }, null,
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null,
      null, { name: 'Feather', icon: '/icons/minecraft/feather.svg' }, null
    ],
    result: {
      name: 'Arrow (x4)',
      icon: '/icons/minecraft/arrow.svg',
      count: 4,
      desc: 'Standard ammunition for bows and crossbows.'
    },
    ingredients: [
      { name: 'Flint', count: 1, icon: '/icons/minecraft/flint.svg' },
      { name: 'Stick', count: 1, icon: '/icons/minecraft/stick.svg' },
      { name: 'Feather', count: 1, icon: '/icons/minecraft/feather.svg' }
    ]
  },
  {
    id: 'shield',
    name: 'Shield',
    category: 'Combat',
    outputCount: 1,
    version: '1.9 Combat Update',
    shapeless: false,
    tags: ['shield', 'defense', 'wood planks', 'iron', 'block attack', 'banner'],
    grid: [
      { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' },
      { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' },
      null, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, null
    ],
    result: {
      name: 'Shield',
      icon: '/icons/minecraft/shield.svg',
      count: 1,
      desc: 'Blocks 100% of incoming physical melee and projectile damage when held in main or off-hand.'
    },
    ingredients: [
      { name: 'Wood Planks', count: 6, icon: '/icons/minecraft/wood_planks.svg' },
      { name: 'Iron Ingot', count: 1, icon: '/icons/minecraft/iron_ingot.svg' }
    ]
  },

  // ==========================================
  // ARMOR
  // ==========================================
  {
    id: 'diamond_helmet',
    name: 'Diamond Helmet',
    category: 'Armor',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['helmet', 'diamond', 'armor', 'protection', 'head'],
    grid: [
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' },
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, null, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' },
      null, null, null
    ],
    result: {
      name: 'Diamond Helmet',
      icon: '/icons/minecraft/diamond_helmet.svg',
      count: 1,
      desc: 'Provides +3 Armor points and +2 Armor Toughness.'
    },
    ingredients: [
      { name: 'Diamond', count: 5, icon: '/icons/minecraft/diamond.svg' }
    ]
  },
  {
    id: 'diamond_chestplate',
    name: 'Diamond Chestplate',
    category: 'Armor',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['chestplate', 'diamond', 'armor', 'protection', 'torso'],
    grid: [
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, null, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' },
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' },
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }
    ],
    result: {
      name: 'Diamond Chestplate',
      icon: '/icons/minecraft/diamond_chestplate.svg',
      count: 1,
      desc: 'The strongest core protection piece, granting +8 Armor points and +2 Armor Toughness.'
    },
    ingredients: [
      { name: 'Diamond', count: 8, icon: '/icons/minecraft/diamond.svg' }
    ]
  },
  {
    id: 'diamond_leggings',
    name: 'Diamond Leggings',
    category: 'Armor',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['leggings', 'diamond', 'armor', 'protection', 'legs'],
    grid: [
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' },
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, null, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' },
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, null, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }
    ],
    result: {
      name: 'Diamond Leggings',
      icon: '/icons/minecraft/diamond_leggings.svg',
      count: 1,
      desc: 'Pants armor providing +6 Armor points and +2 Armor Toughness.'
    },
    ingredients: [
      { name: 'Diamond', count: 7, icon: '/icons/minecraft/diamond.svg' }
    ]
  },
  {
    id: 'diamond_boots',
    name: 'Diamond Boots',
    category: 'Armor',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['boots', 'diamond', 'armor', 'protection', 'feet', 'feather falling'],
    grid: [
      null, null, null,
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, null, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' },
      { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }, null, { name: 'Diamond', icon: '/icons/minecraft/diamond.svg' }
    ],
    result: {
      name: 'Diamond Boots',
      icon: '/icons/minecraft/diamond_boots.svg',
      count: 1,
      desc: 'Footwear granting +3 Armor points. Can be enchanted with Feather Falling and Depth Strider.'
    },
    ingredients: [
      { name: 'Diamond', count: 4, icon: '/icons/minecraft/diamond.svg' }
    ]
  },

  // ==========================================
  // REDSTONE & MECHANISMS
  // ==========================================
  {
    id: 'piston',
    name: 'Piston',
    category: 'Redstone',
    outputCount: 1,
    version: 'Beta 1.7',
    shapeless: false,
    tags: ['piston', 'redstone', 'push', 'wood', 'cobblestone', 'iron'],
    grid: [
      { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' },
      { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' },
      { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Redstone Dust', icon: '/icons/minecraft/redstone_dust.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }
    ],
    result: {
      name: 'Piston',
      icon: '/icons/minecraft/piston.svg',
      count: 1,
      desc: 'Pushes up to 12 blocks when powered by redstone. Exhibits quasi-connectivity in Java Edition!'
    },
    ingredients: [
      { name: 'Wood Planks', count: 3, icon: '/icons/minecraft/wood_planks.svg' },
      { name: 'Cobblestone', count: 4, icon: '/icons/minecraft/cobblestone.svg' },
      { name: 'Iron Ingot', count: 1, icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Redstone Dust', count: 1, icon: '/icons/minecraft/redstone_dust.svg' }
    ]
  },
  {
    id: 'sticky_piston',
    name: 'Sticky Piston',
    category: 'Redstone',
    outputCount: 1,
    version: 'Beta 1.7',
    shapeless: true,
    tags: ['sticky piston', 'slimeball', 'piston', 'pull', 'door'],
    grid: [
      null, null, null,
      null, { name: 'Slimeball', icon: '/icons/minecraft/slimeball.svg' }, null,
      null, { name: 'Piston', icon: '/icons/minecraft/piston.svg' }, null
    ],
    result: {
      name: 'Sticky Piston',
      icon: '/icons/minecraft/sticky_piston.svg',
      count: 1,
      desc: 'Pushes and pulls blocks back upon retraction. Essential for hidden piston doors.'
    },
    ingredients: [
      { name: 'Piston', count: 1, icon: '/icons/minecraft/piston.svg' },
      { name: 'Slimeball', count: 1, icon: '/icons/minecraft/slimeball.svg' }
    ]
  },
  {
    id: 'repeater',
    name: 'Redstone Repeater',
    category: 'Redstone',
    outputCount: 1,
    version: 'Beta 1.3',
    shapeless: false,
    tags: ['repeater', 'redstone', 'delay', 'smooth stone', 'boost signal', 'clock'],
    grid: [
      null, null, null,
      { name: 'Redstone Torch', icon: '/icons/minecraft/redstone_torch.svg' }, { name: 'Redstone Dust', icon: '/icons/minecraft/redstone_dust.svg' }, { name: 'Redstone Torch', icon: '/icons/minecraft/redstone_torch.svg' },
      { name: 'Smooth Stone', icon: '/icons/minecraft/smooth_stone.svg' }, { name: 'Smooth Stone', icon: '/icons/minecraft/smooth_stone.svg' }, { name: 'Smooth Stone', icon: '/icons/minecraft/smooth_stone.svg' }
    ],
    result: {
      name: 'Redstone Repeater',
      icon: '/icons/minecraft/repeater.svg',
      count: 1,
      desc: 'Boosts signal back to 15, adds 1–4 delay ticks, and can be locked with side inputs.'
    },
    ingredients: [
      { name: 'Redstone Torch', count: 2, icon: '/icons/minecraft/redstone_torch.svg' },
      { name: 'Redstone Dust', count: 1, icon: '/icons/minecraft/redstone_dust.svg' },
      { name: 'Smooth Stone', count: 3, icon: '/icons/minecraft/smooth_stone.svg' }
    ]
  },
  {
    id: 'comparator',
    name: 'Redstone Comparator',
    category: 'Redstone',
    outputCount: 1,
    version: '1.5 Redstone Update',
    shapeless: false,
    tags: ['comparator', 'redstone', 'inventory', 'subtract', 'quartz', 'sorter'],
    grid: [
      null, { name: 'Redstone Torch', icon: '/icons/minecraft/redstone_torch.svg' }, null,
      { name: 'Redstone Torch', icon: '/icons/minecraft/redstone_torch.svg' }, { name: 'Nether Quartz', icon: '/icons/minecraft/nether_quartz.svg' }, { name: 'Redstone Torch', icon: '/icons/minecraft/redstone_torch.svg' },
      { name: 'Smooth Stone', icon: '/icons/minecraft/smooth_stone.svg' }, { name: 'Smooth Stone', icon: '/icons/minecraft/smooth_stone.svg' }, { name: 'Smooth Stone', icon: '/icons/minecraft/smooth_stone.svg' }
    ],
    result: {
      name: 'Redstone Comparator',
      icon: '/icons/minecraft/comparator.svg',
      count: 1,
      desc: 'Measures container fullness, compares signal strengths, or operates in subtraction mode.'
    },
    ingredients: [
      { name: 'Redstone Torch', count: 3, icon: '/icons/minecraft/redstone_torch.svg' },
      { name: 'Nether Quartz', count: 1, icon: '/icons/minecraft/nether_quartz.svg' },
      { name: 'Smooth Stone', count: 3, icon: '/icons/minecraft/smooth_stone.svg' }
    ]
  },
  {
    id: 'hopper',
    name: 'Hopper',
    category: 'Redstone',
    outputCount: 1,
    version: '1.5 Redstone Update',
    shapeless: false,
    tags: ['hopper', 'funnel', 'chest', 'iron', 'sorter', 'automation', 'transfer'],
    grid: [
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, null, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Chest', icon: '/icons/minecraft/chest.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' },
      null, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, null
    ],
    result: {
      name: 'Hopper',
      icon: '/icons/minecraft/hopper.svg',
      count: 1,
      desc: 'Pulls and pushes items between containers at a rate of 2.5 items per second.'
    },
    ingredients: [
      { name: 'Iron Ingot', count: 5, icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Chest', count: 1, icon: '/icons/minecraft/chest.svg' }
    ]
  },
  {
    id: 'dispenser',
    name: 'Dispenser',
    category: 'Redstone',
    outputCount: 1,
    version: 'Beta 1.2',
    shapeless: false,
    tags: ['dispenser', 'shoot', 'bow', 'arrows', 'cobblestone', 'redstone'],
    grid: [
      { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' },
      { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Bow', icon: '/icons/minecraft/bow.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' },
      { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Redstone Dust', icon: '/icons/minecraft/redstone_dust.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }
    ],
    result: {
      name: 'Dispenser',
      icon: '/icons/minecraft/dispenser.svg',
      count: 1,
      desc: 'Shoots arrows, fires fire charges, launches fireworks, or dispenses water/lava buckets.'
    },
    ingredients: [
      { name: 'Cobblestone', count: 7, icon: '/icons/minecraft/cobblestone.svg' },
      { name: 'Bow', count: 1, icon: '/icons/minecraft/bow.svg' },
      { name: 'Redstone Dust', count: 1, icon: '/icons/minecraft/redstone_dust.svg' }
    ]
  },
  {
    id: 'dropper',
    name: 'Dropper',
    category: 'Redstone',
    outputCount: 1,
    version: '1.5 Redstone Update',
    shapeless: false,
    tags: ['dropper', 'eject', 'item', 'cobblestone', 'redstone', 'elevator'],
    grid: [
      { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' },
      { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, null, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' },
      { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Redstone Dust', icon: '/icons/minecraft/redstone_dust.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }
    ],
    result: {
      name: 'Dropper',
      icon: '/icons/minecraft/dropper.svg',
      count: 1,
      desc: 'Drops items out as loose floating entities without shooting or using them.'
    },
    ingredients: [
      { name: 'Cobblestone', count: 7, icon: '/icons/minecraft/cobblestone.svg' },
      { name: 'Redstone Dust', count: 1, icon: '/icons/minecraft/redstone_dust.svg' }
    ]
  },
  {
    id: 'tnt',
    name: 'TNT',
    category: 'Redstone',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['tnt', 'explosive', 'sand', 'gunpowder', 'mining', 'boom'],
    grid: [
      { name: 'Gunpowder', icon: '/icons/minecraft/redstone_dust.svg' }, { name: 'Sand', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Gunpowder', icon: '/icons/minecraft/redstone_dust.svg' },
      { name: 'Sand', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Gunpowder', icon: '/icons/minecraft/redstone_dust.svg' }, { name: 'Sand', icon: '/icons/minecraft/cobblestone.svg' },
      { name: 'Gunpowder', icon: '/icons/minecraft/redstone_dust.svg' }, { name: 'Sand', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Gunpowder', icon: '/icons/minecraft/redstone_dust.svg' }
    ],
    result: {
      name: 'TNT Block',
      icon: '/icons/minecraft/tnt.svg',
      count: 1,
      desc: 'High explosive block triggered by redstone, fire, or explosions.'
    },
    ingredients: [
      { name: 'Gunpowder', count: 5, icon: '/icons/minecraft/redstone_dust.svg' },
      { name: 'Sand', count: 4, icon: '/icons/minecraft/cobblestone.svg' }
    ]
  },

  // ==========================================
  // BUILDING & DECORATION
  // ==========================================
  {
    id: 'crafting_table',
    name: 'Crafting Table',
    category: 'Building',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['crafting table', 'workbench', 'wood planks', 'craft'],
    grid: [
      { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, null,
      { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, null,
      null, null, null
    ],
    result: {
      name: 'Crafting Table',
      icon: '/icons/minecraft/crafting_table.svg',
      count: 1,
      desc: 'Provides the essential 3×3 crafting grid needed to create advanced tools, weapons, and blocks.'
    },
    ingredients: [
      { name: 'Wood Planks', count: 4, icon: '/icons/minecraft/wood_planks.svg' }
    ]
  },
  {
    id: 'furnace',
    name: 'Furnace',
    category: 'Building',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['furnace', 'smelt', 'cook', 'cobblestone', 'ore'],
    grid: [
      { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' },
      { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, null, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' },
      { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }, { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg' }
    ],
    result: {
      name: 'Furnace',
      icon: '/icons/minecraft/furnace.svg',
      count: 1,
      desc: 'Smelts ores into ingots and cooks raw food using coal, charcoal, or wood fuels.'
    },
    ingredients: [
      { name: 'Cobblestone', count: 8, icon: '/icons/minecraft/cobblestone.svg' }
    ]
  },
  {
    id: 'chest',
    name: 'Chest',
    category: 'Building',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['chest', 'storage', 'wood planks', 'double chest', 'inventory'],
    grid: [
      { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' },
      { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, null, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' },
      { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }, { name: 'Wood Planks', icon: '/icons/minecraft/wood_planks.svg' }
    ],
    result: {
      name: 'Chest',
      icon: '/icons/minecraft/chest.svg',
      count: 1,
      desc: 'Stores 27 item stacks. Place two together to create a 54-slot Double Chest.'
    },
    ingredients: [
      { name: 'Wood Planks', count: 8, icon: '/icons/minecraft/wood_planks.svg' }
    ]
  },
  {
    id: 'torch',
    name: 'Torches',
    category: 'Building',
    outputCount: 4,
    version: 'Classic',
    shapeless: false,
    tags: ['torch', 'light', 'coal', 'stick', 'cave', 'light level 14'],
    grid: [
      null, { name: 'Coal', icon: '/icons/minecraft/coal.svg' }, null,
      null, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, null,
      null, null, null
    ],
    result: {
      name: 'Torches (x4)',
      icon: '/icons/minecraft/torch.svg',
      count: 4,
      desc: 'Emits light level 14 to illuminate dark areas and prevent hostile mob spawns.'
    },
    ingredients: [
      { name: 'Coal / Charcoal', count: 1, icon: '/icons/minecraft/coal.svg' },
      { name: 'Stick', count: 1, icon: '/icons/minecraft/stick.svg' }
    ]
  },
  {
    id: 'lantern',
    name: 'Lantern',
    category: 'Building',
    outputCount: 1,
    version: '1.14 Village & Pillage',
    shapeless: false,
    tags: ['lantern', 'light', 'iron nugget', 'torch', 'hanging', 'light level 15'],
    grid: [
      { name: 'Iron Nugget', icon: '/icons/minecraft/iron_nugget.svg' }, { name: 'Iron Nugget', icon: '/icons/minecraft/iron_nugget.svg' }, { name: 'Iron Nugget', icon: '/icons/minecraft/iron_nugget.svg' },
      { name: 'Iron Nugget', icon: '/icons/minecraft/iron_nugget.svg' }, { name: 'Torch', icon: '/icons/minecraft/torch.svg' }, { name: 'Iron Nugget', icon: '/icons/minecraft/iron_nugget.svg' },
      { name: 'Iron Nugget', icon: '/icons/minecraft/iron_nugget.svg' }, { name: 'Iron Nugget', icon: '/icons/minecraft/iron_nugget.svg' }, { name: 'Iron Nugget', icon: '/icons/minecraft/iron_nugget.svg' }
    ],
    result: {
      name: 'Lantern',
      icon: '/icons/minecraft/lantern.svg',
      count: 1,
      desc: 'Provides maximum light level 15. Can be placed on surfaces or hung from ceilings/chains.'
    },
    ingredients: [
      { name: 'Iron Nugget', count: 8, icon: '/icons/minecraft/iron_nugget.svg' },
      { name: 'Torch', count: 1, icon: '/icons/minecraft/torch.svg' }
    ]
  },
  {
    id: 'iron_block',
    name: 'Block of Iron',
    category: 'Building',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['iron block', 'storage', 'iron ingot', 'beacon', 'iron golem'],
    grid: [
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }
    ],
    result: {
      name: 'Block of Iron',
      icon: '/icons/minecraft/iron_block.svg',
      count: 1,
      desc: 'Compact metal storage block. Used for Beacon pyramids and spawning Iron Golems.'
    },
    ingredients: [
      { name: 'Iron Ingot', count: 9, icon: '/icons/minecraft/iron_ingot.svg' }
    ]
  },
  {
    id: 'anvil',
    name: 'Anvil',
    category: 'Building',
    outputCount: 1,
    version: '1.4 Pretty Scary Update',
    shapeless: false,
    tags: ['anvil', 'repair', 'enchant', 'rename', 'iron block', 'iron ingot'],
    grid: [
      { name: 'Iron Block', icon: '/icons/minecraft/iron_block.svg' }, { name: 'Iron Block', icon: '/icons/minecraft/iron_block.svg' }, { name: 'Iron Block', icon: '/icons/minecraft/iron_block.svg' },
      null, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, null,
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }
    ],
    result: {
      name: 'Anvil',
      icon: '/icons/minecraft/anvil.svg',
      count: 1,
      desc: 'Repairs tools, combines enchantment books, and renames items using XP levels.'
    },
    ingredients: [
      { name: 'Iron Block', count: 3, icon: '/icons/minecraft/iron_block.svg' },
      { name: 'Iron Ingot', count: 4, icon: '/icons/minecraft/iron_ingot.svg' }
    ]
  },

  // ==========================================
  // FOOD & CONSUMABLES
  // ==========================================
  {
    id: 'bread',
    name: 'Bread',
    category: 'Food',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['bread', 'food', 'wheat', 'hunger', 'eat'],
    grid: [
      null, null, null,
      { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' }, { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' }, { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' },
      null, null, null
    ],
    result: {
      name: 'Bread',
      icon: '/icons/minecraft/bread.svg',
      count: 1,
      desc: 'Restores 5 hunger points (2.5 drumsticks) and 6.0 saturation points.'
    },
    ingredients: [
      { name: 'Wheat', count: 3, icon: '/icons/minecraft/wheat.svg' }
    ]
  },
  {
    id: 'golden_apple',
    name: 'Golden Apple',
    category: 'Food',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['golden apple', 'apple', 'gold ingot', 'absorption', 'regeneration', 'cure villager'],
    grid: [
      { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' }, { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' }, { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' },
      { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' }, { name: 'Apple', icon: '/icons/minecraft/apple.svg' }, { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' },
      { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' }, { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' }, { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg' }
    ],
    result: {
      name: 'Golden Apple',
      icon: '/icons/minecraft/golden_apple.svg',
      count: 1,
      desc: 'Grants Absorption II (2 bonus golden hearts) and Regeneration II. Essential for curing Zombie Villagers.'
    },
    ingredients: [
      { name: 'Gold Ingot', count: 8, icon: '/icons/minecraft/gold_ingot.svg' },
      { name: 'Apple', count: 1, icon: '/icons/minecraft/apple.svg' }
    ]
  },
  {
    id: 'golden_carrot',
    name: 'Golden Carrot',
    category: 'Food',
    outputCount: 1,
    version: '1.4 Pretty Scary Update',
    shapeless: false,
    tags: ['golden carrot', 'carrot', 'gold nugget', 'highest saturation', 'horse taming', 'night vision'],
    grid: [
      { name: 'Gold Nugget', icon: '/icons/minecraft/gold_nugget.svg' }, { name: 'Gold Nugget', icon: '/icons/minecraft/gold_nugget.svg' }, { name: 'Gold Nugget', icon: '/icons/minecraft/gold_nugget.svg' },
      { name: 'Gold Nugget', icon: '/icons/minecraft/gold_nugget.svg' }, { name: 'Carrot', icon: '/icons/minecraft/golden_carrot.svg' }, { name: 'Gold Nugget', icon: '/icons/minecraft/gold_nugget.svg' },
      { name: 'Gold Nugget', icon: '/icons/minecraft/gold_nugget.svg' }, { name: 'Gold Nugget', icon: '/icons/minecraft/gold_nugget.svg' }, { name: 'Gold Nugget', icon: '/icons/minecraft/gold_nugget.svg' }
    ],
    result: {
      name: 'Golden Carrot',
      icon: '/icons/minecraft/golden_carrot.svg',
      count: 1,
      desc: 'The best survival food in the game with 14.4 saturation. Also used to brew Potion of Night Vision.'
    },
    ingredients: [
      { name: 'Gold Nugget', count: 8, icon: '/icons/minecraft/gold_nugget.svg' },
      { name: 'Carrot', count: 1, icon: '/icons/minecraft/golden_carrot.svg' }
    ]
  },
  {
    id: 'hay_bale',
    name: 'Hay Bale',
    category: 'Food',
    outputCount: 1,
    version: '1.6 Horse Update',
    shapeless: false,
    tags: ['hay bale', 'wheat', 'fall damage reduction', 'horse feed', 'farm'],
    grid: [
      { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' }, { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' }, { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' },
      { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' }, { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' }, { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' },
      { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' }, { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' }, { name: 'Wheat', icon: '/icons/minecraft/wheat.svg' }
    ],
    result: {
      name: 'Hay Bale',
      icon: '/icons/minecraft/hay_bale.svg',
      count: 1,
      desc: 'Reduces fall damage by 80% when landed on! Breeds horses and llamas, and boosts campfire smoke signals.'
    },
    ingredients: [
      { name: 'Wheat', count: 9, icon: '/icons/minecraft/wheat.svg' }
    ]
  },

  // ==========================================
  // TRANSPORTATION
  // ==========================================
  {
    id: 'minecart',
    name: 'Minecart',
    category: 'Transport',
    outputCount: 1,
    version: 'Classic',
    shapeless: false,
    tags: ['minecart', 'rail', 'transport', 'iron ingot', 'track'],
    grid: [
      null, null, null,
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, null, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }
    ],
    result: {
      name: 'Minecart',
      icon: '/icons/minecraft/minecart.svg',
      count: 1,
      desc: 'Vehicle that runs on rails. Transports players, mobs, chests, hoppers, or TNT.'
    },
    ingredients: [
      { name: 'Iron Ingot', count: 5, icon: '/icons/minecraft/iron_ingot.svg' }
    ]
  },
  {
    id: 'rail',
    name: 'Rail',
    category: 'Transport',
    outputCount: 16,
    version: 'Classic',
    shapeless: false,
    tags: ['rail', 'track', 'iron', 'stick', 'minecart', 'transport'],
    grid: [
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, null, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, { name: 'Stick', icon: '/icons/minecraft/stick.svg' }, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }, null, { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg' }
    ],
    result: {
      name: 'Rail (x16)',
      icon: '/icons/minecraft/rail.svg',
      count: 16,
      desc: 'Standard tracks for minecart travel across the world.'
    },
    ingredients: [
      { name: 'Iron Ingot', count: 6, icon: '/icons/minecraft/iron_ingot.svg' },
      { name: 'Stick', count: 1, icon: '/icons/minecraft/stick.svg' }
    ]
  }
];
