import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';

interface BenefitPoster {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  tamilTitle: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
  centerImage: string;
  benefits: {
    text: string;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'bottom';
  }[];
}

const BENEFIT_POSTERS: BenefitPoster[] = [
  {
    id: 'gingelly',
    category: 'TRADITIONAL COLD-PRESSED',
    title: 'Gingelly Oil',
    tamilTitle: 'நல்லெண்ணெய் நன்மைகள்',
    subtitle: 'NATIVE BLACK SESAME & PALM JAGGERY',
    bgColor: '#E5A536',
    textColor: '#241A12',
    accentColor: '#1A120B',
    centerImage: '/gingelly-oil.jpg',
    benefits: [
      { text: 'rich in sesamol & calcium', position: 'top-left' },
      { text: 'natural body cooling', position: 'top-right' },
      { text: 'promotes bone density', position: 'bottom-left' },
      { text: 'supports heart health', position: 'bottom-right' },
      { text: 'authentic palm jaggery blend', position: 'bottom' }
    ]
  },
  {
    id: 'coconut',
    category: '100% EDIBLE RAW EXTRACTION',
    title: 'Coconut Oil',
    tamilTitle: 'தேங்காய் எண்ணெய் நன்மைகள்',
    subtitle: 'SUN-DRIED 100% SULFUR-FREE COPRA',
    bgColor: '#E0B574',
    textColor: '#241A12',
    accentColor: '#1C150E',
    centerImage: '/coconut-oil.jpg',
    benefits: [
      { text: 'rich in lauric acid (MCFA)', position: 'top-left' },
      { text: 'natural metabolism booster', position: 'top-right' },
      { text: 'deep skin & scalp care', position: 'bottom-left' },
      { text: 'crystal-clear water-white', position: 'bottom-right' },
      { text: '100% chemical & sulfur-free', position: 'bottom' }
    ]
  },
  {
    id: 'groundnut',
    category: 'EVERYDAY HEALTHY COOKING',
    title: 'Groundnut Oil',
    tamilTitle: 'கடலை எண்ணெய் நன்மைகள்',
    subtitle: 'HAND-SORTED NATIVE PEANUTS',
    bgColor: '#DC9633',
    textColor: '#241A12',
    accentColor: '#1C150E',
    centerImage: '/groundnut-oil.jpg',
    benefits: [
      { text: 'heart-friendly MUFA fats', position: 'top-left' },
      { text: 'high natural vitamin E', position: 'top-right' },
      { text: 'crisp golden frying', position: 'bottom-left' },
      { text: 'zero trans fats or soak', position: 'bottom-right' },
      { text: 'unrefined nutty aroma', position: 'bottom' }
    ]
  },
  {
    id: 'chekku',
    category: 'HERITAGE CHEKKU EXTRACTION',
    title: 'Chekku Press',
    tamilTitle: 'பாரம்பரிய செக்கு முறை',
    subtitle: 'HEAT STRICTLY BELOW 38°C',
    bgColor: '#CDA44C',
    textColor: '#241A12',
    accentColor: '#1C150E',
    centerImage: '/hero-bottles.jpg',
    benefits: [
      { text: 'zero petroleum solvents', position: 'top-left' },
      { text: 'preserves live micro-nutrients', position: 'top-right' },
      { text: 'no bleaching or chemicals', position: 'bottom-left' },
      { text: 'AGMARK Grade-1 certified', position: 'bottom-right' },
      { text: 'fresh weekly batch pressing', position: 'bottom' }
    ]
  }
];

