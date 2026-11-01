import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Lock, Save, RotateCcw, ShieldCheck, Check, Sparkles, DollarSign, Settings, Phone } from 'lucide-react';
import { useCatalog, CatalogProduct, DEFAULT_WHATSAPP_NUMBER } from '../store/catalogStore';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { catalog, whatsappNumber, saveCatalog, saveWhatsAppNumber, resetCatalogToDefaults } = useCatalog();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('malabar_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState<'prices' | 'content' | 'settings'>('prices');
  const [editableCatalog, setEditableCatalog] = useState<CatalogProduct[]>(catalog);
  const [editablePhone, setEditablePhone] = useState<string>(whatsappNumber);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    setEditableCatalog(catalog);
    setEditablePhone(whatsappNumber);
  }, [catalog, whatsappNumber, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === 'malabar2026' || passwordInput === 'admin') {
      setIsAuthenticated(true);
      sessionStorage.setItem('malabar_admin_auth', 'true');
      setAuthError('');
      setPasswordInput('');
    } else {
      setAuthError('Incorrect admin password. Try malabar2026');
    }
  };

  const handlePriceChange = (productId: string, sizeIndex: number, field: 'price' | 'originalPrice', value: number) => {
    setEditableCatalog((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        const updatedSizes = [...prod.sizes];
        updatedSizes[sizeIndex] = {
          ...updatedSizes[sizeIndex],
          [field]: Math.max(0, value)
        };
        return { ...prod, sizes: updatedSizes };
      })
    );
  };

  const handleContentChange = (productId: string, field: 'name' | 'shortMobileName' | 'tamilName', value: string) => {
    setEditableCatalog((prev) =>
      prev.map((prod) => {
        if (prod.id !== productId) return prod;
        return { ...prod, [field]: value };
      })
    );
  };

  const handleSave = () => {
    saveCatalog(editableCatalog);
    const cleanedPhone = editablePhone.replace(/\D/g, '');
    saveWhatsAppNumber(cleanedPhone.length >= 10 ? cleanedPhone : DEFAULT_WHATSAPP_NUMBER);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
    }, 2500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all prices, products, and contact info to factory defaults?')) {
      resetCatalogToDefaults();
      setEditablePhone(DEFAULT_WHATSAPP_NUMBER);
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
      }, 2500);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FBF9F5] border border-[#DDD3C6] shadow-2xl flex flex-col text-[#2C241D]"
        >
          {/* Header */}
          <div className="bg-[#1C1814] text-white px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between border-b border-[#332A22]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2C241D] border border-[#D4AF37]/40 text-[#D4AF37] flex items-center justify-center shadow-xs">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-display text-base sm:text-lg font-bold tracking-wide">
                  The Malabar Oils — Admin Portal
                </h3>
                <p className="text-[10px] text-[#A89C8C] tracking-wider uppercase">
                  Live Price & Catalog Content Manager
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-white/10 active:scale-95 text-[#D8CFBF] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close Admin Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isAuthenticated ? (
            /* Login Screen */
            <div className="p-6 sm:p-10 flex flex-col items-center justify-center text-center my-auto">
              <div className="w-14 h-14 rounded-full bg-[#EDE5DB] border border-[#D4AF37]/50 text-[#2C241D] flex items-center justify-center mb-4 shadow-xs">
                <Lock className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif-display text-xl font-bold text-[#2C241D] mb-1">
                Store Owner Authentication
              </h4>
              <p className="text-xs text-[#7A6E61] max-w-sm mb-6">
                Enter your admin passkey to update live product prices, Tamil names, and customer WhatsApp routing.
              </p>

              <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
                <div>
                  <input
                    type="password"
                    placeholder="Enter Admin Password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    autoFocus
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D2C5B4] bg-white text-sm focus:outline-none focus:border-[#2C241D] focus:ring-1 focus:ring-[#2C241D] shadow-xs text-center font-mono"
                  />
                  {authError && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1.5">{authError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[42px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  Unlock Admin Portal
                </button>
                <p className="text-[10px] text-[#A39788] pt-1">
                  Default passkey: <code className="font-mono font-bold text-[#2C241D]">malabar2026</code>
                </p>
              </form>
            </div>
          ) : (
            /* Main Admin Dashboard */
            <>
              {/* Tab Navigation */}
              <div className="flex border-b border-[#E8DFD3] bg-[#F2EDE5] px-4 pt-2 gap-1.5">
                <button
                  onClick={() => setActiveTab('prices')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'prices'
                      ? 'bg-[#FBF9F5] text-[#2C241D] border-t border-x border-[#E8DFD3] shadow-xs'
                      : 'text-[#7A6E61] hover:text-[#2C241D]'
                  }`}
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>Prices & Sizes</span>
                </button>

                <button
                  onClick={() => setActiveTab('content')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'content'
                      ? 'bg-[#FBF9F5] text-[#2C241D] border-t border-x border-[#E8DFD3] shadow-xs'
                      : 'text-[#7A6E61] hover:text-[#2C241D]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Product Content</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'settings'
                      ? 'bg-[#FBF9F5] text-[#2C241D] border-t border-x border-[#E8DFD3] shadow-xs'
                      : 'text-[#7A6E61] hover:text-[#2C241D]'
                  }`}
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Store Settings</span>
                </button>
              </div>

              {/* Tab Content Body (Scrollable) */}
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] space-y-6">
                {saveSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-[#F5ECE1] border border-[#D4AF37]/40 text-[#4A3B2C] rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs"
                  >
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                    <span>Catalog changes published and saved to local live store!</span>
                  </motion.div>
                )}

                {activeTab === 'prices' && (
                  <div className="space-y-5">
                    {editableCatalog.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 rounded-2xl bg-white border border-[#E8E0D4] shadow-xs"
                      >
                        <div className="flex items-center gap-3 mb-3 border-b border-[#F4EFEA] pb-2">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded-lg border border-[#DDD3C5]"
                          />
                          <div>
                            <h5 className="font-bold text-sm text-[#2C241D]">{product.name}</h5>
                            <span className="text-[11px] font-serif italic text-[#7A6E61]">
                              {product.tamilName}
                            </span>
                          </div>
                        </div>

                        {/* Size Pricing Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {product.sizes.map((sz, szIdx) => (
                            <div key={sz.label} className="p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE]">
                              <span className="text-[11px] font-bold text-[#2C241D] uppercase block mb-1">
                                {sz.label}
                              </span>
                              <div className="grid grid-cols-2 gap-2">
                                <div>
                                  <label className="text-[9px] uppercase font-semibold text-[#8C7E70] block">
                                    Selling (₹)
                                  </label>
                                  <input
                                    type="number"
                                    value={sz.price}
                                    onChange={(e) =>
                                      handlePriceChange(product.id, szIdx, 'price', Number(e.target.value))
                                    }
                                    className="w-full px-2 py-1 bg-white border border-[#DDD3C5] rounded-md text-xs font-bold text-[#2C241D]"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] uppercase font-semibold text-[#8C7E70] block">
                                    MRP / Strike (₹)
                                  </label>
                                  <input
                                    type="number"
                                    value={sz.originalPrice}
                                    onChange={(e) =>
                                      handlePriceChange(
                                        product.id,
                                        szIdx,
                                        'originalPrice',
                                        Number(e.target.value)
                                      )
                                    }
                                    className="w-full px-2 py-1 bg-white border border-[#DDD3C5] rounded-md text-xs text-[#8C7E70]"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'content' && (
                  <div className="space-y-4">
                    {editableCatalog.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 rounded-2xl bg-white border border-[#E8E0D4] space-y-3 shadow-xs"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{
                              backgroundColor:
                                product.capColor === 'red'
                                  ? '#DC2626'
                                  : product.capColor === 'blue'
                                  ? '#2563EB'
                                  : product.capColor === 'yellow'
                                  ? '#D97706'
                                  : '#4A3B2C'
                            }}
                          />
                          <h5 className="font-bold text-xs uppercase tracking-wider text-[#2C241D]">
                            {product.id}
                          </h5>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1">
                              Full English Title
                            </label>
                            <input
                              type="text"
                              value={product.name}
                              onChange={(e) => handleContentChange(product.id, 'name', e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-[#DDD3C5] rounded-lg text-xs font-semibold text-[#2C241D]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1">
                              Tamil Name (தமிழ் பெயர்)
                            </label>
                            <input
                              type="text"
                              value={product.tamilName}
                              onChange={(e) => handleContentChange(product.id, 'tamilName', e.target.value)}
                              className="w-full px-3 py-1.5 bg-white border border-[#DDD3C5] rounded-lg text-xs font-serif text-[#2C241D]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1">
                            Compact Mobile Name
                          </label>
                          <input
                            type="text"
                            value={product.shortMobileName}
                            onChange={(e) =>
                              handleContentChange(product.id, 'shortMobileName', e.target.value)
                            }
                            className="w-full px-3 py-1.5 bg-white border border-[#DDD3C5] rounded-lg text-xs font-medium text-[#2C241D]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'settings' && (
                  <div className="p-5 rounded-2xl bg-white border border-[#E8E0D4] space-y-4">
                    <h5 className="font-bold text-sm text-[#2C241D] flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#D4AF37]" />
                      <span>WhatsApp Order Routing Number</span>
                    </h5>
                    <p className="text-xs text-[#7A6E61]">
                      All "Order on WhatsApp" customer taps and trade inquiries will be routed to this number.
                    </p>

                    <div className="max-w-xs">
                      <label className="text-[10px] uppercase font-bold text-[#8C7E70] block mb-1">
                        Phone Number (With Country Code 91)
                      </label>
                      <input
                        type="text"
                        value={editablePhone}
                        onChange={(e) => setEditablePhone(e.target.value)}
                        placeholder="916379849947"
                        className="w-full px-3 py-2 bg-white border border-[#DDD3C5] rounded-xl text-sm font-mono font-bold text-[#2C241D]"
                      />
                      <span className="text-[10px] text-[#A89C8C] mt-1 block">
                        Current: +{editablePhone}
                      </span>
                    </div>

                    <div className="pt-4 border-t border-[#F2ECE3] flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#2C241D] block">Reset Entire Catalog</span>
                        <span className="text-[10px] text-[#8C7E70]">
                          Restore original prices and content back to defaults
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="px-3.5 py-1.5 border border-[#CBBFB0] hover:bg-[#F2EDE5] text-[#2C241D] rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reset Defaults</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Action Bar */}
              <div className="bg-[#FAF7F2] border-t border-[#E8DFD3] p-4 sm:px-6 sm:py-3.5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#7A6E61] hover:text-[#2C241D] cursor-pointer"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSave}
                    className="min-h-[40px] px-5 bg-[#2C241D] hover:bg-[#1A1512] active:scale-95 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-[#D4AF37]" />
                    <span>Save & Publish Live</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
