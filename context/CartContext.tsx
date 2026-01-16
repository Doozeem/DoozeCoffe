import React, { createContext, useContext, useState, ReactNode } from 'react';
import { MenuItem } from '../types';
import { WHATSAPP_NUMBER } from '../constants';

interface CartItem extends MenuItem {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: number) => void;
  decreaseQuantity: (itemId: number) => void;
  clearCart: () => void;
  totalPrice: number;
  totalItems: number;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  checkoutViaWhatsApp: () => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  tableNumber: string;
  setTableNumber: (num: string) => void;
  lastAddedItem: string | null; // For Toast Notification
  clearNotification: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [tableNumber, setTableNumber] = useState('');
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null);

  const parsePrice = (priceStr: string) => {
    // Convert "IDR 18K" to 18000
    const num = parseInt(priceStr.replace(/[^0-9]/g, ''));
    return num * 1000;
  };

  const addToCart = (item: MenuItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    
    // UX Improvement: Don't auto open cart, show notification instead
    setLastAddedItem(`${item.name} ditambahkan`);
    // setIsCartOpen(true); 
  };

  const clearNotification = () => {
    setLastAddedItem(null);
  }

  const decreaseQuantity = (itemId: number) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.max(0, item.quantity - 1) };
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (itemId: number) => {
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const clearCart = () => setItems([]);

  const totalPrice = items.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const checkoutViaWhatsApp = () => {
    if (items.length === 0) return;

    // Generate Header Data
    const date = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
    const time = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const orderId = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    // Default values if empty
    const cName = customerName.trim() || "Pelanggan";
    const tNum = tableNumber.trim() || "-";

    // Build Receipt Message
    let message = `🧾 *DOOZEE COFFEE - ORDER* 🧾\n`;
    message += `Jl. Raya Samalanga, Kota Santri, Bireuen\n`;
    message += `--------------------------------\n`;
    message += `Tanggal : ${date}\n`;
    message += `Jam     : ${time}\n`;
    message += `Order ID: #${orderId}\n`;
    message += `--------------------------------\n`;
    message += `Nama    : *${cName}*\n`;
    message += `No. Meja: *${tNum}*\n`;
    message += `--------------------------------\n\n`;
    message += `*PESANAN:*\n`;
    
    items.forEach((item) => {
      const unitPrice = parseInt(item.price.replace(/[^0-9]/g, '')) * 1000;
      const subtotal = unitPrice * item.quantity;
      const formattedSubtotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(subtotal);
      
      message += `*${item.quantity}x ${item.name}*\n`;
      message += `   @ ${item.price} = ${formattedSubtotal}\n`;
    });

    const formattedTotal = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(totalPrice);
    
    message += `\n--------------------------------\n`;
    message += `*TOTAL: ${formattedTotal}*\n`;
    message += `--------------------------------\n\n`;
    message += `Mohon diproses ya kak, terima kasih! 🙏`;

    const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      decreaseQuantity,
      clearCart,
      totalPrice,
      totalItems,
      isCartOpen,
      setIsCartOpen,
      checkoutViaWhatsApp,
      customerName,
      setCustomerName,
      tableNumber,
      setTableNumber,
      lastAddedItem,
      clearNotification
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};