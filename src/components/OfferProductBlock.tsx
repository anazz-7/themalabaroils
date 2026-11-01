import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShoppingBag, ShieldCheck, Check, ArrowRight, Truck, Gift, Flame } from 'lucide-react';
import { useCatalog } from '../store/catalogStore';
import { useCart } from '../store/cartStore';
import { CheckoutItemInitial } from './CheckoutModal';

interface OfferProductBlockProps {
  onOpenCheckout?: (item: CheckoutItemInitial) => void;
  onOpenCart?: () => void;
}

export const OfferProductBlock: React.FC<OfferProductBlockProps> = ({ onOpenCheckout, onOpenCart }) => {
  const { whatsappNumber } = useCatalog();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const offerItem = {
    productId: 'trio-bundle',
    name: 'Traditional Kitchen Trio Combo (3 x 1 Litre)',
    sizeLabel: '3 x 1 Litre',
    price: 1199,
    originalPrice: 1320,
    image: '/trio-bundle.jpg'
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
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
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
        `Hello The Malabar Oils / Barakkath Marketing,\nI want to claim the *Traditional Kitchen Trio Combo (3 x 1L)* at the special offer price of *₹1,199* (Save ₹121).\nPlease arrange doorstep delivery!`
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
    }
  };

  return (
    <section className="py-8 sm:py-14 bg-gradient-to-b from-[#FBF9F5] via-[#F4EFE6] to-[#FBF9F5] relative overflow-hidden select-none">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[700px] h-[300px] bg-gradient-to-r from-[#D4AF37]/20 via-[#8C6D3B]/15 to-[#D4AF37]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Banner Card */}
        <div className="rounded-3xl bg-white border border-[#D4AF37]/45 shadow-xl overflow-hidden relative group">
          {/* Top highlight bar */}
          <div className="bg-[#1C1814] text-[#E7DFD5] px-4 py-2 flex items-center justify-between text-xs border-b border-[#332A22]">
            <div className="flex items-center gap-2">
              <span className="flex items-center justify-center w-2 h-2 rounded-full bg-[#D4AF37] animate-ping" />
              <span className="font-bold uppercase tracking-wider text-[10px] sm:text-xs text-[#D4AF37] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-[#D4AF37]" />
                Limited Batch Mill Offer
              </span>
            </div>
            <div className="text-[10px] sm:text-xs text-[#A89C8C] uppercase tracking-wider">
              Barakkath Marketing Direct
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 sm:p-8 lg:p-10 items-center">
            {/* Left: Bottle Bundle Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-square sm:aspect-[4/3] lg:aspect-square rounded-2xl overflow-hidden bg-[#FAF6F0] border border-[#DDD3C5] shadow-sm">
                <img
                  src={offerItem.image}
                  alt={offerItem.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                />

                {/* Savings Corner Badge */}
                <div className="absolute top-3 left-3 bg-[#1C1814]/90 backdrop-blur-md text-[#D4AF37] px-3 py-1.5 rounded-full text-xs font-bold border border-[#D4AF37]/40 shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SAVE ₹121 (10% OFF)</span>
                </div>

                {/* Free Shipping Badge */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md text-[#2C241D] px-2.5 py-1 rounded-lg text-[10px] font-bold border border-[#DDD3C5] shadow-xs flex items-center gap-1">
                  <Truck className="w-3 h-3 text-[#2D5A27]" />
                  <span>Free Dispatch</span>
                </div>
              </div>
            </div>

            {/* Right: Offer Details, Inclusions, and Dual Action CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4 sm:space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-cinzel tracking-[0.25em] uppercase text-[#8C6D3B] font-bold mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>The Complete Kitchen Trio</span>
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C241D] tracking-tight leading-tight">
                  All 3 Cold-Pressed Oils in One Bundle
                </h3>
                <p className="text-xs sm:text-sm text-[#6C5F51] mt-1.5 leading-relaxed">
                  Experience authentic traditional cold-pressed cooking: 1L Gingelly, 1L Coconut, and 1L Groundnut oils extracted slowly below 38°C without chemical refining.
                </p>
              </div>

              {/* Inclusions checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF7F2] border border-[#EFEAE2]">
                  <Check className="w-4 h-4 text-[#8C6D3B] shrink-0" />
                  <span className="text-[#2C241D] font-medium">1L Gingelly Oil (Palm Jaggery Chekku)</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF7F2] border border-[#EFEAE2]">
                  <Check className="w-4 h-4 text-[#8C6D3B] shrink-0" />
                  <span className="text-[#2C241D] font-medium">1L Chekku Coconut Oil (100% Raw)</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF7F2] border border-[#EFEAE2]">
                  <Check className="w-4 h-4 text-[#8C6D3B] shrink-0" />
                  <span className="text-[#2C241D] font-medium">1L Chekku Groundnut Oil (Sun-Dried)</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-xl bg-[#FAF7F2] border border-[#EFEAE2]">
                  <Gift className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span className="text-[#2C241D] font-medium">Free Pure Palm Jaggery Sample</span>
                </div>
              </div>

              {/* Price Calculation */}
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FAF7F2] border border-[#DDD3C5] flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-[#2C241D]">
                      ₹{offerItem.price}
                    </span>
                    <span className="text-xs sm:text-sm text-[#9B8F80] line-through font-mono">
                      ₹{offerItem.originalPrice}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#2D5A27] font-bold">
                    ✓ Price includes all taxes & doorstep delivery
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#7A6E61]">
                  <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                  <span className="font-semibold text-[#4A3B2C]">AGMARK Grade-1 Guaranteed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {/* Add Offer to Cart */}
                <button
                  type="button"
                  onClick={handleAddToCart}
                  className={`min-h-[44px] sm:min-h-[48px] rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border ${
                    isAdded
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                      : 'bg-white hover:bg-[#FAF7F2] active:scale-[0.98] text-[#2C241D] border-[#DDD3C5] shadow-xs'
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
                      <span>Add Combo to Cart</span>
                    </>
                  )}
                </button>

                {/* Instant Claim / Checkout */}
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="relative overflow-hidden min-h-[44px] sm:min-h-[48px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer border border-[#D4AF37]/50 group/btn"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Claim Offer Now</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  {/* Sweeping Champagne Light Glint */}
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent pointer-events-none" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferProductBlock;
