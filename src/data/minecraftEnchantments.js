// Comprehensive Registry for Minecraft Java Edition Enchantments & Alchemical Infusions
// Verified against official Minecraft Wiki (https://minecraft.wiki/w/Enchantment)

export const ENCHANTMENTS_LIST = [
  // 1.21 MACE ENCHANTMENTS
  {
    id: 'wind_burst',
    name: 'Wind Burst',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Mace & Combat',
    items: ['The Mace'],
    primaryIcon: 'the_mace',
    weight: 'Very Rare (Loot only)',
    incompatible: [],
    desc: 'New 1.21 Tricky Trials Enchantment! Bounces the attacker up into the air (7 blocks per level) upon landing a successful smash attack, allowing chained aerial smashes.',
    version: '1.21 Tricky Trials',
    rarity: 'Very Rare',
    epf: 'N/A'
  },
  {
    id: 'density',
    name: 'Density',
    maxLevel: 5,
    maxRoman: 'V',
    category: 'Mace & Combat',
    items: ['The Mace'],
    primaryIcon: 'the_mace',
    weight: 'Common',
    incompatible: ['Breach', 'Smite', 'Bane of Arthropods'],
    desc: 'Increases the damage dealt per fallen block by +0.5 HP per level per block. At Level V, adds +2.5 HP per block of fall distance.',
    version: '1.21 Tricky Trials',
    rarity: 'Common',
    epf: 'N/A'
  },
  {
    id: 'breach',
    name: 'Breach',
    maxLevel: 4,
    maxRoman: 'IV',
    category: 'Mace & Combat',
    items: ['The Mace'],
    primaryIcon: 'the_mace',
    weight: 'Rare',
    incompatible: ['Density', 'Smite', 'Bane of Arthropods'],
    desc: "Reduces the target's armor effectiveness by 15% per level, up to 60% armor penetration at Level IV. Devastating against Netherite armor.",
    version: '1.21 Tricky Trials',
    rarity: 'Rare',
    epf: 'N/A'
  },

  // WEAPONS / SWORDS
  {
    id: 'sharpness',
    name: 'Sharpness',
    maxLevel: 5,
    maxRoman: 'V',
    category: 'Melee Weapons',
    items: ['Swords', 'Axes'],
    primaryIcon: 'diamond_sword',
    weight: 'Common',
    incompatible: ['Smite', 'Bane of Arthropods'],
    desc: 'Increases melee damage by 1.0 HP at level I, and +0.5 HP for each additional level (adds +3.0 HP at Sharpness V).',
    version: 'Beta 1.9',
    rarity: 'Common',
    epf: 'N/A'
  },
  {
    id: 'smite',
    name: 'Smite',
    maxLevel: 5,
    maxRoman: 'V',
    category: 'Melee Weapons',
    items: ['Swords', 'Axes', 'Mace'],
    primaryIcon: 'diamond_sword',
    weight: 'Uncommon',
    incompatible: ['Sharpness', 'Bane of Arthropods', 'Density', 'Breach'],
    desc: 'Increases melee damage against undead mobs (Zombies, Skeletons, Withers, Drowned, Phantoms, Zombified Piglins, Bogged) by +2.5 HP per level.',
    version: 'Beta 1.9',
    rarity: 'Uncommon',
    epf: 'N/A'
  },
  {
    id: 'bane_of_arthropods',
    name: 'Bane of Arthropods',
    maxLevel: 5,
    maxRoman: 'V',
    category: 'Melee Weapons',
    items: ['Swords', 'Axes', 'Mace'],
    primaryIcon: 'diamond_sword',
    weight: 'Uncommon',
    incompatible: ['Sharpness', 'Smite', 'Density', 'Breach'],
    desc: 'Increases melee damage and inflicts Slowness IV on arthropod mobs (Spiders, Cave Spiders, Silverfish, Endermites, Bees) by +2.5 HP per level.',
    version: 'Beta 1.9',
    rarity: 'Uncommon',
    epf: 'N/A'
  },
  {
    id: 'knockback',
    name: 'Knockback',
    maxLevel: 2,
    maxRoman: 'II',
    category: 'Melee Weapons',
    items: ['Swords'],
    primaryIcon: 'diamond_sword',
    weight: 'Uncommon',
    incompatible: [],
    desc: 'Knocks back the target by 3 blocks per level when struck by a melee attack.',
    version: 'Beta 1.9',
    rarity: 'Uncommon',
    epf: 'N/A'
  },
  {
    id: 'fire_aspect',
    name: 'Fire Aspect',
    maxLevel: 2,
    maxRoman: 'II',
    category: 'Melee Weapons',
    items: ['Swords', 'Mace'],
    primaryIcon: 'diamond_sword',
    weight: 'Rare',
    incompatible: [],
    desc: 'Sets the target on fire for 4 seconds per level (deals 3 HP of fire damage at Level I, 7 HP at Level II). Automatically cooks dropped meat!',
    version: 'Beta 1.9',
    rarity: 'Rare',
    epf: 'N/A'
  },
  {
    id: 'looting',
    name: 'Looting',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Melee Weapons',
    items: ['Swords'],
    primaryIcon: 'diamond_sword',
    weight: 'Rare',
    incompatible: [],
    desc: 'Increases maximum mob loot drops by +1 per level, and raises the probability of rare drops (Wither Skeleton Skulls, Mob Heads, Equipment).',
    version: 'Beta 1.9',
    rarity: 'Rare',
    epf: 'N/A'
  },
  {
    id: 'sweeping_edge',
    name: 'Sweeping Edge',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Melee Weapons',
    items: ['Swords (Java Exclusive)'],
    primaryIcon: 'diamond_sword',
    weight: 'Uncommon',
    incompatible: [],
    desc: 'Increases sweep attack damage to adjacent mobs by 50% (I), 67% (II), and 75% (III) of base attack damage.',
    version: '1.11.1',
    rarity: 'Uncommon',
    epf: 'N/A'
  },

  // RANGED (BOWS, CROSSBOWS, TRIDENTS)
  {
    id: 'power',
    name: 'Power',
    maxLevel: 5,
    maxRoman: 'V',
    category: 'Ranged Weapons',
    items: ['Bows'],
    primaryIcon: 'bow',
    weight: 'Common',
    incompatible: [],
    desc: 'Increases arrow damage by +25% × (level + 1). Power V deals up to 25 HP (12.5 Hearts) of critical damage on a fully drawn bow.',
    version: 'Beta 1.9',
    rarity: 'Common',
    epf: 'N/A'
  },
  {
    id: 'punch',
    name: 'Punch',
    maxLevel: 2,
    maxRoman: 'II',
    category: 'Ranged Weapons',
    items: ['Bows'],
    primaryIcon: 'bow',
    weight: 'Rare',
    incompatible: [],
    desc: 'Increases knockback dealt by shot arrows (3 blocks per level).',
    version: 'Beta 1.9',
    rarity: 'Rare',
    epf: 'N/A'
  },
  {
    id: 'flame',
    name: 'Flame',
    maxLevel: 1,
    maxRoman: 'I',
    category: 'Ranged Weapons',
    items: ['Bows'],
    primaryIcon: 'bow',
    weight: 'Rare',
    incompatible: [],
    desc: 'Arrows ignite targets for 5 seconds (dealing 5 HP of fire damage) and ignite TNT, campfires, and candles from range.',
    version: 'Beta 1.9',
    rarity: 'Rare',
    epf: 'N/A'
  },
  {
    id: 'infinity',
    name: 'Infinity',
    maxLevel: 1,
    maxRoman: 'I',
    category: 'Ranged Weapons',
    items: ['Bows'],
    primaryIcon: 'bow',
    weight: 'Very Rare',
    incompatible: ['Mending'],
    desc: 'Shooting regular arrows does not consume arrows from the player inventory (at least 1 arrow required). Does not apply to tipped arrows.',
    version: 'Beta 1.9',
    rarity: 'Very Rare',
    epf: 'N/A'
  },
  {
    id: 'quick_charge',
    name: 'Quick Charge',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Ranged Weapons',
    items: ['Crossbows'],
    primaryIcon: 'crossbow',
    weight: 'Uncommon',
    incompatible: [],
    desc: 'Reduces crossbow reload time by 0.25 seconds per level (from 1.25s down to 0.5s at Level III).',
    version: '1.14',
    rarity: 'Uncommon',
    epf: 'N/A'
  },
  {
    id: 'multishot',
    name: 'Multishot',
    maxLevel: 1,
    maxRoman: 'I',
    category: 'Ranged Weapons',
    items: ['Crossbows'],
    primaryIcon: 'crossbow',
    weight: 'Rare',
    incompatible: ['Piercing'],
    desc: 'Shoots a spread of 3 arrows or firework rockets for the cost of only 1 item from inventory.',
    version: '1.14',
    rarity: 'Rare',
    epf: 'N/A'
  },
  {
    id: 'piercing',
    name: 'Piercing',
    maxLevel: 4,
    maxRoman: 'IV',
    category: 'Ranged Weapons',
    items: ['Crossbows'],
    primaryIcon: 'crossbow',
    weight: 'Common',
    incompatible: ['Multishot'],
    desc: 'Projectiles pass through entities (up to 4 entities at Level IV), ignore shields, and can be retrieved from the ground.',
    version: '1.14',
    rarity: 'Common',
    epf: 'N/A'
  },
  {
    id: 'loyalty',
    name: 'Loyalty',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Ranged Weapons',
    items: ['Tridents'],
    primaryIcon: 'trident',
    weight: 'Uncommon',
    incompatible: ['Riptide'],
    desc: 'Thrown tridents boomerang back to the thrower upon contacting an entity or block (speed increases with level).',
    version: '1.13',
    rarity: 'Uncommon',
    epf: 'N/A'
  },
  {
    id: 'riptide',
    name: 'Riptide',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Ranged Weapons',
    items: ['Tridents'],
    primaryIcon: 'trident',
    weight: 'Rare',
    incompatible: ['Loyalty', 'Channeling'],
    desc: 'Launches the player forward with the trident when submerged in water or outdoors during rain/snow.',
    version: '1.13',
    rarity: 'Rare',
    epf: 'N/A'
  },
  {
    id: 'channeling',
    name: 'Channeling',
    maxLevel: 1,
    maxRoman: 'I',
    category: 'Ranged Weapons',
    items: ['Tridents'],
    primaryIcon: 'trident',
    weight: 'Very Rare',
    incompatible: ['Riptide'],
    desc: 'Summons a lightning bolt on the hit entity if thrown outdoors during a thunderstorm (transforms creepers, villagers, pigs).',
    version: '1.13',
    rarity: 'Very Rare',
    epf: 'N/A'
  },
  {
    id: 'impaling',
    name: 'Impaling',
    maxLevel: 5,
    maxRoman: 'V',
    category: 'Ranged Weapons',
    items: ['Tridents'],
    primaryIcon: 'trident',
    weight: 'Rare',
    incompatible: [],
    desc: 'In Java Edition, deals +2.5 HP extra damage per level against aquatic mobs (Guardians, Elder Guardians, Dolphins, Squids, Fish).',
    version: '1.13',
    rarity: 'Rare',
    epf: 'N/A'
  },

  // ARMOR (HELMETS, CHESTPLATES, LEGGINGS, BOOTS)
  {
    id: 'protection',
    name: 'Protection',
    maxLevel: 4,
    maxRoman: 'IV',
    category: 'Armor Defense',
    items: ['Helmets', 'Chestplates', 'Leggings', 'Boots'],
    primaryIcon: 'enchanted_book',
    weight: 'Common',
    incompatible: ['Fire Protection', 'Blast Protection', 'Projectile Protection'],
    desc: 'Reduces all environmental damage (except void, hunger, and /kill) by 4% per level (EPF 1 per level). Max capped at 80% (20 EPF).',
    version: 'Beta 1.9',
    rarity: 'Common',
    epf: 'EPF +4 (Max 20 total)'
  },
  {
    id: 'fire_protection',
    name: 'Fire Protection',
    maxLevel: 4,
    maxRoman: 'IV',
    category: 'Armor Defense',
    items: ['Helmets', 'Chestplates', 'Leggings', 'Boots'],
    primaryIcon: 'enchanted_book',
    weight: 'Uncommon',
    incompatible: ['Protection', 'Blast Protection', 'Projectile Protection'],
    desc: 'Reduces fire and lava damage by 8% per level (EPF 2 per level) and reduces burn time by 15% per level.',
    version: 'Beta 1.9',
    rarity: 'Uncommon',
    epf: 'EPF +8 vs Fire'
  },
  {
    id: 'blast_protection',
    name: 'Blast Protection',
    maxLevel: 4,
    maxRoman: 'IV',
    category: 'Armor Defense',
    items: ['Helmets', 'Chestplates', 'Leggings', 'Boots'],
    primaryIcon: 'enchanted_book',
    weight: 'Rare',
    incompatible: ['Protection', 'Fire Protection', 'Projectile Protection'],
    desc: 'Reduces explosion damage (creepers, TNT, ghast fireballs, end crystals) by 8% per level (EPF 2) and reduces explosion knockback by 15% per level.',
    version: 'Beta 1.9',
    rarity: 'Rare',
    epf: 'EPF +8 vs Blasts'
  },
  {
    id: 'projectile_protection',
    name: 'Projectile Protection',
    maxLevel: 4,
    maxRoman: 'IV',
    category: 'Armor Defense',
    items: ['Helmets', 'Chestplates', 'Leggings', 'Boots'],
    primaryIcon: 'enchanted_book',
    weight: 'Uncommon',
    incompatible: ['Protection', 'Fire Protection', 'Blast Protection'],
    desc: 'Reduces damage from arrows, trident throws, shulker bullets, and llama spit by 8% per level (EPF 2).',
    version: 'Beta 1.9',
    rarity: 'Uncommon',
    epf: 'EPF +8 vs Projectiles'
  },
  {
    id: 'respiration',
    name: 'Respiration',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Armor Defense',
    items: ['Helmets'],
    primaryIcon: 'enchanted_book',
    weight: 'Rare',
    incompatible: [],
    desc: 'Extends underwater breath time by +15 seconds per level, and grants a chance to ignore suffocation damage underwater.',
    version: 'Beta 1.9',
    rarity: 'Rare',
    epf: 'N/A'
  },
  {
    id: 'aqua_affinity',
    name: 'Aqua Affinity',
    maxLevel: 1,
    maxRoman: 'I',
    category: 'Armor Defense',
    items: ['Helmets'],
    primaryIcon: 'enchanted_book',
    weight: 'Rare',
    incompatible: [],
    desc: 'Completely eliminates the 5× mining speed penalty while submerged underwater.',
    version: 'Beta 1.9',
    rarity: 'Rare',
    epf: 'N/A'
  },
  {
    id: 'thorns',
    name: 'Thorns',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Armor Defense',
    items: ['Chestplates', 'All Armor'],
    primaryIcon: 'enchanted_book',
    weight: 'Very Rare',
    incompatible: [],
    desc: 'Has a 15% × level chance to deal 1–4 damage back to attackers. Slightly increases armor durability consumption.',
    version: '1.4.6',
    rarity: 'Very Rare',
    epf: 'N/A'
  },
  {
    id: 'feather_falling',
    name: 'Feather Falling',
    maxLevel: 4,
    maxRoman: 'IV',
    category: 'Armor Defense',
    items: ['Boots'],
    primaryIcon: 'enchanted_book',
    weight: 'Uncommon',
    incompatible: [],
    desc: 'Reduces fall damage and ender pearl teleportation damage by 12% per level (EPF 3 per level). Feather Falling IV provides 12 EPF alone.',
    version: 'Beta 1.9',
    rarity: 'Uncommon',
    epf: 'EPF +12 vs Fall Damage'
  },
  {
    id: 'depth_strider',
    name: 'Depth Strider',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Armor Defense',
    items: ['Boots'],
    primaryIcon: 'enchanted_book',
    weight: 'Rare',
    incompatible: ['Frost Walker'],
    desc: 'Reduces underwater movement drag by 33% per level. Level III allows walking in water as fast as on dry land.',
    version: '1.8',
    rarity: 'Rare',
    epf: 'N/A'
  },
  {
    id: 'frost_walker',
    name: 'Frost Walker',
    maxLevel: 2,
    maxRoman: 'II',
    category: 'Armor Defense',
    items: ['Boots'],
    primaryIcon: 'enchanted_book',
    weight: 'Rare (Treasure)',
    incompatible: ['Depth Strider'],
    desc: 'Freezes still water blocks into Frosted Ice in a radius around the player when walking. Immunizes the wearer to damage from Magma Blocks and Campfires.',
    version: '1.9',
    rarity: 'Rare (Treasure)',
    epf: 'N/A'
  },
  {
    id: 'soul_speed',
    name: 'Soul Speed',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Armor Defense',
    items: ['Boots'],
    primaryIcon: 'enchanted_book',
    weight: 'Very Rare (Piglin Bartering / Bastions)',
    incompatible: [],
    desc: 'Increases movement speed on Soul Sand and Soul Soil by +30.5% + (level × 10.5%), emitting soul particle trails.',
    version: '1.16',
    rarity: 'Very Rare (Treasure)',
    epf: 'N/A'
  },
  {
    id: 'swift_sneak',
    name: 'Swift Sneak',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Armor Defense',
    items: ['Leggings'],
    primaryIcon: 'enchanted_book',
    weight: 'Very Rare (Ancient Cities only)',
    incompatible: [],
    desc: 'Increases sneaking/crouching movement speed by +15% per level, up to 75% of regular walking speed at Level III. Essential for navigating Ancient Cities without alerting the Warden.',
    version: '1.19',
    rarity: 'Very Rare (Ancient City Loot)',
    epf: 'N/A'
  },

  // TOOLS (PICKAXES, SHOVELS, AXES, HOES, FISHING RODS)
  {
    id: 'efficiency',
    name: 'Efficiency',
    maxLevel: 5,
    maxRoman: 'V',
    category: 'Tools & Utilities',
    items: ['Pickaxes', 'Shovels', 'Axes', 'Hoes', 'Shears'],
    primaryIcon: 'diamond_pickaxe',
    weight: 'Common',
    incompatible: [],
    desc: 'Increases mining speed by level² + 1 blocks per tick. Efficiency V on Diamond/Netherite allows instant-mining (insta-mine) Stone and Deepslate with Haste II.',
    version: 'Beta 1.9',
    rarity: 'Common',
    epf: 'N/A'
  },
  {
    id: 'silk_touch',
    name: 'Silk Touch',
    maxLevel: 1,
    maxRoman: 'I',
    category: 'Tools & Utilities',
    items: ['Pickaxes', 'Shovels', 'Axes', 'Hoes'],
    primaryIcon: 'diamond_pickaxe',
    weight: 'Very Rare',
    incompatible: ['Fortune'],
    desc: 'Causes fragile blocks (Glass, Ores, Ice, Campfires, Beehives, Sculk, Mushroom blocks) to drop themselves rather than their standard yield.',
    version: 'Beta 1.9',
    rarity: 'Very Rare',
    epf: 'N/A'
  },
  {
    id: 'fortune',
    name: 'Fortune',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Tools & Utilities',
    items: ['Pickaxes', 'Shovels', 'Axes', 'Hoes'],
    primaryIcon: 'diamond_pickaxe',
    weight: 'Rare',
    incompatible: ['Silk Touch'],
    desc: 'Multiplies item drops from blocks (Coal, Diamond, Emerald, Lapis, Redstone, Copper, Nether Gold, Glowstone, Melons). At Fortune III, averages 2.2× yield with a maximum of 4× drop!',
    version: 'Beta 1.9',
    rarity: 'Rare',
    epf: 'N/A'
  },
  {
    id: 'unbreaking',
    name: 'Unbreaking',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Universal Utility',
    items: ['All Weapons, Tools, Armor, Elytra, Fishing Rods, Shears, Flint & Steel, Shields, Brush'],
    primaryIcon: 'enchanted_book',
    weight: 'Common',
    incompatible: [],
    desc: 'Gives a chance (100/(level + 1)%) for an item to avoid using durability when used. Unbreaking III effectively quadruples (4×) the item lifespan.',
    version: 'Beta 1.9',
    rarity: 'Common',
    epf: 'N/A'
  },
  {
    id: 'mending',
    name: 'Mending',
    maxLevel: 1,
    maxRoman: 'I',
    category: 'Universal Utility',
    items: ['All Weapons, Tools, Armor, Elytra, Shields, Shears, Rods'],
    primaryIcon: 'enchanted_book',
    weight: 'Rare (Treasure)',
    incompatible: ['Infinity (Bows)'],
    desc: 'Repairs the item using collected Experience (XP) orbs at a rate of 2 durability points per 1 XP point, providing infinite durability if fed with XP.',
    version: '1.9',
    rarity: 'Rare (Treasure)',
    epf: 'N/A'
  },
  {
    id: 'luck_of_the_sea',
    name: 'Luck of the Sea',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Tools & Utilities',
    items: ['Fishing Rods'],
    primaryIcon: 'enchanted_book',
    weight: 'Rare',
    incompatible: [],
    desc: 'Increases the chance of catching Treasure (Enchanted Books, Saddles, Bows, Nautilus Shells) and lowers the chance of catching Junk by ~2% per level.',
    version: '1.7.2',
    rarity: 'Rare',
    epf: 'N/A'
  },
  {
    id: 'lure',
    name: 'Lure',
    maxLevel: 3,
    maxRoman: 'III',
    category: 'Tools & Utilities',
    items: ['Fishing Rods'],
    primaryIcon: 'enchanted_book',
    weight: 'Rare',
    incompatible: [],
    desc: 'Decreases the wait time until a fish/treasure bites the bobber by 5 seconds per level.',
    version: '1.7.2',
    rarity: 'Rare',
    epf: 'N/A'
  },

  // CURSES
  {
    id: 'curse_of_binding',
    name: 'Curse of Binding',
    maxLevel: 1,
    maxRoman: 'I',
    category: 'Curses (Detrimental)',
    items: ['All Armor, Carved Pumpkins, Mob Heads, Elytra'],
    primaryIcon: 'enchanted_book',
    weight: 'Very Rare (Treasure)',
    incompatible: [],
    desc: 'Once equipped, the item cannot be removed from its armor slot until the player dies or the item runs out of durability. Deadly in Hardcore mode!',
    version: '1.11',
    rarity: 'Very Rare (Treasure)',
    epf: 'Curse'
  },
  {
    id: 'curse_of_vanishing',
    name: 'Curse of Vanishing',
    maxLevel: 1,
    maxRoman: 'I',
    category: 'Curses (Detrimental)',
    items: ['All Weapons, Tools, Armor, Compass, Recovery Compass'],
    primaryIcon: 'enchanted_book',
    weight: 'Very Rare (Treasure)',
    incompatible: [],
    desc: 'The item completely disappears / is destroyed upon player death instead of dropping on the ground.',
    version: '1.11',
    rarity: 'Very Rare (Treasure)',
    epf: 'Curse'
  }
];

