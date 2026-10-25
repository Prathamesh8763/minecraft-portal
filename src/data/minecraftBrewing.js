// Comprehensive Data for Minecraft Java Edition Brewing & Alchemy
// Verified against official Minecraft Wiki (https://minecraft.wiki/w/Brewing)

export const BREWING_EQUIPMENT = [
  {
    id: 'brewing_stand',
    name: 'Brewing Stand',
    icon: 'brewing_stand',
    crafting: '1 Blaze Rod (center) + 3 Cobblestone / Blackstone / Cobbled Deepslate (bottom row)',
    desc: 'The central workstation for all alchemical transformations. Features 1 top ingredient slot, 3 bottom potion bottle slots, and 1 Blaze Powder fuel receptacle.',
    capacity: 'Processes up to 3 potion bottles simultaneously per ingredient with identical fuel consumption.'
  },
  {
    id: 'blaze_powder',
    name: 'Blaze Powder Fuel',
    icon: 'blaze_powder',
    crafting: 'Crafted from 1 Blaze Rod (yields 2 Blaze Powder)',
    desc: 'Mandatory thermal fuel source introduced in Java 1.9. One unit provides exactly 20 brewing operations on the amber fuel gauge.',
    capacity: '20 Brewing charges per powder unit.'
  },
  {
    id: 'glass_bottle',
    name: 'Glass Bottle & Water Bottle',
    icon: 'glass_bottle',
    crafting: '3 Glass Blocks in a V-shape crafting grid (yields 3 Glass Bottles)',
    desc: 'Filled by right-clicking a water source or a cauldron. Water bottles serve as the baseline solvent for all brewing recipes.',
    capacity: 'Contains 1 water dose (1/3 of a full cauldron).'
  },
  {
    id: 'cauldron',
    name: 'Cauldron',
    icon: 'cauldron',
    crafting: '7 Iron Ingots in a U-shape crafting grid',
    desc: 'Stores 1 bucket of water (equivalent to 3 glass bottle fills). In Bedrock Edition, cauldrons can store brewed potions directly for arrow dipping.',
    capacity: '3 water bottle fills per water bucket.'
  }
];

export const INGREDIENT_MODIFIERS = [
  {
    id: 'nether_wart',
    name: 'Nether Wart',
    icon: 'nether_wart',
    role: 'Primary Base Solvent',
    effect: 'Converts Water Bottle into Awkward Potion. Essential starting point for 95% of all effect potions.',
    appliesTo: 'Water Bottle'
  },
  {
    id: 'redstone',
    name: 'Redstone Dust',
    icon: 'redstone',
    role: 'Duration Extension',
    effect: 'Extends potion duration (e.g. 3:00 → 8:00, or 1:30 → 4:00). Incompatible with Glowstone amplification.',
    appliesTo: 'Most timed positive and negative effect potions'
  },
  {
    id: 'glowstone_dust',
    name: 'Glowstone Dust',
    icon: 'glowstone_dust',
    role: 'Potency Enhancement (Tier II)',
    effect: 'Increases effect tier from Level I to Level II (e.g. Speed II, Strength II), with halved duration. Incompatible with Redstone.',
    appliesTo: 'Potions with tier II potency variants'
  },
  {
    id: 'fermented_spider_eye',
    name: 'Fermented Spider Eye',
    icon: 'fermented_spider_eye',
    role: 'Alchemical Corruption / Inversion',
    effect: 'Inverts potion attributes: Healing → Harming, Poison → Harming, Swiftness → Slowness, Leaping → Slowness, Night Vision → Invisibility.',
    appliesTo: 'Specific base and effect potions'
  },
  {
    id: 'gunpowder',
    name: 'Gunpowder',
    icon: 'gunpowder',
    role: 'Splash Transformation',
    effect: 'Converts drinkable potion into a throwable Splash Potion for ranged area-of-effect delivery.',
    appliesTo: 'All drinkable potions'
  },
  {
    id: 'dragons_breath',
    name: "Dragon's Breath",
    icon: 'dragons_breath',
    role: 'Lingering Cloud Transformation',
    effect: 'Converts a Splash Potion into a Lingering Potion, generating a persistent cloud on the ground and enabling Tipped Arrow crafting.',
    appliesTo: 'All splash potions'
  }
];

