import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Check, Sparkles, ShieldCheck, Truck, Droplets } from 'lucide-react';
import { useCatalog } from '../store/catalogStore';
import { useCart } from '../store/cartStore';
import { CheckoutItemInitial } from './CheckoutModal';

interface OfferProductBlockProps {
  onOpenCheckout?: (item: CheckoutItemInitial) => void;
  onOpenCart?: () => void;
}

export const OfferProductBlock: React.FC<OfferProductBlockProps> = ({ onOpenCheckout }) => {
  const { whatsappNumber } = useCatalog();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const offerItem = {
    productId: 'coconut',
    name: 'Agmark Chekku Coconut Oil',
    sizeLabel: '1 Litre',
    price: 285,
    originalPrice: 380,
    image: '/coconut-oil.jpg'
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
    setTimeout(() => setIsAdded(false), 1800);
  };

  const handleClaimOffer = () => {
    if (onOpenCheckout) {
      onOpenCheckout({
        id: offerItem.productId,
        name: offerItem.name,
        sizeLabel: offerItem.sizeLabel,
        price: offerItem.price,
        image: offerItem.image
      });
    } else {
      const msg = encodeURIComponent(
        `Hello The Malabar Oils / Barakkath Marketing,\nI would like to claim the Special Mill Offer: 1L Pure Cold-Pressed Coconut Oil (₹380 worth) for just ₹285.\nPlease confirm home delivery to my address.`
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
    }
  };

  return (
    <section id="offer" className="py-6 sm:py-10 px-3 sm:px-6 relative select-none">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FAF8F4] via-[#F4EDE2] to-[#FAF8F4] border border-[#D4AF37]/50 p-4 sm:p-7 lg:p-8 shadow-sm"
        >
          {/* Subtle Ambient Golden Shimmer */}
          <div
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full pointer-events-none opacity-30"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.35) 0%, transparent 70%)'
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-7 items-center relative z-10">
            {/* Left: Product Bottle Showcase with Discount Pill */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[220px] sm:max-w-[240px] md:max-w-[260px] aspect-[4/5] rounded-2xl bg-white border border-[#E7DFD4] p-3 shadow-xs flex items-center justify-center overflow-hidden group">
                {/* Radial Glow */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)] pointer-events-none" />

                {/* Bottle Photography */}
                <img
                  src={offerItem.image}
                  alt={offerItem.name}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-contain select-none pointer-events-none group-hover:scale-105 transition-transform duration-300 ease-out"
                />

                {/* Floating Discount Badge */}
                <div className="absolute top-2.5 left-2.5 bg-[#2C241D] text-[#D4AF37] text-[8.5px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1 border border-[#D4AF37]/40">
                  <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                  <span>Save ₹95 • 25% OFF</span>
                </div>

                {/* Blue Cap Seal Pill */}
                <div className="absolute bottom-2.5 right-2.5 bg-[#1C1814]/90 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[8px] font-mono font-bold border border-white/10 flex items-center gap-1 shadow-2xs">
                  <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                  <span>AGMARK Blue Seal</span>
                </div>
              </div>
            </div>

            {/* Right: Offer Typography & Direct Actions */}
            <div className="md:col-span-7 space-y-3.5 text-center md:text-left">
              {/* Eyebrow Pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2C241D] text-[#D4AF37] text-[9.5px] sm:text-[10px] font-bold uppercase tracking-wider">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Special Mill Flash Offer • Direct Price</span>
              </div>

              {/* Title & Tamil Description */}
              <div>
                <h3 className="font-serif-display text-xl sm:text-2xl lg:text-3xl font-bold text-[#2C241D] tracking-tight leading-tight">
                  ₹380 Worth Coconut Oil 1L Now Just{' '}
                  <span className="font-mono font-black text-[#1C1814] underline decoration-[#D4AF37] decoration-2 underline-offset-4">
                    ₹285
                  </span>
                </h3>
                <div className="text-[11px] sm:text-xs text-[#7A6D5E] font-serif italic mt-1">
                  100% தூய அக்மார்க் செக்கு தேங்காய் எண்ணெய் (1 லிட்டர்)
                </div>
              </div>

              {/* Purity & Benefit Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-left">
                <div className="p-2 rounded-xl bg-white/70 border border-[#E9DFD3] flex items-center gap-2">
                  <Droplets className="w-3.5 h-3.5 text-[#2563EB] shrink-0" />
                  <span className="text-[10px] font-semibold text-[#2C241D] leading-tight">
                    100% Sulfur-Free Copra
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-white/70 border border-[#E9DFD3] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="text-[10px] font-semibold text-[#2C241D] leading-tight">
                    AGMARK Grade 1
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-white/70 border border-[#E9DFD3] flex items-center gap-2">
                  <Truck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                  <span className="text-[10px] font-semibold text-emerald-800 leading-tight">
                    Free Local Delivery
                  </span>
                </div>
              </div>

              {/* Price Bar */}
              <div className="flex items-center justify-center md:justify-start gap-2.5 pt-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-mono text-2xl sm:text-3xl font-black text-[#2C241D]">
                    ₹285
                  </span>
                  <span className="font-mono text-sm sm:text-base text-[#9B8F80] line-through">
                    ₹380
                  </span>
                </div>
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border border-emerald-300">
                  Save ₹95 (25% OFF)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleClaimOffer}
                  className="relative overflow-hidden min-h-[42px] sm:min-h-[44px] px-6 bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer border border-[#D4AF37]/45"
                >
                  <span>Claim Offer (₹285)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`min-h-[42px] sm:min-h-[44px] px-5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border ${
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
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferProductBlock;
