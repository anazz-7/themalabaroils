import React from 'react';
import { FloatingCartButton } from './FloatingCartButton';

interface StickyMobileBarProps {
  onOpenCheckout?: () => void;
  onOpenCart?: () => void;
}

export const StickyMobileBar: React.FC<StickyMobileBarProps> = ({ onOpenCart }) => {
  return <FloatingCartButton onOpenCart={onOpenCart} />;
};

export default StickyMobileBar;
