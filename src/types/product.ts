
export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  sizes: string[];
  colors: string[];
  inStock: boolean;
}
