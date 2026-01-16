export type Category = 'All' | 'Coffee' | 'Non-Coffee' | 'Food';

export interface MenuItem {
  id: number;
  name: string;
  price: string; // Formatted price e.g., "IDR 25K"
  description: string;
  category: Category;
  image: string;
}

export interface NavLink {
  name: string;
  href: string;
}