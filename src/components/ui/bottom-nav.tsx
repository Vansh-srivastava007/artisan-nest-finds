import { Home, Grid3X3, Plus, Package, User } from 'lucide-react';
import { Button } from './button';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex items-center justify-around py-2">
        <Link to="/">
          <Button variant="ghost" size="sm" className={`flex flex-col gap-1 h-auto py-2 ${isActive('/') ? 'text-craft-terracotta' : ''}`}>
            <Home className="h-5 w-5" />
            <span className="text-xs">Home</span>
          </Button>
        </Link>
        <Link to="/categories">
          <Button variant="ghost" size="sm" className={`flex flex-col gap-1 h-auto py-2 ${isActive('/categories') ? 'text-craft-terracotta' : ''}`}>
            <Grid3X3 className="h-5 w-5" />
            <span className="text-xs">Categories</span>
          </Button>
        </Link>
        <Link to="/sell">
          <Button variant="ghost" size="sm" className={`flex flex-col gap-1 h-auto py-2 ${isActive('/sell') ? 'text-craft-terracotta' : ''}`}>
            <Plus className="h-5 w-5" />
            <span className="text-xs">Sell</span>
          </Button>
        </Link>
        <Link to="/orders">
          <Button variant="ghost" size="sm" className={`flex flex-col gap-1 h-auto py-2 ${isActive('/orders') ? 'text-craft-terracotta' : ''}`}>
            <Package className="h-5 w-5" />
            <span className="text-xs">Orders</span>
          </Button>
        </Link>
        <Link to="/profile">
          <Button variant="ghost" size="sm" className={`flex flex-col gap-1 h-auto py-2 ${isActive('/profile') ? 'text-craft-terracotta' : ''}`}>
            <User className="h-5 w-5" />
            <span className="text-xs">Profile</span>
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNav;