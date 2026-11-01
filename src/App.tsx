import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OfferProductBlock } from './components/OfferProductBlock';
import { ProductShowcase } from './components/ProductShowcase';
import { BrandTradition } from './components/BrandTradition';
import { B2BTradeModal } from './components/B2BTradeModal';
import { OfferAdPopup } from './components/OfferAdPopup';
import { Footer } from './components/Footer';
import { FloatingCartButton } from './components/FloatingCartButton';
import { AmbientBackgroundVFX } from './components/AmbientBackgroundVFX';
import { AdminPanel } from './components/AdminPanel';
import { CheckoutModal, CheckoutItemInitial } from './components/CheckoutModal';
import { CartDrawer } from './components/CartDrawer';

export const App: React.FC = () => {
  const [adminOpen, setAdminOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [b2bOpen, setB2bOpen] = useState(false);
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

      {/* Sticky Announcement Bar + Navigation with Admin Portal Access & Cart */}
      <Navbar
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenCheckout={() => handleOpenCheckout()}
        onOpenCart={handleOpenCart}
        onOpenB2B={() => setB2bOpen(true)}
      />

      {/* Clean Brand Poster Hero & Direct CTAs with Kinetic Motion Typography */}
      <Hero onOpenCheckout={() => handleOpenCheckout()} />

      {/* High-Converting Special Offer Product Block (₹380 Worth Coconut Oil 1L Now Just ₹285) */}
      <OfferProductBlock
        onOpenCheckout={(item) => handleOpenCheckout(item)}
        onOpenCart={handleOpenCart}
      />

      {/* Product Showcase (Swipeable Full-Size Bottle Carousel on Mobile, 4x2 Grid on Desktop) */}
      <ProductShowcase
        onOpenCheckout={(item) => handleOpenCheckout(item)}
        onOpenCart={handleOpenCart}
      />

      {/* Brand Tradition & Barakkath Marketing Association */}
      <BrandTradition />

      {/* Clean Footer with Admin & B2B Links */}
      <Footer
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenB2B={() => setB2bOpen(true)}
      />

      {/* Minimal Floating Cart Button on Mobile */}
      <FloatingCartButton onOpenCart={handleOpenCart} />

      {/* Right Screen Small Button + Modal for B2B & Distribution Enquiries */}
      <B2BTradeModal
        isOpen={b2bOpen}
        onOpen={() => setB2bOpen(true)}
        onClose={() => setB2bOpen(false)}
      />

      {/* High-Converting Offer Ad Pop-up (₹380 -> ₹285 Coconut Oil 1L) */}
      <OfferAdPopup
        onOpenCheckout={(item) => handleOpenCheckout(item)}
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
