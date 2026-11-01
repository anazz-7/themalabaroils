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
import { CartDrawer } from './components/CartDrawer';

export const App: React.FC = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState<CheckoutItemInitial | null>(null);

  const handleOpenCheckout = (item?: CheckoutItemInitial) => {
    setCheckoutItem(item || null);
    setCheckoutOpen(true);
  };

  const handleOpenCart = () => {
    setCartOpen(true);
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans-modern text-[#2C241D] bg-[#FBF9F5] selection:bg-[#2C241D] selection:text-white overflow-x-hidden">
      {/* Ambient background particles VFX */}
      <AmbientBackgroundVFX />

      {/* Minimal Navigation with Admin Portal Access, Cart Drawer & Direct Checkout */}
      <Navbar
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenCheckout={() => handleOpenCheckout()}
        onOpenCart={handleOpenCart}
      />

      {/* Clean Brand Poster Hero & Direct CTAs with Kinetic Motion Typography */}
      <Hero onOpenCheckout={() => handleOpenCheckout()} />

      {/* 3D Coverflow Benefits Poster Carousel (Seamless Cutout, Warm Card Match) */}
      <BenefitsPosterCarousel />

      {/* Minimal Product Showcase (2x2 / 4x2 Grid, Add to Cart & Buy Now Dual Action) */}
      <ProductShowcase
        onOpenCheckout={(item) => handleOpenCheckout(item)}
        onOpenCart={handleOpenCart}
      />

      {/* Brand Tradition & Barakkath Marketing Association */}
      <BrandTradition />

      {/* Trade & Bulk Enquiries for Retailers / Wholesale */}
      <TradeEnquiries />

      {/* Clean Footer with Admin Link */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Mobile-First Sticky Bottom Action Bar with Quick Cart & Checkout */}
      <StickyMobileBar
        onOpenCheckout={() => handleOpenCheckout()}
        onOpenCart={handleOpenCart}
      />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onProceedToCheckout={() => {
          setCartOpen(false);
          setCheckoutItem(null); // Full cart checkout
          setCheckoutOpen(true);
        }}
      />

      {/* Store Owner Admin Panel Modal (Passkey: 1977, Orders Dashboard, Product Delete & Price Manager) */}
      <AdminPanel isOpen={adminOpen} onClose={() => setAdminOpen(false)} />

      {/* Direct Factory Order Checkout Modal (Supports Single Items & Full Cart Orders) */}
      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        initialItem={checkoutItem}
      />
    </div>
  );
};

export default App;
