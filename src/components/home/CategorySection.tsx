
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: string;
  name: string;
  slug: string;
}

const categories: Category[] = [
  { id: '1', name: 'Apparel', slug: 'apparel' },
  { id: '2', name: 'Footwear', slug: 'footwear' },
  { id: '3', name: 'Accessories', slug: 'accessories' }
];

export default function CategorySection() {
  const [activeCategory, setActiveCategory] = useState<string>('1');

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6 text-center">Shop By Category</h2>
        
        <div className="flex justify-center space-x-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {activeCategory === '1' && (
            <>
              <Link to="/category/tshirts" className="relative group overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="T-Shirts" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-medium">T-Shirts</h3>
                </div>
              </Link>
              <Link to="/category/jeans" className="relative group overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="Jeans" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-medium">Jeans</h3>
                </div>
              </Link>
              <Link to="/category/jackets" className="relative group overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="Jackets" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-medium">Jackets</h3>
                </div>
              </Link>
            </>
          )}

          {activeCategory === '2' && (
            <>
              <Link to="/category/sneakers" className="relative group overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="Sneakers" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-medium">Sneakers</h3>
                </div>
              </Link>
              <Link to="/category/boots" className="relative group overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1520639888713-7851133b1ed0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="Boots" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-medium">Boots</h3>
                </div>
              </Link>
              <Link to="/category/formal" className="relative group overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="Formal Shoes" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-medium">Formal Shoes</h3>
                </div>
              </Link>
            </>
          )}

          {activeCategory === '3' && (
            <>
              <Link to="/category/watches" className="relative group overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1587925358603-c2eea5305bbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="Watches" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-medium">Watches</h3>
                </div>
              </Link>
              <Link to="/category/bags" className="relative group overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="Bags" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-medium">Bags</h3>
                </div>
              </Link>
              <Link to="/category/jewelry" className="relative group overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60" 
                  alt="Jewelry" 
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3">
                  <h3 className="font-medium">Jewelry</h3>
                </div>
              </Link>
            </>
          )}
        </div>

        <div className="text-center">
          <Link 
            to={`/category/${categories.find(c => c.id === activeCategory)?.slug}`}
            className="btn-primary inline-block"
          >
            View All {categories.find(c => c.id === activeCategory)?.name}
          </Link>
        </div>
      </div>
    </section>
  );
}
