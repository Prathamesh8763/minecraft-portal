import React from 'react';
import { ArrowUp, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { playLevelUp, playClick } from '../utils/soundFX';
import { GAME_VERSION_CONFIG } from '../data/versionConfig';

export default function Footer() {
  const scrollToTop = () => {
    playLevelUp();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#090a0f] border-t-4 border-[#1f202c] text-zinc-400 py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The End Poem Excerpt Quote */}
        <div className="max-w-3xl mx-auto text-center mb-12 p-6 rounded-xl bg-[#11121a] border-2 border-[#222332] relative overflow-hidden">
          <div className="text-[#c084fc] text-xl mb-2">✦ ✦ ✦</div>
          <p className="font-serif italic text-zinc-300 text-sm sm:text-base leading-relaxed">
            "And the universe said I love you because you are love. And the game was over and the player woke up from the dream. And the player began a new dream. And the player dreamed again, dreamed better. And the player was the universe. And the player was love."
          </p>
          <span className="text-[10px] font-silkscreen text-[#4aedd9] block mt-3 tracking-wider">
            — THE END POEM, JULIAN GOUGH
          </span>
        </div>

        {/* Footer Navigation & Brand */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-[#1a1b26]">
          
          {/* Logo & Copyright */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-8 h-8 rounded bg-[#5c8e32] border-2 border-[#75af3e] flex items-center justify-center font-pixel text-white text-xs">
              ⛏️
            </div>
            <div>
              <span className="font-pixel text-xs text-white tracking-wider flex items-center gap-2">
                <span>MINECRAFT JAVA ENCYCLOPEDIA</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                  Java Edition Exclusives
                </span>
              </span>
              <p className="text-[11px] text-zinc-400 font-mono mt-0.5">
                Verified against official <a href={GAME_VERSION_CONFIG.currentStable.changelogUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">{GAME_VERSION_CONFIG.currentStable.version} {GAME_VERSION_CONFIG.currentStable.name}</a> &amp; <a href={GAME_VERSION_CONFIG.activeSnapshot.changelogUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">{GAME_VERSION_CONFIG.activeSnapshot.fullSnapshotId}</a> changelogs.
              </p>
            </div>
          </div>

          {/* Jump to Top & Feedback */}
          <div className="flex items-center gap-3">
            <a
              href="#feedback"
              className="px-3.5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-xs text-zinc-300 hover:text-white border border-zinc-700 font-mono transition-all"
            >
              Suggest Edit / Feedback
            </a>
            <button
              onClick={scrollToTop}
              className="mc-btn mc-btn-green text-xs py-2 px-4 flex items-center gap-2"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>RETURN TO TOP</span>
            </button>
          </div>

        </div>

        {/* Legal Disclaimer & Asset Attribution */}
        <div className="mt-8 pt-6 border-t border-[#1a1b26] text-center space-y-2 text-[10px] font-mono text-zinc-500">
          <p>
            <strong>Unofficial Community Project:</strong> This encyclopedia is an independent reference and is not affiliated with, endorsed by, or associated with Mojang Studios or Microsoft. Minecraft is a registered trademark of Mojang Synergies AB.
          </p>
          <p>
            <strong>Asset &amp; Content Attribution:</strong> Game mechanics, formulas, tables, and item icons are referenced from the official Minecraft Wiki under CC BY-NC-SA 3.0, verified against official Mojang Studios patch notes and release announcements.
          </p>
        </div>

      </div>
    </footer>
  );
}