export const BenefitsPosterCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const total = BENEFIT_POSTERS.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  };

  // Auto-play interval
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % total);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, total]);

  return (
    <section
      id="benefits"
      className="py-12 sm:py-20 bg-[#FBF9F5] border-t border-[#E8DFD3] relative overflow-hidden select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Motion Graphics */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-14"
        >
          <div className="inline-flex items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-cinzel tracking-[0.25em] uppercase text-[#7A6E61] font-bold mb-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Botanical Health & Nutrition</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight mb-2">
            Purity You Can Feel
          </h2>
          <p className="text-xs sm:text-sm text-[#7A6D5E] leading-relaxed">
            Discover the time-honored health benefits of slow traditional cold-pressed oils. Swipe through our heritage infographics.
          </p>
        </motion.div>

        {/* 3D Coverflow Poster Stage */}
        <div
          ref={containerRef}
          className="relative h-[480px] sm:h-[560px] flex items-center justify-center perspective-[1200px]"
        >
          {BENEFIT_POSTERS.map((poster, index) => {
            // Determine relative position in circular carousel
            let offset = index - activeIndex;
            if (offset < -Math.floor(total / 2)) offset += total;
            if (offset > Math.floor(total / 2)) offset -= total;

            const isCenter = offset === 0;
            const isLeft = offset === -1 || (offset < 0 && Math.abs(offset) === 1);
            const isRight = offset === 1 || (offset > 0 && Math.abs(offset) === 1);
            const isVisible = Math.abs(offset) <= 1;

            if (!isVisible) return null;

            return (
              <motion.div
                key={poster.id}
                onClick={() => setActiveIndex(index)}
                initial={false}
                animate={{
                  x: offset * (window.innerWidth < 640 ? 210 : 340),
                  scale: isCenter ? 1 : 0.82,
                  rotateY: offset * -18,
                  opacity: isCenter ? 1 : 0.55,
                  zIndex: isCenter ? 30 : 10,
                  filter: isCenter ? 'blur(0px)' : 'blur(1.5px)'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 26,
                  mass: 0.9
                }}
                className={`absolute w-[290px] sm:w-[350px] h-[430px] sm:h-[500px] rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl flex flex-col justify-between cursor-pointer border border-white/20 select-none overflow-hidden transition-shadow duration-300 ${
                  isCenter ? 'ring-2 ring-[#2C241D]/20 shadow-[0_25px_50px_-12px_rgba(44,36,29,0.35)]' : ''
                }`}
                style={{
                  backgroundColor: poster.bgColor,
                  color: poster.textColor
                }}
              >
                {/* Poster Header */}
                <div className="text-center z-10">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] uppercase opacity-85 block mb-1">
                    {poster.category}
                  </span>
                  <h3 className="font-serif-display text-2xl sm:text-3xl font-black leading-tight tracking-tight">
                    <span className="font-serif italic font-normal text-xl sm:text-2xl block mb-0.5">benefits of</span>
                    {poster.title}
                  </h3>
                  <span className="text-[10px] sm:text-xs font-serif italic text-black/75 block mt-0.5">
                    {poster.tamilTitle}
                  </span>
                  <div className="text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.18em] uppercase opacity-75 mt-1.5">
                    {poster.subtitle}
                  </div>
                </div>

                {/* Center Visual Graphic with Floating Motion Graphics */}
                <div className="relative my-auto flex items-center justify-center h-48 sm:h-56">
                  {/* Pulsing Aura */}
                  <div className="absolute w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-white/25 blur-xl pointer-events-none animate-pulse" />

                  {/* Center Bottle Graphic */}
                  <motion.div
                    animate={isCenter ? { y: [0, -5, 0] } : {}}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="relative z-10 w-28 sm:w-36 h-40 sm:h-48 rounded-2xl overflow-hidden shadow-xl border border-black/10 bg-white"
                  >
                    <img
                      src={poster.centerImage}
                      alt={poster.title}
                      className="w-full h-full object-cover object-center select-none"
                    />
                  </motion.div>

                  {/* 5 Infographic Benefit Callouts with Hand-drawn Curved Arrows */}
                  {/* 1. Top Left */}
                  <div className="absolute -top-1 left-0 max-w-[95px] sm:max-w-[110px] text-left z-20">
                    <span className="text-[9px] sm:text-[10.5px] font-bold leading-tight block text-[#241A12]">
                      {poster.benefits[0].text}
                    </span>
                    <svg className="w-8 h-6 text-[#241A12] mt-0.5" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M4 4 Q 16 2, 28 18" />
                      <path d="M22 18 L 28 18 L 26 12" />
                    </svg>
                  </div>

                  {/* 2. Top Right */}
                  <div className="absolute -top-1 right-0 max-w-[95px] sm:max-w-[110px] text-right z-20">
                    <span className="text-[9px] sm:text-[10.5px] font-bold leading-tight block text-[#241A12]">
                      {poster.benefits[1].text}
                    </span>
                    <svg className="w-8 h-6 text-[#241A12] mt-0.5 ml-auto scale-x-[-1]" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M4 4 Q 16 2, 28 18" />
                      <path d="M22 18 L 28 18 L 26 12" />
                    </svg>
                  </div>

                  {/* 3. Bottom Left */}
                  <div className="absolute bottom-2 left-0 max-w-[95px] sm:max-w-[110px] text-left z-20">
                    <svg className="w-8 h-6 text-[#241A12] mb-0.5" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M28 4 Q 16 20, 6 20" />
                      <path d="M12 16 L 6 20 L 12 24" />
                    </svg>
                    <span className="text-[9px] sm:text-[10.5px] font-bold leading-tight block text-[#241A12]">
                      {poster.benefits[2].text}
                    </span>
                  </div>

                  {/* 4. Bottom Right */}
                  <div className="absolute bottom-2 right-0 max-w-[95px] sm:max-w-[110px] text-right z-20">
                    <svg className="w-8 h-6 text-[#241A12] mb-0.5 ml-auto scale-x-[-1]" viewBox="0 0 32 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                      <path d="M28 4 Q 16 20, 6 20" />
                      <path d="M12 16 L 6 20 L 12 24" />
                    </svg>
                    <span className="text-[9px] sm:text-[10.5px] font-bold leading-tight block text-[#241A12]">
                      {poster.benefits[3].text}
                    </span>
                  </div>
                </div>

                {/* Poster Footer: 5th Benefit Stamp */}
                <div className="z-10 text-center border-t border-black/15 pt-2 sm:pt-3">
                  <div className="inline-flex items-center gap-1.5 bg-black/15 backdrop-blur-xs px-3 py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#1C150E]">
                    <ShieldCheck className="w-3 h-3 text-[#1C150E]" />
                    <span>{poster.benefits[4].text}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Carousel Controls (Previous / Next / Dot Indicators) */}
        <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8 select-none">
          <button
            onClick={prevSlide}
            aria-label="Previous Poster"
            className="w-10 h-10 rounded-full bg-[#2C241D] hover:bg-[#1A1512] active:scale-95 text-white flex items-center justify-center transition-all shadow-md cursor-pointer border border-[#D4AF37]/30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {BENEFIT_POSTERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  activeIndex === i ? 'w-8 bg-[#2C241D]' : 'w-2 bg-[#D0C4B4] hover:bg-[#8C7A68]'
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next Poster"
            className="w-10 h-10 rounded-full bg-[#2C241D] hover:bg-[#1A1512] active:scale-95 text-white flex items-center justify-center transition-all shadow-md cursor-pointer border border-[#D4AF37]/30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