export const OBTAINING_METHODS = [
  {
    id: 'enchanting_table',
    title: '1. Enchanting Table & Bookshelves',
    icon: 'enchanting_table',
    desc: 'Crafted with 1 Book, 2 Diamonds, and 4 Obsidian. Surrounding the table with up to 15 Bookshelves (with 1 air block buffer) elevates the maximum enchantment power to Level 30.',
    mechanics: [
      'Each bookshelf adds +2 enchantment power levels (15 bookshelves = Level 30 max).',
      'Requires 1 to 3 Lapis Lazuli and 1 to 3 player levels per enchantment.',
      'Runic Standard Galactic Alphabet (SGA) text spells mysterious hints (e.g. "Klaatu barada nikto", "earth", "scrolls").'
    ]
  },
  {
    id: 'anvil_combination',
    title: '2. Anvil & Prior Work Penalty',
    icon: 'anvil',
    desc: 'Used to combine enchanted books onto equipment, merge two damaged items of the same tier, and rename items.',
    mechanics: [
      'Prior Work Penalty: Every time an item is modified in an anvil, its work penalty doubles: 1, 3, 7, 15, 31...',
      '"Too Expensive!" Cap: If an operation requires 40 or more levels in Survival mode, the anvil will refuse to perform it!',
      'Combining items in a binary tree order minimizes exponential repair cost buildup.'
    ]
  },
  {
    id: 'villager_trading',
    title: '3. Villager Trading (Librarians)',
    icon: 'emerald',
    desc: 'Librarian villagers sell Enchanted Books across Novice to Master tiers for emeralds and books.',
    mechanics: [
      'In standard Java Edition, any librarian can sell Mending, Unbreaking III, Fortune III, and Silk Touch.',
      'Under the Experimental Biome Trade Rebalance, high-tier books are strictly locked to native biomes (Swamp for Mending, Desert for Unbreaking, Taiga for Fortune).'
    ]
  },
  {
    id: 'loot_and_fishing',
    title: '4. Dungeon Loot & Treasure Fishing',
    icon: 'experience_bottle',
    desc: 'High-tier enchantments and exclusive treasure books spawn in world structures and fishing loot.',
    mechanics: [
      'Swift Sneak I–III is exclusively found in Ancient City chest corridors.',
      'Wind Burst I–III is exclusively obtained from 1.21 Trial Chambers Ominous Vaults.',
      'Fishing with Luck of the Sea III provides high probabilities of reeling in Enchanted Books.'
    ]
  }
];

