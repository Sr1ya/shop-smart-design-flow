
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* TataCliq Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/lovable-uploads/fc9136e1-baf3-4ddb-b505-6cec01387a72.png" 
              alt="TataCliq Logo" 
              className="h-10"
            />
          </Link>

          {/* Search Bar - visible on desktop */}
          <div className="hidden md:block w-1/2 max-w-md">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pr-10 rounded-full border-gray-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-shop-primary"
              >
                <Search size={18} />
              </button>
            </form>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <Link to="/account" className="text-shop-text hover:text-shop-primary">
              <User size={24} />
            </Link>
            
            <Link to="/cart" className="relative text-shop-text hover:text-shop-primary">
              <ShoppingCart size={24} />
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
                2
              </Badge>
            </Link>
            
            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden" 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Menu size={24} />
            </Button>
          </div>
        </div>

        {/* Search bar - visible on mobile */}
        <div className="mt-4 md:hidden">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="w-full pr-10 rounded-full border-gray-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-shop-primary"
            >
              <Search size={18} />
            </button>
          </form>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50 py-4">
            <nav className="container mx-auto px-4">
              <ul className="space-y-2">
                <li>
                  <Link 
                    to="/category/apparel" 
                    className="block py-2 hover:bg-gray-100 px-3 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Apparel
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/category/footwear" 
                    className="block py-2 hover:bg-gray-100 px-3 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Footwear
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/category/accessories" 
                    className="block py-2 hover:bg-gray-100 px-3 rounded"
                    onClick={() => setMenuOpen(false)}
                  >
                    Accessories
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
