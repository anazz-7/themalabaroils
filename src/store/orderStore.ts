import { useState, useEffect } from 'react';

export interface OrderItem {
  productId: string;
  productName: string;
  sizeLabel: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'Pending' | 'Confirmed' | 'Dispatched' | 'Delivered' | 'Cancelled';

export interface CustomerOrder {
  id: string; // e.g. MBO-8291
  createdAt: string; // ISO date string
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: OrderItem[];
  totalAmount: number;
  paymentMethod: 'Cash on Delivery' | 'UPI / WhatsApp';
  notes?: string;
  status: OrderStatus;
}

const STORAGE_ORDERS_KEY = 'malabar_orders_v1';

// Initial seed orders so store owner can see how orders look in Admin
const INITIAL_DEMO_ORDERS: CustomerOrder[] = [
  {
    id: 'MBO-9142',
    createdAt: new Date(Date.now() - 3600000 * 2.5).toISOString(),
    customerName: 'Kavitha Ramachandran',
    phone: '9840123456',
    address: 'Flat 4B, Emerald Heights, Anna Nagar',
    city: 'Chennai',
    pincode: '600040',
    items: [
      {
        productId: 'gingelly',
        productName: 'Agmark Chekku Gingelly Oil',
        sizeLabel: '1 Litre',
        price: 420,
        quantity: 2
      },
      {
        productId: 'coconut',
        productName: 'Agmark Chekku Coconut Oil',
        sizeLabel: '500 ml',
        price: 220,
        quantity: 1
      }
    ],
    totalAmount: 1060,
    paymentMethod: 'Cash on Delivery',
    notes: 'Please pack carefully in bubble wrap.',
    status: 'Confirmed'
  },
  {
    id: 'MBO-8924',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    customerName: 'Senthil Kumar',
    phone: '9443187654',
    address: '14, Gandhi Road, Tallakulam',
    city: 'Madurai',
    pincode: '625002',
    items: [
      {
        productId: 'trio-bundle',
        productName: 'The Malabar Grand Trio Box',
        sizeLabel: '3 x 1 Litre',
        price: 1199,
        quantity: 1
      }
    ],
    totalAmount: 1199,
    paymentMethod: 'UPI / WhatsApp',
    notes: 'Call before delivery',
    status: 'Dispatched'
  }
];

const listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function getStoredOrders(): CustomerOrder[] {
  try {
    const raw = localStorage.getItem(STORAGE_ORDERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(INITIAL_DEMO_ORDERS));
      return INITIAL_DEMO_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : INITIAL_DEMO_ORDERS;
  } catch {
    return INITIAL_DEMO_ORDERS;
  }
}

export function createOrder(
  data: Omit<CustomerOrder, 'id' | 'createdAt' | 'status'>
): CustomerOrder {
  const currentOrders = getStoredOrders();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newOrder: CustomerOrder = {
    ...data,
    id: `MBO-${randomSuffix}`,
    createdAt: new Date().toISOString(),
    status: 'Pending'
  };

  const updatedOrders = [newOrder, ...currentOrders];
  try {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updatedOrders));
    emitChange();
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newOrder)
    }).catch(() => {});
  } catch (err) {
    console.error('Failed to save order to localStorage', err);
  }

  return newOrder;
}

export function updateOrderStatus(orderId: string, newStatus: OrderStatus) {
  const currentOrders = getStoredOrders();
  const updatedOrders = currentOrders.map((ord) =>
    ord.id === orderId ? { ...ord, status: newStatus } : ord
  );
  try {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updatedOrders));
    emitChange();
  } catch (err) {
    console.error('Failed to update order status', err);
  }
}

export function deleteOrder(orderId: string) {
  const currentOrders = getStoredOrders();
  const updatedOrders = currentOrders.filter((ord) => ord.id !== orderId);
  try {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(updatedOrders));
    emitChange();
  } catch (err) {
    console.error('Failed to delete order', err);
  }
}

export function clearAllOrders() {
  try {
    localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify([]));
    emitChange();
  } catch (err) {
    console.error('Failed to clear orders', err);
  }
}

export function useOrders() {
  const [orders, setOrders] = useState<CustomerOrder[]>(getStoredOrders);

  useEffect(() => {
    const handleUpdate = () => {
      setOrders(getStoredOrders());
    };

    listeners.push(handleUpdate);
    window.addEventListener('storage', handleUpdate);

    fetch('/api/orders')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && Array.isArray(data.orders) && data.orders.length > 0) {
          const current = getStoredOrders();
          const merged = [...data.orders, ...current.filter((c) => !data.orders.some((o: CustomerOrder) => o.id === c.id))];
          localStorage.setItem(STORAGE_ORDERS_KEY, JSON.stringify(merged));
          emitChange();
        }
      })
      .catch(() => {});

    return () => {
      const idx = listeners.indexOf(handleUpdate);
      if (idx !== -1) listeners.splice(idx, 1);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    orders,
    createOrder,
    updateOrderStatus,
    deleteOrder,
    clearAllOrders
  };
}

