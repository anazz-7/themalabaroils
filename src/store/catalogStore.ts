import { useState, useEffect } from 'react';

export interface ProductSize {
  label: string;
  price: number;
  originalPrice: number;
}

export interface CatalogProduct {
  id: string;
  name: string;
  shortMobileName: string;
  tamilName: string;
  image: string;
  capColor: 'red' | 'blue' | 'yellow' | 'green';
  capLabel: string;
  badgeBg: string;
  badgeText: string;
  glowColor: string;
  sizes: ProductSize[];
  isCombo?: boolean;
}

export const DEFAULT_WHATSAPP_NUMBER = '916379849947';

export const DEFAULT_CATALOG: CatalogProduct[] = [
  {
    id: 'gingelly',
    name: 'Agmark Chekku Gingelly Oil',
    shortMobileName: 'Chekku Gingelly Oil',
    tamilName: 'அக்மார்க் செக்கு நல்லெண்ணெய்',
    image: '/gingelly-oil.jpg',
    capColor: 'yellow',
    capLabel: 'Yellow Seal',
    badgeBg: '#FEF3C7',
    badgeText: '#92400E',
    glowColor: 'rgba(217, 119, 6, 0.25)',
    sizes: [
      { label: '500 ml', price: 220, originalPrice: 250 },
      { label: '1 Litre', price: 420, originalPrice: 470 },
      { label: '5 Litres', price: 2050, originalPrice: 2350 }
    ]
  },
  {
    id: 'coconut',
    name: 'Agmark Chekku Coconut Oil',
    shortMobileName: 'Chekku Coconut Oil',
    tamilName: 'அக்மார்க் செக்கு தேங்காய் எண்ணெய்',
    image: '/coconut-oil.jpg',
    capColor: 'blue',
    capLabel: 'Blue Seal',
    badgeBg: '#DBEAFE',
    badgeText: '#1E40AF',
    glowColor: 'rgba(37, 99, 235, 0.25)',
    sizes: [
      { label: '500 ml', price: 220, originalPrice: 250 },
      { label: '1 Litre', price: 420, originalPrice: 475 },
      { label: '5 Litres', price: 2000, originalPrice: 2250 }
    ]
  },
  {
    id: 'groundnut',
    name: 'Agmark Chekku Groundnut Oil',
    shortMobileName: 'Chekku Groundnut Oil',
    tamilName: 'அக்மார்க் செக்கு கடலை எண்ணெய்',
    image: '/groundnut-oil.jpg',
    capColor: 'red',
    capLabel: 'Red Seal',
    badgeBg: '#FEE2E2',
    badgeText: '#991B1B',
    glowColor: 'rgba(220, 38, 38, 0.25)',
    sizes: [
      { label: '500 ml', price: 220, originalPrice: 250 },
      { label: '1 Litre', price: 420, originalPrice: 460 },
      { label: '5 Litres', price: 2000, originalPrice: 2200 }
    ]
  },
  {
    id: 'trio-bundle',
    name: 'The Malabar Grand Trio Box',
    shortMobileName: 'Grand Trio Box',
    tamilName: 'செக்கு எண்ணெய் முக்கூட்டு பேக்',
    image: '/hero-bottles.jpg',
    capColor: 'green',
    capLabel: 'Heritage Trio',
    badgeBg: '#F5ECE1',
    badgeText: '#4A3B2C',
    glowColor: 'rgba(212, 175, 55, 0.25)',
    sizes: [
      { label: '3 x 500 ml', price: 625, originalPrice: 770 },
      { label: '3 x 1 Litre', price: 1199, originalPrice: 1445 },
      { label: '3 x 5 Litres', price: 5799, originalPrice: 6900 }
    ],
    isCombo: true
  },
  {
    id: 'castor',
    name: 'Agmark Pure Chekku Castor Oil',
    shortMobileName: 'Chekku Castor Oil',
    tamilName: 'பாரம்பரிய விளக்கெண்ணெய்',
    image: '/gingelly-oil.jpg',
    capColor: 'yellow',
    capLabel: 'Pure Seed',
    badgeBg: '#FEF3C7',
    badgeText: '#78350F',
    glowColor: 'rgba(217, 119, 6, 0.2)',
    sizes: [
      { label: '200 ml', price: 110, originalPrice: 130 },
      { label: '500 ml', price: 240, originalPrice: 275 },
      { label: '1 Litre', price: 460, originalPrice: 510 }
    ]
  },
  {
    id: 'deepam',
    name: 'Pancha Deepam Sacred Pooja Oil',
    shortMobileName: 'Pancha Deepam Oil',
    tamilName: 'ஐந்து கூட்டு தீப எண்ணெய்',
    image: '/hero-bottles.jpg',
    capColor: 'green',
    capLabel: 'Pooja Special',
    badgeBg: '#FEF9C3',
    badgeText: '#854D0E',
    glowColor: 'rgba(234, 179, 8, 0.25)',
    sizes: [
      { label: '1 Litre', price: 290, originalPrice: 340 },
      { label: '2 Litres', price: 560, originalPrice: 650 },
      { label: '5 Litres', price: 1350, originalPrice: 1550 }
    ]
  },
  {
    id: 'naatu-sakkarai',
    name: 'Organic Traditional Naatu Sakkarai',
    shortMobileName: 'Naatu Sakkarai',
    tamilName: 'இயற்கை நாட்டு சர்க்கரை',
    image: '/groundnut-oil.jpg',
    capColor: 'red',
    capLabel: 'Unrefined',
    badgeBg: '#FFEDD5',
    badgeText: '#9A3412',
    glowColor: 'rgba(234, 88, 12, 0.2)',
    sizes: [
      { label: '1 kg', price: 130, originalPrice: 150 },
      { label: '2 kg', price: 250, originalPrice: 290 },
      { label: '5 kg', price: 590, originalPrice: 700 }
    ]
  },
  {
    id: 'wild-honey',
    name: 'Western Ghats Pure Wild Honey',
    shortMobileName: 'Forest Wild Honey',
    tamilName: 'மலைத்தேன் (சுத்தமான தேன்)',
    image: '/coconut-oil.jpg',
    capColor: 'blue',
    capLabel: 'Raw Unheated',
    badgeBg: '#FEF3C7',
    badgeText: '#92400E',
    glowColor: 'rgba(217, 119, 6, 0.25)',
    sizes: [
      { label: '250 g', price: 220, originalPrice: 260 },
      { label: '500 g', price: 420, originalPrice: 490 },
      { label: '1 kg', price: 799, originalPrice: 950 }
    ]
  }
];

