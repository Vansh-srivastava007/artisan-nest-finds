import { useState } from 'react';
import { ArrowLeft, Share, Heart, Star, MessageCircle, MapPin, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import potteryImage from '@/assets/pottery-sample.jpg';

const ProductDetail = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  const productImages = [potteryImage, potteryImage, potteryImage];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container flex items-center justify-between px-4 py-3">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon">
              <Share className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
      </header>

      {/* Image Carousel */}
      <section className="relative">
        <div className="aspect-square overflow-hidden">
          <img 
            src={productImages[currentImage]} 
            alt="Product"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {productImages.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImage ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setCurrentImage(index)}
            />
          ))}
        </div>
      </section>

      {/* Product Info */}
      <div className="container px-4 py-6 space-y-6">
        <div>
          <Badge className="mb-3 bg-craft-sage/20 text-craft-warm border-craft-sage/30">
            Trending
          </Badge>
          <h1 className="text-2xl font-bold mb-2">Handcrafted Terracotta Vase Set</h1>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">4.8</span>
            </div>
            <span className="text-muted-foreground">(24 reviews)</span>
          </div>
          <p className="text-3xl font-bold text-craft-terracotta">₹2,500</p>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between p-4 rounded-2xl border">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback>RP</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Rajesh Pottery</h3>
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                <span>2.5 km away</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm">
            View Store
          </Button>
        </div>

        {/* Product Description */}
        <div>
          <h3 className="font-semibold mb-3">Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            Beautiful handcrafted terracotta vase set made by skilled artisans. Each piece is unique 
            with natural variations that add to its charm. Perfect for home decoration or as a gift.
          </p>
        </div>

        {/* Specifications */}
        <div>
          <h3 className="font-semibold mb-3">Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Material:</span>
              <span>Pure Terracotta Clay</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Dimensions:</span>
              <span>15cm x 20cm (Set of 3)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Care:</span>
              <span>Hand wash only</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Delivery:</span>
              <div className="flex items-center gap-1 text-craft-sage">
                <Truck className="h-4 w-4" />
                <span>Free delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="sticky bottom-0 bg-background border-t pt-4 -mx-4 px-4 pb-6">
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat with Seller
            </Button>
            <Button className="flex-1 bg-gradient-to-r from-craft-terracotta to-orange-500 hover:from-craft-terracotta/90 hover:to-orange-500/90">
              Buy Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;