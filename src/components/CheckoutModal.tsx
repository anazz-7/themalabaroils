import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ShieldCheck, Truck, MessageCircle, MapPin, Package, ArrowRight } from 'lucide-react';
import { useCatalog } from '../store/catalogStore';
import { useOrders } from '../store/orderStore';
import { useCart } from '../store/cartStore';

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

export const parseLitresFromSize = (sizeLabel: string): number => {
  const lower = sizeLabel.toLowerCase();
  if (lower.includes('3 x 1') || lower.includes('3x1')) return 3.0;
  if (lower.includes('500 ml') || lower.includes('500ml')) return 0.5;
  if (lower.includes('5 litre') || lower.includes('5l')) return 5.0;
  if (lower.includes('1 litre') || lower.includes('1l')) return 1.0;
  const matchLitre = lower.match(/([\d.]+)\s*(litre|ltr|l)\b/);
  if (matchLitre) return parseFloat(matchLitre[1]) || 1.0;
  const matchMl = lower.match(/([\d.]+)\s*ml\b/);
  if (matchMl) return (parseFloat(matchMl[1]) || 500) / 1000;
  return 1.0;
};

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  initialItem
}) => {
  const { catalog, whatsappNumber } = useCatalog();
  const { createOrder } = useOrders();
  const { cart, totalAmount: cartTotal, clearCart: emptyCart } = useCart();
  const isCartCheckout = !initialItem && cart.length > 0;

  // Selected product & size
  const [selectedProductId, setSelectedProductId] = useState<string>('groundnut');
  const [selectedSizeLabel, setSelectedSizeLabel] = useState<string>('1 Litre');
  const [quantity, setQuantity] = useState<number>(1);

  // Delivery Zone: local (free) vs outside (₹40/L up to 2L, ₹20/L >2L, capped ₹50-₹250)
  const [deliveryType, setDeliveryType] = useState<'local' | 'outside'>('local');

  // Form Fields
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'Cash on Delivery' | 'UPI / WhatsApp'>('Cash on Delivery');

  // Submission & Animated Delivery Van Loading State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitProgress, setSubmitProgress] = useState(0);
  const [submitMilestone, setSubmitMilestone] = useState('Initiating Order...');
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
      if (e.key === 'Escape' && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, isSubmitting]);

  // Find active product from catalog
  const currentProduct =
    catalog.find((p) => p.id === selectedProductId || (p.id === 'sesame' && selectedProductId === 'gingelly')) ||
    catalog[0];
  const activeSize = currentProduct.sizes.find((s) => s.label === selectedSizeLabel) || currentProduct.sizes[1] || currentProduct.sizes[0];
  const unitPrice = activeSize.price;
  const singleTotal = unitPrice * quantity;
  const subtotal = isCartCheckout ? cartTotal : singleTotal;

  // Total litres calculation:
  const totalLitres = isCartCheckout
    ? cart.reduce((sum, item) => sum + parseLitresFromSize(item.sizeLabel) * item.quantity, 0)
    : parseLitresFromSize(activeSize.label) * quantity;

  // Delivery Fee calculation:
  // - Local Delivery (Theni / Periyakulam): FREE (₹0)
  // - Outside Delivery: ₹40 per litre for <= 2L, ₹20 per litre for > 2L (Range ₹40/₹50 to ₹250)
  const ratePerLitre = totalLitres <= 2 ? 40 : 20;
  const rawOutsideFee = Math.round(totalLitres * ratePerLitre);
  const outsideDeliveryFee = Math.min(250, Math.max(40, rawOutsideFee));
  const deliveryFee = deliveryType === 'local' ? 0 : outsideDeliveryFee;
  const finalPayable = subtotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      alert('Please fill in all delivery details.');
      return;
    }

    setIsSubmitting(true);
    setSubmitProgress(5);
    setSubmitMilestone('Assigning Periyakulam Dispatch Unit...');

    // Animated Delivery Van simulation (1.8s)
    let currentPct = 5;
    const interval = setInterval(() => {
      currentPct += 12;
      if (currentPct < 30) {
        setSubmitMilestone('Verifying Fresh Cold-Pressed Batch...');
      } else if (currentPct < 65) {
        setSubmitMilestone('Packing Eco-Sealed Heritage Glass Bottles...');
      } else if (currentPct < 90) {
        setSubmitMilestone('Generating Delivery Van Route from Periyakulam...');
      } else {
        setSubmitMilestone('Order Confirmed! Dispatching Delivery Van 🚚💨');
      }

      setSubmitProgress(Math.min(100, currentPct));

      if (currentPct >= 100) {
        clearInterval(interval);

        // Finalize order creation
        const orderItems = isCartCheckout
          ? cart.map((c) => ({
              productId: c.productId,
              productName: c.name,
              sizeLabel: c.sizeLabel,
              price: c.price,
              quantity: c.quantity
            }))
          : [
              {
                productId: currentProduct.id,
                productName: currentProduct.name,
                sizeLabel: activeSize.label,
                price: unitPrice,
                quantity
              }
            ];

        const newOrder = createOrder({
          customerName: customerName.trim(),
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim(),
          pincode: pincode.trim(),
          notes: notes.trim(),
          paymentMethod,
          totalAmount: finalPayable,
          items: orderItems,
          deliveryType:
            deliveryType === 'local'
              ? 'Local Delivery (Free)'
              : `Outside Delivery (${totalLitres}L @ ₹${ratePerLitre}/L: ₹${deliveryFee})`,
          deliveryFee
        });

        if (isCartCheckout) {
          emptyCart();
        }

        setTimeout(() => {
          setIsSubmitting(false);
          setPlacedOrderId(newOrder.id);

          // Prepare WhatsApp Message
          const itemsDescription = isCartCheckout
            ? cart.map((c) => `• ${c.name} (${c.sizeLabel}) x ${c.quantity} = ₹${c.price * c.quantity}`).join('\n')
            : `• ${currentProduct.name} (${activeSize.label}) x ${quantity} = ₹${singleTotal}`;

          const deliveryZoneText =
            deliveryType === 'local'
              ? 'Local Delivery (Periyakulam / Theni) - FREE'
              : `Outside Delivery (${totalLitres}L @ ₹${ratePerLitre}/L = Courier Fee: ₹${deliveryFee})`;

          const whatsappMsg =
            `🛍️ *NEW ORDER PLACED - ${newOrder.id}*\n\n` +
            `Hello The Malabar Oils / Barakkath Marketing,\n` +
            `I have placed an order on your website:\n\n` +
            `• *Order ID*: ${newOrder.id}\n` +
            `• *Customer*: ${newOrder.customerName}\n` +
            `• *Phone*: ${newOrder.phone}\n` +
            `*Items Ordered*:\n${itemsDescription}\n\n` +
            `• *Total Volume*: ${totalLitres} Litre(s)\n` +
            `• *Subtotal*: ₹${subtotal}\n` +
            `• *Delivery Option*: ${deliveryZoneText}\n` +
            `• *Total Payable*: ₹${finalPayable}\n` +
            `• *Payment Option*: ${paymentMethod}\n` +
            `• *Delivery Address*: ${address.trim()}, ${city.trim()} - ${pincode.trim()}\n` +
            (notes.trim() ? `• *Note*: ${notes.trim()}\n` : '') +
            `\nPlease confirm order dispatch and delivery date!`;

          const redirectUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

          setTimeout(() => {
            window.open(redirectUrl, '_blank');
          }, 1200);
        }, 350);
      }
    }, 120);
  };

  const handleReset = () => {
    setPlacedOrderId(null);
    setIsSubmitting(false);
    setSubmitProgress(0);
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

            {!isSubmitting && (
              <button
                onClick={handleReset}
                className="w-8 h-8 rounded-lg hover:bg-white/10 active:scale-95 text-[#D8CFBF] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Checkout Modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6 overflow-y-auto max-h-[78vh]">
            {isSubmitting ? (
              /* Animated Delivery Van Loading Progress Bar */
              <div className="py-8 sm:py-12 px-4 max-w-md mx-auto text-center space-y-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#8C6D3B] block">
                    Fast-Track Dispatch
                  </span>
                  <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2C241D]">
                    Securing Your Cold-Pressed Batch
                  </h4>
                  <p className="text-xs text-[#7A6E61]">
                    Barakkath Marketing • Periyakulam Extraction Mill
                  </p>
                </div>

                {/* Road & Driving Van Container */}
                <div className="bg-[#1C1814] p-4 sm:p-5 rounded-2xl border border-[#3E342B] shadow-xl text-white">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#D4AF37] font-bold mb-2">
                    <span className="flex items-center gap-1.5">
                      <Truck className="w-4 h-4" />
                      <span>EXPRESS DISPATCH</span>
                    </span>
                    <span>{Math.round(submitProgress)}%</span>
                  </div>

                  {/* Road Canvas */}
                  <div className="relative h-16 bg-[#120F0D] rounded-xl overflow-hidden border border-[#2E2620] flex items-center px-4 mb-3">
                    {/* Animated Dashed Road Markings */}
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px] flex items-center overflow-hidden pointer-events-none">
                      <div className="w-[200%] h-full flex items-center gap-4 animate-road-move">
                        {Array.from({ length: 30 }).map((_, i) => (
                          <span key={i} className="w-5 h-[2px] bg-[#D4AF37]/50 shrink-0 rounded-full" />
                        ))}
                      </div>
                    </div>

                    {/* Animated Delivery Van with Suspension Bounce & Speed Dust */}
                    <motion.div
                      className="absolute z-10 flex items-center"
                      style={{
                        left: `calc(${Math.min(84, Math.max(2, submitProgress))}% - 22px)`
                      }}
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 0.22, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <div className="relative flex items-center">
                        <span className="text-xs mr-0.5 opacity-80 animate-pulse">💨</span>
                        <div className="w-10 h-8 bg-[#2C241D] rounded-lg border-2 border-[#D4AF37] shadow-xl flex items-center justify-center relative">
                          <Truck className="w-5 h-5 text-[#D4AF37]" />
                          {/* Animated Wheels */}
                          <div className="absolute -bottom-1.5 left-1.5 w-2.5 h-2.5 rounded-full bg-[#111] border border-[#D4AF37] animate-spin" />
                          <div className="absolute -bottom-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#111] border border-[#D4AF37] animate-spin" />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Active Golden Progress Bar */}
                  <div className="w-full h-2.5 bg-[#2E2620] rounded-full overflow-hidden mb-2.5">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#8C6D3B] via-[#D4AF37] to-[#FDF3C7] rounded-full"
                      style={{ width: `${submitProgress}%` }}
                    />
                  </div>

                  {/* Dynamic Milestone Step Text */}
                  <div className="text-xs font-semibold text-[#E8DFD3] min-h-[20px] flex items-center justify-center">
                    {submitMilestone}
                  </div>
                </div>
              </div>
            ) : placedOrderId ? (
              /* Success Screen with Dispatch Tracker */
              <div className="text-center py-5 sm:py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#F5ECE1] border-2 border-[#D4AF37] text-[#2C241D] flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
                </div>

                <div>
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#8C6D3B] block mb-1">
                    Order Confirmed &amp; Stored
                  </span>
                  <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#2C241D]">
                    Thank You, {customerName}!
                  </h4>
                  <p className="text-xs text-[#7A6E61] mt-1">
                    Your Order ID is <strong className="text-[#2C241D] font-mono">{placedOrderId}</strong>
                  </p>
                </div>

                {/* Animated Dispatch Status Banner */}
                <div className="p-3 bg-[#1C1814] text-white rounded-xl border border-[#3E342B] max-w-md mx-auto flex items-center gap-3 text-left">
                  <div className="w-9 h-9 rounded-lg bg-[#2C241D] border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0">
                    <Truck className="w-5 h-5 animate-bounce" />
                  </div>
                  <div className="text-xs">
                    <strong className="text-[#D4AF37] block">
                      {deliveryType === 'local' ? 'Local Dispatch: Same-Day Delivery' : 'Courier Dispatch: Booked with Tracking'}
                    </strong>
                    <span className="text-[10px] text-[#A89C8C]">
                      {deliveryType === 'local' ? 'Periyakulam / Theni Local Area (FREE)' : `Volume: ${totalLitres}L • Outside Courier`}
                    </span>
                  </div>
                </div>

                {/* Order Summary Breakdown */}
                <div className="p-4 rounded-2xl bg-white border border-[#E7DFD5] max-w-md mx-auto text-left text-xs space-y-2 shadow-xs">
                  <div className="flex justify-between border-b border-[#F2ECE3] pb-2">
                    <span className="text-[#7A6E61]">Items:</span>
                    <strong className="text-[#2C241D]">
                      {isCartCheckout
                        ? `${cart.length || 'Multiple'} item(s)`
                        : `${currentProduct.name} (${activeSize.label}) x ${quantity}`}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-[#F2ECE3] pb-2">
                    <span className="text-[#7A6E61]">Total Volume:</span>
                    <strong className="text-[#2C241D] font-mono">{totalLitres} Litre(s)</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#F2ECE3] pb-2">
                    <span className="text-[#7A6E61]">Delivery Option:</span>
                    <strong className="text-[#2C241D]">
                      {deliveryType === 'local'
                        ? 'Local Delivery (FREE)'
                        : `Outside Courier (+₹${outsideDeliveryFee} @ ₹${ratePerLitre}/L)`}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-[#F2ECE3] pb-2">
                    <span className="text-[#7A6E61]">Total Amount:</span>
                    <strong className="text-[#2C241D] text-sm">₹{finalPayable}</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#F2ECE3] pb-2">
                    <span className="text-[#7A6E61]">Payment:</span>
                    <strong className="text-[#2C241D]">{paymentMethod}</strong>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#7A6E61]">Delivery To:</span>
                    <span className="text-right text-[#2C241D] max-w-[200px] truncate">
                      {address}, {city} - {pincode}
                    </span>
                  </div>
                </div>

                <div className="pt-2 max-w-md mx-auto space-y-2.5">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
                      `🛍️ Order #${placedOrderId} Confirmation:\nCustomer: ${customerName}\nDelivery: ${
                        deliveryType === 'local' ? 'Local (FREE)' : `Outside (+₹${outsideDeliveryFee})`
                      }\nTotal: ₹${finalPayable}\nAddress: ${address}, ${city} - ${pincode}`
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
                    Close &amp; Return to Store
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {/* 1. Item Selection Banner / Cart Order Summary */}
                {isCartCheckout ? (
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs space-y-2">
                    <div className="flex items-center justify-between pb-1.5 border-b border-[#F4EFEA]">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#2C241D]">
                        <Package className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Cart Summary ({cart.length} items • {totalLitres}L)</span>
                      </div>
                      <span className="text-xs font-black font-mono text-[#2C241D]">Subtotal: ₹{subtotal}</span>
                    </div>
                    <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex items-center justify-between text-xs py-1 border-b border-[#FAF7F2]">
                          <div className="flex items-center gap-2 min-w-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-8 h-8 object-cover rounded-md border border-[#DDD3C5] shrink-0"
                            />
                            <span className="truncate text-[#2C241D] font-medium">
                              {item.name} ({item.sizeLabel}) × <strong className="font-bold">{item.quantity}</strong>
                            </span>
                          </div>
                          <span className="font-mono font-bold text-[#2C241D] ml-2 shrink-0">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
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
                            ₹{singleTotal}
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
                )}

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

                {/* 3. Delivery Option & Payment Method (Local Option next to Outside & COD) */}
                <div className="space-y-3 pt-2 border-t border-[#E8DFD3]">
                  {/* Delivery Location Selector */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[10px] uppercase font-bold text-[#8C7E70] flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Delivery Destination</span>
                      </label>
                      <span className="text-[10px] font-semibold text-[#8C6D3B]">
                        {deliveryType === 'local'
                          ? 'Local: FREE Delivery'
                          : `Outside: ₹${outsideDeliveryFee} (${totalLitres}L @ ₹${ratePerLitre}/L)`}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5">
                      {/* Local Option (FREE) */}
                      <button
                        type="button"
                        onClick={() => setDeliveryType('local')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          deliveryType === 'local'
                            ? 'border-[#2C241D] bg-[#F5ECE1] shadow-xs ring-2 ring-[#2C241D]'
                            : 'border-[#DDD3C5] bg-white hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-bold text-xs text-[#2C241D]">Local Delivery</span>
                          <span className="text-[8.5px] font-black uppercase text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded border border-emerald-300 shrink-0">
                            FREE
                          </span>
                        </div>
                        <div className="text-[9.5px] text-[#7A6E61] leading-tight">
                          Periyakulam, Theni &amp; local areas
                        </div>
                        <div className="text-[9px] text-emerald-700 font-bold mt-1">
                          ₹0 Delivery Fee
                        </div>
                      </button>

                      {/* Outside Option (₹40/L <=2L, ₹20/L >2L, range ₹50 to ₹250) */}
                      <button
                        type="button"
                        onClick={() => setDeliveryType('outside')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          deliveryType === 'outside'
                            ? 'border-[#2C241D] bg-[#F5ECE1] shadow-xs ring-2 ring-[#2C241D]'
                            : 'border-[#DDD3C5] bg-white hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="font-bold text-xs text-[#2C241D]">Outside Delivery</span>
                          <span className="text-[8.5px] font-bold text-[#8C6D3B] bg-[#FAF3EA] px-1.5 py-0.2 rounded border border-[#E7DFD5] shrink-0 font-mono">
                            +₹{outsideDeliveryFee}
                          </span>
                        </div>
                        <div className="text-[9.5px] text-[#7A6E61] leading-tight">
                          Courier (All India)
                        </div>
                        <div className="text-[9px] text-[#8C6D3B] font-semibold mt-1">
                          {totalLitres <= 2 ? '₹40/L (≤2L)' : '₹20/L (>2L)'}
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1.5">
                      Payment Option
                    </label>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('Cash on Delivery')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          paymentMethod === 'Cash on Delivery'
                            ? 'border-[#2C241D] bg-[#F5ECE1] shadow-xs ring-2 ring-[#2C241D]'
                            : 'border-[#DDD3C5] bg-white hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <div className="font-bold text-xs text-[#2C241D]">Cash on Delivery (COD)</div>
                        <div className="text-[9.5px] text-[#7A6E61] mt-0.5 leading-tight">
                          {deliveryType === 'local' ? 'Pay upon doorstep delivery' : 'Pay cash to courier on arrival'}
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('UPI / WhatsApp')}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          paymentMethod === 'UPI / WhatsApp'
                            ? 'border-[#2C241D] bg-[#F5ECE1] shadow-xs ring-2 ring-[#2C241D]'
                            : 'border-[#DDD3C5] bg-white hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <div className="font-bold text-xs text-[#2C241D]">UPI / WhatsApp Pay</div>
                        <div className="text-[9.5px] text-[#7A6E61] mt-0.5 leading-tight">
                          GPay / PhonePe / Paytm / QR
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Order Summary & Submit Button */}
                <div className="pt-3 border-t border-[#E8DFD3] space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7A6E61]">Subtotal ({totalLitres} Litres):</span>
                    <span className="font-bold font-mono text-[#2C241D]">₹{subtotal}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#7A6E61]">Delivery Fee:</span>
                    {deliveryType === 'local' ? (
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        FREE Local Delivery (₹0)
                      </span>
                    ) : (
                      <span className="font-bold font-mono text-[#2C241D]">
                        ₹{outsideDeliveryFee}{' '}
                        <span className="text-[10px] text-[#7A6E61] font-normal">
                          ({totalLitres}L @ {totalLitres <= 2 ? '₹40/L' : '₹20/L'})
                        </span>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-dashed border-[#E8DFD3]">
                    <span className="font-bold text-sm text-[#2C241D]">Total Payable:</span>
                    <span className="font-black text-xl text-[#2C241D] font-mono">₹{finalPayable}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full min-h-[48px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white border border-[#D4AF37]/50 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Confirm &amp; Place Order (₹{finalPayable})</span>
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
