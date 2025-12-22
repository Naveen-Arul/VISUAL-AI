import { Brain, Github, ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="w-5 h-5 text-primary" />
            </div>
            <div>
              <span className="font-semibold text-foreground">
                Visual<span className="text-primary">AI</span>
              </span>
              <p className="text-xs text-muted-foreground">
                Multimodal Scene Understanding System
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="#"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Documentation</span>
            </a>
          </div>

          <p className="text-xs text-muted-foreground">
            Built with React, YOLOv8 & LLaMA
          </p>
        </div>
      </div>
    </footer>
  );
};
