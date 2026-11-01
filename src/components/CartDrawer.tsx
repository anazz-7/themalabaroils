import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';
import { useCart } from '../store/cartStore';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  onProceedToCheckout
}) => {
  const { cart, totalItems, totalAmount, updateCartQuantity, removeFromCart, clearCart } = useCart();

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Drawer Panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <motion.div
            initial={{ transform: 'translateX(100%)' }}
            animate={{ transform: 'translateX(0%)' }}
            exit={{ transform: 'translateX(100%)' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280, mass: 0.9 }}
            className="w-screen max-w-md bg-[#FBF9F5] shadow-2xl border-l border-[#DDD3C5] flex flex-col text-[#2C241D]"
          >
            {/* Drawer Header */}
            <div className="p-4 sm:p-5 bg-[#1C1814] text-white flex items-center justify-between border-b border-[#332A22]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#2C241D] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif-display text-base font-bold tracking-wide">
                    Your Shopping Cart
                  </h3>
                  <span className="text-[10px] text-[#A89C8C] uppercase tracking-wider block">
                    {totalItems} item{totalItems === 1 ? '' : 's'} in cart
                  </span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-white/10 active:scale-95 text-[#D8CFBF] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
              {cart.length === 0 ? (
                <div className="text-center py-16 px-4">
                  <div className="w-16 h-16 rounded-full bg-[#EFE9DF] text-[#7A6E61] flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <ShoppingBag className="w-8 h-8 text-[#A89C8C]" />
                  </div>
                  <h4 className="font-serif-display text-lg font-bold text-[#2C241D]">
                    Your Cart is Empty
                  </h4>
                  <p className="text-xs text-[#7A6E61] mt-1 max-w-xs mx-auto">
                    Add cold-pressed Gingelly, Coconut, Groundnut oils or farm essentials to get started.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-5 px-5 py-2.5 bg-[#2C241D] hover:bg-[#1A1512] active:scale-95 text-white rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer shadow-xs border border-[#D4AF37]/30"
                  >
                    Browse The Oils
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs flex items-center gap-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 object-cover rounded-xl border border-[#DDD3C5] bg-[#F7F4EE] shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h5 className="font-bold text-xs text-[#2C241D] truncate leading-tight">
                          {item.name}
                        </h5>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#A39788] hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#7A6E61] mt-0.5 font-medium">
                        Size: <strong className="text-[#2C241D]">{item.sizeLabel}</strong>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#F2ECE3]">
                        {/* Qty Stepper */}
                        <div className="inline-flex items-center border border-[#DDD3C5] rounded-lg overflow-hidden bg-[#FAF7F2]">
                          <button
                            onClick={() => updateCartQuantity(item.id, -1)}
                            className="px-2 py-0.5 hover:bg-[#EAE2D5] active:scale-90 font-bold text-xs cursor-pointer text-[#4A3E32]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-0.5 text-xs font-bold text-[#2C241D] bg-white min-w-[20px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.id, 1)}
                            className="px-2 py-0.5 hover:bg-[#EAE2D5] active:scale-90 font-bold text-xs cursor-pointer text-[#4A3E32]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="font-mono font-bold text-sm text-[#2C241D]">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Drawer Footer */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 bg-white border-t border-[#E8DFD3] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#7A6E61]">
                  <span>Doorstep Delivery:</span>
                  <span className="font-bold text-green-700">FREE Dispatch</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#2C241D]">Cart Total:</span>
                  <span className="font-black text-2xl text-[#2C241D] font-mono">₹{totalAmount}</span>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full min-h-[48px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white border border-[#D4AF37]/50 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer select-none"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                </button>

                <div className="flex items-center justify-between pt-1 text-[11px] text-[#8C7E70]">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Barakkath Marketing Assurance</span>
                  </span>
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 font-semibold cursor-pointer text-[10px] uppercase"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
};

