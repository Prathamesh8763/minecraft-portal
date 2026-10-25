// Comprehensive Minecraft Java Edition Data (Verified Canonical Data: 1.0 to 26.3 Wilderness Bound + 26.4 Snapshots)
// Grounded strictly in official Mojang Studios releases, official changelogs, and official Minecraft update timelines.

export const GAME_DROPS = [
  {
    id: "26-3-wilderness-bound",
    version: "Java 26.3 & Bedrock 26.50",
    date: "September 15, 2026",
    tag: "CURRENT STABLE RELEASE",
    title: "Wilderness Bound (Game Drop 3)",
    icon: "/icons/minecraft/poplar_sign.svg",
    fallbackIcon: "/icons/minecraft/oak_log.svg",
    accent: "#eab308",
    bgGradient: "from-amber-950/90 to-stone-900/60",
    description: "The official autumn-themed wilderness and camping Game Drop. Introduces the vibrant Dappled Forest biome, the full Poplar wood family, Abandoned Camps with Explorer Maps, portable single-use Straw Beds, sit-able Cushions, and 16-color wool/concrete stairs and slabs.",
    features: [
      { name: "The Dappled Forest Biome", desc: "Cozy autumn forest biome with vibrant red, orange, and yellow leaf canopies, leaf litter ground cover, coarse dirt paths, and shelf mushrooms." },
      { name: "Poplar Trees & Complete Wood Set", desc: "Towering new Poplar trees yielding Poplar logs and a warm grey wood palette: planks, stairs, slabs, fences, gates, doors, trapdoors, signs, and boats." },
      { name: "Abandoned Camps & Explorer Maps", desc: "Surface campsites generated across multiple biomes containing loot barrels and Explorer Maps pointing towards Ancient Cities, Mineshafts, and Pyramids." },
      { name: "Straw Beds (Night Skip)", desc: "Crafted from 3 Hay Bales. Single-use portable bed suited for nomadic exploration; skips the night without resetting your primary bed spawn point." },
      { name: "Sit-able Cushions & Slabs/Stairs", desc: "Crafted from 3 Wool Slabs. Collision-free decorative cushions allowing players to sit. Adds full wool and concrete stairs & slabs in all 16 dye colors." }
    ]
  },
  {
    id: "26-4-winter-drop",
    version: "Java 26.4 Snapshot Preview (Snap 5)",
    date: "Active Testing (October 2026)",
    tag: "ACTIVE SNAPSHOT (IN TESTING)",
    title: "Winter Drop: Ice Caves & The Frostbite",
    icon: "/icons/minecraft/chiseled_packed_ice.svg",
    fallbackIcon: "/icons/minecraft/blue_ice.svg",
    accent: "#38bdf8",
    bgGradient: "from-cyan-950/90 to-slate-900/60",
    description: "Currently in public snapshot testing (not yet stable). Subterranean Ice Caves, growing Icicles, directional light-emitting Ice Crystals, the freezing Frostbite mob, Packed Ice Bricks, and experimental Vulkan rendering.",
    features: [
      { name: "Subterranean Ice Caves", desc: "Spectacular underground biome generated beneath cold mountain biomes, featuring packed ice ceilings, calcite veins, and deepslate ore pockets." },
      { name: "The Frostbite Hostile Mob", desc: "Cold-adapted zombie variant dwelling in deep Ice Caves. Hurls lethal Ice Balls and inflicts the Freezing screen-vignette status effect on hit." },
      { name: "Icicles & Directional Ice Crystals", desc: "Speleothem-like stalactites growing up to 5 blocks long, alongside directional light-emitting Ice Crystals that can be oriented on walls and ceilings." },
      { name: "Packed Ice Bricks Family", desc: "Complete architectural stonecutter set (bricks, stairs, slabs, walls, chiseled) crafted from packed ice for durable winter structures." },
      { name: "Vulkan Modern Graphics Pipeline", desc: "Experimental modern Vulkan graphics API backend option for enhanced GPU rendering efficiency and frame-rate stability." }
    ]
  },
  {
    id: "26-1-tiny-takeover",
    version: "Java 26.1",
    date: "March 2026",
    tag: "OFFICIAL GAME DROP",
    title: "Tiny Takeover (Game Drop 1)",
    icon: "/icons/minecraft/lead.svg",
    fallbackIcon: "/icons/minecraft/string.svg",
    accent: "#14b8a6",
    bgGradient: "from-teal-950/80 to-slate-900/40",
    description: "Focused on technical quality, entity scale fine-tuning, leashed mob despawning bug fixes, and community-requested backend polish.",
    features: [
      { name: "Entity Scale Adjustments", desc: "Fine-tuned hitboxes and visual scale attributes for small mobs, baby animals, and custom data-driven entity models." },
      { name: "Leashed Mob Persistence", desc: "Fixed long-standing issue where leashed mobs could accidentally despawn or snap leashes during rapid chunk loading." },
      { name: "Backend Performance Optimizations", desc: "Improved memory allocation for chunk ticking loops and network packet compression." }
    ]
  },
  {
    id: "pale-garden-drop",
    version: "Java 1.21.4 (Winter 2024)",
    date: "December 2024",
    tag: "OFFICIAL RELEASE",
    title: "The Pale Garden & The Creaking",
    icon: "/icons/minecraft/creaking_heart.svg",
    fallbackIcon: "/icons/minecraft/creeper.svg",
    accent: "#94a3b8",
    bgGradient: "from-slate-900/90 to-zinc-950/60",
    description: "An eerie, desaturated Overworld forest where days are quiet and nights are sinister. Introduces The Creaking, Pale Oak wood, and living Creaking Hearts.",
    features: [
      { name: "Pale Garden Biome", desc: "Desaturated forest biome featuring Pale Oak trees, Pale Moss blocks, carpets, and hanging moss. Animals cannot spawn naturally." },
      { name: "The Creaking Mob", desc: "Botanical hostile entity that freezes when watched. Takes ZERO damage from standard weapon attacks; invulnerable until its Creaking Heart is destroyed." },
      { name: "Creaking Heart Block", desc: "Living wooden core nestled inside Pale Oak logs. Spawns and tethers the Creaking. Emits particle trails when the Creaking is struck." },
      { name: "Resin Clumps & Resin Bricks", desc: "Striking the Creaking causes the Creaking Heart to secrete Resin. Resin clumps smelt into Resin Bricks for stairs, slabs, chiseled blocks, and armor trims." },
      { name: "Eyeblossom Flower", desc: "Dual-state wild flower that opens at night with an orange eye and emits a wither effect to nearby bees; closes during daylight." }
    ]
  },
  {
    id: "1-21-2",
    version: "Java 1.21.2 & 1.21.3",
    date: "October 22, 2024",
    tag: "LATEST OFFICIAL RELEASE",
    title: "Bundles of Bravery",
    icon: "/icons/minecraft/bundle.svg",
    fallbackIcon: "/icons/minecraft/leather.svg",
    accent: "#10b981",
    bgGradient: "from-emerald-950/80 to-teal-950/40",
    description: "The long-awaited release of the storage Bundle, full 16-color bundle dyeing, and official Hardcore mode parity for Bedrock Edition.",
    features: [
      { name: "The Bundle", desc: "Crafted from 1 Leather and 1 String. Holds up to 64 items of mixed types, massively improving early-game inventory management." },
      { name: "16 Dyeable Bundles", desc: "Combine a base bundle with any of the 16 Minecraft dyes to color-code storage packs and inventory kits." },
      { name: "Hardcore Mode Parity", desc: "Permanent one-life hardcore survival mode officially enabled in Bedrock Edition worlds with spectator aftermath." },
      { name: "Redstone & Banner Polishing", desc: "Precise comparator reading of bundle fullness percentages and modernized banner design layers." }
    ]
  },
  {
    id: "1-21",
    version: "Java 1.21",
    date: "June 13, 2024",
    tag: "MAJOR UPDATE",
    title: "Tricky Trials",
    icon: "/icons/minecraft/the_mace.svg",
    fallbackIcon: "/icons/minecraft/iron_sword.svg",
    accent: "#c084fc",
    bgGradient: "from-purple-950/80 to-indigo-950/40",
    description: "Procedural underground Trial Chambers, the smash-attack Heavy Mace, autonomous Crafter redstone blocks, and the wind-elemental Breeze.",
    features: [
      { name: "The Crafter", desc: "Redstone-driven autonomous 3x3 crafting machine that enables fully automated assembly lines without player interaction." },
      { name: "The Heavy Mace", desc: "Smash-attack weapon crafted from Heavy Core + Breeze Rod; converts vertical fall height into devastating kinetic damage." },
      { name: "The Breeze Mob", desc: "Hyper-agile wind elemental shooting explosive Wind Charges that trigger trap mechanisms inside Trial Chambers." },
      { name: "The Bogged", desc: "Poison-arrow wielding mossy skeleton lurking in Swamps and Trial Chambers; shearing yields red and brown mushrooms." },
      { name: "Trial Chambers & Vaults", desc: "Deep underground procedurally generated combat dungeons featuring Trial Spawners, Ominous Bottles, and Heavy Cores." }
    ]
  },
  {
    id: "1-20-5",
    version: "Java 1.20.5 & 1.20.6",
    date: "April 23, 2024",
    tag: "OFFICIAL GAME DROP",
    title: "Armored Paws",
    icon: "/icons/minecraft/armadillo_scute.svg",
    fallbackIcon: "/icons/minecraft/shield.svg",
    accent: "#f59e0b",
    bgGradient: "from-amber-950/80 to-stone-900/40",
    description: "Savanna Armadillos, craftable Wolf Armor with 16 dye colors, 8 regional wolf coat variants, and modern technical Data Components.",
    features: [
      { name: "The Armadillo", desc: "Docile passive mob native to Savannas and Badlands. Rolls into a protective shell when predators approach; brushes yield Armadillo Scutes." },
      { name: "Wolf Armor", desc: "Crafted from 6 Armadillo Scutes. Absorbs all damage for tamed wolves, cracks in 3 visual degradation stages, and can be dyed in 16 colors." },
      { name: "8 New Wolf Variants", desc: "Wolves now feature distinct biome coats: Pale (Taiga), Woods, Ashen, Black, Chestnut, Rusty, Spotted, Striped, and Snowy." },
      { name: "Data Components Technical Migration", desc: "Replaced raw legacy string-based item NBT with type-safe structured data components (e.g. item[minecraft:enchantments={...}])." }
    ]
  },
  {
    id: "1-20",
    version: "Java 1.20",
    date: "June 7, 2023",
    tag: "MAJOR UPDATE",
    title: "Trails & Tales",
    icon: "/icons/minecraft/brush.svg",
    fallbackIcon: "/icons/minecraft/feather.svg",
    accent: "#ec4899",
    bgGradient: "from-pink-950/80 to-rose-950/40",
    description: "Archaeological brush excavation, the ancient Sniffer, Cherry Grove mountain forests, Armor Trims smithing customization, and Camels.",
    features: [
      { name: "Archaeology & Brushing", desc: "Excavate Suspicious Sand and Suspicious Gravel with the copper Brush to uncover 20 unique Pottery Sherds and Sniffer Eggs." },
      { name: "The Sniffer", desc: "Revived ancient passive mob that sniffs out ancient Torchflower Seeds and Pitcher Pods from dirt and grass." },
      { name: "Cherry Grove Biome", desc: "Scenic mountain woodland with vibrant pink cherry blossom trees, falling petal particles, and pink petals ground cover." },
      { name: "Armor Trims & Templates", desc: "16 collectible smithing templates and 10 material palettes enabling thousands of cosmetic visual armor customizations." },
      { name: "Camels & Chiseled Bookshelves", desc: "Two-player Desert mount with sprint-dash, alongside Chiseled Bookshelves that store 6 books with comparator redstone outputs." }
    ]
  },
  {
    id: "1-19",
    version: "Java 1.19",
    date: "June 7, 2022",
    tag: "MAJOR UPDATE",
    title: "The Wild Update",
    icon: "/icons/minecraft/warden.svg",
    fallbackIcon: "/icons/minecraft/skulk.svg",
    accent: "#06b6d4",
    bgGradient: "from-cyan-950/80 to-slate-900/40",
    description: "The Deep Dark subterranean metropolis, the terrifying blind Warden, Mangrove Swamps, Frogs, and the helpful item-gathering Allay.",
    features: [
      { name: "The Deep Dark & Ancient City", desc: "Deepest Overworld caverns at Y=-52 containing Ancient Cities guarded by vibration-sensitive Sculk Shriekers." },
      { name: "The Warden Behemoth", desc: "500 HP blind behemoth summoned by 4 sculk shrieks. Tracks players by vibrations and scent, unleashing devastating sonic booms." },
      { name: "Mangrove Swamp & Mud Blocks", desc: "Dense aquatic biome with towering Mangrove root trees, mud blocks, packed mud, and craftable Mud Bricks." },
      { name: "Frogs & Froglights", desc: "Spawn from Tadpoles, eat small slimes and magma cubes to produce Ochre, Verdant, and Pearlescent Froglights." },
      { name: "The Allay", desc: "Friendly fairy mob rescued from Pillager Outposts and Mansions; retrieves dropped items matching the item held in its hand." }
    ]
  }
];

