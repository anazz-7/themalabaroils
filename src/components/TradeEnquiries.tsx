import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Building2, Store, Truck, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { SpotlightCard } from './SpotlightCard';

export const TradeEnquiries: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [enquiryType, setEnquiryType] = useState('wholesale');
  const [submitted, setSubmitted] = useState(false);

  const whatsappTradeLink = (type: string, name = '', cityVal = '') => {
    let msg = `🤝 *TRADE & BULK ENQUIRY - THE MALABAR OILS*\n\n`;
    msg += `Hello Barakkath Marketing (Periyakulam),\n`;
    msg += `I am interested in trade partnership / bulk supply.\n\n`;
    msg += `• Enquiry Type: ${type.toUpperCase()}\n`;
    if (name) msg += `• Business/Name: ${name}\n`;
    if (cityVal) msg += `• Location: ${cityVal}\n`;
    msg += `\nPlease share your wholesale price list, minimum order quantity (MOQ), and dealership terms.`;
    return `https://wa.me/916374848947?text=${encodeURIComponent(msg)}`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = whatsappTradeLink(enquiryType, `${businessName} (${contactPerson})`, city);
    setSubmitted(true);
    setTimeout(() => {
      window.open(link, '_blank');
      setSubmitted(false);
    }, 800);
  };

  return (
    <section id="trade" className="py-14 sm:py-20 bg-[#F4EEE5] border-t border-[#DFD5C6] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: B2B Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-6 space-y-4 sm:space-y-6"
          >
            <div className="inline-flex items-center gap-2 text-xs font-cinzel tracking-[0.25em] uppercase text-[#2D5A27] font-bold">
              <Building2 className="w-4 h-4" />
              <span>B2B & Distribution</span>
            </div>

            <h2 className="font-serif-display text-2xl sm:text-4xl lg:text-5xl font-bold text-[#2C241D] leading-tight">
              Trade & Wholesale Enquiries
            </h2>

            <p className="text-xs sm:text-base text-[#5A4E41] leading-relaxed">
              Partner with <strong>The Malabar Oils</strong> and <strong>Barakkath Marketing</strong>. We supply certified AGMARK Grade-1 cold-pressed oils to premium organic stores, supermarkets, restaurants, and regional distributors across India and for export.
            </p>

            <div className="space-y-3 pt-1">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 border border-[#DDD3C5]">
                <Store className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#2C241D] uppercase tracking-wide">
                    Retailers & Supermarkets
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#6C5F51] mt-0.5">
                    Shelf-ready 500ml and 1L bottles with high customer repeat purchases.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 border border-[#DDD3C5]">
                <Truck className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#2C241D] uppercase tracking-wide">
                    HoReCa & Bulk Food Service
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#6C5F51] mt-0.5">
                    Cost-effective 5L tins, 15L cans, and bulk barrels for restaurants.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-white/80 border border-[#DDD3C5]">
                <ShieldCheck className="w-5 h-5 text-[#2D5A27] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-[#2C241D] uppercase tracking-wide">
                    Contract Packaging & Marketing
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#6C5F51] mt-0.5">
                    Hygienic bottling and dispatch from Barakkath Marketing, Periyakulam, Tamil Nadu.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Trade Button */}
            <div className="pt-2">
              <a
                href={whatsappTradeLink('wholesale')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 min-h-[48px] bg-[#25D366] hover:bg-[#20BD5A] active:scale-[0.98] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-[transform,background-color] duration-150 shadow-xs cursor-pointer select-none"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp for Trade Rates</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Trade Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="lg:col-span-6"
          >
            <SpotlightCard
              spotlightColor="rgba(45, 90, 39, 0.08)"
              className="bg-white rounded-3xl p-5 sm:p-8 border border-[#DDD3C5] shadow-lg"
            >
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2C241D] mb-1">
                Submit a Trade Query
              </h3>
              <p className="text-xs text-[#6C5F51] mb-5">
                Fill details below to receive our commercial catalog and B2B pricing via WhatsApp.
              </p>

              {submitted ? (
                <div className="text-center py-10">
                  <div className="w-12 h-12 rounded-full bg-[#DCFCE7] text-[#16A34A] flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-serif-display text-lg font-bold text-[#2C241D]">
                    Redirecting to WhatsApp...
                  </h4>
                  <p className="text-xs text-[#6C5F51] mt-1">
                    Connecting you directly with Barakkath Marketing trade desk.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-[#4A3E32] uppercase mb-1 select-none">
                      Business or Store Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Malabar Organics / Fresh Mart"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-xl border border-[#DDD3C5] bg-[#FDFCF9] focus:outline-none focus:border-[#2D5A27]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#4A3E32] uppercase mb-1 select-none">
                        Contact Person
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your Name"
                        value={contactPerson}
                        onChange={(e) => setContactPerson(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-xl border border-[#DDD3C5] bg-[#FDFCF9] focus:outline-none focus:border-[#2D5A27]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#4A3E32] uppercase mb-1 select-none">
                        City & State
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Madurai, Tamil Nadu"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-xl border border-[#DDD3C5] bg-[#FDFCF9] focus:outline-none focus:border-[#2D5A27]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold text-[#4A3E32] uppercase mb-1 select-none">
                        Phone / WhatsApp
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-xl border border-[#DDD3C5] bg-[#FDFCF9] focus:outline-none focus:border-[#2D5A27]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#4A3E32] uppercase mb-1 select-none">
                        Requirement Type
                      </label>
                      <select
                        value={enquiryType}
                        onChange={(e) => setEnquiryType(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-base sm:text-xs rounded-xl border border-[#DDD3C5] bg-[#FDFCF9] focus:outline-none focus:border-[#2D5A27]"
                      >
                        <option value="retail-stockist">Retail Stockist / Store</option>
                        <option value="distributor">Regional Dealership / Distributor</option>
                        <option value="bulk-horeca">Hotel / Bulk 15L Cans</option>
                        <option value="export">Export Enquiries</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[48px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-[transform,background-color] duration-150 shadow-xs flex items-center justify-center gap-2 cursor-pointer mt-2 select-none"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Query via WhatsApp</span>
                  </button>

                  <div className="text-[10px] text-[#7E7163] text-center pt-1 select-none">
                    Direct communication with Barakkath Marketing, Periyakulam, Tamil Nadu.
                  </div>
                </form>
              )}
            </SpotlightCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
