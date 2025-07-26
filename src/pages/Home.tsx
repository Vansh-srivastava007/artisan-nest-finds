import { useState } from 'react';
import { ChevronLeft, ChevronRight, Sofa, Cookie, Shirt, Home as HomeIcon, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/ui/header';
import BottomNav from '@/components/ui/bottom-nav';
import ProductCard from '@/components/ui/product-card';
import CategoryChip from '@/components/ui/category-chip';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-marketplace.jpg';
import potteryImage from '@/assets/pottery-sample.jpg';
import furnitureImage from '@/assets/furniture-sample.jpg';
import textileImage from '@/assets/textile-sample.jpg';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredArtisans = [
    {
      title: "Traditional Clay Crafts",
      description: "Discover authentic pottery made with age-old techniques",
      image: potteryImage,
    },
    {
      title: "Handwoven Fabrics", 
      description: "Beautiful textiles crafted on traditional looms",
      image: textileImage,
    },
    {
      title: "Custom Furniture",
      description: "Unique wooden pieces handcrafted to perfection",
      image: furnitureImage,
    }
  ];

  const trendingProducts = [
    {
      id: 1,
      image: potteryImage,
      title: "Handcrafted Terracotta Vase Set",
      price: 2500,
      seller: "Rajesh Pottery",
      rating: 4.8,
      badge: "Trending"
    },
    {
      id: 2,
      image: furnitureImage,
      title: "Reclaimed Wood Coffee Table",
      price: 8500,
      seller: "Wooden Wonders",
      rating: 4.9,
      badge: "New"
    },
    {
      id: 3,
      image: textileImage,
      title: "Handwoven Cotton Throw",
      price: 1800,
      seller: "Maya Textiles",
      rating: 4.7,
      badge: "Popular"
    },
    {
      id: 4,
      image: potteryImage,
      title: "Ceramic Dinner Set",
      price: 3200,
      seller: "Clay Creations",
      rating: 4.6
    }
  ];

  const categories = [
    { icon: Sofa, label: "Furniture" },
    { icon: Cookie, label: "Pottery" },
    { icon: Shirt, label: "Textiles" },
    { icon: HomeIcon, label: "Décor" },
    { icon: Gem, label: "Jewelry" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredArtisans.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredArtisans.length) % featuredArtisans.length);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      {/* Hero Carousel */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredArtisans.map((artisan, index) => (
            <div key={index} className="w-full flex-shrink-0 relative">
              <div 
                className="w-full h-full bg-cover bg-center relative"
                style={{ backgroundImage: `url(${heroImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />
                <div className="absolute inset-0 flex items-center">
                  <div className="container px-4">
                    <div className="text-white max-w-md">
                      <h2 className="text-3xl font-bold mb-2">{artisan.title}</h2>
                      <p className="text-lg mb-4">{artisan.description}</p>
                      <Link to="/categories">
                        <Button variant="secondary" className="bg-white text-craft-warm hover:bg-white/90">
                          Explore Collection
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white"
          onClick={nextSlide}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredArtisans.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container px-4 py-6">
        <h2 className="text-xl font-semibold mb-4">Shop by Category</h2>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map((category, index) => (
            <CategoryChip
              key={index}
              icon={category.icon}
              label={category.label}
              active={index === 0}
            />
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="container px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Trending Now</h2>
          <Link to="/categories">
            <Button variant="ghost" className="text-craft-terracotta">
              View All
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <BottomNav />
    </div>
  );
};

export default Home;