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
import { CheckoutModal, CheckoutItemInitial } from './components/CheckoutModal';

export const App: React.FC = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItemInitial | null>(null);

  const handleOpenCheckout = (item?: CheckoutItemInitial) => {
    setCheckoutItem(item || null);
    setCheckoutOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans-modern text-[#2C241D] bg-[#FBF9F5] selection:bg-[#2C241D] selection:text-white overflow-x-hidden">
      {/* Ambient background particles VFX */}
      <AmbientBackgroundVFX />

      {/* Minimal Navigation with Admin Portal Access & Checkout */}
      <Navbar
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenCheckout={() => handleOpenCheckout()}
      />

      {/* Clean Brand Poster Hero & Direct CTAs */}
      <Hero onOpenCheckout={() => handleOpenCheckout()} />

      {/* 3D Coverflow Benefits Poster Carousel (Seamless Cutout, Warm Card Match) */}
      <BenefitsPosterCarousel />

      {/* Minimal Product Showcase (2x2 Grid, Transparent Bottle Cutouts, Live Checkout) */}
      <ProductShowcase onOpenCheckout={(item) => handleOpenCheckout(item)} />

      {/* Brand Tradition & Barakkath Marketing Association */}
      <BrandTradition />

      {/* Trade & Bulk Enquiries for Retailers / Wholesale */}
      <TradeEnquiries />

      {/* Clean Footer with Admin Link */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Mobile-First Sticky Bottom Action Bar with Checkout */}
      <StickyMobileBar onOpenCheckout={() => handleOpenCheckout()} />

      {/* Store Owner Admin Panel Modal (Passkey: 1977, Orders Dashboard, Price Manager) */}
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />

      {/* Direct Factory Order Checkout Modal (Collects Orders & Routes to WhatsApp) */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        initialItem={checkoutItem}
      />
    </div>
  );
};

export default App;
