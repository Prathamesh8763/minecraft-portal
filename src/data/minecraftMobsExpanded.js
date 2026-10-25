// Comprehensive Registry for Minecraft Java Edition Mobs & Creature Ecology
// Verified against official Minecraft Wiki (https://minecraft.wiki/w/Mob)

export const SPAWNING_RULES = {
  hostileCycle: 'Every game tick (1/20th of a second)',
  passiveCycle: 'Every 400 game ticks (once every 20 seconds)',
  mobCaps: {
    hostile: '70 per player (70 × chunks / 289)',
    passive: '10 animals',
    ambient: '15 bats',
    axolotls: '5 axolotls',
    waterUnderground: '5 glow squid',
    waterCreatures: '5 dolphins/squid'
  },
  distanceSpheres: [
    {
      range: '0 to 24 blocks',
      title: 'Player Safe Zone',
      rule: 'No natural mob spawning can occur within 24 blocks Euclidean distance of any player (except Monster Spawners).'
    },
    {
      range: '24 to 32 blocks',
      title: 'Active Spawning & Full AI',
      rule: 'Mobs spawn and maintain full pathfinding AI. Mobs wander, target players, and never despawn randomly.'
    },
    {
      range: '32 to 128 blocks',
      title: 'Idle & Random Despawn Zone',
      rule: 'Mobs do not move after 20 seconds of no player interaction. Each tick, mobs have a 1 in 800 chance (~every 40s) of instantly despawning.'
    },
    {
      range: 'Beyond 128 blocks',
      title: 'Instant Despawn Horizon',
      rule: 'Any mob outside 128 blocks from all players immediately despawns on the exact same tick.'
    }
  ],
  lightLevelRule: 'Java 1.18+ Rule: Hostile monsters require Block Light Level = 0 to spawn naturally (down from level ≤ 7). Sky light does not block nighttime spawns. Nether mobs can spawn up to Light Level 11.',
  persistentExemptions: [
    'Name-tagged mobs never despawn under any circumstance.',
    'Mobs that have picked up dropped player equipment (armor, weapons, shields).',
    'Tamed animals (Wolves, Cats, Parrots, Horses).',
    'Boss mobs (Ender Dragon, The Wither, Elder Guardian).',
    'Mobs spawned from spawn eggs or commands (unless persistent:0).'
  ]
};

export const BEHAVIOR_MECHANICS = [
  {
    category: 'Pathfinding & Navigation',
    icon: 'compass',
    rules: [
      'Hazard Avoidance: Mobs pathfind around fire, open lava, sweet berry bushes, cacti, and powder snow.',
      'Rail Obstruction: Hostile mobs treat Minecart Rails as solid walls and will almost never pathfind across them.',
      'Trapdoor Deception: Mobs consider open trapdoors as full walkable blocks, making them fall into mob farm pits.',
      'Turtle Egg Stomping: Zombies, Husks, and Drowned prioritize seeking and jumping on Sniffer/Turtle eggs over chasing distant players.'
    ]
  },
  {
    category: 'Fear & Fleeing Reactions',
    icon: 'shield_alert',
    rules: [
      'Creepers & Phantoms flee from Cats and Ocelots (retreating 6–16 blocks away).',
      'Skeletons and Strays flee from tamed and wild Wolves.',
      'Piglins flee from Soul Fire, Soul Torches, Soul Campfires, and Zombified Piglins.',
      'Hoglins flee from Nether Portals and Respawn Anchors.'
    ]
  },
  {
    category: 'Pack Aggression & Revenge Targeting',
    icon: 'swords',
    rules: [
      'Revenge Targeting: Attacking a Zombified Piglin alerts all fellow Zombified Piglins within a 67-block spherical radius for 20 to 39 seconds.',
      'Wild Wolves: Hitting one wild wolf causes the entire pack within 33 blocks to turn hostile with glowing red eyes.',
      'Warden Anger Matrix: The Warden accumulates anger points (0 to 80) from sculk vibrations and scent sniffing. At 80 anger, it enters full roar rage.'
    ]
  }
];

