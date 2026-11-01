import React, { useState, useEffect } from 'react';
import { MessageCircle, Menu, X, Sparkles, Lock } from 'lucide-react';
import { useCatalog } from '../store/catalogStore';

interface NavbarProps {
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { whatsappNumber } = useCatalog();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=Hello%20The%20Malabar%20Oils,%20I%20would%20like%20to%20place%20an%20order.`;

  return (
    <>
      {/* Top Utility Announcement Bar */}
      <div className="bg-[#1C1814] text-[#E7DFD5] text-[9.5px] sm:text-[11px] py-1 sm:py-1.5 px-3 sm:px-4 border-b border-[#2D2620] relative z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-left">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse shrink-0"></span>
            <span className="tracking-wide font-medium truncate sm:hidden">AGMARK Grade-1 Cold-Pressed Oils</span>
            <span className="tracking-wide hidden sm:inline">AGMARK Grade-1 Certified Pure Cold-Pressed Oils</span>
            <span className="text-[#6D6357] hidden md:inline">•</span>
            <span className="text-[#A3998D] hidden md:inline">Traditional Chekku Cold-Pressed (&lt; 38°C)</span>
          </div>
          <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-[#A3998D] shrink-0 font-medium">
            <span className="sm:hidden">Theni Dist, TN</span>
            <span className="hidden sm:inline">Barakkath Marketing • Periyakulam, Theni District, Tamil Nadu</span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header
        className={`sticky top-0 z-40 transition-[background-color,border-color,padding,box-shadow] duration-200 ${
          isScrolled
            ? 'bg-white/92 backdrop-blur-md shadow-xs border-b border-[#E8E1D8] py-2 sm:py-3'
            : 'bg-[#FBF9F5]/92 backdrop-blur-md py-2.5 sm:py-4 border-b border-[#EDE6DC]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Wordmark */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full bg-[#2C241D] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shadow-xs transition-transform duration-200 group-hover:scale-105">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-[0.16em] text-[#2C241D] leading-none">
                  THE MALABAR OILS
                </span>
                <span className="text-[9px] tracking-[0.28em] uppercase text-[#736555] font-semibold mt-1">
                  Natural Oils & Farm Foods
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider uppercase text-[#4A3E33]">
              <a href="#oils" className="hover:text-[#2C241D] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all duration-150">
                The Oils
              </a>
              <a href="#benefits" className="hover:text-[#2C241D] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all duration-150">
                Benefits
              </a>
              <a href="#tradition" className="hover:text-[#2C241D] transition-colors py-1 relative hover:after:w-full after:w-0 after:h-[2px] after:bg-[#D4AF37] after:absolute after:bottom-0 after:left-0 after:transition-all duration-150">
                Purity Standards
              </a>
              <a href="#trade" className="hover:text-[#2C241D] transition-colors py-1 text-[#2C241D] flex items-center gap-1.5 font-bold">
                <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                Trade & Wholesale
              </a>
            </nav>

            {/* Right Action: WhatsApp CTA & Admin Lock */}
            <div className="flex items-center gap-2.5">
              {onOpenAdmin && (
                <button
                  onClick={onOpenAdmin}
                  title="Store Admin Panel (Edit Prices & Products)"
                  className="w-8 h-8 rounded-lg bg-[#FAF7F2] hover:bg-[#EDE5DB] active:scale-95 text-[#736555] hover:text-[#2C241D] border border-[#DDD3C6] flex items-center justify-center transition-all cursor-pointer shadow-xs"
                  aria-label="Admin Settings"
                >
                  <Lock className="w-3.5 h-3.5" />
                </button>
              )}

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 bg-[#2C241D] hover:bg-[#1A1512] active:scale-95 text-white border border-[#D4AF37]/30 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-[transform,background-color] duration-150 shadow-xs cursor-pointer select-none group"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                <span>Order on WhatsApp</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden min-h-[44px] min-w-[44px] p-2 rounded-lg text-[#2C241D] hover:bg-[#EAE3D9] flex items-center justify-center cursor-pointer"
                aria-label="Toggle Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#E8E1D8] bg-[#FBF9F5] px-4 pt-4 pb-6 space-y-3 animate-in fade-in slide-in-from-top-2 duration-150">
            <a
              href="#oils"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold tracking-wider uppercase text-[#2C241D] border-b border-[#EFEAE2]"
            >
              The Cold-Pressed Oils
            </a>
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold tracking-wider uppercase text-[#2C241D] border-b border-[#EFEAE2]"
            >
              Nutritional Benefits
            </a>
            <a
              href="#tradition"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold tracking-wider uppercase text-[#2C241D] border-b border-[#EFEAE2]"
            >
              Purity & Cold-Press Standards
            </a>
            <a
              href="#trade"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-xs font-bold tracking-wider uppercase text-[#2C241D] border-b border-[#EFEAE2]"
            >
              Trade & Wholesale Enquiries
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[44px] flex items-center justify-center gap-2 bg-[#2C241D] text-white py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-xs border border-[#D4AF37]/30"
              >
                <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                <span>Order via WhatsApp</span>
              </a>

              {onOpenAdmin && (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdmin();
                  }}
                  className="w-full py-2 text-center text-[11px] font-bold uppercase tracking-wider text-[#736555] hover:text-[#2C241D] flex items-center justify-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Store Admin Portal</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