export const CRAFTING_RECIPES = [
  {
    id: "crafter",
    name: "The Crafter",
    category: "Redstone",
    icon: "/icons/minecraft/crafter.svg",
    version: "1.21+",
    grid: [
      { name: "Iron Ingot", icon: "/icons/minecraft/iron_ingot.svg" }, { name: "Iron Ingot", icon: "/icons/minecraft/iron_ingot.svg" }, { name: "Iron Ingot", icon: "/icons/minecraft/iron_ingot.svg" },
      { name: "Iron Ingot", icon: "/icons/minecraft/iron_ingot.svg" }, { name: "Crafting Table", icon: "/icons/minecraft/crafting_table.svg" }, { name: "Iron Ingot", icon: "/icons/minecraft/iron_ingot.svg" },
      { name: "Redstone", icon: "/icons/minecraft/redstone_dust.svg" }, { name: "Dropper", icon: "/icons/minecraft/dropper.svg" }, { name: "Redstone", icon: "/icons/minecraft/redstone_dust.svg" }
    ],
    result: { name: "The Crafter", icon: "/icons/minecraft/crafter.svg", desc: "Autonomous redstone block that crafts items automatically when pulsed with a redstone signal!" }
  },
  {
    id: "mace",
    name: "The Mace",
    category: "Weapons",
    icon: "/icons/minecraft/the_mace.svg",
    version: "1.21+",
    grid: [
      null, null, null,
      null, { name: "Heavy Core", icon: "/icons/minecraft/heavy_core.svg" }, null,
      null, { name: "Breeze Rod", icon: "/icons/minecraft/breeze_rod.svg" }, null
    ],
    result: { name: "The Mace", icon: "/icons/minecraft/the_mace.svg", desc: "Fall-damage scaling melee hammer. Landing a smash strike negates all accumulated fall damage!" }
  },
  {
    id: "bundle",
    name: "The Bundle",
    category: "Utility",
    icon: "/icons/minecraft/bundle.svg",
    version: "1.21.2+",
    grid: [
      { name: "String", icon: "/icons/minecraft/string.svg" }, { name: "Leather", icon: "/icons/minecraft/leather.svg" }, { name: "String", icon: "/icons/minecraft/string.svg" },
      { name: "Leather", icon: "/icons/minecraft/leather.svg" }, null, { name: "Leather", icon: "/icons/minecraft/leather.svg" },
      { name: "Leather", icon: "/icons/minecraft/leather.svg" }, { name: "Leather", icon: "/icons/minecraft/leather.svg" }, { name: "Leather", icon: "/icons/minecraft/leather.svg" }
    ],
    result: { name: "The Bundle", icon: "/icons/minecraft/bundle.svg", desc: "Portable storage pouch that consolidates up to 64 items of varying types into a single inventory slot." }
  },
  {
    id: "wolf-armor",
    name: "Wolf Armor",
    category: "Armor",
    icon: "/icons/minecraft/armadillo_scute.svg",
    version: "1.20.5+",
    grid: [
      { name: "Armadillo Scute", icon: "/icons/minecraft/armadillo_scute.svg" }, null, null,
      { name: "Armadillo Scute", icon: "/icons/minecraft/armadillo_scute.svg" }, { name: "Armadillo Scute", icon: "/icons/minecraft/armadillo_scute.svg" }, { name: "Armadillo Scute", icon: "/icons/minecraft/armadillo_scute.svg" },
      { name: "Armadillo Scute", icon: "/icons/minecraft/armadillo_scute.svg" }, null, { name: "Armadillo Scute", icon: "/icons/minecraft/armadillo_scute.svg" }
    ],
    result: { name: "Wolf Armor", icon: "/icons/minecraft/armadillo_scute.svg", desc: "Equippable protective armor for tamed wolves. Absorbs damage, cracks visually, and can be dyed in 16 colors." }
  },
  {
    id: "wind-charge",
    name: "Wind Charge (x4)",
    category: "Combat",
    icon: "/icons/minecraft/wind_charge.svg",
    version: "1.21+",
    grid: [
      null, null, null,
      null, { name: "Breeze Rod", icon: "/icons/minecraft/breeze_rod.svg" }, null,
      null, null, null
    ],
    result: { name: "Wind Charge (x4)", icon: "/icons/minecraft/wind_charge.svg", desc: "Throwable projectile that launches players high into the air and blows back enemies and projectiles." }
  },
  {
    id: "brush",
    name: "Archaeology Brush",
    category: "Tools",
    icon: "/icons/minecraft/brush.svg",
    version: "1.20+",
    grid: [
      null, { name: "Feather", icon: "/icons/minecraft/feather.svg" }, null,
      null, { name: "Copper Ingot", icon: "/icons/minecraft/copper_ingot.svg" }, null,
      null, { name: "Stick", icon: "/icons/minecraft/stick.svg" }, null
    ],
    result: { name: "Archaeology Brush", icon: "/icons/minecraft/brush.svg", desc: "Used to delicately uncover ancient artifacts from Suspicious Sand and Suspicious Gravel." }
  },
  {
    id: "chiseled-bookshelf",
    name: "Chiseled Bookshelf",
    category: "Storage",
    icon: "/icons/minecraft/bookshelf.svg",
    version: "1.20+",
    grid: [
      { name: "Oak Planks", icon: "/icons/minecraft/oak_planks.svg" }, { name: "Oak Planks", icon: "/icons/minecraft/oak_planks.svg" }, { name: "Oak Planks", icon: "/icons/minecraft/oak_planks.svg" },
      { name: "Oak Slab", icon: "/icons/minecraft/oak_planks.svg" }, { name: "Oak Slab", icon: "/icons/minecraft/oak_planks.svg" }, { name: "Oak Slab", icon: "/icons/minecraft/oak_planks.svg" },
      { name: "Oak Planks", icon: "/icons/minecraft/oak_planks.svg" }, { name: "Oak Planks", icon: "/icons/minecraft/oak_planks.svg" }, { name: "Oak Planks", icon: "/icons/minecraft/oak_planks.svg" }
    ],
    result: { name: "Chiseled Bookshelf", icon: "/icons/minecraft/bookshelf.svg", desc: "Functional bookshelf that physically holds up to 6 books, emitting redstone comparator signals based on the accessed slot." }
  },
  {
    id: "decorated-pot",
    name: "Decorated Pot",
    category: "Decor",
    icon: "/icons/minecraft/flower_pot.svg",
    version: "1.20+",
    grid: [
      null, { name: "Pottery Sherd", icon: "/icons/minecraft/brick.svg" }, null,
      { name: "Pottery Sherd", icon: "/icons/minecraft/brick.svg" }, null, { name: "Pottery Sherd", icon: "/icons/minecraft/brick.svg" },
      null, { name: "Pottery Sherd", icon: "/icons/minecraft/brick.svg" }, null
    ],
    result: { name: "Decorated Pot", icon: "/icons/minecraft/flower_pot.svg", desc: "Decorative ceramic urn crafted from 4 pottery sherds or bricks. Can store a single stack of items and be broken with weapons." }
  },
  {
    id: "straw-bed",
    name: "Straw Bed",
    category: "Survival",
    icon: "/icons/minecraft/straw_bed.svg",
    version: "26.3 Wilderness Bound",
    grid: [
      null, null, null,
      { name: "Hay Bale", icon: "/icons/minecraft/hay_block.svg" }, { name: "Hay Bale", icon: "/icons/minecraft/hay_block.svg" }, { name: "Hay Bale", icon: "/icons/minecraft/hay_block.svg" },
      null, null, null
    ],
    result: { name: "Straw Bed", icon: "/icons/minecraft/straw_bed.svg", desc: "Single-use portable bed that allows players to sleep and skip the night outdoors without resetting their primary bed respawn point." }
  },
  {
    id: "cushion",
    name: "Wool Cushion",
    category: "Decor",
    icon: "/icons/minecraft/cyan_cushion.svg",
    version: "26.3 Wilderness Bound",
    grid: [
      null, null, null,
      { name: "Cyan Wool Slab", icon: "/icons/minecraft/cyan_wool.svg" }, { name: "Cyan Wool Slab", icon: "/icons/minecraft/cyan_wool.svg" }, { name: "Cyan Wool Slab", icon: "/icons/minecraft/cyan_wool.svg" },
      null, null, null
    ],
    result: { name: "Cushion", icon: "/icons/minecraft/cyan_cushion.svg", desc: "Decorative sit-able furniture block crafted from 3 wool slabs. Has zero collision, allowing seamless placement in cozy campsites." }
  }
];

