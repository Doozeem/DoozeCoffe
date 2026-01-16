import { MenuItem, NavLink } from './types';

export const NAV_LINKS: NavLink[] = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Menu', href: '#menu' },
  { name: 'Location', href: '#contact' },
];

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Kopi Sanger (Saring)",
    price: "IDR 18K",
    description: "Kopi saring khas Aceh dicampur susu kental manis dan gula, ditarik hingga berbuih ('Sama-sama Ngerti').",
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    name: "Kopi Hitam Gayo",
    price: "IDR 15K",
    description: "Kopi Arabica Gayo murni dengan aroma kuat dan body tebal, diseduh cara tradisional.",
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    name: "Kopi Khop (Terbalik)",
    price: "IDR 18K",
    description: "Sensasi unik minum kopi khas Meulaboh dengan gelas terbalik, disajikan dengan sedotan.",
    category: "Coffee",
    image: "https://images.unsplash.com/photo-1551030173-122f6d35fd84?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    name: "Teh Tarik Aceh",
    price: "IDR 18K",
    description: "Teh susu saring yang ditarik tinggi, menghasilkan buih creamy yang kaya rasa.",
    category: "Non-Coffee",
    image: "https://images.unsplash.com/photo-1627993072520-8e2b83eb1499?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 5,
    name: "Es Timun Serut",
    price: "IDR 15K",
    description: "Minuman segar serutan timun dengan sirup jeruk nipis khas Aceh, penetralisir sempurna.",
    category: "Non-Coffee",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 6,
    name: "Mie Aceh Spesial Daging",
    price: "IDR 35K",
    description: "Mie kuning tebal dengan bumbu rempah kari yang kuat, pedas, dan daging sapi empuk.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 7,
    name: "Roti Canai Kari Kambing",
    price: "IDR 30K",
    description: "Roti pipih renyah di luar lembut di dalam, dicocol kuah kari kambing kental.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 8,
    name: "Martabak Aceh",
    price: "IDR 25K",
    description: "Telur dadar tebal dengan campuran sayuran dan rempah, disajikan dengan acar bawang merah.",
    category: "Food",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=800&auto=format&fit=crop"
  }
];

export const WHATSAPP_NUMBER = "6285277176389";