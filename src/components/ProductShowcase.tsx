import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Check, Sparkles, Droplets, Package, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface OilItem {
  id: string;
  name: string;
  tamilName: string;
  capColor: 'red' | 'blue' | 'yellow' | 'green';
  capLabel: string;
  badgeBg: string;
  badgeText: string;
  glowColor: string;
  shortDesc: string;
  features: string[];
  sizes: {
    label: string;
    price: number;
    originalPrice: number;
    fillPercent: number;
  }[];
  isCombo?: boolean;
}

const CORE_OILS: OilItem[] = [
  {
    id: 'gingelly',
    name: 'Agmark Chekku Gingelly Oil',
    tamilName: 'அக்மார்க் செக்கு நல்லெண்ணெய்',
    capColor: 'red',
    capLabel: 'Red Seal',
    badgeBg: '#FEE2E2',
    badgeText: '#991B1B',
    glowColor: 'rgba(220, 38, 38, 0.25)',
    shortDesc: 'Slow-pressed from premium native black sesame seeds blended with authentic palm jaggery in traditional chekku.',
    features: ['100% Native Black Sesame', 'Rich in Sesamol Antioxidants', 'Traditional Body Cooling', 'AGMARK Grade 1 Certified'],
    sizes: [
      { label: '500 ml', price: 245, originalPrice: 280, fillPercent: 45 },
      { label: '1 Litre', price: 470, originalPrice: 530, fillPercent: 75 },
      { label: '5 Litres', price: 2250, originalPrice: 2550, fillPercent: 100 }
    ]
  },
  {
    id: 'coconut',
    name: 'Agmark Chekku Coconut Oil',
    tamilName: 'அக்மார்க் செக்கு தேங்காய் எண்ணெய்',
    capColor: 'blue',
    capLabel: 'Blue Seal',
    badgeBg: '#DBEAFE',
    badgeText: '#1E40AF',
    glowColor: 'rgba(37, 99, 235, 0.25)',
    shortDesc: 'Cold-pressed from sun-dried, 100% sulfur-free copra. Crystal-clear edible oil with pure natural coconut aroma.',
    features: ['100% Sulfur-Free Copra', 'High in Lauric Acid (MCFA)', 'Unrefined & Water-White', 'Culinary & Hair Nourishment'],
    sizes: [
      { label: '500 ml', price: 220, originalPrice: 250, fillPercent: 45 },
      { label: '1 Litre', price: 420, originalPrice: 475, fillPercent: 75 },
      { label: '5 Litres', price: 2000, originalPrice: 2250, fillPercent: 100 }
    ]
  },
  {
    id: 'groundnut',
    name: 'Agmark Chekku Groundnut Oil',
    tamilName: 'அக்மார்க் செக்கு கடலை எண்ணெய்',
    capColor: 'yellow',
    capLabel: 'Yellow Seal',
    badgeBg: '#FEF3C7',
    badgeText: '#92400E',
    glowColor: 'rgba(217, 119, 6, 0.25)',
    shortDesc: 'Cold-pressed from hand-sorted native peanuts. Perfect for everyday South Indian cooking and crispy golden frying.',
    features: ['Hand-Sorted Native Peanuts', 'Heart-Friendly MUFA Fats', 'Crisp Frying & Less Oil Soak', 'Zero Trans Fats or Additives'],
    sizes: [
      { label: '500 ml', price: 210, originalPrice: 240, fillPercent: 45 },
      { label: '1 Litre', price: 395, originalPrice: 440, fillPercent: 75 },
      { label: '5 Litres', price: 1880, originalPrice: 2100, fillPercent: 100 }
    ]
  },
  {
    id: 'trio-bundle',
    name: 'The Malabar Grand Trio Box',
    tamilName: 'செக்கு எண்ணெய் முக்கூட்டு பேக்',
    capColor: 'green',
    capLabel: 'Heritage Trio',
    badgeBg: '#DCFCE7',
    badgeText: '#166534',
    glowColor: 'rgba(45, 90, 39, 0.25)',
    shortDesc: 'All 3 signature cold-pressed oils together in one box: Gingelly + Coconut + Groundnut. Complete pantry health upgrade.',
    features: ['All 3 Heritage Oils Included', 'Save ₹185 on Combo Bundle', 'Free Priority Doorstep Delivery', 'Farm Foods Castor Sample Included'],
    sizes: [
      { label: '3 x 500 ml', price: 625, originalPrice: 770, fillPercent: 50 },
      { label: '3 x 1 Litre', price: 1199, originalPrice: 1445, fillPercent: 85 },
      { label: '3 x 5 Litres', price: 5799, originalPrice: 6900, fillPercent: 100 }
    ],
    isCombo: true
  }
];

