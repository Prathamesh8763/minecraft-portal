// Official Minecraft Java Edition Encyclopedia Data
// 5 Logical Categories with Verified Sourcing (Canonical 1.0 to 26.3 Wilderness Bound + 26.4 Snapshots)

export const CURRENT_GAME_VERSION_STATUS = {
  latestRelease: 'Minecraft Java Edition 26.3',
  releaseDropName: 'Wilderness Bound (Game Drop 3)',
  releaseDate: 'September 15, 2026',
  activeSnapshots: 'Java 26.4 Snapshot Preview (Snap 5)',
  releaseCadence: 'Official Game Drops Model (Announced September 2024)',
  officialArticleUrl: 'https://www.minecraft.net/en-us/updates/minecraft-updates-timeline-and-evolution',
  wikiSourceUrl: 'https://feedback.minecraft.net/hc/en-us/sections/360001186971-Release-Changelogs',
  lastAuditDate: 'October 25, 2026'
};

export const ENCYCLOPEDIA_CATEGORIES = [
  {
    id: 'learn',
    name: 'Learn Minecraft',
    shortName: 'Learn',
    icon: '🧭',
    color: 'emerald',
    badge: 'Core Essentials',
    subtopics: 'Getting started · Progression · Game modes · Survival guides',
    description: 'Master core survival mechanics, world generation tiers, combat recovery cooldowns, and food saturation dynamics.',
    topicIds: [1, 11, 12]
  },
  {
    id: 'world',
    name: 'Explore the World',
    shortName: 'World',
    icon: '🌍',
    color: 'teal',
    badge: '3 Dimensions',
    subtopics: 'Biomes · Mobs · Structures · Dimensions · Lore',
    description: 'Dimensions, biomes, generated structures like Trial Chambers and Abandoned Camps, hostile/passive mob bestiary, and environmental lore.',
    topicIds: [3, 4, 10, 18]
  },
  {
    id: 'engineer',
    name: 'Build & Engineer',
    shortName: 'Engineer',
    icon: '⚙️',
    color: 'amber',
    badge: 'Automation',
    subtopics: 'Redstone · Automatic farms · Enchantments · Brewing · Commands',
    description: 'Redstone logic, 1.21 Crafter automation, the 42 enchantment codex, 16 potion recipes, and modern /execute command syntax.',
    topicIds: [9, 6, 5, 7, 8, 15]
  },
  {
    id: 'customize',
    name: 'Customize & Play',
    shortName: 'Customize',
    icon: '🎨',
    color: 'indigo',
    badge: 'Ecosystem',
    subtopics: 'Mods · Modpacks · Shaders · Resource packs · Servers · Speedrunning',
    description: 'Fabric/NeoForge loaders, Sodium/Iris performance shaders, pack.mcmeta resource packs, dedicated 25565 servers, and Any% speedrun routing.',
    topicIds: [13, 14, 16, 17]
  },
  {
    id: 'versions',
    name: 'Versions & News',
    shortName: 'Versions',
    icon: '📰',
    color: 'cyan',
    badge: 'Official Drops',
    subtopics: 'Version history · Current releases · Snapshots · Upcoming changes · Creators',
    description: 'Official changelog release notes from 1.0 through 26.3 Wilderness Bound, active 26.4 Ice Caves snapshot tracking, and creator milestones.',
    topicIds: [2, 19]
  }
];

// Curated Popular Guides with explicit definitions and direct jumps
export const POPULAR_GUIDES = [
  {
    id: 'guide-wilderness-bound',
    title: 'Wilderness Bound',
    category: 'Game Drops',
    parentCategoryId: 'versions',
    topicId: 2,
    summary: 'The official autumn-themed Game Drop released on September 15, 2026.',
    details: 'Introduces the Dappled Forest biome, Poplar trees & wood family, Abandoned Camps with Explorer Maps, portable single-use Straw Beds that skip the night without resetting spawn, sit-able Cushions, and wool/concrete stairs & slabs.',
    version: 'Java 26.3 Stable',
    sourceUrl: 'https://feedback.minecraft.net/hc/en-us/sections/360001186971-Release-Changelogs',
    toolId: 'drops'
  },
  {
    id: 'guide-straw-bed',
    title: 'Straw Bed',
    category: 'Survival',
    parentCategoryId: 'learn',
    topicId: 12,
    summary: 'A portable single-use bed for nomadic survival that skips the night without resetting spawn.',
    details: 'Crafted from 3 Hay Bales. Designed for explorers on long expeditions; allows players to sleep through the night outdoors without changing their primary home bed or respawn anchor location.',
    version: 'Java 26.3+',
    sourceUrl: 'https://feedback.minecraft.net/hc/en-us/sections/360001186971-Release-Changelogs',
    toolId: 'crafting'
  },
  {
    id: 'guide-mending',
    title: 'Mending',
    category: 'Enchantments',
    parentCategoryId: 'engineer',
    topicId: 7,
    summary: 'An enchantment that repairs items using experience orbs.',
    details: 'Treasure enchantment (mutually exclusive with Infinity on Bows). Restores 2 durability points per XP point collected while held in hand or worn in armor slots. Best obtained via Villager Trading (Librarians) or Fishing/Ancient Cities.',
    version: 'Java 1.9+',
    sourceUrl: 'https://minecraft.wiki/w/Mending',
    toolId: 'enchanting'
  },
  {
    id: 'guide-warden',
    title: 'Warden',
    category: 'Mobs',
    parentCategoryId: 'world',
    topicId: 4,
    summary: 'A hostile mob associated with the Deep Dark.',
    details: 'Blind subterranean apex predator with 500 HP (250 hearts). Triggered after 4 Sculk Shrieker activations. Uses vibration sniffing, a 30-damage melee attack, and a 10-heart Sonic Boom that penetrates solid blocks, shields, and armor.',
    version: 'Java 1.19+',
    sourceUrl: 'https://minecraft.wiki/w/Warden',
    toolId: 'mobs'
  },
  {
    id: 'guide-iron-farm',
    title: 'Iron Farm',
    category: 'Farms',
    parentCategoryId: 'engineer',
    topicId: 6,
    summary: 'A farm design for collecting iron and poppies.',
    details: 'Automated factory leveraging villager panic mechanics. Three villagers exposed to line-of-sight panic with a Zombie repeatedly summon Iron Golems into a flowing water stream, funneling them into lava blades for continuous iron ingot drops.',
    version: 'Java 1.14+',
    sourceUrl: 'https://minecraft.wiki/w/Tutorial:Iron_golem_farming',
    toolId: 'crafting'
  },
  {
    id: 'guide-nether-portal',
    title: 'Nether Portal',
    category: 'Progression',
    parentCategoryId: 'learn',
    topicId: 3,
    summary: 'A portal used to travel between the Overworld and Nether.',
    details: 'Rectangular frame constructed from 10 to 14 Obsidian blocks (minimum 4x5 outer dimension) ignited with Flint and Steel. Uses an 8:1 spatial compression ratio (1 block traveled in the Nether equals 8 blocks in the Overworld).',
    version: 'Java Beta 1.0 / 1.0.0+',
    sourceUrl: 'https://minecraft.wiki/w/Nether_portal',
    toolId: 'biomes'
  },
  {
    id: 'guide-execute',
    title: '/execute',
    category: 'Commands',
    parentCategoryId: 'engineer',
    topicId: 15,
    summary: 'A command for executing actions with context and conditions.',
    details: 'The fundamental scripting powerhouse of modern Minecraft. Chains modular modifiers such as `as <entity>`, `at <location>`, `if block/entity`, `positioned as`, and `store result` before running target actions like `tp`, `particle`, or `give`.',
    version: 'Java 1.13+ (Updated 1.20.5+)',
    sourceUrl: 'https://minecraft.wiki/w/Commands/execute',
    toolId: null
  },
  {
    id: 'guide-comparator',
    title: 'Redstone Comparator',
    category: 'Redstone',
    parentCategoryId: 'engineer',
    topicId: 9,
    summary: 'A component for comparing or subtracting redstone signals.',
    details: 'Three-torch redstone logic gate with two modes: Compare Mode (passes signal if rear >= side) and Subtraction Mode (outputs rear minus side). Also measures fullness of chests, hoppers, barrels, and the 1.21 Crafter (0 to 9 signal).',
    version: 'Java 1.5+ (Redstone Update)',
    sourceUrl: 'https://minecraft.wiki/w/Redstone_Comparator',
    toolId: 'redstone'
  }
];

// Recently verified entries with accurate editorial timestamps
export const RECENTLY_UPDATED_ENTRIES = [
  {
    title: 'Java 26.3: Wilderness Bound',
    versionBadge: 'Java 26.3 Stable',
    date: 'September 15, 2026',
    type: 'Official Release',
    summary: 'Official Game Drop adding Dappled Forest, Poplar trees, Abandoned Camps, Straw Beds, Cushions, and 16-color wool/concrete stairs & slabs.',
    sourceUrl: 'https://feedback.minecraft.net/hc/en-us/sections/360001186971-Release-Changelogs',
    topicId: 2
  },
  {
    title: 'Java 26.4 Snapshot Preview (Snap 5)',
    versionBadge: 'Snapshot 26.4 (Testing)',
    date: 'October 2026',
    type: 'Testing Snapshot',
    summary: 'Active testing of subterranean Ice Caves, speleothem Icicles, Ice Crystals, Frostbite mob throwing Ice Balls, Packed Ice Bricks, and Vulkan rendering.',
    sourceUrl: 'https://feedback.minecraft.net/hc/en-us/sections/360002267532',
    topicId: 2
  },
  {
    title: 'Java 26.1: Tiny Takeover',
    versionBadge: 'Java 26.1 Stable',
    date: 'March 2026',
    type: 'Official Release',
    summary: 'Technical backend refactoring, mob despawning fixes, entity scale fine-tuning, and memory optimizations.',
    sourceUrl: 'https://feedback.minecraft.net/hc/en-us/sections/360001186971-Release-Changelogs',
    topicId: 2
  },
  {
    title: 'Java 1.21.3: Bundles of Bravery',
    versionBadge: 'Java 1.21.3 Stable',
    date: 'October 22, 2024',
    type: 'Official Release',
    summary: 'The Bundle item in 16 dye colors, Bedrock Hardcore parity, and comparator inventory reading.',
    sourceUrl: 'https://www.minecraft.net/en-us/article/minecraft-java-edition-1-21-3',
    topicId: 2
  },
  {
    title: 'Snapshot 24w44a: Pale Garden & Creaking',
    versionBadge: 'Snapshot 24w40a–24w46a',
    date: 'October 2024',
    type: 'Testing Snapshot',
    summary: 'The Pale Garden biome, Creaking mob with zero-damage immunity, Creaking Heart mechanics, and Resin Clumps.',
    sourceUrl: 'https://minecraft.wiki/w/Java_Edition_24w44a',
    topicId: 2
  },
  {
    title: '1.21 Crafter & Heavy Mace Mechanics',
    versionBadge: 'Java 1.21 Tricky Trials',
    date: 'June 13, 2024',
    type: 'Official Release',
    summary: 'Automated 3x3 crafting pulses, Density V smash attack calculations, and Trial Chamber Ominous Vaults.',
    sourceUrl: 'https://minecraft.wiki/w/Java_Edition_1.21',
    topicId: 6
  },
  {
    title: 'Structured Item Data Components',
    versionBadge: 'Java 1.20.5 Armored Paws',
    date: 'April 23, 2024',
    type: 'Syntax Migration',
    summary: 'Permanent deprecation of raw NBT strings in favor of bracketed components (e.g. item[minecraft:enchantments={...}]).',
    sourceUrl: 'https://minecraft.wiki/w/Data_component_format',
    topicId: 15
  }
];