export const ALL_MOBS_CATALOG = [
  // =========================================================================
  // 3.1 PASSIVE MOBS
  // =========================================================================
  {
    id: 'allay',
    name: 'Allay',
    type: 'Passive',
    category: '3.1 Passive mobs',
    health: '20 HP (10 Hearts)',
    dimension: 'Overworld (Pillager Outposts & Mansions)',
    drops: 'Held items',
    classification: 'Non-undead',
    knockbackRes: '0%',
    damage: 'Passive (0 damage)',
    icon: 'allay_spawn_egg',
    desc: 'Luminescent friendly sprite that collects matching dropped items from the ground and delivers them to the player or note blocks.',
    breeding: 'Duplicated with Amethyst Shard while dancing to a Jukebox',
    version: '1.19'
  },
  {
    id: 'armadillo',
    name: 'Armadillo',
    type: 'Passive',
    category: '3.1 Passive mobs',
    health: '12 HP (6 Hearts)',
    dimension: 'Overworld (Savannas & Badlands)',
    drops: 'Armadillo Scute (brushing)',
    classification: 'Non-undead',
    knockbackRes: '0% (High armor while curled)',
    damage: 'Passive (0 damage)',
    icon: 'leather',
    desc: 'Winner of the 2023 Mob Vote! Curls into an impenetrable protective shell when sensing sprinting players, undead mobs, or vibrations. Brushing it yields scutes for Wolf Armor.',
    breeding: 'Spider Eyes',
    version: '1.20.5'
  },
  {
    id: 'axolotl',
    name: 'Axolotl',
    type: 'Passive',
    category: '3.1 Passive mobs',
    health: '14 HP (7 Hearts)',
    dimension: 'Overworld (Lush Caves)',
    drops: 'None',
    classification: 'Aquatic',
    knockbackRes: '0%',
    damage: '2 HP (Attacks aquatic hostiles)',
    icon: 'axolotl_spawn_egg',
    desc: 'Amphibious predator of the Lush Caves. Attacks drowned and guardians, plays dead when injured to regenerate health, and grants players Regeneration and Haste.',
    breeding: 'Tropical Fish Buckets',
    version: '1.17'
  },
  {
    id: 'camel',
    name: 'Camel',
    type: 'Passive',
    category: '3.1 Passive mobs',
    health: '32 HP (16 Hearts)',
    dimension: 'Overworld (Desert Villages)',
    drops: 'Saddle',
    classification: 'Non-undead',
    knockbackRes: '0%',
    damage: 'Passive (0 damage)',
    icon: 'leather',
    desc: 'Tall two-player desert mount. Its towering height prevents standard zombies and husks from reaching the riders, and its dash sprint clears 12-block chasms.',
    breeding: 'Cactus',
    version: '1.20'
  },
  {
    id: 'cat',
    name: 'Cat',
    type: 'Passive',
    category: '3.1 Passive mobs',
    health: '10 HP (5 Hearts)',
    dimension: 'Overworld (Villages & Swamp Huts)',
    drops: 'String (0-2)',
    classification: 'Non-undead',
    knockbackRes: '0%',
    damage: 'Passive (0 damage)',
    icon: 'string',
    desc: 'Tamable domestic companion. Wards off Creepers and Phantoms, is immune to fall damage, and brings players morning gifts while sleeping on beds.',
    breeding: 'Raw Cod, Raw Salmon',
    version: '1.14'
  },
  {
    id: 'chicken',
    name: 'Chicken',
    type: 'Passive',
    category: '3.1 Passive mobs',
    health: '4 HP (2 Hearts)',
    dimension: 'Overworld',
    drops: 'Raw Chicken, Feathers, Eggs',
    classification: 'Non-undead',
    knockbackRes: '0%',
    damage: 'Passive (0 damage)',
    icon: 'feather',
    desc: 'Classic passive animal. Flaps its wings to descend slowly without taking fall damage. Lays an egg every 5 to 10 minutes.',
    breeding: 'Seeds (Wheat, Melon, Pumpkin, Beetroot)',
    version: 'Alpha'
  },
  {
    id: 'cow',
    name: 'Cow',
    type: 'Passive',
    category: '3.1 Passive mobs',
    health: '10 HP (5 Hearts)',
    dimension: 'Overworld',
    drops: 'Raw Beef, Leather, Milk (bucket)',
    classification: 'Non-undead',
    knockbackRes: '0%',
    damage: 'Passive (0 damage)',
    icon: 'leather',
    desc: 'Essential pasture animal for survival. Milking it with an empty bucket provides Milk to instantly cure status effects.',
    breeding: 'Wheat',
    version: 'Alpha'
  },
  {
    id: 'frog',
    name: 'Frog',
    type: 'Passive',
    category: '3.1 Passive mobs',
    health: '10 HP (5 Hearts)',
    dimension: 'Overworld (Swamps & Mangroves)',
    drops: 'Froglight (Ochre, Pearlescent, Verdant)',
    classification: 'Non-undead',
    knockbackRes: '0%',
    damage: 'Eats small slimes/magma cubes',
    icon: 'slime_ball',
    desc: 'Jumping amphibian available in Temperate, Warm, and Cold variants. Consuming small Magma Cubes produces luminous Froglight blocks!',
    breeding: 'Slimeballs',
    version: '1.19'
  },
  {
    id: 'sniffer',
    name: 'Sniffer',
    type: 'Passive',
    category: '3.1 Passive mobs',
    health: '14 HP (7 Hearts)',
    dimension: 'Overworld (Hatched from Sniffer Egg)',
    drops: 'Torchflower Seeds, Pitcher Pods',
    classification: 'Ancient Passive',
    knockbackRes: '0%',
    damage: 'Passive (0 damage)',
    icon: 'feather',
    desc: 'Winner of the 2022 Mob Vote. Massive ancient beast hatched from Warm Ocean ruins eggs. Sniffs the ground to excavate prehistoric seeds.',
    breeding: 'Torchflower Seeds',
    version: '1.20'
  },
  {
    id: 'villager',
    name: 'Villager',
    type: 'Passive',
    category: '3.1 Passive mobs',
    health: '20 HP (10 Hearts)',
    dimension: 'Overworld (Villages)',
    drops: 'None',
    classification: 'Humanoid',
    knockbackRes: '0%',
    damage: 'Passive (0 damage)',
    icon: 'emerald',
    desc: 'Intelligent peaceful inhabitants of villages. Can take on 13 unique trade professions, sleep in beds, socialize, and breed when supplied with bread or carrots.',
    breeding: 'Bread, Carrots, Potatoes, Beetroots',
    version: 'Beta 1.9'
  },

  // =========================================================================
  // 3.2 NEUTRAL MOBS
  // =========================================================================
  {
    id: 'bee',
    name: 'Bee',
    type: 'Neutral',
    category: '3.2 Neutral mobs',
    health: '10 HP (5 Hearts)',
    dimension: 'Overworld (Forests & Plains)',
    drops: 'None',
    classification: 'Arthropod',
    knockbackRes: '0%',
    damage: 'Easy: 2 HP | Normal: 2 HP + Poison (10s) | Hard: 3 HP + Poison (18s)',
    icon: 'bee_spawn_egg',
    desc: 'Flying pollinator that gathers pollen from flowers to produce Honey and Honeycomb in Beehives. Stinging causes its stinger to detach, leading to its death shortly after.',
    breeding: 'Flowers',
    version: '1.15'
  },
  {
    id: 'enderman',
    name: 'Enderman',
    type: 'Neutral',
    category: '3.2 Neutral mobs',
    health: '40 HP (20 Hearts)',
    dimension: 'Overworld, Nether, The End',
    drops: 'Ender Pearls (0-1)',
    classification: 'End Mob',
    knockbackRes: '0%',
    damage: 'Easy: 4.5 HP | Normal: 7 HP | Hard: 10.5 HP (5.25 Hearts)',
    icon: 'ender_pearl',
    desc: 'Tall mysterious shadow creature. Provoked by players looking directly into its eyes or attacking it. Teleports away from water and ranged projectiles; moves certain blocks.',
    breeding: 'Cannot be bred',
    version: 'Beta 1.8'
  },
  {
    id: 'iron_golem',
    name: 'Iron Golem',
    type: 'Neutral',
    category: '3.2 Neutral mobs',
    health: '100 HP (50 Hearts)',
    dimension: 'Overworld (Villages / Player Created)',
    drops: 'Iron Ingots (3-5), Poppies (0-2)',
    classification: 'Construct',
    knockbackRes: '100% (Immune to Knockback)',
    damage: 'Easy: 7.5–12.5 HP | Normal: 11–21.5 HP | Hard: 16.5–32.5 HP',
    icon: 'iron_ingot',
    desc: 'Massive hulking protector constructed from 4 Iron Blocks and a Carved Pumpkin. Hurls hostile mobs high into the air with devastating vertical smash strikes.',
    breeding: 'Built with Iron Blocks + Pumpkin',
    version: '1.2.1'
  },
  {
    id: 'piglin',
    name: 'Piglin',
    type: 'Neutral',
    category: '3.2 Neutral mobs',
    health: '16 HP (8 Hearts)',
    dimension: 'The Nether (Crimson Forests & Bastions)',
    drops: 'Crossbow, Golden Sword, Raw Porkchop',
    classification: 'Nether Humanoid',
    knockbackRes: '0%',
    damage: 'Easy: 3 HP | Normal: 5 HP | Hard: 8 HP',
    icon: 'raw_gold',
    desc: 'Gold-obsessed Nether inhabitants. Neutral if the player is wearing at least one piece of gold armor. Barters valuable items when tossed Gold Ingots.',
    breeding: 'Cannot be bred',
    version: '1.16'
  },
  {
    id: 'wolf',
    name: 'Wolf (9 Biome Variants)',
    type: 'Neutral',
    category: '3.2 Neutral mobs',
    health: 'Wild: 8 HP | Tamed: 40 HP (20 Hearts)',
    dimension: 'Overworld (Taiga, Woods, Badlands, Savanna)',
    drops: 'None',
    classification: 'Canine',
    knockbackRes: '0%',
    damage: 'Wild: 3–4 HP | Tamed: 4 HP (Wolf Armor equipped)',
    icon: 'bone',
    desc: 'Loyal companion tamed with Bones. In 1.20.5, received 9 unique regional fur variants and equipable custom dyed Wolf Armor crafted from Armadillo scutes.',
    breeding: 'Any cooked or raw meat',
    version: 'Beta 1.4 / 1.20.5'
  },
  {
    id: 'zombified_piglin',
    name: 'Zombified Piglin',
    type: 'Neutral',
    category: '3.2 Neutral mobs',
    health: '20 HP (10 Hearts)',
    dimension: 'The Nether & Overworld Portals',
    drops: 'Rotten Flesh, Gold Nuggets, Gold Ingots',
    classification: 'Undead Nether Mob',
    knockbackRes: '0%',
    damage: 'Easy: 5 HP | Normal: 8 HP | Hard: 12 HP (6 Hearts)',
    icon: 'rotten_flesh',
    desc: 'Immune to fire and lava. Harbors no malice until provoked; attacking one enrages every Zombified Piglin within 67 blocks to swarm the attacker.',
    breeding: 'Cannot be bred',
    version: 'Alpha / 1.16'
  },

  // =========================================================================
  // 3.3 HOSTILE MOBS & BOSSES
  // =========================================================================
  {
    id: 'the_breeze',
    name: 'The Breeze',
    type: 'Hostile',
    category: '3.3 Hostile mobs',
    health: '30 HP (15 Hearts)',
    dimension: 'Overworld (Trial Chambers)',
    drops: 'Breeze Rods (1-2)',
    classification: 'Trial Chamber Entity',
    knockbackRes: '0% (Deflects arrows)',
    damage: '1.5–3 HP + Wind Charge explosion knockback',
    icon: 'wind_charge',
    desc: '1.21 Tricky Trials Champion! Spiraling wind entity that leaps continuously around arenas, deflecting all projectile arrows and launching Wind Charges that trigger traps.',
    breeding: 'Trial Spawner only',
    version: '1.21 Tricky Trials'
  },
  {
    id: 'the_bogged',
    name: 'The Bogged',
    type: 'Hostile',
    category: '3.3 Hostile mobs',
    health: '16 HP (8 Hearts)',
    dimension: 'Overworld (Swamps & Trial Chambers)',
    drops: 'Poison-tipped Arrows, Bones, Mushrooms (sheared)',
    classification: 'Undead Skeleton Variant',
    knockbackRes: '0%',
    damage: 'Easy: 2 HP + Poison (2s) | Normal: 3 HP + Poison (4s) | Hard: 4 HP + Poison (5s)',
    icon: 'bone',
    desc: '1.21 Mossy Skeleton variant. Shoots lethal poison-tipped arrows. Players can use Shears on it to shear off brown and red mushrooms!',
    breeding: 'Natural spawn only',
    version: '1.21 Tricky Trials'
  },
  {
    id: 'the_warden',
    name: 'The Warden',
    type: 'Hostile',
    category: '3.3 Hostile mobs',
    health: '500 HP (250 Hearts)',
    dimension: 'Overworld (Deep Dark)',
    drops: 'Sculk Catalyst (1)',
    classification: 'Ancient Sculk Horror',
    knockbackRes: '100% (Immune to Knockback)',
    damage: 'Easy: 16 HP | Normal: 30 HP (15 Hearts) | Hard: 45 HP (22.5 Hearts)! Sonic Boom: 10 HP unblockable',
    icon: 'warden',
    desc: 'Blind guardian of the Deep Dark summoned by Sculk Shriekers. Navigates by detecting sound vibrations and smelling players. Unleashes an armor-piercing Sonic Boom.',
    breeding: 'Summoned by 4 Sculk Shrieker activations',
    version: '1.19'
  },
  {
    id: 'creeper',
    name: 'Creeper',
    type: 'Hostile',
    category: '3.3 Hostile mobs',
    health: '20 HP (10 Hearts)',
    dimension: 'Overworld',
    drops: 'Gunpowder (0-2), Music Discs (killed by skeleton)',
    classification: 'Silent Kamikaze',
    knockbackRes: '0%',
    damage: 'Point-blank: Easy 22.5 HP | Normal 43 HP | Hard 64.5 HP (Charged: 97.5 HP!)',
    icon: 'creeper_head',
    desc: 'Iconic Minecraft mascot. Silently approaches players and explodes with a 1.5s fuse. Charged Creepers struck by lightning drop Mob Heads when killing mobs.',
    breeding: 'Natural spawn only',
    version: 'Classic 0.24'
  },
  {
    id: 'wither_boss',
    name: 'The Wither',
    type: 'Boss',
    category: '3.3.1 Boss mobs',
    health: '300 HP (Java) / 600 HP (Bedrock)',
    dimension: 'Any Dimension (Player Summoned)',
    drops: 'Nether Star (1), 50 XP',
    classification: 'Undead Boss',
    knockbackRes: '100% (Immune to Knockback)',
    damage: 'Easy: 5 HP | Normal: 8 HP + Wither II (10s) | Hard: 12 HP + Wither II (40s)',
    icon: 'nether_star',
    desc: 'Summoned using 4 Soul Sand in a T-shape and 3 Wither Skeleton Skulls. Barrages players with explosive skulls and gains projectile immunity at 50% health.',
    breeding: 'Constructed by player',
    version: '1.4.2 Pretty Scary Update'
  },
  {
    id: 'ender_dragon',
    name: 'Ender Dragon',
    type: 'Boss',
    category: '3.3.1 Boss mobs',
    health: '200 HP (100 Hearts)',
    dimension: 'The End',
    drops: 'Dragon Egg (first kill), 12,000 XP',
    classification: 'Draconic Boss',
    knockbackRes: '100% (Immune to Knockback)',
    damage: 'Melee: 10 HP | Dragon Breath: 6 HP/sec magic cloud | Wing charge: launches player',
    icon: 'dragon_head',
    desc: 'The final ruler of The End dimension. Regenerates from End Crystals atop obsidian pillars. Perches at the central bedrock exit portal where critical melee damage can be dealt.',
    breeding: 'Resummoned with 4 End Crystals on portal',
    version: 'Java 1.0.0'
  },
  {
    id: 'elder_guardian',
    name: 'Elder Guardian',
    type: 'Boss',
    category: '3.3.1 Boss mobs',
    health: '80 HP (40 Hearts)',
    dimension: 'Overworld (Ocean Monuments)',
    drops: 'Wet Sponge, Prismarine Shards, Raw Cod',
    classification: 'Aquatic Mini-Boss',
    knockbackRes: '100% (Immune to Knockback)',
    damage: 'Laser: 8–12 HP | Spikes: 2 HP reflection',
    icon: 'wet_sponge',
    desc: 'Pale ghostly guardian commanding Ocean Monuments. Inflicts Mining Fatigue III on all players within 50 blocks, preventing mining until slain.',
    breeding: 'Natural monument spawn (3 per monument)',
    version: '1.8'
  },

  // =========================================================================
  // 3.4 UPCOMING MOBS
  // =========================================================================
  {
    id: 'the_creaking',
    name: 'The Creaking',
    type: 'Upcoming',
    category: '3.4 Upcoming mobs',
    health: 'Indestructible Body (Bound to Creaking Heart)',
    dimension: 'Overworld (Pale Garden Biome)',
    drops: 'Resin Clumps (when heart broken)',
    classification: 'Arboreal Terror',
    knockbackRes: '100%',
    damage: 'Easy: 2 HP | Normal: 3 HP | Hard: 4.5 HP',
    icon: 'oak_sapling',
    desc: '2024–2026 Winter Drop entity! Haunts the eerie Pale Garden. Completely freezes in place while being looked at; attacks swiftly in darkness. Takes zero damage from weapons—players must find and destroy its Creaking Heart block!',
    breeding: 'Creaking Heart',
    version: '1.21.4 (Winter Drop)'
  },

  // =========================================================================
  // 3.5 CREATORS OR EDUCATION EDITION MOBS
  // =========================================================================
  {
    id: 'agent',
    name: 'The Agent',
    type: 'Education',
    category: '3.5 Creators or Education mobs',
    health: 'Indestructible',
    dimension: 'Education Edition & Bedrock',
    drops: 'None',
    classification: 'Code Companion',
    knockbackRes: '100%',
    damage: '0 HP (Executes Python / MakeCode)',
    icon: 'redstone',
    desc: 'A programmable robotic avatar in Minecraft Education Edition. Follows coding scripts written in JavaScript, Python, or Block-based code to dig mines, construct skyscrapers, and harvest crops.',
    breeding: 'Programmed by student',
    version: 'Education Edition'
  },
  {
    id: 'npc',
    name: 'NPC (Non-Player Character)',
    type: 'Education',
    category: '3.5 Creators or Education mobs',
    health: 'Invulnerable',
    dimension: 'Education & Bedrock Creator Mode',
    drops: 'None',
    classification: 'World Builder Tool',
    knockbackRes: '100%',
    damage: '0 HP',
    icon: 'emerald',
    desc: 'Customizable quest-giver and dialogue entity. Mapmakers and educators can customize its 3D skin, display formatted dialogue, and attach clickable URLs or console commands.',
    breeding: 'Spawned via /summon npc',
    version: 'Education / Bedrock'
  },

  // =========================================================================
  // 3.6 CHINA EDITION EXCLUSIVE MOBS
  // =========================================================================
  {
    id: 'chinese_dragon',
    name: 'Chinese Loong Dragon',
    type: 'China Exclusive',
    category: '3.6 China Edition exclusive mobs',
    health: '150 HP',
    dimension: 'NetEase China Edition',
    drops: 'Dragon Scales, Firework Essence',
    classification: 'Mythical Beast',
    knockbackRes: '80%',
    damage: '15 HP Fire Breath',
    icon: 'dragon_head',
    desc: 'A grand serpentine oriental dragon exclusive to the NetEase Minecraft China Edition. Rides clouds and blesses players with festival gifts during Lunar New Year celebrations.',
    breeding: 'Mythical event',
    version: 'China Edition'
  },
  {
    id: 'red_panda',
    name: 'Red Panda (China Edition)',
    type: 'China Exclusive',
    category: '3.6 China Edition exclusive mobs',
    health: '12 HP',
    dimension: 'Bamboo Jungles (China Edition)',
    drops: 'Bamboo',
    classification: 'Passive Animal',
    knockbackRes: '0%',
    damage: 'Passive',
    icon: 'bamboo',
    desc: 'Fluffy arboreal animal with reddish-brown fur and a bushy ringed tail. Climbs bamboo stalks and performs playful standing intimidation displays.',
    breeding: 'Bamboo, Sweet Berries',
    version: 'China Edition'
  },

  // =========================================================================
  // 3.7 UNUSED MOBS
  // =========================================================================
  {
    id: 'giant',
    name: 'Giant',
    type: 'Unused',
    category: '3.7 Unused mobs',
    health: '100 HP (50 Hearts)',
    dimension: 'Overworld (Unused Code)',
    drops: 'Rotten Flesh',
    classification: 'Colossal Undead',
    knockbackRes: '100%',
    damage: '50 HP (Normal) - Single punch destroys unarmored players!',
    icon: 'zombie_head',
    desc: 'A 12-block-tall colossal zombie present in Minecraft code since Survival Test. Has no natural AI in modern Java unless summoned with riding tags or custom datapacks.',
    breeding: '/summon giant',
    version: 'Survival Test (Unused)'
  },
  {
    id: 'illusioner',
    name: 'Illusioner',
    type: 'Unused',
    category: '3.7 Unused mobs',
    health: '32 HP (16 Hearts)',
    dimension: 'Overworld (Woodland Mansion Unused)',
    drops: 'Bow, Arrows',
    classification: 'Illager Spellcaster',
    knockbackRes: '0%',
    damage: 'Bow damage (Blindness debuff for 20 seconds)',
    icon: 'bow',
    desc: 'A spellcasting Illager hidden in Java Edition code. Casts Blindness on players, turns invisible, and summons 4 floating illusory mirror duplicates that mimic its arrow shots.',
    breeding: '/summon illusioner',
    version: 'Java 1.12 (Unused)'
  },
  {
    id: 'the_killer_bunny',
    name: 'The Killer Bunny',
    type: 'Unused',
    category: '3.7 Unused mobs',
    health: '20 HP (10 Hearts)',
    dimension: 'Overworld (Rare Rabbit Variant)',
    drops: 'Rabbit Hide, Raw Rabbit',
    classification: 'Hostile Lagomorph',
    knockbackRes: '0%',
    damage: 'Easy: 5 HP | Normal: 8 HP | Hard: 12 HP (Deadly leap!)',
    icon: 'rabbit_foot',
    desc: 'Inspired by Monty Python’s Rabbit of Caerbannog! Features horizontal blood-red eyes. Attacks players, foxes, and wolves with vicious lunging leaps.',
    breeding: '/summon rabbit ~ ~ ~ {RabbitType:99}',
    version: '1.8'
  },

  // =========================================================================
  // 3.8 SIMILAR ENTITIES
  // =========================================================================
  {
    id: 'armor_stand',
    name: 'Armor Stand',
    type: 'Similar Entity',
    category: '3.8 Similar entities',
    health: 'Entity (Breaks on hit)',
    dimension: 'Any Dimension',
    drops: 'Armor Stand + Equipped Gear',
    classification: 'Living Entity Container',
    knockbackRes: '100%',
    damage: '0 HP',
    icon: 'armor_stand',
    desc: 'Treated internally by Minecraft’s game engine as a LivingEntity. Holds armor suits, heads, and weapons. Supports arms and custom poses in Bedrock Edition and datapacks.',
    breeding: 'Crafted with 6 Sticks + 1 Stone Slab',
    version: '1.8'
  },

  // =========================================================================
  // 3.9 REMOVED MOBS
  // =========================================================================
  {
    id: 'human',
    name: 'Human (Monster)',
    type: 'Removed',
    category: '3.9 Removed mobs',
    health: '20 HP',
    dimension: 'Overworld (Classic & Indev)',
    drops: 'None',
    classification: 'Original Player Clone',
    knockbackRes: '0%',
    damage: '2 HP Melee',
    icon: 'steve',
    desc: 'The original mob added to Minecraft in 2009 by Notch. Used the default Steve skin and ran around erratically flailing its arms before being permanently removed in Beta 1.8.',
    breeding: 'Removed in Beta 1.8',
    version: 'Classic 0.0.14a'
  },
  {
    id: 'rana',
    name: 'Rana (Frog Girl)',
    type: 'Removed',
    category: '3.9 Removed mobs',
    health: '20 HP',
    dimension: 'Overworld (Indev)',
    drops: 'Apples, Feathers',
    classification: 'Dock Test Character',
    knockbackRes: '0%',
    damage: 'Passive',
    icon: 'apple',
    desc: 'A girl with a frog-shaped hat designed by former Mojang artist Dock. Removed when Dock departed Mojang in 2010.',
    breeding: 'Removed in Indev',
    version: 'Indev (2010)'
  },
  {
    id: 'red_dragon',
    name: 'Red Dragon',
    type: 'Mentioned / Removed',
    category: '3.9 Removed mobs',
    health: 'Never Implemented',
    dimension: 'Overworld (Planned)',
    drops: 'N/A',
    classification: 'Tameable Dragon',
    knockbackRes: 'N/A',
    damage: 'N/A',
    icon: 'dragon_head',
    desc: 'Promised by Notch in 2011 as a peaceful, tamable Overworld counterpart to the Ender Dragon that would live in lairs. Dinnerbone later confirmed the project was indefinitely shelved.',
    breeding: 'Shelved by Mojang',
    version: 'Unreleased Concept'
  },

  // =========================================================================
  // 3.10 JOKE & APRIL FOOLS MOBS
  // =========================================================================
  {
    id: 'nerd_creeper',
    name: 'Nerd Creeper',
    type: 'Joke Mob',
    category: '3.10 Joke mobs',
    health: '20 HP',
    dimension: 'April Fools 2023 (The Vote Update)',
    drops: 'Calculators, Books',
    classification: 'Joke Creeper',
    knockbackRes: '0%',
    damage: 'Explodes into academic equations',
    icon: 'book',
    desc: 'Spawned during the 2023 April Fools Vote Update wearing nerdy glasses and a pocket protector. Gives lectures on quantum mechanics before detonating.',
    breeding: 'Vote Rules',
    version: '23w13a_or_bust'
  },
  {
    id: 'pink_wither',
    name: 'Pink Wither (Friendly Wither)',
    type: 'Joke Mob',
    category: '3.10 Joke mobs',
    health: '300 HP',
    dimension: 'Minecraft 2.0 (April Fools 2013)',
    drops: 'Roses, Apples',
    classification: 'Benevolent Construct',
    knockbackRes: '100%',
    damage: 'Heals players and fertilizes grass!',
    icon: 'poppy',
    desc: 'A lovable three-headed pink wither constructed from Pink Wool and potted dandelions. Instead of explosive skulls, it shoots love hearts that grow flowers and heal injured players.',
    breeding: 'Pink Wool + Dandelions',
    version: 'Minecraft 2.0 (2013)'
  },
  {
    id: 'mega_spud',
    name: 'Mega Spud (Lord of the Mound)',
    type: 'Joke Mob',
    category: '3.10 Joke mobs',
    health: '250 HP',
    dimension: 'April Fools 2024 (Poisonous Potato Update)',
    drops: 'Tater Crown, Toxic Essence',
    classification: 'Potato Colossus',
    knockbackRes: '100%',
    damage: '20 HP Potato Mash Strike',
    icon: 'poisonous_potato',
    desc: 'The colossal final boss of the 2024 Poisonous Potato dimension. Rains boiling mashed potatoes and summons toxic potato minions.',
    breeding: 'Colosseum summon',
    version: '24w14potato (2024)'
  },

  // =========================================================================
  // 3.11 UNIMPLEMENTED & MOB VOTE MOBS
  // =========================================================================
  {
    id: 'hovering_inferno',
    name: 'Hovering Inferno (Mob D / Wildfire)',
    type: 'Mob Vote',
    category: '3.11 Unimplemented mobs',
    health: '60 HP (Estimated)',
    dimension: 'Nether Fortresses (Mob Vote 2017)',
    drops: 'Blaze Rods, Nether Shield',
    classification: 'Blaze Boss',
    knockbackRes: '80%',
    damage: 'Fireball barrage & Shockwave',
    icon: 'blaze_rod',
    desc: 'Lost to the Phantom in Minecon Earth 2017. A powerful boss Blaze that used four floating shields to block attacks and launched fiery shockwaves.',
    breeding: 'Mob Vote 2017 Runner-Up',
    version: 'Minecon 2017'
  },
  {
    id: 'copper_golem',
    name: 'Copper Golem',
    type: 'Mob Vote',
    category: '3.11 Unimplemented mobs',
    health: '20 HP',
    dimension: 'Overworld (Player Constructed)',
    drops: 'Copper Ingots',
    classification: 'Mechanical Construct',
    knockbackRes: '0%',
    damage: '0 HP (Presses Copper Buttons)',
    icon: 'copper_ingot',
    desc: 'Lost to the Allay in Mob Vote 2021. A miniature robot constructed from copper that ran around pressing copper buttons randomly before slowly oxidizing into a statue.',
    breeding: 'Mob Vote 2021',
    version: 'Minecraft Live 2021'
  },
  {
    id: 'crab',
    name: 'The Crab',
    type: 'Mob Vote',
    category: '3.11 Unimplemented mobs',
    health: '10 HP',
    dimension: 'Mangrove Swamps (Mob Vote 2023)',
    drops: 'Crab Claw',
    classification: 'Crustacean',
    knockbackRes: '0%',
    damage: 'Passive',
    icon: 'raw_iron',
    desc: 'Lost to the Armadillo in Mob Vote 2023. Lived in Mangrove Swamps; waving its claw would drop Crab Claws that extended player block-placing reach.',
    breeding: 'Mob Vote 2023',
    version: 'Minecraft Live 2023'
  }
];

