import React from 'react';

export const AmbientBackgroundVFX: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Hardware-accelerated static ambient glows (zero CPU/JS animation loop) */}
      <div
        className="absolute top-[8%] left-[5%] w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full opacity-40 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(251, 249, 245, 0) 70%)'
        }}
      />
      <div
        className="absolute top-[45%] right-[5%] w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(140, 109, 59, 0.07) 0%, rgba(251, 249, 245, 0) 70%)'
        }}
      />
      <div
        className="absolute top-[78%] left-[15%] w-[320px] sm:w-[460px] h-[320px] sm:h-[460px] rounded-full opacity-35 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, rgba(251, 249, 245, 0) 70%)'
        }}
      />
    </div>
  );
};
