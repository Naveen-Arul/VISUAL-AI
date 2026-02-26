import { ImageIcon, Car, Home, Trees } from 'lucide-react';
import { cn } from '@/lib/utils';

// Sample images with pre-defined analysis data for testing
export const demoImages = [
  {
    id: 'urban',
    name: 'Urban Street',
    description: 'City scene with vehicles and people',
    icon: Car,
    // This would be a real image URL in production
    imageUrl: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
  },
  {
    id: 'indoor',
    name: 'Indoor Room',
    description: 'Living room interior scene',
    icon: Home,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80',
  },
  {
    id: 'nature',
    name: 'Natural Scene',
    description: 'Outdoor nature landscape',
    icon: Trees,
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80',
  },
];

interface DemoImageSelectorProps {
  onSelectDemo: (imageUrl: string, imageName: string) => void;
  isProcessing: boolean;
}

export const DemoImageSelector = ({ onSelectDemo, isProcessing }: DemoImageSelectorProps) => {
  return (
    <div className="p-4 rounded-2xl bg-card border border-border">
      <div className="flex items-center gap-2 mb-4">
        <ImageIcon className="w-4 h-4 text-primary" />
        <h4 className="font-medium text-foreground">Try Sample Images</h4>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        No image? Try one of these sample scenes to test the system:
      </p>

      <div className="grid grid-cols-3 gap-2">
        {demoImages.map((demo) => {
          const Icon = demo.icon;
          return (
            <button
              key={demo.id}
              onClick={() => onSelectDemo(demo.imageUrl, demo.name)}
              disabled={isProcessing}
              className={cn(
                "flex flex-col items-center gap-2 p-3 rounded-xl border border-border transition-all",
                "hover:border-primary/50 hover:bg-primary/5",
                "disabled:opacity-50 disabled:cursor-not-allowed"
              )}
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <Icon className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-xs text-foreground font-medium">{demo.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