export const MOB_CLASSIFICATIONS_DATA = [
  {
    name: 'Undead',
    icon: 'skull',
    mechanics: 'Damaged by Instant Health, healed by Instant Damage. Vulnerable to Smite (up to +12.5 HP). Most burn in daylight. Sinks in water and drowns into variants (Zombie → Drowned).',
    members: ['Zombies', 'Skeletons', 'Strays', 'Husks', 'Drowned', 'Phantoms', 'Withers', 'Wither Skeletons', 'The Bogged', 'Zombified Piglins', 'Zoglins']
  },
  {
    name: 'Arthropods',
    icon: 'spider_eye',
    mechanics: 'Vulnerable to Bane of Arthropods (bonus damage + Slowness IV for up to 2.5 seconds). Immune to Poison (Cave Spiders). Able to climb vertical walls.',
    members: ['Spiders', 'Cave Spiders', 'Silverfish', 'Endermites', 'Bees']
  },
  {
    name: 'Illagers',
    icon: 'axe',
    mechanics: 'Hostile humanoid villagers participating in village raids. Attacks Villagers, Wandering Traders, and Iron Golems on sight. Raid captains carry Ominous Banners.',
    members: ['Pillagers', 'Vindicators', 'Evokers', 'Ravagers', 'Illusioners (Unused)', 'Witches (Allies)']
  },
  {
    name: 'Aquatic',
    icon: 'water_bucket',
    mechanics: 'Vulnerable to Impaling enchantment on Tridents (+12.5 HP at Impaling V in Java Edition against aquatic mobs). Breathes underwater, suffocates on land.',
    members: ['Guardians', 'Elder Guardians', 'Squid', 'Glow Squid', 'Dolphins', 'Turtles', 'Drowned (in Bedrock)', 'Pufferfish', 'Salmon', 'Cod']
  },
  {
    name: 'End Mobs',
    icon: 'ender_pearl',
    mechanics: 'Native to The End dimension. Damaged by water and rain. Possess teleportation abilities and immunities to standard ranged projectile arrows.',
    members: ['Endermen', 'Shulkers', 'Endermites', 'Ender Dragon']
  },
  {
    name: 'Nether Inhabitants',
    icon: 'flame',
    mechanics: '100% immune to fire and lava damage. Able to pathfind through lava oceans without taking damage or slowing down.',
    members: ['Blazes', 'Ghasts', 'Magma Cubes', 'Wither Skeletons', 'Zombified Piglins', 'Piglins', 'Hoglins', 'Striders']
  }
];

