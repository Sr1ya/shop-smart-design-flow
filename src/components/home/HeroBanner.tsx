
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Banner {
  id: number;
  image: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const banners: Banner[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Summer Collection 2023",
    description: "Discover the hottest styles for summer",
    buttonText: "Shop Now",
    buttonLink: "/category/summer"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "Up to 50% Off",
    description: "Limited time offer on selected items",
    buttonText: "View Deals",
    buttonLink: "/deals"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    title: "New Arrivals",
    description: "Be the first to check our latest collection",
    buttonText: "Explore",
    buttonLink: "/new-arrivals"
  }
];

export default function HeroBanner() {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextBanner, 6000);
    return () => clearInterval(interval);
  }, []);

  const banner = banners[currentBanner];

  return (
    <section className="relative h-[500px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out"
        style={{ backgroundImage: `url(${banner.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>
      
      <div className="container mx-auto h-full flex items-center relative z-10">
        <div className="w-full md:w-1/2 p-8 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{banner.title}</h1>
          <p className="text-lg mb-8">{banner.description}</p>
          <Link to={banner.buttonLink}>
            <Button className="btn-primary text-base">{banner.buttonText}</Button>
          </Link>
        </div>
      </div>

      <button 
        onClick={prevBanner}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm p-2 rounded-full z-10"
        aria-label="Previous banner"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button 
        onClick={nextBanner}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm p-2 rounded-full z-10"
        aria-label="Next banner"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`h-2 rounded-full transition-all ${
              currentBanner === index ? 'w-8 bg-white' : 'w-2 bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
