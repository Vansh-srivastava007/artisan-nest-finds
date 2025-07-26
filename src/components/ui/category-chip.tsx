import { LucideIcon } from 'lucide-react';
import { Button } from './button';

interface CategoryChipProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const CategoryChip = ({ icon: Icon, label, active = false }: CategoryChipProps) => {
  return (
    <Button
      variant={active ? "default" : "outline"}
      className={`
        flex items-center gap-2 rounded-2xl px-4 py-2 whitespace-nowrap
        ${active 
          ? 'bg-gradient-to-r from-craft-terracotta to-orange-500 text-white border-0' 
          : 'border-border hover:border-craft-sage hover:bg-craft-sage/10'
        }
      `}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Button>
  );
};

export default CategoryChip;