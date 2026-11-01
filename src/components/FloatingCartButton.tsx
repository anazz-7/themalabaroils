import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../store/cartStore';

interface FloatingCartButtonProps {
  onOpenCart?: () => void;
}

export const FloatingCartButton: React.FC<FloatingCartButtonProps> = ({ onOpenCart }) => {
  const { totalItems, totalAmount } = useCart();

  if (!onOpenCart) return null;

  return (
    <AnimatePresence>
      <motion.button
        initial={{ scale: 0.8, opacity: 0, y: 10 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 10 }}
        whileTap={{ scale: 0.92 }}
        onClick={onOpenCart}
        className={`fixed bottom-5 right-4 z-40 md:hidden flex items-center shadow-2xl transition-all cursor-pointer ${
          totalItems > 0
            ? 'gap-2 bg-[#1C1814] text-white px-3.5 py-2.5 rounded-full border border-[#D4AF37]/60 shadow-[0_8px_25px_rgba(0,0,0,0.35)]'
            : 'w-11 h-11 justify-center rounded-full bg-[#1C1814] text-white border border-[#D4AF37]/40 shadow-lg'
        }`}
        aria-label="View Shopping Cart"
      >
        <div className="relative flex items-center justify-center">
          <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
          {totalItems > 0 && (
            <motion.span
              key={totalItems}
              initial={{ scale: 0.6 }}
              animate={{ scale: [0.6, 1.25, 1] }}
              transition={{ duration: 0.22 }}
              className="absolute -top-2 -right-2.5 min-w-[17px] h-[17px] px-1 rounded-full bg-[#D4AF37] text-[#1C1814] text-[9.5px] font-black flex items-center justify-center leading-none"
            >
              {totalItems}
            </motion.span>
          )}
        </div>

        {totalItems > 0 && (
          <div className="flex items-center gap-1.5 pl-1 border-l border-white/15">
            <span className="text-[11px] font-mono font-bold text-[#E7DFD5]">₹{totalAmount}</span>
          </div>
        )}
      </motion.button>
    </AnimatePresence>
  );
};

export default FloatingCartButton;

