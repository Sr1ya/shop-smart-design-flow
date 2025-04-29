
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ChevronLeft, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { getMockProducts } from '@/lib/mockData';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types/product';
import Layout from '@/components/layout/Layout';

// Filter Interfaces
interface PriceRange {
  min: number;
  max: number;
}

interface FilterState {
  sizes: string[];
  colors: string[];
  priceRange: PriceRange;
  brands: string[];
}

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const category = searchParams.get('category') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    colors: [],
    priceRange: { min: 0, max: 100 },
    brands: []
  });
  
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL'];
  const availableColors = ['Black', 'White', 'Red', 'Blue', 'Green'];
  const availableBrands = ['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // In a real app, this would be an API call with filters
        const data = getMockProducts(12);
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query, category, filters]);

  const toggleSize = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const toggleColor = (color: string) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const toggleBrand = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand)
        ? prev.brands.filter(b => b !== brand)
        : [...prev.brands, brand]
    }));
  };

  const handlePriceChange = (value: number[]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: { min: value[0], max: value[1] }
    }));
  };

  const clearFilters = () => {
    setFilters({
      sizes: [],
      colors: [],
      priceRange: { min: 0, max: 100 },
      brands: []
    });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Back and search info */}
        <div className="flex items-center justify-between mb-6">
          <Link to="/" className="inline-flex items-center text-shop-primary hover:underline">
            <ChevronLeft size={16} />
            <span>Back to Home</span>
          </Link>
          
          <div className="text-right">
            <h1 className="text-lg font-medium">
              {category ? `Category: ${category}` : query ? `Results for: "${query}"` : 'All Products'}
            </h1>
            <p className="text-shop-text-light">Showing {products.length} products</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Button
              variant="outline"
              className="w-full flex items-center justify-center"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter size={16} className="mr-2" />
              {isFilterOpen ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
          
          {/* Filters Sidebar */}
          <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block md:w-1/4 lg:w-1/5`}>
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearFilters}
                  className="text-shop-text-light hover:text-shop-primary text-sm"
                >
                  Clear all
                </Button>
              </div>
              
              {/* Price Range */}
              <div className="border-b border-gray-200 py-4">
                <h3 className="font-medium mb-4">Price Range</h3>
                <Slider
                  defaultValue={[filters.priceRange.min, filters.priceRange.max]}
                  max={100}
                  step={1}
                  onValueChange={handlePriceChange}
                  className="mb-6"
                />
                <div className="flex items-center justify-between text-sm">
                  <span>${filters.priceRange.min}</span>
                  <span>${filters.priceRange.max}</span>
                </div>
              </div>
              
              {/* Sizes */}
              <div className="border-b border-gray-200 py-4">
                <h3 className="font-medium mb-3">Size</h3>
                <div className="space-y-2">
                  {availableSizes.map((size) => (
                    <div key={size} className="flex items-center">
                      <Checkbox
                        id={`size-${size}`}
                        checked={filters.sizes.includes(size)}
                        onCheckedChange={() => toggleSize(size)}
                      />
                      <label htmlFor={`size-${size}`} className="ml-2 text-sm">
                        {size}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Colors */}
              <div className="border-b border-gray-200 py-4">
                <h3 className="font-medium mb-3">Color</h3>
                <div className="space-y-2">
                  {availableColors.map((color) => (
                    <div key={color} className="flex items-center">
                      <Checkbox
                        id={`color-${color}`}
                        checked={filters.colors.includes(color)}
                        onCheckedChange={() => toggleColor(color)}
                      />
                      <label htmlFor={`color-${color}`} className="ml-2 text-sm flex items-center">
                        <span
                          className="w-4 h-4 rounded-full inline-block mr-2"
                          style={{ backgroundColor: color.toLowerCase() }}
                        ></span>
                        {color}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Brands */}
              <div className="py-4">
                <h3 className="font-medium mb-3">Brand</h3>
                <div className="space-y-2">
                  {availableBrands.map((brand) => (
                    <div key={brand} className="flex items-center">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={filters.brands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <label htmlFor={`brand-${brand}`} className="ml-2 text-sm">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Products Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {(filters.sizes.length > 0 || filters.colors.length > 0 || filters.brands.length > 0) && (
              <div className="mb-4 flex flex-wrap gap-2">
                {filters.sizes.map((size) => (
                  <span 
                    key={size}
                    className="bg-gray-100 px-2 py-1 rounded flex items-center text-sm"
                  >
                    Size: {size}
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => toggleSize(size)}>
                      <X size={12} />
                    </Button>
                  </span>
                ))}
                {filters.colors.map((color) => (
                  <span 
                    key={color}
                    className="bg-gray-100 px-2 py-1 rounded flex items-center text-sm"
                  >
                    Color: {color}
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => toggleColor(color)}>
                      <X size={12} />
                    </Button>
                  </span>
                ))}
                {filters.brands.map((brand) => (
                  <span 
                    key={brand}
                    className="bg-gray-100 px-2 py-1 rounded flex items-center text-sm"
                  >
                    {brand}
                    <Button variant="ghost" size="sm" className="h-4 w-4 p-0 ml-1" onClick={() => toggleBrand(brand)}>
                      <X size={12} />
                    </Button>
                  </span>
                ))}
              </div>
            )}
            
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 h-64 w-full mb-4 rounded-lg"></div>
                    <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
                    <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-xl font-medium">No products found</p>
                    <p className="text-shop-text-light mt-2">
                      Try adjusting your filters or search for something else
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