export const KNOCKBACK_RESISTANCE_TABLE = [
  { mob: 'Warden', resistance: '100% (1.0)', notes: 'Completely unmovable by melee knockback, punches, or arrows.' },
  { mob: 'Iron Golem', resistance: '100% (1.0)', notes: 'Never gets knocked backwards by incoming hits; advances relentlessly.' },
  { mob: 'Ender Dragon', resistance: '100% (1.0)', notes: 'Flies on rigid predetermined physics vectors.' },
  { mob: 'The Wither', resistance: '100% (1.0)', notes: 'Maintains steady hovering flight unaffected by weapons.' },
  { mob: 'Elder Guardian', resistance: '100% (1.0)', notes: 'Stationary aquatic boss immune to displacement.' },
  { mob: 'Ravager', resistance: '75% (0.75)', notes: 'Massive heavy beast that barely budges under sprint criticals.' },
  { mob: 'Hoglin / Zoglin', resistance: '60% (0.6)', notes: 'High mass charging beasts that power through melee swings.' },
  { mob: 'Netherite Equipped Mobs', resistance: 'Up to 40% (0.4)', notes: 'Each Netherite armor piece grants +10% knockback resistance.' }
];

export const DAMAGE_DEALT_MATRIX = [
  { mob: 'The Warden (Melee)', easy: '16 HP (8♥)', normal: '30 HP (15♥)', hard: '45 HP (22.5♥)', notes: 'Single-hit kills unarmored players on any difficulty.' },
  { mob: 'The Warden (Sonic Boom)', easy: '10 HP (5♥)', normal: '10 HP (5♥)', hard: '10 HP (5♥)', notes: 'Bypasses walls, blocks, shields, and standard armor reduction!' },
  { mob: 'Creeper (Point Blank)', easy: '22.5 HP (11.2♥)', normal: '43 HP (21.5♥)', hard: '64.5 HP (32.2♥)', notes: 'Charged Creeper deals up to 97.5 HP on Hard!' },
  { mob: 'Vindicator (Iron Axe)', easy: '7.5 HP (3.7♥)', normal: '13 HP (6.5♥)', hard: '19.5 HP (9.7♥)', notes: 'Disables shields for 5 seconds on impact.' },
  { mob: 'The Wither (Direct Skull)', easy: '5 HP (2.5♥)', normal: '8 HP (4♥) + Wither II', hard: '12 HP (6♥) + Wither II', notes: 'Wither II effect rapidly drains player health below 1 HP.' },
  { mob: 'Iron Golem (Vertical Smash)', easy: '7.5–12.5 HP', normal: '11–21.5 HP', hard: '16.5–32.5 HP', notes: 'Launches targets 6–10 blocks into the air for fall damage.' },
  { mob: 'Enderman', easy: '4.5 HP (2.2♥)', normal: '7 HP (3.5♥)', hard: '10.5 HP (5.2♥)', notes: 'Rapid 0.5s attack cooldown; strikes while teleporting.' },
  { mob: 'The Bogged (1.21 Poison Arrow)', easy: '2 HP + Poison', normal: '3 HP + Poison (4s)', hard: '4 HP + Poison (5s)', notes: 'Leaves player at critical half-heart health.' },
  { mob: 'The Breeze (1.21 Wind Charge)', easy: '1.5 HP', normal: '3 HP', hard: '4.5 HP', notes: 'Explosion impulse propels players into hazards and traps.' }
];

