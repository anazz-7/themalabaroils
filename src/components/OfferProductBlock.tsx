import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, Check, Sparkles } from 'lucide-react';
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
    name: 'Cold-Pressed Coconut Oil (100% Sulfur-Free Copra)',
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
        `Hello The Malabar Oils / Barakkath Marketing,\nI would like to claim the Special Offer: 1L Pure Cold-Pressed Coconut Oil (₹380 worth) for just ₹285.\nPlease confirm my order!`
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
    }
  };

  return (
    <section id="offer" className="py-4 sm:py-6 px-3 sm:px-6 relative select-none">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-2xl sm:rounded-3xl bg-[#FAF7F2] border border-[#D4AF37]/45 p-4 sm:p-6 text-center shadow-xs"
        >
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2C241D] text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>Special Mill Offer • 25% Off</span>
          </div>

          {/* Clean Typography Offer Statement */}
          <h3 className="font-serif-display text-lg sm:text-2xl lg:text-3xl font-bold text-[#2C241D] tracking-tight leading-snug max-w-2xl mx-auto">
            ₹380 Worth Coconut Oil 1L Now Just{' '}
            <span className="font-mono font-black text-[#1C1814] underline decoration-[#D4AF37] decoration-2 underline-offset-4">
              ₹285
            </span>
            <span className="text-xs sm:text-sm font-normal text-[#8C7E70] line-through ml-2 font-mono">
              ₹380
            </span>
          </h3>

          <p className="text-xs sm:text-sm text-[#6C5F51] mt-1.5 max-w-xl mx-auto leading-relaxed">
            100% Edible Raw Sulfur-Free Copra Extraction. <strong className="text-[#2C241D]">Save ₹95</strong> direct from our Periyakulam mill.
          </p>

          {/* Minimal Inline Actions */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-3.5">
            <button
              type="button"
              onClick={handleClaimOffer}
              className="relative overflow-hidden min-h-[38px] sm:min-h-[42px] px-5 bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs transition-all cursor-pointer border border-[#D4AF37]/35"
            >
              <span>Claim Offer (₹285)</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              className={`min-h-[38px] sm:min-h-[42px] px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                isAdded
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                  : 'bg-white hover:bg-[#F2EDE5] active:scale-[0.98] text-[#2C241D] border-[#DDD3C5]'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OfferProductBlock;
