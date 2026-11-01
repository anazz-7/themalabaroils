import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Lock,
  Save,
  RotateCcw,
  ShieldCheck,
  Check,
  Sparkles,
  DollarSign,
  Settings,
  Phone,
  ShoppingBag,
  Clock,
  MapPin,
  Trash2,
  Copy,
  ExternalLink,
  MessageCircle,
  Filter,
  Cloud,
  Download
} from 'lucide-react';
import { useCatalog, CatalogProduct, DEFAULT_WHATSAPP_NUMBER } from '../store/catalogStore';
import { useOrders, CustomerOrder, OrderStatus } from '../store/orderStore';
import { authenticatePasskey } from '../utils/security';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { catalog, whatsappNumber, saveCatalog, saveWhatsAppNumber, deleteProduct, resetCatalogToDefaults } = useCatalog();
  const { orders, updateOrderStatus, deleteOrder, clearAllOrders } = useOrders();

  // Always require the 4-digit passkey '1977' every time the Admin Panel is opened
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'prices' | 'content' | 'settings'>('orders');
  const [orderFilter, setOrderFilter] = useState<string>('all');
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);

  const [editableCatalog, setEditableCatalog] = useState<CatalogProduct[]>(catalog);
  const [editablePhone, setEditablePhone] = useState<string>(whatsappNumber);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Clear authentication whenever modal closes so passkey is always prompted on re-open
  useEffect(() => {
    if (!isOpen) {
      setIsAuthenticated(false);
      setPasswordInput('');
      setAuthError('');
    }
  }, [isOpen]);

  useEffect(() => {
    setEditableCatalog(catalog);
    setEditablePhone(whatsappNumber);
  }, [catalog, whatsappNumber, isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsAuthenticated(false);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = passwordInput.trim();
    if (trimmed === '1977') {
      setIsAuthenticated(true);
      setAuthError('');
      setPasswordInput('');
      try {
        sessionStorage.removeItem('malabar_sec_ratelimit_v1');
      } catch {}
    } else {
      setAuthError('Incorrect passkey. Please enter 1977');
    }
  };

  const handleDeleteProduct = (productId: string, productName: string) => {
    if (window.confirm(`Are you sure you want to delete "${productName}" from the store catalog?`)) {
      deleteProduct(productId);
      setEditableCatalog((prev) => prev.filter((p) => p.id !== productId));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
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

  const handleCopyOrder = (order: CustomerOrder) => {
    const text = `📦 *THE MALABAR OILS - ORDER RECEIPT*\n` +
      `Order ID: ${order.id}\n` +
      `Date: ${new Date(order.createdAt).toLocaleDateString()} ${new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n` +
      `Customer: ${order.customerName} (${order.phone})\n` +
      `Address: ${order.address}, ${order.city} - ${order.pincode}\n` +
      `Items:\n` +
      order.items.map((it) => `• ${it.productName} (${it.sizeLabel}) x ${it.quantity} = ₹${it.price * it.quantity}`).join('\n') +
      `\nTotal: ₹${order.totalAmount} (${order.paymentMethod})\nStatus: ${order.status}`;

    navigator.clipboard.writeText(text);
    setCopiedOrderId(order.id);
    setTimeout(() => setCopiedOrderId(null), 2000);
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    if (orderFilter === 'all') return true;
    return o.status.toLowerCase() === orderFilter.toLowerCase();
  });

  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.totalAmount : 0), 0);
  const pendingCount = orders.filter((o) => o.status === 'Pending').length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          className="relative w-full max-w-4xl max-h-[92vh] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#FBF9F5] border border-[#DDD3C6] shadow-2xl flex flex-col text-[#2C241D]"
        >
          {/* Header */}
          <div className="bg-[#1C1814] text-white px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between border-b border-[#332A22]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#2C241D] border border-[#D4AF37]/50 text-[#D4AF37] flex items-center justify-center shadow-xs">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif-display text-base sm:text-lg font-bold tracking-wide">
                  The Malabar Oils — Admin Portal
                </h3>
                <p className="text-[10px] text-[#A89C8C] tracking-wider uppercase">
                  Orders & Live Catalog Management
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {isAuthenticated && (
                <button
                  onClick={() => setIsAuthenticated(false)}
                  className="px-2.5 py-1 text-[11px] font-bold uppercase rounded-lg bg-white/10 hover:bg-white/20 text-[#D8CFBF] flex items-center gap-1 cursor-pointer border border-white/15"
                  title="Lock Admin Session"
                >
                  <Lock className="w-3 h-3 text-[#D4AF37]" />
                  <span>Lock</span>
                </button>
              )}
              <button
                onClick={() => {
                  setIsAuthenticated(false);
                  onClose();
                }}
                className="w-8 h-8 rounded-lg hover:bg-white/10 active:scale-95 text-[#D8CFBF] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close Admin Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {!isAuthenticated ? (
            /* Login Screen */
            <div className="p-6 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
              <div className="w-14 h-14 rounded-full bg-[#EDE5DB] border border-[#D4AF37]/50 text-[#2C241D] flex items-center justify-center mb-4 shadow-xs">
                <Lock className="w-6 h-6 text-[#D4AF37]" />
              </div>
              <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#2C241D] mb-1">
                Store Owner Access
              </h4>
              <p className="text-xs text-[#7A6E61] max-w-sm mb-6">
                Enter your 4-digit passkey to view incoming orders and manage product pricing.
              </p>

              <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3">
                <div>
                  <input
                    type="password"
                    placeholder="Enter Passkey"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    autoFocus
                    maxLength={10}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#D2C5B4] bg-white text-base focus:outline-none focus:border-[#2C241D] focus:ring-1 focus:ring-[#2C241D] shadow-xs text-center font-mono tracking-widest font-bold"
                  />
                  {authError && (
                    <p className="text-[11px] text-red-600 font-semibold mt-1.5">{authError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[42px] bg-[#2C241D] hover:bg-[#1A1512] active:scale-[0.98] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer border border-[#D4AF37]/40"
                >
                  Unlock Admin Portal
                </button>
              </form>
            </div>
          ) : (
            /* Main Admin Dashboard */
            <>
              {/* Tab Navigation */}
              <div className="flex border-b border-[#E8DFD3] bg-[#F2EDE5] px-4 pt-2 gap-1.5 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                    activeTab === 'orders'
                      ? 'bg-[#FBF9F5] text-[#2C241D] border-t border-x border-[#E8DFD3] shadow-xs'
                      : 'text-[#7A6E61] hover:text-[#2C241D]'
                  }`}
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Orders</span>
                  <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-[#2C241D] text-white font-bold ml-0.5">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('prices')}
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
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
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
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
                  className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-t-xl transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
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
              <div className="p-4 sm:p-6 overflow-y-auto max-h-[64vh] space-y-5">
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

                {/* TAB 1: ORDERS DASHBOARD */}
                {activeTab === 'orders' && (
                  <div className="space-y-4">
                    {/* Orders Metric KPI Cards */}
                    <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
                      <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
                        <span className="text-[10px] uppercase font-bold text-[#8C7E70] block">Total Orders</span>
                        <div className="text-lg sm:text-2xl font-black text-[#2C241D] mt-0.5">{orders.length}</div>
                      </div>

                      <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
                        <span className="text-[10px] uppercase font-bold text-[#8C7E70] block">Pending Dispatch</span>
                        <div className="text-lg sm:text-2xl font-black text-[#D97706] mt-0.5">{pendingCount}</div>
                      </div>

                      <div className="p-3 sm:p-4 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs">
                        <span className="text-[10px] uppercase font-bold text-[#8C7E70] block">Total Revenue</span>
                        <div className="text-lg sm:text-2xl font-black text-[#2C241D] mt-0.5">₹{totalRevenue}</div>
                      </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-b border-[#EFEAE2] pb-2.5">
                      <div className="flex items-center gap-1.5 overflow-x-auto">
                        <span className="text-[10px] uppercase font-bold text-[#8C7E70] mr-1 flex items-center gap-1">
                          <Filter className="w-3 h-3" /> Filter:
                        </span>
                        {['all', 'Pending', 'Confirmed', 'Dispatched', 'Delivered'].map((flt) => (
                          <button
                            key={flt}
                            onClick={() => setOrderFilter(flt)}
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                              orderFilter === flt
                                ? 'bg-[#2C241D] text-white shadow-xs'
                                : 'bg-white border border-[#DDD3C5] text-[#7A6E61] hover:text-[#2C241D]'
                            }`}
                          >
                            {flt}
                          </button>
                        ))}
                      </div>

                      {orders.length > 0 && (
                        <button
                          onClick={() => {
                            if (window.confirm('Clear all stored orders?')) clearAllOrders();
                          }}
                          className="text-[10px] text-red-600 hover:text-red-700 font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Clear Orders</span>
                        </button>
                      )}
                    </div>

                    {/* Orders List */}
                    {filteredOrders.length === 0 ? (
                      <div className="text-center py-12 bg-white rounded-2xl border border-[#E7DFD5]">
                        <ShoppingBag className="w-10 h-10 text-[#C4B7A5] mx-auto mb-2" />
                        <h5 className="font-bold text-sm text-[#2C241D]">No Orders Found</h5>
                        <p className="text-xs text-[#8C7E70] mt-0.5">
                          {orderFilter !== 'all' ? `No orders with status "${orderFilter}"` : 'Customer checkout orders will appear here in real-time.'}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3.5">
                        {filteredOrders.map((ord) => {
                          const orderTime = new Date(ord.createdAt);
                          const formattedDate = orderTime.toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          });
                          const formattedHour = orderTime.toLocaleTimeString('en-IN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          });

                          return (
                            <div
                              key={ord.id}
                              className="p-4 sm:p-5 rounded-2xl bg-white border border-[#E7DFD5] shadow-xs space-y-3"
                            >
                              {/* Order Header */}
                              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#F4EFEA] pb-2.5">
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-xs sm:text-sm text-[#2C241D] bg-[#F5ECE1] px-2 py-0.5 rounded-md border border-[#D4AF37]/40">
                                    {ord.id}
                                  </span>
                                  <span className="text-[11px] text-[#8C7E70] flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    {formattedDate} at {formattedHour}
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  {/* Status Dropdown */}
                                  <select
                                    value={ord.status}
                                    onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                                    className={`text-xs font-bold px-2 py-1 rounded-lg border cursor-pointer ${
                                      ord.status === 'Pending'
                                        ? 'bg-amber-50 text-amber-800 border-amber-300'
                                        : ord.status === 'Confirmed'
                                        ? 'bg-blue-50 text-blue-800 border-blue-300'
                                        : ord.status === 'Dispatched'
                                        ? 'bg-purple-50 text-purple-800 border-purple-300'
                                        : ord.status === 'Delivered'
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                        : 'bg-red-50 text-red-800 border-red-300'
                                    }`}
                                  >
                                    <option value="Pending">Pending</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Dispatched">Dispatched</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>

                                  <button
                                    onClick={() => deleteOrder(ord.id)}
                                    title="Delete order"
                                    className="p-1 hover:bg-[#F2ECE3] text-[#8C7E70] hover:text-red-600 rounded-md transition-colors cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              {/* Customer and Delivery Info */}
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="space-y-1">
                                  <span className="text-[10px] uppercase font-bold text-[#8C7E70] block">Customer:</span>
                                  <div className="font-bold text-[#2C241D] text-sm">{ord.customerName}</div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-mono text-[#5A4E41]">{ord.phone}</span>
                                    <a
                                      href={`https://wa.me/91${ord.phone.replace(/\D/g, '')}?text=${encodeURIComponent(
                                        `Hello ${ord.customerName}, regarding your Order ${ord.id} at The Malabar Oils...`
                                      )}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase text-[#2C241D] hover:text-[#D4AF37] bg-[#FAF7F2] px-2 py-0.5 rounded border border-[#DDD3C5]"
                                    >
                                      <MessageCircle className="w-3 h-3 text-[#D4AF37]" />
                                      <span>WhatsApp</span>
                                    </a>
                                  </div>
                                </div>

                                <div className="space-y-1">
                                  <span className="text-[10px] uppercase font-bold text-[#8C7E70] block">Delivery Address:</span>
                                  <p className="text-[#4A3E32] leading-tight">
                                    {ord.address}, <strong className="text-[#2C241D]">{ord.city}</strong> - {ord.pincode}
                                  </p>
                                  {ord.notes && (
                                    <div className="text-[10px] text-[#8C6D3B] italic mt-0.5">Note: "{ord.notes}"</div>
                                  )}
                                </div>
                              </div>

                              {/* Items Table */}
                              <div className="bg-[#FAF7F2] rounded-xl p-2.5 border border-[#EDE5DB] space-y-1.5 text-xs">
                                <div className="text-[10px] uppercase font-bold text-[#8C7E70] border-b border-[#E7DFD5] pb-1 flex justify-between">
                                  <span>Product Ordered</span>
                                  <span>Subtotal</span>
                                </div>
                                {ord.items.map((it, idx) => (
                                  <div key={idx} className="flex justify-between items-center py-0.5">
                                    <span className="text-[#2C241D] font-medium">
                                      {it.productName} ({it.sizeLabel}) × <strong className="font-bold">{it.quantity}</strong>
                                    </span>
                                    <span className="font-mono font-bold text-[#2C241D]">
                                      ₹{it.price * it.quantity}
                                    </span>
                                  </div>
                                ))}

                                <div className="flex justify-between items-center pt-1.5 border-t border-[#E7DFD5] text-xs font-bold text-[#2C241D]">
                                  <span>Total Payable ({ord.paymentMethod}):</span>
                                  <span className="text-sm font-black font-mono">₹{ord.totalAmount}</span>
                                </div>
                              </div>

                              {/* Footer Actions */}
                              <div className="flex items-center justify-end gap-2 pt-1">
                                <button
                                  onClick={() => handleCopyOrder(ord)}
                                  className="inline-flex items-center gap-1 px-3 py-1 bg-white border border-[#DDD3C5] hover:bg-[#FAF7F2] rounded-lg text-[11px] font-bold text-[#2C241D] cursor-pointer"
                                >
                                  {copiedOrderId === ord.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-[#D4AF37]" />
                                      <span>Copied!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3 text-[#D4AF37]" />
                                      <span>Copy WhatsApp Receipt</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {/* TAB 2: PRICES */}
                {activeTab === 'prices' && (
                  <div className="space-y-5">
                    {editableCatalog.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 rounded-2xl bg-white border border-[#E8E0D4] shadow-xs"
                      >
                        <div className="flex items-center justify-between gap-3 mb-3 border-b border-[#F4EFEA] pb-2">
                          <div className="flex items-center gap-3">
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
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className="px-2.5 py-1 text-[11px] font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-lg transition-colors flex items-center gap-1 cursor-pointer shrink-0"
                            title={`Delete ${product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
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

                {/* TAB 3: CONTENT */}
                {activeTab === 'content' && (
                  <div className="space-y-4">
                    {editableCatalog.map((product) => (
                      <div
                        key={product.id}
                        className="p-4 rounded-2xl bg-white border border-[#E8E0D4] space-y-3 shadow-xs"
                      >
                        <div className="flex items-center justify-between pb-1 border-b border-[#F4EFEA]">
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
                              {product.name} ({product.id})
                            </h5>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(product.id, product.name)}
                            className="px-2.5 py-1 text-[11px] font-bold text-red-600 hover:text-white hover:bg-red-600 border border-red-200 hover:border-red-600 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                            title={`Delete ${product.name}`}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
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

                {/* TAB 4: STORE SETTINGS */}
                {activeTab === 'settings' && (
                  <div className="p-5 rounded-2xl bg-white border border-[#E8E0D4] space-y-4">
                    <h5 className="font-bold text-sm text-[#2C241D] flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#D4AF37]" />
                      <span>WhatsApp Order Routing Number</span>
                    </h5>
                    <p className="text-xs text-[#7A6E61]">
                      All customer order messages and trade inquiries will be routed to this number.
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

                    {/* Live Production Deployment Sync & Export */}
                    <div className="pt-4 border-t border-[#F2ECE3] space-y-2.5">
                      <div>
                        <span className="text-xs font-bold text-[#2C241D] flex items-center gap-1.5">
                          <Cloud className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Live Store Global Deployment</span>
                        </span>
                        <p className="text-[11px] text-[#7A6E61] mt-0.5 leading-relaxed">
                          Edits in this panel take effect immediately in this browser. To deploy your updated prices & products permanently across all customer phones and computers worldwide on Vercel, copy the updated catalog JSON below and ask your AI assistant to commit it to production.
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(JSON.stringify(editableCatalog, null, 2));
                            alert('Updated store catalog JSON copied to clipboard! You can share this to deploy permanently to Vercel.');
                          }}
                          className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#EDE5DB] border border-[#DDD3C5] rounded-xl text-xs font-bold text-[#2C241D] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Copy Updated Catalog JSON</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const blob = new Blob([JSON.stringify(editableCatalog, null, 2)], { type: 'application/json' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `malabar-catalog-${new Date().toISOString().slice(0, 10)}.json`;
                            a.click();
                          }}
                          className="px-3.5 py-2 bg-[#FAF7F2] hover:bg-[#EDE5DB] border border-[#DDD3C5] rounded-xl text-xs font-bold text-[#2C241D] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                        >
                          <Download className="w-3.5 h-3.5 text-[#D4AF37]" />
                          <span>Download Backup</span>
                        </button>
                      </div>
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
                  onClick={() => {
                    setIsAuthenticated(false);
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#7A6E61] hover:text-[#2C241D] cursor-pointer"
                >
                  Close & Lock
                </button>

                {activeTab !== 'orders' && (
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="min-h-[40px] px-5 bg-[#2C241D] hover:bg-[#1A1512] active:scale-95 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 shadow-xs transition-all cursor-pointer border border-[#D4AF37]/40"
                    >
                      <Save className="w-4 h-4 text-[#D4AF37]" />
                      <span>Save & Publish Live</span>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
