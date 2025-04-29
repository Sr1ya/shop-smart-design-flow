
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const handleProductClick = () => {
    // Ensure scroll to top when clicking on product
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="product-card group">
      <div className="relative">
        <Link to={`/product/${product.id}`} onClick={handleProductClick}>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-64 object-cover object-center group-hover:opacity-90 transition-opacity"
          />
        </Link>
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-2 right-2 bg-white/80 rounded-full p-1.5 hover:bg-white hover:text-shop-accent"
        >
          <Heart size={20} />
        </Button>
        {product.discount && (
          <div className="absolute top-2 left-2 bg-shop-accent text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <Link to={`/product/${product.id}`} onClick={handleProductClick} className="text-sm text-shop-text-light">
          {product.brand}
        </Link>
        <Link to={`/product/${product.id}`} onClick={handleProductClick}>
          <h3 className="font-medium text-shop-text mt-1 hover:text-shop-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-semibold text-shop-primary">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-shop-text-light text-sm ml-2 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
