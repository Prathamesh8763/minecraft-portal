// Comprehensive Registry for Minecraft Java Edition Resource Packs & Texture Customization
// Verified against Minecraft Wiki (https://minecraft.wiki/w/Resource_pack) and Modrinth ecosystem

export const RESOURCE_PACK_CATEGORIES = [
  'All',
  'Mining & X-Ray',
  'Combat & PvP',
  'GUI & Dark Mode',
  'Visual Overhauls',
  'Vanilla+ & Tweaks',
  'Audio & Immersion'
];

export const RESOURCE_PACKS_DATABASE = [
  // MINING & X-RAY UTILITIES
  {
    id: 'xray_ultimate',
    name: 'X-Ray Ultimate',
    author: 'Filmjolk',
    category: 'Mining & X-Ray',
    resolution: '16x',
    versions: '1.8 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'The world-standard transparent mining pack with highlighted ore blocks.',
    description: 'Turns Stone, Deepslate, Netherrack, End Stone, Dirt, and Gravel completely transparent, leaving only valuable ore veins (Diamonds, Ancient Debris, Emeralds, Gold, Iron, Redstone, Coal, Lapis) visible in 3D space.',
    keyFeatures: [
      '100% transparent surrounding stone & subterranean matrix',
      'High-contrast colored border outlines on all vanilla ores',
      'Highlights Dungeons, Spawners, Strongholds, and Trial Chambers',
      'Pairs best with Fullbright / Night Vision potions'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: ['Sodium', 'Iris (Night Vision toggle)'],
    fpsImpact: 'Boosts FPS (+15% due to fewer solid rendered surfaces)',
    primaryIcon: 'diamond',
    badge: 'Legendary Mining Tool',
    downloadUrl: 'https://modrinth.com/resourcepack/xray-ultimate-1.21'
  },
  {
    id: 'visible_ores',
    name: 'Visible Ores (Glow Ores)',
    author: 'Tschipcraft',
    category: 'Mining & X-Ray',
    resolution: '16x',
    versions: '1.14 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Vibrant glowing neon borders for all vanilla ores in deep caverns.',
    description: 'Adds emissive, luminescent border outlines to all stone and deepslate ores. Essential for caving in massive 1.18+ mega-caves where ores are easily missed in the pitch black.',
    keyFeatures: [
      'Distinct color-coded borders (Cyan for Diamond, Amber for Debris, Green for Emerald, Crimson for Redstone)',
      'Emissive glow support with Continuity, OptiFine, or Iris LabPBR shaders',
      'Clean vanilla ore interior with zero ugly artifacts',
      '100% tournament & survival server safe (Non-transparent)'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: ['Continuity (Fabric)', 'OptiFine (Forge)'],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'ancient_debris',
    badge: 'Essential Survival Utility',
    downloadUrl: 'https://modrinth.com/resourcepack/visible-ores'
  },
  {
    id: 'fullbright_nightvision',
    name: 'Fullbright & Night Vision',
    author: 'Community Standard',
    category: 'Mining & X-Ray',
    resolution: '16x',
    versions: '1.7 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Permanent daylight vision underground without placing a single torch.',
    description: 'Modifies lightmap textures to eliminate darkness completely. Caves, the Nether, underwater trenches, and the Deep Dark are illuminated as if under high-noon sunlight.',
    keyFeatures: [
      'Removes all pitch-black shadows from cave exploration',
      'Eliminates the need for torches during strip mining',
      'Zero distortion to vanilla mob or block textures',
      'Works seamlessly on both Vanilla and Modded clients'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: ['Sodium', 'Iris'],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'eye_of_ender',
    badge: 'Max Visibility',
    downloadUrl: 'https://modrinth.com/resourcepack/fullbright'
  },
  {
    id: 'clean_redstone_display',
    name: 'Clean Redstone Display',
    author: 'RedstoneMechanics',
    category: 'Mining & X-Ray',
    resolution: '16x',
    versions: '1.16 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Visual power-level numbers on dust, repeater delay ticks, and hopper arrows.',
    description: 'An indispensable engineering pack for technical players. Overlays numeric power levels (0 to 15) directly onto redstone dust, shows tick delays on repeaters, and adds directional arrows to hoppers, droppers, and observers.',
    keyFeatures: [
      'Signal strength numbers (0–15) stamped on redstone wire',
      'Directional flow arrows on Hoppers, Droppers, and Observers',
      'Repeater tick delay indicator (1, 2, 3, 4 ticks clearly labeled)',
      'Note block pitch and instrument display'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: ['Sodium'],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'redstone',
    badge: 'Technical Minecraft Pro',
    downloadUrl: 'https://modrinth.com/resourcepack/clean-redstone'
  },
  {
    id: 'infested_block_detector',
    name: 'Infested Stone Highlighter',
    author: 'DungeonMaster',
    category: 'Mining & X-Ray',
    resolution: '16x',
    versions: '1.12 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Reveals sneaky Silverfish infested stone blocks in Strongholds.',
    description: 'Adds an unmistakable crackled silver tint or warning icon to Silverfish infested stone, deepslate, and stone bricks, preventing catastrophic silverfish swarm deaths in Strongholds and mountain biomes.',
    keyFeatures: [
      'Distinctive visual identifier on all 6 infested stone variants',
      'Prevents accidental silverfish nest chain reactions',
      'Life-saving utility for Hardcore mode speedruns'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: [],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'spyglass',
    badge: 'Hardcore Lifesaver',
    downloadUrl: 'https://modrinth.com/resourcepack/infested-block-highlighter'
  },

  // COMBAT & PVP OPTIMIZATION
  {
    id: 'low_fire_pack',
    name: 'Low Fire & Clean Shield',
    author: 'PvPHub',
    category: 'Combat & PvP',
    resolution: '16x',
    versions: '1.8 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Lowers screen-burning flames and shrinks bulky combat shields.',
    description: 'Replaces the blinding full-screen fire overlay with a subtle bottom-quarter flame bar. Also lowers shield positioning in first-person view so your crosshair remains completely unblocked.',
    keyFeatures: [
      'Flames occupy only the bottom 15% of your screen when on fire',
      'Shield model repositioned down to avoid blocking field of view',
      '100% tournament legal on Hypixel, Bedwars, and PvP servers',
      'Clean hit indicators with minimal particle clutter'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: ['Sodium'],
    fpsImpact: 'Boosts FPS (+5% during fire ticks)',
    primaryIcon: 'diamond_sword',
    badge: 'Competitive PvP Pick',
    downloadUrl: 'https://modrinth.com/resourcepack/low-fire'
  },
  {
    id: 'short_swords_pvp',
    name: 'Short Swords & Clean Weapons',
    author: 'Kenney & PvP Squad',
    category: 'Combat & PvP',
    resolution: '16x',
    versions: '1.8 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Shortened weapon blades for unobstructed crosshair and combo visibility.',
    description: 'Truncates Sword, Axe, Mace, and Bow item sprites in first-person hand perspective. Grants clean sightlines when tracking enemy player trajectories and executing sprint-reset critical hits.',
    keyFeatures: [
      'Shortened weapon lengths for Diamond, Netherite, and Iron blades',
      'Special 1.21 Mace compact model for aerial smash combos',
      'Clean bow draw animation with color-coded tension indicator',
      'Tighter circular crosshairs with dynamic aim pip'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: [],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'the_mace',
    badge: 'Best Combat FOV',
    downloadUrl: 'https://modrinth.com/resourcepack/short-swords'
  },
  {
    id: 'clear_water_lava',
    name: 'Crystal Clear Water & Lava',
    author: 'AquaVision',
    category: 'Combat & PvP',
    resolution: '16x',
    versions: '1.13 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Removes underwater fog and makes Nether lava translucent.',
    description: 'Clears the murky blue fog in oceans, rivers, and swamps, giving unobstructed visibility from surface to seabed. Also renders Nether lava semi-translucent to spot submerged Netherite gear.',
    keyFeatures: [
      'Crystal clear underwater sightlines without Respiration or Night Vision',
      'Transparent lava surface to spot Ancient Debris and submerged items',
      'Removes distorted water ripple shaders',
      'Perfect for Ocean Monument and Nether lava lake navigation'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: ['Sodium'],
    fpsImpact: 'Minor boost (+5% in ocean biomes)',
    primaryIcon: 'glass',
    badge: 'Ocean & Nether Utility',
    downloadUrl: 'https://modrinth.com/resourcepack/clear-water'
  },
  {
    id: 'no_pumpkin_blur',
    name: 'No Pumpkin Blur & Clear Chat',
    author: 'VanishUI',
    category: 'Combat & PvP',
    resolution: '16x',
    versions: '1.8 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Wear carved pumpkins without losing your eyesight against Endermen.',
    description: 'Completely strips away the annoying black cutout overlay when wearing a Carved Pumpkin on your head. Allows players to freely look directly at Endermen in the End dimension without provoking anger.',
    keyFeatures: [
      '100% unobstructed screen while wearing Carved Pumpkins in the End',
      'Essential for Ender Dragon fights and Enderman XP farms',
      'Removes Vignette darkening at low light levels',
      'Transparent chat background box for cleaner screen space'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: [],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'feather',
    badge: 'End Dimension Essential',
    downloadUrl: 'https://modrinth.com/resourcepack/no-pumpkin-blur'
  },

  // GUI & DARK MODE
  {
    id: 'default_dark_mode',
    name: 'Default Dark Mode',
    author: 'Neptunepink',
    category: 'GUI & Dark Mode',
    resolution: '16x',
    versions: '1.14 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Elegant dark slate UI for all containers, menus, and inventory screens.',
    description: 'Transforms Minecraft’s glaring 2011 light gray stone interface into a sleek, eye-comforting dark charcoal aesthetic. Covers Chests, Crafting Tables, Anvils, Furnaces, Smithing Tables, Villager Trading, and Pause Menus.',
    keyFeatures: [
      'Midnight charcoal container background for zero eye strain',
      'High-contrast crisp white typography and item slot borders',
      'Supports all 1.21 Crafter, Smithing, and Trial Chambers GUIs',
      'Retains 100% vanilla pixel art authenticity'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: [],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'coal',
    badge: '#1 Downloaded UI Pack',
    downloadUrl: 'https://modrinth.com/resourcepack/default-dark-mode'
  },
  {
    id: 'better_hotbar_durability',
    name: 'Visual Durability & Better Hotbar',
    author: 'ItemDoctor',
    category: 'GUI & Dark Mode',
    resolution: '16x',
    versions: '1.16 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Color-coded durability bars and clear offhand slot borders.',
    description: 'Enhances item durability indicators with distinct color gradients (Green → Yellow → Orange → Red) and pulsing critical warnings when your Netherite gear drops below 10% durability.',
    keyFeatures: [
      'High-visibility durability bars that change color dynamically',
      'Pulsing critical alert border when item is at risk of breaking',
      'Numbered hotbar slots (1 through 9) for rapid keybind training',
      'Offhand shield indicator with distinct active status'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: [],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'diamond_pickaxe',
    badge: 'Equipment Protector',
    downloadUrl: 'https://modrinth.com/resourcepack/visual-durability'
  },
  {
    id: 'transparent_containers',
    name: 'Transparent Containers UI',
    author: 'SeeThroughGUI',
    category: 'GUI & Dark Mode',
    resolution: '16x',
    versions: '1.15 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Semi-transparent chest and inventory windows to watch your surroundings.',
    description: 'Replaces opaque GUI backing plates with 50% frosted glass translucency. Enables players to monitor sneaking Creepers or incoming PvP players while looting chests or managing inventory.',
    keyFeatures: [
      'Frosted translucent backdrop on all container menus',
      'Maintains peripheral vision while crafting, smelting, or enchanting',
      'Sleek modern cyber aesthetic for HUD lovers'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: [],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'glass',
    badge: 'Situational Awareness',
    downloadUrl: 'https://modrinth.com/resourcepack/transparent-gui'
  },

  // VISUAL OVERHAULS & VANILLA+
  {
    id: 'bare_bones',
    name: 'Bare Bones',
    author: 'RobotPantaloons',
    category: 'Visual Overhauls',
    resolution: '16x',
    versions: '1.14 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'The official Minecraft promotional trailer look with vibrant flat colors.',
    description: 'Crafted specifically to make your actual game look exactly like Mojang’s animated trailers and promotional artwork! Features smooth, vibrant flat-shaded textures with zero visual noise.',
    keyFeatures: [
      'Official Mojang trailer aesthetic with crisp flat coloring',
      'Removes speckled noise from stone, dirt, foliage, and ores',
      'Vibrant saturation makes biomes feel warm and cinematic',
      'Pairs spectacularly with BSL or Complementary shaders'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: ['Sodium', 'Iris Shaders'],
    fpsImpact: 'Boosts FPS (+10% on lower-end hardware)',
    primaryIcon: 'grass_block',
    badge: 'Trailer Aesthetic Icon',
    downloadUrl: 'https://modrinth.com/resourcepack/bare-bones'
  },
  {
    id: 'faithful_32x',
    name: 'Faithful 32x / 64x',
    author: 'Faithful Team',
    category: 'Visual Overhauls',
    resolution: '32x / 64x',
    versions: '1.5 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Classic vanilla textures scaled up with doubled pixel definition.',
    description: 'The most revered texture pack in Minecraft history. Faithfully doubles the pixel grid from 16x16 to 32x32, retaining every nuance, hue, and charm of vanilla textures while delivering ultra-crisp resolution.',
    keyFeatures: [
      'Exact 2x vanilla pixel density with flawless color matching',
      'Ultra-sharp typography, items, blocks, and entities',
      'Continuous active updates supporting all 1.21 Tricky Trials blocks',
      'Available in 32x and 64x resolutions'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: ['Sodium'],
    fpsImpact: 'Negligible on modern GPUs (-2% FPS)',
    primaryIcon: 'enchanted_golden_apple',
    badge: 'Community Gold Standard',
    downloadUrl: 'https://faithfulpack.net/'
  },
  {
    id: 'fresh_animations',
    name: 'Fresh Animations',
    author: 'FreshLX',
    category: 'Visual Overhauls',
    resolution: '16x',
    versions: '1.16 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Dynamic mob breathing, facial expressions, eye-blinking, and run cycles.',
    description: 'Revolutionizes Minecraft creature animation. Uses custom entity models to give Zombies staggered shambles, Creepers frantic breathing, Villagers expressive eyebrows, and Skeletons fluid bow aim.',
    keyFeatures: [
      'Living facial expressions: blinking eyes, moving mouths, and emotional reactions',
      'Dynamic walk cycles and head tilts matching movement speed',
      'Full coverage for over 40+ vanilla creatures',
      'Requires Entity Model Features (EMF) on Fabric or OptiFine on Forge'
    ],
    requiresOptiFineOrIris: true,
    recommendedMods: ['Entity Model Features (EMF)', 'Entity Texture Features (ETF)'],
    fpsImpact: 'Minor (-3% in large mob farms)',
    primaryIcon: 'creeper_head',
    badge: 'Best Creature Animation',
    downloadUrl: 'https://modrinth.com/resourcepack/fresh-animations'
  },
  {
    id: 'stay_true',
    name: 'Stay True',
    author: 'Trislux',
    category: 'Vanilla+ & Tweaks',
    resolution: '16x',
    versions: '1.14 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Organic color corrections, connected textures, and subtle 3D block models.',
    description: 'A masterpiece of Vanilla+ design. Refines color palettes, adds natural rotational variations to stone and dirt, and connects glass and sandstone into seamless architectural structures.',
    keyFeatures: [
      'Natural foliage transitions with bushier birch and oak leaves',
      'Subtle 3D models on Sugar Cane, Crops, Rails, and Bookshelves',
      'Connected textures for polished stones and glass',
      '100% compatible with existing build palettes'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: ['Continuity'],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'oak_sapling',
    badge: 'Vanilla+ Masterpiece',
    downloadUrl: 'https://modrinth.com/resourcepack/stay-true'
  },
  {
    id: 'clean_connected_glass',
    name: 'Connected Clean Glass',
    author: 'ClearVision Labs',
    category: 'Vanilla+ & Tweaks',
    resolution: '16x',
    versions: '1.16 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Removes ugly center glass streaks and seamlessly links glass panes.',
    description: 'Eliminates the annoying glare streaks across glass blocks and uses connected texture metadata (CTM) to merge adjacent glass blocks into solid, seamless window panes.',
    keyFeatures: [
      'Removes all cloudy visual streaks from clear and stained glass',
      'Connects glass edges seamlessly with adjacent glass blocks',
      'Transforms modern building architecture and skyscrapers',
      'Compatible with Continuity (Fabric) and OptiFine (Forge)'
    ],
    requiresOptiFineOrIris: true,
    recommendedMods: ['Continuity (Fabric)'],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'glass',
    badge: 'Builder Must-Have',
    downloadUrl: 'https://modrinth.com/resourcepack/connected-glass'
  },
  {
    id: 'dramatic_skys',
    name: 'Dramatic Skys HD',
    author: 'The_Spruce_Guy',
    category: 'Visual Overhauls',
    resolution: 'HD Custom Sky',
    versions: '1.8 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Photorealistic starry night skies, auroras, and breathtaking sunrises.',
    description: 'Replaces the flat celestial skybox with high-resolution astronomical panoramas featuring the Milky Way galaxy, aurora borealis, realistic moon phases, and glowing twilight horizons.',
    keyFeatures: [
      'Breathtaking 360-degree night sky with glowing constellations and nebulae',
      'Dynamic day/night transition gradients',
      'Zero performance impact compared to heavy shader packs',
      'Works seamlessly with Sodium and Iris Custom Skyboxes'
    ],
    requiresOptiFineOrIris: true,
    recommendedMods: ['FabricSkyBoxes (Fabric)', 'Iris (Fabric)'],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'nether_star',
    badge: 'Cosmic Skybox',
    downloadUrl: 'https://modrinth.com/resourcepack/dramatic-skys'
  },
  {
    id: 'threed_crops_enhanced',
    name: '3D Crops & Enhanced Models',
    author: 'VoxelCraft',
    category: 'Vanilla+ & Tweaks',
    resolution: '16x 3D',
    versions: '1.16 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Volumetric 3D voxel models for Wheat, Carrots, Potatoes, and Chains.',
    description: 'Transforms flat 2D sprite cross-planes (crops, rails, chains, ladders, and lanterns) into rich volumetric 3D voxel models, turning agricultural farms into lush gardens.',
    keyFeatures: [
      '3D stalks, leaves, and vegetable tubers for all farm crops',
      'Volumetric chains and hanging lantern brackets',
      'Deep railway ties and raised iron rails',
      'Pure vanilla JSON model implementation (No mods required!)'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: [],
    fpsImpact: 'Minor (-2% in massive 10,000-block crop farms)',
    primaryIcon: 'wheat',
    badge: 'Voxel Detail',
    downloadUrl: 'https://modrinth.com/resourcepack/3d-crops'
  },

  // AUDIO & IMMERSION
  {
    id: 'presence_footsteps',
    name: 'Presence Footsteps (Sound Pack)',
    author: 'Sollace',
    category: 'Audio & Immersion',
    resolution: 'Audio',
    versions: '1.14 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Hyper-realistic acoustics and footstep sounds tailored to every block type.',
    description: 'Replaces Minecraft’s generic hollow steps with rich acoustic footstep audio. Differentiates walking on deepslate tiles, wet mud, hollow wooden planks, crunching leaves, and snow drifts.',
    keyFeatures: [
      'Over 200+ nuanced footstep acoustics based on armor weight and block hardness',
      'Special acoustics for jumping, landing, sprinting, and ladder climbing',
      'Massively enhances audio feedback and subterranean immersion'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: ['Presence Footsteps Mod (Fabric/NeoForge)'],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'diamond_boots',
    badge: 'Audio Masterpiece',
    downloadUrl: 'https://modrinth.com/mod/presence-footsteps'
  },
  {
    id: 'nostalgia_craft_audio',
    name: 'Nostalgia-Craft: Classic Alpha Audio',
    author: 'OldSchoolCrafter',
    category: 'Audio & Immersion',
    resolution: 'Audio',
    versions: '1.12 – 1.21+',
    packFormat: 'Format 34 (1.21+)',
    tagline: 'Restores the legendary 2010 Alpha "OOF!" hurt sound and classic door slams.',
    description: 'Transports players back to the golden era of Alpha/Beta Minecraft. Restores the iconic visceral "OOF!" player hurt sound, punchy wooden door clicks, classic bow twangs, and original explosion audio.',
    keyFeatures: [
      'Legendary classic "OOF!" player damage vocalization',
      'Alpha sound effects for doors, chests, explosions, and arrows',
      'Optional classic saturated green grass and neon foliage colors',
      '100% nostalgia guaranteed for veteran players'
    ],
    requiresOptiFineOrIris: false,
    recommendedMods: [],
    fpsImpact: 'Negligible (0% impact)',
    primaryIcon: 'experience_bottle',
    badge: '2010 Retro Gold',
    downloadUrl: 'https://modrinth.com/resourcepack/nostalgia-craft'
  }
];

// Pack Format Versions Table (Section 3 of Technical Guide)
export const PACK_FORMAT_TABLE = [
  { version: '1.21.4 (Winter Drop)', packFormat: 46, release: 'Late 2024–2026', notes: 'Modern component-based texture atlas & sound events.' },
  { version: '1.21.2 – 1.21.3', packFormat: 42, release: '2024', notes: 'Bundles & items UI updates.' },
  { version: '1.21 – 1.21.1', packFormat: 34, release: 'June 2024', notes: 'Tricky Trials, Mace model, Crafter GUI, and Trial Spawner textures.' },
  { version: '1.20.5 – 1.20.6', packFormat: 32, release: 'April 2024', notes: 'Armadillo, Wolf armor, and Data Components overhaul.' },
  { version: '1.20.3 – 1.20.4', packFormat: 22, release: 'December 2023', notes: 'Breeze mob models and decorated pot patterns.' },
  { version: '1.20 – 1.20.1', packFormat: 15, release: 'June 2023', notes: 'Trails & Tales, Cherry wood, Armor Trims, Sniffer.' },
  { version: '1.19.4', packFormat: 13, release: 'March 2023', notes: 'Display entities & cherry grove preview.' },
  { version: '1.19.3', packFormat: 12, release: 'December 2022', notes: 'Custom creative inventory tabs.' },
  { version: '1.19 – 1.19.2', packFormat: 9, release: 'June 2022', notes: 'The Wild Update: Warden, Deep Dark, Mangrove wood.' },
  { version: '1.18 – 1.18.2', packFormat: 8, release: 'November 2021', notes: 'Caves & Cliffs Part II terrain textures.' },
  { version: '1.17 – 1.17.1', packFormat: 7, release: 'June 2021', notes: 'Caves & Cliffs Part I (Copper, Amethyst, Deepslate).' },
  { version: '1.16.2 – 1.16.5', packFormat: 6, release: 'August 2020', notes: 'Piglin Brutes & custom dimension biomes.' },
  { version: '1.16 – 1.16.1', packFormat: 5, release: 'June 2020', notes: 'Nether Update (Netherite, Crimson/Warped, Basalt).' },
  { version: '1.15 – 1.15.2', packFormat: 5, release: 'December 2019', notes: 'Buzzy Bees & Honey blocks.' },
  { version: '1.14 – 1.14.4', packFormat: 4, release: 'April 2019', notes: 'Village & Pillage overhaul, texture re-stitch.' },
  { version: '1.13 – 1.13.2', packFormat: 4, release: 'July 2018', notes: 'Update Aquatic & The Flattening (numerical IDs removed).' },
  { version: '1.11 – 1.12.2', packFormat: 3, release: '2016–2017', notes: 'Exploration & World of Color (Glazed Terracotta, Shulkers).' },
  { version: '1.9 – 1.10.2', packFormat: 2, release: '2016', notes: 'Combat Update & Frostburn.' },
  { version: '1.6.1 – 1.8.9', packFormat: 1, release: 'July 2013', notes: 'Original conversion from "Texture Packs" to "Resource Packs".' }
];

// Anatomy of pack.mcmeta and Directory Tree
export const PACK_STRUCTURE_CODE = {
  mcmetaExample: `{
  "pack": {
    "pack_format": 34,
    "description": "§dCustom Survival Tweaks §7- §a1.21 Tricky Trials §fby Player"
  }
}`,
  folderTree: `MyResourcePack/
├── pack.mcmeta                 # Mandatory JSON configuration file
├── pack.png                    # Optional 64x64 or 128x128 pack thumbnail icon
└── assets/
    └── minecraft/
        ├── textures/
        │   ├── block/          # Stone, deepslate_diamond_ore, ancient_debris.png
        │   ├── item/           # the_mace, diamond_sword, bow.png
        │   ├── entity/         # creeper, zombie, villager textures
        │   ├── gui/            # container/, title/, sprites/ (dark mode UI)
        │   └── environment/    # clouds, skyboxes, weather
        ├── models/
        │   ├── block/          # Custom 3D voxel models (.json)
        │   └── item/           # Custom weapon & tool models (.json)
        ├── sounds/             # Custom .ogg audio files
        └── sounds.json         # Custom sound event bindings`
};

// Hotkeys and in-game shortcuts
export const RESOURCE_PACK_HOTKEYS = [
  { key: 'F3 + T', description: 'Reloads all active resource packs and texture atlases in-game without restarting Minecraft.' },
  { key: 'F3 + S', description: 'Forces the internal sound engine to reload all custom .ogg sound files.' },
  { key: 'F3 + A', description: 'Reloads all rendered world chunks and block model geometries.' },
  { key: 'F3 + B', description: 'Toggles visible bounding boxes / hitboxes on all living entities and players.' }
];