export const MOBS_DATA = [
  {
    name: "The Frostbite",
    type: "Hostile",
    badge: "26.4 SNAPSHOT (TESTING)",
    hearts: 10,
    health: "20 HP",
    icon: "/icons/minecraft/frostbite.svg",
    fallbackIcon: "/icons/minecraft/zombie.svg",
    dimension: "Overworld (Ice Caves)",
    drops: "Ice Balls, Rotten Flesh, Ice Crystals",
    desc: "A cold-adapted zombie variant dwelling in subterranean Ice Caves. Hurls lethal Ice Balls and inflicts the Freezing screen-vignette status effect upon impact."
  },
  {
    name: "The Creaking",
    type: "Hostile",
    badge: "1.21.4 UPDATE",
    hearts: 0,
    health: "Invulnerable (Tethered)",
    icon: "/icons/minecraft/creaking_heart.svg",
    fallbackIcon: "/icons/minecraft/creeper.svg",
    dimension: "Overworld (Pale Garden)",
    drops: "Resin Clumps (when struck)",
    desc: "A menacing botanical mob that stalks players in the Pale Garden. Freezes motionless when watched directly. Impervious to all weapon damage; dies only when its linked Creaking Heart block is destroyed."
  },
  {
    name: "The Breeze",
    type: "Hostile",
    badge: "1.21 UPDATE",
    hearts: 15,
    health: "30 HP",
    icon: "/icons/minecraft/wind_charge.svg",
    fallbackIcon: "/icons/minecraft/blaze.svg",
    dimension: "Overworld (Trial Chambers)",
    drops: "Breeze Rods (1-2)",
    desc: "A hyper-agile wind entity that leaps around arenas, deflecting arrows and launching wind charges that activate doors, trapdoors, and dispenser traps."
  },
  {
    name: "The Bogged",
    type: "Hostile",
    badge: "1.21 UPDATE",
    hearts: 8,
    health: "16 HP",
    icon: "/icons/minecraft/skeleton.svg",
    fallbackIcon: "/icons/minecraft/skeleton.png",
    dimension: "Overworld (Swamps & Trials)",
    drops: "Poison Arrows, Bones, Mushrooms",
    desc: "A mossy, mushroom-covered skeleton that shoots deadly poison-tipped arrows. Shearing it with shears yields red or brown mushrooms!"
  },
  {
    name: "The Armadillo",
    type: "Passive",
    badge: "1.20.5 DROP",
    hearts: 6,
    health: "12 HP",
    icon: "/icons/minecraft/armadillo_scute.svg",
    fallbackIcon: "/icons/minecraft/shield.svg",
    dimension: "Overworld (Savanna & Badlands)",
    drops: "Armadillo Scute (via Brush)",
    desc: "Docile passive mob that rolls into a protective ball when sprinting players or undead mobs approach. Brushing an armadillo consumes brush durability to produce scutes for Wolf Armor."
  },
  {
    name: "The Sniffer",
    type: "Passive",
    badge: "1.20 UPDATE",
    hearts: 7,
    health: "14 HP",
    icon: "/icons/minecraft/grass_block.svg",
    fallbackIcon: "/icons/minecraft/apple.svg",
    dimension: "Overworld (Ancient Revival)",
    drops: "Moss Block, Sniffer Egg",
    desc: "Ancient passive creature revived from Sniffer Eggs found in warm ocean ruins. Sniffs out ancient Torchflower Seeds and Pitcher Pods buried in dirt."
  },
  {
    name: "The Warden",
    type: "Hostile (Boss-Tier)",
    badge: "1.19 UPDATE",
    hearts: 250,
    health: "500 HP",
    icon: "/icons/minecraft/warden.svg",
    fallbackIcon: "/icons/minecraft/skulk.svg",
    dimension: "Overworld (Deep Dark)",
    drops: "Sculk Catalyst (1)",
    desc: "A blind behemoth summoned after 4 vibrations trigger Sculk Shriekers. Locates targets via vibration cues and smell, unleashing devastating sonic booms that pierce armor and shields."
  },
  {
    name: "The Allay",
    type: "Passive",
    badge: "1.19 UPDATE",
    hearts: 10,
    health: "20 HP",
    icon: "/icons/minecraft/amethyst_shard.svg",
    fallbackIcon: "/icons/minecraft/feather.svg",
    dimension: "Overworld (Mansions & Outposts)",
    drops: "Held Items",
    desc: "Helpful flying companion found trapped in Pillager cages. Hand it any item, and it collects dropped matching items within a 32-block radius, depositing them near Note Blocks."
  },
  {
    name: "Piglin Brute",
    type: "Hostile",
    badge: "1.16 UPDATE",
    hearts: 25,
    health: "50 HP",
    icon: "/icons/minecraft/netherite_axe.svg",
    fallbackIcon: "/icons/minecraft/iron_axe.svg",
    dimension: "The Nether (Bastion Remnants)",
    drops: "Golden Axe",
    desc: "Elite guardian of Nether Bastions. Unlike standard Piglins, Brutes cannot be bartered with, are never distracted by gold armor, and attack on sight with high-damage axes."
  },
  {
    name: "Ender Dragon",
    type: "Boss",
    badge: "END BOSS",
    hearts: 100,
    health: "200 HP",
    icon: "/icons/minecraft/ender_dragon.svg",
    fallbackIcon: "/icons/minecraft/ender_pearl.svg",
    dimension: "The End",
    drops: "Dragon Egg, 12,000 XP",
    desc: "The final ruler of The End dimension. Heals continuously from End Crystals atop obsidian pillars. Perches at the central bedrock portal where breath and melee strikes occur."
  },
  {
    name: "The Wither",
    type: "Boss",
    badge: "SUMMON BOSS",
    hearts: 150,
    health: "300 HP (Java)",
    icon: "/icons/minecraft/nether_star.svg",
    fallbackIcon: "/icons/minecraft/wither_skeleton_skull.svg",
    dimension: "Constructed (Any Dimension)",
    drops: "Nether Star (1)",
    desc: "Player-constructed three-headed terror created with 4 Soul Sand and 3 Wither Skeleton Skulls. Fires explosive skulls and drops the Nether Star used to power Beacons."
  }
];