export const EFFECT_INGREDIENTS = [
  { id: 'sugar', name: 'Sugar', icon: 'sugar', creates: 'Potion of Swiftness', desc: '+20% Movement Speed' },
  { id: 'rabbits_foot', name: "Rabbit's Foot", icon: 'rabbits_foot', creates: 'Potion of Leaping', desc: '+Jump Boost & reduced fall damage' },
  { id: 'blaze_powder', name: 'Blaze Powder', icon: 'blaze_powder', creates: 'Potion of Strength', desc: '+3 Attack Damage (+1.5 Hearts)' },
  { id: 'glistering_melon_slice', name: 'Glistering Melon Slice', icon: 'glistering_melon_slice', creates: 'Potion of Healing', desc: 'Instantly restores 4 Hearts (Instant Health)' },
  { id: 'spider_eye', name: 'Spider Eye', icon: 'spider_eye', creates: 'Potion of Poison', desc: 'Depletes health over time down to 1 HP' },
  { id: 'ghast_tear', name: 'Ghast Tear', icon: 'ghast_tear', creates: 'Potion of Regeneration', desc: 'Restores health over time (+1 HP every 2.5s)' },
  { id: 'magma_cream', name: 'Magma Cream', icon: 'magma_cream', creates: 'Potion of Fire Resistance', desc: 'Complete immunity to fire, lava, and blaze fireballs' },
  { id: 'pufferfish', name: 'Pufferfish', icon: 'pufferfish', creates: 'Potion of Water Breathing', desc: 'Prevents drowning and enhances underwater vision' },
  { id: 'golden_carrot', name: 'Golden Carrot', icon: 'golden_carrot', creates: 'Potion of Night Vision', desc: 'Full brightness in caves and water' },
  { id: 'turtle_helmet', name: 'Turtle Shell', icon: 'turtle_helmet', creates: 'Potion of the Turtle Master', desc: 'Resistance III/IV + Slowness IV/VI (Tank mode)' },
  { id: 'phantom_membrane', name: 'Phantom Membrane', icon: 'phantom_membrane', creates: 'Potion of Slow Falling', desc: 'Glides slowly and nullifies all fall damage' },
  { id: 'breeze_rod', name: 'Breeze Rod', icon: 'breeze_rod', creates: 'Potion of Wind Charging (1.21)', desc: 'Emits a localized wind burst upon death' },
  { id: 'cobweb', name: 'Cobweb', icon: 'cobweb', creates: 'Potion of Weaving (1.21)', desc: 'Spawns 2–3 cobwebs on death; 50% faster movement in webs' },
  { id: 'slimeball', name: 'Slime Block / Slimeball', icon: 'slimeball', creates: 'Potion of Oozing (1.21)', desc: 'Spawns 2 medium slimes upon entity death' },
  { id: 'stone', name: 'Stone / Iron Block', icon: 'stone', creates: 'Potion of Infested (1.21)', desc: '10% chance to spawn 1–2 silverfish when damaged' }
];