export const ProductShowcase: React.FC = () => {
  // Size selection states per card
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: number }>({
    gingelly: 1, // default 1 Litre
    coconut: 1,
    groundnut: 1,
    'trio-bundle': 1
  });

  const handleSelectSize = (oilId: string, sizeIdx: number) => {
    setSelectedSizes((prev) => ({ ...prev, [oilId]: sizeIdx }));
  };

  const getWhatsAppOrderUrl = (oilName: string, sizeLabel: string, price: number) => {
    const text = encodeURIComponent(
      `Hello The Malabar Oils / Barakkath Marketing,\nI would like to order:\n• *${oilName}* (${sizeLabel}) - ₹${price}\nPlease confirm home delivery to my address.`
    );
    return `https://wa.me/919876543210?text=${text}`;
  };

  return (
    <section id="oils" className="py-14 sm:py-20 bg-[#FBF9F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with smooth entrance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.25em] uppercase text-[#736555] font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Pure Botanical Extraction</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight mb-2">
            Our Cold-Pressed Oils
          </h2>
          <p className="text-xs sm:text-sm text-[#6C5F51] leading-relaxed">
            Traditionally extracted using slow cold-press chekku methods. Select your packaging size to view instant pricing and order directly via WhatsApp.
          </p>
        </motion.div>

        {/* 2x2 Grid Layout for 3 Products + 1 Grand Trio Pack */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {CORE_OILS.map((oil, index) => {
            const currentSizeIdx = selectedSizes[oil.id] ?? 1;
            const currentSize = oil.sizes[currentSizeIdx] || oil.sizes[0];

            return (
              <motion.div
                key={oil.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor={oil.glowColor}
                  className={`bg-white border transition-all duration-300 p-6 sm:p-8 flex flex-col justify-between h-full shadow-sm hover:shadow-2xl relative group ${
                    oil.isCombo
                      ? 'border-[#2D5A27]/50 bg-gradient-to-br from-white via-[#F6FBF5] to-white'
                      : 'border-[#E7DFD5] hover:border-[#C5B7A6]'
                  }`}
                >
                  {/* Subtle Ambient Cap Light Bloom */}
                  <div 
                    className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-500"
                    style={{ backgroundColor: oil.glowColor }}
                  />

                  <div>
                    {/* Header Tag & AGMARK Badge */}
                    <div className="flex items-center justify-between mb-4 select-none">
                      <span
                        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 shadow-2xs"
                        style={{ backgroundColor: oil.badgeBg, color: oil.badgeText }}
                      >
                        <span 
                          className="w-2.5 h-2.5 rounded-full relative flex items-center justify-center"
                          style={{
                            backgroundColor: 
                              oil.capColor === 'red' ? '#DC2626' :
                              oil.capColor === 'blue' ? '#2563EB' :
                              oil.capColor === 'yellow' ? '#D97706' : '#16A34A'
                          }}
                        >
                          <span className="w-full h-full rounded-full animate-ping absolute opacity-60" style={{ backgroundColor: 'inherit' }} />
                        </span>
                        <span>{oil.capLabel}</span>
                      </span>

                      <span className="text-[10px] font-mono font-bold text-[#8C8072] uppercase flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>AGMARK Grade 1</span>
                      </span>
                    </div>

                    {/* Animated Bottle Volume & Droplet Visualizer Bar */}
                    <div className="my-3 p-3 rounded-2xl bg-[#FAF7F2] border border-[#EAE2D7] flex items-center justify-between select-none">
                      <div className="flex items-center gap-2.5">
                        <motion.div 
                          animate={{ 
                            scale: currentSizeIdx === 0 ? 0.9 : currentSizeIdx === 1 ? 1 : 1.15,
                            rotate: [0, -2, 2, 0]
                          }}
                          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-xs"
                          style={{
                            backgroundColor: 
                              oil.capColor === 'red' ? '#DC2626' :
                              oil.capColor === 'blue' ? '#2563EB' :
                              oil.capColor === 'yellow' ? '#D97706' : '#16A34A'
                          }}
                        >
                          {oil.isCombo ? <Package className="w-5 h-5" /> : <Droplets className="w-5 h-5" />}
                        </motion.div>
                        <div>
                          <div className="text-xs font-bold text-[#2C241D]">
                            {currentSize.label} Bottle Size
                          </div>
                          <div className="text-[10px] text-[#7E7163]">
                            Cold-pressed weekly • 100% Raw
                          </div>
                        </div>
                      </div>

                      {/* Animated Liquid Meter */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-16 h-2 rounded-full bg-[#E5DCD0] overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{
                              backgroundColor: 
                                oil.capColor === 'red' ? '#DC2626' :
                                oil.capColor === 'blue' ? '#2563EB' :
                                oil.capColor === 'yellow' ? '#D97706' : '#16A34A'
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${currentSize.fillPercent}%` }}
                            transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                          />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#7A6E61]">
                          {currentSize.fillPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2C241D] leading-snug">
                      {oil.name}
                    </h3>
                    <div className="text-xs text-[#7A6D5E] font-serif italic mt-0.5 mb-3 select-none">
                      {oil.tamilName}
                    </div>

                    <p className="text-xs sm:text-sm text-[#554A3E] leading-relaxed mb-4">
                      {oil.shortDesc}
                    </p>

                    {/* Key Benefits List with subtle hover animation */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {oil.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#4A3E32]">
                          <Check className="w-3.5 h-3.5 text-[#2D5A27] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Packaging Size Selector & Animated Price */}
                  <div className="pt-4 border-t border-[#EFEAE2]">
                    <div className="text-[11px] font-semibold text-[#7A6E61] mb-2 flex justify-between select-none">
                      <span>Select Packaging:</span>
                      <span className="font-bold text-[#2C241D]">{currentSize.label}</span>
                    </div>

                    {/* Interactive Size Pills with Spring Indicator */}
                    <div className="flex gap-1.5 p-1 bg-[#F7F3EC] rounded-xl mb-4 select-none">
                      {oil.sizes.map((sz, szIdx) => {
                        const isSelected = currentSizeIdx === szIdx;
                        return (
                          <button
                            key={sz.label}
                            onClick={() => handleSelectSize(oil.id, szIdx)}
                            className={`relative flex-1 min-h-[40px] py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center z-10 flex items-center justify-center ${
                              isSelected ? 'text-white' : 'text-[#6C5F51] hover:text-[#2C241D]'
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                layoutId={`activeSize-${oil.id}`}
                                className="absolute inset-0 bg-[#2C241D] rounded-lg -z-10 shadow-sm"
                                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                              />
                            )}
                            <span>{sz.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Animated Price calculation & Savings Pop */}
                    <div className="flex items-center justify-between mb-4 select-none">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={currentSize.price}
                              initial={{ opacity: 0, y: -6, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 6, scale: 0.95 }}
                              transition={{ duration: 0.15, ease: 'easeOut' }}
                              className="text-3xl font-black text-[#2C241D]"
                            >
                              ₹{currentSize.price}
                            </motion.span>
                          </AnimatePresence>
                          <span className="text-xs text-[#9B8F80] line-through">
                            ₹{currentSize.originalPrice}
                          </span>
                        </div>

                        <motion.div
                          key={`save-${currentSize.price}`}
                          initial={{ scale: 0.85 }}
                          animate={{ scale: [0.85, 1.1, 1] }}
                          transition={{ duration: 0.3 }}
                          className="text-[11px] font-bold text-[#2D5A27] mt-0.5 inline-block"
                        >
                          Save ₹{currentSize.originalPrice - currentSize.price} ({Math.round(((currentSize.originalPrice - currentSize.price) / currentSize.originalPrice) * 100)}% OFF)
                        </motion.div>
                      </div>

                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-[#2D5A27] bg-[#DCFCE7] px-2.5 py-1 rounded-full inline-block">
                          {oil.isCombo ? 'Value Combo' : 'Food Grade'}
                        </span>
                      </div>
                    </div>

                    {/* WhatsApp CTA with Shimmer & Spring */}
                    <a
                      href={getWhatsAppOrderUrl(oil.name, currentSize.label, currentSize.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden w-full min-h-[48px] bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.98] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-[transform,background-color] duration-150 cursor-pointer select-none group/btn"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order {currentSize.label} on WhatsApp</span>
                      {/* Sweeping Light Glint */}
                      <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                    </a>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>

        {/* The Malabar Farm Foods Expansion Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="mt-8 sm:mt-12 rounded-3xl bg-[#F4EEE5] border border-[#DDD3C5] p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6"
        >
          <div className="max-w-xl text-center sm:text-left">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D5A27] bg-[#DCFCE7] px-2.5 py-0.5 rounded-full inline-block mb-1.5">
              Brand Family
            </span>
            <h4 className="font-serif-display text-lg sm:text-xl font-bold text-[#2C241D]">
              The Malabar Farm Foods
            </h4>
            <p className="text-xs text-[#5D5043] mt-1 leading-relaxed">
              Also offering pure cold-pressed castor oil, organic Naatu Sakkarai (country sugar), and traditional farm staples grown without synthetic chemicals.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20The%20Malabar%20Oils,%20I%20would%20like%20to%20enquire%20about%20The%20Malabar%20Farm%20Foods%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[44px] shrink-0 bg-[#2C241D] hover:bg-[#1A1512] active:scale-95 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-[transform,background-color] duration-150 cursor-pointer select-none"
          >
            Enquire Farm Foods
          </a>
        </motion.div>
      </div>
    </section>
  );
};
