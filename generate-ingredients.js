import fs from 'fs';
import path from 'path';

const outDir = path.resolve('minecraft-portal/public/icons/minecraft');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function createSvg(width, height, content, viewBox = '0 0 32 32') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" width="${width}" height="${height}" shape-rendering="crispEdges">
${content.trim()}
</svg>`;
}

const ingredientIcons = {
  'wood_planks': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#b45309" stroke="#d97706" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#78350f" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#451a03" />
    <!-- Plank horizontal lines -->
    <line x1="3" y1="13" x2="16" y2="19" stroke="#451a03" stroke-width="1" />
    <line x1="16" y1="19" x2="29" y2="13" stroke="#260f02" stroke-width="1" />
    <line x1="3" y1="18" x2="16" y2="24" stroke="#451a03" stroke-width="1" />
    <line x1="16" y1="24" x2="29" y2="18" stroke="#260f02" stroke-width="1" />
  `),

  'stick': createSvg(64, 64, `
    <rect x="7" y="23" width="2" height="2" fill="#78350f" />
    <rect x="9" y="21" width="2" height="2" fill="#92400e" />
    <rect x="11" y="19" width="2" height="2" fill="#78350f" />
    <rect x="13" y="17" width="2" height="2" fill="#92400e" />
    <rect x="15" y="15" width="2" height="2" fill="#78350f" />
    <rect x="17" y="13" width="2" height="2" fill="#92400e" />
    <rect x="19" y="11" width="2" height="2" fill="#78350f" />
    <rect x="21" y="9" width="2" height="2" fill="#92400e" />
    <rect x="23" y="7" width="2" height="2" fill="#78350f" />
  `),

  'cobblestone': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#64748b" stroke="#94a3b8" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#475569" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#334155" />
    <!-- Irregular stones -->
    <rect x="6" y="12" width="3" height="3" fill="#1e293b" />
    <rect x="11" y="16" width="3" height="4" fill="#334155" />
    <rect x="20" y="12" width="4" height="3" fill="#1e293b" />
    <rect x="23" y="18" width="3" height="3" fill="#475569" />
  `),

  'smooth_stone': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#94a3b8" stroke="#cbd5e1" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#64748b" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#475569" />
    <!-- Border bezel -->
    <polygon points="16,4 27,9 16,13 5,9" fill="#cbd5e1" opacity="0.4" />
  `),

  'coal': createSvg(64, 64, `
    <polygon points="16,5 24,10 26,19 19,27 10,24 6,15 11,8" fill="#18181b" stroke="#09090b" stroke-width="1.5" />
    <polygon points="16,7 22,11 23,17 18,22 11,20 8,14 12,9" fill="#27272a" />
    <polygon points="14,10 18,10 16,14" fill="#52525b" />
  `),

  'iron_nugget': createSvg(64, 64, `
    <polygon points="16,10 22,14 20,22 12,22 10,14" fill="#cbd5e1" stroke="#64748b" stroke-width="1" />
    <polygon points="16,12 19,15 15,19 13,15" fill="#f8fafc" />
  `),

  'gold_nugget': createSvg(64, 64, `
    <polygon points="16,10 22,14 20,22 12,22 10,14" fill="#eab308" stroke="#854d0e" stroke-width="1" />
    <polygon points="16,12 19,15 15,19 13,15" fill="#fef08a" />
  `),

  'string': createSvg(64, 64, `
    <path d="M 8 22 Q 13 18 16 16 T 24 10" fill="none" stroke="#f1f5f9" stroke-width="2" />
    <path d="M 10 24 Q 14 20 18 18 T 26 12" fill="none" stroke="#94a3b8" stroke-width="1.5" />
  `),

  'feather': createSvg(64, 64, `
    <path d="M 9 23 L 23 9 Q 25 11 23 15 L 13 25 Z" fill="#f8fafc" stroke="#94a3b8" stroke-width="1" />
    <line x1="8" y1="24" x2="24" y2="8" stroke="#cbd5e1" stroke-width="1.5" />
  `),

  'flint': createSvg(64, 64, `
    <polygon points="14,6 23,11 25,20 17,26 8,21 9,11" fill="#334155" stroke="#0f172a" stroke-width="1.5" />
    <polygon points="14,9 20,13 16,21 11,18" fill="#475569" />
  `),

  'arrow': createSvg(64, 64, `
    <!-- Shaft -->
    <line x1="8" y1="24" x2="23" y2="9" stroke="#b45309" stroke-width="2" />
    <!-- Flint Arrowhead -->
    <polygon points="21,11 26,6 21,6" fill="#334155" />
    <polygon points="21,11 26,6 26,11" fill="#475569" />
    <!-- Fletching Feathers -->
    <polygon points="8,24 6,21 10,21" fill="#f8fafc" />
    <polygon points="8,24 11,26 11,22" fill="#f8fafc" />
  `),

  'wheat': createSvg(64, 64, `
    <line x1="16" y1="26" x2="16" y2="8" stroke="#ca8a04" stroke-width="2" />
    <!-- Grains -->
    <ellipse cx="14" cy="11" rx="3" ry="1.5" transform="rotate(-30 14 11)" fill="#eab308" />
    <ellipse cx="18" cy="13" rx="3" ry="1.5" transform="rotate(30 18 13)" fill="#facc15" />
    <ellipse cx="14" cy="17" rx="3" ry="1.5" transform="rotate(-30 14 17)" fill="#eab308" />
    <ellipse cx="18" cy="19" rx="3" ry="1.5" transform="rotate(30 18 19)" fill="#facc15" />
    <ellipse cx="16" cy="8" rx="2" ry="3" fill="#fde047" />
  `),

  'hay_bale': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#eab308" stroke="#ca8a04" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#ca8a04" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#a16207" />
    <!-- Red cord bands -->
    <line x1="3" y1="13" x2="16" y2="19" stroke="#dc2626" stroke-width="1.5" />
    <line x1="16" y1="19" x2="29" y2="13" stroke="#b91c1c" stroke-width="1.5" />
    <line x1="3" y1="19" x2="16" y2="25" stroke="#dc2626" stroke-width="1.5" />
    <line x1="16" y1="25" x2="29" y2="19" stroke="#b91c1c" stroke-width="1.5" />
  `),

  'apple': createSvg(64, 64, `
    <circle cx="13" cy="17" r="7" fill="#ef4444" />
    <circle cx="19" cy="17" r="7" fill="#dc2626" />
    <circle cx="16" cy="15" r="7" fill="#b91c1c" />
    <circle cx="12" cy="14" r="2" fill="#fca5a5" />
    <rect x="15" y="6" width="2" height="4" fill="#78350f" />
    <rect x="17" y="5" width="2" height="2" fill="#15803d" />
  `),

  'paper': createSvg(64, 64, `
    <polygon points="8,6 24,6 22,26 6,26" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
    <line x1="10" y1="11" x2="20" y2="11" stroke="#94a3b8" stroke-width="1" />
    <line x1="10" y1="16" x2="19" y2="16" stroke="#94a3b8" stroke-width="1" />
    <line x1="9" y1="21" x2="18" y2="21" stroke="#94a3b8" stroke-width="1" />
  `),

  'book': createSvg(64, 64, `
    <polygon points="8,7 24,7 24,25 8,25" fill="#78350f" stroke="#451a03" stroke-width="1.5" />
    <!-- White Pages -->
    <rect x="10" y="9" width="12" height="14" fill="#f8fafc" />
    <!-- Spine bookmark -->
    <rect x="7" y="6" width="3" height="20" fill="#991b1b" />
    <rect x="14" y="6" width="2" height="6" fill="#dc2626" />
  `),

  'slimeball': createSvg(64, 64, `
    <circle cx="16" cy="16" r="9" fill="#22c55e" stroke="#15803d" stroke-width="1.5" />
    <circle cx="16" cy="16" r="6" fill="#4ade80" />
    <circle cx="14" cy="14" r="2.5" fill="#86efac" />
    <circle cx="13" cy="13" r="1" fill="#ffffff" />
  `),

  'nether_quartz': createSvg(64, 64, `
    <polygon points="16,5 24,12 21,25 11,25 8,12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />
    <polygon points="16,8 20,13 18,22 13,22 11,13" fill="#ffffff" />
    <line x1="16" y1="5" x2="16" y2="25" stroke="#e2e8f0" stroke-width="1" />
  `),

  'piston': createSvg(64, 64, `
    <!-- Wood Head -->
    <polygon points="16,2 29,8 16,14 3,8" fill="#b45309" stroke="#d97706" stroke-width="1" />
    <polygon points="3,8 16,14 16,17 3,11" fill="#78350f" />
    <polygon points="16,14 29,8 29,11 16,17" fill="#451a03" />
    <!-- Cobblestone Body -->
    <polygon points="3,11 16,17 16,28 3,22" fill="#475569" />
    <polygon points="16,17 29,11 29,22 16,28" fill="#334155" />
  `),

  'sticky_piston': createSvg(64, 64, `
    <!-- Slime on top -->
    <polygon points="16,2 29,8 16,14 3,8" fill="#4ade80" stroke="#15803d" stroke-width="1.5" />
    <circle cx="16" cy="8" r="3" fill="#22c55e" />
    <polygon points="3,8 16,14 16,17 3,11" fill="#78350f" />
    <polygon points="16,14 29,8 29,11 16,17" fill="#451a03" />
    <!-- Cobblestone Body -->
    <polygon points="3,11 16,17 16,28 3,22" fill="#475569" />
    <polygon points="16,17 29,11 29,22 16,28" fill="#334155" />
  `),

  'repeater': createSvg(64, 64, `
    <!-- Smooth stone slab -->
    <polygon points="16,8 28,13 16,18 4,13" fill="#94a3b8" />
    <polygon points="4,13 16,18 16,24 4,19" fill="#64748b" />
    <polygon points="16,18 28,13 28,19 16,24" fill="#475569" />
    <!-- 2 Small Redstone Torches -->
    <rect x="11" y="9" width="2" height="6" fill="#78350f" />
    <rect x="11" y="7" width="2" height="3" fill="#ef4444" />
    <rect x="19" y="9" width="2" height="6" fill="#78350f" />
    <rect x="19" y="7" width="2" height="3" fill="#ef4444" />
  `),

  'comparator': createSvg(64, 64, `
    <!-- Smooth stone slab -->
    <polygon points="16,8 28,13 16,18 4,13" fill="#94a3b8" />
    <polygon points="4,13 16,18 16,24 4,19" fill="#64748b" />
    <polygon points="16,18 28,13 28,19 16,24" fill="#475569" />
    <!-- 3 Torches in Triangle -->
    <rect x="15" y="7" width="2" height="5" fill="#ef4444" />
    <rect x="10" y="11" width="2" height="5" fill="#ef4444" />
    <rect x="20" y="11" width="2" height="5" fill="#ef4444" />
  `),

  'hopper': createSvg(64, 64, `
    <!-- Funnel Top -->
    <polygon points="6,6 26,6 22,18 10,18" fill="#475569" stroke="#1e293b" stroke-width="1.5" />
    <polygon points="8,8 24,8 20,16 12,16" fill="#64748b" />
    <!-- Spout Bottom -->
    <rect x="13" y="18" width="6" height="8" fill="#334155" />
    <rect x="14" y="24" width="4" height="4" fill="#1e293b" />
  `),

  'dispenser': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#64748b" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#475569" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#334155" />
    <!-- Circular Dispenser Mouth -->
    <circle cx="10" cy="20" r="3" fill="#0f172a" />
  `),

  'dropper': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#64748b" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#475569" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#334155" />
    <!-- Triangular Dropper Mouth (Smile) -->
    <polygon points="7,19 13,19 10,23" fill="#0f172a" />
  `),

  'redstone_lamp': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#78350f" stroke="#451a03" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#78350f" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#451a03" />
    <!-- Glow Panels -->
    <rect x="6" y="11" width="7" height="12" fill="#d97706" />
    <rect x="19" y="11" width="7" height="12" fill="#b45309" />
  `),

  'torch': createSvg(64, 64, `
    <!-- Wood Stick -->
    <rect x="14" y="12" width="4" height="16" fill="#78350f" stroke="#451a03" stroke-width="1" />
    <!-- Coal head with flame -->
    <rect x="13" y="8" width="6" height="5" fill="#18181b" />
    <polygon points="16,3 19,8 13,8" fill="#f59e0b" />
    <polygon points="16,4 18,8 14,8" fill="#fef08a" />
  `),

  'lantern': createSvg(64, 64, `
    <!-- Iron Frame & Loop -->
    <rect x="14" y="3" width="4" height="3" fill="none" stroke="#475569" stroke-width="1.5" rx="1" />
    <rect x="10" y="6" width="12" height="3" fill="#334155" />
    <rect x="10" y="23" width="12" height="3" fill="#334155" />
    <!-- Glass with Torch Inside -->
    <rect x="11" y="9" width="10" height="14" fill="#fef08a" opacity="0.9" stroke="#475569" stroke-width="1.5" />
    <rect x="15" y="14" width="2" height="6" fill="#78350f" />
    <circle cx="16" cy="13" r="2.5" fill="#f59e0b" />
  `),

  'iron_block': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#cbd5e1" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#94a3b8" />
  `),

  'anvil': createSvg(64, 64, `
    <!-- Top Face -->
    <rect x="6" y="8" width="20" height="5" fill="#475569" stroke="#1e293b" stroke-width="1" rx="1" />
    <!-- Column -->
    <rect x="12" y="13" width="8" height="7" fill="#334155" />
    <!-- Base -->
    <rect x="8" y="20" width="16" height="6" fill="#1e293b" />
  `),

  'minecart': createSvg(64, 64, `
    <!-- Iron Tub -->
    <polygon points="4,11 28,11 24,23 8,23" fill="#94a3b8" stroke="#475569" stroke-width="1.5" />
    <polygon points="6,13 26,13 22,21 10,21" fill="#cbd5e1" />
    <!-- Wheels -->
    <circle cx="10" cy="24" r="2" fill="#1e293b" />
    <circle cx="22" cy="24" r="2" fill="#1e293b" />
  `),

  'rail': createSvg(64, 64, `
    <!-- Metal Tracks (2 vertical rails) -->
    <rect x="8" y="4" width="2" height="24" fill="#94a3b8" />
    <rect x="22" y="4" width="2" height="24" fill="#94a3b8" />
    <!-- Wooden Sleepers (Ties) -->
    <rect x="10" y="8" width="12" height="3" fill="#78350f" />
    <rect x="10" y="16" width="12" height="3" fill="#78350f" />
    <rect x="10" y="24" width="12" height="3" fill="#78350f" />
  `),

  'glass': createSvg(64, 64, `
    <polygon points="16,2 29,8 16,14 3,8" fill="#bae6fd" opacity="0.5" stroke="#e0f2fe" stroke-width="1" />
    <polygon points="3,8 16,14 16,28 3,22" fill="#7dd3fc" opacity="0.4" stroke="#e0f2fe" stroke-width="1" />
    <polygon points="16,14 29,8 29,22 16,28" fill="#38bdf8" opacity="0.4" stroke="#e0f2fe" stroke-width="1" />
    <!-- Glass streak reflection -->
    <line x1="8" y1="12" x2="11" y2="18" stroke="#ffffff" stroke-width="1.5" />
    <line x1="20" y1="14" x2="23" y2="20" stroke="#ffffff" stroke-width="1.5" />
  `)
};

let count = 0;
for (const [name, content] of Object.entries(ingredientIcons)) {
  const filePath = path.join(outDir, `${name}.svg`);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  count++;
}

console.log(`Generated ${count} additional crafting ingredient SVGs in ${outDir}`);
