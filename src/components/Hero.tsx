import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MessageCircle, Building2, ShieldCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  // 3D Parallax tilt physics for desktop pointer
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 150, damping: 20 });

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
    <section className="relative overflow-hidden pt-3 pb-8 sm:pt-6 sm:pb-12 bg-gradient-to-b from-[#FBF9F5] via-[#F6F1EA] to-[#FBF9F5]">
      {/* Decorative ambient gradient blooms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] h-[250px] bg-gradient-to-r from-[#D4AF37]/15 via-[#2D5A27]/10 to-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-3 sm:px-6 relative z-10">
        {/* Main Brand Hero Poster */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="rounded-2xl sm:rounded-3xl bg-white border border-[#DDD3C6] p-2 sm:p-4 shadow-lg relative overflow-hidden"
        >
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xs bg-[#FAF7F2]">
            <img
              src="/hero-bottles.jpg"
              alt="The Malabar Oils - Pure Cold-Pressed Gingelly, Coconut & Groundnut Oils"
              className="w-full h-auto object-cover object-center"
              loading="eager"
            />
            {/* Subtle bottom trust bar */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-auto bg-[#1C1814]/90 backdrop-blur-md text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl border border-white/10 flex items-center gap-2 shadow-md select-none">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <div>
                <div className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">AGMARK Grade-1 Certified</div>
                <div className="text-[8.5px] sm:text-[10px] text-[#C2B7A8]">Barakkath Marketing • Periyakulam, TN</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 mt-3 sm:mt-5 select-none">
            <a
              href="https://wa.me/916374848947?text=Hello%20The%20Malabar%20Oils,%20I%20would%20like%20to%20order%20cold-pressed%20oils."
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden w-full sm:w-auto min-h-[42px] sm:min-h-[46px] bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.98] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-[transform,background-color] duration-150 cursor-pointer group/btn"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order via WhatsApp</span>
              <div className="absolute inset-0 -translate-x-full group-hover/btn:animate-[shimmer_1.4s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
            </a>

            <a
              href="#trade"
              className="w-full sm:w-auto min-h-[42px] sm:min-h-[46px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-[transform,background-color] duration-150 cursor-pointer"
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
