// Comprehensive Official Minecraft Java Edition Structures Database
// Grounded directly in official Minecraft Java Edition mechanics & Minecraft Wiki specifications

export const STRUCTURE_CATEGORIES = [
  'All',
  'Overworld: Underground',
  'Overworld: Above Ground',
  'Overworld: Above & Underground',
  'Overworld: Underwater',
  'The Nether',
  'The End',
  'Structure-like Features',
  'Removed Structures'
];

export const MINECRAFT_STRUCTURES = [
  // ==========================================
  // 1.1 OVERWORLD: UNDERGROUND STRUCTURES
  // ==========================================
  {
    id: 'trial_chambers',
    name: 'Trial Chambers',
    namespacedId: 'minecraft:trial_chambers',
    category: 'Overworld: Underground',
    dimension: 'Overworld',
    version: '1.21 Tricky Trials (Modern)',
    yLevel: 'Y = -20 to -40 (Deepslate Layer)',
    image: '/images/structures/trial_chambers.png',
    icon: '/icons/minecraft/vault.svg',
    difficulty: 'Extreme (1.21 Combat)',
    rarity: 'Common in deep underground',
    tags: ['#minecraft:on_trial_chambers_maps', '#minecraft:trial_chambers'],
    keyMobs: ['Breeze', 'Bogged (Poison Skeleton)', 'Baby Zombies', 'Silverfish', 'Slimes', 'Spiders'],
    lootHighlights: ['Heavy Core (for The Mace)', 'Breeze Rod', 'Flow & Bolt Armor Trims', 'Trial Key & Ominous Key', 'Crafter', 'Wind Charges'],
    locatingMethod: 'Trial Chambers Explorer Map from Journeyman Cartographer Villager, or `/locate structure minecraft:trial_chambers`',
    generationMechanics: 'Procedural Jigsaw Block assembly using dozens of prefabricated Tuff, Copper, and corridor rooms (.nbt pool files).',
    description: 'A sprawling subterranean combat labyrinth made of polished tuff and oxidized copper. Features Trial Spawners that scale monster count with players, and Ominous Vaults opened with Ominous Trial Keys for legendary mace ingredients.',
    advancements: [
      { id: 'revaulting', title: 'Revaulting', desc: 'Unlock a Vault with a Trial Key' },
      { id: 'under_lock_and_key', title: 'Under Lock and Key', desc: 'Unlock an Ominous Vault with an Ominous Trial Key' },
      { id: 'blowback', title: 'Blowback', desc: 'Kill a Breeze with a deflected Wind Charge' },
      { id: 'over_overkill', title: 'Over-Overkill', desc: 'Deal 50 hearts of damage with the Mace' }
    ],
    secretFeatures: 'Drink an Ominous Bottle before entering to trigger the Ominous Event: spawners turn fiery blue, drop potions and projectiles from ceilings, and reward Ominous Keys!'
  },
  {
    id: 'ancient_city',
    name: 'Ancient City',
    namespacedId: 'minecraft:ancient_city',
    category: 'Overworld: Underground',
    dimension: 'Overworld',
    version: '1.19 The Wild Update',
    yLevel: 'Y = -51 to -52 (Deep Dark)',
    image: '/images/structures/ancient_city.png',
    icon: '/icons/minecraft/echo_shard.svg',
    difficulty: 'Deadly (Stealth Required)',
    rarity: 'Rare (below massive mountain biomes)',
    tags: ['#minecraft:ancient_city'],
    keyMobs: ['The Warden (Summoned by Sculk Shriekers)'],
    lootHighlights: ['Silence Armor Trim (1.2% rarest)', 'Ward Armor Trim', 'Echo Shards (Recovery Compass)', 'Swift Sneak III Book', 'Enchanted Golden Apples', 'Otherside Disc'],
    locatingMethod: 'Search underneath Jagged Peaks, Frozen Peaks, or Meadow mountains, or `/locate structure minecraft:ancient_city`',
    generationMechanics: 'Sprawls across an entire subterranean valley. Centerpiece is a giant Reinforced Deepslate portal-like monument with secret redstone rooms below.',
    description: 'A decrepit forgotten metropolis engulfed in darkness and sculk vines. Infested with Sculk Sensors and Shriekers that will awaken the terrifying, blind Warden if players make noise.',
    advancements: [
      { id: 'sneak_100', title: 'Sneak 100', desc: 'Sneak near a Sculk Sensor or Warden without being detected' },
      { id: 'it_spreads', title: 'It Spreads', desc: 'Kill a mob near a Sculk Catalyst' }
    ],
    secretFeatures: 'Underneath the central portal frame lies a hidden redstone laboratory teaching all 15 redstone wire/gate mechanisms!'
  },
  {
    id: 'stronghold',
    name: 'Stronghold',
    namespacedId: 'minecraft:stronghold',
    category: 'Overworld: Underground',
    dimension: 'Overworld',
    version: 'Beta 1.9 / 1.0 Release',
    yLevel: 'Y = -50 to +30 (Variable Depth)',
    image: '/images/structures/stronghold.png',
    icon: '/icons/minecraft/eye_of_ender.svg',
    difficulty: 'High (Endgame Transition)',
    rarity: '128 per world in concentric generation rings',
    tags: ['#minecraft:eye_of_ender_located', '#minecraft:stronghold'],
    keyMobs: ['Silverfish (Portal Room Spawner)', 'Zombies', 'Skeletons'],
    lootHighlights: ['Eye Armor Trim', 'End Portal Frame', 'Enchanted Books', 'Diamonds', 'Iron Armor', 'Ender Pearls'],
    locatingMethod: 'Throw Eyes of Ender into the air and follow their flight vector, or `/locate structure minecraft:stronghold`',
    generationMechanics: 'Generates in 8 concentric rings centered around (0,0). Includes multi-story libraries, spiral staircases, prison cells, and the End Portal room.',
    description: 'An ancient subterranean fortress composed of stone bricks and iron bars. Contains the End Portal room above a pool of lava with a Silverfish spawner, requiring 12 Eyes of Ender to ignite the gateway to The End.',
    advancements: [
      { id: 'eye_spy', title: 'Eye Spy', desc: 'Follow an Eye of Ender and enter a Stronghold' }
    ],
    secretFeatures: 'Each End Portal frame block has a 10% chance to spawn with an Eye of Ender pre-inserted. A full 12-eye natural portal has a 1 in 1 trillion generation chance!'
  },
  {
    id: 'mineshaft',
    name: 'Abandoned Mineshaft',
    namespacedId: 'minecraft:mineshaft',
    category: 'Overworld: Underground',
    dimension: 'Overworld',
    version: 'Beta 1.8 Adventure Update',
    yLevel: 'Y = -60 to +50',
    image: '/images/structures/mineshaft.png',
    icon: '/icons/minecraft/rail.svg',
    difficulty: 'Medium (Cave Spiders & Cobwebs)',
    rarity: 'Very Common',
    tags: ['#minecraft:mineshaft'],
    keyMobs: ['Cave Spiders (Deadly Poison Spawners in Cobwebs)'],
    lootHighlights: ['Minecart with Chest', 'Rails & Powered Rails', 'Enchanted Books', 'Name Tags', 'Saddles', 'Golden Apples'],
    locatingMethod: 'Explore deep ravines and caves, or explore Badlands mesas where shafts generate exposed on the surface.',
    generationMechanics: 'Intersecting 3x3 wooden corridor shafts with oak/dark oak timber supports, central dirt rooms, and hanging rail ties.',
    description: 'Vast abandoned mining tunnel networks crisscrossing caves. Choked with dense cobwebs and Cave Spider spawners that inflict rapid poison damage.',
    advancements: [],
    secretFeatures: 'In Badlands/Mesa biomes, mineshafts use Dark Oak wood planks instead of Oak and generate right up to the surface with exposed Gold Ore!'
  },

  // ==========================================
  // 1.2 OVERWORLD: ABOVE GROUND STRUCTURES
  // ==========================================
  {
    id: 'woodland_mansion',
    name: 'Woodland Mansion',
    namespacedId: 'minecraft:mansion',
    category: 'Overworld: Above Ground',
    dimension: 'Overworld',
    version: '1.11 Exploration Update',
    yLevel: 'Surface (Dark Forest biomes)',
    image: '/images/structures/woodland_mansion.png',
    icon: '/icons/minecraft/totem_of_undying.svg',
    difficulty: 'Very Hard (Illager stronghold)',
    rarity: 'Extremely Rare (Thousands of blocks from spawn)',
    tags: ['#minecraft:on_woodland_explorer_maps', '#minecraft:mansion'],
    keyMobs: ['Evoker (Fangs & Vexes)', 'Vindicator (Johnny Axe)', 'Allay (Prison cells)'],
    lootHighlights: ['Totem of Undying (Evoker Drop)', 'Vex Armor Trim', 'Diamond Block encased in obsidian', 'Enchanted Golden Apples', 'Secret Chests'],
    locatingMethod: 'Woodland Explorer Map purchased from Cartographer Villager, or `/locate structure minecraft:mansion`',
    generationMechanics: 'Huge 3-story mansion with procedural room assignments (gardens, forge, prison, bedroom, library, wool statues).',
    description: 'A colossal dark oak and cobblestone mansion hidden deep in Dark Forests. Inhabited by hostile Illagers, holding secret rooms containing diamond blocks and the indispensable Totem of Undying.',
    advancements: [],
    secretFeatures: 'Certain rooms contain giant wool statues of a Cat, Illager face, or Chicken. Some statues contain a hidden chest or a solid block of Lapis Lazuli!'
  },
  {
    id: 'pillager_outpost',
    name: 'Pillager Outpost',
    namespacedId: 'minecraft:pillager_outpost',
    category: 'Overworld: Above Ground',
    dimension: 'Overworld',
    version: '1.14 Village & Pillage',
    yLevel: 'Surface (within 1000 blocks of Villages)',
    image: '/images/structures/pillager_outpost.png',
    icon: '/icons/minecraft/sentry_armor_trim_smithing_template.svg',
    difficulty: 'Medium (Crossbow Barrages)',
    rarity: 'Uncommon',
    tags: ['#minecraft:pillager_outpost'],
    keyMobs: ['Pillager Captain (Ominous Banner)', 'Pillagers with Crossbows', 'Trapped Iron Golem', 'Trapped Allays'],
    lootHighlights: ['Sentry Armor Trim', 'Crossbows & Enchants', 'Ominous Banner', 'Goat Horn', 'Iron & Dark Oak Planks'],
    locatingMethod: 'Scout plains, deserts, savannas, and snowy tundras near villages, or `/locate structure minecraft:pillager_outpost`',
    generationMechanics: 'Multi-level dark oak watchtower surrounded by tents, log piles, target dummies, and caged iron golems.',
    description: 'Watchtowers erected by illager scouting parties. Slaying the Outpost Captain drops an Ominous Banner and can bestow the Bad Omen status effect.',
    advancements: [],
    secretFeatures: 'Freeing the caged Iron Golem will cause it to rampage and wipe out all pillagers stationed around the outpost!'
  },
  {
    id: 'desert_pyramid',
    name: 'Desert Pyramid (Temple)',
    namespacedId: 'minecraft:desert_pyramid',
    category: 'Overworld: Above Ground',
    dimension: 'Overworld',
    version: '1.3.1 (Updated with Archaeology in 1.20)',
    yLevel: 'Surface (Desert biomes)',
    image: '/images/structures/desert_pyramid.png',
    icon: '/icons/minecraft/dune_armor_trim_smithing_template.svg',
    difficulty: 'Medium (Deadly TNT Trap)',
    rarity: 'Common in deserts',
    tags: ['#minecraft:desert_pyramid'],
    keyMobs: ['Husks (Hunger effect zombies outside)'],
    lootHighlights: ['Dune Armor Trim', 'Enchanted Golden Apples', 'Diamonds & Emeralds', 'Suspicious Sand (Miner / Shelter Sherds)', '9x TNT Blocks'],
    locatingMethod: 'Travel through Desert biomes during day, or `/locate structure minecraft:desert_pyramid`',
    generationMechanics: 'Sandstone pyramid with twin front towers, blue terracotta facade, and hidden vertical drop to a stone pressure plate.',
    description: 'A monument constructed from normal and chiseled sandstone. Beneath the blue terracotta floor tile lies a secret chamber with 4 treasure chests surrounding a deadly pressure plate rigged to 9 blocks of TNT.',
    advancements: [],
    secretFeatures: 'Do NOT drop directly onto the center tile! Dig around the edges and disarm the stone pressure plate to safely loot 9 free TNT blocks and 4 chests.'
  },
  {
    id: 'swamp_hut',
    name: 'Swamp Hut (Witch Hut)',
    namespacedId: 'minecraft:swamp_hut',
    category: 'Overworld: Above Ground',
    dimension: 'Overworld',
    version: '1.4.2 Pretty Scary Update',
    yLevel: 'Surface water level in Swamps',
    image: '/images/structures/swamp_hut.png',
    icon: '/icons/minecraft/brewing_stand.svg',
    difficulty: 'Medium (Poison & Slowness Potions)',
    rarity: 'Uncommon in Swamps',
    tags: ['#minecraft:swamp_hut'],
    keyMobs: ['Witch (Continual spawning bounding box)', 'Black Cat'],
    lootHighlights: ['Cauldron (sometimes filled with random potion)', 'Crafting Table', 'Empty Flower Pot with Red Mushroom'],
    locatingMethod: 'Navigate swamp biomes looking for stilts over shallow water, or `/locate structure minecraft:swamp_hut`',
    generationMechanics: '7x9 oak plank hut elevated on spruce stilts over swamp water.',
    description: 'The laboratory of a solitary Witch and her black cat. Famous among technical players as the premier location for building high-yield automated Witch Farms for redstone, glowstone, and gunpowder.',
    advancements: [],
    secretFeatures: 'Witches continually spawn within the 7x9x7 interior bounding box of the hut, making it an ideal perimeter for automated redstone farms!'
  },
  {
    id: 'igloo',
    name: 'Igloo',
    namespacedId: 'minecraft:igloo',
    category: 'Overworld: Above Ground',
    dimension: 'Overworld',
    version: '1.9 Combat Update',
    yLevel: 'Surface in Snowy Tundras & Snowy Taigas',
    image: '/images/structures/igloo.png',
    icon: '/icons/minecraft/golden_apple.svg',
    difficulty: 'Safe / Educational',
    rarity: 'Uncommon in cold snowy biomes',
    tags: ['#minecraft:igloo'],
    keyMobs: ['Zombie Villager & Regular Villager (in Basement)'],
    lootHighlights: ['Golden Apple', 'Splash Potion of Weakness (Brewing Stand)', 'Oak Trapdoor', 'Red Carpet', 'Furnace & Bed'],
    locatingMethod: 'Search snowy plains, slopes, and snowy taigas, or `/locate structure minecraft:igloo`',
    generationMechanics: 'Snow block dome with 50% chance to generate an oak trapdoor beneath the white/light gray carpet leading to a stone brick dungeon.',
    description: 'A cozy snow dome containing a red bed, furnace, and crafting table. 50% of igloos possess a secret basement that acts as a tutorial demonstrating how to cure a Zombie Villager back into a normal villager!',
    advancements: [
      { id: 'zombie_doctor', title: 'Zombie Doctor', desc: 'Weaken and cure a Zombie Villager' }
    ],
    secretFeatures: 'Under the carpet lies a ladder into a lab with a brewing stand holding a Splash Potion of Weakness and a chest with a Golden Apple — everything needed to cure the caged zombie villager!'
  },

  // ==========================================
  // 1.3 OVERWORLD: ABOVE & UNDERGROUND
  // ==========================================
  {
    id: 'trail_ruins',
    name: 'Trail Ruins',
    namespacedId: 'minecraft:trail_ruins',
    category: 'Overworld: Above & Underground',
    dimension: 'Overworld',
    version: '1.20 Trails & Tales',
    yLevel: 'Partially buried (Surface to Y = +30)',
    image: '/images/structures/trail_ruins.png',
    icon: '/icons/minecraft/wayfinder_armor_trim_smithing_template.svg',
    difficulty: 'Safe / Archaeological',
    rarity: 'Rare (Birch, Taiga, and Jungle borders)',
    tags: ['#minecraft:trail_ruins'],
    keyMobs: ['None (Archaeology site)'],
    lootHighlights: ['4 Armor Trims: Wayfinder, Raiser, Shaper, Host', 'Relic Music Disc (Aaron Cherof)', 'Pottery Sherds (Burn, Danger, Friend, Heart, Heartbreak, Sheaf, Shelter)', 'Glass Panes & Candles'],
    locatingMethod: 'Look for stray terracotta, gravel, and mud brick clusters peaking out of the surface in Taiga or Old Growth Birch biomes.',
    generationMechanics: 'Buried multi-structure archaeological village made of terracotta and mud bricks, filled with Suspicious Gravel.',
    description: 'An ancient settlement buried by time. Players use the Brush tool on Suspicious Gravel to delicately extract rare historical pottery sherds, the Relic music disc, and four unique armor trim templates.',
    advancements: [],
    secretFeatures: 'Use a Brush tool on Suspicious Gravel — if you break it with a shovel, the delicate ancient relic inside will shatter instantly!'
  },

  // ==========================================
  // 1.4 OVERWORLD: UNDERWATER STRUCTURES
  // ==========================================
  {
    id: 'ocean_monument',
    name: 'Ocean Monument',
    namespacedId: 'minecraft:monument',
    category: 'Overworld: Underwater',
    dimension: 'Overworld',
    version: '1.8 Bountiful Update',
    yLevel: 'Deep Ocean floor',
    image: '/images/structures/ocean_monument.png',
    icon: '/icons/minecraft/heart_of_the_sea.svg',
    difficulty: 'Very Hard (Mining Fatigue & Drowning)',
    rarity: 'Uncommon in Deep Ocean biomes',
    tags: ['#minecraft:on_ocean_explorer_maps', '#minecraft:monument'],
    keyMobs: ['3x Elder Guardians (Inflict Mining Fatigue III)', 'Guardians (Laser eye beam attacks)'],
    lootHighlights: ['8x Gold Blocks (encased in dark prismarine)', 'Tide Armor Trim (Drop from Elder Guardian)', 'Wet Sponges (Sponge room has up to 30 sponges!)', 'Prismarine Shards & Crystals'],
    locatingMethod: 'Ocean Explorer Map from Cartographer Villager, or `/locate structure minecraft:monument`',
    generationMechanics: 'Massive 58x58 prismarine temple with central treasure core, labyrinthine corridors, and 1-2 sponge rooms.',
    description: 'A monolithic aquatic temple made of prismarine, dark prismarine, and sea lanterns. Guarded by 3 Elder Guardians whose psychic gaze inflicts Mining Fatigue III on all trespassers within 50 blocks.',
    advancements: [
      { id: 'the_deep_end', title: 'The Deep End', desc: 'Defeat an Elder Guardian' }
    ],
    secretFeatures: 'Break the dark prismarine cube in the center of the monument to claim 8 solid Gold Blocks (equivalent to 72 Gold Ingots)!'
  },

  // ==========================================
  // 2. THE NETHER STRUCTURES
  // ==========================================
  {
    id: 'nether_fortress',
    name: 'Nether Fortress',
    namespacedId: 'minecraft:fortress',
    category: 'The Nether',
    dimension: 'The Nether',
    version: 'Beta 1.9 / 1.0 Release',
    yLevel: 'Spans across lava oceans (Y = 30 to 70)',
    image: '/images/structures/nether_fortress.png',
    icon: '/icons/minecraft/blaze_rod.svg',
    difficulty: 'Hard (Blaze Fireballs & Wither Effect)',
    rarity: 'Common (aligned on North-South generation bands)',
    tags: ['#minecraft:fortress'],
    keyMobs: ['Blaze (Spawners on bridge balconies)', 'Wither Skeleton (Wither effect & skull drops)', 'Magma Cubes', 'Zombified Piglins'],
    lootHighlights: ['Blaze Rods (Essential for brewing & Eye of Ender)', 'Wither Skeleton Skulls (Summons the Wither boss)', 'Rib Armor Trim', 'Nether Wart', 'Diamonds & Gold Ingots'],
    locatingMethod: 'Traverse along the X-axis (east/west) looking North/South, or `/locate structure minecraft:fortress`',
    generationMechanics: 'Intricate bridges, balconies, covered corridors, and interior rooms paved with Nether Bricks over vast Nether lava oceans.',
    description: 'Colossal nether brick bridges towering above the lava sea. The exclusive home of Blaze spawners and Wither Skeletons — visiting a fortress is mandatory to beat Minecraft!',
    advancements: [
      { id: 'into_fire', title: 'Into Fire', desc: 'Relieve a Blaze of its rod' },
      { id: 'spooky_scary_skeleton', title: 'A Spooky Scary Skeleton', desc: 'Obtain a Wither Skeleton Skull' }
    ],
    secretFeatures: 'Nether Fortresses generate along positive and negative North-South strips. If you travel east or west for 300-400 blocks, you will almost always hit a fortress band.'
  },
  {
    id: 'bastion_remnant',
    name: 'Bastion Remnant',
    namespacedId: 'minecraft:bastion_remnant',
    category: 'The Nether',
    dimension: 'The Nether',
    version: '1.16 Nether Update',
    yLevel: 'Y = 30 to 80 (Nether Wastes, Crimson Forest, Soul Sand Valley)',
    image: '/images/structures/bastion_remnant.png',
    icon: '/icons/minecraft/netherite_upgrade_smithing_template.svg',
    difficulty: 'Extreme (Piglin Brutes with Golden Axes)',
    rarity: 'Common (mutually exclusive with Fortresses in regional quadrants)',
    tags: ['#minecraft:bastion_remnant'],
    keyMobs: ['Piglin Brute (High damage, cannot be distracted by gold!)', 'Piglins', 'Hoglins', 'Magma Cube Spawner'],
    lootHighlights: ['Netherite Upgrade Smithing Template (100% in Treasure Room)', 'Snout Armor Trim', 'Pigstep Music Disc (Lena Raine)', 'Netherite Ingot & Debris', 'Ancient Debris', 'Loot Chests'],
    locatingMethod: 'Explore Nether Wastes or Crimson Forests, or `/locate structure minecraft:bastion_remnant`',
    generationMechanics: '4 distinct variants: Bridge, Hoglin Stables, Housing Units, and the colossal Treasure Room.',
    description: 'Gigantic crumbling blackstone citadels fortified by Piglin Brutes who attack instantly regardless of gold armor. The Treasure Room variant features a Magma Cube spawner suspended over lava pools with guaranteed Netherite Upgrade templates.',
    advancements: [
      { id: 'those_were_the_days', title: 'Those Were the Days', desc: 'Find and enter a Bastion Remnant' },
      { id: 'war_pigs', title: 'War Pigs', desc: 'Loot a chest in a Bastion Remnant' }
    ],
    secretFeatures: 'Piglin Brutes deal up to 19 hearts of damage per hit! Use boats to trap them safely before looting the gold blocks.'
  },

  // ==========================================
  // 3. THE END STRUCTURES
  // ==========================================
  {
    id: 'end_city',
    name: 'End City & End Ship',
    namespacedId: 'minecraft:end_city',
    category: 'The End',
    dimension: 'The End',
    version: '1.9 Combat Update',
    yLevel: 'Outer End islands (Y = 60+)',
    image: '/images/structures/end_city.png',
    icon: '/icons/minecraft/elytra.svg',
    difficulty: 'Hard (Shulker Levitation & Void Fall)',
    rarity: 'Common on Outer End Islands (>1000 blocks from center)',
    tags: ['#minecraft:end_city'],
    keyMobs: ['Shulkers (Inflict Levitation with guided bullets)'],
    lootHighlights: ['Elytra Wings (in End Ship frame)', 'Dragon Head (Ship bow)', 'Spire Armor Trim', 'Shulker Shells (for Shulker Boxes)', 'High-tier Enchanted Diamond & Netherite Gear'],
    locatingMethod: 'Enter the End Gateway after defeating the Ender Dragon and explore outer islands, or `/locate structure minecraft:end_city`',
    generationMechanics: 'Tall branched towers built from purpur blocks and end stone bricks, with hovering flying End Ships.',
    description: 'Towering purple alien spires inhabited by Shulkers on the outer islands. Floating beside larger cities is the End Ship, holding the coveted Elytra wings in an item frame and the Dragon Head trophy on its prow.',
    advancements: [
      { id: 'the_city_at_the_end', title: 'The City at the End of the Game', desc: 'Enter an End City' },
      { id: 'skys_the_limit', title: "Sky's the Limit", desc: 'Find and equip an Elytra from an End Ship' }
    ],
    secretFeatures: 'Drink milk or throw an ender pearl downward if hit by Shulker bullets to prevent drifting up into the deadly void!'
  }
];

