import React from 'react';

/**
 * Pixel-Perfect Minecraft Potion Bottle Vector Sprite
 * Renders authentic drinkable, splash, and lingering bottles with dynamic liquid colors.
 * Zero HTTP 404 risks, zero blur, scalable to any resolution with shape-rendering="crispEdges".
 */
export default function PotionSprite({
  type = 'bottle', // 'bottle' | 'splash' | 'lingering'
  color = '#38bdf8',
  size = 36,
  alt = 'Minecraft Potion Bottle',
  className = ''
}) {
  // 1. DRINKABLE REGULAR POTION BOTTLE
  if (type === 'bottle') {
    return (
      <svg
        viewBox="0 0 16 16"
        width={size}
        height={size}
        className={`inline-block shrink-0 ${className}`}
        shapeRendering="crispEdges"
        role="img"
        aria-label={alt}
      >
        {/* Cork Stopper */}
        <rect x="7" y="1" width="2" height="1" fill="#6d3916" />
        <rect x="6" y="2" width="4" height="1" fill="#8d491f" />
        <rect x="7" y="2" width="2" height="1" fill="#a45828" />

        {/* Glass Bottle Neck */}
        <rect x="7" y="3" width="2" height="3" fill="#99b6be" />
        <rect x="6" y="3" width="1" height="3" fill="#44555e" />
        <rect x="9" y="3" width="1" height="3" fill="#323e44" />

        {/* Bottle Body Outer Glass Shadow */}
        <rect x="4" y="6" width="8" height="1" fill="#44555e" />
        <rect x="3" y="7" width="10" height="7" fill="#44555e" />
        <rect x="4" y="14" width="8" height="1" fill="#20272b" />

        {/* Liquid Fill (Dynamic Hex Color) */}
        <rect x="4" y="7" width="8" height="7" fill={color} />
        {/* Liquid Shading Depth (Darker bottom shadow) */}
        <rect x="4" y="13" width="8" height="1" fill="#000000" opacity="0.25" />
        <rect x="11" y="7" width="1" height="6" fill="#000000" opacity="0.2" />

        {/* Glass Edge Highlights */}
        <rect x="4" y="7" width="1" height="6" fill="#ffffff" opacity="0.4" />
        <rect x="5" y="7" width="2" height="1" fill="#ffffff" opacity="0.6" />
        <rect x="5" y="8" width="1" height="2" fill="#ffffff" opacity="0.5" />
        <rect x="5" y="11" width="1" height="1" fill="#ffffff" opacity="0.3" />

        {/* Glass Specular Glint */}
        <rect x="6" y="8" width="1" height="1" fill="#ffffff" opacity="0.8" />
      </svg>
    );
  }

  // 2. SPLASH POTION BOTTLE (Curved Alchemical Neck)
  if (type === 'splash') {
    return (
      <svg
        viewBox="0 0 16 16"
        width={size}
        height={size}
        className={`inline-block shrink-0 ${className}`}
        shapeRendering="crispEdges"
        role="img"
        aria-label={alt}
      >
        {/* Curved Cork Top */}
        <rect x="4" y="1" width="3" height="2" fill="#8d491f" />
        <rect x="4" y="1" width="1" height="1" fill="#6d3916" />

        {/* Diagonal Angled Neck */}
        <rect x="5" y="3" width="2" height="2" fill="#99b6be" />
        <rect x="6" y="4" width="2" height="2" fill="#7b9ba4" />
        <rect x="7" y="5" width="2" height="2" fill="#44555e" />

        {/* Splash Bottle Body Outer Frame */}
        <rect x="4" y="7" width="8" height="7" fill="#44555e" />
        <rect x="5" y="6" width="6" height="1" fill="#44555e" />
        <rect x="5" y="14" width="6" height="1" fill="#20272b" />

        {/* Liquid Fill */}
        <rect x="5" y="7" width="6" height="7" fill={color} />
        <rect x="5" y="13" width="6" height="1" fill="#000000" opacity="0.3" />

        {/* Glass Highlights */}
        <rect x="5" y="7" width="1" height="5" fill="#ffffff" opacity="0.5" />
        <rect x="6" y="7" width="1" height="1" fill="#ffffff" opacity="0.7" />
        <rect x="6" y="9" width="1" height="1" fill="#ffffff" opacity="0.4" />
      </svg>
    );
  }

  // 3. LINGERING POTION BOTTLE (Triangular Retort Flask)
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={`inline-block shrink-0 ${className}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label={alt}
    >
      {/* Retort Ring Rim */}
      <rect x="6" y="1" width="4" height="1" fill="#8d491f" />
      <rect x="7" y="2" width="2" height="3" fill="#99b6be" />
      <rect x="6" y="2" width="1" height="3" fill="#44555e" />
      <rect x="9" y="2" width="1" height="3" fill="#323e44" />

      {/* Triangular Flared Glass Frame */}
      <rect x="6" y="5" width="4" height="2" fill="#44555e" />
      <rect x="5" y="7" width="6" height="2" fill="#44555e" />
      <rect x="4" y="9" width="8" height="2" fill="#44555e" />
      <rect x="3" y="11" width="10" height="3" fill="#44555e" />
      <rect x="4" y="14" width="8" height="1" fill="#20272b" />

      {/* Triangular Liquid Fill */}
      <rect x="7" y="5" width="2" height="2" fill={color} />
      <rect x="6" y="7" width="4" height="2" fill={color} />
      <rect x="5" y="9" width="6" height="2" fill={color} />
      <rect x="4" y="11" width="8" height="3" fill={color} />

      {/* Cloud Shimmer Particles */}
      <rect x="6" y="11" width="1" height="1" fill="#ffffff" opacity="0.6" />
      <rect x="9" y="12" width="1" height="1" fill="#ffffff" opacity="0.6" />
      <rect x="5" y="10" width="1" height="1" fill="#ffffff" opacity="0.4" />
      <rect x="4" y="13" width="8" height="1" fill="#000000" opacity="0.3" />
    </svg>
  );
}