export const DISENCHANTING_MECHANICS = {
  workstation: 'Grindstone',
  workstationIcon: 'grindstone',
  description: 'Removes all non-curse enchantments from an item, restoring it to a pristine state while refunding experience points and repairing durability.',
  rules: [
    'XP Refund Formula: Refunds between 50% and 100% of the total experience point value of all removed enchantments.',
    'Durability Bonus: Combining two damaged tools on a grindstone restores their combined durability plus a free +5% bonus durability.',
    'Curse Permanence: The Grindstone CANNOT remove Curse of Binding or Curse of Vanishing. Curses are indelible!'
  ]
};

export const EPF_CAP_DATA = [
  { type: 'Protection', factorPerLevel: '1 EPF / level', maxEPF: 4, capRule: 'Max 20 EPF across full armor suit (80% total damage reduction cap).' },
  { type: 'Fire Protection', factorPerLevel: '2 EPF / level', maxEPF: 8, capRule: 'Also reduces burn tick duration by 15% per level.' },
  { type: 'Blast Protection', factorPerLevel: '2 EPF / level', maxEPF: 8, capRule: 'Also reduces explosion knockback impulse by 15% per level.' },
  { type: 'Projectile Protection', factorPerLevel: '2 EPF / level', maxEPF: 8, capRule: 'Shields against arrows, tridents, and shulker bullets.' },
  { type: 'Feather Falling', factorPerLevel: '3 EPF / level', maxEPF: 12, capRule: 'Feather Falling IV single-handedly supplies 12 EPF to fall damage.' }
];

