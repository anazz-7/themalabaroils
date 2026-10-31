import React from 'react';
import { MessageCircle, Building2, Phone } from 'lucide-react';

export const StickyMobileBar: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1C1814]/95 backdrop-blur-md border-t border-[#332A22] px-4 py-2.5 pb-safe shadow-2xl select-none">
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Trade Enquiry Link Button */}
        <a
          href="#trade"
          className="flex-1 min-h-[44px] bg-[#2C241D] hover:bg-[#3E342B] active:scale-[0.98] text-[#E7DFD5] rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-white/10 transition-[transform,background-color] duration-150"
        >
          <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Trade / Bulk</span>
        </a>

        {/* WhatsApp Order Button */}
        <a
          href="https://wa.me/919876543210?text=Hello%20The%20Malabar%20Oils,%20I%20would%20like%20to%20order%20cold-pressed%20oils."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-[2] min-h-[44px] bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-[transform,background-color] duration-150"
        >
          <MessageCircle className="w-4 h-4 fill-white/20" />
          <span>Order on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

