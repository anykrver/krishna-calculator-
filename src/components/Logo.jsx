import React from 'react';

/**
 * BuyWheels Image Logo component rendering the user's official logo image.
 * Supports height adjustments and blend mode tweaks for light/dark themes.
 */
export default function Logo({ height = 52, mode = 'dark', showText = true }) {
  const logoUrl = 'https://cars.buywheels.in/logo.png';
  
  // mix-blend-mode: screen filters out the black background of the logo image on dark pages
  // mix-blend-mode: multiply works for light background contexts
  const blendMode = mode === 'dark' ? 'screen' : 'multiply';

  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', height: `${height}px` }}>
      <img
        src={logoUrl}
        alt="BuyWheels"
        style={{
          height: '100%',
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
          mixBlendMode: blendMode
        }}
      />
    </div>
  );
}
