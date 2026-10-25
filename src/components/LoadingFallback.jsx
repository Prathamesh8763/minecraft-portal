import React from 'react';

/**
 * Pixel-styled Minecraft Chunk Loading Fallback
 * Provides smooth, zero-layout-shift visual feedback while lazily loaded modules load.
 */
export default function LoadingFallback({ message = 'GENERATING CHUNK TERRAIN...' }) {
  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center p-8 space-y-4 animate-fadeIn">
      {/* Animated Grass Block Spinner */}
      <div className="w-14 h-14 relative animate-bounce">
        <img 
          src="/icons/minecraft/grass_block.svg" 
          alt="Loading Chunk"
          onError={(e) => { e.currentTarget.src = '/icons/minecraft/grass_block.png'; }}
          className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(92,142,50,0.4)]"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>

      {/* Loading Status Text */}
      <div className="text-center space-y-1.5">
        <div className="flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-silkscreen text-xs sm:text-sm text-emerald-400 tracking-wider">
            {message}
          </span>
        </div>
        <p className="font-mono text-[11px] text-zinc-500">
          Streaming modular interactive laboratory assets
        </p>
      </div>

      {/* Retro Pixel Progress Bar */}
      <div className="w-48 h-2.5 bg-[#141520] border border-[#2b2d42] rounded-full overflow-hidden p-0.5">
        <div className="h-full bg-gradient-to-r from-[#5c8e32] via-[#4aedd9] to-[#5c8e32] rounded-full animate-pulse w-3/4"></div>
      </div>
    </div>
  );
}