export const ENCYCLOPEDIA_TOPICS = [
  // ==========================================
  // TOPIC 1: GAME OVERVIEW, GETTING STARTED & GAME MODES
  // ==========================================
  {
    id: 1,
    slug: 'game-overview',
    title: 'Getting Started, Game Modes & Editions',
    categoryId: 'learn',
    categoryName: 'Learn Minecraft',
    subtopicLabel: 'Getting started · Game modes',
    versionBadge: 'Java Edition Definitive',
    applicableVersions: 'Java 1.0.0 – 1.21.3+',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'compass',
    summary: 'The original voxel sandbox game created by Markus "Notch" Persson in 2009 and developed by Mojang Studios. Covers survival gameplay, game modes (Survival, Creative, Hardcore, Adventure, Spectator), and Java Edition mechanics.',
    keyFacts: [
      'Original release date: November 18, 2011 (Full Release 1.0.0 after Alpha & Beta phases).',
      'Acquired by Microsoft in September 2014 for $2.5 billion USD.',
      'Java Edition exclusives: Hardcore mode (world deletion upon death), Spectator POV, quasi-connectivity redstone, custom combat cooldowns, and open-source modding.',
      'Core progression loop: Mining raw ores → Crafting equipment → Building infrastructure → Dimensional progression (Overworld → Nether → End).'
    ],
    quickReference: [
      { label: 'Original Creator', value: 'Markus "Notch" Persson (2009)' },
      { label: 'Developer', value: 'Mojang Studios (Microsoft)' },
      { label: 'Engine Language', value: 'Java (LWJGL 3, OpenGL / modern GL)' },
      { label: 'Game Modes', value: 'Survival, Creative, Hardcore, Adventure, Spectator' },
      { label: 'Official Source', value: 'minecraft.wiki/w/Minecraft' }
    ],
    sections: [
      {
        id: 'overview',
        title: '1. Game Overview & Editions',
        content: 'Minecraft is a 3D procedural sandbox game focused on breaking and placing voxel blocks. The Java Edition is the original PC version and remains the canonical platform for technical redstone, open-source modding, and competitive speedrunning.',
        callout: {
          type: 'edition',
          title: 'Java Edition Exclusives',
          text: 'Java Edition features custom weapon cooldown meters, sweep attacks, free off-hand item holding, quasi-connectivity redstone wiring, and unconstrained modding loaders.'
        }
      },
      {
        id: 'gamemodes',
        title: '2. The Five Canonical Game Modes',
        content: 'Minecraft provides five distinct game modes tailored for survivalists, builders, map creators, and observers:',
        table: {
          headers: ['Game Mode', 'Command', 'Core Rules', 'Health / Respawn'],
          rows: [
            ['Survival', '/gamemode survival', 'Resource gathering, crafting, hunger, mob combat', '20 HP (10 Hearts) • Respawns at bed/anchor'],
            ['Creative', '/gamemode creative', 'Instant block breaking, infinite inventory, flight', 'Invulnerable to damage (except void /kill)'],
            ['Hardcore', 'Locked in world creation', 'Maximum difficulty locked, single life only', 'World permanently deletes or locks in Spectator'],
            ['Adventure', '/gamemode adventure', 'Blocks breakable only with CanDestroy tools', 'Standard survival damage rules'],
            ['Spectator', '/gamemode spectator', 'Noclip through terrain, invisible, view mob POVs', 'Cannot interact with blocks or inventories']
          ]
        }
      },
      {
        id: 'first-day',
        title: '3. The First Day Survival Blueprint',
        content: 'Upon spawning into a fresh Overworld seed, follow this 4-step survival protocol before nightfall (10 minutes real time):',
        diagram: {
          title: 'First Day Survival Progression',
          type: 'flow',
          steps: [
            'Punch Oak/Birch Tree → Craft 4 Wood Planks → Craft Crafting Table',
            'Craft Wooden Pickaxe → Mine 3 Cobblestone → Upgrade to Stone Pickaxe',
            'Mine Coal & Iron Ore → Craft Torches & Stone Furnace',
            'Shear 3 Sheep for Wool → Craft Bed → Sleep at tick 12542 to skip night'
          ]
        }
      }
    ],
    relatedTopicIds: [2, 11, 12],
    interactiveToolId: null,
    interactiveToolLabel: null
  },

  // ==========================================
  // TOPIC 2: VERSION HISTORY & OFFICIAL RELEASE TIMELINE
  // ==========================================
  {
    id: 2,
    slug: 'version-history',
    title: 'Version History & Official Release Timeline',
    categoryId: 'versions',
    categoryName: 'Versions & News',
    subtopicLabel: 'Version history · Current releases · Snapshots',
    versionBadge: '1.0 to 26.3 + 26.4 Snapshots',
    applicableVersions: 'Java 1.0.0 – 26.3 Stable + 26.4 Snapshots',
    lastVerified: 'October 25, 2026 (Java 26.3 / Snap 5)',
    icon: 'history',
    summary: 'Chronological roadmap of all major Java Edition releases from 1.0.0 through 26.3 Wilderness Bound, and active 26.4 Winter Drop snapshot testing governed by the official Mojang Game Drops cadence.',
    keyFacts: [
      'September 15, 2026: Mojang released Java 26.3 "Wilderness Bound" adding the Dappled Forest, Poplar wood, Abandoned Camps, portable Straw Beds, and sit-able Cushions.',
      'October 2026: Active snapshot testing for Java 26.4 (Winter Drop) introduces subterranean Ice Caves, the Frostbite mob, Icicles, Ice Crystals, and Vulkan rendering.',
      'March 2026: Java 26.1 "Tiny Takeover" introduced technical entity-scaling refinements, leashed mob despawn fixes, and chunk ticking memory optimizations.',
      'September 9, 2024: Mojang officially shifted development from slow annual mega-updates to frequent, focused "Game Drops" throughout each calendar year.'
    ],
    quickReference: [
      { label: 'Latest Stable', value: 'Java 26.3 Wilderness Bound (Sep 15, 2026)' },
      { label: 'Active Snapshots', value: 'Java 26.4 Snapshot Preview (Snap 5)' },
      { label: 'Cadence Model', value: 'Frequent Themed Game Drops (Announced Sep 2024)' },
      { label: 'Official Changelogs', value: 'feedback.minecraft.net/hc/en-us/sections/360001186971' }
    ],
    sections: [
      {
        id: 'release-cadence',
        title: '1. The Game Drops Release Cadence (Official Timeline)',
        content: 'Mojang Studios delivers content through agile "Game Drops" as soon as features achieve quality parity. Confirmed stable drops are deployed to production, while experimental features are tested in public snapshots.',
        callout: {
          type: 'edition',
          title: 'Stable Releases vs. Snapshot Testing',
          text: 'Official releases (e.g. 26.3 Wilderness Bound) are stable for general multiplayer and survival worlds. Snapshots (e.g. 26.4 Snap 5) are active public test builds subject to balance changes and experimental toggles.'
        }
      },
      {
        id: 'canonical-releases',
        title: '2. Major Canonical Java Releases & Game Drops',
        content: 'Verified chronology from official Mojang Studios release notes and evolution timelines:',
        table: {
          headers: ['Version', 'Official Name', 'Release Date', 'Defining Mechanics & Content'],
          rows: [
            ['26.4 (Snapshot 5)', 'Winter Drop [IN TESTING]', 'Active Testing (Oct 2026)', 'Ice Caves subterranean biome, Frostbite mob throwing Ice Balls, Icicles, Ice Crystals, Packed Ice Bricks, Vulkan API'],
            ['26.3', 'Wilderness Bound', 'September 15, 2026', 'Dappled Forest biome, Poplar trees & wood set, Abandoned Camps, Straw Beds (portable sleep), Cushions, Wool/Concrete stairs & slabs'],
            ['26.1', 'Tiny Takeover', 'March 2026', 'Entity scaling fine-tuning, leashed mob persistence fix, memory management for chunk ticking loops'],
            ['1.21.4', 'The Pale Garden & Creaking', 'December 2024', 'Pale Garden biome, Pale Oak wood set, The Creaking mob, Creaking Heart block, Resin Clumps & Bricks, Eyeblossom'],
            ['1.21.2 / 1.21.3', 'Bundles of Bravery', 'October 22, 2024', 'The Bundle (1 Leather + 1 String, 64 items), 16 dye colors, Bedrock Hardcore mode parity'],
            ['1.21', 'Tricky Trials', 'June 13, 2024', 'Trial Chambers, The Crafter (auto-crafting), The Breeze, The Mace, Wind Charges, Ominous Vaults'],
            ['1.20.5 / 1.20.6', 'Armored Paws', 'April 23, 2024', 'Armadillo, Wolf Armor (16 dyes), 8 Wolf variants, structured Data Components item format'],
            ['1.20', 'Trails & Tales', 'June 7, 2023', 'Archaeology & Brush, Sniffer, Cherry Grove biome, 16 Armor Trims, Camels, Chiseled Bookshelves'],
            ['1.19', 'The Wild Update', 'June 7, 2022', 'Deep Dark, The Warden, Sculk Shriekers, Ancient Cities, Mangrove Swamp, Frogs, Allay'],
            ['1.18', 'Caves & Cliffs: Part II', 'November 30, 2021', 'World height -64 to 320, 3D cave biomes, Lush Caves, Dripstone Caves, new terrain noise'],
            ['1.16', 'The Nether Update', 'June 23, 2020', 'Netherite tier, 5 Nether Biomes (Crimson, Warped, Soul Sand, Basalt), Piglins, Bastions'],
            ['1.14', 'Village & Pillage', 'April 23, 2019', 'Villager workstation overhaul, Raids, Crossbows, Pillager Outposts, Blast Furnace'],
            ['1.9', 'The Combat Update', 'February 29, 2016', 'Attack cooldown timers, Shields, Elytra, End Cities, Shulkers, Lingering Potions'],
            ['1.0.0', 'Full Release', 'November 18, 2011', 'The End dimension, Ender Dragon, Enchanting Table, Brewing Stand, Hardcore Mode']
          ]
        }
      }
    ],
    relatedTopicIds: [1, 6, 19],
    interactiveToolId: 'drops',
    interactiveToolLabel: 'View Interactive Game Drops Timeline'
  },

  // ==========================================
  // TOPIC 3: DIMENSIONS & BIOMES
  // ==========================================
  {
    id: 3,
    slug: 'dimensions-biomes',
    title: 'Dimensions & World Generation (Caves, Cliffs & 26.3 Wilderness)',
    categoryId: 'world',
    categoryName: 'Explore the World',
    subtopicLabel: 'Biomes · Dimensions',
    versionBadge: '70+ Biomes / 3 Dimensions',
    applicableVersions: 'Java 1.18 – 26.3+ (Wilderness Bound)',
    lastVerified: 'October 2026 (Java 26.3 Wilderness Bound & 26.4 Snapshot)',
    icon: 'map',
    summary: 'Detailed mechanics of the three dimensions: The Overworld (Y=-64 to Y=320), The Nether (8:1 spatial compression ratio), and The End outer islands, plus latest additions like the Dappled Forest (26.3) and experimental Ice Caves (26.4).',
    keyFacts: [
      '1.18 Caves & Cliffs overhaul increased Overworld build height by 50% (-64 bedrock floor to +320 sky ceiling).',
      'Nether coordinates compress space by 8:1 (1 block traveled in the Nether equals 8 blocks in the Overworld).',
      'Dappled Forest (26.3 Wilderness Bound): Crisp autumn biome featuring tall Poplar trees, fallen leaves, and Abandoned Camps with explorer maps.',
      'Cave noise biomes: Lush Caves, Dripstone Caves, Deep Dark (Y=-52), and experimental Ice Caves (26.4 Snapshot).'
    ],
    quickReference: [
      { label: 'Overworld Height', value: 'Y=-64 to Y=320 (384 total vertical blocks)' },
      { label: 'Nether Compression', value: '8:1 horizontal travel multiplier' },
      { label: 'Latest Stable Biome', value: 'Dappled Forest (26.3 Wilderness Bound)' },
      { label: 'Official Source', value: 'minecraft.net/en-us/updates/minecraft-updates-timeline-and-evolution' }
    ],
    sections: [
      {
        id: 'dimensions',
        title: '1. The Three Dimensional Realms',
        content: 'Minecraft exists across three interconnected dimensions accessible via dimensional portals:',
        table: {
          headers: ['Dimension', 'Height Limits', 'Hazards & Rules', 'Primary Resources'],
          rows: [
            ['The Overworld', 'Y=-64 to Y=320 (384 blocks)', 'Mob spawns at light 0; day/night cycle (20 mins)', 'All wood types, ores, food, villages, trial chambers, dappled forests'],
            ['The Nether', 'Y=0 to Y=128 (Bedrock roof)', 'Water evaporates, beds explode, 8:1 coordinate compression', 'Netherite, Blaze Rods, Nether Wart, Quartz, Ancient Debris'],
            ['The End', 'Y=0 to Y=256 (Void below Y=0)', 'End void kills instantly, Ender Dragon boss, Enderman agro', 'Elytra wings, Shulker Shells, Chorus Fruit, Dragon Egg']
          ]
        }
      },
      {
        id: 'nether-math',
        title: '2. Nether Portal Fast Travel Mathematics',
        content: 'Horizontal coordinates in the Nether translate directly into Overworld coordinates multiplied by 8. This is the cornerstone of rapid inter-base transit systems:',
        diagram: {
          title: '8:1 Coordinate Ratio Formula',
          type: 'code',
          steps: [
            'Overworld Coordinates: (X_overworld, Y, Z_overworld)',
            'Nether Destination:    (X_nether = X_overworld / 8, Y_nether = Y, Z_nether = Z_overworld / 8)',
            'Example: Overworld Stronghold at (800, 40, -1600) links to Nether Portal at (100, 40, -200).'
          ]
        },
        callout: {
          type: 'tip',
          title: 'Portal Linking Rule',
          text: 'To prevent portals from accidentally linking to a nearby destination, always calculate exact coordinates and build both portals manually, matching their X and Z values within 1 block.'
        }
      },
      {
        id: 'recent-biomes',
        title: '3. Recent Biome Additions & Snapshots',
        content: 'Officially verified releases and snapshot testing environments introduce new environmental regions:',
        table: {
          headers: ['Biome Name', 'Release Status', 'Elevation & Environment', 'Signature Blocks & Fauna'],
          rows: [
            ['Dappled Forest', 'Java 26.3 (Stable Release)', 'Overworld Temperate Surface', 'Poplar Wood set, fallen autumn leaf piles, abandoned camps, peaceful foxes & rabbits'],
            ['Ice Caves', 'Java 26.4 (Active Snapshot)', 'Overworld Deep Underground', 'Stalactite icicles, slippery packed ice floors, Ice Crystals, Frostbite mob hazards'],
            ['Pale Garden', 'Java 1.21.3 Snapshot Preview', 'Overworld Desaturated Forest', 'Pale Oak trees, Pale Moss carpets, The Creaking (Creaking Heart puppet)']
          ]
        }
      }
    ],
    relatedTopicIds: [4, 10, 18],
    interactiveToolId: 'biomes',
    interactiveToolLabel: 'Open Biome Explorer & Cartography'
  },

  // ==========================================
  // TOPIC 4: ALL MOBS & CREATURE BESTIARY
  // ==========================================
  {
    id: 4,
    slug: 'all-mobs',
    title: 'All Mobs & Entity Bestiary (Wiki 1–10)',
    categoryId: 'world',
    categoryName: 'Explore the World',
    subtopicLabel: 'Mobs · Spawning & Despawning',
    versionBadge: 'Over 80 Vanilla Mobs',
    applicableVersions: 'Java 1.0.0 – 1.21.3 + 24w40a+',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'shield-alert',
    summary: 'Comprehensive ecology of Minecraft entities: spawning spheres (24/32/128 blocks), despawning timers, mob caps (70 hostiles), health ratings, knockback resistance, and boss strategies.',
    keyFacts: [
      'Hostile mobs never spawn within 24 blocks of the player and despawn instantly beyond 128 blocks.',
      'Between 32 and 128 blocks, hostile mobs have a 1 in 800 chance per tick (approx. 1 in 40s) of despawning if not nametagged.',
      'The Creaking (24w40a+) is immune to all direct damage; striking it produces Resin and reveals its tethered Creaking Heart.',
      'The Warden possesses 500 HP (250 hearts) and executes a 10-heart sonic boom attack piercing armor and shields.'
    ],
    quickReference: [
      { label: 'Hostile Spawn Sphere', value: '24 to 128 blocks radial from player' },
      { label: 'Java Hostile Mob Cap', value: '70 mobs per singleplayer dimension' },
      { label: 'Strongest Mob', value: 'The Warden (500 HP / 10♥ Sonic Boom)' },
      { label: 'Official Source', value: 'minecraft.wiki/w/Mob' }
    ],
    sections: [
      {
        id: 'spawning-spheres',
        title: '1. Spawning Spheres & Mob Caps',
        content: 'In Java Edition, mob spawning occurs in concentric spherical shells centered directly on the player hitbox:',
        table: {
          headers: ['Radial Distance', 'Spawning Behavior', 'Despawn Rule'],
          rows: [
            ['0 to 24 blocks', 'No hostile mobs can spawn (safety buffer zone)', 'Mobs retain persistence'],
            ['24 to 32 blocks', 'Hostile mobs spawn continuously at block light level 0', 'Mobs actively wander and track player pathing'],
            ['32 to 128 blocks', 'Hostile mobs spawn, but freeze motion after 20 seconds', '1 in 800 chance per game tick (approx. 1 in 40s) of despawning'],
            ['> 128 blocks', 'Instant despawn boundary', 'Hostile mobs despawn immediately on the next game tick']
          ]
        },
        callout: {
          type: 'edition',
          title: 'Java Edition Mob Cap Formula',
          text: 'Hostile Mob Cap = 70 × Chunks / 289. In singleplayer with standard render distance, exactly 70 hostile entities can exist simultaneously before spawning halts.'
        }
      },
      {
        id: 'apex-entities',
        title: '2. Apex Hostiles & Boss Entities',
        content: 'Key statistics for high-threat entities across vanilla Java Edition:',
        table: {
          headers: ['Entity', 'Health (HP)', 'Attack Damage', 'Special Mechanics & Defenses'],
          rows: [
            ['The Warden', '500 HP (250♥)', '30 melee (Easy: 16, Hard: 45)', 'Blind (sniffs vibrations); 10♥ Sonic Boom penetrates shields and blocks; immune to lava/knockback'],
            ['The Creaking (24w40a+)', 'Tethered', '3 (1.5♥)', 'Immune to all weapon damage; freezes when looked at; destroyed by breaking Creaking Heart'],
            ['The Breeze (1.21)', '30 HP (15♥)', 'Wind Charge burst', 'Reflects all arrows and projectiles; leaps across Trial Chambers to activate traps'],
            ['Ender Dragon', '200 HP (100♥)', '10 melee + Dragon Breath', 'Healed by End Crystals; perched phase vulnerable to bed explosion one-cycle methods'],
            ['The Wither', '300 HP (150♥)', 'Wither Skulls (Wither II)', 'Shield at 50% HP deflects all arrows; explodes upon spawn; drops Nether Star']
          ]
        }
      }
    ],
    relatedTopicIds: [3, 11, 10],
    interactiveToolId: 'mobs',
    interactiveToolLabel: 'Launch Creature Bestiary & Combat Simulator'
  },

  // ==========================================
  // TOPIC 5: BLOCKS, ITEMS & HARVEST MECHANICS
  // ==========================================
  {
    id: 5,
    slug: 'blocks-items',
    title: 'Blocks, Items & Material Properties',
    categoryId: 'engineer',
    categoryName: 'Build & Engineer',
    subtopicLabel: 'Material properties · Data components',
    versionBadge: '1,750+ Vanilla Items',
    applicableVersions: 'Java 1.20.5+ Data Components',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'box',
    summary: 'Deep dive into block hardness, blast resistance, light emission (0–15), tool tiers (Wood → Netherite), Silk Touch harvesting, and the 1.20.5 Data Components architecture.',
    keyFacts: [
      'Hardness determines base mining time; blast resistance determines resilience against TNT, Creepers, and Ghast fireballs.',
      'Bedrock, End Portal Frames, and Barriers have negative hardness (-1.0), rendering them completely unbreakable in Survival.',
      'Obsidian has a hardness of 50 and blast resistance of 1,200, requiring a Diamond or Netherite pickaxe to drop.',
      'Java 1.20.5 completely replaced raw item NBT tags with type-safe structured Data Components.'
    ],
    quickReference: [
      { label: 'Total Unique Items', value: '1,750+ official registered items' },
      { label: 'Unbreakable Blocks', value: 'Bedrock, End Portal Frame, Barrier' },
      { label: 'Max Light Level', value: '15 (Torches=14, Sea Lanterns/Glowstone=15)' },
      { label: 'Official Source', value: 'minecraft.wiki/w/Block' }
    ],
    sections: [
      {
        id: 'hardness-blast',
        title: '1. Hardness & Blast Resistance Mechanics',
        content: 'Every block in Minecraft possesses two fundamental physical values: Hardness (resistance to tool breaking) and Blast Resistance (resistance to explosion forces):',
        table: {
          headers: ['Block', 'Hardness', 'Blast Resistance', 'Required Tool & Notes'],
          rows: [
            ['Bedrock / Barrier', '-1.0', '3,600,000', 'Unbreakable in Survival; immune to all explosions'],
            ['Obsidian', '50.0', '1,200', 'Diamond or Netherite Pickaxe (9.4s without Efficiency)'],
            ['Ancient Debris', '30.0', '1,200', 'Diamond/Netherite Pickaxe; blast-proof against TNT/beds'],
            ['Deepslate', '3.0', '6.0', 'Twice as hard to mine as regular Stone (1.5)'],
            ['Stone', '1.5', '6.0', 'Any Pickaxe (Wood or better)'],
            ['Glass', '0.3', '0.3', 'Drops nothing without Silk Touch enchantment']
          ]
        }
      },
      {
        id: 'data-components',
        title: '2. The 1.20.5 Data Components Format',
        content: 'Starting in Java 1.20.5, raw arbitrary NBT strings on items were replaced with structured, type-safe Data Components. This eliminates ambiguous syntax and improves server performance:',
        callout: {
          type: 'warning',
          title: 'Syntax Migration Alert',
          text: 'Old /give syntax with {Enchantments:[{id:"...",lvl:...}]} is invalid in 1.20.5+. Use the modern bracket notation: [minecraft:enchantments={levels:{"minecraft:sharpness":5}}].'
        }
      }
    ],
    relatedTopicIds: [6, 7, 15],
    interactiveToolId: 'icons',
    interactiveToolLabel: 'Explore 1,750+ Asset SVG Vault'
  },

  // ==========================================
  // TOPIC 6: CRAFTING SYSTEM & THE CRAFTER
  // ==========================================
  {
    id: 6,
    slug: 'crafting-crafter',
    title: 'Automatic Farms & The 1.21 Crafter',
    categoryId: 'engineer',
    categoryName: 'Build & Engineer',
    subtopicLabel: 'Automatic farms · Redstone automation',
    versionBadge: '400+ Recipes / 1.21 Crafter',
    applicableVersions: 'Java 1.21+ (Tricky Trials)',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'hammer',
    summary: 'The 2x2 inventory grid, 3x3 Crafting Table, automated iron farms using villager panic, and the revolutionary 1.21 Crafter enabling fully automated assembly lines.',
    keyFacts: [
      'The Crafter (Java 1.21) executes automated crafting when triggered by a redstone pulse with a 4-tick cooldown.',
      'Crafter slots can be individually disabled by clicking them in the GUI, locking specific recipes in auto-farms.',
      'A Redstone Comparator reading a Crafter outputs a signal strength equal to the count of filled or disabled slots (0 to 9).',
      'Iron Farms use 3 panicked villagers and a zombie to continuously spawn Iron Golems into lava kill chambers.'
    ],
    quickReference: [
      { label: 'Crafter Pulse Delay', value: '4 redstone ticks (8 game ticks)' },
      { label: 'Comparator Output', value: '1 to 9 based on occupied/disabled slots' },
      { label: 'Mace Recipe', value: '1 Heavy Core + 1 Breeze Rod' },
      { label: 'Official Source', value: 'minecraft.wiki/w/Crafter' }
    ],
    sections: [
      {
        id: 'crafter-automation',
        title: '1. The 1.21 Crafter Architecture',
        content: 'Crafted from 5 Iron Ingots, 1 Crafting Table, 2 Redstone Dust, and 1 Dropper. When powered by a redstone pulse, the Crafter attempts to craft the item matching its 3x3 matrix and ejects it into containers or the world.',
        table: {
          headers: ['Feature', 'Specification', 'Engineering Rule'],
          rows: [
            ['Cooldown', '4 redstone ticks (8 game ticks)', 'Fastest auto-craft rate is 2.5 operations per second'],
            ['Slot Disabling', 'Click slot in GUI to disable (red X)', 'Locks recipes to prevent overflow items from misaligning patterns'],
            ['Comparator Output', 'Signal 0 to 9', 'Signal strength equals total number of occupied or disabled slots']
          ]
        }
      },
      {
        id: 'iron-farm-mechanics',
        title: '2. Vanilla Iron Farm Factory Architecture',
        content: 'Villagers spawn Iron Golems when experiencing panic. An automated iron farm arranges 3 villagers in line-of-sight of a captive Zombie:',
        diagram: {
          title: 'Iron Farm Layout Flow',
          type: 'flow',
          steps: [
            '3 Villagers with claimed beds see Zombie → Trigger PANIC state',
            'Villagers attempt Iron Golem spawn in 16×16×16 area centered on beds',
            'Water flow pushes Golem into 3×3 killing chute with Lava suspended on signs',
            'Iron Ingots & Poppies drop into Hoppers feeding Storage Chests'
          ]
        }
      }
    ],
    relatedTopicIds: [5, 9, 11],
    interactiveToolId: 'crafting',
    interactiveToolLabel: 'Launch Crafting Table & 1.21 Crafter Explorer'
  },

  // ==========================================
  // TOPIC 7: ENCHANTMENTS & ANVIL MECHANICS
  // ==========================================
  {
    id: 7,
    slug: 'enchantments-anvil',
    title: 'Enchantment Laboratory & Anvil Binary Trees',
    categoryId: 'engineer',
    categoryName: 'Build & Engineer',
    subtopicLabel: 'Enchantments · Anvil optimization',
    versionBadge: '42 Enchantments / 17 God Loadouts',
    applicableVersions: 'Java 1.0.0 – 1.21.3+ (42 Canonical)',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'sparkles',
    summary: 'The comprehensive enchantment codex, 17 definitive God Equipment blueprints, the Anvil Binary Merge Tree tutorial to bypass the 40-level "Too Expensive!" cap, and material enchantability ratings.',
    keyFacts: [
      'Anvil Prior Work Penalty formula: Penalty(n) = 2ⁿ - 1. Combining books linearly hits the 40-level cap at book 6.',
      'Binary Merge Tree combines books pairwise like a tournament bracket, keeping depth at 3 and cost at 17–23 levels.',
      'Environmental Protection Factor (EPF) is hard-capped at 20 (80% maximum damage reduction). Protection IV grants 4 EPF.',
      'Gold possesses the highest enchantability in Minecraft (Armor: 25, Tools: 22), rolling top tiers with fewer shelves.',
      '1.21 Mace Enchantments: Density V (smash damage), Breach IV (armor piercing), and Wind Burst III (bounce).'
    ],
    quickReference: [
      { label: 'Total Enchantments', value: '42 Vanilla Enchantments (Java Edition)' },
      { label: 'EPF Hard Cap', value: '20 EPF = 80% maximum damage reduction' },
      { label: 'Anvil Penalty Limit', value: '39 levels (40+ = "Too Expensive!")' },
      { label: 'Official Source', value: 'minecraft.wiki/w/Enchanting' }
    ],
    sections: [
      {
        id: 'anvil-math',
        title: '1. The Anvil Prior Work Penalty & Binary Merge Tree',
        content: 'Every time an item or book is repaired or combined in an anvil, its Prior Work Penalty increases exponentially according to the formula: Penalty(n) = 2ⁿ - 1.',
        callout: {
          type: 'warning',
          title: 'The 40-Level Hard Cap',
          text: 'If an anvil operation requires 40 levels or more in Survival mode, the anvil refuses to work and displays "Too Expensive!". Linear book application hits this limit after 5–6 books.'
        },
        diagram: {
          title: 'Binary Merge Tournament Bracket (Cost: 17–23 Levels)',
          type: 'tree',
          steps: [
            'Tier 0: (Book 1 + Book 2) → Book A | (Book 3 + Book 4) → Book B | (Book 5 + Book 6) → Book C | (Book 7 + Book 8) → Book D',
            'Tier 1: (Book A + Book B) → Combo X | (Book C + Book D) → Combo Y',
            'Tier 2: (Combo X + Combo Y) → Master Book Z (Penalty = 7 levels)',
            'Tier 3: Apply Master Book Z to Netherite Gear (Total Cost < 25 levels, zero risk of Too Expensive)'
          ]
        }
      },
      {
        id: 'god-armor',
        title: '2. The Definitive God Armor Configuration',
        content: 'Maximum damage reduction loadout in Java Edition (respecting EPF 20 cap):',
        table: {
          headers: ['Gear Piece', 'Optimal Enchantments', 'Protection Type & Role'],
          rows: [
            ['Netherite Helmet', 'Protection IV, Unbreaking III, Mending, Respiration III, Aqua Affinity', '4 EPF • Infinite underwater breathing & vision'],
            ['Netherite Chestplate', 'Protection IV, Unbreaking III, Mending', '4 EPF • Maximum direct damage mitigation'],
            ['Netherite Leggings', 'Protection IV, Unbreaking III, Mending, Swift Sneak III', '4 EPF • 100% normal walking speed while sneaking'],
            ['Netherite Boots', 'Protection IV, Feather Falling IV, Depth Strider III, Unbreaking III, Mending, Soul Speed III', '4 EPF (+12 EPF against fall damage) • Water speed & zero fall shock']
          ]
        }
      }
    ],
    relatedTopicIds: [5, 6, 8, 11],
    interactiveToolId: 'enchanting',
    interactiveToolLabel: 'Open Enchantment Laboratory & Best Guide'
  },

  // ==========================================
  // TOPIC 8: POTIONS & BREWING STAND
  // ==========================================
  {
    id: 8,
    slug: 'potions-brewing',
    title: 'Potions, Alchemy & Brewing Stand',
    categoryId: 'engineer',
    categoryName: 'Build & Engineer',
    subtopicLabel: 'Brewing · Positive & Negative effects',
    versionBadge: '16 Effect Potions',
    applicableVersions: 'Java 1.0.0 – 1.21.3+',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'flask-conical',
    summary: 'The 3-bottle Brewing Stand, Blaze Powder fuel management (20 charges), Awkward Potion baseline, positive and negative effect branches, and 1.21 Ominous/Infested concoctions.',
    keyFacts: [
      '1 Blaze Powder supplies exactly 20 brewing operations in the fuel gauge.',
      'Awkward Potion (Water Bottle + Nether Wart) serves as the universal precursor for almost all primary status potions.',
      'Redstone Dust extends effect duration; Glowstone Dust amplifies effect to Tier II (mutually exclusive with duration).',
      'Gunpowder converts drinkable potions into Splash Potions; Dragon\'s Breath converts Splash Potions into Lingering Potions.',
      '1.21 Trial Potions: Potion of Oozing (Slimes on death), Weaving (Cobwebs), Wind Charged (Wind burst), and Infested (Silverfish).'
    ],
    quickReference: [
      { label: 'Blaze Powder Fuel', value: '20 charges per powder item' },
      { label: 'Base Potion', value: 'Awkward Potion (Nether Wart)' },
      { label: 'Brewing Duration', value: '20 seconds (400 game ticks) per ingredient' },
      { label: 'Official Source', value: 'minecraft.wiki/w/Brewing' }
    ],
    sections: [
      {
        id: 'brewing-rules',
        title: '1. Brewing Fuel & Baseline Precursors',
        content: 'A Brewing Stand holds up to 3 glass bottles simultaneously. 1 Blaze Powder powers 20 separate brews. Always craft in batches of 3 to maximize ingredient efficiency.',
        table: {
          headers: ['Precursor Potion', 'Base Ingredient', 'Resulting Effect Branch'],
          rows: [
            ['Awkward Potion', 'Water Bottle + Nether Wart', 'Precursor for Healing, Strength, Swiftness, Fire Res, Leaping, Poison'],
            ['Mundane Potion', 'Water Bottle + Redstone / Sugar', 'No primary branch (failed brew)'],
            ['Thick Potion', 'Water Bottle + Glowstone Dust', 'No primary branch (failed brew)']
          ]
        }
      },
      {
        id: 'modifiers',
        title: '2. Potion Modifiers & Corrupting Effects',
        content: 'Enhance or invert potions using catalytic modifiers:',
        table: {
          headers: ['Modifier', 'Effect on Potion', 'Compatibility Rule'],
          rows: [
            ['Redstone Dust', 'Extends duration (e.g. 3:00 → 8:00)', 'Mutually exclusive with Glowstone Dust'],
            ['Glowstone Dust', 'Amplifies to Tier II (e.g. Strength I → Strength II)', 'Mutually exclusive with Redstone Dust'],
            ['Fermented Spider Eye', 'Corrupts effect (Healing → Harming, Swiftness → Slowness)', 'Can be applied to base or modified potions'],
            ['Gunpowder', 'Converts drinkable bottle to Splash Potion', 'Can be thrown at allies or mobs'],
            ['Dragon\'s Breath', 'Converts Splash Potion to Lingering Potion', 'Creates residual persistent status cloud']
          ]
        }
      }
    ],
    relatedTopicIds: [7, 11, 4],
    interactiveToolId: 'brewing',
    interactiveToolLabel: 'Open Potion Brewer & Alchemical Stand'
  },

  // ==========================================
  // TOPIC 9: REDSTONE ENGINEERING & LOGIC
  // ==========================================
  {
    id: 9,
    slug: 'redstone-logic',
    title: 'Redstone Engineering & Logic Systems',
    categoryId: 'engineer',
    categoryName: 'Build & Engineer',
    subtopicLabel: 'Redstone · Quasi-connectivity · Logic gates',
    versionBadge: 'Quasi-Connectivity & 20 TPS',
    applicableVersions: 'Java Edition Definitive Engine',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'cpu',
    summary: 'The electrical wiring system of Minecraft: 0–15 signal decay, repeaters, comparators, quasi-connectivity (Java exclusive), observer clocks, hopper locking, and piston flying machines.',
    keyFacts: [
      'Redstone wire carries signals from strength 15 down to 0, decreasing by 1 level per block traveled.',
      'Quasi-connectivity (Java Exclusive): Pistons, Droppers, and Dispensers can be powered by blocks diagonally or two blocks above them.',
      'Redstone Comparator: Outputs signal strength of containers based on fullness; supports Comparison and Subtraction modes.',
      'Game ticks run at 20 TPS (50ms per tick); 1 redstone tick equals 2 game ticks (100ms).'
    ],
    quickReference: [
      { label: 'Signal Range', value: '15 blocks before requiring Repeater' },
      { label: 'Tick Speed', value: '20 game ticks / 10 redstone ticks per second' },
      { label: 'Quasi-Connectivity', value: 'Java Edition exclusive piston mechanic' },
      { label: 'Official Source', value: 'minecraft.wiki/w/Redstone' }
    ],
    sections: [
      {
        id: 'quasi-connectivity',
        title: '1. Quasi-Connectivity (Java Exclusive)',
        content: 'Quasi-connectivity is a signature Java Edition mechanic where Pistons, Droppers, and Dispensers receive electrical power from blocks that would power a door placed in their position (e.g., 2 blocks above or diagonally above).',
        callout: {
          type: 'edition',
          title: 'BUD (Block Update Detector) Behavior',
          text: 'When a piston receives quasi-power, it does NOT immediately extend until it receives a block update from an adjacent tile. This allows constructing ultra-compact flying machines and trapdoors.'
        }
      },
      {
        id: 'logic-gates',
        title: '2. Standard Redstone Logic Gates',
        content: 'Fundamental building blocks for computational redstone circuits:',
        table: {
          headers: ['Logic Gate', 'Redstone Implementation', 'Truth Table Behavior'],
          rows: [
            ['NOT (Inverter)', 'Redstone torch attached to powered block', 'Output is ON when Input is OFF; Output OFF when Input ON'],
            ['AND Gate', 'Two torches feeding a wire connected to an inverter torch', 'Output turns ON ONLY when both Input A AND Input B are active'],
            ['OR Gate', 'Two parallel redstone dust lines merging into one line', 'Output turns ON when Input A OR Input B (or both) are active'],
            ['T Flip-Flop', 'Dropper-hopper cycle or sticky piston 1-tick block drop', 'Converts a momentary button pulse into a permanent toggle switch'],
            ['RS NOR Latch', 'Two cross-coupled NOT torches', 'Memory cell: Set (S) turns output ON, Reset (R) turns output OFF']
          ]
        }
      },
      {
        id: 'comparator-math',
        title: '3. Redstone Comparator Mathematics',
        content: 'The Comparator operates in two modes toggled by right-clicking the front torch:',
        table: {
          headers: ['Mode', 'Torch State', 'Output Formula'],
          rows: [
            ['Comparison Mode', 'Front torch unlit (down)', 'If Rear Signal ≥ Side Signal → Output = Rear; else Output = 0'],
            ['Subtraction Mode', 'Front torch lit (up)', 'Output = max(0, Rear Signal - Side Signal)'],
            ['Container Reading', 'Measures fullness', 'Signal = floor(1 + (Items in Container / Max Container Capacity) × 14)']
          ]
        }
      }
    ],
    relatedTopicIds: [6, 15, 16],
    interactiveToolId: 'redstone',
    interactiveToolLabel: 'Launch Redstone Engineering Lab'
  },

  // ==========================================
  // TOPIC 10: GENERATED STRUCTURES
  // ==========================================
  {
    id: 10,
    slug: 'structures-dungeons',
    title: 'Generated Structures & Dungeons (Chambers to Camps)',
    categoryId: 'world',
    categoryName: 'Explore the World',
    subtopicLabel: 'Structures · Dungeons',
    versionBadge: 'Trial Chambers & Abandoned Camps',
    applicableVersions: 'Java 1.0.0 – 26.3+ (Wilderness Bound)',
    lastVerified: 'October 2026 (Official Changelogs)',
    icon: 'castle',
    summary: 'Procedurally generated architectural landmarks across all three dimensions: Trial Chambers, Ancient Cities, Abandoned Camps, Strongholds, Ocean Monuments, Nether Fortresses, and End Cities.',
    keyFacts: [
      'Abandoned Camps (26.3 Wilderness Bound): Surface campsites with straw beds, unlit campfires, and chests containing Explorer Maps to rare biomes and structures.',
      'Trial Chambers (1.21): Deepslate dungeons generating between Y=-20 and Y=-40 containing Trial Spawners, Ominous Vaults, and Heavy Cores.',
      'Ancient Cities (1.19): Colossal palace ruins generating at Y=-52 in the Deep Dark, containing Swift Sneak III and Silence armor trims.',
      'Strongholds: Exactly 128 strongholds generate per Java world in concentric rings outwards from coordinate (0, 0).'
    ],
    quickReference: [
      { label: '26.3 Structure', value: 'Abandoned Camps (Explorer Maps & Straw Beds)' },
      { label: '1.21 Structure', value: 'Trial Chambers (Breeze, Vaults, Mace Core)' },
      { label: 'Stronghold Count', value: '128 per world in concentric rings' },
      { label: 'Official Source', value: 'minecraft.net/en-us/updates/minecraft-updates-timeline-and-evolution' }
    ],
    sections: [
      {
        id: 'structures-list',
        title: '1. Key Generated Structures Directory',
        content: 'Major dungeons and exploration sites across all dimensions providing progression-critical items:',
        table: {
          headers: ['Structure', 'Dimension & Elevation', 'Exclusive Loot & Key Dangers'],
          rows: [
            ['Abandoned Camps (26.3)', 'Overworld Dappled Forests & Plains', 'Explorer Maps, Poplar saplings, Straw Beds, Wool Cushions • Wildlife'],
            ['Trial Chambers (1.21)', 'Overworld (Y=-20 to Y=-40)', 'Heavy Core, Breeze Rods, Flow/Bolt Armor Trims, Ominous Vaults'],
            ['Ancient City (1.19)', 'Overworld Deep Dark (Y=-52)', 'Swift Sneak III books, Silence Armor Trim, Echo Shards • The Warden'],
            ['Stronghold', 'Overworld (128 concentric rings)', 'End Portal Frame, Library bookshelves • Silverfish spawners'],
            ['Nether Fortress', 'Nether (Nether Wastes/Lava lakes)', 'Blaze Rods, Nether Wart, Wither Skeleton Skulls • Blazes'],
            ['Bastion Remnant', 'Nether (4 variants)', 'Netherite Upgrade Smithing Template, Pigstep Disc • Piglin Brutes'],
            ['End City', 'The End (Outer islands Y>50)', 'Elytra wings, Shulker Shells, Diamond god gear • Shulker levitation']
          ]
        }
      }
    ],
    relatedTopicIds: [3, 4, 11],
    interactiveToolId: 'structures',
    interactiveToolLabel: 'Open World Structures & Trial Chambers Explorer'
  },

  // ==========================================
  // TOPIC 11: COMBAT, WEAPONS & PROGRESSION
  // ==========================================
  {
    id: 11,
    slug: 'combat-weapons',
    title: 'Progression, Combat & Weapons Systems',
    categoryId: 'learn',
    categoryName: 'Learn Minecraft',
    subtopicLabel: 'Progression · Combat mechanics',
    versionBadge: 'Java Cooldown & 1.21 Mace',
    applicableVersions: 'Java 1.9+ Combat Engine',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'sword',
    summary: 'The 1.9+ weapon cooldown mechanics, sweep attacks, shield blocking, weapon damage tiers (Wood to Netherite), ranged combat, and 1.21 Heavy Mace smash physics.',
    keyFacts: [
      'Java Edition uses attack recovery cooldowns; striking before the cooldown meter fills reduces damage to as low as 20%.',
      'Shields block 100% of incoming frontal melee and projectile damage; sprinting axes disable shields for 5 seconds.',
      'The Mace (1.21) converts vertical fall height into lethal kinetic damage (+2.5 HP/block with Density V); landing a hit negates fall damage.',
      'Netherite armor grants +12 Toughness and 40% Knockback Resistance across the full set, preventing lava combustion.'
    ],
    quickReference: [
      { label: 'Attack Cooldown (Sword)', value: '0.625s (1.6 attacks/sec for 100% damage)' },
      { label: 'Shield Disable', value: '5 seconds when struck by sprint-axe' },
      { label: 'Armor Defense Max', value: '20 armor points (80% base mitigation)' },
      { label: 'Official Source', value: 'minecraft.wiki/w/Damage' }
    ],
    sections: [
      {
        id: 'cooldown-mechanics',
        title: '1. Java Edition Attack Recovery Cooldowns',
        content: 'Attacking in Java Edition triggers an attack cooldown indicated by the crosshair meter. Striking before 100% charge deals reduced damage and disables weapon sweep attacks:',
        table: {
          headers: ['Weapon Type', 'Attack Speed', 'Full Recharge Delay', 'Base Damage (Netherite)'],
          rows: [
            ['Sword', '1.6 attacks/sec', '0.625 seconds', '8 HP (4 Hearts) + Sweep AOE'],
            ['Axe', '1.0 attacks/sec', '1.000 seconds', '10 HP (5 Hearts) + Shield Disable'],
            ['Trident', '1.1 attacks/sec', '0.909 seconds', '9 HP (4.5 Hearts) + Impaling / Loyalty'],
            ['The Mace (1.21)', '0.6 attacks/sec', '1.667 seconds', '7 HP + Smash Fall Damage Scaling']
          ]
        }
      },
      {
        id: 'mace-smash',
        title: '2. The 1.21 Mace Smash Physics',
        content: 'Crafted from 1 Heavy Core and 1 Breeze Rod. Falling from a height before striking an entity adds massive bonus damage and completely cancels all accumulated fall damage upon a hit:',
        diagram: {
          title: 'Mace Damage Calculation Formula',
          type: 'code',
          steps: [
            'Base Smash Bonus: +3 HP per block fallen (first 3 blocks) + +2 HP/block (next 5 blocks) + +1 HP/block beyond.',
            'Density V Enchantment: Adds an extra +2.5 HP per block fallen at all heights.',
            'Successful Hit: Target takes fatal kinetic burst; player resets fall speed to 0 with zero impact damage.'
          ]
        }
      }
    ],
    relatedTopicIds: [7, 4, 12],
    interactiveToolId: 'smithing',
    interactiveToolLabel: 'Launch Smithing Table & Armor Trims Studio'
  },

  // ==========================================
  // TOPIC 12: FARMING, FOOD & HUNGER
  // ==========================================
  {
    id: 12,
    slug: 'farming-food',
    title: 'Survival Guides: Farming, Food, Camps & Straw Beds',
    categoryId: 'learn',
    categoryName: 'Learn Minecraft',
    subtopicLabel: 'Survival guides · Camping & Hunger dynamics',
    versionBadge: 'Saturation & Straw Beds',
    applicableVersions: 'Java 1.0.0 – 26.3+ (Wilderness Bound)',
    lastVerified: 'October 2026 (Java 26.3 Wilderness Bound Release)',
    icon: 'wheat',
    summary: 'Crop hydration within 4 blocks of water, metabolic hunger/saturation rules, portable camp gear, and the new 26.3 Straw Bed night-skip mechanic that preserves spawn locations.',
    keyFacts: [
      'Straw Beds (26.3 Wilderness Bound): Single-use portable bed roll that sleeps through the night without resetting your primary bed respawn anchor.',
      'Water hydrates farmland in a 9x9 square (up to 4 blocks horizontally in all directions on the same or lower Y-level).',
      'Planting alternating crop rows doubles growth rate by avoiding same-crop adjacency penalties.',
      'Hunger operates on two separate meters: visible Food Level (0–20) and hidden Saturation Level (0–20).',
      'Golden Carrots are the competitive food choice: restoring 6 food points and a massive 14.4 saturation points.'
    ],
    quickReference: [
      { label: 'Water Hydration Radius', value: '4 blocks in all horizontal directions' },
      { label: 'Best Food (Saturation)', value: 'Golden Carrot (14.4 Saturation / 6 Food)' },
      { label: 'New Camping Tool', value: 'Straw Bed (Sleeps night without spawn reset)' },
      { label: 'Official Source', value: 'minecraft.net/en-us/updates/minecraft-updates-timeline-and-evolution' }
    ],
    sections: [
      {
        id: 'saturation-system',
        title: '1. Food Level vs. Hidden Saturation',
        content: 'The player metabolism consists of two tiers: the visible Hunger Bar (0 to 20 food points) and the hidden Saturation Bar (0 to 20 saturation points). When taking damage with full hunger and positive saturation, the player heals 1 heart every 0.5 seconds:',
        table: {
          headers: ['Food Item', 'Food Points (Icons)', 'Saturation Restored', 'Competitive Rating'],
          rows: [
            ['Golden Carrot', '6 (3 Drumsticks)', '14.4 Saturation', 'S-Tier (Best food for combat rapid healing)'],
            ['Cooked Porkchop / Steak', '8 (4 Drumsticks)', '12.8 Saturation', 'A-Tier (Excellent early-to-mid game sustenance)'],
            ['Baked Potato', '5 (2.5 Drumsticks)', '6.0 Saturation', 'B-Tier (Easy mass automation via fortune harvesting)'],
            ['Bread', '5 (2.5 Drumsticks)', '6.0 Saturation', 'B-Tier (Standard village starting food)'],
            ['Enchanted Golden Apple', '4 (2 Drumsticks)', '9.6 Saturation + Regen V + Res I', 'God-Tier (Emergency survival artifact)']
          ]
        }
      },
      {
        id: 'farmland-hydration',
        title: '2. 9x9 Hydration Grid & Alternating Rows',
        content: 'A single water source block hydrates farmland up to 4 blocks away horizontally in all cardinal and diagonal directions, hydrating an 81-block (9x9) area:',
        callout: {
          type: 'tip',
          title: 'The Alternating Row Growth Bonus',
          text: 'Crops planted in alternating rows (e.g. Wheat, Carrots, Wheat, Carrots) grow at twice the speed of solid monochromatic crop fields by avoiding adjacency growth penalties.'
        }
      },
      {
        id: 'camping-straw-beds',
        title: '3. Exploration Camping: Straw Beds & Cushions (Java 26.3)',
        content: 'Long exploration journeys away from main bases previously carried severe risk when resetting respawn anchors. Java 26.3 introduces dedicated camping mechanics:',
        table: {
          headers: ['Item / Equipment', 'Crafting Recipe', 'Key Gameplay Advantage'],
          rows: [
            ['Straw Bed', '3 Wheat + 3 Poplar / Wooden Slabs', 'Passes nighttime/storms and breaks into straw fibers without overriding your home spawn point.'],
            ['Wool Cushion', '2 Wool + 1 Feather (Any 16 dye colors)', 'Compact sit-able block for campers, outposts, and mounts without requiring stairs/minecart glitches.']
          ]
        },
        callout: {
          type: 'important',
          title: 'Respawn Preservation',
          text: 'Using a standard wooden bed outside your base overwrites your home respawn point. When exploring biomes thousands of blocks away, carry a Straw Bed to skip phantoms and hostile night spawns safely without losing your home respawn.'
        }
      }
    ],
    relatedTopicIds: [1, 11, 4],
    interactiveToolId: 'trading',
    interactiveToolLabel: 'Open Villager Trading & Economy Simulator'
  },

  // ==========================================
  // TOPIC 13: THE MODDING ECOSYSTEM
  // ==========================================
  {
    id: 13,
    slug: 'modding-ecosystem',
    title: 'The Modding Ecosystem & Performance Stacks',
    categoryId: 'customize',
    categoryName: 'Customize & Play',
    subtopicLabel: 'Mods · Modpacks',
    versionBadge: 'Fabric, NeoForge, Sodium & Iris',
    applicableVersions: 'Java Edition 1.16 – 1.21.3+',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'layers',
    summary: 'The modern mod loader landscape (Fabric, NeoForge, Forge, Quilt), open-source rendering engines (Sodium, Lithium, Iris), and essential quality-of-life modifications.',
    keyFacts: [
      'Fabric provides a lightweight, modular modding toolchain with rapid snapshot and release update turnarounds.',
      'NeoForge split from legacy Forge in 2023 to modernize codebase architecture and improve API stability.',
      'Sodium replaces Minecraft\'s rendering engine with modern OpenGL multi-draw algorithms, increasing FPS by 3x–5x.',
      'Lithium optimizes server-side physics, chunk ticking, and mob AI without altering vanilla game mechanics.'
    ],
    quickReference: [
      { label: 'Lightweight Loader', value: 'Fabric Mod Loader (FML)' },
      { label: 'Modern Forge Fork', value: 'NeoForge' },
      { label: 'FPS Optimization Stack', value: 'Sodium + Lithium + FerriteCore + Iris' },
      { label: 'Official Source', value: 'modrinth.com' }
    ],
    sections: [
      {
        id: 'loaders',
        title: '1. The Modern Mod Loader Landscape',
        content: 'Comparison of active modding architectures in the Java ecosystem:',
        table: {
          headers: ['Mod Loader', 'Primary Strengths', 'Target Use Case'],
          rows: [
            ['Fabric', 'Blazing fast load times, modular API, instant snapshot updates', 'Vanilla+ optimization, competitive clients, client QoL'],
            ['NeoForge', 'Modern clean architecture fork of Forge, robust cross-mod API', 'Heavy content mods (Create, Mekanism, tech packs)'],
            ['Forge (Legacy)', 'Historical catalog of mods from 1.7 to 1.20', 'Legacy modpack playthroughs'],
            ['Quilt', 'Fork of Fabric designed for enhanced community tooling', 'Experimental community projects']
          ]
        }
      },
      {
        id: 'performance-stack',
        title: '2. The Definitive 3x–5x FPS Optimization Stack',
        content: 'Replacing legacy OptiFine with open-source modern rendering mods:',
        table: {
          headers: ['Mod', 'Optimization Target', 'Performance Impact'],
          rows: [
            ['Sodium', 'OpenGL rendering engine rewrite via MultiDraw', '3x to 5x frame rate increase, smooth 1% lows'],
            ['Lithium', 'Server-side physics, chunk ticking, and entity pathfinding', 'Massive reduction in MSPT lag on servers and singleplayer'],
            ['FerriteCore', 'RAM and memory footprint reduction', 'Reduces Minecraft heap memory consumption by up to 40%'],
            ['Iris Shaders', 'Modern GLSL shader pipeline with full Sodium compatibility', 'Run shaders at high FPS without OptiFine stutter']
          ]
        }
      }
    ],
    relatedTopicIds: [14, 16, 9],
    interactiveToolId: 'modding',
    interactiveToolLabel: 'Open Modding Hub & Performance Optimizer'
  },

  // ==========================================
  // TOPIC 14: RESOURCE PACKS, SHADERS & DATA PACKS
  // ==========================================
  {
    id: 14,
    slug: 'resource-packs-shaders',
    title: 'Resource Packs, Shaders & Data Packs',
    categoryId: 'customize',
    categoryName: 'Customize & Play',
    subtopicLabel: 'Shaders · Resource packs',
    versionBadge: 'pack.mcmeta Format 34+',
    applicableVersions: 'Java 1.6+ (Pack Format 34 in 1.21.3)',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'eye',
    summary: 'Client-side visual customization via Resource Packs (textures, models, audio, fonts), GLSL shader pipelines (Iris/Oculus), and server-side Data Packs modifying loot tables and recipes.',
    keyFacts: [
      'Resource packs require a valid pack.mcmeta JSON descriptor containing the pack format number and description.',
      'Data packs allow creating custom world generation, crafting recipes, advancements, and functions without installing mods.',
      'Iris Shaders enables GLSL shader packs (BSL, Complementary, SEUS) while maintaining Sodium performance speeds.',
      'Core shaders (1.17+) allow direct modification of in-game rendering pipelines using vanilla JSON shader files.'
    ],
    quickReference: [
      { label: 'Descriptor File', value: 'pack.mcmeta (JSON format)' },
      { label: 'Shader Architecture', value: 'GLSL / Iris shader pipeline' },
      { label: 'Data Pack Scope', value: 'Recipes, loot tables, tags, functions, biomes' },
      { label: 'Official Source', value: 'minecraft.wiki/w/Resource_pack' }
    ],
    sections: [
      {
        id: 'pack-mcmeta',
        title: '1. pack.mcmeta Descriptor Specification',
        content: 'Every resource pack and data pack requires a pack.mcmeta file located in its root folder:',
        commands: [
          {
            command: '{\n  "pack": {\n    "pack_format": 34,\n    "description": "§aAuthoritative Vanilla Enhanced §7- Java 1.21.3"\n  }\n}',
            description: 'pack.mcmeta descriptor JSON for Java 1.21.2 & 1.21.3'
          }
        ]
      }
    ],
    relatedTopicIds: [13, 15, 5],
    interactiveToolId: 'resourcepacks',
    interactiveToolLabel: 'Open Resource Pack Studio & X-Ray Sandbox'
  },

  // ==========================================
  // TOPIC 15: COMMANDS, FUNCTIONS & DATA COMPONENTS
  // ==========================================
  {
    id: 15,
    slug: 'commands-data-components',
    title: 'Commands, Functions & Modern Data Components',
    categoryId: 'engineer',
    categoryName: 'Build & Engineer',
    subtopicLabel: 'Commands · Modern syntax',
    versionBadge: 'Java 1.20.5+ Syntax',
    applicableVersions: 'Java 1.13+ (/execute), Java 1.20.5+ (Data Components)',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'terminal',
    summary: 'The command system, target selectors (@p, @a, @e, @r, @s), execute subcommands, mcfunction script files, and the modern bracketed Data Components item syntax.',
    keyFacts: [
      'Java 1.20.5 permanently deprecated string-based NBT formatting for items in favor of structured Data Components.',
      'Target selectors: @p (nearest player), @a (all players), @e (all entities), @r (random player), @s (command executor).',
      'The /execute command provides modular conditional branching: /execute as @a at @s if block ~ ~-1 ~ stone run ...',
      'mcfunction files bundle hundreds of command lines to run on specific game ticks without triggering server lag.'
    ],
    quickReference: [
      { label: 'Modern Give Syntax', value: '/give @p diamond_sword[minecraft:enchantments={levels:{sharpness:5}}] 1' },
      { label: 'Command Blocks', value: 'Impulse (Orange), Chain (Green), Repeating (Purple)' },
      { label: 'Scripting Format', value: '.mcfunction in data packs' },
      { label: 'Official Source', value: 'minecraft.wiki/w/Commands' }
    ],
    sections: [
      {
        id: 'command-examples',
        title: '1. Standard Command Examples & Syntax (Java 1.20.5+)',
        content: 'Essential commands ready to copy directly into your console or command blocks:',
        commands: [
          {
            command: '/give @p netherite_sword[minecraft:enchantments={levels:{"minecraft:sharpness":5,"minecraft:unbreaking":3,"minecraft:looting":3,"minecraft:mending":1}}] 1',
            description: 'Give maximum God Netherite Sword with modern 1.20.5+ Data Components syntax.'
          },
          {
            command: '/execute as @a at @s if block ~ ~-1 ~ minecraft:redstone_block run effect give @s minecraft:speed 10 2 true',
            description: 'Conditional /execute check: applies Speed II to any player standing on a Redstone Block without particles.'
          },
          {
            command: '/locate structure minecraft:trial_chambers',
            description: 'Locate coordinates to the nearest underground 1.21 Trial Chambers structure.'
          },
          {
            command: '/summon minecraft:breeze ~ ~ ~ {NoAI:1b,CustomName:\'{"text":"Training Breeze","color":"aqua"}\'}',
            description: 'Summon an immobile Breeze entity with custom cyan nametag for combat testing.'
          },
          {
            command: '/fill ~-5 ~-1 ~-5 ~5 ~-1 ~5 minecraft:smooth_stone replace minecraft:dirt',
            description: 'Surgically replace all dirt blocks in an 11x11 floor with smooth stone.'
          }
        ]
      },
      {
        id: 'selectors',
        title: '2. Target Selectors & Arguments',
        content: 'Reference guide to Java Edition entity selectors:',
        table: {
          headers: ['Selector', 'Target Filter', 'Common Argument Example'],
          rows: [
            ['@p', 'Nearest player to execution coordinates', '@p[distance=..10]'],
            ['@a', 'All players currently on server/world', '@a[gamemode=survival]'],
            ['@e', 'All entities (players, mobs, items, arrows)', '@e[type=zombie,tag=boss]'],
            ['@r', 'Random player chosen from world', '@r[team=red]'],
            ['@s', 'The entity or player currently executing command', '@s[nbt={OnGround:1b}]']
          ]
        }
      }
    ],
    relatedTopicIds: [9, 14, 5],
    interactiveToolId: null,
    interactiveToolLabel: null
  },

  // ==========================================
  // TOPIC 16: MULTIPLAYER, SERVERS & NETWORKING
  // ==========================================
  {
    id: 16,
    slug: 'multiplayer-servers',
    title: 'Multiplayer, Dedicated Servers & Networking',
    categoryId: 'customize',
    categoryName: 'Customize & Play',
    subtopicLabel: 'Servers · Networking',
    versionBadge: 'Dedicated Servers & 20 TPS',
    applicableVersions: 'Java Edition Dedicated Server',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'server',
    summary: 'Dedicated server architectures, server.properties configurations, server software (Vanilla, Paper, Purpur, Fabric), tick rate maintenance (20 TPS), and network port forwarding (25565).',
    keyFacts: [
      'Default Minecraft Java Edition server port is 25565 (TCP).',
      'Target server tick rate is 20 TPS; MSPT (Milliseconds Per Tick) must remain below 50.0ms to prevent game lag.',
      'PaperMC and Purpur provide asynchronous chunk loading, optimized entity ticking, and anti-xray obfuscation.',
      'RCON allows remote administrative command execution over authenticated TCP sockets.'
    ],
    quickReference: [
      { label: 'Default Port', value: '25565 TCP' },
      { label: 'Target Performance', value: '20.0 TPS (< 50.0 mspt)' },
      { label: 'High-Perf Server', value: 'PaperMC / Purpur / Fabric Server' },
      { label: 'Official Source', value: 'minecraft.wiki/w/Server.properties' }
    ],
    sections: [
      {
        id: 'server-config',
        title: '1. Essential server.properties Parameters',
        content: 'Core parameters governing server performance and security in server.properties:',
        table: {
          headers: ['Parameter', 'Default Value', 'Recommended Setting for Smooth TPS'],
          rows: [
            ['server-port', '25565', '25565 (forwarded via router on TCP)'],
            ['view-distance', '10', '10 (client visual distance)'],
            ['simulation-distance', '10', '6–8 (computational tick radius; huge performance saver)'],
            ['network-compression-threshold', '256', '256 (compresses packets larger than 256 bytes)'],
            ['online-mode', 'true', 'true (verifies player authentication against Mojang session servers)']
          ]
        }
      }
    ],
    relatedTopicIds: [9, 13, 1],
    interactiveToolId: null,
    interactiveToolLabel: null
  },

  // ==========================================
  // TOPIC 17: SPEEDRUNNING CATEGORIES & RECORDS
  // ==========================================
  {
    id: 17,
    slug: 'speedrunning',
    title: 'Speedrunning Categories & Records',
    categoryId: 'customize',
    categoryName: 'Customize & Play',
    subtopicLabel: 'Speedrunning',
    versionBadge: 'Sub-7 Minute World Records',
    applicableVersions: 'Java 1.16.1 (Bastion routing) & Current',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'zap',
    summary: 'Competitive speedrunning leaderboards on Speedrun.com: Any% RSG (Random Seed Glitchless), SSG (Set Seed Glitchless), Bastion routing, Nether navigation, and One-Cycle Ender Dragon kills with beds.',
    keyFacts: [
      'Any% RSG record has broken below 7 minutes, driven by optimized Bastion bartering and Nether fortress routing.',
      'One-cycle strategy: Placing beds on the central bedrock fountain and detonating them as the Ender Dragon perches to deal explosive damage.',
      'F3+Shift pie chart analysis allows runners to identify nearby spawners and ocean monuments through block ticking data.',
      'Blind travel calculation: Combining F3 coordinates with Nether 8:1 scaling to build portals landing directly on Strongholds.'
    ],
    quickReference: [
      { label: 'Primary Category', value: 'Any% Random Seed Glitchless (RSG)' },
      { label: 'World Record Benchmark', value: 'Sub-7 minutes (Java 1.16+)' },
      { label: 'Dragon Kill Method', value: 'Bed explosion detonation (One-cycle)' },
      { label: 'Official Leaderboard', value: 'speedrun.com/mc' }
    ],
    sections: [
      {
        id: 'categories',
        title: '1. Standard Speedrunning Categories',
        content: 'Official categories governed by the Minecraft Speedrunning community on speedrun.com/mc:',
        table: {
          headers: ['Category', 'World Generation', 'Allowed Mechanics & Benchmark'],
          rows: [
            ['Any% RSG', 'Random Seed Glitchless', 'Pure vanilla random seed. World record benchmark: sub-7 minutes.'],
            ['Any% SSG', 'Set Seed Glitchless', 'Runner chooses pre-memorized seed. World record benchmark: sub-2 minutes.'],
            ['All Advancements', '100% Advancements', 'Complete all official advancements in a single session.']
          ]
        }
      }
    ],
    relatedTopicIds: [1, 3, 4],
    interactiveToolId: 'modding',
    interactiveToolLabel: 'View Speedrunning Leaderboard & Modding Hub'
  },

  // ==========================================
  // TOPIC 18: LORE, STORY & ENVIRONMENTAL MYSTERIES
  // ==========================================
  {
    id: 18,
    slug: 'lore-story',
    title: 'Lore, Story & Environmental Mysteries',
    categoryId: 'world',
    categoryName: 'Explore the World',
    subtopicLabel: 'Lore · Environmental Mysteries',
    versionBadge: 'The End Poem & Ancient Builders',
    applicableVersions: 'All Java Versions',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'scroll',
    summary: 'The subtle environmental narrative of Minecraft: The End Poem by Julian Gough, ruined portals, desert wells, music disc mysteries (Disc 11, 13, 5), and the tragic story of the Ancient Builders.',
    keyFacts: [
      'The End Poem (scrolling text after slaying the Ender Dragon) was written by Julian Gough, meditating on consciousness, dreaming, and reality.',
      'Ruined Portals and Abandoned Mineshafts tell of an ancient civilization that mastered interdimensional travel and industrial excavation.',
      'Music Discs 11, 13, and 5 contain haunting audio logs recording explorers fleeing from unseen subterranean monsters and the Warden.',
      'Ancient Cities contain a giant central structure framed with reinforced deepslate resembling an unignited dimensional portal.'
    ],
    quickReference: [
      { label: 'End Poem Author', value: 'Julian Gough' },
      { label: 'Haunting Audio Discs', value: 'Disc 11, Disc 13, Disc 5' },
      { label: 'Ancient Megastructure', value: 'Reinforced Deepslate portal in Ancient Cities' },
      { label: 'Official Source', value: 'minecraft.wiki/w/End_Poem' }
    ],
    sections: [
      {
        id: 'narrative-elements',
        title: '1. Canonical Environmental Storytelling Elements',
        content: 'Minecraft communicates its lore through world generation artifacts rather than explicit cutscenes:',
        table: {
          headers: ['Artifact / Landmark', 'Environmental Clues', 'Community Interpretation'],
          rows: [
            ['Ancient Cities', 'Reinforced Deepslate portal frame, Sculk Shriekers, Warden shrines', 'Ancient Builders engineered experimental dimensional gateways before Sculk wiped them out'],
            ['Ruined Portals', 'Crying Obsidian, golden weapons in chests, netherrack spreading to Overworld', 'Catastrophic failures during early dimensional expansion'],
            ['Music Disc 5', 'Sounds of flint & steel, sculk activation, heartbeat, monstrous roar', 'Audio diary recording an explorer encountering the Warden in Deep Dark'],
            ['The End Poem', 'Two cosmic entities dialogue while the player sleeps and wakes', 'Philosophical treatise on consciousness, love, and the dream of existence']
          ]
        }
      }
    ],
    relatedTopicIds: [3, 10, 4],
    interactiveToolId: null,
    interactiveToolLabel: null
  },

  // ==========================================
  // TOPIC 19: COMMUNITY, CONTENT CREATORS & EVENTS
  // ==========================================
  {
    id: 19,
    slug: 'community-creators',
    title: 'Community, Content Creators & Events',
    categoryId: 'versions',
    categoryName: 'Versions & News',
    subtopicLabel: 'Upcoming changes · Creators',
    versionBadge: 'Over 1 Trillion YouTube Views',
    applicableVersions: 'All Java Versions',
    lastVerified: 'October 24, 2024 (Java 1.21.3)',
    icon: 'users',
    summary: 'The historic creator culture that made Minecraft a global phenomenon: Hermitcraft survival SMP, Scicraft technical engineering, Minecraft Championships (MCC), and surpassing 1 trillion YouTube views.',
    keyFacts: [
      'In December 2021, YouTube announced that Minecraft videos officially surpassed 1 trillion total views on the platform.',
      'Hermitcraft (founded in 2012) is the longest-running and most influential vanilla survival multiplayer SMP server.',
      'Scicraft represents the pinnacle of technical Minecraft: perimeter quarries, sub-tick automation, and massive automated farms.',
      'Minecraft Live is Mojang\'s annual global livestream featuring update reveals, developer deep-dives, and community announcements.'
    ],
    quickReference: [
      { label: 'YouTube Milestone', value: 'Over 1,000,000,000,000 views recorded' },
      { label: 'Iconic SMP', value: 'Hermitcraft (Season 10 active)' },
      { label: 'Technical Zenith', value: 'Scicraft Server' },
      { label: 'Official Source', value: 'minecraft.net/en-us/article/1-trillion-views-youtube' }
    ],
    sections: [
      {
        id: 'creator-heritage',
        title: '1. Pillars of the Creator Community',
        content: 'Historical institutions and creators who shaped modern Minecraft:',
        table: {
          headers: ['Institution / Creator', 'Specialty & Contribution', 'Legacy'],
          rows: [
            ['Hermitcraft', 'Vanilla Survival Multiplayer SMP (Season 10)', 'Gold standard for community cooperation, mega-bases, and storytelling'],
            ['Scicraft', 'Technical Redstone & Automated Quarries', 'Pioneered perimeter quarries, mob spawning suppression, and game-tick optimization'],
            ['Technoblade (1999–2022)', 'PvP mastery, legendary MCC records, potato war', 'Honored with official crown on launcher pig; immortalized icon of skill and charity'],
            ['Mumbo Jumbo', 'Redstone engineering tutorials', 'Democratized complex redstone mechanics for millions of casual players'],
            ['Minecraft Live', 'Annual Mojang Studios global broadcast', 'Live community update reveals, developer talks, and Game Drops previews']
          ]
        }
      }
    ],
    relatedTopicIds: [1, 9, 13],
    interactiveToolId: 'feedback',
    interactiveToolLabel: 'Open Verified Developer Desk'
  }
];

export function getEncyclopediaTopicById(id) {
  return ENCYCLOPEDIA_TOPICS.find(t => t.id === Number(id)) || null;
}

export function getEncyclopediaTopicsByCategory(categoryId) {
  if (categoryId === 'all') return ENCYCLOPEDIA_TOPICS;
  return ENCYCLOPEDIA_TOPICS.filter(t => t.categoryId === categoryId);
}
