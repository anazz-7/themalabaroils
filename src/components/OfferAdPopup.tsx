import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShoppingBag, ArrowRight, Check } from 'lucide-react';
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
    name: 'Agmark Chekku Coconut Oil',
    sizeLabel: '1 Litre',
    price: 285,
    originalPrice: 380,
    image: '/coconut-oil.jpg'
  };

  useEffect(() => {
    // Check if already dismissed in this session
    try {
      const dismissed = sessionStorage.getItem('malabar_offer_popup_dismissed_v2');
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
      sessionStorage.setItem('malabar_offer_popup_dismissed_v2', 'true');
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 10 }}
            transition={{ type: 'spring', stiffness: 360, damping: 28 }}
            className="relative w-full max-w-sm overflow-hidden rounded-3xl bg-[#FAF8F5] border border-[#E7DFD4] shadow-2xl p-5 sm:p-6 text-[#2C241D] text-center"
          >
            {/* Elegant Minimal Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 active:scale-90 text-[#6C5F51] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            {/* Eyebrow Tag */}
            <div className="inline-flex items-center gap-1.5 text-[9.5px] font-cinzel tracking-[0.2em] uppercase text-[#8C6D3B] font-bold mb-3">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Special Mill Offer</span>
            </div>

            {/* Product Bottle in Minimal Card */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-2xl bg-white border border-[#EBE4DA] flex items-center justify-center p-2 mb-3 shadow-2xs">
              <img
                src={offerItem.image}
                alt={offerItem.name}
                draggable={false}
                className="w-full h-full object-contain select-none pointer-events-none drop-shadow-sm"
              />
              <div className="absolute top-1.5 left-1.5 bg-[#2C241D] text-[#D4AF37] text-[7.5px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border border-[#D4AF37]/35 shadow-2xs">
                25% OFF
              </div>
            </div>

            {/* Headline & Pricing */}
            <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#2C241D] tracking-tight leading-tight">
              Chekku Coconut Oil 1L
            </h3>
            <div className="text-[10px] text-[#7A6D5E] font-serif italic mt-0.5">
              100% தூய செக்கு தேங்காய் எண்ணெய்
            </div>

            <div className="flex items-center justify-center gap-2 mt-2">
              <span className="font-mono text-2xl font-black text-[#2C241D]">
                ₹285
              </span>
              <span className="font-mono text-sm text-[#9B8F80] line-through">
                ₹380
              </span>
              <span className="text-[9.5px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                Save ₹95
              </span>
            </div>

            <p className="text-[11px] text-[#6C5F51] mt-2 leading-relaxed max-w-xs mx-auto">
              100% sulfur-free copra cold-pressed at our Periyakulam mill. Free local delivery.
            </p>

            {/* Actions */}
            <div className="space-y-2 pt-3.5">
              <button
                type="button"
                onClick={handleClaim}
                className="w-full min-h-[42px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer border border-[#D4AF37]/45"
              >
                <span>Claim Offer (₹285)</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
              </button>

              <button
                type="button"
                onClick={handleAddToCart}
                className={`w-full min-h-[38px] rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                  isAdded
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-white hover:bg-[#F2EDE5] active:scale-[0.98] text-[#2C241D] border-[#DDD3C5]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Added to Cart!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="text-[10px] text-[#8C7E70] hover:text-[#2C241D] transition-colors mt-2.5 inline-block cursor-pointer"
            >
              No thanks, continue browsing
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
