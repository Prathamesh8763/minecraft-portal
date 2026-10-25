/**
 * Comprehensive Brewing Asset Registry & Botanical Taxonomy for Minecraft Java Edition
 * Standardizes item sprites, bottle visual colors, recipe paths, and status effects.
 * Complies with Minecraft Usage Guidelines (independent fan reference).
 */

export const BREWING_ASSET_REGISTRY = {
  // Equipment
  equipment: {
    brewing_stand: {
      id: 'brewing_stand',
      name: 'Brewing Stand',
      category: 'Equipment',
      sprite: '/icons/minecraft/brewing_stand.svg',
      fallbackSprite: '/icons/minecraft/brewing_stand.png',
      desc: 'Workstation for potion brewing. Features 1 top ingredient slot, 3 bottom bottle slots, and 1 Blaze fuel gauge.'
    },
    blaze_powder: {
      id: 'blaze_powder',
      name: 'Blaze Powder (Fuel)',
      category: 'Equipment',
      sprite: '/icons/minecraft/blaze_powder.svg',
      fallbackSprite: '/icons/minecraft/blaze_powder.png',
      desc: 'Mandatory thermal fuel introduced in 1.9. 1 powder unit provides exactly 20 brewing operations.'
    },
    glass_bottle: {
      id: 'glass_bottle',
      name: 'Glass Bottle',
      category: 'Equipment',
      sprite: '/icons/minecraft/glass_bottle.svg',
      fallbackSprite: '/icons/minecraft/glass_bottle.png',
      desc: 'Vessel crafted from 3 glass blocks. Used to collect water from water sources or cauldrons.'
    },
    cauldron: {
      id: 'cauldron',
      name: 'Cauldron',
      category: 'Equipment',
      sprite: '/icons/minecraft/cauldron.svg',
      fallbackSprite: '/icons/minecraft/cauldron.png',
      desc: 'Holds 1 bucket of water, which precisely fills 3 glass water bottles.'
    }
  },

  // Base Ingredients
  baseIngredients: {
    nether_wart: {
      id: 'nether_wart',
      name: 'Nether Wart',
      role: 'Primary Base Solvent',
      roleType: 'base',
      sprite: '/icons/minecraft/nether_wart.svg',
      fallbackSprite: '/icons/minecraft/nether_wart.png',
      appliesTo: 'Water Bottle → Awkward Potion',
      desc: 'The universal alchemical foundation. Required for 95% of all beneficial and harmful potions in Minecraft.'
    },
    fermented_spider_eye: {
      id: 'fermented_spider_eye',
      name: 'Fermented Spider Eye',
      role: 'Alchemical Inversion / Corruption',
      roleType: 'modifier',
      sprite: '/icons/minecraft/fermented_spider_eye.svg',
      fallbackSprite: '/icons/minecraft/fermented_spider_eye.png',
      appliesTo: 'Direct Water Bottle (Weakness) or Corrupts Swiftness, Leaping, Healing, Poison, Night Vision',
      desc: 'Crafted from Spider Eye + Sugar + Brown Mushroom. Inverts potion properties to negative counter-parts.'
    },
    redstone: {
      id: 'redstone',
      name: 'Redstone Dust',
      role: 'Duration Extension',
      roleType: 'modifier',
      sprite: '/icons/minecraft/redstone.svg',
      fallbackSprite: '/icons/minecraft/redstone_dust.png',
      appliesTo: 'Most timed potions (3:00 → 8:00, 1:30 → 4:00)',
      desc: 'Extends effect duration. Mutually exclusive with Glowstone Dust amplification.'
    },
    glowstone_dust: {
      id: 'glowstone_dust',
      name: 'Glowstone Dust',
      role: 'Potency Amplification (Tier II)',
      roleType: 'modifier',
      sprite: '/icons/minecraft/glowstone_dust.svg',
      fallbackSprite: '/icons/minecraft/glowstone_dust.png',
      appliesTo: 'Potions with Tier II capabilities (Speed, Strength, Healing, Harming, Leaping, Poison, Regen)',
      desc: 'Boosts effect level from I to II while halving the duration. Incompatible with Redstone.'
    },
    gunpowder: {
      id: 'gunpowder',
      name: 'Gunpowder',
      role: 'Splash Delivery (Ranged AOE)',
      roleType: 'modifier',
      sprite: '/icons/minecraft/gunpowder.svg',
      fallbackSprite: '/icons/minecraft/gunpowder.png',
      appliesTo: 'Any drinkable potion bottle',
      desc: 'Converts drinkable potion into a throwable Splash Potion. Affects multiple entities in a radius.'
    },
    dragons_breath: {
      id: 'dragons_breath',
      name: "Dragon's Breath",
      role: 'Lingering Cloud & Tipped Arrows',
      roleType: 'modifier',
      sprite: '/icons/minecraft/dragons_breath.svg',
      fallbackSprite: '/icons/minecraft/dragons_breath.png',
      appliesTo: 'Any splash potion bottle',
      desc: 'Leaves a 30-second persistent ground cloud and enables crafting 8 Tipped Arrows around the bottle.'
    }
  },

  // Effect Ingredients
  effectIngredients: {
    sugar: {
      id: 'sugar',
      name: 'Sugar',
      sprite: '/icons/minecraft/sugar.svg',
      fallbackSprite: '/icons/minecraft/sugar.png',
      creates: 'Potion of Swiftness',
      effectBadge: 'Speed (+20%)',
      desc: 'Harvested from Sugar Cane. Yields agility and movement speed enhancement.'
    },
    blaze_powder: {
      id: 'blaze_powder',
      name: 'Blaze Powder',
      sprite: '/icons/minecraft/blaze_powder.svg',
      fallbackSprite: '/icons/minecraft/blaze_powder.png',
      creates: 'Potion of Strength',
      effectBadge: 'Strength (+3 HP DMG)',
      desc: 'Crafted from Nether Blaze Rods. Enhances melee damage output.'
    },
    glistering_melon_slice: {
      id: 'glistering_melon_slice',
      name: 'Glistering Melon Slice',
      sprite: '/icons/minecraft/glistering_melon_slice.svg',
      fallbackSprite: '/icons/minecraft/glistering_melon_slice.png',
      creates: 'Potion of Healing',
      effectBadge: 'Instant Health (+4 Hearts)',
      desc: 'Melon slice crafted with 8 gold nuggets. Instantly heals living entities and damages undead.'
    },
    ghast_tear: {
      id: 'ghast_tear',
      name: 'Ghast Tear',
      sprite: '/icons/minecraft/ghast_tear.svg',
      fallbackSprite: '/icons/minecraft/ghast_tear.png',
      creates: 'Potion of Regeneration',
      effectBadge: 'Regeneration (+1 HP/2.5s)',
      desc: 'Rare drop from Nether Ghasts. Provides sustained health recovery over time.'
    },
    magma_cream: {
      id: 'magma_cream',
      name: 'Magma Cream',
      sprite: '/icons/minecraft/magma_cream.svg',
      fallbackSprite: '/icons/minecraft/magma_cream.png',
      creates: 'Potion of Fire Resistance',
      effectBadge: 'Fire Immunity',
      desc: 'Obtained from Magma Cubes or Slimeball + Blaze Powder. Nullifies lava and fire hazard damage.'
    },
    pufferfish: {
      id: 'pufferfish',
      name: 'Pufferfish',
      sprite: '/icons/minecraft/pufferfish.svg',
      fallbackSprite: '/icons/minecraft/pufferfish.png',
      creates: 'Potion of Water Breathing',
      effectBadge: 'Infinite Oxygen',
      desc: 'Caught via fishing or ocean buckets. Prevents drowning and sharpens underwater visibility.'
    },
    golden_carrot: {
      id: 'golden_carrot',
      name: 'Golden Carrot',
      sprite: '/icons/minecraft/golden_carrot.svg',
      fallbackSprite: '/icons/minecraft/golden_carrot.png',
      creates: 'Potion of Night Vision',
      effectBadge: 'Full Brightness',
      desc: 'Carrot encircled with 8 gold nuggets. Renders caves and oceans at maximum light level 15.'
    },
    rabbits_foot: {
      id: 'rabbits_foot',
      name: "Rabbit's Foot",
      sprite: '/icons/minecraft/rabbits_foot.svg',
      fallbackSprite: '/icons/minecraft/rabbits_foot.png',
      creates: 'Potion of Leaping',
      effectBadge: 'Jump Boost',
      desc: 'Rare rabbit drop. Increases jump clearance and reduces impact fall damage.'
    },
    phantom_membrane: {
      id: 'phantom_membrane',
      name: 'Phantom Membrane',
      sprite: '/icons/minecraft/phantom_membrane.svg',
      fallbackSprite: '/icons/minecraft/phantom_membrane.png',
      creates: 'Potion of Slow Falling',
      effectBadge: 'Slow Fall (0 Fall DMG)',
      desc: 'Harvested from nocturnal Phantoms. Enables gliding descent and eliminates fall trauma.'
    },
    turtle_helmet: {
      id: 'turtle_helmet',
      name: 'Turtle Shell',
      sprite: '/icons/minecraft/turtle_shell.svg',
      fallbackSprite: '/icons/minecraft/turtle_shell.png',
      creates: 'Potion of the Turtle Master',
      effectBadge: 'Resistance + Slowness',
      desc: 'Crafted from 5 turtle scutes. Grants up to 80% damage reduction at the cost of 90% speed loss.'
    },
    spider_eye: {
      id: 'spider_eye',
      name: 'Spider Eye',
      sprite: '/icons/minecraft/spider_eye.svg',
      fallbackSprite: '/icons/minecraft/spider_eye.png',
      creates: 'Potion of Poison',
      effectBadge: 'Poison Damage',
      desc: 'Harvested from spiders. Inflicts continuous health depletion down to 1 HP.'
    },
    breeze_rod: {
      id: 'breeze_rod',
      name: 'Breeze Rod',
      sprite: '/icons/minecraft/breeze_rod.svg',
      fallbackSprite: '/icons/minecraft/breeze_rod.png',
      creates: 'Potion of Wind Charging (1.21)',
      effectBadge: 'Wind Blast on Death',
      desc: '1.21 Tricky Trials ingredient from Trial Chambers Breeze mobs. Emits wind burst upon entity death.'
    },
    cobweb: {
      id: 'cobweb',
      name: 'Cobweb',
      sprite: '/icons/minecraft/cobweb.svg',
      fallbackSprite: '/icons/minecraft/cobweb.png',
      creates: 'Potion of Weaving (1.21)',
      effectBadge: 'Spawns Webs on Death',
      desc: '1.21 Tricky Trials ingredient. Spawns 2–3 cobwebs on death and grants 50% faster web movement.'
    },
    slimeball: {
      id: 'slimeball',
      name: 'Slimeball',
      sprite: '/icons/minecraft/slimeball.svg',
      fallbackSprite: '/icons/minecraft/slimeball.png',
      creates: 'Potion of Oozing (1.21)',
      effectBadge: 'Spawns Slimes on Death',
      desc: '1.21 Tricky Trials ingredient. Causes affected entity to spawn 2 medium slimes when killed.'
    },
    stone: {
      id: 'stone',
      name: 'Stone Block',
      sprite: '/icons/minecraft/stone.svg',
      fallbackSprite: '/icons/minecraft/stone.png',
      creates: 'Potion of Infested (1.21)',
      effectBadge: 'Spawns Silverfish',
      desc: '1.21 Tricky Trials ingredient. Has a 10% chance to burst spawn silverfish when damaged.'
    }
  }
};

