/**
 * Primary Equipment & Compatible Enchantments Catalog
 * Java Edition 1.0 - 26.3+ (Verified against official Minecraft Wiki: https://minecraft.wiki/w/Enchantment)
 * Provides instant item-first lookup: Plain-English effects, normal vs command max levels,
 * obtaining methods, and explicit mutual incompatibility rules.
 */

export const PRIMARY_ITEM_CATALOG = [
  {
    id: 'sword',
    name: 'Sword',
    itemKey: 'diamond_sword',
    icon: 'diamond_sword',
    category: 'Melee Weapons',
    summary: 'High attack speed melee weapon with area-of-effect sweep and mob loot multiplying.',
    tip: 'Looting III increases mob drop counts and rare skull rates. Sweeping Edge III deals 80% slash damage to nearby targets.',
    enchants: [
      { 
        id: 'sharpness', 
        name: 'Sharpness', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Increases melee damage by +0.5 HP per level after Level I (+3.0 HP at Level V).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Smite', 'Bane of Arthropods'] 
      },
      { 
        id: 'smite', 
        name: 'Smite', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Increases melee damage against undead mobs (Zombies, Skeletons, Withers, Drowned, Bogged) by +2.5 HP per level.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Sharpness', 'Bane of Arthropods'] 
      },
      { 
        id: 'bane_of_arthropods', 
        name: 'Bane of Arthropods', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Increases melee damage against arthropods (Spiders, Cave Spiders, Silverfish, Endermites, Bees) by +2.5 HP/lvl and applies Slowness IV.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Sharpness', 'Smite'] 
      },
      { 
        id: 'knockback', 
        name: 'Knockback', 
        maxNormal: 'II', 
        commandMax: 255, 
        effect: 'Pushes struck targets back by 3 blocks per level (6 blocks at Level II).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'fire_aspect', 
        name: 'Fire Aspect', 
        maxNormal: 'II', 
        commandMax: 255, 
        effect: 'Ignites target for 4 seconds per level (7 HP total burn at Level II). Automatically cooks dropped meat from animals.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'looting', 
        name: 'Looting', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Increases maximum common mob drops by +1 per level and significantly increases rare drop rates (e.g. Wither Skeleton skulls).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'sweeping_edge', 
        name: 'Sweeping Edge', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Java Edition Exclusive: Increases sweep attack damage to adjacent mobs by 50% (I), 67% (II), and 80% (III) of base weapon damage.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Gives a 100/(level+1)% chance for durability to be consumed, effectively quadrupling (4x) the sword\'s usable lifespan.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Repairs durability automatically using collected XP orbs (2 durability per 1 XP). Never wears out if fed with XP.', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon / Bastion Loot', 'Treasure Fishing', 'Raid Drops'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Item is permanently destroyed upon player death instead of dropping on the ground.', 
        obtaining: ['Dungeon / Structure Loot', 'Treasure Fishing', 'Librarian Trade'], 
        conflicts: [] 
      }
    ]
  },
  {
    id: 'mace',
    name: 'The Mace (1.21)',
    itemKey: 'mace',
    icon: 'the_mace',
    category: 'Heavy Kinetic Weapons',
    summary: 'Heavy smash weapon crafted from Heavy Core and Breeze Rod. Converts falling distance into devastating kinetic attack damage.',
    tip: 'Density V adds +2.5 HP per block of fall height. Wind Burst III launches the attacker 21 blocks into the air upon hit for chained aerial slams.',
    enchants: [
      { 
        id: 'wind_burst', 
        name: 'Wind Burst', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: '1.21 Tricky Trials exclusive: Emits a kinetic burst upon landing a smash attack, bouncing the player 7 blocks per level into the air.', 
        obtaining: ['Ominous Vaults (Trial Chambers Exclusive)', 'Anvil (Book)'], 
        conflicts: [] 
      },
      { 
        id: 'density', 
        name: 'Density', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Adds +0.5 HP damage per fallen block per level (+2.5 HP per block at Level V). Scales unlimited with fall distance.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Breach', 'Smite', 'Bane of Arthropods'] 
      },
      { 
        id: 'breach', 
        name: 'Breach', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: 'Penetrates target armor by 15% per level (up to 60% armor ignored at Level IV). Devastating in PvP against full Netherite armor.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Density', 'Smite', 'Bane of Arthropods'] 
      },
      { 
        id: 'smite', 
        name: 'Smite', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Increases melee damage against undead mobs by +2.5 HP per level. Allows one-shotting Withers and undead bosses with fall momentum.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Density', 'Breach', 'Bane of Arthropods'] 
      },
      { 
        id: 'bane_of_arthropods', 
        name: 'Bane of Arthropods', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Increases melee damage against arthropods by +2.5 HP/lvl and applies Slowness IV.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Density', 'Breach', 'Smite'] 
      },
      { 
        id: 'fire_aspect', 
        name: 'Fire Aspect', 
        maxNormal: 'II', 
        commandMax: 255, 
        effect: 'Ignites target for 4 seconds per level (7 HP fire damage at Level II).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Multiplies durability longevity by up to 4x.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Repairs durability automatically using collected XP orbs (2 durability per 1 XP).', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon / Bastion Loot', 'Treasure Fishing'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Item disappears permanently upon player death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      }
    ]
  },
  {
    id: 'pickaxe',
    name: 'Pickaxe',
    itemKey: 'diamond_pickaxe',
    icon: 'diamond_pickaxe',
    category: 'Mining Tools',
    summary: 'Core excavation tool for stones, minerals, and ores. Supports speed multiplication and drop doubling.',
    tip: 'Fortune III multiplies diamonds, coal, and lapis drops by 2.2x on average. Silk Touch preserves raw blocks (ice, glass, ores).',
    enchants: [
      { 
        id: 'efficiency', 
        name: 'Efficiency', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Increases mining speed by +1, +5, +9, +17, and +26 points. At Efficiency V on Netherite with Haste II, grants instant-mining of stone.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'fortune', 
        name: 'Fortune', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Multiplies item drop yields from ores and crops. At Fortune III, averages 2.2x yield with potential 4x maximum drop.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Silk Touch'] 
      },
      { 
        id: 'silk_touch', 
        name: 'Silk Touch', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Causes blocks to drop themselves rather than their standard items (e.g. Diamond Ore, Glass, Campfires, Ice, Beehives).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Fortune'] 
      },
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Quadruples pickaxe durability lifespan (average 4x uses before breaking).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Repairs durability instantly using XP orbs gathered while mining ores (Coal, Quartz, Redstone).', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon / Structure Loot', 'Fishing'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Item is erased upon player death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      }
    ]
  },
  {
    id: 'axe',
    name: 'Axe',
    itemKey: 'diamond_axe',
    icon: 'diamond_axe',
    category: 'Woodcutting & Heavy Melee',
    summary: 'Dual-purpose harvesting and combat tool. Deals the highest single-hit melee damage and disables enemy shields for 5s.',
    tip: 'In Java Edition, a Netherite Axe with Sharpness V deals 13 damage per critical hit and temporarily disables raised shields.',
    enchants: [
      { 
        id: 'sharpness', 
        name: 'Sharpness', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Increases base melee strike damage by up to +3.0 HP at Level V.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Smite', 'Bane of Arthropods'] 
      },
      { 
        id: 'smite', 
        name: 'Smite', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Increases damage against undead mobs by +2.5 HP per level (+12.5 HP at Smite V). Ideal for one-shotting Zombie Piglins.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Sharpness', 'Bane of Arthropods'] 
      },
      { 
        id: 'bane_of_arthropods', 
        name: 'Bane of Arthropods', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Increases damage against spiders and bees by +2.5 HP/lvl with Slowness IV.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Sharpness', 'Smite'] 
      },
      { 
        id: 'efficiency', 
        name: 'Efficiency', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Increases wood harvesting speed by up to +26 points, rapidly clear-cutting massive forests.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'fortune', 
        name: 'Fortune', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Increases sapling and apple drop rates when chopping leaves, and multiplies melon slice yields.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Silk Touch'] 
      },
      { 
        id: 'silk_touch', 
        name: 'Silk Touch', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Harvests Melon blocks, Bee Nests (with bees inside), Bookshelves, and Giant Mushroom blocks intact.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Fortune'] 
      },
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Quadruples durability life.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Self-repairing with collected XP orbs.', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon Loot', 'Fishing'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Vanishes on death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      }
    ]
  },
  {
    id: 'helmet',
    name: 'Helmet',
    itemKey: 'diamond_helmet',
    icon: 'diamond_helmet',
    category: 'Head Armor & Respiration',
    summary: 'Head defense piece providing 3 base armor points, environmental underwater buffs, and respiration.',
    tip: 'Aqua Affinity removes the underwater mining fatigue penalty; Respiration III extends breath meter by +45 seconds.',
    enchants: [
      { 
        id: 'protection', 
        name: 'Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: 'Reduces all damage by 4% per level (4 EPF = 16% reduction per piece). Capped at 20 EPF (80%) across armor.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Fire Protection', 'Blast Protection', 'Projectile Protection'] 
      },
      { 
        id: 'fire_protection', 
        name: 'Fire Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: 'Grants 8 EPF against fire/lava and cuts active burn time by 60% (15% per level).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Blast Protection', 'Projectile Protection'] 
      },
      { 
        id: 'blast_protection', 
        name: 'Blast Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: 'Grants 8 EPF against explosions (Creepers, TNT, End Crystals) and reduces explosion knockback by 60%.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Fire Protection', 'Projectile Protection'] 
      },
      { 
        id: 'projectile_protection', 
        name: 'Projectile Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: 'Grants 8 EPF against arrows, tridents, and shulker projectiles.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Fire Protection', 'Blast Protection'] 
      },
      { 
        id: 'respiration', 
        name: 'Respiration', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Extends underwater breath time by +15 seconds per level (+45s at Level III) and reduces drowning damage frequency.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'aqua_affinity', 
        name: 'Aqua Affinity', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Completely eliminates the 5x mining penalty when submerged in water.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'thorns', 
        name: 'Thorns', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Reflects 1–4 damage back to attackers with a 15% per level chance (45% at Level III). Drains extra durability.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Quadruples armor durability life.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Restores armor durability using XP orbs.', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon Loot', 'Fishing'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_binding', 
        name: 'Curse of Binding', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Cannot be removed from armor slot until player dies (or breaks in Survival). Cannot be disenchanted on Grindstone!', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Erased on player death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      }
    ]
  },
  {
    id: 'chestplate',
    name: 'Chestplate',
    itemKey: 'diamond_chestplate',
    icon: 'diamond_chestplate',
    category: 'Torso Armor',
    summary: 'The main defensive anchor contributing 8 base armor points and 3 armor toughness (Netherite).',
    tip: 'Protection IV gives 4 EPF. Thorns III is viable on Netherite chestplates if sustained by regular Mending XP.',
    enchants: [
      { 
        id: 'protection', 
        name: 'Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: 'Reduces all incoming damage by 4% per level (4 EPF = 16% reduction).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Fire Protection', 'Blast Protection', 'Projectile Protection'] 
      },
      { 
        id: 'fire_protection', 
        name: 'Fire Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: '8 EPF fire defense and -60% burn duration.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Blast Protection', 'Projectile Protection'] 
      },
      { 
        id: 'blast_protection', 
        name: 'Blast Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: '8 EPF explosion defense and -60% explosion knockback.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Fire Protection', 'Projectile Protection'] 
      },
      { 
        id: 'projectile_protection', 
        name: 'Projectile Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: '8 EPF defense against arrows, tridents, and shulkers.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Fire Protection', 'Blast Protection'] 
      },
      { 
        id: 'thorns', 
        name: 'Thorns', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: '45% chance to reflect 1–4 damage back to attackers. Increases armor durability consumption by 2 points on trigger.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Quadruples armor durability lifespan.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Self-repairs with collected XP orbs.', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon Loot', 'Fishing'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_binding', 
        name: 'Curse of Binding', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Cannot be removed from torso until player death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Erased on player death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      }
    ]
  },
  {
    id: 'leggings',
    name: 'Leggings',
    itemKey: 'diamond_leggings',
    icon: 'diamond_leggings',
    category: 'Leg Armor & Stealth',
    summary: 'Leg protection providing 6 base armor points and support for Swift Sneak stealth mobility.',
    tip: 'Swift Sneak III is exclusively obtained from Ancient City chests; increases sneak speed from 30% to 75% of regular walk speed.',
    enchants: [
      { 
        id: 'protection', 
        name: 'Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: 'Reduces all damage by 4% per level (4 EPF = 16% reduction).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Fire Protection', 'Blast Protection', 'Projectile Protection'] 
      },
      { 
        id: 'fire_protection', 
        name: 'Fire Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: '8 EPF fire defense and -60% burn duration.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Blast Protection', 'Projectile Protection'] 
      },
      { 
        id: 'blast_protection', 
        name: 'Blast Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: '8 EPF explosion defense and -60% explosion knockback.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Fire Protection', 'Projectile Protection'] 
      },
      { 
        id: 'projectile_protection', 
        name: 'Projectile Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: '8 EPF defense against projectile hits.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Fire Protection', 'Blast Protection'] 
      },
      { 
        id: 'swift_sneak', 
        name: 'Swift Sneak', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Exclusive Ancient City Treasure: Increases sneak movement speed to 45% (I), 60% (II), and 75% (III) of normal walking speed.', 
        obtaining: ['Ancient City Chests (Exclusive)', 'Anvil (Book)'], 
        conflicts: [] 
      },
      { 
        id: 'thorns', 
        name: 'Thorns', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Reflects 1–4 damage back to attackers with a 45% chance.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Quadruples durability lifespan.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Self-repairing with collected XP orbs.', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon Loot', 'Fishing'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_binding', 
        name: 'Curse of Binding', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Cannot be removed from leg slot until death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Erased on player death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      }
    ]
  },
  {
    id: 'boots',
    name: 'Boots',
    itemKey: 'diamond_boots',
    icon: 'diamond_boots',
    category: 'Footwear & Mobility',
    summary: 'Footwear supporting fall damage mitigation (Feather Falling) and water/soul sand mobility enchantments.',
    tip: 'Feather Falling IV supplies 12 EPF to fall defense, reaching the 20 EPF cap (80% fall damage cut) with standard Protection IV armor.',
    enchants: [
      { 
        id: 'protection', 
        name: 'Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: 'Reduces all damage by 4% per level (4 EPF = 16% reduction).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Fire Protection', 'Blast Protection', 'Projectile Protection'] 
      },
      { 
        id: 'fire_protection', 
        name: 'Fire Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: '8 EPF fire defense and -60% burn duration.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Blast Protection', 'Projectile Protection'] 
      },
      { 
        id: 'blast_protection', 
        name: 'Blast Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: '8 EPF explosion defense and -60% explosion knockback.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Fire Protection', 'Projectile Protection'] 
      },
      { 
        id: 'projectile_protection', 
        name: 'Projectile Protection', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: '8 EPF projectile defense.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Protection', 'Fire Protection', 'Blast Protection'] 
      },
      { 
        id: 'feather_falling', 
        name: 'Feather Falling', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: 'Grants +3 EPF per level against fall damage (+12 EPF at Level IV). Combined with full Protection IV, easily hits the 20 EPF (80% damage reduction) engine cap.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'depth_strider', 
        name: 'Depth Strider', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Reduces water drag by 33.3% per level. At Level III, swim and move in water at full terrestrial running speed.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Frost Walker'] 
      },
      { 
        id: 'frost_walker', 
        name: 'Frost Walker', 
        maxNormal: 'II', 
        commandMax: 255, 
        effect: 'Freezes still water beneath feet into frosted ice blocks (radius 2+level) and nullifies magma block damage.', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon Loot', 'Fishing', 'Anvil (Book)'], 
        conflicts: ['Depth Strider'] 
      },
      { 
        id: 'soul_speed', 
        name: 'Soul Speed', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Increases movement speed across Soul Sand and Soul Soil by up to +61.5% at Level III. Consumes boot durability on movement.', 
        obtaining: ['Piglin Bartering (Nether Exclusive)', 'Bastion Chests', 'Anvil (Book)'], 
        conflicts: [] 
      },
      { 
        id: 'thorns', 
        name: 'Thorns', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Reflects 1–4 damage back to attackers with 45% chance.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Quadruples durability life.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Repairs durability with collected XP.', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon Loot', 'Fishing'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_binding', 
        name: 'Curse of Binding', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Cannot remove boots until death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Erased on player death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      }
    ]
  },
  {
    id: 'bow',
    name: 'Bow',
    itemKey: 'bow',
    icon: 'bow',
    category: 'Ranged Ballistics',
    summary: 'Standard precision ranged weapon supporting fire, knockback, and ammunition conservation.',
    tip: 'Infinity provides endless regular arrows from 1 inventory arrow, but cannot co-exist with Mending. Power V boosts damage to 25 HP!',
    enchants: [
      { 
        id: 'power', 
        name: 'Power', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Increases arrow damage by 25% * (level + 1). At Power V, a fully drawn arrow deals up to 25 HP (12.5 hearts) damage!', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'punch', 
        name: 'Punch', 
        maxNormal: 'II', 
        commandMax: 255, 
        effect: 'Increases arrow knockback by 3 blocks per level (6 blocks at Level II).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'flame', 
        name: 'Flame', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Sets arrows ablaze, causing 5 HP fire damage over 5 seconds. Ignites campfires, TNT, and candles from distance.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'infinity', 
        name: 'Infinity', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Allows shooting unlimited regular arrows provided at least 1 arrow is kept in inventory. Arrows shot cannot be collected.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Mending'] 
      },
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Quadruples bow lifespan (1536 shots average).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Repairs bow durability using XP orbs. Mutually exclusive with Infinity!', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon Loot', 'Fishing'], 
        conflicts: ['Infinity'] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Erased on death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      }
    ]
  },
  {
    id: 'crossbow',
    name: 'Crossbow',
    itemKey: 'crossbow',
    icon: 'crossbow',
    category: 'Heavy Ballistics & Fireworks',
    summary: 'Pre-loadable ranged weapon firing arrows and multi-explosion firework rockets with shield piercing.',
    tip: 'Piercing IV arrows pass through enemy shields and can be picked up after impact. Quick Charge III loads in 0.75 seconds.',
    enchants: [
      { 
        id: 'quick_charge', 
        name: 'Quick Charge', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Reduces loading time by 0.25 seconds per level (from 1.25s down to 0.75s at Level III, faster than standard Bow!).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'multishot', 
        name: 'Multishot', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Fires 3 projectiles in a 10° cone for the cost of 1 ammunition item (arrows or firework rockets). Spreads massive area damage.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Piercing'] 
      },
      { 
        id: 'piercing', 
        name: 'Piercing', 
        maxNormal: 'IV', 
        commandMax: 255, 
        effect: 'Projectiles pass through up to 4 entities or shields and can be retrieved from the ground after impact.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Multishot'] 
      },
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Quadruples durability lifespan.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Repairs durability with collected XP.', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon Loot', 'Fishing'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Erased on player death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      }
    ]
  },
  {
    id: 'trident',
    name: 'Trident',
    itemKey: 'trident',
    icon: 'trident',
    category: 'Aquatic Melee & Ranged',
    summary: 'Versatile aquatic throwing spear dropped by Drowned. Supports player flight in rain (Riptide) and lightning strikes.',
    tip: 'Riptide launches you through water or rainstorms. Channeling summons real lightning strikes during thunderstorms.',
    enchants: [
      { 
        id: 'impaling', 
        name: 'Impaling', 
        maxNormal: 'V', 
        commandMax: 255, 
        effect: 'Java Edition: Adds +2.5 HP damage per level against aquatic mobs (Guardians, Elder Guardians, Drowned, Dolphins, Squids).', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'loyalty', 
        name: 'Loyalty', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Thrown trident automatically returns to player\'s inventory. Higher levels return the spear faster.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Riptide'] 
      },
      { 
        id: 'riptide', 
        name: 'Riptide', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Launches the player forward through water or during rain/snow. Reaches immense flight speed with Elytra.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Loyalty', 'Channeling'] 
      },
      { 
        id: 'channeling', 
        name: 'Channeling', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Summons a lightning strike on struck mobs during thunderstorms. Used to create Charged Creepers and Brown Mooshrooms.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: ['Riptide'] 
      },
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Quadruples trident durability.', 
        obtaining: ['Enchanting Table', 'Anvil (Book)', 'Librarian Trade', 'Dungeon Loot'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Self-repairs with collected XP orbs.', 
        obtaining: ['Librarian Trade (Treasure)', 'Dungeon Loot', 'Fishing'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Erased on death.', 
        obtaining: ['Dungeon Loot', 'Fishing', 'Librarian Trade'], 
        conflicts: [] 
      }
    ]
  },
  {
    id: 'elytra',
    name: 'Elytra',
    itemKey: 'elytra',
    icon: 'elytra',
    category: 'Aerial Gliding Wings',
    summary: 'End City wings permitting high-speed gliding. Can ONLY be enchanted via Anvil with Enchanted Books.',
    tip: 'Elytra cannot be enchanted at an Enchanting Table! Use an Anvil to apply Unbreaking III and Mending for infinite flight.',
    enchants: [
      { 
        id: 'unbreaking', 
        name: 'Unbreaking', 
        maxNormal: 'III', 
        commandMax: 255, 
        effect: 'Quadruples flight duration (average 1724 seconds / ~28.7 minutes of continuous flight before needing repair).', 
        obtaining: ['Anvil with Enchanted Book (Required)'], 
        conflicts: [] 
      },
      { 
        id: 'mending', 
        name: 'Mending', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Repairs flight durability using XP orbs from mob farms, mining, or smelting.', 
        obtaining: ['Anvil with Enchanted Book (Required)'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_binding', 
        name: 'Curse of Binding', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Cannot be removed from chest slot until player dies (or breaks). Disables chestplate armor defense in combat!', 
        obtaining: ['Anvil with Enchanted Book'], 
        conflicts: [] 
      },
      { 
        id: 'curse_of_vanishing', 
        name: 'Curse of Vanishing', 
        maxNormal: 'I', 
        commandMax: 1, 
        effect: 'Erased on death.', 
        obtaining: ['Anvil with Enchanted Book'], 
        conflicts: [] 
      }
    ]
  }
];