export const ENCHANTING_ADVANCEMENTS = [
  {
    title: 'Enchanter',
    desc: 'Enchant an item at an Enchanting Table.',
    icon: 'enchanting_table',
    type: 'Task'
  },
  {
    title: 'Over-Overkill (1.21)',
    desc: 'Deal 50 hearts (100 HP) of damage in a single strike using the Mace (achieved with Density V fall smash).',
    icon: 'the_mace',
    type: 'Challenge'
  },
  {
    title: 'Very Very Frightening',
    desc: 'Strike a villager with lightning using a Channeling Trident to transform them into a Witch.',
    icon: 'trident',
    type: 'Challenge'
  },
  {
    title: 'Overpowered',
    desc: 'Consume an Enchanted Golden Apple (God Apple).',
    icon: 'enchanted_golden_apple',
    type: 'Challenge'
  },
  {
    title: 'Postmortal',
    desc: 'Use a Totem of Undying to cheat death.',
    icon: 'totem_of_undying',
    type: 'Goal'
  },
  {
    title: 'Blowback (1.21)',
    desc: 'Deflect a Breeze wind charge projectile back at the Breeze.',
    icon: 'breeze_rod',
    type: 'Task'
  }
];

export const ENCHANTING_HISTORY = [
  {
    version: 'Beta 1.9 Prerelease 3',
    date: 'September 2011',
    title: 'Notch Reveals Enchanting',
    desc: 'Notch tweeted a screenshot of the Enchanting Table with Standard Galactic Alphabet runes, costing up to 50 levels.'
  },
  {
    version: 'Java 1.3.1',
    date: 'August 2012',
    title: 'Level 30 Cap',
    desc: 'Maximum enchanting cost lowered from 50 levels to 30 levels, requiring 15 bookshelves instead of 30.'
  },
  {
    version: 'Java 1.8',
    date: 'September 2014',
    title: 'Lapis Lazuli Cost',
    desc: 'Enchanting now costs 1–3 Lapis Lazuli and only deducts 1–3 levels from the player pool while still requiring level 30.'
  },
  {
    version: 'Java 1.9 (Combat Update)',
    date: 'February 2016',
    title: 'Mending & Frost Walker',
    desc: 'Introduced Mending and Frost Walker as rare treasure enchantments.'
  },
  {
    version: 'Java 1.11 (Exploration)',
    date: 'November 2016',
    title: 'Curses Added',
    desc: 'Added Curse of Binding and Curse of Vanishing.'
  },
  {
    version: 'Java 1.14 (Village & Pillage)',
    date: 'April 2019',
    title: 'Grindstone & Crossbows',
    desc: 'Added the Grindstone for disenchanting and Quick Charge, Multishot, and Piercing.'
  },
  {
    version: 'Java 1.20.5',
    date: 'April 2024',
    title: 'Data Components Transition',
    desc: 'Replaced legacy NBT tags with structured data components (minecraft:enchantments and minecraft:stored_enchantments).'
  },
  {
    version: 'Java 1.21 (Tricky Trials)',
    date: 'June 2024–2026',
    title: 'Mace Enchantments',
    desc: 'Added Wind Burst, Density, and Breach for the Mace; introduced Ominous Vault loot mechanics.'
  }
];

