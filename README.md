# 🟩 Minecraft Java Edition Encyclopedia & Interactive Portal

An authoritative, canonical knowledge base and interactive web portal for **Minecraft Java Edition**. Grounded in official Mojang Studios release notes (1.0 to 1.21.3 *Bundles of Bravery*) and active snapshot testing (`24w40a+ Pale Garden & The Creaking`).

---

## 🌟 Key Features

- **🧭 5 Logical Categories:**
  1. **Learn Minecraft:** Getting started, progression, game modes (Survival, Creative, Hardcore, Adventure, Spectator), and survival hunger/food dynamics.
  2. **Explore the World:** Dimensions (Overworld, Nether 8:1 travel, End), 70+ biomes, mobs bestiary, Trial Chambers & structures, and environmental lore.
  3. **Build & Engineer:** Quasi-connectivity redstone logic, 1.21 Crafter automation, 42 enchantments codex, 16 potion recipes, and modern 1.20.5+ Data Components syntax.
  4. **Customize & Play:** Mod loaders (Fabric, NeoForge), Sodium/Iris performance stacks, pack.mcmeta resource packs, dedicated 25565 servers, and Any% speedrun records.
  5. **Versions & News:** Chronological 1.0 to 1.21.3 roadmap, Game Drops release cadence, and creator community history.

- **⚡ Interactive Lab Modules:**
  - **3×3 Crafting Workbench:** Canonical recipes + 1.21 Crafter automation.
  - **Alchemical Potion Stand:** Interactive 3-bottle brewing simulator with positive, negative, and ominous concoctions.
  - **Enchantment Laboratory:** 42 enchantments index, 17 God Equipment loadouts, and the Anvil Binary Merge Tree calculator.
  - **Creature Bestiary & Spawning Spheres:** Radial 24/32/128 block spawning mechanics, hostile mob cap (70), and boss fight strategies.
  - **1,750+ Asset SVG Vault:** High-resolution pixelated SVG renderings of vanilla Minecraft items.
  - **Redstone Logic Lab:** Component rules, quasi-connectivity, comparator formulas, and truth tables.

- **🔍 Search & Readability:**
  - Instant universal search across titles, aliases, and descriptions (*Mending*, *Warden*, *Iron Farm*, *Nether Portal*, */execute*, *Redstone Comparator*).
  - Keyboard accessible navigation (`↑`, `↓`, `Enter`, `Escape`).
  - One-click copy buttons on all command blocks with visual confirmation.
  - Auto-generated Table of Contents for every article with smooth jump scrolling.
  - Standard vs Wide reading width toggle.

---

## 🚀 Local Development

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher recommended)
- `npm` or `pnpm`

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build optimized production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 🌐 Deploy & Host (Free Hosting Options)

### Option 1: GitHub Pages (Automatic via Included GitHub Action)
1. Push this repository to your GitHub account (branch `main`).
2. On GitHub, navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. The included `.github/workflows/deploy.yml` will automatically build and publish your site!

### Option 2: Vercel (Recommended - Instant 1-Click Deploy)
1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **Add New Project** and select this repository.
3. Vercel auto-detects Vite:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**. Your site will be live on a free `*.vercel.app` domain with automatic global CDN!

### Option 3: Netlify
1. Go to [Netlify](https://www.netlify.com/) and click **Import from Git**.
2. Select your repository.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Click **Deploy site**.

---

## 📜 Unofficial Disclaimer & Attribution

- **Unofficial Community Project:** This encyclopedia is an independent community reference and is not affiliated with, endorsed by, or associated with Mojang Studios or Microsoft. Minecraft is a registered trademark of Mojang Synergies AB.
- **Asset Attribution:** Game mechanics, formulas, tables, and item textures are referenced from the official [Minecraft Wiki](https://minecraft.wiki) under CC BY-NC-SA 3.0, verified against official Mojang Studios patch notes.
