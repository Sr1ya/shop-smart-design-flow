import { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Star, ChevronLeft, ShoppingCart, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getMockProductById, getMockProducts } from '@/lib/mockData';
import { Product } from '@/types/product';
import { useToast } from '@/components/ui/use-toast';
import ProductCard from '@/components/product/ProductCard';
import Layout from '@/components/layout/Layout';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const { toast } = useToast();

  // Fix scrolling issue - scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call
        if (id) {
          const data = getMockProductById(id);
          setProduct(data);

          // Fetch related products
          const related = getMockProducts(4);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    // Reset state when navigating between products
    setSelectedSize('');
    setQuantity(1);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }

    if (!product) return;

    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('cart');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    
    // Add item to cart
    const newItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: product.colors[0] || 'default',
      quantity: quantity
    };
    
    cartItems.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    toast({
      title: "Added to cart!",
      description: `${product.name} (Size: ${selectedSize}, Qty: ${quantity})`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast({
        title: "Please select a size",
        variant: "destructive",
      });
      return;
    }
    
    if (!product) return;
    
    // Add to cart first
    const existingCart = localStorage.getItem('cart');
    const cartItems = existingCart ? JSON.parse(existingCart) : [];
    
    const newItem = {
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: selectedSize,
      color: product.colors[0] || 'default',
      quantity: quantity
    };
    
    cartItems.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cartItems));
    
    toast({
      title: "Proceeding to checkout",
    });
    
    // Navigate to checkout
    window.location.href = '/checkout';
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to wishlist!",
      description: product?.name,
    });
  };

  // Helper function to determine if we're showing numeric or letter sizes
  const getSizeOptions = () => {
    if (!product) return [];
    
    // If it's footwear, use numeric sizes
    if (product.category.toLowerCase().includes('footwear')) {
      return ['38', '39', '40', '41', '42', '43', '44', '45'];
    }
    
    // Otherwise use the sizes from the product
    return product.sizes;
  };

  if (loading || !product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-8"></div>
            <div className="h-8 bg-gray-200 w-3/4 mb-4 rounded"></div>
            <div className="h-6 bg-gray-200 w-1/2 mb-6 rounded"></div>
            <div className="h-10 bg-gray-200 w-full mb-4 rounded"></div>
            <div className="h-10 bg-gray-200 w-full rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  const sizeOptions = getSizeOptions();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link to="/search" className="inline-flex items-center text-shop-primary mb-6 hover:underline">
          <ChevronLeft size={16} />
          <span>Back to results</span>
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full object-cover object-center h-[500px]"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <span className="text-shop-text-light">{product.brand}</span>
            <h1 className="text-3xl font-bold mt-1 mb-4">{product.name}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    size={16} 
                    className={star <= product.rating ? "fill-shop-accent text-shop-accent" : "text-gray-300"} 
                  />
                ))}
              </div>
              <span className="ml-2 text-shop-text-light">{product.reviewCount} reviews</span>
            </div>
            
            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-shop-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-shop-text-light text-lg ml-3 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.discount && (
                  <span className="ml-3 bg-shop-accent/10 text-shop-accent px-2 py-1 text-sm font-medium rounded">
                    {product.discount}% OFF
                  </span>
                )}
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">
                Size
              </label>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {sizeOptions.map((size) => (
                    <SelectItem key={size} value={size}>{size}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium mb-2">
                Quantity
              </label>
              <div className="flex items-center">
                <button 
                  className="border border-gray-300 px-3 py-1 rounded-l-md"
                  onClick={() => quantity > 1 && setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className="border-t border-b border-gray-300 px-4 py-1 min-w-[40px] text-center">
                  {quantity}
                </span>
                <button 
                  className="border border-gray-300 px-3 py-1 rounded-r-md"
                  onClick={() => quantity < 10 && setQuantity(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4">
              <Button 
                className="btn-primary flex-1 flex items-center justify-center"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={18} className="mr-2" />
                Add to Cart
              </Button>
              
              <Button 
                className="btn-secondary flex-1"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              
              <Button 
                variant="outline" 
                className="border-gray-300 hover:bg-gray-100"
                onClick={handleAddToWishlist}
              >
                <Heart size={18} />
              </Button>
            </div>
            
            {/* Product Info */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="font-semibold mb-2">Product Details</h3>
              <p className="text-shop-text-light">{product.description}</p>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
