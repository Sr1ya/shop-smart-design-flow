
import { useState, useEffect } from 'react';
import ProductCard from '../product/ProductCard';
import { Product } from '@/types/product';
import { getMockProducts } from '@/lib/mockData';

export default function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchProducts = async () => {
      try {
        // In a real app, this would be an API call
        const data = getMockProducts(4);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching trending products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Trending Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 h-64 w-full mb-4 rounded-lg"></div>
                <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
                <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-8">Trending Products</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
