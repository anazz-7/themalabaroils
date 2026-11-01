import React from 'react';
import { MessageCircle, Building2 } from 'lucide-react';

export const StickyMobileBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1C1814]/95 backdrop-blur-md border-t border-[#332A22] px-2.5 py-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] shadow-2xl select-none">
      <div className="flex items-center gap-1.5 max-w-md mx-auto">
        {/* Trade Enquiry Link Button */}
        <a
          href="#trade"
          className="flex-1 min-h-[30px] h-[30px] bg-[#2C241D] hover:bg-[#3E342B] active:scale-[0.97] text-[#E7DFD5] rounded-md text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 border border-white/10 transition-[transform,background-color] duration-150"
        >
          <Building2 className="w-2.5 h-2.5 text-[#D4AF37] shrink-0" />
          <span className="truncate">Trade</span>
        </a>

        {/* WhatsApp Order Button */}
        <a
          href="https://wa.me/916374848947?text=Hello%20The%20Malabar%20Oils,%20I%20would%20like%20to%20order%20cold-pressed%20oils."
          target="_blank"
          rel="noopener noreferrer"
          className="relative overflow-hidden flex-[2.2] min-h-[30px] h-[30px] bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.97] text-white rounded-md text-[10px] font-bold uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-2xs transition-[transform,background-color] duration-150 group/btn"
        >
          <MessageCircle className="w-3 h-3 fill-white/20 shrink-0" />
          <span className="truncate">Order on WhatsApp</span>
          <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
        </a>
      </div>
    </div>
  );
};

