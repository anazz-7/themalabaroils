import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, X, Store, Truck, ShieldCheck, MessageCircle, Send, CheckCircle2, Phone, MapPin } from 'lucide-react';
import { useCatalog } from '../store/catalogStore';

interface B2BTradeModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const B2BTradeModal: React.FC<B2BTradeModalProps> = ({ isOpen, onOpen, onClose }) => {
  const { whatsappNumber } = useCatalog();
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [enquiryType, setEnquiryType] = useState('wholesale');
  const [submitted, setSubmitted] = useState(false);

  // Close with Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const whatsappTradeLink = (type: string, name = '', cityVal = '') => {
    let msg = `🤝 *TRADE & WHOLESALE ENQUIRY - THE MALABAR OILS*\n\n`;
    msg += `Hello Barakkath Marketing (Periyakulam),\n`;
    msg += `I am interested in B2B dealership / bulk supply partnership.\n\n`;
    msg += `• Enquiry Type: ${type.toUpperCase()}\n`;
    if (name) msg += `• Business/Name: ${name}\n`;
    if (cityVal) msg += `• Location: ${cityVal}\n`;
    msg += `\nPlease share your wholesale price list, minimum order quantity (MOQ), and dealership terms.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = whatsappTradeLink(enquiryType, `${businessName} (${contactPerson})`, city);
    setSubmitted(true);
    setTimeout(() => {
      window.open(link, '_blank');
      setSubmitted(false);
      onClose();
    }, 700);
  };

  return (
    <>
      {/* Right Edge Fixed Trigger Button - Compact & Positioned Slightly Lower */}
      <button
        onClick={onOpen}
        type="button"
        title="B2B & Trade Enquiries"
        className="fixed right-0 top-[62%] -translate-y-1/2 z-40 bg-[#2C241D]/95 hover:bg-[#1A1512] active:scale-95 text-[#D4AF37] border-l border-y border-[#D4AF37]/45 rounded-l-lg py-2 px-1 sm:px-1.5 shadow-lg flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-200 hover:-translate-x-0.5 group select-none backdrop-blur-xs"
        aria-label="Open B2B & Wholesale Enquiries"
      >
        <Building2 className="w-3.5 h-3.5 text-[#D4AF37] group-hover:scale-110 transition-transform" />
        <span className="[writing-mode:vertical-rl] rotate-180 text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.16em] uppercase text-[#E7DFD5] whitespace-nowrap">
          B2B &amp; Trade
        </span>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.95, x: 20 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="relative w-full max-w-2xl max-h-[92vh] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FBF9F5] border border-[#DDD3C6] shadow-2xl flex flex-col text-[#2C241D]"
            >
              {/* Header */}
              <div className="bg-[#1C1814] text-white px-5 py-4 sm:px-6 sm:py-4.5 flex items-center justify-between border-b border-[#332A22]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#2C241D] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center shadow-xs">
                    <Building2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h3 className="font-serif-display text-base sm:text-lg font-bold tracking-wide">
                      B2B &amp; Distribution Partnerships
                    </h3>
                    <p className="text-[10px] text-[#A89C8C] tracking-wider uppercase">
                      Direct Factory Supply • Barakkath Marketing, Periyakulam
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 active:scale-95 text-[#D8CFBF] flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Body */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[78vh] space-y-4 sm:space-y-5">
                {/* 3 Value Pillars */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-white border border-[#E7DFD5] shadow-xs">
                    <Store className="w-4 h-4 text-[#D4AF37] mb-1.5" />
                    <strong className="text-xs text-[#2C241D] block">Retail &amp; Supermarkets</strong>
                    <p className="text-[10px] text-[#6C5F51] mt-0.5 leading-tight">
                      Shelf-ready 500ml &amp; 1L bottles with healthy retail margins.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E7DFD5] shadow-xs">
                    <Truck className="w-4 h-4 text-[#D4AF37] mb-1.5" />
                    <strong className="text-xs text-[#2C241D] block">HoReCa &amp; Food Service</strong>
                    <p className="text-[10px] text-[#6C5F51] mt-0.5 leading-tight">
                      5L cans, 15L tins &amp; bulk barrels for restaurants &amp; cloud kitchens.
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-[#E7DFD5] shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] mb-1.5" />
                    <strong className="text-xs text-[#2C241D] block">Dealerships &amp; Export</strong>
                    <p className="text-[10px] text-[#6C5F51] mt-0.5 leading-tight">
                      Exclusive territory distribution &amp; AGMARK Grade-1 certified quality.
                    </p>
                  </div>
                </div>

                {/* Instant WhatsApp Trade Channel */}
                <div className="p-3.5 bg-[#FAF7F2] rounded-xl border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-left">
                    <strong className="text-xs text-[#2C241D] block">Prefer Instant Wholesale Details?</strong>
                    <span className="text-[11px] text-[#7A6E61]">
                      Connect directly with our Trade Manager on WhatsApp.
                    </span>
                  </div>
                  <a
                    href={whatsappTradeLink('wholesale')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-4 py-2 bg-[#2C241D] hover:bg-[#1A1512] active:scale-95 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs border border-[#D4AF37]/40 shrink-0 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D4AF37]" />
                    <span>Chat with Mill Manager</span>
                  </a>
                </div>

                {/* Quick Enquiry Form */}
                <form onSubmit={handleFormSubmit} className="space-y-3 bg-white p-4 rounded-2xl border border-[#E7DFD5]">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C7E70] block">
                    Submit Formal Partnership Request
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#8C7E70] block mb-1">
                        Business / Store Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Green Earth Organic Store"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD3C5] rounded-xl focus:outline-none focus:border-[#2C241D]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#8C7E70] block mb-1">
                        Contact Person *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. M. Rajesh"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD3C5] rounded-xl focus:outline-none focus:border-[#2C241D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#8C7E70] block mb-1">
                        WhatsApp / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD3C5] rounded-xl focus:outline-none focus:border-[#2C241D]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold uppercase text-[#8C7E70] block mb-1">
                        City / State *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Coimbatore, Tamil Nadu"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD3C5] rounded-xl focus:outline-none focus:border-[#2C241D]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold uppercase text-[#8C7E70] block mb-1">
                      Enquiry Category
                    </label>
                    <select
                      value={enquiryType}
                      onChange={(e) => setEnquiryType(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-[#FAF7F2] border border-[#DDD3C5] rounded-xl text-[#2C241D] font-medium"
                    >
                      <option value="wholesale">Retail Store / Wholesale Supply</option>
                      <option value="restaurant">Hotel / Restaurant Bulk Supply (HoReCa)</option>
                      <option value="dealership">District Distributorship / Dealership</option>
                      <option value="export">Commercial Export Enquiry</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitted}
                    className="w-full min-h-[44px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs cursor-pointer border border-[#D4AF37]/40 transition-all"
                  >
                    {submitted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Connecting to WhatsApp...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#D4AF37]" />
                        <span>Send Trade Enquiry</span>
                      </>
                    )}
                  </button>
                </form>

                {/* Direct Mill Origin Footnote */}
                <div className="text-center text-[10px] text-[#8C7E70] space-y-0.5">
                  <span className="font-semibold text-[#2C241D]">Barakkath Marketing</span> • 44, Palliyasal Street, Vadagarai, Periyakulam, Tamil Nadu - 625601
                  <div>FSSAI Lic: 22426472000074 • AGMARK Grade-1 Certified</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