export const MOB_ADVANCEMENTS = [
  {
    title: 'Monsters Hunted',
    type: 'Challenge (100 XP)',
    desc: 'Kill one of every hostile monster in the game (36 unique mob types!).',
    icon: 'diamond_sword'
  },
  {
    title: 'Two by Two',
    type: 'Challenge (100 XP)',
    desc: 'Breed all breedable passive animals (Cows, Pigs, Sheep, Chickens, Wolves, Cats, Horses, Turtles, Frogs, Sniffers...).',
    icon: 'wheat'
  },
  {
    title: 'A Complete Catalogue',
    type: 'Challenge (50 XP)',
    desc: 'Tame all 11 unique Cat variants (Tabby, Black, Tuxedo, Red, Siamese, British Shorthair, Calico, Persian, Ragdoll, White, Jellie!).',
    icon: 'string'
  },
  {
    title: 'Who’s the Pillager Now?',
    type: 'Task',
    desc: 'Give a Pillager a taste of their own medicine by shooting them with a Crossbow.',
    icon: 'crossbow'
  },
  {
    title: 'Over-Overkill (1.21)',
    type: 'Challenge (50 XP)',
    desc: 'Deal 50 hearts (100 HP) of single-hit smash damage with the Mace against an entity.',
    icon: 'the_mace'
  },
  {
    title: 'Blowback (1.21)',
    type: 'Task',
    desc: 'Deflect a Breeze wind charge projectile back at the Breeze.',
    icon: 'breeze_rod'
  }
];