export const BREWING_RECIPES = [
  // 3.1 Base Potions
  {
    id: 'awkward',
    name: 'Awkward Potion',
    category: 'Base Potions (3.1)',
    base: 'Water Bottle',
    baseId: 'glass_bottle',
    ingredient: 'Nether Wart',
    ingredientId: 'nether_wart',
    duration: 'N/A',
    description: 'No effect. The essential alchemical precursor for brewing positive and negative effect potions.',
    tier: 'Base',
    color: '#3b82f6'
  },
  {
    id: 'weakness_direct',
    name: 'Potion of Weakness',
    category: 'Base Potions (3.1)',
    base: 'Water Bottle (No Nether Wart required!)',
    baseId: 'glass_bottle',
    ingredient: 'Fermented Spider Eye',
    ingredientId: 'fermented_spider_eye',
    duration: '1:30 (4:00 extended)',
    description: 'Reduces melee damage by 4.0. Unique potion that can be brewed directly from water bottles without Nether Wart.',
    tier: 'Tier I',
    color: '#475569'
  },
  {
    id: 'mundane',
    name: 'Mundane Potion',
    category: 'Base Potions (3.1)',
    base: 'Water Bottle',
    baseId: 'glass_bottle',
    ingredient: 'Sugar / Redstone / Ghast Tear',
    ingredientId: 'sugar',
    duration: 'N/A',
    description: 'Failed base potion with no status effect. Can only brew into Potion of Weakness with Fermented Spider Eye.',
    tier: 'Base',
    color: '#64748b'
  },
  {
    id: 'thick',
    name: 'Thick Potion',
    category: 'Base Potions (3.1)',
    base: 'Water Bottle',
    baseId: 'glass_bottle',
    ingredient: 'Glowstone Dust',
    ingredientId: 'glowstone_dust',
    duration: 'N/A',
    description: 'Failed dense base potion with no effect and no current functional recipe branches in vanilla.',
    tier: 'Base',
    color: '#71717a'
  },

  // 3.2.1 Positive Effects
  {
    id: 'swiftness',
    name: 'Potion of Swiftness (Speed)',
    category: 'Positive Effects (3.2.1)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Sugar',
    ingredientId: 'sugar',
    duration: '3:00 (Speed I) • 8:00 (Redstone) • 1:30 (Speed II)',
    description: 'Increases player movement speed and field-of-view by +20% (Speed I) or +40% (Speed II).',
    tier: 'Tier I / II',
    color: '#38bdf8'
  },
  {
    id: 'strength',
    name: 'Potion of Strength',
    category: 'Positive Effects (3.2.1)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Blaze Powder',
    ingredientId: 'blaze_powder',
    duration: '3:00 (Strength I) • 8:00 (Redstone) • 1:30 (Strength II)',
    description: 'Increases melee damage by +3 HP (+1.5 Hearts) for Strength I, or +6 HP (+3 Hearts) for Strength II.',
    tier: 'Tier I / II',
    color: '#991b1b'
  },
  {
    id: 'healing',
    name: 'Potion of Healing (Instant Health)',
    category: 'Positive Effects (3.2.1)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Glistering Melon Slice',
    ingredientId: 'glistering_melon_slice',
    duration: 'Instant',
    description: 'Instantly restores 4 Hearts (Instant Health I) or 8 Hearts (Instant Health II). Damages undead mobs!',
    tier: 'Tier I / II',
    color: '#f43f5e'
  },
  {
    id: 'regeneration',
    name: 'Potion of Regeneration',
    category: 'Positive Effects (3.2.1)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Ghast Tear',
    ingredientId: 'ghast_tear',
    duration: '0:45 (Regen I) • 1:30 (Redstone) • 0:22 (Regen II)',
    description: 'Regenerates health over time: 1 HP every 2.5s (Regen I) or 1 HP every 1.25s (Regen II).',
    tier: 'Tier I / II',
    color: '#ec4899'
  },
  {
    id: 'fire_resistance',
    name: 'Potion of Fire Resistance',
    category: 'Positive Effects (3.2.1)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Magma Cream',
    ingredientId: 'magma_cream',
    duration: '3:00 (Standard) • 8:00 (Redstone)',
    description: 'Grants total immunity to fire damage, lava burns, blaze fireballs, and campfire heat.',
    tier: 'Tier I (Extended)',
    color: '#f97316'
  },
  {
    id: 'water_breathing',
    name: 'Potion of Water Breathing',
    category: 'Positive Effects (3.2.1)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Pufferfish',
    ingredientId: 'pufferfish',
    duration: '3:00 (Standard) • 8:00 (Redstone)',
    description: 'Oxygen bubble bar does not deplete underwater, and improves submerged visibility.',
    tier: 'Tier I (Extended)',
    color: '#0284c7'
  },
  {
    id: 'night_vision',
    name: 'Potion of Night Vision',
    category: 'Positive Effects (3.2.1)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Golden Carrot',
    ingredientId: 'golden_carrot',
    duration: '3:00 (Standard) • 8:00 (Redstone)',
    description: 'Renders the environment at maximum light level 15 in complete darkness and deep caves.',
    tier: 'Tier I (Extended)',
    color: '#1e3a8a'
  },
  {
    id: 'invisibility',
    name: 'Potion of Invisibility',
    category: 'Positive Effects (3.2.1)',
    base: 'Potion of Night Vision',
    baseId: 'night_vision',
    ingredient: 'Fermented Spider Eye',
    ingredientId: 'fermented_spider_eye',
    duration: '3:00 (Standard) • 8:00 (Redstone)',
    description: 'Renders the player character model transparent. Mobs will not notice you unless armor is worn.',
    tier: 'Corrupted',
    color: '#94a3b8'
  },
  {
    id: 'leaping',
    name: 'Potion of Leaping (Jump Boost)',
    category: 'Positive Effects (3.2.1)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: "Rabbit's Foot",
    ingredientId: 'rabbits_foot',
    duration: '3:00 (Jump I) • 8:00 (Redstone) • 1:30 (Jump II)',
    description: 'Increases jump height (+0.5 blocks for Jump I, +1.25 blocks for Jump II) and reduces fall damage.',
    tier: 'Tier I / II',
    color: '#22c55e'
  },
  {
    id: 'slow_falling',
    name: 'Potion of Slow Falling',
    category: 'Positive Effects (3.2.1)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Phantom Membrane',
    ingredientId: 'phantom_membrane',
    duration: '1:30 (Standard) • 4:00 (Redstone)',
    description: 'Glides gently downwards like a feather and completely eliminates all impact fall damage.',
    tier: 'Tier I (Extended)',
    color: '#f8fafc'
  },
  {
    id: 'wind_charged',
    name: 'Potion of Wind Charging (1.21)',
    category: 'Positive Effects (3.2.1)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Breeze Rod',
    ingredientId: 'breeze_rod',
    duration: '3:00 (Standard)',
    description: 'New 1.21 Tricky Trials potion! Causes the affected entity to burst with a powerful wind charge blast upon death.',
    tier: '1.21 Ominous',
    color: '#38bdf8'
  },

  // 3.2.2 Negative Effects
  {
    id: 'poison',
    name: 'Potion of Poison',
    category: 'Negative Effects (3.2.2)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Spider Eye',
    ingredientId: 'spider_eye',
    duration: '0:45 (Poison I) • 1:30 (Redstone) • 0:21 (Poison II)',
    description: 'Drains health continuously down to 1 HP (cannot deal lethal damage). Does not affect undead mobs.',
    tier: 'Tier I / II',
    color: '#4d7c0f'
  },
  {
    id: 'harming',
    name: 'Potion of Harming (Instant Damage)',
    category: 'Negative Effects (3.2.2)',
    base: 'Potion of Healing or Potion of Poison',
    baseId: 'potion_bottle',
    ingredient: 'Fermented Spider Eye',
    ingredientId: 'fermented_spider_eye',
    duration: 'Instant',
    description: 'Instantly deals 6 HP (3 Hearts) or 12 HP (6 Hearts) of damage directly bypassing armor. Heals undead mobs!',
    tier: 'Corrupted Tier I / II',
    color: '#450a0a'
  },
  {
    id: 'slowness',
    name: 'Potion of Slowness',
    category: 'Negative Effects (3.2.2)',
    base: 'Potion of Swiftness or Potion of Leaping',
    baseId: 'potion_bottle',
    ingredient: 'Fermented Spider Eye',
    ingredientId: 'fermented_spider_eye',
    duration: '1:30 (Slowness I) • 4:00 (Redstone) • 0:20 (Slowness IV)',
    description: 'Decreases movement speed by -15% (Slowness I) or -60% (Slowness IV).',
    tier: 'Corrupted',
    color: '#475569'
  },
  {
    id: 'weaving',
    name: 'Potion of Weaving (1.21)',
    category: 'Negative Effects (3.2.2)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Cobweb',
    ingredientId: 'cobweb',
    duration: '3:00 (Standard)',
    description: 'New 1.21 Tricky Trials potion! Spawns 2–3 cobwebs upon death, and allows the entity to move through webs at 50% speed.',
    tier: '1.21 Ominous',
    color: '#cbd5e1'
  },
  {
    id: 'oozing',
    name: 'Potion of Oozing (1.21)',
    category: 'Negative Effects (3.2.2)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Slimeball',
    ingredientId: 'slimeball',
    duration: '3:00 (Standard)',
    description: 'New 1.21 Tricky Trials potion! Causes the affected entity to spawn 2 medium slimes upon death.',
    tier: '1.21 Ominous',
    color: '#84cc16'
  },
  {
    id: 'infested',
    name: 'Potion of Infested (1.21)',
    category: 'Negative Effects (3.2.2)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Stone Block',
    ingredientId: 'stone',
    duration: '3:00 (Standard)',
    description: 'New 1.21 Tricky Trials potion! Whenever the entity takes damage, there is a 10% chance to burst spawn 1–2 silverfish.',
    tier: '1.21 Ominous',
    color: '#71717a'
  },

  // 3.2.3 Mixed Effects
  {
    id: 'turtle_master',
    name: 'Potion of the Turtle Master',
    category: 'Mixed Effects (3.2.3)',
    base: 'Awkward Potion',
    baseId: 'awkward_potion',
    ingredient: 'Turtle Shell',
    ingredientId: 'turtle_helmet',
    duration: '0:20 (Resist III + Slow IV) • 0:40 (Redstone) • 0:20 (Resist IV + Slow VI)',
    description: 'Colossal defensive power: grants up to 80% damage reduction (Resistance IV) at the cost of 90% reduced speed (Slowness VI).',
    tier: 'Tier I / II',
    color: '#065f46'
  }
];

