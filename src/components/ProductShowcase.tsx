import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Check, Sparkles } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

interface OilItem {
  id: string;
  name: string;
  tamilName: string;
  capColor: 'red' | 'blue' | 'yellow';
  capLabel: string;
  badgeBg: string;
  badgeText: string;
  shortDesc: string;
  features: string[];
  sizes: {
    label: string;
    price: number;
    originalPrice: number;
  }[];
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
    shortDesc: 'Slow-pressed from premium native black sesame seeds blended with authentic palm jaggery in traditional chekku.',
    features: ['100% Native Black Sesame', 'Rich in Sesamol Antioxidants', 'Traditional Body Cooling', 'AGMARK Grade 1 Certified'],
    sizes: [
      { label: '500 ml', price: 245, originalPrice: 280 },
      { label: '1 Litre', price: 470, originalPrice: 530 },
      { label: '5 Litres', price: 2250, originalPrice: 2550 }
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
    shortDesc: 'Cold-pressed from sun-dried, 100% sulfur-free copra. Crystal-clear edible oil with pure coconut fragrance.',
    features: ['100% Sulfur-Free Copra', 'Rich in Lauric Acid', 'Unrefined & Water-White', 'Culinary & Hair Nourishment'],
    sizes: [
      { label: '500 ml', price: 220, originalPrice: 250 },
      { label: '1 Litre', price: 420, originalPrice: 475 },
      { label: '5 Litres', price: 2000, originalPrice: 2250 }
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
    shortDesc: 'Cold-pressed from hand-sorted native peanuts. Perfect for everyday South Indian cooking and crispy frying.',
    features: ['Hand-Sorted Native Peanuts', 'Heart-Friendly MUFA Fats', 'Crisp Frying & Less Oil Soak', 'Zero Trans Fats or Additives'],
    sizes: [
      { label: '500 ml', price: 210, originalPrice: 240 },
      { label: '1 Litre', price: 395, originalPrice: 440 },
      { label: '5 Litres', price: 1880, originalPrice: 2100 }
    ]
  }
];

export const ProductShowcase: React.FC = () => {
  const [selectedSizes, setSelectedSizes] = useState<{ [key: string]: number }>({
    gingelly: 1, // default 1 Litre
    coconut: 1,
    groundnut: 1
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
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.25em] uppercase text-[#736555] font-semibold mb-2">
            <span>Pure Botanical Extraction</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight mb-2">
            Our Cold-Pressed Oils
          </h2>
          <p className="text-xs sm:text-sm text-[#6C5F51] leading-relaxed">
            Traditionally extracted using slow cold-press chekku methods. Select bottle size and order directly via WhatsApp.
          </p>
        </motion.div>

        {/* 3 Core Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {CORE_OILS.map((oil, index) => {
            const currentSizeIdx = selectedSizes[oil.id] ?? 1;
            const currentSize = oil.sizes[currentSizeIdx] || oil.sizes[0];

            return (
              <motion.div
                key={oil.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.4, delay: index * 0.08, ease: [0.32, 0.72, 0, 1] }}
              >
                <SpotlightCard
                  spotlightColor={
                    oil.capColor === 'red' ? 'rgba(220, 38, 38, 0.08)' :
                    oil.capColor === 'blue' ? 'rgba(37, 99, 235, 0.08)' : 'rgba(217, 119, 6, 0.08)'
                  }
                  className="bg-white border border-[#E7DFD5] hover:border-[#C5B7A6] shadow-sm hover:shadow-lg p-5 sm:p-7 flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center justify-between mb-3 select-none">
                      <span
                        className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1.5"
                        style={{ backgroundColor: oil.badgeBg, color: oil.badgeText }}
                      >
                        <span 
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: 
                              oil.capColor === 'red' ? '#DC2626' :
                              oil.capColor === 'blue' ? '#2563EB' : '#D97706'
                          }}
                        ></span>
                        <span>{oil.capLabel}</span>
                      </span>
                      <span className="text-[10px] font-mono font-bold text-[#8C8072] uppercase">
                        AGMARK Grade 1
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2C241D] leading-snug">
                      {oil.name}
                    </h3>
                    <div className="text-xs text-[#7A6D5E] font-serif italic mt-0.5 mb-2.5 select-none">
                      {oil.tamilName}
                    </div>

                    <p className="text-xs text-[#554A3E] leading-relaxed mb-4">
                      {oil.shortDesc}
                    </p>

                    {/* Key Benefits List */}
                    <div className="space-y-1.5 mb-5">
                      {oil.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#4A3E32]">
                          <Check className="w-3.5 h-3.5 text-[#2D5A27] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Packaging Size Selector */}
                  <div className="pt-3.5 border-t border-[#EFEAE2]">
                    <div className="text-[11px] font-semibold text-[#7A6E61] mb-2 flex justify-between select-none">
                      <span>Select Size:</span>
                      <span className="font-bold text-[#2C241D]">{currentSize.label}</span>
                    </div>

                    {/* Interactive Size Pills with Touch Targets */}
                    <div className="flex gap-1.5 p-1 bg-[#F7F3EC] rounded-xl mb-4 select-none">
                      {oil.sizes.map((sz, szIdx) => {
                        const isSelected = currentSizeIdx === szIdx;
                        return (
                          <button
                            key={sz.label}
                            onClick={() => handleSelectSize(oil.id, szIdx)}
                            className={`relative flex-1 min-h-[38px] py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer text-center z-10 flex items-center justify-center ${
                              isSelected ? 'text-white' : 'text-[#6C5F51] hover:text-[#2C241D]'
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                layoutId={`activeSize-${oil.id}`}
                                className="absolute inset-0 bg-[#2C241D] rounded-lg -z-10 shadow-xs"
                                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                              />
                            )}
                            <span>{sz.label}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Animated Price calculation */}
                    <div className="flex items-center justify-between mb-3 select-none">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={currentSize.price}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              transition={{ duration: 0.12 }}
                              className="text-2xl font-black text-[#2C241D]"
                            >
                              ₹{currentSize.price}
                            </motion.span>
                          </AnimatePresence>
                          <span className="text-xs text-[#9B8F80] line-through">
                            ₹{currentSize.originalPrice}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold text-[#2D5A27]">
                          Save ₹{currentSize.originalPrice - currentSize.price}
                        </span>
                      </div>

                      <span className="text-[10px] uppercase font-bold text-[#7E7163] bg-[#EFEAE2] px-2 py-0.5 rounded">
                        Food Grade
                      </span>
                    </div>

                    <a
                      href={getWhatsAppOrderUrl(oil.name, currentSize.label, currentSize.price)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full min-h-[48px] bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.98] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-[transform,background-color] duration-150 cursor-pointer select-none"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Order on WhatsApp</span>
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
