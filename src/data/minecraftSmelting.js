// Comprehensive Authentic Minecraft Java Edition Smelting, Blasting & Smoking Database
// Strictly verified against official Minecraft Java Edition mechanics.

export const APPLIANCE_DATA = {
  furnace: {
    id: 'furnace',
    name: 'Standard Furnace',
    speedMultiplier: 1,
    timeSeconds: 10,
    icon: '/icons/minecraft/furnace.svg',
    png: '/icons/minecraft/furnace.png',
    badge: 'Universal Smelter',
    desc: 'The classic workbench furnace. Can smelt every ore, cook food, refine stones, dry sponges, and bake clay at standard 10s (200 ticks) speed.'
  },
  blast_furnace: {
    id: 'blast_furnace',
    name: 'Blast Furnace',
    speedMultiplier: 2,
    timeSeconds: 5,
    icon: '/icons/minecraft/blast_furnace.svg',
    png: '/icons/minecraft/blast_furnace.png',
    badge: '2× Ore Speed',
    desc: 'Specialized industrial forge. Smelts ores, raw metals, and metallic armor/tools at double speed (5s / 100 ticks). Consumes fuel at 2× rate. Cannot cook food!'
  },
  smoker: {
    id: 'smoker',
    name: 'Smoker',
    speedMultiplier: 2,
    timeSeconds: 5,
    icon: '/icons/minecraft/smoker.svg',
    png: '/icons/minecraft/smoker.png',
    badge: '2× Food Speed',
    desc: 'Specialized culinary smoker. Cooks meats, fish, potatoes, and kelp at double speed (5s / 100 ticks). Cannot smelt ores, minerals, or blocks!'
  },
  campfire: {
    id: 'campfire',
    name: 'Campfire',
    speedMultiplier: 0.33,
    timeSeconds: 30,
    icon: '/icons/minecraft/campfire.svg',
    png: '/icons/minecraft/campfire.png',
    badge: '0 Fuel Passive',
    desc: 'Open-air cooking pit. Cooks up to 4 food items simultaneously over 30s without consuming any coal or wood fuel! Emits a smoke trail up to 24 blocks.'
  }
};

export const SMELTING_CATEGORIES = [
  'All',
  'Ores & Metals',
  'Food & Cooking',
  'Blocks & Stone',
  'Flora & Dyes',
  'Nether & Ancient Debris',
  'Recycling Gear'
];

export const SMELTING_FUELS = [
  {
    id: 'lava_bucket',
    name: 'Lava Bucket',
    icon: '/icons/minecraft/lava_bucket.svg',
    burnTimeTicks: 20000,
    burnTimeSeconds: 1000,
    itemsSmelted: 100,
    tier: 'Supreme Fuel',
    note: 'Leaves an empty bucket in the fuel slot when consumed.'
  },
  {
    id: 'coal_block',
    name: 'Block of Coal',
    icon: '/icons/minecraft/coal_block.svg',
    burnTimeTicks: 16000,
    burnTimeSeconds: 800,
    itemsSmelted: 80,
    tier: 'Ultra Efficient',
    note: 'Crafted from 9 coal. Smelts 80 items (10 more than 9 separate coals).'
  },
  {
    id: 'dried_kelp_block',
    name: 'Dried Kelp Block',
    icon: '/icons/minecraft/dried_kelp_block.svg',
    burnTimeTicks: 4000,
    burnTimeSeconds: 200,
    itemsSmelted: 20,
    tier: 'Renewable Favorite',
    note: '100% renewable fuel farmable from ocean kelp.'
  },
  {
    id: 'blaze_rod',
    name: 'Blaze Rod',
    icon: '/icons/minecraft/blaze_rod.svg',
    burnTimeTicks: 2400,
    burnTimeSeconds: 120,
    itemsSmelted: 12,
    tier: 'Nether Fuel',
    note: 'Drop from Blazes in Nether Fortresses.'
  },
  {
    id: 'coal',
    name: 'Coal / Charcoal',
    icon: '/icons/minecraft/coal.svg',
    burnTimeTicks: 1600,
    burnTimeSeconds: 80,
    itemsSmelted: 8,
    tier: 'Standard Fuel',
    note: 'The universal benchmark fuel. Smelts exactly 8 items per piece.'
  },
  {
    id: 'oak_boat',
    name: 'Wooden Boat / Raft',
    icon: '/icons/minecraft/acacia_boat.svg',
    burnTimeTicks: 1200,
    burnTimeSeconds: 60,
    itemsSmelted: 6,
    tier: 'Crafted Fuel',
    note: 'Made from 5 planks. Smelts 6 items.'
  },
  {
    id: 'oak_planks',
    name: 'Wood Planks / Logs',
    icon: '/icons/minecraft/oak_planks.svg',
    burnTimeTicks: 300,
    burnTimeSeconds: 15,
    itemsSmelted: 1.5,
    tier: 'Early Game',
    note: 'Planks, slabs, stairs, and logs.'
  },
  {
    id: 'stick',
    name: 'Stick / Sapling',
    icon: '/icons/minecraft/stick.svg',
    burnTimeTicks: 100,
    burnTimeSeconds: 5,
    itemsSmelted: 0.5,
    tier: 'Micro Fuel',
    note: 'Takes 2 sticks to smelt 1 single item.'
  }
];

