import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Eye, Mic, Brain, MessageSquare, Zap, Cpu, Globe, Code, Linkedin, Github, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-0 bg-background/80 backdrop-blur-sm" />
      <div
        className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat opacity-30 mix-blend-luminosity"
        style={{ backgroundImage: 'url(/hero-bg.png)' }}
      />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered Visual Understanding</span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 animate-slide-up">
            <span className="text-foreground">Multimodal</span>{' '}
            <span className="gradient-text">Visual Scene</span>
            <br />
            <span className="text-foreground">Understanding</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Upload an image, let AI detect objects, analyze the scene context,
            and generate human-readable explanations — all in real-time.
          </p>

          {/* Platform Extension */}
          <p className="text-lg sm:text-xl text-primary font-medium max-w-2xl mx-auto mb-8 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            This platform now supports both Visual Intelligence and Voice Intelligence modules.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up mt-8" style={{ animationDelay: '0.2s' }}>
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate('/vision')}
              className="group bg-primary hover:bg-primary/90"
            >
              <Eye className="w-5 h-5 mr-2" />
              Try Vision AI
              <ArrowRight className="w-5 h-5 ml-2 opacity-70 group-hover:translate-x-1 transition-all" />
            </Button>
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate('/voice')}
              className="group bg-info hover:bg-info/90 shadow-lg shadow-info/20 text-info-foreground border-transparent"
            >
              <Mic className="w-5 h-5 mr-2" />
              Try Voice AI
              <ArrowRight className="w-5 h-5 ml-2 opacity-70 group-hover:translate-x-1 transition-all" />
            </Button>
          </div>

          <div className="mt-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button
              variant="ghost"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn more about our capabilities
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
