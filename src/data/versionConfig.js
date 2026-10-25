// Centralized Shared Game Version & Compatibility Configuration
// Single source of truth across Navbar, Hero, Footer, Encyclopedia, and Tool Laboratories.

export const GAME_VERSION_CONFIG = {
  // Current Official Stable Release
  currentStable: {
    version: 'Java 26.3',
    shortVersion: '26.3',
    name: 'Wilderness Bound',
    dropLabel: 'Game Drop 3',
    releaseDate: 'September 15, 2026',
    status: 'Stable Release',
    badgeText: '26.3 STABLE',
    fullBadge: 'Java 26.3 Wilderness Bound (Stable)',
    changelogUrl: 'https://feedback.minecraft.net/hc/en-us/sections/360001186971-Release-Changelogs',
    timelineUrl: 'https://www.minecraft.net/en-us/updates/minecraft-updates-timeline-and-evolution',
    featuresSummary: 'Dappled Forest biome, Poplar wood set, Abandoned Camps (Explorer Maps), single-use Straw Beds (night-skip without spawn reset), Wool Cushions (16 colors), and Wool/Concrete stairs & slabs.'
  },

  // Active Snapshot Preview (Testing only)
  activeSnapshot: {
    version: 'Java 26.4',
    shortVersion: '26.4',
    snapshotName: 'Snapshot 5',
    fullSnapshotId: 'Java 26.4 Snapshot 5',
    dropLabel: 'Winter Drop Preview',
    testDate: 'October 2026',
    status: 'In Testing (Snapshot)',
    badgeText: '26.4 SNAPSHOT (TESTING)',
    changelogUrl: 'https://feedback.minecraft.net/hc/en-us/sections/360002267532',
    featuresSummary: 'Subterranean Ice Caves, Icicles & falling ice hazards, Frostbite mob throwing Ice Balls, Packed Ice Bricks, and experimental Vulkan rendering API.'
  },

  // Key Milestone Releases (Canonically Sourced)
  milestones: [
    {
      version: '26.3',
      name: 'Wilderness Bound',
      drop: 'Game Drop 3',
      date: 'September 15, 2026',
      status: 'Stable',
      highlight: 'Dappled Forest, Poplar Wood, Straw Beds, Cushions, Camps',
      url: 'https://feedback.minecraft.net/hc/en-us/sections/360001186971-Release-Changelogs'
    },
    {
      version: '26.1',
      name: 'Tiny Takeover',
      drop: 'Game Drop 1',
      date: 'March 2026',
      status: 'Stable',
      highlight: 'Entity scaling modifier, Leashed mob persistence across portals',
      url: 'https://feedback.minecraft.net/hc/en-us/sections/360001186971-Release-Changelogs'
    },
    {
      version: '1.21.3',
      name: 'Bundles of Bravery',
      drop: 'Drop 2024.1',
      date: 'October 22, 2024',
      status: 'Stable',
      highlight: 'The Bundle (16 dye colors), Bedrock Hardcore parity',
      url: 'https://www.minecraft.net/en-us/article/minecraft-java-edition-1-21-3'
    },
    {
      version: '1.21',
      name: 'Tricky Trials',
      drop: 'Major Update',
      date: 'June 13, 2024',
      status: 'Stable',
      highlight: 'Trial Chambers, The Crafter, The Breeze, The Heavy Mace, Ominous Vaults',
      url: 'https://minecraft.wiki/w/Java_Edition_1.21'
    },
    {
      version: '1.20.5',
      name: 'Armored Paws',
      drop: 'Data Overhaul',
      date: 'April 23, 2024',
      status: 'Stable',
      highlight: 'Armadillos, Wolf Armor, and Bracketed Item Data Components',
      url: 'https://minecraft.wiki/w/Data_component_format'
    }
  ],

  // Tool & Guide Specific Compatibility Matrix
  // Prevents inaccurate universal overwrites: each tool/guide keeps its true compatibility window
  toolCompatibility: {
    enchanting: {
      toolName: 'Enchantment Laboratory',
      supportedVersions: 'Java 1.20.5 – 26.3+ (Stable)',
      versionBadge: 'Java 1.20.5 – 26.3+',
      lastVerified: 'October 2026',
      notes: 'Includes 1.21 Mace enchantments (Density, Breach, Wind Burst) and 1.20.5+ bracketed data components syntax.'
    },
    crafting: {
      toolName: 'Crafting Table & Crafter',
      supportedVersions: 'Java 1.0.0 – 26.3+ (Stable)',
      versionBadge: 'Java 1.0 – 26.3+',
      lastVerified: 'October 2026',
      notes: 'Includes 1.21 automated Crafter pulses and 26.3 Straw Bed / Cushion recipes.'
    },
    brewing: {
      toolName: 'Potion Brewer & Stand',
      supportedVersions: 'Java 1.0.0 – 26.3+ (Stable)',
      versionBadge: 'Java 1.0 – 26.3+',
      lastVerified: 'October 2026',
      notes: 'Includes 1.21 Ominous Bottles, Infested, Oozing, Weaving, and Wind Charged potions.'
    },
    redstone: {
      toolName: 'Redstone Engineering Lab',
      supportedVersions: 'Java 1.5 – 26.3+ (Stable)',
      versionBadge: 'Java 1.5 – 26.3+',
      lastVerified: 'October 2026',
      notes: 'Covers quasiconnectivity, dust signal decay, comparator subtraction, and tick timings.'
    },
    smithing: {
      toolName: 'Smithing Table & Trims',
      supportedVersions: 'Java 1.20 – 26.3+ (Stable)',
      versionBadge: 'Java 1.20 – 26.3+',
      lastVerified: 'October 2026',
      notes: 'Netherite upgrades and 16 smithing template armor trims.'
    },
    furnace: {
      toolName: 'Furnace & Smelting Studio',
      supportedVersions: 'Java 1.0 – 26.3+ (Stable)',
      versionBadge: 'Java 1.0 – 26.3+',
      lastVerified: 'October 2026',
      notes: 'Smelting, blasting, and smoking burn rates and fuel efficiencies.'
    },
    trading: {
      toolName: 'Villager Trading & Workstations',
      supportedVersions: 'Java 1.14 – 26.3+ (Stable)',
      versionBadge: 'Java 1.14 – 26.3+',
      lastVerified: 'October 2026',
      notes: 'Workstation links, restock cycles, curing discounts, and level 1-5 trade tiers.'
    }
  },

  // Primary Official Reference Links
  officialSources: [
    { 
      title: 'Official Minecraft Update Timeline', 
      url: 'https://www.minecraft.net/en-us/updates/minecraft-updates-timeline-and-evolution',
      desc: 'Official chronology of all Minecraft releases, game drops, and milestones.'
    },
    { 
      title: 'Official Release Changelogs', 
      url: 'https://feedback.minecraft.net/hc/en-us/sections/360001186971-Release-Changelogs',
      desc: 'Detailed patch notes for every stable public Java Edition build.'
    },
    { 
      title: 'Official Snapshot Changelogs', 
      url: 'https://feedback.minecraft.net/hc/en-us/sections/360002267532',
      desc: 'Weekly testing builds for experimental mechanics under community preview.'
    }
  ]
};
