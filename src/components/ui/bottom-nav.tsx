import { Home, Grid3X3, Plus, Package, User } from 'lucide-react';
import { Button } from './button';

const BottomNav = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:hidden">
      <div className="flex items-center justify-around py-2">
        <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2">
          <Home className="h-5 w-5" />
          <span className="text-xs">Home</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2">
          <Grid3X3 className="h-5 w-5" />
          <span className="text-xs">Categories</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2">
          <Plus className="h-5 w-5" />
          <span className="text-xs">Sell</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2">
          <Package className="h-5 w-5" />
          <span className="text-xs">Orders</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex flex-col gap-1 h-auto py-2">
          <User className="h-5 w-5" />
          <span className="text-xs">Profile</span>
        </Button>
      </div>
    </nav>
  );
};

export default BottomNav;