export const MOB_HISTORY_TIMELINE = [
  {
    version: 'Pre-Classic (May 2009)',
    date: 'May 2009',
    title: 'The First Mobs',
    desc: 'Human, Skeleton, Zombie, Creeper, and Spider added by Notch to test primitive 3D pathfinding.'
  },
  {
    version: 'Alpha & Beta (2010–2011)',
    date: '2010–2011',
    title: 'Ecology & The Enderman',
    desc: 'Added Cows, Sheep, Chickens, Slimes, Ghasts, Wolf taming, and Beta 1.8 Endermen with eye-contact aggro.'
  },
  {
    version: 'Java 1.4 (Pretty Scary Update)',
    date: 'October 2012',
    title: 'The Wither & Witches',
    desc: 'Added The Wither boss, Wither Skeletons, Witches with potion-throwing AI, and Zombie Villager curing.'
  },
  {
    version: 'Java 1.8 (Bountiful Update)',
    date: 'September 2014',
    title: 'Ocean Monuments & Rabbits',
    desc: 'Added Guardians, Elder Guardians with Mining Fatigue, Rabbits, Endermites, and The Killer Bunny.'
  },
  {
    version: 'Java 1.14 (Village & Pillage)',
    date: 'April 2019',
    title: 'Raids & New Villagers',
    desc: 'Rebuilt Villager AI with daily schedules and workstations; added Pillagers, Ravagers, and Fox pouncing.'
  },
  {
    version: 'Java 1.16 (Nether Update)',
    date: 'June 2020',
    title: 'Nether Civilizations',
    desc: 'Piglins with gold bartering, Piglin Brutes, Hoglins, Zoglins, and rideable Striders.'
  },
  {
    version: 'Java 1.18 (Caves & Cliffs II)',
    date: 'November 2021',
    title: 'Light Level 0 Rule',
    desc: 'Hostile monster spawning updated from Light Level ≤ 7 to strict Light Level = 0.'
  },
  {
    version: 'Java 1.19 (The Wild Update)',
    date: 'June 2022',
    title: 'The Warden & Deep Dark',
    desc: 'Added The Warden with acoustic sculk sensing, Frogs with Froglights, and Allays.'
  },
  {
    version: 'Java 1.20 (Trails & Tales)',
    date: 'June 2023',
    title: 'Sniffer & Camels',
    desc: 'Ancient Sniffer excavation and two-player dashing Camels.'
  },
  {
    version: 'Java 1.21 (Tricky Trials)',
    date: 'June 2024–2026',
    title: 'The Breeze & The Bogged',
    desc: 'Introduced The Breeze with aerial wind charges and The Bogged with poison arrows in Trial Chambers.'
  },
  {
    version: 'Winter Drop (2024–2026)',
    date: 'Late 2024–2026',
    title: 'The Creaking & Pale Garden',
    desc: 'Introduced The Creaking: a weeping-angel style wooden stalker bound to the indestructible Creaking Heart.'
  }
];
