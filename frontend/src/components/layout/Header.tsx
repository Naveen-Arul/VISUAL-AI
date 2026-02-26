import { Link, useLocation } from 'react-router-dom';
import { Brain, Home, Layers, Eye, Mic } from 'lucide-react';
import { cn } from '@/lib/utils';

export const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/vision', label: 'Vision AI', icon: Eye },
    { path: '/voice', label: 'Voice AI', icon: Mic },
    { path: '/project', label: 'Dashboard', icon: Layers },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/80">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div className="hidden sm:block">
            <span className="font-bold text-lg text-foreground">
              Visual<span className="text-primary">AI</span>
            </span>
            <span className="text-xs text-muted-foreground block -mt-1">
              Scene Understanding
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              to={path}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                location.pathname === path
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              )}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};
