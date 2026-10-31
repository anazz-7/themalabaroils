import React from 'react';

export const InfiniteMarquee: React.FC = () => {
  const items = [
    'AGMARK GRADE-1 CERTIFIED',
    '100% COLD-PRESSED',
    'ZERO CHEMICAL SOLVENTS',
    'NO ADULTERATION',
    'EXTRACTION TEMP < 38°C',
    'PERIYAKULAM, THENI DISTRICT',
    'BARAKKATH MARKETING',
    'NO PRESERVATIVES',
    'UNREFINED & WATER-WHITE',
    'ROOTED IN TRADITION'
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#1C1814] py-3.5 border-y border-[#332A22] select-none">
      {/* Left/Right Edge Fade Gradients for smooth infinite look */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#1C1814] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#1C1814] to-transparent z-10" />

      {/* Marquee Track */}
      <div className="flex w-max animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        {[...items, ...items, ...items].map((text, idx) => (
          <div key={idx} className="flex items-center gap-6 px-4">
            <span className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#E7DFD5] uppercase whitespace-nowrap">
              {text}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] opacity-80" />
          </div>
        ))}
      </div>
    </div>
  );
};

