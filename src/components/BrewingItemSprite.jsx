import React, { useState } from 'react';
import { BREWING_ASSET_REGISTRY, POTION_COLORS } from '../data/brewingAssets';
import PotionSprite from './PotionSprite';

/**
 * Standardized Brewing Item Sprite
 * Enforces consistent visual bounding boxes, pixelated rendering, and dual SVG/PNG fallbacks.
 */
export default function BrewingItemSprite({
  itemId,
  name,
  size = 36,
  isPotion = false,
  potionType = 'bottle',
  potionColor,
  className = ''
}) {
  const [hasSvgError, setHasSvgError] = useState(false);
  const [hasPngError, setHasPngError] = useState(false);

  // If this item is explicitly a potion bottle or known potion
  if (isPotion || itemId?.includes('potion') || itemId === 'water_bottle') {
    const resolvedColor = potionColor || POTION_COLORS[itemId] || '#38bdf8';
    return (
      <div 
        style={{ width: `${size}px`, height: `${size}px` }} 
        className={`flex items-center justify-center shrink-0 ${className}`}
      >
        <PotionSprite
          type={potionType}
          color={resolvedColor}
          size={size}
          alt={name || itemId}
        />
      </div>
    );
  }

  // Look up item in the brewing asset registry
  const regItem = 
    BREWING_ASSET_REGISTRY.baseIngredients[itemId] ||
    BREWING_ASSET_REGISTRY.effectIngredients[itemId] ||
    BREWING_ASSET_REGISTRY.equipment[itemId];

  const primarySrc = regItem?.sprite || `/icons/minecraft/${itemId}.svg`;
  const fallbackSrc = regItem?.fallbackSprite || `/icons/minecraft/${itemId}.png`;
  const displayName = name || regItem?.name || itemId;

  // Ultimate fallback if both SVG and PNG fail to load
  if (hasSvgError && hasPngError) {
    return (
      <div 
        style={{ width: `${size}px`, height: `${size}px` }}
        className={`flex items-center justify-center bg-zinc-800 rounded border border-zinc-700 font-mono text-[9px] text-emerald-400 font-bold shrink-0 select-none ${className}`}
        title={displayName}
      >
        {displayName.slice(0, 2).toUpperCase()}
      </div>
    );
  }

  return (
    <div 
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`flex items-center justify-center shrink-0 ${className}`}
    >
      <img
        src={hasSvgError ? fallbackSrc : primarySrc}
        alt={displayName}
        title={displayName}
        className="w-full h-full object-contain filter drop-shadow select-none transition-transform"
        style={{ imageRendering: 'pixelated' }}
        onError={() => {
          if (!hasSvgError) {
            setHasSvgError(true);
          } else {
            setHasPngError(true);
          }
        }}
        loading="lazy"
      />
    </div>
  );
}
