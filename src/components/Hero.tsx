import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Leaf, FlaskConical, Droplet, MessageCircle, Building2, ShieldCheck, Award } from 'lucide-react';

export const Hero: React.FC = () => {
  // 3D Parallax tilt physics for desktop pointer
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply on devices with mouse pointer
    if (window.matchMedia('(hover: none)').matches) return;
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:py-20 bg-gradient-to-b from-[#FBF9F5] via-[#F6F1EA] to-[#FBF9F5]">
      {/* Decorative ambient gradient blooms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[250px] bg-gradient-to-r from-[#D4AF37]/15 via-[#2D5A27]/10 to-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Brand Tag with smooth motion */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-4 sm:mb-6"
        >
          <div className="inline-flex items-center gap-2.5 sm:gap-3">
            <span className="h-[1px] w-8 sm:w-12 bg-[#8C8275]"></span>
            <span className="font-cinzel text-[11px] sm:text-xs tracking-[0.3em] text-[#554A3E] uppercase font-semibold">
              THE MALABAR OILS
            </span>
            <span className="h-[1px] w-8 sm:w-12 bg-[#8C8275]"></span>
          </div>
          <div className="text-[10px] sm:text-xs tracking-[0.35em] text-[#7A6E61] uppercase mt-1 font-medium">
            Rooted In Tradition
          </div>
        </motion.div>

        {/* Hero Title & Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
          className="text-center max-w-4xl mx-auto mb-8 sm:mb-10 px-2"
        >
          <h1 className="font-serif-display text-3xl sm:text-5xl lg:text-7xl font-bold text-[#2C241D] tracking-tight leading-[1.12] mb-3">
            Pure Oils, <br className="hidden sm:inline" />
            <span className="italic font-serif">Healthier Families</span>
          </h1>
          <p className="font-serif-display text-base sm:text-2xl text-[#5F5345] italic font-normal tracking-wide">
            Traditional Cold Pressed Oils — Just as Nature Intended
          </p>
        </motion.div>

        {/* 3 Circular Guarantee Badges: Mobile-Optimized Grid */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="grid grid-cols-3 gap-2 sm:gap-6 max-w-xs sm:max-w-md mx-auto mb-8 sm:mb-12 select-none"
        >
          {/* Badge 1: No Adulteration */}
          <motion.div
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -3.5, 0] }}
            transition={{ y: { repeat: Infinity, duration: 3.8, ease: 'easeInOut' } }}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border border-[#3E342B] flex items-center justify-center bg-white/90 shadow-xs hover:shadow-md transition-shadow">
              <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-[#2C241D] stroke-[1.5]" />
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-semibold tracking-wide text-[#2C241D] text-center leading-tight">
              No <br /> Adulteration
            </span>
          </motion.div>

          {/* Badge 2: No Preservatives */}
          <motion.div
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -3.5, 0] }}
            transition={{ y: { repeat: Infinity, duration: 4.2, delay: 0.4, ease: 'easeInOut' } }}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border border-[#3E342B] flex items-center justify-center bg-white/90 shadow-xs hover:shadow-md transition-shadow">
              <FlaskConical className="w-6 h-6 sm:w-8 sm:h-8 text-[#2C241D] stroke-[1.5]" />
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-semibold tracking-wide text-[#2C241D] text-center leading-tight">
              No <br /> Preservatives
            </span>
          </motion.div>

          {/* Badge 3: No Chemicals */}
          <motion.div
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{ y: [0, -3.5, 0] }}
            transition={{ y: { repeat: Infinity, duration: 4.0, delay: 0.8, ease: 'easeInOut' } }}
            className="flex flex-col items-center cursor-pointer"
          >
            <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full border border-[#3E342B] flex items-center justify-center bg-white/90 shadow-xs hover:shadow-md transition-shadow">
              <Droplet className="w-6 h-6 sm:w-8 sm:h-8 text-[#2C241D] stroke-[1.5]" />
            </div>
            <span className="mt-2 text-[11px] sm:text-xs font-semibold tracking-wide text-[#2C241D] text-center leading-tight">
              No <br /> Chemicals
            </span>
          </motion.div>
        </motion.div>

        {/* Hero Visual Container */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
          className="max-w-4xl mx-auto rounded-3xl bg-[#F0EAE1]/90 border border-[#DDD3C6] p-3 sm:p-7 shadow-xl relative"
        >
          {/* Floating Motion Badges (Visible on desktop/tablet) */}
          <div className="hidden md:flex absolute -top-4 -left-4 z-20 items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#DDD3C5] shadow-lg animate-float-slow select-none">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs font-bold text-[#2C241D]">AGMARK Grade-1 Certified</span>
          </div>

          <div className="hidden md:flex absolute -top-4 -right-4 z-20 items-center gap-2 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#DDD3C5] shadow-lg animate-float-reverse select-none">
            <ShieldCheck className="w-4 h-4 text-[#2D5A27]" />
            <span className="text-xs font-bold text-[#2D5A27]">100% Cold-Pressed</span>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-md bg-white">
            <img
              src="/hero-bottles.jpg"
              alt="The Malabar Oils - Gingelly, Coconut & Groundnut Oils"
              className="w-full h-auto object-cover object-center"
              loading="eager"
            />
            
            {/* Trust overlay badge */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-5 sm:left-5 sm:right-auto bg-[#1C1814]/90 backdrop-blur-md text-white px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl border border-white/10 flex items-center gap-2.5 shadow-lg select-none">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] shrink-0" />
              <div>
                <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white">AGMARK Grade-1 Certified</div>
                <div className="text-[9px] sm:text-[10px] text-[#C2B7A8]">Barakkath Marketing, Periyakulam, Tamil Nadu</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6 sm:mt-8 select-none">
            <a
              href="https://wa.me/916374848947?text=Hello%20The%20Malabar%20Oils,%20I%20would%20like%20to%20order%20cold-pressed%20oils."
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden w-full sm:w-auto min-h-[48px] bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.98] text-white px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-[transform,background-color] duration-150 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
            </a>

            <a
              href="#trade"
              className="w-full sm:w-auto min-h-[48px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white px-7 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-[transform,background-color] duration-150 cursor-pointer"
            >
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Trade & Dealership Enquiries</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