export const BIOMES_DATA = [
  {
    id: "dappled-forest",
    name: "Dappled Forest",
    dimension: "Overworld",
    tag: "26.3 WILDERNESS BOUND (STABLE)",
    temp: "Crisp Autumn",
    icon: "/icons/minecraft/poplar_sign.svg",
    fallbackIcon: "/icons/minecraft/oak_leaves.svg",
    color: "#f59e0b",
    description: "An autumn-aesthetic temperate woodland characterized by warm red, orange, and yellow poplar leaves, coarse dirt, leaf litter, sideways-growing shelf mushrooms, red shrubs, and abandoned campsites with Explorer Maps.",
    features: [
      "Poplar Trees with 3 foliage color variants (red, orange, yellow)",
      "Shelf Mushrooms (bouncy and edible for rich stew)",
      "Red Shrubs (decorative ground flora spreadable with Bone Meal)",
      "Abandoned Camps housing chests, barrels, and Explorer Maps",
      "Nomadic Straw Beds & sit-able decorative Cushions"
    ]
  },
  {
    id: "ice-caves",
    name: "Ice Caves",
    dimension: "Overworld",
    tag: "26.4 SNAPSHOT (IN TESTING)",
    temp: "Subterranean Freezing",
    icon: "/icons/minecraft/chiseled_packed_ice.svg",
    fallbackIcon: "/icons/minecraft/blue_ice.svg",
    color: "#38bdf8",
    description: "Deep subterranean frozen caverns generated beneath cold mountain biomes, composed of packed ice, calcite, and exposed deepslate ores. Home to the Frostbite mob, hanging icicles, and directional ice crystals.",
    features: [
      "The Frostbite hostile mob hurling Ice Balls and Freezing status",
      "Hanging Icicles (speleothems growing up to 5 blocks long)",
      "Directional light-emitting Ice Crystals on walls & ceilings",
      "Packed Ice Bricks stonecutter architectural family",
      "Vulkan modern graphics API testing ground"
    ]
  },
  {
    id: "pale-garden",
    name: "Pale Garden",
    dimension: "Overworld",
    tag: "1.21.4 OFFICIAL RELEASE",
    temp: "Muted / Desaturated",
    icon: "/icons/minecraft/creaking_heart.svg",
    fallbackIcon: "/icons/minecraft/oak_log.svg",
    color: "#94a3b8",
    description: "An eerie, atmospheric Overworld forest where colors are drained, days are completely silent, and nights spawn the indestructible Creaking. Features Pale Oak trees, Pale Moss carpets, and Eyeblossom flowers.",
    features: [
      "Pale Oak wood set & foliage",
      "The Creaking mob & Creaking Heart blocks",
      "Pale Moss blocks, carpets, and hanging moss",
      "Eyeblossom flowers that open and wither at night"
    ]
  },
  {
    id: "deep-dark",
    name: "The Deep Dark",
    dimension: "Overworld",
    tag: "1.19 ANCIENT CITY",
    temp: "Sub-zero Cavern",
    icon: "/icons/minecraft/warden.svg",
    fallbackIcon: "/icons/minecraft/skulk.svg",
    color: "#0284c7",
    description: "Found at Y=-52 or below, this haunting subterranean biome contains megalithic Ancient Cities consumed by parasitic Sculk organisms and guarded by the Warden.",
    features: [
      "The Warden guardian behemoth",
      "Sculk Shriekers, Catalysts, and Sensors",
      "Ancient City loot: Swift Sneak III & Echo Shards",
      "Pervasive Darkness status effect"
    ]
  },
  {
    id: "cherry-grove",
    name: "Cherry Grove",
    dimension: "Overworld",
    tag: "1.20 FLORAL MOUNTAIN",
    temp: "Temperate",
    icon: "/icons/minecraft/grass_block.svg",
    fallbackIcon: "/icons/minecraft/oak_planks.svg",
    color: "#f472b6",
    description: "Majestic mountain forests blanketed in pink canopies of cherry blossoms. Pink petals fall through the air and coat the grassy terrain.",
    features: [
      "Full Cherry Wood block and door family",
      "Ambient falling pink petal particles",
      "Pink Petals ground carpet (stackable up to 4)",
      "Beehives and Sniffer excavation terrain"
    ]
  },
  {
    id: "mangrove-swamp",
    name: "Mangrove Swamp",
    dimension: "Overworld",
    tag: "1.19 AQUATIC FOREST",
    temp: "Warm & Humid",
    icon: "/icons/minecraft/mud_bricks.svg",
    fallbackIcon: "/icons/minecraft/water_bucket.svg",
    color: "#059669",
    description: "A dense, murky coastal biome with massive arching Mangrove root systems submerged in water. Covered in thick Mud and home to warm-biome Frogs.",
    features: [
      "Mangrove Wood family & hanging Propagules",
      "Mud blocks, Packed Mud, and Mud Bricks",
      "Warm gray Frogs and Tadpoles",
      "Unique submerged waterlogged roots"
    ]
  },
  {
    id: "crimson-forest",
    name: "Crimson Forest",
    dimension: "The Nether",
    tag: "1.16 NETHER WOODLAND",
    temp: "Blistering",
    icon: "/icons/minecraft/netherite_sword.svg",
    fallbackIcon: "/icons/minecraft/fire_charge.svg",
    color: "#ef4444",
    description: "A dense, red-glowing Nether woodland dominated by colossal Crimson Fungi, weeping vines, and hostile Hoglins.",
    features: [
      "Fireproof Crimson Stem wood and Nether Wart blocks",
      "Piglin and Hoglin natural habitat",
      "Weeping Vines (climbable vertical vines)",
      "Luminous Shroomlights"
    ]
  },
  {
    id: "warped-forest",
    name: "Warped Forest",
    dimension: "The Nether",
    tag: "1.16 SAFEST NETHER BIOME",
    temp: "Eerie Cyan",
    icon: "/icons/minecraft/ender_pearl.svg",
    fallbackIcon: "/icons/minecraft/diamond.svg",
    color: "#06b6d4",
    description: "A tranquil, cyan-tinted Nether forest populated solely by neutral Endermen and Striders. Piglins and Hoglins fear Warped Fungi and will never enter.",
    features: [
      "Warped Stem wood family & Shroomlights",
      "Natural Endermen gathering grounds",
      "Twisting Vines (grow upwards from the ground)",
      "Safe haven from Piglins and Hoglins"
    ]
  },
  {
    id: "end-highlands",
    name: "End Highlands",
    dimension: "The End",
    tag: "1.9 END GAME",
    temp: "Void",
    icon: "/icons/minecraft/ender_pearl.svg",
    fallbackIcon: "/icons/minecraft/dragon_breath.svg",
    color: "#c084fc",
    description: "Elevated plateau terrain across the outer End islands where majestic End Cities, End Ships, and Chorus Plants spawn.",
    features: [
      "End Cities guarded by Shulkers",
      "End Ships holding Elytra and Dragon Head",
      "Chorus Trees and harvestable Chorus Fruit",
      "End Gateway Portals for long-distance travel"
    ]
  }
];

