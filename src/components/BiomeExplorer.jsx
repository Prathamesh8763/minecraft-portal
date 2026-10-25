import React, { useState } from 'react';
import { BIOMES_DATA } from '../data/minecraftData';
import { Compass, Thermometer, MapPin, CheckCircle, Eye } from 'lucide-react';
import { playClick, playPortalChime } from '../utils/soundFX';

export default function BiomeExplorer() {
  const [selectedDimension, setSelectedDimension] = useState('All');

  const dimensions = ['All', 'Overworld', 'The Nether', 'The End'];

  const filteredBiomes = selectedDimension === 'All'
    ? BIOMES_DATA
    : BIOMES_DATA.filter(b => b.dimension === selectedDimension);

  const handleDimensionChange = (dim) => {
    if (dim === 'The Nether' || dim === 'The End') {
      playPortalChime();
    } else {
      playClick();
    }
    setSelectedDimension(dim);
  };

  return (
    <section id="biomes" className="py-20 bg-[#0e0f16] border-t-4 border-[#252535]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#20202e] border border-[#3b3b4f] text-[11px] font-silkscreen text-emerald-400">
            <Compass className="w-3.5 h-3.5" />
            <span>EXPEDITIONS & CARTOGRAPHY</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            DIMENSIONS & BIOMES
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Traverse over 70 unique environments spanning the Overworld, Nether, and Java-exclusive End sub-biomes, featuring the Pale Garden, Cherry Groves, Deep Dark, and Mangrove Swamps.
          </p>
        </div>

        {/* Dimension Switcher */}
        <div className="flex items-center justify-center gap-3 mb-12">
          {dimensions.map((dim) => {
            const isSelected = selectedDimension === dim;
            return (
              <button
                key={dim}
                onClick={() => handleDimensionChange(dim)}
                className={`px-4 py-2 rounded text-xs font-silkscreen transition-all border-2 flex items-center gap-2 ${
                  isSelected
                    ? dim === 'The Nether' 
                      ? 'bg-red-900/90 text-white border-red-500 shadow-lg' 
                      : dim === 'The End'
                      ? 'bg-purple-900/90 text-white border-purple-400 shadow-lg'
                      : 'bg-[#5c8e32] text-white border-[#89c44e] shadow-lg'
                    : 'bg-[#181822] text-zinc-400 border-[#2d2d3e] hover:bg-[#20202c] hover:text-white'
                }`}
              >
                <span>{dim}</span>
              </button>
            );
          })}
        </div>

        {/* Biomes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBiomes.map((biome) => (
            <div
              key={biome.id}
              onClick={() => playClick()}
              className="mc-panel p-6 rounded-xl bg-[#171822] hover:bg-[#1b1c28] border-2 border-[#2b2b3d] hover:border-[#4aedd9]/50 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl p-2.5 rounded-lg bg-black/40 border border-white/5 group-hover:scale-110 transition-transform">
                      {biome.icon}
                    </span>
                    <div>
                      <h3 className="font-silkscreen text-sm font-bold text-white group-hover:text-[#4aedd9] transition-colors">
                        {biome.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-zinc-800 text-zinc-300">
                          {biome.dimension}
                        </span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
                          {biome.tag}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4">
                  {biome.description}
                </p>

                {/* Features List */}
                <div className="space-y-1.5 mb-4">
                  <span className="text-[10px] font-silkscreen text-zinc-400 block tracking-wider">NATURAL FEATURES:</span>
                  {biome.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle className="w-3 h-3 text-[#4aedd9] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Meta */}
              <div className="pt-3 border-t border-[#252538] flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <span className="flex items-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-amber-400" />
                  <span>{biome.temp}</span>
                </span>
                <span className="text-emerald-400 group-hover:underline flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Biome</span>
                </span>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