export const BREWING_CURES = [
  {
    id: 'milk_bucket',
    name: 'Milk Bucket',
    icon: 'milk_bucket',
    action: 'Universal Status Purge',
    desc: 'Drinking a Milk Bucket instantly removes ALL active status effects (both positive and negative buffs) immediately.',
    remedyFor: 'All status effects (Poison, Wither, Bad Omen, Strength, Speed, etc.)'
  },
  {
    id: 'honey_bottle',
    name: 'Honey Bottle',
    icon: 'honey_bottle',
    action: 'Targeted Antidote',
    desc: 'Drinking a Honey Bottle cures the Poison effect specifically while preserving all your positive active buffs and potion effects!',
    remedyFor: 'Poison effect specifically (Bee stings, Cave Spiders, Witches)'
  },
  {
    id: 'totem_of_undying',
    name: 'Totem of Undying',
    icon: 'totem_of_undying',
    action: 'Lethal Cleansing & Revival',
    desc: 'Clears all negative potion effects upon fatal damage, restoring 1/2 heart and applying Regeneration II (0:45), Absorption II (0:05), and Fire Resistance I (0:40).',
    remedyFor: 'Lethal fatal damage from any potion or attack'
  }
];

export const UNBREWABLE_POTIONS = [
  {
    name: 'Potion of Luck',
    icon: 'potion_bottle',
    color: '#34d399',
    effect: '+1 Luck Attribute (Increases fishing treasures and high-tier loot table rolls). Only available via /give or Creative Mode.',
    edition: 'Java & Bedrock (Uncraftable)'
  },
  {
    name: 'Potion of Bad Luck',
    icon: 'potion_bottle',
    color: '#15803d',
    effect: '-1 Luck Attribute (Decreases chance of high-tier loot). Only accessible through commands.',
    edition: 'Java & Bedrock (Uncraftable)'
  },
  {
    name: 'Potion of Decay',
    icon: 'potion_bottle',
    color: '#1c1917',
    effect: 'Applies the lethal Wither II status effect. In Bedrock Edition, witches occasionally drop it and cauldrons can brew it with Wither Roses.',
    edition: 'Bedrock Exclusive / Java Creative'
  },
  {
    name: 'Ominous Bottle (I - V)',
    icon: 'potion_bottle',
    color: '#831843',
    effect: 'Applies Bad Omen for 1 hour and 40 minutes, which triggers Raids near villages or Trial Omen inside 1.21 Trial Chambers.',
    edition: '1.21 Tricky Trials (Loot Drop only)'
  }
];

