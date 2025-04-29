
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

export default function OrderConfirmation() {
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-lg mx-auto text-center">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check size={40} className="text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-shop-text-light mb-6">
            Thank you for your purchase. Your order has been received and is now being processed.
          </p>
          
          <div className="bg-white border rounded-lg p-6 mb-8">
            <div className="border-b pb-4 mb-4">
              <div className="text-shop-text-light">Order Number</div>
              <div className="font-semibold text-lg">{orderNumber}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-shop-text-light">Order Date</div>
                <div className="font-medium">April 29, 2023</div>
              </div>
              <div>
                <div className="text-shop-text-light">Estimated Delivery</div>
                <div className="font-medium">May 2-5, 2023</div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/order-tracking">
              <Button className="btn-secondary w-full">
                <ShoppingBag size={18} className="mr-2" />
                Track Order
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full border-gray-300">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