export const STRUCTURE_FEATURES = [
  {
    name: 'Fossils',
    id: 'fossil',
    category: 'Subterranean Feature',
    desc: 'Prehistoric skeletal remains made of Bone Blocks found in Deserts, Swamps, and Deepslate caves (where diamond/coal ores embed in the bones).'
  },
  {
    name: 'Desert Well',
    id: 'desert_well',
    category: 'Surface Feature',
    desc: 'Small sandstone well with water. Contains suspicious sand in 1.20+ with Brewer and Arms Up pottery sherds.'
  },
  {
    name: 'End Gateway',
    id: 'end_gateway',
    category: 'Dimension Gateway',
    desc: 'Single bedrock floating structure with an End Gateway portal block inside. Throw an Ender Pearl through to warp 1,000 blocks to the outer End islands.'
  },
  {
    name: 'Obsidian Pillars & End Crystals',
    id: 'end_pillars',
    category: 'Boss Arena Feature',
    desc: '10 obsidian monoliths encircling the central End island, holding End Crystals that heal the Ender Dragon.'
  }
];

export const REMOVED_STRUCTURES = [
  {
    name: 'Brick Pyramid',
    version: 'Infdev (2010)',
    desc: 'Colossal solid 64×64 brick pyramid generated in the early Infdev terrain generator, serving as navigation monuments.'
  },
  {
    name: 'Obsidian Wall',
    version: 'Infdev (2010)',
    desc: 'Enormous obsidian cross-sections intersecting along the primary coordinate axes.'
  },
  {
    name: 'Indev House',
    version: 'Indev (2010)',
    desc: 'A small mossy cobblestone box with torches and chests that spawned around the player in Indev.'
  },
  {
    name: 'Nether Reactor',
    version: 'Pocket Edition (Pre-0.12.0)',
    desc: 'Gold block and cobblestone ritual structure housing the blue Nether Reactor Core to spawn nether spires and zombie pigmen before the Nether dimension was added.'
  }
];

export const GENERATION_RULES = {
  jigsawSystem: 'Modern Minecraft structures (Trial Chambers, Bastions, Ancient Cities, Villages) assemble via Jigsaw Blocks, connecting modular prefabricated .nbt room segments defined in datapack pools.',
  spacingAndSeparation: 'Structure placement uses two integers: spacing (max distance between attempts) and separation (min distance guaranteed between structures), alongside a world seed salt.',
  locateCommand: '/locate structure <namespace:structure_id>'
};
