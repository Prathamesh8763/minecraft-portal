/**
 * Minecraft Survival Progression Checklists
 * Canonical, version-verified progression guides from Day 1 to Endgame God Gear.
 * Stored 100% locally in browser memory without requiring accounts or tracking.
 */

export const SURVIVAL_CHECKLISTS = [
  {
    id: 'first_day',
    title: 'First Day Survival (The Golden 10 Minutes)',
    category: 'Survival Basics',
    description: 'Essential survival milestones before the first sunset to secure shelter, tools, and prevent nocturnal mob attacks.',
    estimatedTime: '10 Minutes',
    applicableVersion: 'Java 1.0 – 26.3+',
    badge: 'Essential',
    steps: [
      {
        id: 'fd_wood',
        task: 'Punch logs to harvest 4–8 wood blocks',
        detail: 'Convert raw logs into wooden planks in your 2×2 player inventory crafting grid.'
      },
      {
        id: 'fd_crafting_table',
        task: 'Craft a Crafting Table and Sticks',
        detail: 'Place 4 planks in a 2×2 square to unlock the full 3×3 crafting matrix.'
      },
      {
        id: 'fd_wood_pickaxe',
        task: 'Craft a Wooden Pickaxe (3 planks + 2 sticks)',
        detail: 'Mine exactly 3 Cobblestone and immediately replace the wooden pickaxe with a stone one.'
      },
      {
        id: 'fd_stone_upgrade',
        task: 'Upgrade to Stone Pickaxe, Axe, and Sword',
        detail: 'Stone tools have 131 durability (vs 59 for wood) and harvest twice as fast.'
      },
      {
        id: 'fd_furnace',
        task: 'Mine 8 Cobblestone and craft a Furnace',
        detail: 'Use the furnace to cook food for hunger replenishment and smelt logs into charcoal.'
      },
      {
        id: 'fd_torches',
        task: 'Produce Torches (Coal/Charcoal + Stick)',
        detail: 'Place torches inside your shelter to prevent hostile mob spawns (requires light level 1+).'
      },
      {
        id: 'fd_bed',
        task: 'Craft a Bed (3 Wool + 3 Planks) or Straw Bed',
        detail: 'Sleeping skips night and resets Phantom spawn timers (3 days without sleep triggers Phantoms).'
      },
      {
        id: 'fd_shelter',
        task: 'Seal your shelter before dusk',
        detail: 'Enclose walls with a wooden door to block Skeletons, Spiders, and Creepers.'
      }
    ]
  },
  {
    id: 'nether_prep',
    title: 'Nether Expedition Preparation',
    category: 'Dimensional Exploration',
    description: 'Comprehensive gear checklist and hazard countermeasures before stepping through the obsidian portal.',
    estimatedTime: '30–45 Minutes',
    applicableVersion: 'Java 1.16 – 26.3+',
    badge: 'Dimensional',
    steps: [
      {
        id: 'np_diamond_pick',
        task: 'Craft a Diamond Pickaxe (3 Diamonds + 2 Sticks)',
        detail: 'Required to mine Obsidian blocks without breaking them.'
      },
      {
        id: 'np_obsidian_frame',
        task: 'Harvest 10–14 Obsidian and construct 4×5 Portal',
        detail: 'Corner obsidian blocks can be substituted with cobblestone to conserve 4 obsidian.'
      },
      {
        id: 'np_flint_steel',
        task: 'Craft Flint and Steel (Iron Ingot + Flint)',
        detail: 'Keep one in your hotbar in case a Ghast fireball extinguishes your portal in the Nether.'
      },
      {
        id: 'np_gold_armor',
        task: 'Equip at least one piece of Golden Armor',
        detail: 'Wearing Gold Boots or Helmet prevents Piglins from becoming hostile on sight.'
      },
      {
        id: 'np_fire_resistance',
        task: 'Stockpile Fire Resistance Potions or Magma Cream',
        detail: 'Provides 8 minutes of total immunity to lava, fire, and Blaze fireballs.'
      },
      {
        id: 'np_warped_fungus',
        task: 'Prepare Warped Fungus on a Stick',
        detail: 'Allows you to mount and steer Striders across extensive lava lakes.'
      },
      {
        id: 'np_fortress',
        task: 'Locate a Nether Fortress and farm Blaze Rods',
        detail: 'Blaze Rods are mandatory to craft Brewing Stands, Blaze Powder, and Eyes of Ender.'
      },
      {
        id: 'np_bastion_template',
        task: 'Raid a Bastion Remnant for Netherite Upgrade Template',
        detail: 'Essential for upgrading Diamond equipment to Netherite in the Smithing Table.'
      }
    ]
  },
  {
    id: 'god_gear',
    title: 'Endgame God Gear & Anvil Mastery',
    category: 'Advanced Combat & Gear',
    description: 'Blueprint for assembling maxed 4-piece Netherite armor without triggering the "Too Expensive!" anvil penalty.',
    estimatedTime: '2–3 Hours',
    applicableVersion: 'Java 1.20 – 26.3+',
    badge: 'Endgame Meta',
    steps: [
      {
        id: 'gg_librarian_hall',
        task: 'Establish Librarian Trading Hall for Mending & Unbreaking III',
        detail: 'Break and replace Lecterns during daylight to cycle trades until Mending appears.'
      },
      {
        id: 'gg_duplicate_templates',
        task: 'Duplicate Netherite Upgrade Templates with Diamonds',
        detail: '1 Template + 7 Diamonds + 1 Netherrack yields 2 templates in the crafting table.'
      },
      {
        id: 'gg_netherite_upgrade',
        task: 'Upgrade Diamond Armor to Netherite in Smithing Table',
        detail: 'Adds +1 Armor Toughness, +1 Knockback Resistance, and lava fire immunity.'
      },
      {
        id: 'gg_binary_tree',
        task: 'Apply the Anvil Binary Merge Tree (Tournament Style)',
        detail: 'Combine enchanted books in pairs first. Never sequentially apply single books to the armor piece.'
      },
      {
        id: 'gg_protection_cap',
        task: 'Apply Protection IV to all 4 pieces (reach 16 EPF cap)',
        detail: 'Maxes general damage reduction at 64% EPF (capped at 80% with Feather Falling IV).'
      },
      {
        id: 'gg_feather_falling',
        task: 'Equip Feather Falling IV and Depth Strider III on Boots',
        detail: 'Reduces fall damage by 48% and removes water movement friction.'
      },
      {
        id: 'gg_elytra_shulkers',
        task: 'Defeat Ender Dragon and acquire Elytra & Shulker Boxes',
        detail: 'Unlocks unlimited flight with Firework Rockets and expandable portable inventory.'
      }
    ]
  },
  {
    id: 'redstone_mastery',
    title: 'Redstone Engineering & Automation',
    category: 'Technical Mechanics',
    description: 'Fundamental circuits, comparator thresholds, and 1.21 Crafter automation mechanics.',
    estimatedTime: '1 Hour',
    applicableVersion: 'Java 1.5 – 26.3+',
    badge: 'Engineering',
    steps: [
      {
        id: 'rs_ticks',
        task: 'Master Redstone Timings (1 Redstone Tick = 2 Game Ticks = 0.1s)',
        detail: 'Repeaters can be set to 1, 2, 3, or 4 redstone ticks of signal delay.'
      },
      {
        id: 'rs_comparator',
        task: 'Build a Comparator Container Inventory Reader',
        detail: 'Outputs a signal strength proportional to chest, barrel, or hopper fullness (0–15).'
      },
      {
        id: 'rs_iron_farm',
        task: 'Construct an Infinite Iron Golem Spawning Farm',
        detail: 'Requires 3 panicked villagers, 1 zombie, and beds with line-of-sight interruption.'
      },
      {
        id: 'rs_crafter',
        task: 'Automate a 1.21 Crafter with a Pulse Clock',
        detail: 'Lock unused slots and trigger with a redstone pulse whenever ingredients are supplied.'
      },
      {
        id: 'rs_flying_machine',
        task: 'Assemble a Two-Way Observer Slime/Honey Flying Machine',
        detail: 'Used for automated sugarcane, bamboo, and kelp harvesters.'
      }
    ]
  }
];
