import React from 'react';
import { ShieldCheck, MapPin, MessageCircle, Clock, Award, CheckCircle2, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#14110E] text-[#D8CFBF] pt-14 pb-28 md:pb-12 border-t border-[#2A231C] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Purity Assurance Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pb-10 border-b border-[#2C241D] text-xs">
          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <Award className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <span className="font-bold text-white block">AGMARK Grade-1</span>
              <span className="text-[10px] sm:text-[11px] text-[#A39788]">Certified Purity</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <ShieldCheck className="w-5 h-5 text-[#2D5A27] shrink-0" />
            <div>
              <span className="font-bold text-white block">100% Cold-Pressed</span>
              <span className="text-[10px] sm:text-[11px] text-[#A39788]">Traditional Extraction</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <CheckCircle2 className="w-5 h-5 text-[#2D5A27] shrink-0" />
            <div>
              <span className="font-bold text-white block">Zero Chemicals</span>
              <span className="text-[10px] sm:text-[11px] text-[#A39788]">0% Hexane Solvents</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5">
            <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <span className="font-bold text-white block">Periyakulam Origin</span>
              <span className="text-[10px] sm:text-[11px] text-[#A39788]">Theni District, TN</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 py-10 sm:py-12 border-b border-[#2C241D]">
          {/* Column 1: Brand & Heritage (4 cols) */}
          <div className="sm:col-span-2 lg:col-span-4 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#2D5A27] flex items-center justify-center text-[#D4AF37] shadow-sm">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-display text-xl font-bold tracking-[0.16em] text-white">
                  THE MALABAR OILS
                </span>
                <span className="text-[9px] tracking-[0.28em] uppercase text-[#A39788] font-semibold">
                  Natural Oils & Farm Foods
                </span>
              </div>
            </div>

            <p className="text-xs text-[#AAA090] leading-relaxed">
              Rooted In Tradition. Dedicated to producing unadulterated cold-pressed edible oils using slow traditional extraction. Pure, unrefined, and certified to the highest statutory purity benchmarks.
            </p>

            <div className="pt-1">
              <div className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Packing & Marketing Association:</span>
              </div>
              <p className="text-xs text-[#C5B9A8] leading-relaxed">
                <strong>Barakkath Marketing</strong><br />
                Periyakulam, Theni District,<br />
                Tamil Nadu – 625601, India
              </p>
            </div>

            <div className="pt-1">
              <a
                href="https://wa.me/919876543210?text=Hello%20The%20Malabar%20Oils,%20I%20would%20like%20to%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] active:scale-95 text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Desk: +91 98765 43210</span>
              </a>
            </div>
          </div>

          {/* Column 2: Cold-Pressed Oils (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#FAF7F2] uppercase border-b border-white/10 pb-2">
              Cold-Pressed Oils
            </h4>
            <ul className="space-y-2 text-xs text-[#B5ABA0]">
              <li>
                <a href="#oils" className="hover:text-white transition-colors block">
                  Agmark Gingelly Oil <br />
                  <span className="text-[10px] text-[#7A6E61]">செக்கு நல்லெண்ணெய்</span>
                </a>
              </li>
              <li>
                <a href="#oils" className="hover:text-white transition-colors block">
                  Agmark Coconut Oil <br />
                  <span className="text-[10px] text-[#7A6E61]">செக்கு தேங்காய் எண்ணெய்</span>
                </a>
              </li>
              <li>
                <a href="#oils" className="hover:text-white transition-colors block">
                  Agmark Groundnut Oil <br />
                  <span className="text-[10px] text-[#7A6E61]">செக்கு கடலை எண்ணெய்</span>
                </a>
              </li>
              <li className="pt-1 text-[11px] text-[#D4AF37] font-semibold">
                Sizes: 500ml • 1L • 5L • 15L
              </li>
            </ul>
          </div>

          {/* Column 3: The Malabar Farm Foods (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#FAF7F2] uppercase border-b border-white/10 pb-2">
              The Malabar Farm Foods
            </h4>
            <ul className="space-y-2 text-xs text-[#B5ABA0]">
              <li>
                <a href="#oils" className="hover:text-white transition-colors block">
                  Pure Castor Oil <br />
                  <span className="text-[10px] text-[#7A6E61]">விளக்கெண்ணெய்</span>
                </a>
              </li>
              <li>
                <a href="#oils" className="hover:text-white transition-colors block">
                  Organic Naatu Sakkarai <br />
                  <span className="text-[10px] text-[#7A6E61]">நாட்டு சர்க்கரை (Country Sugar)</span>
                </a>
              </li>
              <li className="text-[#8C8072]">
                Western Ghats Wild Honey
              </li>
              <li className="text-[#8C8072]">
                Traditional Stone-Ground Spices
              </li>
              <li className="text-[#8C8072]">
                Heritage Theni Millets
              </li>
            </ul>
          </div>

          {/* Column 4: Trade & Wholesale Info (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-cinzel text-xs font-bold tracking-[0.2em] text-[#FAF7F2] uppercase border-b border-white/10 pb-2">
              Trade & Dealerships
            </h4>
            <ul className="space-y-2 text-xs text-[#B5ABA0]">
              <li>
                <a href="#trade" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Retailer / Store Stockist</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#trade" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Regional Dealerships</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#trade" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>HoReCa Bulk (15L / Barrels)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </a>
              </li>
              <li>
                <a href="#trade" className="hover:text-white transition-colors flex items-center justify-between">
                  <span>Contract Packaging Enquiries</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </a>
              </li>
              <li className="pt-1 text-[11px] text-[#A39788] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Mon – Sat: 9:00 AM – 7:30 PM IST</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Certification Row */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-[#7F7466] gap-3 text-center md:text-left">
          <div className="space-y-0.5">
            <div>
              © {new Date().getFullYear()} <strong>The Malabar Oils</strong>. All Rights Reserved.
            </div>
            <div className="text-[11px] text-[#695F54]">
              Packed & Marketed by <strong>Barakkath Marketing</strong>, Periyakulam, Tamil Nadu.
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px]">
            <span className="flex items-center gap-1 text-[#D4AF37]">
              <ShieldCheck className="w-3.5 h-3.5" />
              AGMARK Grade-1 Statutory Certified
            </span>
            <span className="text-[#4A4036]">•</span>
            <span>100% Traditional Cold-Pressed</span>
            <span className="text-[#4A4036]">•</span>
            <span>FSSAI Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