// Summary of applicable enchantments by item type (Section 4.2)
export const ITEM_ENCHANTMENT_MATRIX = [
  {
    category: 'Mace',
    icon: 'the_mace',
    enchantments: ['Wind Burst', 'Density', 'Breach', 'Smite', 'Bane of Arthropods', 'Fire Aspect', 'Unbreaking', 'Mending', 'Curse of Vanishing'],
    notes: 'Wind Burst is exclusive to Trial Chambers Ominous Vaults. Density and Breach mutually exclude each other and Smite/Bane.'
  },
  {
    category: 'Swords',
    icon: 'diamond_sword',
    enchantments: ['Sharpness', 'Smite', 'Bane of Arthropods', 'Knockback', 'Fire Aspect', 'Looting', 'Sweeping Edge', 'Unbreaking', 'Mending', 'Curse of Vanishing'],
    notes: 'Sweeping Edge is exclusive to Java Edition. Sharpness, Smite, and Bane are mutually exclusive.'
  },
  {
    category: 'Axes',
    icon: 'diamond_axe',
    enchantments: ['Sharpness', 'Smite', 'Bane of Arthropods', 'Efficiency', 'Silk Touch', 'Fortune', 'Unbreaking', 'Mending', 'Curse of Vanishing'],
    notes: 'Axes deal massive single-hit melee damage and disable shields for 5 seconds.'
  },
  {
    category: 'Bows',
    icon: 'bow',
    enchantments: ['Power', 'Punch', 'Flame', 'Infinity', 'Unbreaking', 'Mending', 'Curse of Vanishing'],
    notes: 'Infinity and Mending are mutually exclusive on Bows.'
  },
  {
    category: 'Crossbows',
    icon: 'crossbow',
    enchantments: ['Quick Charge', 'Multishot', 'Piercing', 'Unbreaking', 'Mending', 'Curse of Vanishing'],
    notes: 'Multishot and Piercing are mutually exclusive. Quick Charge III reduces load time to 0.75 seconds.'
  },
  {
    category: 'Tridents',
    icon: 'trident',
    enchantments: ['Impaling', 'Loyalty', 'Riptide', 'Channeling', 'Unbreaking', 'Mending', 'Curse of Vanishing'],
    notes: 'Riptide is mutually exclusive with Loyalty and Channeling.'
  },
  {
    category: 'Pickaxes',
    icon: 'diamond_pickaxe',
    enchantments: ['Efficiency', 'Silk Touch', 'Fortune', 'Unbreaking', 'Mending', 'Curse of Vanishing'],
    notes: 'Silk Touch and Fortune are mutually exclusive.'
  },
  {
    category: 'Armor (General)',
    icon: 'diamond_chestplate',
    enchantments: ['Protection', 'Fire Protection', 'Blast Protection', 'Projectile Protection', 'Thorns', 'Unbreaking', 'Mending', 'Curse of Binding', 'Curse of Vanishing'],
    notes: 'Protection types are mutually exclusive. Combined EPF capped at 20 (80% reduction).'
  },
  {
    category: 'Helmets Exclusive',
    icon: 'diamond_helmet',
    enchantments: ['Respiration', 'Aqua Affinity', 'Protection', 'Unbreaking', 'Mending', 'Curse of Binding'],
    notes: 'Respiration III extends underwater breathing by +45 seconds. Aqua Affinity removes underwater mining speed penalty.'
  },
  {
    category: 'Leggings Exclusive',
    icon: 'diamond_leggings',
    enchantments: ['Swift Sneak', 'Protection', 'Thorns', 'Unbreaking', 'Mending', 'Curse of Binding'],
    notes: 'Swift Sneak III increases sneaking speed to 75% of normal walking speed; loot-only in Ancient Cities.'
  },
  {
    category: 'Boots Exclusive',
    icon: 'diamond_boots',
    enchantments: ['Feather Falling', 'Depth Strider', 'Frost Walker', 'Soul Speed', 'Protection', 'Unbreaking', 'Mending'],
    notes: 'Feather Falling IV gives 12 EPF to fall damage. Depth Strider and Frost Walker are mutually exclusive.'
  },
  {
    category: 'Fishing Rods',
    icon: 'fishing_rod',
    enchantments: ['Luck of the Sea', 'Lure', 'Unbreaking', 'Mending', 'Curse of Vanishing'],
    notes: 'Luck of the Sea III boosts treasure catch chances from 5% to 11.3%.'
  },
  {
    category: 'Utility Tools (Elytra, Shears, Shield)',
    icon: 'elytra',
    enchantments: ['Unbreaking', 'Mending', 'Curse of Binding (Elytra only)', 'Curse of Vanishing'],
    notes: 'Elytra and Shields can only be enchanted via Anvils using Enchanted Books.'
  }
];

// Incompatibility Groups (Section 2)
export const INCOMPATIBILITY_RULES = [
  {
    name: 'Melee Damage Incompatibilities',
    items: ['Sharpness', 'Smite', 'Bane of Arthropods'],
    maceConflict: ['Density', 'Breach', 'Smite', 'Bane of Arthropods'],
    reason: 'Only one damage multiplier may be active on a weapon at a time.'
  },
  {
    name: 'Protection Incompatibilities',
    items: ['Protection', 'Fire Protection', 'Blast Protection', 'Projectile Protection'],
    maceConflict: [],
    reason: 'Each armor piece can only harbor one specialized protection discipline.'
  },
  {
    name: 'Arrow Infinitude vs Mending',
    items: ['Infinity', 'Mending'],
    maceConflict: [],
    reason: 'A bow cannot provide both infinite mundane arrows and self-repairing durability.'
  },
  {
    name: 'Crossbow Trajectory',
    items: ['Multishot', 'Piercing'],
    maceConflict: [],
    reason: 'Arrows cannot simultaneously split into a 3-spread and penetrate through mobs.'
  },
  {
    name: 'Boot Water Propulsion',
    items: ['Frost Walker', 'Depth Strider'],
    maceConflict: [],
    reason: 'You cannot simultaneously freeze water into frosted ice and swim freely underwater.'
  },
  {
    name: 'Trident Oceanic Propulsion',
    items: ['Riptide', 'Loyalty', 'Channeling'],
    maceConflict: [],
    reason: 'Riptide hurls the player with the trident, preventing it from being thrown away or summoned back.'
  },
  {
    name: 'Mining Block State',
    items: ['Silk Touch', 'Fortune'],
    maceConflict: [],
    reason: 'Blocks cannot simultaneously drop their intact block state and multiply their mineral yield.'
  }
];

// Modern Data Components vs Legacy NBT (Section 6)
export const DATA_COMPONENT_EXAMPLES = {
  version: 'Java 1.20.5+ / 1.21 Tricky Trials',
  modernCommand: `/give @p diamond_sword[minecraft:enchantments={levels:{'minecraft:sharpness':5,'minecraft:looting':3,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`,
  modernMace: `/give @p mace[minecraft:enchantments={levels:{'minecraft:wind_burst':3,'minecraft:density':5,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`,
  modernStoredBook: `/give @p enchanted_book[minecraft:stored_enchantments={levels:{'minecraft:mending':1}}] 1`,
  modernCustomGlint: `/give @p stick[minecraft:enchantment_glint_override=true,minecraft:custom_name='{"text":"Magic Wand","color":"gold"}'] 1`,
  legacyNbt: `/give @p diamond_sword{Enchantments:[{id:"minecraft:sharpness",lvl:5s},{id:"minecraft:looting",lvl:3s}]} 1`,
  repairCostComponent: `minecraft:repair_cost=3`,
  notes: 'Java 1.20.5 retired string-based NBT formatting in /give commands, switching to type-safe bracketed components with namespaced item IDs.'
};

// Enchantment Sounds (Section 7)
export const ENCHANTMENT_SOUNDS = [
  {
    id: 'table_use',
    event: 'block.enchantment_table.use',
    subtitle: 'Enchanting Table enchants',
    pitch: '0.9 – 1.1',
    description: 'Mystical resonance chime emitted when an enchantment is committed at the table.'
  },
  {
    id: 'anvil_use',
    event: 'block.anvil.use',
    subtitle: 'Anvil used',
    pitch: '0.8 – 1.0',
    description: 'Heavy iron strike sound when combining items or applying an enchanted book.'
  },
  {
    id: 'anvil_land',
    event: 'block.anvil.land',
    subtitle: 'Anvil lands',
    pitch: '0.8 – 1.2',
    description: 'Crushing metallic crash when an anvil falls onto solid ground or entities.'
  },
  {
    id: 'grindstone_use',
    event: 'block.grindstone.use',
    subtitle: 'Grindstone grinds',
    pitch: '0.9 – 1.0',
    description: 'Stone abrasion sound when scrubbing enchantments and claiming XP orbs.'
  },
  {
    id: 'player_levelup',
    event: 'entity.player.levelup',
    subtitle: 'Player levels up',
    pitch: '0.75 – 1.0',
    description: 'Triumphant fanfare when player collects experience orbs and advances level count.'
  }
];

