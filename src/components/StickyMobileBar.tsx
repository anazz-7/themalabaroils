import React from 'react';
import { ShoppingBag, Building2, ShoppingCart } from 'lucide-react';
import { useCatalog } from '../store/catalogStore';
import { useCart } from '../store/cartStore';

interface StickyMobileBarProps {
  onOpenCheckout?: () => void;
  onOpenCart?: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenCheckout, onOpenCart }) => {
  const { whatsappNumber } = useCatalog();
  const { totalItems, totalAmount } = useCart();
  const fallbackUrl = `https://wa.me/${whatsappNumber}?text=Hello%20The%20Malabar%20Oils,%20I%20would%20like%20to%20order%20cold-pressed%20oils.`;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#1C1814]/95 backdrop-blur-md border-t border-[#332A22] px-2.5 py-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] shadow-2xl select-none">
      <div className="flex items-center gap-1.5 max-w-md mx-auto">
        {/* Trade Enquiry Link Button */}
        <a
          href="#trade"
          className="px-2 min-h-[30px] h-[30px] bg-[#2C241D] hover:bg-[#3E342B] active:scale-[0.97] text-[#E7DFD5] rounded-md text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 border border-white/10 transition-[transform,background-color] duration-150 shrink-0"
        >
          <Building2 className="w-2.5 h-2.5 text-[#D4AF37] shrink-0" />
          <span>Trade</span>
        </a>

        {/* View Cart Button */}
        {onOpenCart && (
          <button
            onClick={onOpenCart}
            className="relative px-2.5 min-h-[30px] h-[30px] bg-[#2C241D] hover:bg-[#3E342B] active:scale-[0.97] text-white rounded-md text-[9.5px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 border border-[#D4AF37]/30 transition-all duration-150 cursor-pointer shrink-0"
            aria-label="View Cart"
          >
            <ShoppingCart className="w-3 h-3 text-[#D4AF37] shrink-0" />
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#D4AF37] text-[#1C1814] text-[9px] font-black flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        )}

        {/* Order / Checkout Button */}
        <button
          onClick={() => {
            if (onOpenCheckout) {
              onOpenCheckout();
            } else {
              window.open(fallbackUrl, '_blank');
            }
          }}
          className="relative overflow-hidden flex-1 min-h-[30px] h-[30px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.97] text-white rounded-md text-[10px] font-bold uppercase tracking-wide flex items-center justify-center gap-1.5 shadow-2xs border border-[#D4AF37]/40 transition-[transform,background-color] duration-150 group/btn cursor-pointer"
        >
          <ShoppingBag className="w-3 h-3 text-[#D4AF37] shrink-0" />
          <span className="truncate">
            {totalItems > 0 ? `Checkout (₹${totalAmount})` : 'Order & Checkout'}
          </span>
          <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent pointer-events-none" />
        </button>
      </div>
    </div>
  );
};