export const BREWING_HISTORY = [
  {
    version: 'Beta 1.9 Prerelease 2',
    date: 'September 2011',
    highlight: 'First Prototype',
    desc: 'Jens Bergensten & Notch added cauldrons for brewing with boiling water and experimental ingredients.'
  },
  {
    version: 'Java Edition 1.0.0',
    date: 'November 2011',
    highlight: 'Brewing Stand Introduced',
    desc: 'Replaced cauldrons with the 3-bottle Brewing Stand and introduced Nether Wart as the core alchemical prerequisite.'
  },
  {
    version: 'Java Edition 1.9 (Combat Update)',
    date: 'February 2016',
    highlight: 'Fuel & Lingering Potions',
    desc: "Introduced the Blaze Powder fuel requirement (20 operations per powder), Dragon's Breath, Lingering Potions, and Tipped Arrows."
  },
  {
    version: 'Java Edition 1.13 (Update Aquatic)',
    date: 'July 2018',
    highlight: 'Turtle Master & Slow Falling',
    desc: 'Added Potion of the Turtle Master (Turtle Shell) and Potion of Slow Falling (Phantom Membrane).'
  },
  {
    version: 'Java Edition 1.15 (Buzzy Bees)',
    date: 'December 2019',
    highlight: 'Honey Bottle Antidote',
    desc: 'Honey Bottles can be consumed to cure Poison while keeping other beneficial potion effects intact.'
  },
  {
    version: 'Java Edition 1.21 (Tricky Trials)',
    date: 'June 2024 – 2026',
    highlight: 'Ominous Potions & Trials',
    desc: 'Introduced 4 new brewing recipes (Wind Charged, Weaving, Oozing, Infested) and tiered Ominous Bottles (I–V).'
  }
];