// Bedrock Achievements (Section 8)
export const BEDROCK_ACHIEVEMENTS = [
  {
    title: 'Enchanter',
    gamerscore: '15G / Bronze',
    desc: 'Construct an Enchanting Table and enchant an item.',
    icon: 'enchanting_table'
  },
  {
    title: 'Overkill',
    gamerscore: '30G / Silver',
    desc: 'Deal nine hearts (18 HP) of damage in a single hit.',
    icon: 'diamond_sword'
  },
  {
    title: 'Tie Dye Outfit',
    gamerscore: '15G / Bronze',
    desc: 'Dye all 4 unique pieces of leather armor in a cauldron.',
    icon: 'leather_chestplate'
  },
  {
    title: 'Super Sonic',
    gamerscore: '30G / Gold',
    desc: 'Use an Elytra to fly through a 1x1 gap while gliding at over 40 m/s.',
    icon: 'elytra'
  }
];

// Standard Galactic Alphabet Words for the Enchanting Table Simulator (Section 10)
export const SGA_WORDS = [
  'klaatu', 'barada', 'nikto', 'elder', 'scrolls', 'earth', 'water',
  'fire', 'air', 'spirit', 'animal', 'creature', 'beast', 'undead',
  'demon', 'element', 'cold', 'light', 'dark', 'lightning', 'magic',
  'chaos', 'order', 'void', 'sphere', 'cube', 'infinite', 'embiggen',
  'inside', 'outside', 'towards', 'twisting', 'range', 'short', 'long'
];

