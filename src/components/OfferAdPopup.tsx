import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShoppingBag, ArrowRight, Check, ShieldCheck, Tag } from 'lucide-react';
import { useCart } from '../store/cartStore';
import { CheckoutItemInitial } from './CheckoutModal';

interface OfferAdPopupProps {
  onOpenCheckout?: (item: CheckoutItemInitial) => void;
  onOpenCart?: () => void;
}

export const OfferAdPopup: React.FC<OfferAdPopupProps> = ({ onOpenCheckout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCart();

  const offerItem = {
    productId: 'coconut',
    name: 'Cold-Pressed Coconut Oil (100% Sulfur-Free Copra)',
    sizeLabel: '1 Litre',
    price: 285,
    originalPrice: 380,
    image: '/coconut-oil.jpg'
  };

  useEffect(() => {
    // Check if already dismissed in this session
    try {
      const dismissed = sessionStorage.getItem('malabar_offer_popup_dismissed_v1');
      if (dismissed) return;
    } catch {}

    // Auto show after 3.2 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3200);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem('malabar_offer_popup_dismissed_v1', 'true');
    } catch {}
  };

  const handleClaim = () => {
    handleClose();
    if (onOpenCheckout) {
      onOpenCheckout({
        id: offerItem.productId,
        name: offerItem.name,
        sizeLabel: offerItem.sizeLabel,
        price: offerItem.price,
        image: offerItem.image
      });
    }
  };

  const handleAddToCart = () => {
    addToCart({
      productId: offerItem.productId,
      name: offerItem.name,
      sizeLabel: offerItem.sizeLabel,
      price: offerItem.price,
      originalPrice: offerItem.originalPrice,
      image: offerItem.image,
      quantity: 1
    });

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      handleClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl bg-[#FBF9F5] border-2 border-[#D4AF37]/60 shadow-[0_25px_60px_-15px_rgba(44,36,29,0.5)] text-[#2C241D]"
          >
            {/* Top Festive Header Banner */}
            <div className="bg-[#1C1814] text-white px-5 py-3.5 flex items-center justify-between border-b border-[#332A22]">
              <div className="flex items-center gap-1.5 text-xs font-cinzel tracking-[0.2em] uppercase text-[#D4AF37] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Limited Mill Flash Deal</span>
              </div>

              <button
                onClick={handleClose}
                className="w-7 h-7 rounded-lg hover:bg-white/10 active:scale-95 text-[#D8CFBF] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Offer Popup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Popup Body */}
            <div className="p-5 sm:p-6 text-center space-y-3.5">
              {/* Product Visual & Discount Ribbon */}
              <div className="relative w-36 h-36 mx-auto rounded-2xl bg-[#F8F5EE] border border-[#EBE4DA] flex items-center justify-center p-2 shadow-xs overflow-hidden">
                <img
                  src={offerItem.image}
                  alt={offerItem.name}
                  className="w-full h-full object-contain select-none drop-shadow-md"
                />
                <div className="absolute top-1.5 left-1.5 bg-[#DC2626] text-white text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-xs">
                  25% OFF
                </div>
              </div>

              {/* Offer Headline */}
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#8C6D3B] block mb-1">
                  Exclusive Factory Direct Price
                </span>
                <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2C241D] leading-tight">
                  ₹380 Worth Coconut Oil 1L
                </h3>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="font-serif-display text-3xl font-black text-[#2C241D] font-mono">
                    ₹285
                  </span>
                  <span className="text-base text-[#8C7E70] line-through font-mono">
                    ₹380
                  </span>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2 py-0.5 rounded-full border border-emerald-300">
                    Save ₹95
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#6C5F51] leading-relaxed max-w-xs mx-auto">
                100% Edible Raw Sulfur-Free Copra Extraction. Direct from Barakkath Marketing, Periyakulam.
              </p>

              {/* Trust Badges */}
              <div className="flex items-center justify-center gap-3 text-[10px] text-[#7A6E61] pt-1 border-t border-[#EFE8DC]">
                <span className="flex items-center gap-1 font-semibold text-[#4A3B2C]">
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                  AGMARK Grade-1
                </span>
                <span>•</span>
                <span>Cold-Pressed (&lt;38°C)</span>
                <span>•</span>
                <span className="text-emerald-700 font-bold">Local Delivery FREE</span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={handleClaim}
                  className="w-full min-h-[46px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer border border-[#D4AF37]/50"
                >
                  <Tag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Claim Offer Now (₹285)</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`w-full min-h-[42px] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                    isAdded
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-white hover:bg-[#F2EDE5] active:scale-[0.98] text-[#2C241D] border-[#DDD3C5]'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      <span>Add to Cart (₹285)</span>
                    </>
                  )}
                </button>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="text-[11px] text-[#8C7E70] hover:text-[#2C241D] transition-colors underline underline-offset-4 cursor-pointer pt-1"
              >
                No thanks, continue browsing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
