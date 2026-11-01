import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ShieldCheck, ShoppingBag, Plus, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';
import { useCatalog, CatalogProduct } from '../store/catalogStore';
import { useCart } from '../store/cartStore';
import { CheckoutItemInitial } from './CheckoutModal';

interface ProductShowcaseProps {
  onOpenCheckout?: (item: CheckoutItemInitial) => void;
  onOpenCart?: () => void;
}

const formatSizeLabel = (label: string) => {
  return label
    .replace('3 x ', '3×')
    .replace(' Litres', 'L')
    .replace(' Litre', 'L')
    .replace(' ml', 'ml');
};

export const ProductShowcase: React.FC<ProductShowcaseProps> = ({ onOpenCheckout, onOpenCart }) => {
  const { catalog, whatsappNumber } = useCatalog();
  const { addToCart } = useCart();
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);

  // Size selection states per card
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: number }>({
    gingelly: 1, // default 1 Litre
    coconut: 1,
    groundnut: 1,
    'trio-bundle': 1
  });

  const [addedKey, setAddedKey] = useState<string | null>(null);

  const handleSelectSize = (oilId: string, sizeIdx: number) => {
    setSelectedSizes((prev) => ({ ...prev, [oilId]: sizeIdx }));
  };

  const handleAddToCart = (product: CatalogProduct, size: { label: string; price: number; originalPrice?: number }) => {
    addToCart({
      productId: product.id,
      name: product.name,
      sizeLabel: size.label,
      price: size.price,
      originalPrice: size.originalPrice,
      image: product.image,
      quantity: 1
    });

    const key = `${product.id}-${size.label}`;
    setAddedKey(key);
    setTimeout(() => {
      setAddedKey(null);
    }, 1800);
  };

  const handleBuyNow = (product: CatalogProduct, size: { label: string; price: number }) => {
    if (onOpenCheckout) {
      onOpenCheckout({
        id: product.id,
        name: product.name,
        sizeLabel: size.label,
        price: size.price,
        image: product.image
      });
    } else {
      const text = encodeURIComponent(
        `Hello The Malabar Oils / Barakkath Marketing,\nI would like to order:\n• *${product.name}* (${size.label}) - ₹${size.price}\nPlease confirm home delivery to my address.`
      );
      window.open(`https://wa.me/${whatsappNumber}?text=${text}`, '_blank');
    }
  };

  const handleScrollCarousel = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const cardWidth = 290;
    const newIdx = Math.round(el.scrollLeft / cardWidth);
    if (newIdx !== activeMobileIdx && newIdx >= 0 && newIdx < catalog.length) {
      setActiveMobileIdx(newIdx);
    }
  };

  const scrollCarousel = (direction: 'prev' | 'next') => {
    if (!carouselRef.current) return;
    const cardWidth = 290;
    const scrollAmount = direction === 'next' ? cardWidth : -cardWidth;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  const renderProductCard = (oil: CatalogProduct, index: number, isMobile: boolean) => {
    const currentSizeIdx = selectedSizes[oil.id] ?? (oil.sizes.length > 1 ? 1 : 0);
    const currentSize = oil.sizes[currentSizeIdx] || oil.sizes[0] || { label: '1L', price: 420, originalPrice: 480 };
    const itemKey = `${oil.id}-${currentSize.label}`;
    const isAdded = addedKey === itemKey;

    return (
      <motion.div
        key={oil.id}
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20px' }}
        transition={{ duration: 0.4, delay: index * 0.04, ease: [0.32, 0.72, 0, 1] }}
        whileHover={!isMobile ? { y: -4, transition: { duration: 0.2, ease: 'easeOut' } } : undefined}
        className={isMobile ? 'w-[82vw] max-w-[310px] shrink-0 snap-center h-full' : 'h-full'}
      >
        <SpotlightCard
          spotlightColor={oil.glowColor || 'rgba(212, 175, 55, 0.2)'}
          className={`bg-white border transition-all duration-300 p-3.5 sm:p-5 flex flex-col justify-between h-full shadow-xs hover:shadow-xl relative group rounded-2xl sm:rounded-3xl ${
            oil.isCombo
              ? 'border-[#D4AF37]/50 bg-gradient-to-br from-white via-[#FAF6F0] to-white'
              : 'border-[#E7DFD5] hover:border-[#C5B7A6]'
          }`}
        >
          {/* Subtle Ambient Cap Light Bloom */}
          <div
            className="absolute -top-10 -right-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-500"
            style={{ backgroundColor: oil.glowColor || 'rgba(212, 175, 55, 0.2)' }}
          />

          <div>
            {/* Real Authentic Product Bottle Image Showcase */}
            <div className="relative w-full aspect-square sm:aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-[#F7F4EE] mb-2.5 sm:mb-3.5 border border-[#EBE4DA] group-hover:border-[#D4C8B8] transition-colors shadow-2xs">
              <img
                src={oil.image}
                alt={oil.name}
                loading="lazy"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              {/* Floating Cap Seal Badge on top of image */}
              <div className="absolute top-1.5 left-1.5 sm:top-2.5 sm:left-2.5 z-10">
                <span
                  className="text-[8px] sm:text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full flex items-center gap-1 shadow-xs backdrop-blur-md"
                  style={{ backgroundColor: oil.badgeBg, color: oil.badgeText }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full relative flex items-center justify-center"
                    style={{
                      backgroundColor:
                        oil.capColor === 'red'
                          ? '#DC2626'
                          : oil.capColor === 'blue'
                          ? '#2563EB'
                          : oil.capColor === 'yellow'
                          ? '#D97706'
                          : '#4A3B2C'
                    }}
                  >
                    <span className="w-full h-full rounded-full animate-ping absolute opacity-60" style={{ backgroundColor: 'inherit' }} />
                  </span>
                  <span>{oil.capLabel}</span>
                </span>
              </div>

              {/* AGMARK Grade 1 overlay badge */}
              <div className="absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 z-10 bg-[#1C1814]/80 backdrop-blur-md text-white px-1.5 py-0.5 rounded-md text-[7.5px] sm:text-[9px] font-mono font-bold flex items-center gap-0.5 border border-white/10">
                <ShieldCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#D4AF37]" />
                <span>AGMARK</span>
              </div>

              {/* Light sweep glint across image on card hover */}
              <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            </div>

            {/* Title & Tamil Name */}
            <div className="mb-2 sm:mb-3">
              <h3 className="font-serif-display text-sm sm:text-base lg:text-lg font-bold text-[#2C241D] leading-tight line-clamp-1">
                <span className="sm:hidden">{oil.shortMobileName}</span>
                <span className="hidden sm:inline">{oil.name}</span>
              </h3>
              <div className="text-[9.5px] sm:text-xs text-[#7A6D5E] font-serif italic mt-0.5 select-none truncate">
                {oil.tamilName}
              </div>
            </div>
          </div>

          {/* Packaging Size Selector & Animated Price */}
          <div className="pt-2 sm:pt-3.5 border-t border-[#EFEAE2]">
            <div className="text-[9px] sm:text-[11px] font-semibold text-[#7A6E61] mb-1 sm:mb-2 flex justify-between select-none">
              <span>Size:</span>
              <span className="font-bold text-[#2C241D]">{currentSize.label}</span>
            </div>

            {/* Interactive Size Pills with Spring Indicator */}
            <div className="flex gap-1 p-0.5 sm:p-1 bg-[#F7F3EC] rounded-lg sm:rounded-xl mb-2 sm:mb-3 select-none">
              {oil.sizes.map((sz, szIdx) => {
                const isSelected = currentSizeIdx === szIdx;
                return (
                  <button
                    key={sz.label}
                    onClick={() => handleSelectSize(oil.id, szIdx)}
                    className={`relative flex-1 min-h-[30px] sm:min-h-[34px] py-0.5 text-[8.5px] sm:text-xs font-bold rounded-md sm:rounded-lg transition-colors cursor-pointer text-center z-10 flex items-center justify-center ${
                      isSelected ? 'text-white' : 'text-[#6C5F51] hover:text-[#2C241D]'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId={`activeSize-${oil.id}`}
                        className="absolute inset-0 bg-[#2C241D] rounded-md sm:rounded-lg -z-10 shadow-xs"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span className="truncate">{formatSizeLabel(sz.label)}</span>
                  </button>
                );
              })}
            </div>

            {/* Animated Price calculation & Savings Pop */}
            <div className="flex items-center justify-between mb-2 sm:mb-3 select-none">
              <div>
                <div className="flex items-baseline gap-1 sm:gap-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={currentSize.price}
                      initial={{ opacity: 0, y: -5, scale: 0.94 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.94 }}
                      transition={{ duration: 0.14, ease: [0.32, 0.72, 0, 1] }}
                      className="text-base sm:text-xl font-black text-[#2C241D]"
                    >
                      ₹{currentSize.price}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-[9px] sm:text-xs text-[#9B8F80] line-through">
                    ₹{currentSize.originalPrice}
                  </span>
                </div>

                <motion.div
                  key={`save-${currentSize.price}`}
                  initial={{ scale: 0.85 }}
                  animate={{ scale: [0.85, 1.1, 1] }}
                  transition={{ duration: 0.25 }}
                  className="text-[8px] sm:text-[9.5px] font-bold text-[#8C5E2D] mt-0.5 inline-block"
                >
                  Save ₹{currentSize.originalPrice - currentSize.price}
                </motion.div>
              </div>

              <div className="hidden sm:block text-right">
                <span className="text-[9px] uppercase font-bold text-[#4A3B2C] bg-[#F5ECE1] border border-[#DDD0BF] px-2 py-0.5 rounded-full inline-block">
                  {oil.isCombo ? 'Combo' : 'Grade 1'}
                </span>
              </div>
            </div>

            {/* Dual Action: Add to Cart + Buy Now */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(oil, currentSize)}
                className={`min-h-[38px] sm:min-h-[42px] border py-2 px-1.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase flex items-center justify-center gap-1 transition-all cursor-pointer select-none ${
                  isAdded
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                    : 'bg-[#FAF7F2] hover:bg-[#EDE5DB] text-[#2C241D] border-[#DDD3C5] active:scale-[0.96]'
                }`}
                title="Add item to cart"
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="font-bold">Added!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3 h-3 text-[#D4AF37]" />
                    <span className="truncate">Add to Cart</span>
                  </>
                )}
              </button>

              {/* Buy Now Button */}
              <button
                onClick={() => handleBuyNow(oil, currentSize)}
                className="relative overflow-hidden min-h-[38px] sm:min-h-[42px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.96] text-white py-2 px-1.5 rounded-xl text-[10px] sm:text-xs font-bold uppercase flex items-center justify-center gap-1 shadow-xs transition-all cursor-pointer select-none group/btn border border-[#D4AF37]/35"
                title="Order immediately"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span className="truncate">Buy Now</span>
                {/* Sweeping Champagne Light Glint */}
                <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent pointer-events-none" />
              </button>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    );
  };

  return (
    <section id="oils" className="py-10 sm:py-20 bg-[#FBF9F5] relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with smooth entrance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-cinzel tracking-[0.25em] uppercase text-[#7A6E61] font-semibold mb-1 sm:mb-2">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />
            <span>Pure Botanical Extraction</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight mb-1.5 sm:mb-2">
            Our Cold-Pressed Oils
          </h2>
          <p className="text-[11px] sm:text-sm text-[#6C5F51] leading-relaxed">
            Traditionally extracted using slow cold-press chekku methods. Swipe or add items to your cart.
          </p>
        </motion.div>

        {/* MOBILE VIEW: Horizontal Swipeable Carousel */}
        <div className="lg:hidden relative">
          <div
            ref={carouselRef}
            onScroll={handleScrollCarousel}
            className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-4 px-2 -mx-2 scrollbar-none touch-pan-x scroll-smooth"
          >
            {catalog.map((oil, index) => renderProductCard(oil, index, true))}
          </div>

          {/* Carousel Pagination Dots & Nav Controls */}
          <div className="flex items-center justify-between px-2 pt-2 border-t border-[#EDE5DB]">
            <span className="text-[11px] font-semibold text-[#7A6E61]">
              Swipe to explore ({activeMobileIdx + 1} of {catalog.length})
            </span>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollCarousel('prev')}
                disabled={activeMobileIdx === 0}
                className="w-7 h-7 rounded-full bg-white border border-[#DDD3C5] flex items-center justify-center text-[#2C241D] active:scale-90 disabled:opacity-30 shadow-2xs cursor-pointer"
                aria-label="Previous product"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 px-1">
                {catalog.map((_, dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      dotIdx === activeMobileIdx ? 'w-4 bg-[#2C241D]' : 'w-1.5 bg-[#DDD3C5]'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => scrollCarousel('next')}
                disabled={activeMobileIdx === catalog.length - 1}
                className="w-7 h-7 rounded-full bg-white border border-[#DDD3C5] flex items-center justify-center text-[#2C241D] active:scale-90 disabled:opacity-30 shadow-2xs cursor-pointer"
                aria-label="Next product"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* DESKTOP VIEW: 4 Columns x 2 Rows Grid */}
        <div className="hidden lg:grid grid-cols-4 gap-6">
          {catalog.map((oil, index) => renderProductCard(oil, index, false))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
