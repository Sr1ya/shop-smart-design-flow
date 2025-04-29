
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-shop-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">ShopSmart</h3>
            <p className="text-sm opacity-80">
              Your one-stop shop for trendy apparel, footwear, and accessories at affordable prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm opacity-80 hover:opacity-100">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-sm opacity-80 hover:opacity-100">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm opacity-80 hover:opacity-100">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/account" className="text-sm opacity-80 hover:opacity-100">
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/category/apparel" className="text-sm opacity-80 hover:opacity-100">
                  Apparel
                </Link>
              </li>
              <li>
                <Link to="/category/footwear" className="text-sm opacity-80 hover:opacity-100">
                  Footwear
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="text-sm opacity-80 hover:opacity-100">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="hover:text-shop-accent">
                <Facebook size={20} />
              </a>
              <a href="#" className="hover:text-shop-accent">
                <Instagram size={20} />
              </a>
              <a href="#" className="hover:text-shop-accent">
                <Twitter size={20} />
              </a>
              <a href="#" className="hover:text-shop-accent">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-sm opacity-80">
              Subscribe to our newsletter for updates and exclusive offers.
            </p>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-sm opacity-80">
          <p>© 2023 ShopSmart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
