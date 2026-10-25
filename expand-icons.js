import fs from 'fs';
import path from 'path';

const outDir = path.resolve('public/icons/minecraft');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function createSvg(width, height, content, viewBox = '0 0 32 32') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" shape-rendering="crispEdges">
${content.trim()}
</svg>`;
}

const newIcons = {
  // === TOOLS & GEAR ===
  'diamond_axe': createSvg(64, 64, `
    <!-- Handle -->
    <rect x="7" y="23" width="2" height="2" fill="#78350f" />
    <rect x="9" y="21" width="2" height="2" fill="#92400e" />
    <rect x="11" y="19" width="2" height="2" fill="#78350f" />
    <rect x="13" y="17" width="2" height="2" fill="#92400e" />
    <rect x="15" y="15" width="2" height="2" fill="#78350f" />
    <rect x="17" y="13" width="2" height="2" fill="#92400e" />
    <rect x="19" y="11" width="2" height="2" fill="#78350f" />
    <!-- Axe Blade -->
    <rect x="16" y="7" width="6" height="5" fill="#14b8a6" />
    <rect x="18" y="5" width="5" height="5" fill="#2dd4bf" />
    <rect x="22" y="5" width="3" height="4" fill="#5eead4" />
    <rect x="24" y="6" width="2" height="3" fill="#99f6e4" />
    <rect x="14" y="9" width="3" height="5" fill="#0f766e" />
    <rect x="17" y="12" width="3" height="3" fill="#14b8a6" />
    <rect x="19" y="14" width="2" height="2" fill="#5eead4" />
  `),

  'diamond_shovel': createSvg(64, 64, `
    <rect x="6" y="24" width="2" height="2" fill="#78350f" />
    <rect x="8" y="22" width="2" height="2" fill="#92400e" />
    <rect x="10" y="20" width="2" height="2" fill="#78350f" />
    <rect x="12" y="18" width="2" height="2" fill="#92400e" />
    <rect x="14" y="16" width="2" height="2" fill="#78350f" />
    <rect x="16" y="14" width="2" height="2" fill="#92400e" />
    <rect x="18" y="12" width="2" height="2" fill="#78350f" />
    <!-- Spade Head -->
    <rect x="20" y="9" width="5" height="5" fill="#14b8a6" />
    <rect x="22" y="7" width="5" height="5" fill="#2dd4bf" />
    <rect x="24" y="5" width="4" height="4" fill="#5eead4" />
    <rect x="26" y="4" width="2" height="2" fill="#ffffff" />
    <rect x="19" y="11" width="2" height="2" fill="#0f766e" />
  `),

  'diamond_hoe': createSvg(64, 64, `
    <rect x="7" y="23" width="2" height="2" fill="#78350f" />
    <rect x="9" y="21" width="2" height="2" fill="#92400e" />
    <rect x="11" y="19" width="2" height="2" fill="#78350f" />
    <rect x="13" y="17" width="2" height="2" fill="#92400e" />
    <rect x="15" y="15" width="2" height="2" fill="#78350f" />
    <rect x="17" y="13" width="2" height="2" fill="#92400e" />
    <!-- Hoe Blade (Right angle) -->
    <rect x="15" y="7" width="9" height="4" fill="#2dd4bf" />
    <rect x="21" y="6" width="5" height="4" fill="#5eead4" />
    <rect x="24" y="5" width="3" height="3" fill="#99f6e4" />
  `),

  'crossbow': createSvg(64, 64, `
    <!-- Stock -->
    <rect x="6" y="24" width="3" height="3" fill="#78350f" />
    <rect x="9" y="21" width="3" height="3" fill="#92400e" />
    <rect x="12" y="18" width="3" height="3" fill="#78350f" />
    <rect x="15" y="15" width="3" height="3" fill="#92400e" />
    <!-- Cross Limb -->
    <rect x="10" y="11" width="13" height="3" fill="#b45309" />
    <rect x="8" y="13" width="3" height="3" fill="#78350f" />
    <rect x="22" y="9" width="3" height="3" fill="#78350f" />
    <!-- Iron Bowstring & Mechanism -->
    <rect x="16" y="14" width="2" height="2" fill="#cbd5e1" />
    <line x1="8" y1="14" x2="16" y2="15" stroke="#f8fafc" stroke-width="1" />
    <line x1="23" y1="10" x2="16" y2="15" stroke="#f8fafc" stroke-width="1" />
  `),

  'flint_and_steel': createSvg(64, 64, `
    <!-- Steel "C" Loop -->
    <path d="M 12 10 L 20 10 L 22 13 L 20 22 L 12 22 L 10 19 L 10 13 Z" fill="none" stroke="#94a3b8" stroke-width="3" />
    <!-- Dark Flint Rock in Center -->
    <polygon points="12,14 17,12 18,17 14,20" fill="#334155" stroke="#1e293b" stroke-width="1" />
    <!-- Spark -->
    <rect x="14" y="11" width="2" height="2" fill="#fbbf24" />
  `),

  'shears': createSvg(64, 64, `
    <!-- Pivot -->
    <circle cx="16" cy="16" r="2" fill="#475569" />
    <!-- Blade 1 -->
    <polygon points="16,16 11,11 10,7 13,8 18,14" fill="#94a3b8" />
    <polygon points="11,11 10,7 12,8" fill="#f8fafc" />
    <!-- Blade 2 -->
    <polygon points="16,16 21,21 22,25 19,24 14,18" fill="#64748b" />
    <polygon points="21,21 22,25 20,24" fill="#cbd5e1" />
  `),

  'compass': createSvg(64, 64, `
    <circle cx="16" cy="16" r="11" fill="#475569" stroke="#1e293b" stroke-width="2" />
    <circle cx="16" cy="16" r="9" fill="#0f172a" />
    <!-- Needle: Red pointing North -->
    <polygon points="16,16 14,14 16,9 18,14" fill="#ef4444" />
    <polygon points="16,16 14,18 16,23 18,18" fill="#94a3b8" />
    <circle cx="16" cy="16" r="1.5" fill="#f8fafc" />
  `),

  'clock': createSvg(64, 64, `
    <circle cx="16" cy="16" r="11" fill="#eab308" stroke="#854d0e" stroke-width="2" />
    <!-- Celestial Dial (Day/Night Split) -->
    <clipPath id="clock-clip"><circle cx="16" cy="16" r="9" /></clipPath>
    <g clip-path="url(#clock-clip)">
      <rect x="7" y="7" width="18" height="9" fill="#38bdf8" />
      <rect x="7" y="16" width="18" height="9" fill="#0f172a" />
      <!-- Sun -->
      <circle cx="16" cy="12" r="3" fill="#facc15" />
      <!-- Stars -->
      <circle cx="12" cy="20" r="1" fill="#ffffff" />
      <circle cx="20" cy="21" r="0.8" fill="#ffffff" />
    </g>
  `),

  // === ARMOR ===
  'diamond_helmet': createSvg(64, 64, `
    <!-- Top and Brow -->
    <rect x="9" y="8" width="14" height="6" fill="#2dd4bf" />
    <rect x="11" y="6" width="10" height="2" fill="#5eead4" />
    <!-- Cheek guards -->
    <rect x="9" y="14" width="4" height="8" fill="#14b8a6" />
    <rect x="19" y="14" width="4" height="8" fill="#0d9488" />
    <!-- Nose bridge -->
    <rect x="15" y="14" width="2" height="4" fill="#2dd4bf" />
    <!-- Highlights -->
    <rect x="11" y="8" width="2" height="2" fill="#ffffff" />
  `),

  'diamond_chestplate': createSvg(64, 64, `
    <!-- Shoulders -->
    <rect x="6" y="8" width="6" height="6" fill="#2dd4bf" />
    <rect x="20" y="8" width="6" height="6" fill="#14b8a6" />
    <!-- Chest Torso -->
    <rect x="9" y="12" width="14" height="12" fill="#2dd4bf" />
    <rect x="11" y="14" width="10" height="9" fill="#5eead4" />
    <!-- Highlights -->
    <rect x="10" y="10" width="2" height="2" fill="#ffffff" />
    <rect x="12" y="14" width="2" height="2" fill="#ffffff" />
    <!-- Waistband -->
    <rect x="10" y="24" width="12" height="2" fill="#0f766e" />
  `),

  'diamond_leggings': createSvg(64, 64, `
    <!-- Waist -->
    <rect x="9" y="8" width="14" height="5" fill="#2dd4bf" />
    <!-- Left Leg -->
    <rect x="9" y="13" width="5" height="12" fill="#14b8a6" />
    <rect x="10" y="14" width="3" height="10" fill="#5eead4" />
    <!-- Right Leg -->
    <rect x="18" y="13" width="5" height="12" fill="#0d9488" />
    <rect x="19" y="14" width="3" height="10" fill="#2dd4bf" />
  `),

  'diamond_boots': createSvg(64, 64, `
    <!-- Left Boot -->
    <rect x="8" y="14" width="5" height="6" fill="#14b8a6" />
    <rect x="6" y="20" width="7" height="4" fill="#2dd4bf" />
    <rect x="7" y="21" width="3" height="2" fill="#5eead4" />
    <!-- Right Boot -->
    <rect x="19" y="14" width="5" height="6" fill="#0d9488" />
    <rect x="19" y="20" width="7" height="4" fill="#14b8a6" />
    <rect x="20" y="21" width="3" height="2" fill="#2dd4bf" />
  `),

  'elytra': createSvg(64, 64, `
    <!-- Left Wing -->
    <path d="M 16 8 Q 8 12 7 24 Q 13 22 16 16 Z" fill="#475569" stroke="#334155" stroke-width="1" />
    <!-- Right Wing -->
    <path d="M 16 8 Q 24 12 25 24 Q 19 22 16 16 Z" fill="#64748b" stroke="#475569" stroke-width="1" />
    <!-- Membrane highlights -->
    <line x1="16" y1="9" x2="9" y2="20" stroke="#94a3b8" stroke-width="1" />
    <line x1="16" y1="9" x2="23" y2="20" stroke="#cbd5e1" stroke-width="1" />
  `),

  // === MODERN 2024-2026 BLOCKS ===
  'brittle_ice': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#bae6fd" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#7dd3fc" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#38bdf8" />
    <!-- Cracks (3-stage fracture lines) -->
    <line x1="16" y1="6" x2="22" y2="9" stroke="#0284c7" stroke-width="1.5" />
    <line x1="16" y1="6" x2="11" y2="10" stroke="#0284c7" stroke-width="1.5" />
    <line x1="9" y1="12" x2="12" y2="21" stroke="#0369a1" stroke-width="1.5" />
    <line x1="22" y1="12" x2="20" y2="23" stroke="#0369a1" stroke-width="1.5" />
  `),

  'sulfur_block': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#facc15" stroke="#eab308" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#eab308" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#ca8a04" />
    <!-- Yellow mineral textures -->
    <circle cx="16" cy="8" r="2" fill="#fef08a" />
    <circle cx="9" cy="18" r="2" fill="#a16207" />
    <circle cx="23" cy="18" r="2" fill="#a16207" />
  `),

  'straw_bed': createSvg(64, 64, `
    <!-- Pillow -->
    <rect x="6" y="10" width="6" height="8" fill="#fef08a" stroke="#ca8a04" stroke-width="1" />
    <!-- Hay Blanket Body -->
    <rect x="12" y="10" width="14" height="8" fill="#eab308" stroke="#a16207" stroke-width="1" />
    <!-- Hay strands -->
    <line x1="15" y1="12" x2="24" y2="12" stroke="#ca8a04" stroke-width="1" />
    <line x1="14" y1="15" x2="23" y2="15" stroke="#ca8a04" stroke-width="1" />
    <!-- Wooden Legs -->
    <rect x="6" y="18" width="2" height="4" fill="#78350f" />
    <rect x="24" y="18" width="2" height="4" fill="#78350f" />
  `),

  'brewing_stand': createSvg(64, 64, `
    <!-- Base Plate -->
    <polygon points="8,26 24,26 26,28 6,28" fill="#64748b" />
    <!-- Vertical Rod -->
    <rect x="15" y="8" width="2" height="18" fill="#f59e0b" stroke="#b45309" stroke-width="0.5" />
    <!-- Arms -->
    <path d="M 10 16 L 15 12 L 22 16" fill="none" stroke="#f59e0b" stroke-width="1.5" />
    <!-- Bottle holders -->
    <circle cx="9" cy="19" r="2.5" fill="#c084fc" />
    <circle cx="16" cy="22" r="2.5" fill="#c084fc" />
    <circle cx="23" cy="19" r="2.5" fill="#c084fc" />
  `),

  // === FOOD & HARVEST ===
  'golden_carrot': createSvg(64, 64, `
    <!-- Carrot Body -->
    <polygon points="21,11 11,21 9,25 13,23 23,13" fill="#facc15" stroke="#ca8a04" stroke-width="1" />
    <polygon points="20,12 13,19 12,21 19,14" fill="#fef08a" />
    <!-- Green Greens -->
    <path d="M 21 11 Q 25 7 24 5 Q 21 8 20 12" fill="#15803d" />
    <path d="M 22 12 Q 26 10 27 8 Q 23 9 21 13" fill="#16a34a" />
  `),

  'cooked_beef': createSvg(64, 64, `
    <!-- Steak shape -->
    <ellipse cx="16" cy="16" rx="9" ry="6" fill="#78350f" stroke="#451a03" stroke-width="1.5" />
    <ellipse cx="15" cy="15" rx="7" ry="4" fill="#92400e" />
    <!-- Grill marks -->
    <line x1="12" y1="13" x2="18" y2="17" stroke="#451a03" stroke-width="1.5" />
    <line x1="14" y1="12" x2="20" y2="16" stroke="#451a03" stroke-width="1.5" />
    <!-- Bone spec -->
    <circle cx="10" cy="16" r="1.5" fill="#f1f5f9" />
  `),

  'bread': createSvg(64, 64, `
    <!-- Loaf -->
    <ellipse cx="16" cy="16" rx="10" ry="5" fill="#b45309" stroke="#78350f" stroke-width="1.5" />
    <ellipse cx="15" cy="15" rx="8" ry="3.5" fill="#d97706" />
    <!-- Slits -->
    <line x1="11" y1="13" x2="12" y2="17" stroke="#78350f" stroke-width="1.5" />
    <line x1="15" y1="13" x2="16" y2="17" stroke="#78350f" stroke-width="1.5" />
    <line x1="19" y1="13" x2="20" y2="17" stroke="#78350f" stroke-width="1.5" />
  `),

  'breeze_rod': createSvg(64, 64, `
    <!-- Swirling core rod -->
    <rect x="14" y="6" width="4" height="20" fill="#93c5fd" rx="2" />
    <rect x="15" y="8" width="2" height="16" fill="#ffffff" rx="1" />
    <!-- Swirl rings -->
    <ellipse cx="16" cy="10" rx="5" ry="1.5" fill="none" stroke="#60a5fa" stroke-width="1" />
    <ellipse cx="16" cy="16" rx="6" ry="2" fill="none" stroke="#60a5fa" stroke-width="1.2" />
    <ellipse cx="16" cy="22" rx="4" ry="1.5" fill="none" stroke="#60a5fa" stroke-width="1" />
  `),

  'blaze_rod': createSvg(64, 64, `
    <rect x="14" y="6" width="4" height="20" fill="#f59e0b" rx="2" />
    <rect x="15" y="8" width="2" height="16" fill="#fef08a" rx="1" />
    <!-- Smoke/Flame embers -->
    <circle cx="12" cy="11" r="1.5" fill="#ef4444" />
    <circle cx="20" cy="17" r="1.5" fill="#f97316" />
    <circle cx="11" cy="21" r="1" fill="#eab308" />
  `),

  'nether_star': createSvg(64, 64, `
    <polygon points="16,3 19,13 29,16 19,19 16,29 13,19 3,16 13,13" fill="#ffffff" stroke="#cbd5e1" stroke-width="1" />
    <!-- Inner Star -->
    <polygon points="16,7 18,14 25,16 18,18 16,25 14,18 7,16 14,14" fill="#a7f3d0" />
    <circle cx="16" cy="16" r="2.5" fill="#34d399" />
  `),

  'nautilus_shell': createSvg(64, 64, `
    <!-- Spiral Nautilus Shell -->
    <path d="M 16 6 A 10 10 0 1 1 8 20 A 7 7 0 1 1 14 14 A 4 4 0 1 1 16 18 Z" fill="#fed7aa" stroke="#c2410c" stroke-width="1.5" />
    <!-- Stripes -->
    <path d="M 16 6 Q 16 12 11 16" fill="none" stroke="#ea580c" stroke-width="1.5" />
    <path d="M 23 10 Q 18 15 14 20" fill="none" stroke="#ea580c" stroke-width="1.5" />
  `),

  // === MOBS ===
  'zombie': createSvg(64, 64, `
    <rect x="4" y="4" width="24" height="24" fill="#15803d" />
    <!-- Dark hair -->
    <rect x="4" y="4" width="24" height="6" fill="#166534" />
    <!-- Hollow Eyes -->
    <rect x="8" y="12" width="4" height="3" fill="#052e16" />
    <rect x="20" y="12" width="4" height="3" fill="#052e16" />
    <!-- Nose -->
    <rect x="14" y="15" width="4" height="3" fill="#14532d" />
  `),

  'skeleton': createSvg(64, 64, `
    <rect x="4" y="4" width="24" height="24" fill="#cbd5e1" />
    <!-- Eye sockets -->
    <rect x="8" y="12" width="5" height="4" fill="#1e293b" />
    <rect x="19" y="12" width="5" height="4" fill="#1e293b" />
    <!-- Nose -->
    <rect x="15" y="17" width="2" height="3" fill="#1e293b" />
    <!-- Teeth -->
    <rect x="10" y="22" width="12" height="3" fill="#94a3b8" />
    <rect x="11" y="22" width="2" height="3" fill="#1e293b" />
    <rect x="15" y="22" width="2" height="3" fill="#1e293b" />
    <rect x="19" y="22" width="2" height="3" fill="#1e293b" />
  `),

  'enderman': createSvg(64, 64, `
    <rect x="4" y="4" width="24" height="24" fill="#0f0f14" />
    <!-- Glowing Purple Eyes -->
    <rect x="6" y="14" width="7" height="2" fill="#d946ef" />
    <rect x="8" y="14" width="3" height="2" fill="#fae8ff" />
    <rect x="19" y="14" width="7" height="2" fill="#d946ef" />
    <rect x="21" y="14" width="3" height="2" fill="#fae8ff" />
  `),

  'ghast': createSvg(64, 64, `
    <rect x="6" y="6" width="20" height="18" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1" />
    <!-- Happy Eyes -->
    <rect x="9" y="12" width="4" height="2" fill="#475569" />
    <rect x="19" y="12" width="4" height="2" fill="#475569" />
    <!-- Smile -->
    <rect x="13" y="17" width="6" height="2" fill="#64748b" />
    <!-- Tentacles -->
    <rect x="8" y="24" width="2" height="5" fill="#f8fafc" />
    <rect x="12" y="24" width="2" height="6" fill="#f8fafc" />
    <rect x="18" y="24" width="2" height="6" fill="#f8fafc" />
    <rect x="22" y="24" width="2" height="5" fill="#f8fafc" />
  `),

  'ender_dragon': createSvg(64, 64, `
    <polygon points="16,4 28,10 24,24 8,24 4,10" fill="#18181b" stroke="#09090b" stroke-width="1.5" />
    <!-- Glowing Purple Dragon Eyes -->
    <polygon points="9,14 13,13 12,17" fill="#c084fc" />
    <circle cx="11" cy="15" r="1" fill="#f5d0fe" />
    <polygon points="23,14 19,13 20,17" fill="#c084fc" />
    <circle cx="21" cy="15" r="1" fill="#f5d0fe" />
    <!-- Snout / Nostrils -->
    <rect x="13" y="19" width="6" height="3" fill="#27272a" />
    <circle cx="14.5" cy="20.5" r="0.8" fill="#52525b" />
    <circle cx="17.5" cy="20.5" r="0.8" fill="#52525b" />
  `),

  'redstone_torch': createSvg(64, 64, `
    <!-- Wood Stick -->
    <rect x="14" y="14" width="4" height="14" fill="#78350f" stroke="#451a03" stroke-width="1" />
    <!-- Redstone Head -->
    <rect x="13" y="6" width="6" height="8" fill="#ef4444" stroke="#991b1b" stroke-width="1" />
    <rect x="14" y="7" width="4" height="6" fill="#f87171" />
    <!-- Glow -->
    <circle cx="16" cy="10" r="2" fill="#ffffff" opacity="0.8" />
  `)
};

let count = 0;
for (const [name, content] of Object.entries(newIcons)) {
  const filePath = path.join(outDir, `${name}.svg`);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  count++;
}

console.log(`Added ${count} more pixel-perfect Minecraft SVGs in ${outDir}`);
