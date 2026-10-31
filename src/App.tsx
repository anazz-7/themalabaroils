import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InfiniteMarquee } from './components/InfiniteMarquee';
import { ProductShowcase } from './components/ProductShowcase';
import { BrandTradition } from './components/BrandTradition';
import { TradeEnquiries } from './components/TradeEnquiries';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { AmbientBackgroundVFX } from './components/AmbientBackgroundVFX';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen flex flex-col font-sans-modern text-[#2C241D] bg-[#FBF9F5] selection:bg-[#2D5A27] selection:text-white overflow-x-hidden">
      {/* Ambient background particles VFX */}
      <AmbientBackgroundVFX />

      {/* Minimal Navigation */}
      <Navbar />

      {/* Hero with Brand Poster, 3 Emblems & WhatsApp CTA */}
      <Hero />

      {/* Infinite Horizontal Running Ribbon */}
      <InfiniteMarquee />

      {/* Minimal Product Showcase with Interactive Size Springs */}
      <ProductShowcase />

      {/* Brand Tradition & Barakkath Marketing Association */}
      <BrandTradition />

      {/* Trade & Bulk Enquiries for Retailers / Wholesale */}
      <TradeEnquiries />

      {/* Comprehensive Extra Content Footer */}
      <Footer />

      {/* Mobile-First Sticky Bottom Action Bar (One-Tap WhatsApp & Trade) */}
      <StickyMobileBar />
    </div>
  );
};

export default App;
