import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BenefitsPosterCarousel } from './components/BenefitsPosterCarousel';
import { ProductShowcase } from './components/ProductShowcase';
import { BrandTradition } from './components/BrandTradition';
import { TradeEnquiries } from './components/TradeEnquiries';
import { Footer } from './components/Footer';
import { StickyMobileBar } from './components/StickyMobileBar';
import { AmbientBackgroundVFX } from './components/AmbientBackgroundVFX';
import { AdminPanel } from './components/AdminPanel';

export const App: React.FC = () => {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col font-sans-modern text-[#2C241D] bg-[#FBF9F5] selection:bg-[#2C241D] selection:text-white overflow-x-hidden">
      {/* Ambient background particles VFX */}
      <AmbientBackgroundVFX />

      {/* Minimal Navigation with Admin Portal Access */}
      <Navbar onOpenAdmin={() => setAdminOpen(true)} />

      {/* Clean Brand Poster Hero & Direct CTAs */}
      <Hero />

      {/* 3D Coverflow Benefits Poster Carousel (Exactly like reference) */}
      <BenefitsPosterCarousel />

      {/* Minimal Product Showcase (2x2 Grid, Dynamic Pricing, Dark Brown CTAs) */}
      <ProductShowcase />

      {/* Brand Tradition & Barakkath Marketing Association */}
      <BrandTradition />

      {/* Trade & Bulk Enquiries for Retailers / Wholesale */}
      <TradeEnquiries />

      {/* Clean Footer with Admin Link */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Mobile-First Sticky Bottom Action Bar */}
      <StickyMobileBar />

      {/* Store Owner Admin Panel Modal */}
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />
    </div>
  );
};

export default App;