export const SMELTING_RECIPES = [
  // ==========================================
  // ORES & METALS
  // ==========================================
  {
    id: 'raw_iron_to_ingot',
    name: 'Iron Ingot from Raw Iron',
    category: 'Ores & Metals',
    input: { name: 'Raw Iron', icon: '/icons/minecraft/raw_iron.svg', count: 1 },
    output: { name: 'Iron Ingot', icon: '/icons/minecraft/iron_ingot.svg', count: 1 },
    experience: 0.7,
    timeTicks: 200,
    appliances: ['furnace', 'blast_furnace'],
    transformation: 'Smelts rough Raw Iron chunks into an industrial refined Iron Ingot.',
    changeDetails: {
      before: 'Unrefined ore chunk mined with Stone Pickaxe or better',
      after: 'Solid metallic ingot used for armor, tools, rails, redstone, and golems',
      bonusTip: 'Use a Blast Furnace for 2× smelting speed (5 seconds per ingot)!'
    },
    tags: ['iron', 'raw iron', 'ingot', 'blast furnace', 'ore', 'metal']
  },
  {
    id: 'raw_copper_to_ingot',
    name: 'Copper Ingot from Raw Copper',
    category: 'Ores & Metals',
    input: { name: 'Raw Copper', icon: '/icons/minecraft/raw_copper.svg', count: 1 },
    output: { name: 'Copper Ingot', icon: '/icons/minecraft/copper_ingot.svg', count: 1 },
    experience: 0.7,
    timeTicks: 200,
    appliances: ['furnace', 'blast_furnace'],
    transformation: 'Purifies oxidized raw copper into a gleaming orange Copper Ingot.',
    changeDetails: {
      before: 'Crude raw copper mined from extensive copper veins',
      after: 'Refined conductive ingot for Lightning Rods, Spyglasses, Copper Grates, Bulbs & Crafters',
      bonusTip: 'Essential for modern 1.21 Tricky Trials copper machinery!'
    },
    tags: ['copper', 'raw copper', 'ingot', 'grate', 'bulb', 'crafter']
  },
  {
    id: 'raw_gold_to_ingot',
    name: 'Gold Ingot from Raw Gold',
    category: 'Ores & Metals',
    input: { name: 'Raw Gold', icon: '/icons/minecraft/raw_gold.svg', count: 1 },
    output: { name: 'Gold Ingot', icon: '/icons/minecraft/gold_ingot.svg', count: 1 },
    experience: 1.0,
    timeTicks: 200,
    appliances: ['furnace', 'blast_furnace'],
    transformation: 'Melts dense Raw Gold nuggets into a brilliant Gold Ingot.',
    changeDetails: {
      before: 'Heavy raw gold ore chunks excavated in caves or Badlands',
      after: 'Pure gold bullion for Powered Rails, Golden Apples, Clocks & Piglin Bartering',
      bonusTip: 'Gives a massive 1.0 XP per ingot smelted!'
    },
    tags: ['gold', 'raw gold', 'ingot', 'piglin', 'golden apple']
  },
  {
    id: 'cobblestone_to_stone',
    name: 'Stone from Cobblestone',
    category: 'Blocks & Stone',
    input: { name: 'Cobblestone', icon: '/icons/minecraft/cobblestone.svg', count: 1 },
    output: { name: 'Stone', icon: '/icons/minecraft/stone.svg', count: 1 },
    experience: 0.1,
    timeTicks: 200,
    appliances: ['furnace'],
    transformation: 'Bakes fractured Cobblestone into smooth natural Stone.',
    changeDetails: {
      before: 'Rough broken stone fragments gathered by mining',
      after: 'Clean natural stone block used for Stone Bricks, Repeaters, and Comparators',
      bonusTip: 'Can be re-smelted into Smooth Stone!'
    },
    tags: ['stone', 'cobblestone', 'furnace', 'smooth', 'building']
  },
  {
    id: 'stone_to_smooth_stone',
    name: 'Smooth Stone from Stone',
    category: 'Blocks & Stone',
    input: { name: 'Stone', icon: '/icons/minecraft/stone.svg', count: 1 },
    output: { name: 'Smooth Stone', icon: '/icons/minecraft/smooth_stone.svg', count: 1 },
    experience: 0.1,
    timeTicks: 200,
    appliances: ['furnace'],
    transformation: 'Double-smelts Stone to create bordered Smooth Stone.',
    changeDetails: {
      before: 'Standard gray natural stone',
      after: 'Polished architectural block with light bordered edges; required for Blast Furnaces',
      bonusTip: 'Double smelting stone is the only way to obtain Smooth Stone without Silk Touch!'
    },
    tags: ['smooth stone', 'stone', 'blast furnace recipe', 'double smelt']
  },
  {
    id: 'sand_to_glass',
    name: 'Glass from Sand',
    category: 'Blocks & Stone',
    input: { name: 'Sand', icon: '/icons/minecraft/sand.svg', count: 1 },
    output: { name: 'Glass', icon: '/icons/minecraft/glass.svg', count: 1 },
    experience: 0.1,
    timeTicks: 200,
    appliances: ['furnace'],
    transformation: 'Vitrifies silica sand crystals into transparent Glass.',
    changeDetails: {
      before: 'Loose granular desert/beach sand block affected by gravity',
      after: 'Completely see-through architectural glass; crafts Glass Bottles, Beacons, and Daylight Detectors',
      bonusTip: 'Red Sand also smelts into standard clear Glass.'
    },
    tags: ['sand', 'glass', 'bottle', 'beacon', 'transparent']
  },
  {
    id: 'clay_ball_to_brick',
    name: 'Brick from Clay Ball',
    category: 'Blocks & Stone',
    input: { name: 'Clay Ball', icon: '/icons/minecraft/clay.svg', count: 1 },
    output: { name: 'Brick', icon: '/icons/minecraft/brick.svg', count: 1 },
    experience: 0.3,
    timeTicks: 200,
    appliances: ['furnace'],
    transformation: 'Fires soft river clay into hardened reddish-orange building Bricks.',
    changeDetails: {
      before: 'Malleable gray clay harvested from shallow riverbeds and swamps',
      after: 'Durable ceramic brick item; 4 bricks craft a full decorative Brick Block',
      bonusTip: 'Yields 0.3 XP each, making clay harvesting great for early-game levels!'
    },
    tags: ['brick', 'clay', 'ceramic', 'building', 'pottery']
  },
  {
    id: 'clay_to_terracotta',
    name: 'Terracotta from Clay Block',
    category: 'Blocks & Stone',
    input: { name: 'Clay Block', icon: '/icons/minecraft/clay_block.svg', count: 1 },
    output: { name: 'Terracotta', icon: '/icons/minecraft/terracotta.svg', count: 1 },
    experience: 0.35,
    timeTicks: 200,
    appliances: ['furnace'],
    transformation: 'Bakes an entire 4-ball Clay block into earthy Terracotta.',
    changeDetails: {
      before: 'Blue-gray soft clay block',
      after: 'Hard earthen block that can be dyed in 16 colors and glazed in kilns',
      bonusTip: 'Dyeing terracotta and smelting it again creates intricate Glazed Terracotta!'
    },
    tags: ['terracotta', 'clay block', 'hardened clay', 'glazed']
  },
  {
    id: 'cobbled_deepslate_to_deepslate',
    name: 'Deepslate from Cobbled Deepslate',
    category: 'Blocks & Stone',
    input: { name: 'Cobbled Deepslate', icon: '/icons/minecraft/cobbled_deepslate.svg', count: 1 },
    output: { name: 'Deepslate', icon: '/icons/minecraft/deepslate.svg', count: 1 },
    experience: 0.1,
    timeTicks: 200,
    appliances: ['furnace'],
    transformation: 'Re-fuses fragmented Cobbled Deepslate into natural Deepslate.',
    changeDetails: {
      before: 'Rough dark subterranean stone mined below Y=0',
      after: 'Solid deep underground stone with directional slate grain',
      bonusTip: 'Used to craft Deepslate Tiles, Bricks, and polished variants.'
    },
    tags: ['deepslate', 'cobbled deepslate', 'underground', 'building']
  },
  {
    id: 'netherrack_to_nether_brick',
    name: 'Nether Brick from Netherrack',
    category: 'Blocks & Stone',
    input: { name: 'Netherrack', icon: '/icons/minecraft/netherrack.svg', count: 1 },
    output: { name: 'Nether Brick', icon: '/icons/minecraft/nether_brick.svg', count: 1 },
    experience: 0.1,
    timeTicks: 200,
    appliances: ['furnace'],
    transformation: 'Burns blood-red Netherrack into a hardened obsidian-like Nether Brick.',
    changeDetails: {
      before: 'Infinitely burning porous stone that makes up the Nether dimension',
      after: 'Fire-resistant dark purple-red brick; 4 craft Nether Brick blocks and fortress fences',
      bonusTip: 'Netherrack mines instantly with any pickaxe, making mass smelting easy!'
    },
    tags: ['netherrack', 'nether brick', 'nether fortress', 'brick']
  },

  // ==========================================
  // NETHER & ANCIENT DEBRIS
  // ==========================================
  {
    id: 'ancient_debris_to_netherite_scrap',
    name: 'Netherite Scrap from Ancient Debris',
    category: 'Nether & Ancient Debris',
    input: { name: 'Ancient Debris', icon: '/icons/minecraft/ancient_debris.svg', count: 1 },
    output: { name: 'Netherite Scrap', icon: '/icons/minecraft/netherite_scrap.svg', count: 1 },
    experience: 2.0,
    timeTicks: 200,
    appliances: ['furnace', 'blast_furnace'],
    transformation: 'Extracts precious ancient Netherite Scraps from indestructible prehistoric debris.',
    changeDetails: {
      before: 'Ultra-rare blast-resistant metallic fossil found deep in the Nether (Y=8 to 22)',
      after: 'Pure Netherite Scrap; combine 4 scraps + 4 gold ingots to forge a Netherite Ingot',
      bonusTip: 'Yields 2.0 XP per piece (the highest XP in vanilla smelting). Use a Blast Furnace for 5s speed!'
    },
    tags: ['ancient debris', 'netherite scrap', 'netherite', 'blast furnace', 'xp']
  },

  // ==========================================
  // FOOD & COOKING
  // ==========================================
  {
    id: 'raw_beef_to_steak',
    name: 'Steak from Raw Beef',
    category: 'Food & Cooking',
    input: { name: 'Raw Beef', icon: '/icons/minecraft/raw_beef.svg', count: 1 },
    output: { name: 'Cooked Beef (Steak)', icon: '/icons/minecraft/cooked_beef.svg', count: 1 },
    experience: 0.35,
    timeTicks: 200,
    appliances: ['furnace', 'smoker', 'campfire'],
    transformation: 'Seers raw cow meat into hearty, nutrient-rich Cooked Steak.',
    changeDetails: {
      before: 'Raw beef restores only 3 Hunger and 1.8 Saturation',
      after: 'Cooked Steak restores 8 Hunger and a massive 12.8 Saturation points',
      bonusTip: 'Use a Smoker for 5-second fast cooking, or a Campfire for zero fuel consumption!'
    },
    tags: ['beef', 'steak', 'meat', 'smoker', 'campfire', 'food']
  },
  {
    id: 'raw_porkchop_to_cooked',
    name: 'Cooked Porkchop from Raw Porkchop',
    category: 'Food & Cooking',
    input: { name: 'Raw Porkchop', icon: '/icons/minecraft/raw_porkchop.svg', count: 1 },
    output: { name: 'Cooked Porkchop', icon: '/icons/minecraft/cooked_porkchop.svg', count: 1 },
    experience: 0.35,
    timeTicks: 200,
    appliances: ['furnace', 'smoker', 'campfire'],
    transformation: 'Roasts juicy raw pork into one of the top food sources in Minecraft.',
    changeDetails: {
      before: 'Raw meat providing 3 Hunger / 1.8 Saturation',
      after: 'Top-tier sustenance providing 8 Hunger and 12.8 Saturation (identical to Steak)',
      bonusTip: 'Piglins and Hoglins also drop porkchops!'
    },
    tags: ['porkchop', 'pig', 'hoglin', 'smoker', 'campfire', 'food']
  },
  {
    id: 'raw_chicken_to_cooked',
    name: 'Cooked Chicken from Raw Chicken',
    category: 'Food & Cooking',
    input: { name: 'Raw Chicken', icon: '/icons/minecraft/raw_chicken.svg', count: 1 },
    output: { name: 'Cooked Chicken', icon: '/icons/minecraft/cooked_chicken.svg', count: 1 },
    experience: 0.35,
    timeTicks: 200,
    appliances: ['furnace', 'smoker', 'campfire'],
    transformation: 'Cooks raw poultry, completely eliminating the 30% Hunger Poison risk!',
    changeDetails: {
      before: 'Raw chicken has a 30% chance to inflict Hunger effect for 30 seconds',
      after: '100% safe to eat; restores 6 Hunger and 7.2 Saturation with zero illness',
      bonusTip: 'Killing a chicken with Fire Aspect drops Cooked Chicken automatically.'
    },
    tags: ['chicken', 'hunger', 'poison', 'smoker', 'food']
  },
  {
    id: 'raw_mutton_to_cooked',
    name: 'Cooked Mutton from Raw Mutton',
    category: 'Food & Cooking',
    input: { name: 'Raw Mutton', icon: '/icons/minecraft/raw_mutton.svg', count: 1 },
    output: { name: 'Cooked Mutton', icon: '/icons/minecraft/cooked_mutton.svg', count: 1 },
    experience: 0.35,
    timeTicks: 200,
    appliances: ['furnace', 'smoker', 'campfire'],
    transformation: 'Roasts raw sheep meat into savory Cooked Mutton.',
    changeDetails: {
      before: 'Restores only 2 Hunger points',
      after: 'Restores 6 Hunger and 9.6 Saturation points',
      bonusTip: 'Sheep farming provides both Wool beds and Mutton fuel!'
    },
    tags: ['mutton', 'sheep', 'wool', 'smoker', 'food']
  },
  {
    id: 'raw_salmon_to_cooked',
    name: 'Cooked Salmon from Raw Salmon',
    category: 'Food & Cooking',
    input: { name: 'Raw Salmon', icon: '/icons/minecraft/raw_salmon.svg', count: 1 },
    output: { name: 'Cooked Salmon', icon: '/icons/minecraft/cooked_salmon.svg', count: 1 },
    experience: 0.35,
    timeTicks: 200,
    appliances: ['furnace', 'smoker', 'campfire'],
    transformation: 'Pans freshwater or saltwater salmon into tender Cooked Salmon.',
    changeDetails: {
      before: 'Caught fishing or hunting river salmon schools (+2 Hunger)',
      after: 'Cooked fish restoring 6 Hunger and 9.6 Saturation',
      bonusTip: 'Superior nutritional value compared to Cooked Cod.'
    },
    tags: ['salmon', 'fish', 'river', 'fishing', 'smoker', 'food']
  },
  {
    id: 'raw_cod_to_cooked',
    name: 'Cooked Cod from Raw Cod',
    category: 'Food & Cooking',
    input: { name: 'Raw Cod', icon: '/icons/minecraft/raw_cod.svg', count: 1 },
    output: { name: 'Cooked Cod', icon: '/icons/minecraft/cooked_cod.svg', count: 1 },
    experience: 0.35,
    timeTicks: 200,
    appliances: ['furnace', 'smoker', 'campfire'],
    transformation: 'Bakes plain ocean cod into light, nutritious Cooked Cod.',
    changeDetails: {
      before: 'Abundant ocean fish dropped by guardians, polar bears, or caught by rod',
      after: 'Restores 5 Hunger and 6.0 Saturation',
      bonusTip: 'Used to tame and breed Ocelots and Cats!'
    },
    tags: ['cod', 'fish', 'ocean', 'cat', 'smoker', 'food']
  },
  {
    id: 'potato_to_baked_potato',
    name: 'Baked Potato from Potato',
    category: 'Food & Cooking',
    input: { name: 'Potato', icon: '/icons/minecraft/potato.svg', count: 1 },
    output: { name: 'Baked Potato', icon: '/icons/minecraft/baked_potato.svg', count: 1 },
    experience: 0.35,
    timeTicks: 200,
    appliances: ['furnace', 'smoker', 'campfire'],
    transformation: 'Bakes a raw potato into a steaming, hearty Baked Potato.',
    changeDetails: {
      before: 'Farmed root vegetable restoring only 1 Hunger',
      after: 'Reliable survival staple restoring 5 Hunger and 6.0 Saturation',
      bonusTip: 'Easy to automate with villagers and an auto-smoker setup!'
    },
    tags: ['potato', 'baked potato', 'farming', 'smoker', 'food']
  },
  {
    id: 'kelp_to_dried_kelp',
    name: 'Dried Kelp from Kelp',
    category: 'Food & Cooking',
    input: { name: 'Kelp', icon: '/icons/minecraft/kelp.svg', count: 1 },
    output: { name: 'Dried Kelp', icon: '/icons/minecraft/dried_kelp.svg', count: 1 },
    experience: 0.1,
    timeTicks: 200,
    appliances: ['furnace', 'smoker', 'campfire'],
    transformation: 'Dehydrates ocean kelp into crisp, fast-eating Dried Kelp.',
    changeDetails: {
      before: 'Wet aquatic plant grown underwater up to 26 blocks high',
      after: 'Quick-eating snack (consumed 2× faster than normal food); crafts Dried Kelp Blocks',
      bonusTip: '9 Dried Kelp craft a Dried Kelp Block, which can fuel the furnace that cooked them!'
    },
    tags: ['kelp', 'dried kelp', 'fuel', 'fast eating', 'smoker']
  },
  {
    id: 'chorus_fruit_to_popped',
    name: 'Popped Chorus Fruit from Chorus Fruit',
    category: 'Food & Cooking',
    input: { name: 'Chorus Fruit', icon: '/icons/minecraft/chorus_fruit.svg', count: 1 },
    output: { name: 'Popped Chorus Fruit', icon: '/icons/minecraft/popped_chorus_fruit.svg', count: 1 },
    experience: 0.1,
    timeTicks: 200,
    appliances: ['furnace', 'smoker'],
    transformation: 'Bakes End Chorus Fruit, disabling teleportation and hardening the rind.',
    changeDetails: {
      before: 'Raw End fruit that teleports the player up to 8 blocks in any direction when eaten',
      after: 'Inedible rigid purple crystal used to craft End Rods and Purpur building blocks',
      bonusTip: 'Essential ingredient for lighting and End architecture.'
    },
    tags: ['chorus fruit', 'end', 'purpur', 'end rod', 'smoker']
  },

  // ==========================================
  // FLORA, DYES & UTILITIES
  // ==========================================
  {
    id: 'log_to_charcoal',
    name: 'Charcoal from Wood Log',
    category: 'Flora & Dyes',
    input: { name: 'Oak Log', icon: '/icons/minecraft/oak_planks.svg', count: 1 },
    output: { name: 'Charcoal', icon: '/icons/minecraft/charcoal.svg', count: 1 },
    experience: 0.15,
    timeTicks: 200,
    appliances: ['furnace'],
    transformation: 'Carbonizes natural tree trunks into combustible Charcoal.',
    changeDetails: {
      before: 'Any wood log or wood block (Oak, Birch, Spruce, Dark Oak, Mangrove, Cherry, etc.)',
      after: 'Black carbon fuel that burns for 80 seconds and smelts 8 items (identical to Coal)',
      bonusTip: 'Never dig into caves without torches! Chop trees and smelt logs for immediate infinite torches.'
    },
    tags: ['charcoal', 'log', 'wood', 'fuel', 'torch', 'furnace']
  },
  {
    id: 'cactus_to_green_dye',
    name: 'Green Dye from Cactus',
    category: 'Flora & Dyes',
    input: { name: 'Cactus', icon: '/icons/minecraft/cactus.svg', count: 1 },
    output: { name: 'Green Dye', icon: '/icons/minecraft/green_dye.svg', count: 1 },
    experience: 1.0,
    timeTicks: 200,
    appliances: ['furnace'],
    transformation: 'Roasts prickly desert cactus into vibrant forest Green Dye.',
    changeDetails: {
      before: 'Desert succulent that damages entities upon touch and breaks on contact with blocks',
      after: 'Pure dark green pigment used for wool, terracotta, glass, concrete, and shulkers',
      bonusTip: 'Yields a massive 1.0 XP per cactus! Auto-cactus farms are legendary XP sources.'
    },
    tags: ['cactus', 'green dye', 'dye', 'desert', 'xp farm']
  },
  {
    id: 'sea_pickle_to_lime_dye',
    name: 'Lime Dye from Sea Pickle',
    category: 'Flora & Dyes',
    input: { name: 'Sea Pickle', icon: '/icons/minecraft/sea_pickle.svg', count: 1 },
    output: { name: 'Lime Dye', icon: '/icons/minecraft/lime_dye.svg', count: 1 },
    experience: 0.2,
    timeTicks: 200,
    appliances: ['furnace'],
    transformation: 'Extracts glowing marine pigments into brilliant Lime Dye.',
    changeDetails: {
      before: 'Bioluminescent colonial invertebrate found in warm coral reefs',
      after: 'Bright neon green dye for wool, sheep, leather armor, and fireworks',
      bonusTip: 'Can also be made by combining Green Dye + White Dye, but smelting gives XP.'
    },
    tags: ['sea pickle', 'lime dye', 'coral', 'ocean', 'dye']
  },
  {
    id: 'wet_sponge_to_dry_sponge',
    name: 'Dry Sponge from Wet Sponge',
    category: 'Flora & Dyes',
    input: { name: 'Wet Sponge', icon: '/icons/minecraft/wet_sponge.svg', count: 1 },
    output: { name: 'Sponge', icon: '/icons/minecraft/sponge.svg', count: 1 },
    experience: 0.15,
    timeTicks: 200,
    appliances: ['furnace'],
    transformation: 'Dries waterlogged ocean monument sponge back into thirsty Dry Sponge.',
    changeDetails: {
      before: 'Heavy saturated sponge that has soaked up to 65 water blocks',
      after: 'Light absorbent block ready to drain another 65 blocks of water instantly',
      bonusTip: 'SECRET MECHANIC: Put an empty bucket in the fuel slot when smelting! The water drains into the bucket, giving you a free Water Bucket.'
    },
    tags: ['sponge', 'wet sponge', 'ocean monument', 'water bucket', 'secret']
  },

  // ==========================================
  // RECYCLING GEAR
  // ==========================================
  {
    id: 'iron_gear_to_nugget',
    name: 'Iron Nugget from Iron Equipment',
    category: 'Recycling Gear',
    input: { name: 'Iron Pickaxe / Armor', icon: '/icons/minecraft/diamond_pickaxe.svg', count: 1 },
    output: { name: 'Iron Nugget', icon: '/icons/minecraft/iron_nugget.svg', count: 1 },
    experience: 0.1,
    timeTicks: 200,
    appliances: ['furnace', 'blast_furnace'],
    transformation: 'Smelts damaged iron tools, weapons, and armor into an Iron Nugget.',
    changeDetails: {
      before: 'Worn or low-durability iron tools, swords, armor, or mob-dropped chainmail',
      after: '1/9th of an Iron Ingot; recombine 9 nuggets to craft a pristine Iron Ingot',
      bonusTip: 'Great for salvaging zombie and skeleton mob farm equipment in Blast Furnaces!'
    },
    tags: ['iron nugget', 'recycle', 'iron gear', 'mob farm', 'blast furnace']
  },
  {
    id: 'golden_gear_to_nugget',
    name: 'Gold Nugget from Golden Equipment',
    category: 'Recycling Gear',
    input: { name: 'Golden Sword / Armor', icon: '/icons/minecraft/diamond_sword.svg', count: 1 },
    output: { name: 'Gold Nugget', icon: '/icons/minecraft/gold_nugget.svg', count: 1 },
    experience: 0.1,
    timeTicks: 200,
    appliances: ['furnace', 'blast_furnace'],
    transformation: 'Melts piglin or zombie-dropped gold swords and armor into pure Gold Nuggets.',
    changeDetails: {
      before: 'Low-durability golden armor or weapons from Nether Nether Fortresses / Piglins',
      after: '1 Gold Nugget; used for Golden Carrots, Glistering Melons, and Gold Ingots',
      bonusTip: 'Connect a Blast Furnace directly to your Piglin/Zombified Piglin farm!'
    },
    tags: ['gold nugget', 'recycle', 'piglin', 'zombie', 'gold gear']
  }
];