const STORAGE_CATALOG_KEY = 'malabar_catalog_v5';
const STORAGE_PHONE_KEY = 'malabar_whatsapp_phone_v2';

const listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export function getStoredCatalog(): CatalogProduct[] {
  try {
    const raw = localStorage.getItem(STORAGE_CATALOG_KEY);
    if (!raw) return DEFAULT_CATALOG;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_CATALOG;
  } catch {
    return DEFAULT_CATALOG;
  }
}

export function getStoredWhatsAppNumber(): string {
  try {
    const raw = localStorage.getItem(STORAGE_PHONE_KEY);
    return raw && raw.trim().length >= 10 ? raw.trim() : DEFAULT_WHATSAPP_NUMBER;
  } catch {
    return DEFAULT_WHATSAPP_NUMBER;
  }
}

export function saveCatalog(newCatalog: CatalogProduct[]) {
  try {
    localStorage.setItem(STORAGE_CATALOG_KEY, JSON.stringify(newCatalog));
    emitChange();
  } catch (err) {
    console.error('Failed to save catalog to localStorage', err);
  }
}

export function saveWhatsAppNumber(newPhone: string) {
  try {
    localStorage.setItem(STORAGE_PHONE_KEY, newPhone);
    emitChange();
  } catch (err) {
    console.error('Failed to save WhatsApp phone', err);
  }
}

export function deleteProduct(productId: string) {
  const current = getStoredCatalog();
  const updated = current.filter((p) => p.id !== productId);
  saveCatalog(updated);
}

export function addProduct(product: CatalogProduct) {
  const current = getStoredCatalog();
  saveCatalog([...current, product]);
}

export function resetCatalogToDefaults() {
  try {
    localStorage.removeItem(STORAGE_CATALOG_KEY);
    localStorage.removeItem(STORAGE_PHONE_KEY);
    emitChange();
  } catch (err) {
    console.error('Failed to reset catalog', err);
  }
}

export function useCatalog() {
  const [catalog, setCatalog] = useState<CatalogProduct[]>(getStoredCatalog);
  const [whatsappNumber, setWhatsappNumber] = useState<string>(getStoredWhatsAppNumber);

  useEffect(() => {
    const handleUpdate = () => {
      setCatalog(getStoredCatalog());
      setWhatsappNumber(getStoredWhatsAppNumber());
    };

    listeners.push(handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      const idx = listeners.indexOf(handleUpdate);
      if (idx !== -1) listeners.splice(idx, 1);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return {
    catalog,
    whatsappNumber,
    saveCatalog,
    saveWhatsAppNumber,
    deleteProduct,
    addProduct,
    resetCatalogToDefaults
  };
}
