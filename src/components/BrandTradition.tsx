import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, MapPin, CheckCircle2, MessageCircle } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const BrandTradition: React.FC = () => {
  return (
    <section id="tradition" className="py-14 sm:py-20 bg-white border-t border-[#E8DFD3] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-7 space-y-4 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.25em] uppercase text-[#736555] font-semibold">
              <span>Pure & Traditional</span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] tracking-tight leading-tight">
              Rooted in Tradition, <br />
              <span className="italic font-serif">Cold-Pressed for Your Family</span>
            </h2>

            <p className="text-xs sm:text-base text-[#5A4E41] leading-relaxed">
              At <strong>The Malabar Oils</strong>, every bottle of oil is extracted using traditional cold-pressed methods without chemicals, preservatives, or artificial additives. Pure, unrefined, and certified with statutory <strong>AGMARK Grade-1</strong> assurance.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E0D4]">
                <Award className="w-5 h-5 text-[#D4AF37] mb-1.5" />
                <h4 className="font-serif-display text-sm sm:text-base font-bold text-[#2C241D]">
                  AGMARK Grade-1
                </h4>
                <p className="text-[11px] text-[#685A4C] mt-0.5">
                  100% single-source seed purity with zero adulteration.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FBF9F5] border border-[#E8E0D4]">
                <ShieldCheck className="w-5 h-5 text-[#2D5A27] mb-1.5" />
                <h4 className="font-serif-display text-sm sm:text-base font-bold text-[#2C241D]">
                  Zero Chemicals
                </h4>
                <p className="text-[11px] text-[#685A4C] mt-0.5">
                  No petroleum hexane solvents, synthetic colors, or bleaching.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Trust Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-5"
          >
            <SpotlightCard
              spotlightColor="rgba(212, 175, 55, 0.12)"
              className="bg-[#1C1814] text-white p-6 sm:p-8 shadow-xl relative"
            >
              <div className="w-10 h-10 rounded-xl bg-[#2D5A27] text-[#D4AF37] flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>

              <span className="text-[10px] font-cinzel text-[#D4AF37] uppercase tracking-[0.25em] font-semibold block mb-1">
                Business Association
              </span>

              <h3 className="font-serif-display text-xl sm:text-2xl font-bold mb-2 text-white">
                Barakkath Marketing
              </h3>

              <p className="text-xs text-[#D3C9BD] leading-relaxed mb-4">
                Hygienically packed and marketed directly from 44, Palliyasal Street, Vadagarai, Periyakulam, Theni District, Tamil Nadu (FSSAI: 22426472000074). Fast delivery across India.
              </p>

              <div className="space-y-2 pt-3 border-t border-white/10 text-xs text-[#EDE5DB] mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A27] shrink-0" />
                  <span>Fresh weekly batch pressing</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#2D5A27] shrink-0" />
                  <span>Retail, wholesale & bulk supply</span>
                </div>
              </div>

              <a
                href="https://wa.me/916374848947?text=Hello%20The%20Malabar%20Oils,%20I%20would%20like%20to%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.98] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-[transform,background-color] duration-150 cursor-pointer select-none"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Barakkath Marketing</span>
              </a>
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
