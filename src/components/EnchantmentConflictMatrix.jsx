import React, { useState, useMemo } from 'react';
import { INCOMPATIBILITY_RULES } from '../data/minecraftEnchantments';
import { 
  AlertTriangle, 
  Search, 
  XCircle, 
  ShieldAlert, 
  Sliders, 
  Table, 
  Grid, 
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import { playClick, playPop } from '../utils/soundFX';

export default function EnchantmentConflictMatrix() {
  const [filterQuery, setFilterQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewStyle, setViewStyle] = useState('table'); // 'table' | 'cards'

  const categories = ['All', 'Combat Weapons', 'Armor Defense', 'Mining & Tools', 'Bows & Crossbows', 'Trident & Water'];

  const filteredRules = useMemo(() => {
    const q = filterQuery.toLowerCase().trim();
    return INCOMPATIBILITY_RULES.filter(rule => {
      // Category matching
      if (selectedCategory !== 'All') {
        const catMap = {
          'Combat Weapons': ['Damage Enchantments', 'Mace Combat Specialization'],
          'Armor Defense': ['Armor Protection Types', 'Boots Water Movement'],
          'Mining & Tools': ['Mining Drop Mechanics'],
          'Bows & Crossbows': ['Bow Munitions', 'Crossbow Firing Mechanics'],
          'Trident & Water': ['Trident Propulsion & Combat', 'Boots Water Movement']
        };
        const allowed = catMap[selectedCategory] || [];
        if (!allowed.some(name => rule.name.includes(name))) {
          return false;
        }
      }

      if (!q) return true;
      const haystack = [
        rule.name,
        rule.reason,
        rule.items.join(' '),
        rule.appliesTo,
        ...(rule.maceConflict || [])
      ].join(' ').toLowerCase();

      return haystack.includes(q);
    });
  }, [filterQuery, selectedCategory]);

  return (
    <div className="bg-[#12131b]/95 border-2 border-[#2b2d3e] rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6">
      
      {/* HEADER & CONTROLS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#252738]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5 text-red-400" />
              VANILLA MUTUAL EXCLUSIONS
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-mono text-zinc-400">Java Edition 1.0 – 26.3+</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-pixel text-white mc-shadow">
            MUTUAL INCOMPATIBILITY MATRIX
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 mt-1 max-w-2xl leading-relaxed">
            Certain enchantments cannot coexist on the same item in survival gameplay without cheating or creative mode. 
            Anvils and Enchanting Tables strictly enforce these mutual exclusions.
          </p>
        </div>

        {/* View Switcher (Table vs Cards) */}
        <div className="flex items-center gap-1 bg-[#181926] p-1 rounded-xl border border-[#2b2d3d] self-start md:self-auto shrink-0">
          <button
            onClick={() => { playClick(); setViewStyle('table'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
              viewStyle === 'table' 
                ? 'bg-purple-900 text-white font-bold shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" />
            <span>Matrix Table</span>
          </button>
          <button
            onClick={() => { playClick(); setViewStyle('cards'); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-1.5 transition-all ${
              viewStyle === 'cards' 
                ? 'bg-purple-900 text-white font-bold shadow-sm' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>Visual Cards</span>
          </button>
        </div>
      </div>

      {/* FILTER & SEARCH ROW */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { playClick(); setSelectedCategory(cat); }}
              className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all border ${
                selectedCategory === cat
                  ? 'bg-red-950 text-red-200 border-red-500/60 font-bold shadow-sm'
                  : 'bg-[#161724] text-zinc-400 border-[#2a2c3d] hover:text-white hover:bg-[#1f2030]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search conflict (e.g. Fortune, Infinity, Mace)..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-2 bg-[#141520] border border-[#2b2c3e] focus:border-red-400 rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none font-mono"
          />
          {filterQuery && (
            <button
              onClick={() => setFilterQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-1"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>

      {/* VIEW 1: MATRIX TABLE (PRIMARY RECOMMENDATION) */}
      {viewStyle === 'table' ? (
        <div className="overflow-x-auto rounded-2xl border-2 border-[#2b2d3e] scrollbar-thin">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#151624] border-b-2 border-[#2b2d3e] text-zinc-300 font-mono">
                <th className="p-3.5 font-bold uppercase tracking-wider">Conflict Rule</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Mutually Exclusive Enchantments</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Affected Gear</th>
                <th className="p-3.5 font-bold uppercase tracking-wider">Mechanical Reason</th>
                <th className="p-3.5 font-bold uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e202e] bg-[#0e0f17]">
              {filteredRules.map((rule, idx) => (
                <tr key={idx} className="hover:bg-[#161726] transition-colors">
                  {/* Name */}
                  <td className="p-3.5 font-bold text-white whitespace-nowrap">
                    {rule.name}
                  </td>

                  {/* Conflicting Items */}
                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1.5">
                      {rule.items.map((it, i) => (
                        <span 
                          key={i} 
                          className="px-2 py-0.5 rounded-lg bg-purple-950/80 border border-purple-500/40 text-purple-200 font-mono text-[11px] font-semibold whitespace-nowrap"
                        >
                          {it}
                        </span>
                      ))}
                      {rule.maceConflict?.length > 0 && (
                        <span className="px-2 py-0.5 rounded-lg bg-amber-950/80 border border-amber-500/40 text-amber-300 font-mono text-[11px] font-semibold whitespace-nowrap">
                          ⚡ Mace: {rule.maceConflict.join(' vs ')}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Gear */}
                  <td className="p-3.5 font-mono text-zinc-400 whitespace-nowrap">
                    {rule.appliesTo}
                  </td>

                  {/* Reason */}
                  <td className="p-3.5 text-zinc-300 leading-relaxed max-w-md">
                    {rule.reason}
                  </td>

                  {/* Visual Status Indicator (Not color alone!) */}
                  <td className="p-3.5 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-lg bg-red-950/80 border border-red-500/40 text-red-300 text-[10px] font-mono font-bold">
                      <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                      <span>Incompatible</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* VIEW 2: VISUAL CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRules.map((rule, idx) => (
            <div key={idx} className="bg-[#151624] border-2 border-[#2b2d3e] rounded-2xl p-5 space-y-3 shadow-lg">
              <div className="flex items-center justify-between border-b border-[#242533] pb-2.5">
                <h4 className="font-bold text-white text-sm">{rule.name}</h4>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-950 border border-red-500/40 text-[10px] font-mono font-bold text-red-300">
                  <XCircle className="w-3 h-3 text-red-400" />
                  <span>Mutually Exclusive</span>
                </span>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {rule.items.map((it, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-lg bg-purple-900/40 border border-purple-500/30 text-purple-200 text-xs font-mono font-semibold">
                    {it}
                  </span>
                ))}
              </div>

              {rule.maceConflict?.length > 0 && (
                <div className="text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 p-2 rounded-xl">
                  ⚡ <strong>1.21 Mace Conflict:</strong> {rule.maceConflict.join(' vs ')}
                </div>
              )}

              <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                {rule.reason}
              </p>

              <div className="pt-2 border-t border-[#242533] text-[10px] font-mono text-zinc-500">
                Applies to: {rule.appliesTo}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ACCESSIBILITY & DESIGN NOTE */}
      <div className="p-3.5 rounded-xl bg-[#0e0f17] border border-[#2b2d3d] flex items-center justify-between text-[11px] font-mono text-zinc-400">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Notice: Incompatibilities are strictly enforced in Survival mode by Anvils and Enchanting Tables.</span>
        </div>
        <span className="text-emerald-400 font-semibold hidden sm:inline">Engine Verified</span>
      </div>

    </div>
  );
}