// =========================================================================
// TUTORIAL: BEST ENCHANTMENTS GUIDE (https://minecraft.wiki/w/Tutorial:Best_enchantments_guide)
// =========================================================================
export const BEST_ENCHANTMENTS_GUIDE = [
  {
    id: 'god_helmet',
    name: 'God Helmet',
    item: 'Netherite Helmet',
    icon: 'diamond_helmet',
    category: 'Armor',
    tags: ['god armor', 'armor', 'helmet', 'head', 'hat', 'cap', 'cranial', 'protection', 'respiration', 'aqua affinity', 'unbreaking', 'mending', 'thorns', 'netherite'],
    mustHaves: ['Protection IV', 'Respiration III', 'Aqua Affinity', 'Unbreaking III', 'Mending'],
    optional: ['Thorns III'],
    description: 'The pinnacle of cranial protection. Respiration III extends underwater breathing by +45s and delays drowning damage; Aqua Affinity eliminates underwater mining speed penalty.',
    debate: 'Thorns III deals 1–4 damage back to attackers, but burns an extra 2 durability points when triggered. Since helmets have low base durability, Thorns is optional.',
    giveCommand: `/give @p netherite_helmet[minecraft:enchantments={levels:{'minecraft:protection':4,'minecraft:respiration':3,'minecraft:aqua_affinity':1,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'god_chestplate',
    name: 'God Chestplate',
    item: 'Netherite Chestplate',
    icon: 'diamond_chestplate',
    category: 'Armor',
    tags: ['god armor', 'armor', 'chestplate', 'chest', 'torso', 'body', 'tunic', 'protection', 'unbreaking', 'mending', 'thorns', 'netherite'],
    mustHaves: ['Protection IV', 'Unbreaking III', 'Mending'],
    optional: ['Thorns III'],
    description: 'The heaviest armor piece contributing the most base armor points (8 armor, 3 toughness, 1 knockback resistance). Protection IV supplies 4 EPF.',
    debate: 'Thorns III is commonly accepted on chestplates due to its large 592 durability pool, easily sustained by Mending XP.',
    giveCommand: `/give @p netherite_chestplate[minecraft:enchantments={levels:{'minecraft:protection':4,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'god_leggings',
    name: 'God Leggings',
    item: 'Netherite Leggings',
    icon: 'diamond_leggings',
    category: 'Armor',
    tags: ['god armor', 'armor', 'leggings', 'pants', 'legs', 'swift sneak', 'protection', 'unbreaking', 'mending', 'thorns', 'ancient city', 'netherite'],
    mustHaves: ['Protection IV', 'Swift Sneak III', 'Unbreaking III', 'Mending'],
    optional: ['Thorns III'],
    description: 'Swift Sneak III (loot-only from Ancient Cities) increases crouching movement speed to 75% of normal walking speed, vital for Deep Dark navigation and bridging.',
    debate: 'Swift Sneak cannot be obtained from enchanting tables or villagers—only ancient sculk chests.',
    giveCommand: `/give @p netherite_leggings[minecraft:enchantments={levels:{'minecraft:protection':4,'minecraft:swift_sneak':3,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'god_boots',
    name: 'God Boots',
    item: 'Netherite Boots',
    icon: 'diamond_boots',
    category: 'Armor',
    tags: ['god armor', 'armor', 'boots', 'shoes', 'feet', 'feather falling', 'depth strider', 'soul speed', 'frost walker', 'protection', 'unbreaking', 'mending', 'thorns', 'netherite'],
    mustHaves: ['Protection IV', 'Feather Falling IV', 'Depth Strider III', 'Soul Speed III', 'Unbreaking III', 'Mending'],
    optional: ['Frost Walker II', 'Thorns III'],
    description: 'Boots carry the highest density of enchantments. Feather Falling IV provides 12 EPF to fall and ender pearl damage, cutting fall damage by up to 48%.',
    debate: 'Depth Strider III vs Frost Walker II: Depth Strider is vastly superior because it boosts swim and riptide speed; Frost Walker freezes water blocks, breaking automated crop farms and blocking ocean dives.',
    giveCommand: `/give @p netherite_boots[minecraft:enchantments={levels:{'minecraft:protection':4,'minecraft:feather_falling':4,'minecraft:depth_strider':3,'minecraft:soul_speed':3,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'god_sword',
    name: 'God Sword (Generalist & PvE)',
    item: 'Netherite Sword',
    icon: 'diamond_sword',
    category: 'Weapons',
    tags: ['god weapons', 'weapon', 'sword', 'blade', 'melee', 'sharpness', 'looting', 'sweeping edge', 'fire aspect', 'unbreaking', 'mending', 'smite', 'knockback', 'netherite'],
    mustHaves: ['Sharpness V', 'Looting III', 'Sweeping Edge III', 'Fire Aspect II', 'Unbreaking III', 'Mending'],
    optional: ['Knockback II', 'Smite V (Boss Variant)'],
    description: 'Deals 14.35 melee damage per strike. Sweeping Edge III (Java only) deals 80% sweep damage to adjacent mob groups. Looting III multiplies mineral and mob drop rates.',
    debate: 'Sharpness V vs Smite V: Sharpness works on all targets; Smite V adds +12.5 HP damage against Undead, allowing players to destroy Withers and Skeletons in seconds. Knockback II can be annoying when chasing skeletons.',
    giveCommand: `/give @p netherite_sword[minecraft:enchantments={levels:{'minecraft:sharpness':5,'minecraft:looting':3,'minecraft:sweeping_edge':3,'minecraft:fire_aspect':2,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'god_mace',
    name: 'God Mace (1.21 Tricky Trials)',
    item: 'The Mace',
    icon: 'the_mace',
    category: 'Weapons',
    tags: ['god weapons', 'weapon', 'mace', 'smash', 'heavy mace', 'wind burst', 'density', 'breach', 'fire aspect', 'unbreaking', 'mending', 'smite', '1.21', 'tricky trials'],
    mustHaves: ['Wind Burst III', 'Density V', 'Fire Aspect II', 'Unbreaking III', 'Mending'],
    optional: ['Breach IV'],
    description: '1.21 Smash weapon! Wind Burst III launches the attacker 21 blocks into the sky upon landing a smash hit, chaining infinite aerial smashes. Density V adds +2.5 HP per block of fall distance.',
    debate: 'Density V vs Breach IV: Density maximizes raw damage against unarmored mobs (Warden, Iron Golem, Ender Dragon); Breach IV penetrates 60% armor, devastating Netherite PvP opponents.',
    giveCommand: `/give @p mace[minecraft:enchantments={levels:{'minecraft:wind_burst':3,'minecraft:density':5,'minecraft:fire_aspect':2,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'god_axe',
    name: 'God Axe (Combat & Lumberjack)',
    item: 'Netherite Axe',
    icon: 'diamond_axe',
    category: 'Weapons & Tools',
    tags: ['god weapons', 'god tools', 'weapon', 'tool', 'axe', 'lumberjack', 'wood', 'chopping', 'sharpness', 'efficiency', 'silk touch', 'fortune', 'unbreaking', 'mending', 'shield disable', 'netherite'],
    mustHaves: ['Efficiency V', 'Sharpness V', 'Silk Touch', 'Unbreaking III', 'Mending'],
    optional: ['Fortune III', 'Smite V'],
    description: 'Deals 13 base damage and disables player shields for 5 seconds on sprint-critical hits. Efficiency V insta-chops wood logs.',
    debate: 'Silk Touch vs Fortune III: Silk Touch allows collecting Melons, Beehives with bees, Bookshelves, and Ender Chests; Fortune multiplies saplings and apples.',
    giveCommand: `/give @p netherite_axe[minecraft:enchantments={levels:{'minecraft:efficiency':5,'minecraft:sharpness':5,'minecraft:silk_touch':1,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'fortune_pickaxe',
    name: 'Fortune Pickaxe (The Miner)',
    item: 'Netherite Pickaxe',
    icon: 'diamond_pickaxe',
    category: 'Tools',
    tags: ['god tools', 'tool', 'pickaxe', 'fortune', 'mining', 'miners', 'ores', 'diamond', 'efficiency', 'unbreaking', 'mending', 'haste', 'netherite'],
    mustHaves: ['Efficiency V', 'Fortune III', 'Unbreaking III', 'Mending'],
    optional: [],
    description: 'Multiplies raw ores, Diamonds, Ancient Debris chunks, Emeralds, Lapis, Redstone, Coal, and Nether Quartz up to 4x drops (average +120% yield).',
    debate: 'Must never be placed on the same pickaxe as Silk Touch (they are mutually exclusive). Pair with Haste II beacon for instant-mining.',
    giveCommand: `/give @p netherite_pickaxe[minecraft:enchantments={levels:{'minecraft:efficiency':5,'minecraft:fortune':3,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'silktouch_pickaxe',
    name: 'Silk Touch Pickaxe (The Builder)',
    item: 'Netherite Pickaxe',
    icon: 'diamond_pickaxe',
    category: 'Tools',
    tags: ['god tools', 'tool', 'pickaxe', 'silk touch', 'builder', 'mining', 'ender chest', 'glass', 'ice', 'sculk', 'efficiency', 'unbreaking', 'mending', 'netherite'],
    mustHaves: ['Efficiency V', 'Silk Touch', 'Unbreaking III', 'Mending'],
    optional: [],
    description: 'Mines blocks in their pristine state without dropping fragments: Ender Chests, Glass, Ice, Blue Ice, Sea Lanterns, Ore Blocks, and Sculk.',
    debate: 'Carrying both a Fortune III and a Silk Touch pickaxe in your hotbar covers 100% of survival resource harvesting.',
    giveCommand: `/give @p netherite_pickaxe[minecraft:enchantments={levels:{'minecraft:efficiency':5,'minecraft:silk_touch':1,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'god_shovel',
    name: 'God Shovel',
    item: 'Netherite Shovel',
    icon: 'diamond_shovel',
    category: 'Tools',
    tags: ['god tools', 'tool', 'shovel', 'spade', 'excavation', 'dirt', 'sand', 'gravel', 'efficiency', 'silk touch', 'fortune', 'unbreaking', 'mending', 'netherite'],
    mustHaves: ['Efficiency V', 'Silk Touch', 'Unbreaking III', 'Mending'],
    optional: ['Fortune III (for 100% Flint)'],
    description: 'Instantly excavations Dirt, Sand, Gravel, Mud, and Soul Sand. Silk Touch collects Grass Blocks, Mycelium, and Podzol without requiring shears.',
    debate: 'Fortune III on shovels guarantees 100% Flint drops from gravel, but prevents collecting raw gravel for concrete recipes.',
    giveCommand: `/give @p netherite_shovel[minecraft:enchantments={levels:{'minecraft:efficiency':5,'minecraft:silk_touch':1,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'god_hoe',
    name: 'God Hoe',
    item: 'Netherite Hoe',
    icon: 'diamond_hoe',
    category: 'Tools',
    tags: ['god tools', 'tool', 'hoe', 'farming', 'crops', 'sculk', 'sponges', 'leaves', 'hay', 'target', 'efficiency', 'fortune', 'silk touch', 'unbreaking', 'mending', 'netherite'],
    mustHaves: ['Efficiency V', 'Fortune III', 'Unbreaking III', 'Mending'],
    optional: ['Silk Touch'],
    description: 'Rapidly mines Sculk veins, Catalysts, Leaves, Sponges, Hay Bales, Target Blocks, and Nether Wart Blocks. Fortune III multiplies seed yields and saplings.',
    debate: 'In 1.16+, hoes became genuine specialized tools for mining spongy/organic blocks.',
    giveCommand: `/give @p netherite_hoe[minecraft:enchantments={levels:{'minecraft:efficiency':5,'minecraft:fortune':3,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'infinite_bow',
    name: 'The Infinite Bow',
    item: 'Bow',
    icon: 'bow',
    category: 'Ranged',
    tags: ['god ranged', 'ranged', 'bow', 'infinite bow', 'infinity', 'arrows', 'sniper', 'power', 'flame', 'punch', 'unbreaking'],
    mustHaves: ['Power V', 'Flame', 'Punch II', 'Infinity', 'Unbreaking III'],
    optional: [],
    description: 'Fires unlimited mundane arrows as long as 1 arrow is kept in your inventory. Deals 25 damage on full draw and ignites targets with Flame.',
    debate: 'Infinity vs Mending: Infinity cannot have Mending. Eventually it must be repaired on an anvil until it reaches the 40-level cap, then replaced.',
    giveCommand: `/give @p bow[minecraft:enchantments={levels:{'minecraft:power':5,'minecraft:flame':1,'minecraft:punch':2,'minecraft:infinity':1,'minecraft:unbreaking':3}}] 1`
  },
  {
    id: 'mending_bow',
    name: 'The Mending Bow',
    item: 'Bow',
    icon: 'bow',
    category: 'Ranged',
    tags: ['god ranged', 'ranged', 'bow', 'mending bow', 'mending', 'arrows', 'tipped arrows', 'spectral', 'power', 'flame', 'punch', 'unbreaking'],
    mustHaves: ['Power V', 'Flame', 'Punch II', 'Mending', 'Unbreaking III'],
    optional: [],
    description: 'Will never break, self-repairing with XP orbs. Perfect for players who fire tipped arrows (Spectral, Poison, Harming) since Infinity only duplicates normal arrows!',
    debate: 'Requires carrying bundles/quivers of arrows, but lasts forever.',
    giveCommand: `/give @p bow[minecraft:enchantments={levels:{'minecraft:power':5,'minecraft:flame':1,'minecraft:punch':2,'minecraft:mending':1,'minecraft:unbreaking':3}}] 1`
  },
  {
    id: 'god_crossbow',
    name: 'God Crossbow',
    item: 'Crossbow',
    icon: 'crossbow',
    category: 'Ranged',
    tags: ['god ranged', 'ranged', 'crossbow', 'quick charge', 'multishot', 'piercing', 'firework rockets', 'shotgun', 'unbreaking', 'mending'],
    mustHaves: ['Quick Charge III', 'Multishot', 'Unbreaking III', 'Mending'],
    optional: ['Piercing IV (Alternative)'],
    description: 'Quick Charge III lowers load time to 0.75s. Multishot fires 3 projectiles simultaneously while consuming only 1 ammo item. Devastating when loaded with Firework Rockets (7 firework stars)!',
    debate: 'Multishot vs Piercing IV: Piercing arrows penetrate entities, bypass shields, and can be retrieved from the ground; Multishot provides lethal shotgun blast radius.',
    giveCommand: `/give @p crossbow[minecraft:enchantments={levels:{'minecraft:quick_charge':3,'minecraft:multishot':1,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'flight_trident',
    name: 'Flight Trident (Ocean & Rain Transport)',
    item: 'Trident',
    icon: 'trident',
    category: 'Weapons',
    tags: ['god ranged', 'god weapons', 'trident', 'flight trident', 'riptide', 'flight', 'flying', 'rain', 'water', 'elytra rocket boost', 'impaling', 'unbreaking', 'mending'],
    mustHaves: ['Riptide III', 'Impaling V', 'Unbreaking III', 'Mending'],
    optional: [],
    description: 'Propels the player like a human missile when in water or during rain/thunderstorms. Pairs with Elytra for infinite vertical rocket-less booster flight!',
    debate: 'Riptide cannot be thrown and cannot have Loyalty or Channeling.',
    giveCommand: `/give @p trident[minecraft:enchantments={levels:{'minecraft:riptide':3,'minecraft:impaling':5,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'thunder_trident',
    name: 'Lightning Combat Trident',
    item: 'Trident',
    icon: 'trident',
    category: 'Weapons',
    tags: ['god ranged', 'god weapons', 'trident', 'lightning trident', 'loyalty', 'channeling', 'thunder', 'lightning', 'charged creeper', 'witch', 'impaling', 'unbreaking', 'mending'],
    mustHaves: ['Loyalty III', 'Channeling', 'Impaling V', 'Unbreaking III', 'Mending'],
    optional: [],
    description: 'Thrown weapon that automatically flies back to the player. During thunderstorms, Channeling strikes targets with genuine lightning, creating Charged Creepers, Brown Mooshrooms, and Witches!',
    debate: 'Channeling only works during thunderstorms (not normal rain).',
    giveCommand: `/give @p trident[minecraft:enchantments={levels:{'minecraft:loyalty':3,'minecraft:channeling':1,'minecraft:impaling':5,'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  },
  {
    id: 'god_elytra',
    name: 'God Elytra',
    item: 'Elytra',
    icon: 'elytra',
    category: 'Utility',
    tags: ['god utility', 'god armor', 'elytra', 'wings', 'flying', 'glide', 'flight', 'end ship', 'unbreaking', 'mending'],
    mustHaves: ['Unbreaking III', 'Mending'],
    optional: [],
    description: 'Enables limitless gliding across the world. Mending repairs the wings continuously as you fly through XP mob farms or pick up furnace XP.',
    debate: 'Can only be enchanted on an Anvil using Enchanted Books.',
    giveCommand: `/give @p elytra[minecraft:enchantments={levels:{'minecraft:unbreaking':3,'minecraft:mending':1}}] 1`
  }
];

// =========================================================================
// ANVIL BINARY MERGE TREE STRATEGY (How to bypass 40-level "Too Expensive!")
// =========================================================================
export const ANVIL_BINARY_TREE_TUTORIAL = {
  title: 'Binary Tree Merge Optimization',
  subtitle: 'The mathematical algorithm to combine 6+ books onto armor without hitting the 40-level cap.',
  linearFailure: [
    { step: 'Item + Book 1', penalty: '0 XP', totalCost: '2 Levels', newPenalty: 1 },
    { step: 'Item + Book 2', penalty: '1 XP', totalCost: '5 Levels', newPenalty: 3 },
    { step: 'Item + Book 3', penalty: '3 XP', totalCost: '9 Levels', newPenalty: 7 },
    { step: 'Item + Book 4', penalty: '7 XP', totalCost: '16 Levels', newPenalty: 15 },
    { step: 'Item + Book 5', penalty: '15 XP', totalCost: '29 Levels', newPenalty: 31 },
    { step: 'Item + Book 6', penalty: '31 XP', totalCost: '≥ 42 Levels', newPenalty: 'TOO EXPENSIVE! (Refused)' }
  ],
  binaryTreeSuccess: [
    { step: 'Pair 1: Book A + Book B', cost: '2 Levels', resultingWorkPenalty: 1 },
    { step: 'Pair 2: Book C + Book D', cost: '2 Levels', resultingWorkPenalty: 1 },
    { step: 'Pair 3: Book E + Book F', cost: '2 Levels', resultingWorkPenalty: 1 },
    { step: 'Quad: Pair 2 + Pair 3', cost: '5 Levels', resultingWorkPenalty: 2 },
    { step: 'Equip: Equipment + Pair 1', cost: '4 Levels', resultingWorkPenalty: 2 },
    { step: 'Final: Equip-Pair1 + Quad', cost: '17–23 Levels', resultingWorkPenalty: 3, status: 'SUCCESS! Well under 40-level cap!' }
  ],
  goldenRule: 'Always combine items and books in pairs like a tournament bracket! The resulting Prior Work Penalty of combining two items is max(PenaltyA, PenaltyB) + 1, keeping tree depth at only 3!'
};

// =========================================================================
// MATERIAL ENCHANTABILITY INDEX (https://minecraft.fandom.com/wiki/Enchanting)
// =========================================================================
export const ENCHANTABILITY_INDEX = [
  { material: 'Gold', armorEnchantability: 25, toolEnchantability: 22, rarityTier: 'Extremely High', notes: 'Highest enchantability in Minecraft! Easily rolls Sharpness IV, Fortune III, and multiple enchantments at level 30.' },
  { material: 'Netherite', armorEnchantability: 15, toolEnchantability: 15, rarityTier: 'High', notes: 'Higher enchantability than diamond, rolling bonus secondaries with greater frequency.' },
  { material: 'Leather', armorEnchantability: 15, toolEnchantability: 'N/A', rarityTier: 'High', notes: 'Leather armor has surprisingly high alchemical receptivity.' },
  { material: 'Wood', armorEnchantability: 'N/A', toolEnchantability: 15, rarityTier: 'High', notes: 'Organic wood fibers absorb enchantments easily.' },
  { material: 'Iron', armorEnchantability: 9, toolEnchantability: 14, rarityTier: 'Moderate', notes: 'Solid standard enchantability.' },
  { material: 'Chainmail', armorEnchantability: 12, toolEnchantability: 'N/A', rarityTier: 'Moderate', notes: 'Flexible chain links receive enchantments better than solid iron plate.' },
  { material: 'Diamond', armorEnchantability: 10, toolEnchantability: 10, rarityTier: 'Low-Moderate', notes: 'Diamond is rigid; requires higher enchanting table rolls and bookshelves for top secondary tiers.' },
  { material: 'Stone', armorEnchantability: 'N/A', toolEnchantability: 5, rarityTier: 'Very Low', notes: 'Lowest enchantability among tools; rarely rolls more than 1 basic enchantment.' }
];

// =========================================================================
// ENCHANTING TABLE MATHEMATICAL FORMULAS (https://minecraft.fandom.com/wiki/Enchanting)
// =========================================================================
export const ENCHANTING_FORMULAS = [
  {
    step: '1. Bookshelf Level Base',
    formula: 'B = count(bookshelves, max 15)',
    explanation: 'Base power scale: max enchanting level equals floor(B * 2) if B > 0, capped at 30 levels.'
  },
  {
    step: '2. Slot Cost Scaling',
    formula: 'Top Slot = max(1, floor(Base/3)) | Mid Slot = floor(Base*2/3)+1 | Bot Slot = max(Base, B*2)',
    explanation: 'The three table slots offer low, medium, and maximum power tiers.'
  },
  {
    step: '3. Modified Enchantment Level',
    formula: 'ModifiedLevel = BaseCost + random(0, floor(Enchantability/4)) + random(0, floor(Enchantability/4)) + 1',
    explanation: 'Adds material enchantability bonuses. Golden items add up to +10 bonus levels to the roll.'
  },
  {
    step: '4. Triangle Random Multiplier',
    formula: 'FinalLevel = ModifiedLevel * (1 ± random(0, 0.15))',
    explanation: 'Applies a triangular distribution between 85% and 115% of the modified level before picking enchantments from weighted pools.'
  }
];


