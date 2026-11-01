import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Leaf, FlaskConical, Droplet, MessageCircle, Building2, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useCatalog } from '../store/catalogStore';

interface HeroProps {
  onOpenCheckout?: () => void;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
};

const wordRevealVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.23, 1, 0.32, 1]
    }
  }
};

export const Hero: React.FC<HeroProps> = ({ onOpenCheckout }) => {
  const { whatsappNumber } = useCatalog();

  return (
    <section className="relative overflow-hidden pt-6 pb-10 sm:pt-12 sm:pb-16 lg:py-20 bg-gradient-to-b from-[#FBF9F5] via-[#F6F1EA] to-[#FBF9F5]">
      {/* Decorative ambient gradient blooms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[250px] bg-gradient-to-r from-[#D4AF37]/15 via-[#8C6D3B]/10 to-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {/* Top Brand Tag with Smooth Kinetic Reveal */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
          className="mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2.5 sm:gap-3">
            <span className="h-[1px] w-8 sm:w-12 bg-[#8C8275]" />
            <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.3em] text-[#554A3E] uppercase font-semibold">
              THE MALABAR OILS
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-[#8C8275]" />
          </div>
          <div className="text-[10px] sm:text-xs tracking-[0.35em] text-[#7A6E61] uppercase mt-1 font-medium">
            Rooted In Tradition
          </div>
        </motion.div>

        {/* Hero Title with Kinetic Staggered Word Reveal */}
        <div className="max-w-3xl mx-auto mb-6 sm:mb-8 px-2 overflow-hidden">
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-serif-display text-3xl sm:text-5xl lg:text-7xl font-bold text-[#2C241D] tracking-tight leading-[1.12] mb-3 flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4"
          >
            <motion.span variants={wordRevealVariants} className="inline-block">
              Pure
            </motion.span>
            <motion.span variants={wordRevealVariants} className="inline-block">
              Oils,
            </motion.span>
            <br className="w-full hidden sm:block" />
            <motion.span
              variants={wordRevealVariants}
              className="italic font-serif bg-gradient-to-r from-[#2C241D] via-[#634832] to-[#2C241D] bg-clip-text text-transparent inline-block"
            >
              Healthier
            </motion.span>
            <motion.span
              variants={wordRevealVariants}
              className="italic font-serif bg-gradient-to-r from-[#2C241D] via-[#634832] to-[#2C241D] bg-clip-text text-transparent inline-block"
            >
              Families
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className="font-serif-display text-base sm:text-2xl text-[#5F5345] italic font-normal tracking-wide"
          >
            Traditional Cold Pressed Oils — Just as Nature Intended
          </motion.p>
        </div>

        {/* 3 Circular Guarantee Badges with Fluid GPU Composite Floating */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-3 gap-2 sm:gap-6 max-w-xs sm:max-w-md mx-auto mb-8 sm:mb-10 select-none"
        >
          {/* Badge 1: No Adulteration */}
          <div className="flex flex-col items-center cursor-pointer animate-float-slow">
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border border-[#3E342B] flex items-center justify-center bg-white/90 shadow-xs hover:shadow-md transition-shadow">
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-[#2C241D] stroke-[1.5]" />
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-semibold tracking-wide text-[#2C241D] text-center leading-tight">
              No <br /> Adulteration
            </span>
          </div>

          {/* Badge 2: No Preservatives */}
          <div className="flex flex-col items-center cursor-pointer animate-float-reverse">
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border border-[#3E342B] flex items-center justify-center bg-white/90 shadow-xs hover:shadow-md transition-shadow">
              <FlaskConical className="w-6 h-6 sm:w-8 sm:h-8 text-[#2C241D] stroke-[1.5]" />
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-semibold tracking-wide text-[#2C241D] text-center leading-tight">
              No <br /> Preservatives
            </span>
          </div>

          {/* Badge 3: No Chemicals */}
          <div className="flex flex-col items-center cursor-pointer animate-float-slow">
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border border-[#3E342B] flex items-center justify-center bg-white/90 shadow-xs hover:shadow-md transition-shadow">
              <Droplet className="w-6 h-6 sm:w-8 sm:h-8 text-[#2C241D] stroke-[1.5]" />
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-semibold tracking-wide text-[#2C241D] text-center leading-tight">
              No <br /> Chemicals
            </span>
          </div>
        </motion.div>

        {/* Action CTAs in Dark Brown Luxury Palette */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 select-none"
        >
          {onOpenCheckout ? (
            <button
              onClick={onOpenCheckout}
              className="relative overflow-hidden w-full sm:w-auto min-h-[46px] sm:min-h-[50px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white px-7 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-[transform,background-color] duration-150 cursor-pointer group/btn border border-[#D4AF37]/35"
            >
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <span>Order & Checkout Now</span>
              {/* Sweeping Champagne Light Glint */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent pointer-events-none" />
            </button>
          ) : (
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hello%20The%20Malabar%20Oils,%20I%20would%20like%20to%20order%20cold-pressed%20oils.`}
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden w-full sm:w-auto min-h-[46px] sm:min-h-[50px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white px-7 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-[transform,background-color] duration-150 cursor-pointer group/btn border border-[#D4AF37]/35"
            >
              <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
              <span>Order via WhatsApp</span>
              {/* Sweeping Champagne Light Glint */}
              <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-[#D4AF37]/25 to-transparent pointer-events-none" />
            </a>
          )}

          <a
            href="#trade"
            className="w-full sm:w-auto min-h-[46px] sm:min-h-[50px] bg-[#FAF7F2] hover:bg-[#F2ECE3] active:scale-[0.98] text-[#2C241D] border border-[#DDD3C5] px-7 py-3 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-[transform,background-color] duration-150 cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-[#D4AF37]" />
            <span>Trade & Dealership Enquiries</span>
          </a>
        </motion.div>

        {/* Minimal Bottom Trust Footnote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.45 }}
          className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-[10px] sm:text-xs text-[#7A6E61]"
        >
          <span className="flex items-center gap-1 font-semibold text-[#4A3B2C]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
            AGMARK Grade-1 Certified
          </span>
          <span>•</span>
          <span>Barakkath Marketing, Periyakulam, Tamil Nadu</span>
          <span>•</span>
          <span className="text-[#92400E] font-semibold">100% Traditional Cold-Pressed</span>
        </motion.div>
      </div>
    </section>
  );
};
