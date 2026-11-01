import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Truck, MessageCircle, MapPin, Phone, User, Package, ArrowRight, Sparkles } from 'lucide-react';
import { useCatalog, CatalogProduct } from '../store/catalogStore';
import { useOrders } from '../store/orderStore';

export interface CheckoutItemInitial {
  id: string;
  name: string;
  sizeLabel: string;
  price: number;
  image: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialItem?: CheckoutItemInitial | null;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialItem
}) => {
  const { catalog, whatsappNumber } = useCatalog();
  const { createOrder } = useOrders();

  // Selected product & size
  const [selectedProductId, setSelectedProductId] = useState<string>('gingelly');
  const [selectedSizeLabel, setSelectedSizeLabel] = useState<string>('1 Litre');
  const [quantity, setQuantity] = useState<number>(1);

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'UPI / WhatsApp'>('Cash on Delivery');

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string | null>(null);

  // Sync initial product if passed
  useEffect(() => {
    if (initialItem) {
      setSelectedProductId(initialItem.id);
      setSelectedSizeLabel(initialItem.sizeLabel);
      setQuantity(1);
    }
  }, [initialItem, isOpen]);

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

  // Find active product from catalog
  const currentProduct = catalog.find((p) => p.id === selectedProductId) || catalog[0];
  const activeSize = currentProduct.sizes.find((s) => s.label === selectedSizeLabel) || currentProduct.sizes[1] || currentProduct.sizes[0];
  const unitPrice = activeSize.price;
  const totalPrice = unitPrice * quantity;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      alert('Please fill in all delivery details.');
      return;
    }

    setIsSubmitting(true);

    const newOrder = createOrder({
      customerName: customerName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      notes: notes.trim(),
      paymentMethod,
      totalAmount: totalPrice,
      items: [
        {
          productId: currentProduct.id,
          productName: currentProduct.name,
          sizeLabel: activeSize.label,
          price: unitPrice,
          quantity
        }
      ]
    });

    setPlacedOrderId(newOrder.id);
    setIsSubmitting(false);

    // Prepare WhatsApp Message
    const whatsappMsg = `🛍️ *NEW ORDER PLACED - ${newOrder.id}*\n\n` +
      `Hello The Malabar Oils / Barakkath Marketing,\n` +
      `I have placed an order on your website:\n\n` +
      `• *Order ID*: ${newOrder.id}\n` +
      `• *Customer*: ${newOrder.customerName}\n` +
      `• *Phone*: ${newOrder.phone}\n` +
      `• *Product*: ${currentProduct.name} (${activeSize.label}) x ${quantity}\n` +
      `• *Total*: ₹${totalPrice}\n` +
      `• *Payment*: ${paymentMethod}\n` +
      `• *Delivery Address*: ${address.trim()}, ${city.trim()} - ${pincode.trim()}\n` +
      (notes.trim() ? `• *Note*: ${notes.trim()}\n` : '') +
      `\nPlease confirm order dispatch and delivery date!`;

    const redirectUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

    // Optional quick redirect after delay or user click
    setTimeout(() => {
      window.open(redirectUrl, '_blank');
    }, 1200);
  };

  const handleReset = () => {
    setPlacedOrderId(null);
    setCustomerName('');
    setPhone('');
    setAddress('');
    setCity('');
    setPincode('');
    setNotes('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FBF9F5] border border-[#DDD3C6] shadow-2xl flex flex-col text-[#2C241D]"
        >
          {/* Header */}
          <div className="bg-[#1C1814] text-white px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between border-b border-[#332A22]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2C241D] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center shadow-xs">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-display text-base sm:text-lg font-bold tracking-wide">
                  The Malabar Oils — Checkout
                </h3>
                <p className="text-[10px] text-[#A89C8C] tracking-wider uppercase">
                  Direct Factory Order • Barakkath Marketing
                </p>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="w-8 h-8 rounded-lg hover:bg-white/10 active:scale-95 text-[#D8CFBF] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Checkout Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[78vh]">
            {placedOrderId ? (
              /* Success Screen */
              <div className="text-center py-6 sm:py-10 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F5ECE1] border-2 border-[#D4AF37] text-[#2C241D] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-9 h-9 text-[#D4AF37]" />
                </div>

                <div>
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#8C6D3B] block mb-1">
                    Order Received & Stored
                  </span>
                  <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2C241D]">
                    Thank You, {customerName}!
                  </h4>
                  <p className="text-xs text-[#7A6E61] mt-1">
                    Your Order ID is <strong className="text-[#2C241D] font-mono">{placedOrderId}</strong>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] max-w-md mx-auto text-left text-xs space-y-2 shadow-xs">
                  <div className="flex justify-between border-b border-[#F2ECE3] pb-2">
                    <span className="text-[#7A6E61]">Product:</span>
                    <strong className="text-[#2C241D]">{currentProduct.name} ({activeSize.label})</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#F2ECE3] pb-2">
                    <span className="text-[#7A6E61]">Quantity:</span>
                    <strong className="text-[#2C241D]">{quantity} bottle{quantity > 1 ? 's' : ''}</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#F2ECE3] pb-2">
                    <span className="text-[#7A6E61]">Total Amount:</span>
                    <strong className="text-[#2C241D] text-sm">₹{totalPrice}</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#F2ECE3] pb-2">
                    <span className="text-[#7A6E61]">Payment:</span>
                    <strong className="text-[#2C241D]">{paymentMethod}</strong>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#7A6E61]">Delivery To:</span>
                    <span className="text-right text-[#2C241D] max-w-[200px] truncate">{address}, {city} - {pincode}</span>
                  </div>
                </div>

                <div className="pt-2 max-w-md mx-auto space-y-2.5">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      `🛍️ Order #${placedOrderId} Confirmation:\nCustomer: ${customerName}\nProduct: ${currentProduct.name} (${activeSize.label}) x ${quantity}\nTotal: ₹${totalPrice}\nAddress: ${address}, ${city} - ${pincode}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full min-h-[46px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-95 text-white border border-[#D4AF37]/50 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                    <span>Track / Message on WhatsApp</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full py-2.5 text-xs text-[#7A6E61] hover:text-[#2C241D] font-bold cursor-pointer"
                  >
                    Close & Return to Store
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* 1. Item Selection Banner */}
                <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
                  <div className="flex items-center gap-3.5">
                    <img
                      src={currentProduct.image}
                      alt={currentProduct.name}
                      className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-xl border border-[#DDD3C5]"
                    />

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <select
                          value={selectedProductId}
                          onChange={(e) => {
                            setSelectedProductId(e.target.value);
                            const prod = catalog.find((p) => p.id === e.target.value);
                            if (prod && prod.sizes.length > 0) {
                              setSelectedSizeLabel(prod.sizes[0].label);
                            }
                          }}
                          className="font-bold text-xs sm:text-sm text-[#2C241D] bg-transparent border-b border-[#DDD3C5] focus:outline-none cursor-pointer truncate max-w-[220px]"
                        >
                          {catalog.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.name}
                            </option>
                          ))}
                        </select>

                        <span className="text-sm sm:text-base font-black text-[#2C241D]">
                          ₹{totalPrice}
                        </span>
                      </div>

                      {/* Size picker & Quantity Stepper */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mt-2 pt-2 border-t border-[#F4EFEA]">
                        {/* Size select */}
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] uppercase font-bold text-[#8C7E70]">Size:</span>
                          <select
                            value={selectedSizeLabel}
                            onChange={(e) => setSelectedSizeLabel(e.target.value)}
                            className="text-xs font-semibold bg-[#FAF7F2] border border-[#DDD3C5] rounded-md px-2 py-0.5 text-[#2C241D]"
                          >
                            {currentProduct.sizes.map((s) => (
                              <option key={s.label} value={s.label}>
                                {s.label} (₹{s.price})
                              </option>
                            ))}
                          </select>
                        </div>

                        {/* Qty Stepper */}
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold text-[#8C7E70]">Qty:</span>
                          <div className="inline-flex items-center border border-[#DDD3C5] rounded-lg overflow-hidden bg-[#FAF7F2]">
                            <button
                              type="button"
                              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                              className="px-2 py-0.5 hover:bg-[#EAE2D5] active:scale-95 font-bold text-xs cursor-pointer"
                            >
                              -
                            </button>
                            <span className="px-2.5 py-0.5 text-xs font-bold text-[#2C241D] bg-white">
                              {quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQuantity((q) => q + 1)}
                              className="px-2 py-0.5 hover:bg-[#EAE2D5] active:scale-95 font-bold text-xs cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 2. Customer & Delivery Address Form */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#736555] border-b border-[#E8DFD3] pb-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Delivery Address</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Ramesh Kannan"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-[#DDD3C5] rounded-xl focus:outline-none focus:border-[#2C241D]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1">
                        WhatsApp / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-[#DDD3C5] rounded-xl focus:outline-none focus:border-[#2C241D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1">
                      Street Address / House No / Area *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 15, North Car Street, Near Perumal Temple"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-[#DDD3C5] rounded-xl focus:outline-none focus:border-[#2C241D]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1">
                        City / Town *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Theni / Madurai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-[#DDD3C5] rounded-xl focus:outline-none focus:border-[#2C241D]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1">
                        Postal Pincode *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 625601"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-[#DDD3C5] rounded-xl focus:outline-none focus:border-[#2C241D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Deliver between 4 PM - 7 PM"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-3 py-2 text-base sm:text-xs bg-white border border-[#DDD3C5] rounded-xl focus:outline-none focus:border-[#2C241D]"
                    />
                  </div>
                </div>

                {/* 3. Payment Method */}
                <div className="space-y-2 pt-2 border-t border-[#E8DFD3]">
                  <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1">
                    Payment Option
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('Cash on Delivery')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        paymentMethod === 'Cash on Delivery'
                          ? 'border-[#2C241D] bg-[#F5ECE1] shadow-xs'
                          : 'border-[#DDD3C5] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#2C241D]">Cash on Delivery</div>
                      <div className="text-[10px] text-[#7A6E61] mt-0.5">Pay in cash upon doorstep delivery</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('UPI / WhatsApp')}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                        paymentMethod === 'UPI / WhatsApp'
                          ? 'border-[#2C241D] bg-[#F5ECE1] shadow-xs'
                          : 'border-[#DDD3C5] bg-white hover:bg-[#FAF7F2]'
                      }`}
                    >
                      <div className="font-bold text-xs text-[#2C241D]">UPI / WhatsApp Pay</div>
                      <div className="text-[10px] text-[#7A6E61] mt-0.5">GPay / PhonePe / Paytm / QR</div>
                    </button>
                  </div>
                </div>

                {/* Order Summary & Submit Button */}
                <div className="pt-3 border-t border-[#E8DFD3] space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7A6E61]">Delivery Fee:</span>
                    <span className="font-bold text-[#2D5A27] text-green-700">FREE Dispatch</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#2C241D]">Total Payable:</span>
                    <span className="font-black text-xl text-[#2C241D]">₹{totalPrice}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white border border-[#D4AF37]/50 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                    <span>{isSubmitting ? 'Recording Order...' : `Confirm Order (₹${totalPrice})`}</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-[#8C7E70] select-none text-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Dispatched from Barakkath Marketing, Periyakulam, Tamil Nadu</span>
                  </div>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
