
import { Product } from '@/types/product';
import { CartItem } from '@/types/cart';

// Mock product data
const products: Product[] = [
  {
    id: '1',
    name: 'Premium Cotton T-Shirt',
    brand: 'Allen Solly',
    description: 'A comfortable and stylish cotton t-shirt perfect for casual wear.',
    price: 1499,
    originalPrice: 1999,
    discount: 25,
    image: 'https://source.unsplash.com/rK9vXlN3GX0',
    category: 'Apparel',
    rating: 4.5,
    reviewCount: 120,
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Blue'],
    inStock: true
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    brand: 'Levis',
    description: 'Classic slim fit jeans that offer both comfort and style for everyday wear.',
    price: 2499,
    originalPrice: 3499,
    discount: 30,
    image: 'https://source.unsplash.com/ujwgbCfJoJE',
    category: 'Apparel',
    rating: 4.2,
    reviewCount: 85,
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Blue', 'Black', 'Grey'],
    inStock: true
  },
  {
    id: '3',
    name: 'Running Shoes',
    brand: 'Puma',
    description: 'Lightweight and durable running shoes with excellent cushioning for maximum comfort.',
    price: 3999,
    originalPrice: 5499,
    discount: 25,
    image: 'https://source.unsplash.com/EPjXIJhBZFI',
    category: 'Footwear',
    rating: 4.7,
    reviewCount: 210,
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    colors: ['Black', 'White', 'Red'],
    inStock: true
  },
  {
    id: '4',
    name: 'Leather Wallet',
    brand: 'Hidesign',
    description: 'Premium genuine leather wallet with multiple card slots and a coin pocket.',
    price: 1299,
    originalPrice: 1999,
    discount: 35,
    image: 'https://source.unsplash.com/kwWqf0iX4L4',
    category: 'Accessories',
    rating: 4.4,
    reviewCount: 62,
    sizes: ['OS'],
    colors: ['Brown', 'Black'],
    inStock: true
  },
  {
    id: '5',
    name: 'Formal Shirt',
    brand: 'Van Heusen',
    description: 'Classic formal shirt made with premium cotton for a comfortable and sharp look.',
    price: 1799,
    originalPrice: 2299,
    discount: 20,
    image: 'https://source.unsplash.com/5om5y8GTimQ',
    category: 'Apparel',
    rating: 4.3,
    reviewCount: 95,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Blue', 'Light Blue'],
    inStock: true
  },
  {
    id: '6',
    name: 'Sports Watch',
    brand: 'Fastrack',
    description: 'Durable sports watch with multiple features including stopwatch and water resistance.',
    price: 2499,
    originalPrice: 2999,
    discount: 15,
    image: 'https://source.unsplash.com/Yka2yhGJwjw',
    category: 'Accessories',
    rating: 4.6,
    reviewCount: 78,
    sizes: ['OS'],
    colors: ['Black', 'Blue', 'Orange'],
    inStock: true
  },
  {
    id: '7',
    name: 'Casual Sneakers',
    brand: 'Nike',
    description: 'Comfortable and stylish casual sneakers for everyday wear.',
    price: 4999,
    originalPrice: 6499,
    discount: 25,
    image: 'https://source.unsplash.com/NOpsC3nWTzY',
    category: 'Footwear',
    rating: 4.8,
    reviewCount: 156,
    sizes: ['38', '39', '40', '41', '42', '43'],
    colors: ['White', 'Black', 'Grey'],
    inStock: true
  },
  {
    id: '8',
    name: 'Leather Belt',
    brand: 'Woodland',
    description: 'Premium genuine leather belt with a classic design.',
    price: 1299,
    originalPrice: 1699,
    discount: 20,
    image: 'https://source.unsplash.com/5pwFREUxbxM',
    category: 'Accessories',
    rating: 4.5,
    reviewCount: 42,
    sizes: ['32', '34', '36', '38', '40'],
    colors: ['Brown', 'Black'],
    inStock: true
  },
  {
    id: '9',
    name: 'Hooded Sweatshirt',
    brand: 'Jack & Jones',
    description: 'Comfortable and warm hooded sweatshirt for casual outings.',
    price: 1899,
    originalPrice: 2499,
    discount: 25,
    image: 'https://source.unsplash.com/1-aA2Fadydc',
    category: 'Apparel',
    rating: 4.2,
    reviewCount: 87,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Black', 'Navy Blue'],
    inStock: true
  },
  {
    id: '10',
    name: 'Dress Shoes',
    brand: 'Hush Puppies',
    description: 'Elegant dress shoes made with genuine leather for formal occasions.',
    price: 4999,
    originalPrice: 6499,
    discount: 20,
    image: 'https://source.unsplash.com/k8TZKLnXgj4',
    category: 'Footwear',
    rating: 4.7,
    reviewCount: 63,
    sizes: ['39', '40', '41', '42', '43', '44'],
    colors: ['Black', 'Brown'],
    inStock: true
  },
  {
    id: '11',
    name: 'Sling Bag',
    brand: 'Baggit',
    description: 'Stylish and practical sling bag perfect for daily use.',
    price: 1599,
    originalPrice: 1999,
    discount: 20,
    image: 'https://source.unsplash.com/OMxTTmgPGCI',
    category: 'Accessories',
    rating: 4.3,
    reviewCount: 55,
    sizes: ['OS'],
    colors: ['Black', 'Brown', 'Tan'],
    inStock: true
  },
  {
    id: '12',
    name: 'Polo T-Shirt',
    brand: 'USPA',
    description: 'Classic polo t-shirt with a comfortable fit and premium cotton fabric.',
    price: 1699,
    originalPrice: 2299,
    discount: 25,
    image: 'https://source.unsplash.com/S3GrMiUhpNU',
    category: 'Apparel',
    rating: 4.5,
    reviewCount: 92,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['White', 'Black', 'Blue', 'Red'],
    inStock: true
  },
];

// Function to get a single product by ID
export function getMockProductById(id: string): Product | null {
  return products.find(product => product.id === id) || null;
}

// Function to get a random number of products
export function getMockProducts(count: number = 8): Product[] {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to get product by category
export function getMockProductsByCategory(category: string, count: number = 4): Product[] {
  const filtered = products.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
  
  // If not enough products in the category, return what we have
  if (filtered.length <= count) return filtered;
  
  // Otherwise return random selection
  const shuffled = [...filtered].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to get mock cart items
export function getMockCartItems(): CartItem[] {
  // Check if there are items in localStorage first
  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    try {
      return JSON.parse(storedCart);
    } catch (e) {
      console.error('Error parsing cart from localStorage:', e);
    }
  }

  // Return default mock cart items if no localStorage data
  return [
    {
      id: '1',
      name: 'Premium Cotton T-Shirt',
      brand: 'Allen Solly',
      price: 1499,
      image: 'https://source.unsplash.com/rK9vXlN3GX0',
      size: 'M',
      color: 'Black',
      quantity: 1
    },
    {
      id: '3',
      name: 'Running Shoes',
      brand: 'Puma',
      price: 3999,
      image: 'https://source.unsplash.com/EPjXIJhBZFI',
      size: '42',
      color: 'Black',
      quantity: 1
    }
  ];
}
