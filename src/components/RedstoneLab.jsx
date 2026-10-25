import React, { useState } from 'react';
import { Cpu, Zap, Power, Repeat, ArrowRight, Lightbulb } from 'lucide-react';
import { playClick } from '../utils/soundFX';

export default function RedstoneLab() {
  const [leverState, setLeverState] = useState(true);
  const [repeaterDelay, setRepeaterDelay] = useState(1); // 1 to 4 ticks

  const handleLeverToggle = () => {
    playClick();
    setLeverState(!leverState);
  };

  const handleRepeaterClick = () => {
    playClick();
    setRepeaterDelay(prev => (prev % 4) + 1);
  };

  return (
    <section id="redstone" className="py-20 bg-[#0d0e14] border-t-4 border-[#252535]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#20202e] border border-[#3b3b4f] text-[11px] font-silkscreen text-[#ff2a2a]">
            <Cpu className="w-3.5 h-3.5" />
            <span>JAVA EDITION LOGIC & AUTOMATION</span>
          </div>
          <h2 className="font-pixel text-2xl sm:text-3xl md:text-4xl text-white mc-shadow">
            REDSTONE ENGINEERING
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            Understand the deterministic circuitry that powers technical Minecraft: quasi-connectivity, signal propagation, and the autonomous Crafter.
          </p>
        </div>

        {/* Interactive Redstone Circuit Demo */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="mc-panel p-6 sm:p-8 rounded-xl bg-[#171822] border-4 border-[#333446]">
            
            <div className="flex items-center justify-between border-b border-[#292a3b] pb-3 mb-6">
              <span className="font-silkscreen text-xs text-zinc-300">INTERACTIVE CIRCUIT BENCH</span>
              <span className="text-[10px] font-mono text-zinc-400">20 GAME TICKS / SEC</span>
            </div>

            {/* Circuit Line */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-[#0f1016] rounded-lg border-2 border-[#242533]">
              
              {/* Power Source: Lever */}
              <div className="flex flex-col items-center space-y-2">
                <button
                  onClick={handleLeverToggle}
                  className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center ${
                    leverState 
                      ? 'bg-red-950 border-red-500 text-red-400 shadow-[0_0_15px_rgba(255,42,42,0.4)]' 
                      : 'bg-[#1b1c26] border-[#323344] text-zinc-600'
                  }`}
                >
                  <Power className="w-8 h-8" />
                  <span className="text-[10px] font-silkscreen mt-1 font-bold">
                    {leverState ? 'LEVER: ON' : 'LEVER: OFF'}
                  </span>
                </button>
                <span className="text-[10px] font-mono text-zinc-500">Signal: {leverState ? '15' : '0'}</span>
              </div>

              {/* Wire Section 1 */}
              <div className="flex-1 flex items-center justify-center w-full sm:w-auto">
                <div className={`h-2.5 w-full rounded transition-all duration-300 ${
                  leverState 
                    ? 'bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.8)]' 
                    : 'bg-[#2b1616]'
                }`}></div>
              </div>

              {/* Repeater Component */}
              <div 
                onClick={handleRepeaterClick}
                className="flex flex-col items-center space-y-2 cursor-pointer group"
                title="Click to adjust repeater delay ticks"
              >
                <div className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center ${
                  leverState 
                    ? 'bg-[#201d24] border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.3)]' 
                    : 'bg-[#181822] border-[#313243]'
                }`}>
                  <Repeat className={`w-6 h-6 ${leverState ? 'text-red-400' : 'text-zinc-600'}`} />
                  <span className="text-[10px] font-silkscreen text-white mt-1">
                    {repeaterDelay} TICK{repeaterDelay > 1 ? 'S' : ''}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500 group-hover:text-red-400">
                  Delay: {repeaterDelay * 2} gt
                </span>
              </div>

              {/* Wire Section 2 */}
              <div className="flex-1 flex items-center justify-center w-full sm:w-auto">
                <div className={`h-2.5 w-full rounded transition-all duration-300 ${
                  leverState 
                    ? 'bg-red-600 shadow-[0_0_12px_rgba(239,68,68,0.8)]' 
                    : 'bg-[#2b1616]'
                }`}></div>
              </div>

              {/* Output: Redstone Lamp */}
              <div className="flex flex-col items-center space-y-2">
                <div className={`p-4 rounded-lg border-2 transition-all duration-300 flex flex-col items-center ${
                  leverState 
                    ? 'bg-amber-400 border-amber-300 text-stone-900 shadow-[0_0_30px_rgba(251,191,36,0.8)]' 
                    : 'bg-[#1a1b24] border-[#313243] text-zinc-600'
                }`}>
                  <Lightbulb className="w-8 h-8" />
                  <span className="text-[10px] font-silkscreen mt-1 font-bold">
                    {leverState ? 'LAMP: LIT' : 'LAMP: OFF'}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-500">Output Node</span>
              </div>

            </div>

            <p className="text-center text-xs font-mono text-zinc-400 mt-4">
              Click the <strong className="text-red-400">Lever</strong> to toggle power, or click the <strong className="text-amber-400">Repeater</strong> to cycle 1 to 4 delay ticks.
            </p>

          </div>
        </div>

        {/* 4 Technical Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Card 1: Quasi-Connectivity */}
          <div className="mc-panel p-6 rounded-lg bg-[#151620] border-2 border-[#2c2d3e]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🔀</span>
              <h3 className="font-silkscreen text-sm text-white font-bold">QUASI-CONNECTIVITY (JAVA ONLY)</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              A foundational quirk of Java Edition's codebase where Pistons, Droppers, and Dispensers can receive power from the block <strong>diagonally above them</strong> (as if they were two-block-tall doors). They require a block update (BUD) to actuate, enabling ultra-compact flying machines and piston doors impossible in Bedrock.
            </p>
            <div className="p-2.5 bg-[#0f1017] rounded border border-white/5 text-[11px] font-mono text-emerald-400">
              ✓ Enables 3×3 and 5×5 flush seamless piston doors
            </div>
          </div>

          {/* Card 2: The Crafter Automation */}
          <div className="mc-panel p-6 rounded-lg bg-[#151620] border-2 border-[#2c2d3e]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">⚙️</span>
              <h3 className="font-silkscreen text-sm text-white font-bold">THE CRAFTER (1.21 AUTOMATION)</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              The landmark Crafter block has 9 toggleable internal slots. Hoppers feed ingredients in sequence; when powered by a redstone pulse, it validates the recipe and shoots the crafted product out. Comparators read how many slots are full (output 0–9).
            </p>
            <div className="p-2.5 bg-[#0f1017] rounded border border-white/5 text-[11px] font-mono text-emerald-400">
              ✓ Enables 100% autonomous iron block and rocket factories
            </div>
          </div>

          {/* Card 3: Signal Decay (0-15) */}
          <div className="mc-panel p-6 rounded-lg bg-[#151620] border-2 border-[#2c2d3e]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">📏</span>
              <h3 className="font-silkscreen text-sm text-white font-bold">SIGNAL DECAY & COMPARATORS</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              Redstone dust carries power up to 15 blocks, dropping 1 level per block. Repeaters boost it back to 15. Comparators measure inventory fullness (Chests, Barrels, Hoppers) or compare signal strengths in subtraction mode (<code className="text-red-400">A - B = Output</code>).
            </p>
            <div className="p-2.5 bg-[#0f1017] rounded border border-white/5 text-[11px] font-mono text-emerald-400">
              ✓ The bedrock of automatic item sorting sorters
            </div>
          </div>

          {/* Card 4: Fundamental Logic Gates */}
          <div className="mc-panel p-6 rounded-lg bg-[#151620] border-2 border-[#2c2d3e]">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🧠</span>
              <h3 className="font-silkscreen text-sm text-white font-bold">FUNDAMENTAL LOGIC GATES</h3>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed mb-3">
              By combining Redstone Torches (NOT gates), Repeaters, and Dust, players construct digital logic in survival: <strong>AND Gates</strong> for combination locks, <strong>RS NOR Latches</strong> for persistent memory, and <strong>T Flip-Flops</strong> to turn buttons into toggle light switches.
            </p>
            <div className="p-2.5 bg-[#0f1017] rounded border border-white/5 text-[11px] font-mono text-emerald-400">
              ✓ Minecraft is fully Turing-complete
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
