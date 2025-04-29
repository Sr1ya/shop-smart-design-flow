
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/layout/Layout';
import { getMockCartItems } from '@/lib/mockData';
import { CartItem } from '@/types/cart';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate API call
    const fetchCart = async () => {
      try {
        // Check local storage for cart items first
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          const parsedCart = JSON.parse(storedCart);
          setCartItems(parsedCart);
        } else {
          // Fallback to mock data
          const data = getMockCartItems();
          setCartItems(data);
          // Store in local storage
          localStorage.setItem('cart', JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
        // Fallback to empty cart
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    const updatedItems = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    
    setCartItems(updatedItems);
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleRemoveItem = (id: string) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    // Update local storage
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    
    toast({
      title: "Item removed from cart",
    });
  };

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === 'SAVE20') {
      setCouponApplied(true);
      setDiscount(20);
      toast({
        title: "Coupon applied!",
        description: "You saved 20% on your order.",
      });
    } else {
      toast({
        title: "Invalid coupon code",
        description: "Please try another code.",
        variant: "destructive",
      });
    }
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  
  const discountAmount = couponApplied ? (subtotal * discount) / 100 : 0;
  const shippingCost = subtotal > 0 ? 10 : 0;
  const total = subtotal - discountAmount + shippingCost;

  const proceedToCheckout = () => {
    // In a real app, this would validate and proceed
    navigate('/checkout');
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 w-1/4 mb-8 rounded"></div>
            <div className="h-24 bg-gray-200 mb-4 rounded"></div>
            <div className="h-24 bg-gray-200 mb-8 rounded"></div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center text-shop-primary hover:underline">
            <ChevronLeft size={16} />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-8">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
            <p className="text-shop-text-light mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link to="/search">
              <Button className="btn-primary">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {/* Cart Header */}
                <div className="border-b p-4 hidden md:grid md:grid-cols-12 text-sm font-medium text-shop-text-light">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Subtotal</div>
                </div>

                {/* Cart Items */}
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4 md:grid md:grid-cols-12 items-center">
                      {/* Product */}
                      <div className="md:col-span-6 flex items-center mb-4 md:mb-0">
                        <div className="relative w-20 h-20 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <Link to={`/product/${item.id}`} className="font-medium hover:text-shop-primary">
                            {item.name}
                          </Link>
                          <div className="text-sm text-shop-text-light mt-1">
                            Size: {item.size}
                          </div>
                          <button 
                            className="text-red-500 text-sm flex items-center mt-2 md:hidden"
                            onClick={() => handleRemoveItem(item.id)}
                          >
                            <Trash2 size={14} className="mr-1" /> Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="md:col-span-2 md:text-center flex justify-between md:block mb-4 md:mb-0">
                        <span className="md:hidden">Price:</span>
                        <span>${item.price.toFixed(2)}</span>
                      </div>

                      {/* Quantity */}
                      <div className="md:col-span-2 md:text-center flex justify-between md:justify-center items-center mb-4 md:mb-0">
                        <span className="md:hidden">Quantity:</span>
                        <div className="flex items-center border rounded">
                          <button 
                            className="px-2 py-1 border-r"
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-1">{item.quantity}</span>
                          <button 
                            className="px-2 py-1 border-l"
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Subtotal */}
                      <div className="md:col-span-2 md:text-center flex justify-between md:block">
                        <span className="md:hidden">Subtotal:</span>
                        <div className="font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>

                      {/* Remove - Desktop */}
                      <div className="hidden md:flex md:justify-center">
                        <button 
                          className="text-red-500"
                          onClick={() => handleRemoveItem(item.id)}
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                {/* Coupon Code */}
                {!couponApplied ? (
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">
                      Coupon Code
                    </label>
                    <div className="flex">
                      <Input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="rounded-r-none"
                      />
                      <Button
                        className="rounded-l-none"
                        onClick={applyCoupon}
                        disabled={!couponCode}
                      >
                        Apply
                      </Button>
                    </div>
                    <div className="text-xs text-shop-text-light mt-1">
                      Try "SAVE20" for a discount!
                    </div>
                  </div>
                ) : (
                  <div className="bg-green-50 text-green-700 p-3 rounded mb-6 text-sm">
                    Coupon "{couponCode}" applied! {discount}% off.
                  </div>
                )}
                
                {/* Costs */}
                <div className="border-t border-gray-200 py-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-shop-text-light">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  {couponApplied && (
                    <div className="flex justify-between mb-2 text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-shop-text-light">Shipping</span>
                    <span>${shippingCost.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="border-t border-gray-200 py-4 mb-6">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Checkout Button */}
                <Button 
                  className="btn-primary w-full text-base"
                  onClick={proceedToCheckout}
                >
                  Proceed to Checkout
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
