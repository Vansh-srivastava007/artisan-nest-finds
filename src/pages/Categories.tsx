import { useState } from 'react';
import { Filter, SlidersHorizontal, MapPin } from 'lucide-react';
import Header from '@/components/ui/header';
import BottomNav from '@/components/ui/bottom-nav';
import ProductCard from '@/components/ui/product-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import potteryImage from '@/assets/pottery-sample.jpg';
import furnitureImage from '@/assets/furniture-sample.jpg';
import textileImage from '@/assets/textile-sample.jpg';

const Categories = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [nearbyOnly, setNearbyOnly] = useState(false);

  const products = [
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
    },
    {
      id: 5,
      image: furnitureImage,
      title: "Handmade Wooden Chair",
      price: 4500,
      seller: "Artisan Woods",
      rating: 4.5
    },
    {
      id: 6,
      image: textileImage,
      title: "Organic Cotton Cushions",
      price: 1200,
      seller: "Natural Weaves",
      rating: 4.7
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      <Header />
      
      <div className="container px-4 py-6">
        {/* Category Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">All Products</h1>
            <p className="text-muted-foreground">{products.length} items found</p>
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-card rounded-2xl border p-6 mb-6 space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Price Range</h3>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={20000}
                step={500}
                className="mb-2"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="nearby" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Nearby sellers only
              </Label>
              <Switch
                id="nearby"
                checked={nearbyOnly}
                onCheckedChange={setNearbyOnly}
              />
            </div>

            <div>
              <h3 className="font-semibold mb-3">Seller Rating</h3>
              <div className="flex gap-2">
                {[4, 4.5, 5].map((rating) => (
                  <Badge key={rating} variant="outline" className="cursor-pointer hover:bg-craft-sage/20">
                    {rating}+ stars
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sort Options */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          <Badge variant="default" className="bg-craft-terracotta hover:bg-craft-terracotta/90">
            Recommended
          </Badge>
          <Badge variant="outline">Price: Low to High</Badge>
          <Badge variant="outline">Price: High to Low</Badge>
          <Badge variant="outline">Newest First</Badge>
          <Badge variant="outline">Rating</Badge>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Categories;