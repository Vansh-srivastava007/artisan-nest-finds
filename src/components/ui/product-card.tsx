import { Button } from './button';
import { Badge } from './badge';
import { Star } from 'lucide-react';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  seller: string;
  rating?: number;
  badge?: string;
}

const ProductCard = ({ image, title, price, seller, rating = 4.5, badge }: ProductCardProps) => {
  return (
    <div className="group rounded-2xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-craft)] hover:-translate-y-1">
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 space-y-3">
        {badge && (
          <Badge variant="secondary" className="bg-craft-sage/20 text-craft-warm border-craft-sage/30">
            {badge}
          </Badge>
        )}
        <div>
          <h3 className="font-semibold text-card-foreground line-clamp-2 mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">by {seller}</p>
        </div>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-craft-terracotta">₹{price.toLocaleString()}</span>
          <Button size="sm" className="bg-gradient-to-r from-craft-terracotta to-orange-500 hover:from-craft-terracotta/90 hover:to-orange-500/90">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;