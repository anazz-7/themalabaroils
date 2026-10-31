import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Check, Sparkles, Droplets, Package, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface OilItem {
  id: string;
  name: string;
  shortMobileName: string;
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

const formatSizeLabel = (label: string) => {
  return label
    .replace('3 x ', '3×')
    .replace(' Litres', 'L')
    .replace(' Litre', 'L')
    .replace(' ml', 'ml');
};

const CORE_OILS: OilItem[] = [
  {
    id: 'gingelly',
    name: 'Agmark Chekku Gingelly Oil',
    shortMobileName: 'Chekku Gingelly Oil',
    tamilName: 'அக்மார்க் நல்லெண்ணெய்',
    capColor: 'red',
    capLabel: 'Red Seal',
    badgeBg: '#FEE2E2',
    badgeText: '#991B1B',
    glowColor: 'rgba(220, 38, 38, 0.25)',
    shortDesc: 'Slow-pressed from premium native black sesame seeds with palm jaggery in traditional chekku.',
    features: ['Native Black Sesame', 'Sesamol Antioxidants', 'Body Cooling', 'AGMARK Grade 1'],
    sizes: [
      { label: '500 ml', price: 245, originalPrice: 280, fillPercent: 45 },
      { label: '1 Litre', price: 470, originalPrice: 530, fillPercent: 75 },
      { label: '5 Litres', price: 2250, originalPrice: 2550, fillPercent: 100 }
    ]
  },
  {
    id: 'coconut',
    name: 'Agmark Chekku Coconut Oil',
    shortMobileName: 'Chekku Coconut Oil',
    tamilName: 'அக்மார்க் தேங்காய் எண்ணெய்',
    capColor: 'blue',
    capLabel: 'Blue Seal',
    badgeBg: '#DBEAFE',
    badgeText: '#1E40AF',
    glowColor: 'rgba(37, 99, 235, 0.25)',
    shortDesc: 'Cold-pressed from sun-dried, 100% sulfur-free copra. Crystal-clear edible coconut aroma.',
    features: ['100% Sulfur-Free', 'High Lauric Acid', 'Water-White Pure', 'Culinary & Hair Care'],
    sizes: [
      { label: '500 ml', price: 220, originalPrice: 250, fillPercent: 45 },
      { label: '1 Litre', price: 420, originalPrice: 475, fillPercent: 75 },
      { label: '5 Litres', price: 2000, originalPrice: 2250, fillPercent: 100 }
    ]
  },
  {
    id: 'groundnut',
    name: 'Agmark Chekku Groundnut Oil',
    shortMobileName: 'Chekku Groundnut Oil',
    tamilName: 'அக்மார்க் கடலை எண்ணெய்',
    capColor: 'yellow',
    capLabel: 'Yellow Seal',
    badgeBg: '#FEF3C7',
    badgeText: '#92400E',
    glowColor: 'rgba(217, 119, 6, 0.25)',
    shortDesc: 'Cold-pressed from hand-sorted native peanuts. Perfect for everyday cooking & crispy golden frying.',
    features: ['Native Peanuts', 'Heart-Friendly MUFA', 'Crisp Deep Frying', 'Zero Additives'],
    sizes: [
      { label: '500 ml', price: 210, originalPrice: 240, fillPercent: 45 },
      { label: '1 Litre', price: 395, originalPrice: 440, fillPercent: 75 },
      { label: '5 Litres', price: 1880, originalPrice: 2100, fillPercent: 100 }
    ]
  },
  {
    id: 'trio-bundle',
    name: 'The Malabar Grand Trio Box',
    shortMobileName: 'Grand Trio Box',
    tamilName: 'செக்கு எண்ணெய் முக்கூட்டு',
    capColor: 'green',
    capLabel: 'Heritage Trio',
    badgeBg: '#DCFCE7',
    badgeText: '#166534',
    glowColor: 'rgba(45, 90, 39, 0.25)',
    shortDesc: 'All 3 signature oils: Gingelly + Coconut + Groundnut. Complete pantry health upgrade.',
    features: ['All 3 Oils Included', 'Save ₹185 on Combo', 'Free Priority Delivery', 'Castor Oil Sample'],
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
    <section id="oils" className="py-10 sm:py-20 bg-[#FBF9F5] relative">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with smooth entrance */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-cinzel tracking-[0.25em] uppercase text-[#736555] font-semibold mb-1 sm:mb-2">
            <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D4AF37]" />
            <span>Pure Botanical Extraction</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight mb-1.5 sm:mb-2">
            Our Cold-Pressed Oils
          </h2>
          <p className="text-[11px] sm:text-sm text-[#6C5F51] leading-relaxed">
            Traditionally extracted using slow cold-press chekku methods. Select packaging size to order via WhatsApp.
          </p>
        </motion.div>

        {/* EXACT 2x2 GRID ON BOTH MOBILE AND DESKTOP */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 lg:gap-8">
          {CORE_OILS.map((oil, index) => {
            const currentSizeIdx = selectedSizes[oil.id] ?? 1;
            const currentSize = oil.sizes[currentSizeIdx] || oil.sizes[0];

            return (
              <motion.div
                key={oil.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: [0.32, 0.72, 0, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.2, ease: 'easeOut' } }}
                whileTap={{ scale: 0.99 }}
                className="h-full"
              >
                <SpotlightCard
                  spotlightColor={oil.glowColor}
                  className={`bg-white border transition-all duration-300 p-3 sm:p-7 flex flex-col justify-between h-full shadow-xs hover:shadow-xl relative group rounded-2xl sm:rounded-3xl ${
                    oil.isCombo
                      ? 'border-[#2D5A27]/40 bg-gradient-to-br from-white via-[#F6FBF5] to-white'
                      : 'border-[#E7DFD5] hover:border-[#C5B7A6]'
                  }`}
                >
                  {/* Subtle Ambient Cap Light Bloom */}
                  <div 
                    className="absolute -top-10 -right-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-500"
                    style={{ backgroundColor: oil.glowColor }}
                  />

                  <div>
                    {/* Header Tag & AGMARK Badge */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 sm:gap-2 mb-2 sm:mb-4 select-none">
                      <span
                        className="text-[9px] sm:text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 sm:px-3 sm:py-1 rounded-full flex items-center gap-1 shadow-2xs"
                        style={{ backgroundColor: oil.badgeBg, color: oil.badgeText }}
                      >
                        <span 
                          className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full relative flex items-center justify-center"
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

                      <span className="text-[8px] sm:text-[10px] font-mono font-bold text-[#8C8072] uppercase flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-[#D4AF37]" />
                        <span>AGMARK</span>
                      </span>
                    </div>

                    {/* Animated Bottle Volume & Droplet Visualizer Bar */}
                    <div className="my-1.5 sm:my-3 p-1.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#FAF7F2] border border-[#EAE2D7] flex items-center justify-between select-none">
                      <div className="flex items-center gap-1.5 sm:gap-2.5">
                        <motion.div 
                          key={`icon-${oil.id}-${currentSizeIdx}`}
                          animate={{ 
                            scale: [0.9, 1.08, 1],
                            rotate: [0, -4, 4, 0]
                          }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                          className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl flex items-center justify-center text-white shadow-xs"
                          style={{
                            backgroundColor: 
                              oil.capColor === 'red' ? '#DC2626' :
                              oil.capColor === 'blue' ? '#2563EB' :
                              oil.capColor === 'yellow' ? '#D97706' : '#16A34A'
                          }}
                        >
                          {oil.isCombo ? <Package className="w-4 h-4 sm:w-5 sm:h-5" /> : <Droplets className="w-4 h-4 sm:w-5 sm:h-5" />}
                        </motion.div>
                        <div>
                          <div className="text-[10px] sm:text-xs font-bold text-[#2C241D]">
                            {currentSize.label}
                          </div>
                          <div className="hidden sm:block text-[10px] text-[#7E7163]">
                            Cold-pressed weekly
                          </div>
                        </div>
                      </div>

                      {/* Animated Liquid Meter */}
                      <div className="flex items-center gap-1">
                        <div className="w-10 sm:w-16 h-1.5 sm:h-2 rounded-full bg-[#E5DCD0] overflow-hidden relative">
                          <motion.div
                            className="h-full rounded-full relative overflow-hidden"
                            style={{
                              backgroundColor: 
                                oil.capColor === 'red' ? '#DC2626' :
                                oil.capColor === 'blue' ? '#2563EB' :
                                oil.capColor === 'yellow' ? '#D97706' : '#16A34A'
                            }}
                            initial={{ width: 0 }}
                            animate={{ width: `${currentSize.fillPercent}%` }}
                            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
                          >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent animate-[shimmer_2s_infinite]" />
                          </motion.div>
                        </div>
                        <span className="text-[8px] sm:text-[10px] font-mono font-bold text-[#7A6E61]">
                          {currentSize.fillPercent}%
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-display text-base sm:text-2xl font-bold text-[#2C241D] leading-tight line-clamp-2">
                      <span className="sm:hidden">{oil.shortMobileName}</span>
                      <span className="hidden sm:inline">{oil.name}</span>
                    </h3>
                    <div className="text-[10px] sm:text-xs text-[#7A6D5E] font-serif italic mt-0.5 mb-1.5 sm:mb-2 select-none truncate">
                      {oil.tamilName}
                    </div>

                    <p className="text-[10px] sm:text-xs text-[#554A3E] leading-relaxed line-clamp-2 mb-2 sm:mb-3">
                      {oil.shortDesc}
                    </p>

                    {/* Key Benefits List: 2 items on mobile, 4 on desktop */}
                    <div className="space-y-1 sm:space-y-1.5 mb-3 sm:mb-5">
                      {oil.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[9px] sm:text-xs text-[#4A3E32]">
                          <Check className="w-3 h-3 text-[#2D5A27] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                      {oil.features.slice(2, 4).map((feat, i) => (
                        <div key={i + 2} className="hidden sm:flex items-center gap-1.5 text-xs text-[#4A3E32]">
                          <Check className="w-3 h-3 text-[#2D5A27] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
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
                            className={`relative flex-1 min-h-[32px] sm:min-h-[38px] py-0.5 text-[9px] sm:text-xs font-bold rounded-md sm:rounded-lg transition-colors cursor-pointer text-center z-10 flex items-center justify-center ${
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
                              className="text-lg sm:text-2xl font-black text-[#2C241D]"
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
                          className="text-[8px] sm:text-[10px] font-bold text-[#2D5A27] mt-0.5 inline-block"
                        >
                          Save ₹{currentSize.originalPrice - currentSize.price}
                        </motion.div>
                      </div>

                      <div className="hidden sm:block text-right">
                        <span className="text-[9px] uppercase font-bold text-[#2D5A27] bg-[#DCFCE7] px-2 py-0.5 rounded-full inline-block">
                          {oil.isCombo ? 'Combo' : 'Grade 1'}
                        </span>
                      </div>
                    </div>

                    {/* WhatsApp CTA with Shimmer & Spring */}
                    <a
                      href={getWhatsAppOrderUrl(oil.name, currentSize.label, currentSize.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative overflow-hidden w-full min-h-[40px] sm:min-h-[46px] bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.97] text-white py-2 sm:py-2.5 px-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-normal sm:tracking-wider flex items-center justify-center gap-1 sm:gap-2 shadow-xs transition-[transform,background-color] duration-150 cursor-pointer select-none group/btn"
                    >
                      <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">Order on WhatsApp</span>
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
          className="mt-6 sm:mt-12 rounded-2xl sm:rounded-3xl bg-[#F4EEE5] border border-[#DDD3C5] p-4 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-6"
        >
          <div className="max-w-xl text-center sm:text-left">
            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#2D5A27] bg-[#DCFCE7] px-2 py-0.5 rounded-full inline-block mb-1">
              Brand Family
            </span>
            <h4 className="font-serif-display text-base sm:text-xl font-bold text-[#2C241D]">
              The Malabar Farm Foods
            </h4>
            <p className="text-[10px] sm:text-xs text-[#5D5043] mt-0.5 leading-relaxed">
              Also offering pure cold-pressed castor oil, organic Naatu Sakkarai (country sugar), and traditional farm staples grown without synthetic chemicals.
            </p>
          </div>

          <a
            href="https://wa.me/919876543210?text=Hello%20The%20Malabar%20Oils,%20I%20would%20like%20to%20enquire%20about%20The%20Malabar%20Farm%20Foods%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-h-[40px] sm:min-h-[44px] shrink-0 bg-[#2C241D] hover:bg-[#1A1512] active:scale-95 text-white px-4 py-2 rounded-xl text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center transition-[transform,background-color] duration-150 cursor-pointer select-none"
          >
            Enquire Farm Foods
          </a>
        </motion.div>
      </div>
    </section>
  );
};
