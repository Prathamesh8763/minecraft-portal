import fs from 'fs';
import path from 'path';

const outDir = path.resolve('minecraft-portal/public/icons/minecraft');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Helper to wrap pixel rectangles in SVG
function createSvg(width, height, content, viewBox = '0 0 32 32') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" shape-rendering="crispEdges">
${content}
</svg>`;
}

const icons = {
  // === WEAPONS & COMBAT ===
  'the_mace': createSvg(64, 64, `
    <!-- Breeze Rod Handle -->
    <rect x="7" y="23" width="2" height="2" fill="#dbeafe" />
    <rect x="8" y="22" width="3" height="3" fill="#93c5fd" />
    <rect x="10" y="20" width="3" height="3" fill="#60a5fa" />
    <rect x="12" y="18" width="3" height="3" fill="#93c5fd" />
    <rect x="14" y="16" width="3" height="3" fill="#3b82f6" />
    <rect x="16" y="14" width="3" height="3" fill="#60a5fa" />
    <!-- Heavy Core Head -->
    <rect x="15" y="5" width="13" height="13" fill="#2e3842" />
    <rect x="16" y="6" width="11" height="11" fill="#475569" />
    <rect x="18" y="8" width="7" height="7" fill="#64748b" />
    <!-- Core glowing vents -->
    <rect x="17" y="10" width="2" height="3" fill="#38bdf8" />
    <rect x="24" y="10" width="2" height="3" fill="#38bdf8" />
    <rect x="20" y="7" width="3" height="2" fill="#0284c7" />
    <rect x="20" y="14" width="3" height="2" fill="#0284c7" />
    <!-- Core highlights -->
    <rect x="16" y="6" width="11" height="1" fill="#94a3b8" />
    <rect x="16" y="6" width="1" height="11" fill="#94a3b8" />
    <!-- Corner rivets -->
    <rect x="16" y="6" width="2" height="2" fill="#0f172a" />
    <rect x="25" y="6" width="2" height="2" fill="#0f172a" />
    <rect x="16" y="15" width="2" height="2" fill="#0f172a" />
    <rect x="25" y="15" width="2" height="2" fill="#0f172a" />
  `),

  'spear': createSvg(64, 64, `
    <!-- Shaft -->
    <rect x="5" y="25" width="2" height="2" fill="#78350f" />
    <rect x="6" y="24" width="2" height="2" fill="#92400e" />
    <rect x="7" y="23" width="3" height="3" fill="#b45309" />
    <rect x="9" y="21" width="3" height="3" fill="#d97706" />
    <rect x="11" y="19" width="3" height="3" fill="#b45309" />
    <rect x="13" y="17" width="3" height="3" fill="#d97706" />
    <rect x="15" y="15" width="3" height="3" fill="#b45309" />
    <rect x="17" y="13" width="3" height="3" fill="#d97706" />
    <rect x="19" y="11" width="3" height="3" fill="#b45309" />
    <!-- Spear Tip (Diamond) -->
    <rect x="20" y="10" width="4" height="4" fill="#0f766e" />
    <rect x="21" y="7" width="5" height="5" fill="#14b8a6" />
    <rect x="23" y="5" width="5" height="5" fill="#2dd4bf" />
    <rect x="25" y="3" width="4" height="4" fill="#99f6e4" />
    <rect x="27" y="2" width="2" height="2" fill="#ffffff" />
    <!-- Guard -->
    <rect x="18" y="14" width="3" height="1" fill="#0f766e" />
    <rect x="16" y="16" width="1" height="3" fill="#0f766e" />
  `),

  'diamond_sword': createSvg(64, 64, `
    <!-- Pommel -->
    <rect x="4" y="26" width="2" height="2" fill="#1e293b" />
    <rect x="5" y="25" width="2" height="2" fill="#334155" />
    <!-- Handle -->
    <rect x="6" y="24" width="2" height="2" fill="#78350f" />
    <rect x="7" y="23" width="2" height="2" fill="#92400e" />
    <rect x="8" y="22" width="2" height="2" fill="#78350f" />
    <rect x="9" y="21" width="2" height="2" fill="#92400e" />
    <!-- Guard -->
    <rect x="7" y="19" width="3" height="3" fill="#0f766e" />
    <rect x="10" y="18" width="4" height="4" fill="#14b8a6" />
    <rect x="9" y="21" width="3" height="3" fill="#0f766e" />
    <rect x="6" y="18" width="2" height="2" fill="#0f766e" />
    <rect x="12" y="24" width="2" height="2" fill="#0f766e" />
    <!-- Blade -->
    <rect x="11" y="17" width="3" height="3" fill="#2dd4bf" />
    <rect x="13" y="15" width="3" height="3" fill="#5eead4" />
    <rect x="15" y="13" width="3" height="3" fill="#2dd4bf" />
    <rect x="17" y="11" width="3" height="3" fill="#5eead4" />
    <rect x="19" y="9" width="3" height="3" fill="#2dd4bf" />
    <rect x="21" y="7" width="3" height="3" fill="#5eead4" />
    <rect x="23" y="5" width="3" height="3" fill="#99f6e4" />
    <rect x="25" y="3" width="3" height="3" fill="#ccfbf1" />
    <rect x="27" y="2" width="2" height="2" fill="#ffffff" />
    <!-- Outline/Shadow -->
    <rect x="12" y="19" width="1" height="1" fill="#0f766e" />
    <rect x="14" y="17" width="1" height="1" fill="#0f766e" />
    <rect x="16" y="15" width="1" height="1" fill="#0f766e" />
    <rect x="18" y="13" width="1" height="1" fill="#0f766e" />
    <rect x="20" y="11" width="1" height="1" fill="#0f766e" />
    <rect x="22" y="9" width="1" height="1" fill="#0f766e" />
    <rect x="24" y="7" width="1" height="1" fill="#0f766e" />
    <rect x="26" y="5" width="1" height="1" fill="#0f766e" />
  `),

  'netherite_sword': createSvg(64, 64, `
    <rect x="4" y="26" width="2" height="2" fill="#171717" />
    <rect x="6" y="24" width="2" height="2" fill="#44403c" />
    <rect x="8" y="22" width="2" height="2" fill="#44403c" />
    <!-- Guard -->
    <rect x="7" y="19" width="3" height="3" fill="#1c1917" />
    <rect x="10" y="18" width="4" height="4" fill="#292524" />
    <rect x="9" y="21" width="3" height="3" fill="#1c1917" />
    <!-- Blade -->
    <rect x="11" y="17" width="3" height="3" fill="#312e81" />
    <rect x="13" y="15" width="3" height="3" fill="#4338ca" />
    <rect x="15" y="13" width="3" height="3" fill="#27272a" />
    <rect x="17" y="11" width="3" height="3" fill="#3f3f46" />
    <rect x="19" y="9" width="3" height="3" fill="#27272a" />
    <rect x="21" y="7" width="3" height="3" fill="#3f3f46" />
    <rect x="23" y="5" width="3" height="3" fill="#52525b" />
    <rect x="25" y="3" width="3" height="3" fill="#71717a" />
    <rect x="27" y="2" width="2" height="2" fill="#a1a1aa" />
  `),

  'diamond_pickaxe': createSvg(64, 64, `
    <!-- Handle -->
    <rect x="6" y="24" width="2" height="2" fill="#78350f" />
    <rect x="8" y="22" width="2" height="2" fill="#92400e" />
    <rect x="10" y="20" width="2" height="2" fill="#78350f" />
    <rect x="12" y="18" width="2" height="2" fill="#92400e" />
    <rect x="14" y="16" width="2" height="2" fill="#78350f" />
    <rect x="16" y="14" width="2" height="2" fill="#92400e" />
    <rect x="18" y="12" width="2" height="2" fill="#78350f" />
    <!-- Pickaxe Head -->
    <rect x="12" y="7" width="3" height="3" fill="#0f766e" />
    <rect x="14" y="6" width="3" height="3" fill="#14b8a6" />
    <rect x="16" y="5" width="4" height="4" fill="#2dd4bf" />
    <rect x="19" y="6" width="4" height="4" fill="#5eead4" />
    <rect x="22" y="8" width="3" height="3" fill="#2dd4bf" />
    <rect x="24" y="11" width="3" height="3" fill="#14b8a6" />
    <rect x="25" y="14" width="2" height="2" fill="#0f766e" />
    <!-- Tips -->
    <rect x="10" y="9" width="3" height="2" fill="#2dd4bf" />
    <rect x="9" y="11" width="2" height="2" fill="#5eead4" />
    <rect x="8" y="13" width="2" height="2" fill="#99f6e4" />
    <rect x="26" y="16" width="2" height="2" fill="#99f6e4" />
  `),

  'shield': createSvg(64, 64, `
    <rect x="8" y="4" width="16" height="2" fill="#94a3b8" />
    <rect x="6" y="6" width="20" height="14" fill="#78350f" />
    <rect x="7" y="7" width="18" height="12" fill="#92400e" />
    <rect x="8" y="20" width="16" height="4" fill="#78350f" />
    <rect x="10" y="24" width="12" height="3" fill="#78350f" />
    <rect x="12" y="27" width="8" height="2" fill="#78350f" />
    <!-- Iron Boss Center -->
    <rect x="13" y="11" width="6" height="6" fill="#64748b" />
    <rect x="14" y="12" width="4" height="4" fill="#cbd5e1" />
    <!-- Rim -->
    <rect x="6" y="6" width="2" height="14" fill="#64748b" />
    <rect x="24" y="6" width="2" height="14" fill="#64748b" />
  `),

  'bow': createSvg(64, 64, `
    <!-- Wood Curve -->
    <rect x="7" y="23" width="2" height="2" fill="#78350f" />
    <rect x="9" y="21" width="2" height="2" fill="#b45309" />
    <rect x="11" y="18" width="2" height="3" fill="#d97706" />
    <rect x="14" y="14" width="3" height="3" fill="#b45309" />
    <rect x="18" y="11" width="3" height="2" fill="#d97706" />
    <rect x="21" y="9" width="2" height="2" fill="#b45309" />
    <rect x="23" y="7" width="2" height="2" fill="#78350f" />
    <!-- Bow String -->
    <rect x="8" y="24" width="1" height="1" fill="#ffffff" />
    <rect x="10" y="20" width="1" height="4" fill="#f8fafc" />
    <rect x="13" y="15" width="1" height="5" fill="#f8fafc" />
    <rect x="17" y="12" width="1" height="4" fill="#f8fafc" />
    <rect x="21" y="10" width="3" height="1" fill="#f8fafc" />
  `),

  'trident': createSvg(64, 64, `
    <rect x="6" y="24" width="2" height="2" fill="#0d9488" />
    <rect x="8" y="22" width="2" height="2" fill="#14b8a6" />
    <rect x="10" y="20" width="2" height="2" fill="#2dd4bf" />
    <rect x="12" y="18" width="2" height="2" fill="#0d9488" />
    <rect x="14" y="16" width="2" height="2" fill="#14b8a6" />
    <rect x="16" y="14" width="2" height="2" fill="#2dd4bf" />
    <!-- Prongs -->
    <rect x="17" y="11" width="5" height="4" fill="#0f766e" />
    <!-- Center prong -->
    <rect x="21" y="7" width="2" height="5" fill="#5eead4" />
    <rect x="23" y="4" width="2" height="4" fill="#ccfbf1" />
    <!-- Left prong -->
    <rect x="16" y="9" width="2" height="3" fill="#2dd4bf" />
    <rect x="17" y="6" width="2" height="4" fill="#99f6e4" />
    <!-- Right prong -->
    <rect x="22" y="12" width="3" height="2" fill="#2dd4bf" />
    <rect x="24" y="10" width="4" height="2" fill="#99f6e4" />
  `),

  'wind_charge': createSvg(64, 64, `
    <circle cx="16" cy="16" r="10" fill="#bae6fd" opacity="0.3" />
    <rect x="10" y="14" width="12" height="4" fill="#e0f2fe" rx="2" />
    <rect x="12" y="11" width="8" height="10" fill="#bae6fd" rx="2" />
    <rect x="14" y="9" width="4" height="14" fill="#ffffff" rx="1" />
    <!-- Wind swirl details -->
    <rect x="8" y="12" width="3" height="2" fill="#60a5fa" />
    <rect x="21" y="18" width="3" height="2" fill="#60a5fa" />
    <rect x="12" y="21" width="4" height="2" fill="#93c5fd" />
    <rect x="16" y="9" width="4" height="2" fill="#93c5fd" />
  `),

  'ice_ball': createSvg(64, 64, `
    <rect x="11" y="9" width="10" height="14" fill="#7dd3fc" />
    <rect x="9" y="11" width="14" height="10" fill="#38bdf8" />
    <rect x="12" y="12" width="8" height="8" fill="#bae6fd" />
    <rect x="13" y="13" width="3" height="3" fill="#ffffff" />
    <!-- Crystals -->
    <rect x="17" y="15" width="2" height="2" fill="#0284c7" />
    <rect x="10" y="15" width="2" height="2" fill="#0284c7" />
  `),

  // === KEY BLOCKS ===
  'grass_block': createSvg(64, 64, `
    <!-- Top Face (Grass) -->
    <polygon points="16,2 29,8 16,14 3,8" fill="#5c8e32" stroke="#75af3e" stroke-width="1" />
    <!-- Left Face (Dirt) -->
    <polygon points="3,8 16,14 16,28 3,22" fill="#573d26" />
    <!-- Right Face (Dirt shaded) -->
    <polygon points="16,14 29,8 29,22 16,28" fill="#442e1c" />
    <!-- Grass Drip Top -->
    <polygon points="3,8 16,14 16,17 11,15 9,18 6,15 3,17" fill="#4a7328" />
    <polygon points="16,14 29,8 29,12 25,15 22,12 19,16 16,14" fill="#3e6320" />
  `),

  'crafter': createSvg(64, 64, `
    <!-- 3D Cube Structure -->
    <polygon points="16,2 29,8 16,14 3,8" fill="#475569" stroke="#64748b" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#334155" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#1e293b" />
    <!-- Crafter Face Details on Left -->
    <polygon points="6,12 13,15 13,23 6,20" fill="#1e293b" />
    <!-- Redstone Glowing Eye in Center -->
    <circle cx="16" cy="18" r="3" fill="#ef4444" />
    <circle cx="16" cy="18" r="1.5" fill="#fca5a5" />
    <!-- Grid markings on top -->
    <polygon points="16,5 21,7 16,9 11,7" fill="#64748b" />
  `),

  'crafting_table': createSvg(64, 64, `
    <!-- Top Face (Grid) -->
    <polygon points="16,2 29,8 16,14 3,8" fill="#b45309" stroke="#d97706" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#78350f" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#451a03" />
    <!-- Tools on Side -->
    <rect x="7" y="14" width="4" height="2" fill="#cbd5e1" />
    <rect x="9" y="16" width="1" height="4" fill="#92400e" />
    <rect x="20" y="15" width="4" height="2" fill="#cbd5e1" />
    <rect x="22" y="17" width="1" height="4" fill="#92400e" />
  `),

  'furnace': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#64748b" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#475569" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#334155" />
    <!-- Fire Mouth Glow -->
    <polygon points="7,17 12,19 12,23 7,21" fill="#1e293b" />
    <polygon points="8,18 11,19 11,22 8,21" fill="#f97316" />
    <polygon points="9,19 10,19 10,21 9,20" fill="#fef08a" />
  `),

  'chest': createSvg(64, 64, `
    <polygon points="16,3 28,8 16,13 4,8" fill="#b45309" />
    <polygon points="4,8 16,13 16,26 4,21" fill="#78350f" />
    <polygon points="16,13 28,8 28,21 16,26" fill="#451a03" />
    <!-- Lock -->
    <rect x="15" y="14" width="2" height="4" fill="#94a3b8" />
    <rect x="15.5" y="15" width="1" height="2" fill="#f8fafc" />
  `),

  'tnt': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#dc2626" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#b91c1c" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#991b1b" />
    <!-- White Band -->
    <polygon points="3,13 16,19 16,23 3,17" fill="#ffffff" />
    <polygon points="16,19 29,13 29,17 16,23" fill="#e2e8f0" />
    <!-- TNT Text -->
    <rect x="6" y="15" width="6" height="2" fill="#000000" />
    <rect x="8" y="17" width="2" height="2" fill="#000000" />
  `),

  'heavy_core': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#475569" stroke="#94a3b8" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#334155" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#1e293b" />
    <!-- Glowing blue portal eye -->
    <circle cx="16" cy="19" r="3.5" fill="#38bdf8" />
    <circle cx="16" cy="19" r="1.5" fill="#ffffff" />
  `),

  'packed_ice_bricks': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#7dd3fc" stroke="#bae6fd" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#38bdf8" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#0284c7" />
    <!-- Brick Mortar Lines -->
    <polygon points="3,15 16,21 16,22 3,16" fill="#0369a1" />
    <polygon points="16,21 29,15 29,16 16,22" fill="#075985" />
  `),

  // === ITEMS & MINERALS ===
  'diamond': createSvg(64, 64, `
    <polygon points="16,4 25,12 16,28 7,12" fill="#2dd4bf" stroke="#0f766e" stroke-width="1" />
    <!-- Facets -->
    <polygon points="16,4 20,12 16,16 12,12" fill="#99f6e4" />
    <polygon points="16,4 25,12 20,12" fill="#5eead4" />
    <polygon points="16,4 7,12 12,12" fill="#14b8a6" />
    <polygon points="20,12 25,12 16,28 16,16" fill="#0d9488" />
    <polygon points="12,12 7,12 16,28 16,16" fill="#115e59" />
    <polygon points="14,6 18,6 16,10" fill="#ffffff" />
  `),

  'emerald': createSvg(64, 64, `
    <polygon points="16,4 25,10 25,22 16,28 7,22 7,10" fill="#10b981" stroke="#065f46" stroke-width="1" />
    <polygon points="16,7 22,12 22,20 16,25 10,20 10,12" fill="#34d399" />
    <polygon points="14,10 18,10 16,14" fill="#a7f3d0" />
    <polygon points="15,11 17,11 16,13" fill="#ffffff" />
  `),

  'netherite_ingot': createSvg(64, 64, `
    <polygon points="8,10 24,10 20,22 4,22" fill="#292524" stroke="#1c1917" stroke-width="1" />
    <polygon points="9,11 23,11 20,14 6,14" fill="#44403c" />
    <polygon points="6,14 20,14 18,20 4,20" fill="#383230" />
    <!-- Nether debris streak -->
    <rect x="10" y="15" width="4" height="2" fill="#78350f" />
    <rect x="15" y="17" width="3" height="2" fill="#6d28d9" opacity="0.6" />
  `),

  'gold_ingot': createSvg(64, 64, `
    <polygon points="8,10 24,10 20,22 4,22" fill="#eab308" stroke="#854d0e" stroke-width="1" />
    <polygon points="9,11 23,11 20,14 6,14" fill="#fef08a" />
    <polygon points="6,14 20,14 18,20 4,20" fill="#ca8a04" />
  `),

  'iron_ingot': createSvg(64, 64, `
    <polygon points="8,10 24,10 20,22 4,22" fill="#94a3b8" stroke="#475569" stroke-width="1" />
    <polygon points="9,11 23,11 20,14 6,14" fill="#f8fafc" />
    <polygon points="6,14 20,14 18,20 4,20" fill="#64748b" />
  `),

  'copper_ingot': createSvg(64, 64, `
    <polygon points="8,10 24,10 20,22 4,22" fill="#c2410c" stroke="#7c2d12" stroke-width="1" />
    <polygon points="9,11 23,11 20,14 6,14" fill="#fb923c" />
    <polygon points="6,14 20,14 18,20 4,20" fill="#9a3412" />
  `),

  'redstone_dust': createSvg(64, 64, `
    <circle cx="16" cy="16" r="3" fill="#ef4444" />
    <circle cx="11" cy="18" r="2" fill="#dc2626" />
    <circle cx="21" cy="18" r="2" fill="#b91c1c" />
    <circle cx="15" cy="11" r="2.5" fill="#f87171" />
    <circle cx="19" cy="13" r="1.5" fill="#ef4444" />
    <circle cx="13" cy="22" r="1.5" fill="#991b1b" />
    <!-- Glow Sparkle -->
    <rect x="15" y="10" width="1" height="1" fill="#ffffff" />
    <rect x="16" y="15" width="1" height="1" fill="#ffffff" />
  `),

  'ender_pearl': createSvg(64, 64, `
    <circle cx="16" cy="16" r="10" fill="#0f766e" stroke="#042f2e" stroke-width="1.5" />
    <circle cx="16" cy="16" r="7" fill="#14b8a6" />
    <circle cx="14" cy="14" r="4" fill="#2dd4bf" />
    <circle cx="13" cy="13" r="1.5" fill="#ccfbf1" />
  `),

  'eye_of_ender': createSvg(64, 64, `
    <circle cx="16" cy="16" r="10" fill="#0f766e" stroke="#042f2e" stroke-width="1.5" />
    <circle cx="16" cy="16" r="7" fill="#14b8a6" />
    <!-- Slit Eye Pupil -->
    <ellipse cx="16" cy="16" rx="2" ry="5" fill="#f59e0b" />
    <ellipse cx="16" cy="16" rx="1" ry="4" fill="#451a03" />
    <circle cx="15.5" cy="14" r="0.8" fill="#ffffff" />
  `),

  'golden_apple': createSvg(64, 64, `
    <!-- Apple body -->
    <circle cx="13" cy="17" r="7" fill="#facc15" />
    <circle cx="19" cy="17" r="7" fill="#f59e0b" />
    <circle cx="16" cy="15" r="7" fill="#eab308" />
    <!-- Highlights -->
    <circle cx="12" cy="14" r="2" fill="#fef08a" />
    <!-- Stem -->
    <rect x="15" y="6" width="2" height="4" fill="#78350f" />
    <rect x="17" y="5" width="2" height="2" fill="#15803d" />
  `),

  'golden_dandelion': createSvg(64, 64, `
    <!-- Stem -->
    <rect x="15" y="17" width="2" height="10" fill="#15803d" />
    <rect x="13" y="21" width="2" height="3" fill="#16a34a" />
    <!-- Golden Petals -->
    <circle cx="16" cy="13" r="6" fill="#eab308" />
    <circle cx="16" cy="13" r="4" fill="#facc15" />
    <circle cx="16" cy="13" r="2" fill="#fef08a" />
    <!-- Gold nuggets aura -->
    <rect x="10" y="8" width="2" height="2" fill="#fbbf24" />
    <rect x="21" y="8" width="2" height="2" fill="#fbbf24" />
    <rect x="9" y="15" width="2" height="2" fill="#fbbf24" />
    <rect x="22" y="15" width="2" height="2" fill="#fbbf24" />
  `),

  'name_tag': createSvg(64, 64, `
    <polygon points="8,10 18,6 26,14 16,26 8,18" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1" />
    <circle cx="12" cy="13" r="1.5" fill="#475569" />
    <!-- String loop -->
    <path d="M 12 13 Q 6 10 7 6 Q 10 4 12 11" fill="none" stroke="#dc2626" stroke-width="1.5" />
    <line x1="14" y1="17" x2="20" y2="15" stroke="#cbd5e1" stroke-width="1" />
  `),

  'totem_of_undying': createSvg(64, 64, `
    <rect x="12" y="5" width="8" height="6" fill="#eab308" />
    <!-- Green Eyes -->
    <rect x="13" y="7" width="2" height="2" fill="#10b981" />
    <rect x="17" y="7" width="2" height="2" fill="#10b981" />
    <!-- Wings/Arms -->
    <polygon points="7,11 12,11 12,17 9,19 7,16" fill="#f59e0b" />
    <polygon points="25,11 20,11 20,17 23,19 25,16" fill="#f59e0b" />
    <!-- Body -->
    <rect x="13" y="11" width="6" height="12" fill="#ca8a04" />
    <rect x="14" y="13" width="4" height="7" fill="#facc15" />
    <!-- Feet -->
    <rect x="11" y="23" width="4" height="4" fill="#a16207" />
    <rect x="17" y="23" width="4" height="4" fill="#a16207" />
  `),

  'potion_bottle': createSvg(64, 64, `
    <!-- Cork & Neck -->
    <rect x="14" y="4" width="4" height="2" fill="#78350f" />
    <rect x="15" y="6" width="2" height="4" fill="#cbd5e1" />
    <!-- Glass Bottle Body -->
    <circle cx="16" cy="18" r="9" fill="#c084fc" opacity="0.8" stroke="#94a3b8" stroke-width="1.5" />
    <!-- Liquid glow -->
    <circle cx="16" cy="19" r="6.5" fill="#9333ea" />
    <circle cx="14" cy="17" r="2" fill="#e9d5ff" />
  `),

  // === MOBS / ENTITY FACES ===
  'creeper': createSvg(64, 64, `
    <rect x="4" y="4" width="24" height="24" fill="#22c55e" />
    <!-- Dark green textures -->
    <rect x="6" y="6" width="4" height="4" fill="#16a34a" />
    <rect x="22" y="6" width="4" height="4" fill="#16a34a" />
    <rect x="14" y="22" width="4" height="4" fill="#15803d" />
    <!-- Eyes -->
    <rect x="8" y="10" width="4" height="4" fill="#000000" />
    <rect x="20" y="10" width="4" height="4" fill="#000000" />
    <!-- Nose & Mouth -->
    <rect x="14" y="14" width="4" height="6" fill="#000000" />
    <rect x="12" y="16" width="8" height="4" fill="#000000" />
    <rect x="10" y="18" width="4" height="7" fill="#000000" />
    <rect x="18" y="18" width="4" height="7" fill="#000000" />
  `),

  'steve': createSvg(64, 64, `
    <!-- Face Base -->
    <rect x="4" y="4" width="24" height="24" fill="#b48364" />
    <!-- Hair -->
    <rect x="4" y="4" width="24" height="7" fill="#452718" />
    <rect x="4" y="11" width="3" height="4" fill="#452718" />
    <rect x="25" y="11" width="3" height="4" fill="#452718" />
    <!-- Eyes -->
    <rect x="7" y="13" width="5" height="3" fill="#ffffff" />
    <rect x="20" y="13" width="5" height="3" fill="#ffffff" />
    <rect x="9" y="13" width="3" height="3" fill="#2563eb" />
    <rect x="20" y="13" width="3" height="3" fill="#2563eb" />
    <!-- Nose -->
    <rect x="14" y="15" width="4" height="3" fill="#916147" />
    <!-- Mouth / Beard -->
    <rect x="12" y="19" width="8" height="3" fill="#522f1c" />
    <rect x="13" y="19" width="6" height="1" fill="#754731" />
  `),

  'warden': createSvg(64, 64, `
    <!-- Dark Sculk Head -->
    <rect x="4" y="6" width="24" height="20" fill="#091b24" />
    <!-- Antlers -->
    <rect x="2" y="2" width="4" height="8" fill="#0d9488" />
    <rect x="26" y="2" width="4" height="8" fill="#0d9488" />
    <rect x="4" y="3" width="3" height="2" fill="#5eead4" />
    <rect x="25" y="3" width="3" height="2" fill="#5eead4" />
    <!-- Glowing Mouth Cavity -->
    <rect x="10" y="16" width="12" height="6" fill="#042f2e" />
    <rect x="12" y="18" width="8" height="3" fill="#14b8a6" />
    <circle cx="16" cy="19" r="1.5" fill="#5eead4" />
  `),

  'frostbite': createSvg(64, 64, `
    <!-- Shivering Glacial Zombie Face -->
    <rect x="4" y="4" width="24" height="24" fill="#38bdf8" />
    <!-- Frozen Hair -->
    <rect x="4" y="4" width="24" height="6" fill="#0369a1" />
    <!-- Eyes (Hollow White/Blue) -->
    <rect x="8" y="12" width="4" height="3" fill="#082f49" />
    <rect x="20" y="12" width="4" height="3" fill="#082f49" />
    <rect x="9" y="13" width="2" height="1" fill="#bae6fd" />
    <rect x="21" y="13" width="2" height="1" fill="#bae6fd" />
    <!-- Frosting on mouth -->
    <rect x="12" y="18" width="8" height="3" fill="#bae6fd" />
    <rect x="13" y="19" width="6" height="2" fill="#ffffff" />
  `),

  // === HUD & HEARTS ===
  'heart_full': createSvg(32, 32, `
    <path d="M16 26 L6 15 A6 6 0 0 1 15 7 L16 8 L17 7 A6 6 0 0 1 26 15 Z" fill="#ef4444" stroke="#7f1d1d" stroke-width="2" />
    <rect x="9" y="9" width="3" height="3" fill="#fca5a5" />
    <rect x="10" y="10" width="1" height="1" fill="#ffffff" />
  `),

  'hunger_full': createSvg(32, 32, `
    <rect x="6" y="18" width="4" height="4" fill="#e2e8f0" stroke="#475569" stroke-width="1" />
    <ellipse cx="18" cy="14" rx="9" ry="6" fill="#92400e" stroke="#451a03" stroke-width="1.5" />
    <ellipse cx="16" cy="13" rx="7" ry="4" fill="#b45309" />
    <ellipse cx="15" cy="12" rx="3" ry="1.5" fill="#fde68a" />
  `)
};

let count = 0;
for (const [name, content] of Object.entries(icons)) {
  const filePath = path.join(outDir, `${name}.svg`);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  count++;
}

console.log(`Successfully generated ${count} pixel-perfect Minecraft SVGs in ${outDir}`);