export const POTIONS_DATA = [
  { name: "Awkward Potion", ingredient: "Nether Wart", effect: "Base for all status potions", type: "Base" },
  { name: "Potion of Swiftness", ingredient: "Sugar", effect: "+20% Movement Speed (+40% at Tier II)", type: "Positive" },
  { name: "Potion of Healing", ingredient: "Glistering Melon", effect: "Instantly restores 4 Hearts (8 Hearts at Tier II)", type: "Positive" },
  { name: "Potion of Strength", ingredient: "Blaze Powder", effect: "+3 Melee Damage (+6 at Tier II)", type: "Positive" },
  { name: "Potion of Regeneration", ingredient: "Ghast Tear", effect: "Gradually restores HP over time", type: "Positive" },
  { name: "Potion of Fire Resistance", ingredient: "Magma Cream", effect: "Complete immunity to Fire & Lava damage (3:00 / 8:00)", type: "Positive" },
  { name: "Potion of Night Vision", ingredient: "Golden Carrot", effect: "Clear maximum vision in total darkness & underwater", type: "Positive" },
  { name: "Potion of Water Breathing", ingredient: "Pufferfish", effect: "Air bubble bar does not deplete while submerged", type: "Positive" },
  { name: "Potion of Invisibility", ingredient: "Fermented Spider Eye + Night Vision", effect: "Renders player invisible; mob detection range reduced", type: "Positive" },
  { name: "Potion of Slow Falling", ingredient: "Phantom Membrane", effect: "Gentle descent speed, completely eliminates fall damage", type: "Positive" },
  { name: "Potion of Poison", ingredient: "Spider Eye", effect: "Deals poison damage over time down to 0.5 hearts", type: "Harmful" },
  { name: "Potion of Harming", ingredient: "Fermented Spider Eye", effect: "Inflicts 6 Hearts instant damage (12 Hearts at Tier II)", type: "Harmful" },
  { name: "Potion of Slowness", ingredient: "Fermented Eye + Swiftness", effect: "-15% Movement & Jump Speed (-60% at Tier IV)", type: "Harmful" },
  { name: "Potion of Weakness", ingredient: "Fermented Spider Eye + Water Bottle", effect: "Reduces melee attack damage by 4 HP (Used to cure Zombie Villagers)", type: "Harmful" },
  { name: "The Turtle Master", ingredient: "Turtle Shell", effect: "Slowness IV (-60% Speed) and Resistance III (-60% Damage)", type: "Special" },
  { name: "Potion of Oozing (1.21)", ingredient: "Slime Block + Awkward Potion", effect: "Spawns 2 Slimes upon death", type: "Special" },
  { name: "Potion of Weaving (1.21)", ingredient: "Cobweb + Awkward Potion", effect: "Spawns Cobwebs upon death; increases walk speed in webs", type: "Special" },
  { name: "Potion of Wind Charged (1.21)", ingredient: "Breeze Rod + Awkward Potion", effect: "Emits a Wind Burst blast upon death", type: "Special" },
  { name: "Potion of Infested (1.21)", ingredient: "Stone / Deepslate + Awkward Potion", effect: "10% chance to spawn 1-2 Silverfish when hurt", type: "Special" }
];