/**
 * Potion Palette Colors (Hex colors representing in-game liquid shader tint)
 */
export const POTION_COLORS = {
  water: '#38bdf8',
  awkward: '#7c3aed',
  mundane: '#64748b',
  thick: '#71717a',
  swiftness: '#0284c7',
  strength: '#991b1b',
  healing: '#f43f5e',
  regeneration: '#ec4899',
  fire_resistance: '#f97316',
  water_breathing: '#0ea5e9',
  night_vision: '#1e3a8a',
  invisibility: '#94a3b8',
  leaping: '#22c55e',
  slow_falling: '#f1f5f9',
  wind_charged: '#38bdf8',
  poison: '#4d7c0f',
  harming: '#450a0a',
  slowness: '#475569',
  weakness: '#334155',
  weaving: '#cbd5e1',
  oozing: '#84cc16',
  infested: '#71717a',
  turtle_master: '#065f46'
};

/**
 * Complete Brewing Workflow Graph
 * Maps out the exact alchemical transformation tree from Water Bottle to final modifiers.
 */
export const BREWING_WORKFLOW_TREE = [
  {
    step: 1,
    title: 'The Universal Solvent',
    input: 'Water Bottle',
    inputIcon: 'glass_bottle',
    agent: 'Nether Wart',
    agentIcon: 'nether_wart',
    output: 'Awkward Potion',
    outputColor: POTION_COLORS.awkward,
    notes: 'The mandatory step for all effect potions except Potion of Weakness.'
  },
  {
    step: 2,
    title: 'Primary Effect Brewing',
    input: 'Awkward Potion',
    inputIcon: 'awkward_potion',
    agent: 'Primary Effect Ingredient (Sugar, Blaze, Ghast, Melon...)',
    agentIcon: 'blaze_powder',
    output: 'Tier I Base Effect Potion',
    outputColor: POTION_COLORS.strength,
    notes: 'Imbues the potion with its specific positive, negative, or ominous status effect.'
  },
  {
    step: 3,
    title: 'Alchemical Modification (Choose Branch)',
    branches: [
      {
        name: 'Duration Extension',
        agent: 'Redstone Dust',
        agentIcon: 'redstone',
        result: 'Extended Potion (e.g. 3:00 → 8:00)',
        incompatibleWith: 'Glowstone Dust'
      },
      {
        name: 'Potency Amplification',
        agent: 'Glowstone Dust',
        agentIcon: 'glowstone_dust',
        result: 'Tier II Intensity (e.g. Speed II, Strength II)',
        incompatibleWith: 'Redstone Dust'
      },
      {
        name: 'Corruption / Inversion',
        agent: 'Fermented Spider Eye',
        agentIcon: 'fermented_spider_eye',
        result: 'Inverts Effect (Healing → Harming, Speed → Slowness)',
        incompatibleWith: 'None'
      },
      {
        name: 'Splash Conversion',
        agent: 'Gunpowder',
        agentIcon: 'gunpowder',
        result: 'Throwable Area of Effect Splash Potion',
        incompatibleWith: 'None'
      },
      {
        name: 'Lingering Cloud & Arrows',
        agent: "Dragon's Breath",
        agentIcon: 'dragons_breath',
        result: 'Persistent Ground Cloud & Tipped Arrow Source',
        incompatibleWith: 'Drinkable Bottles (requires Splash)'
      }
    ]
  }
];
