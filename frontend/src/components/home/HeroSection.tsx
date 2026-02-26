import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, Eye, Brain, MessageSquare, Zap, Cpu, Globe, Code, Linkedin, Github, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-card/50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-info/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

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

          {/* Developer Card */}
          <div className="mb-8 w-full max-w-2xl mx-auto">
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Code className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Developed by Naveen Arul</h3>
                    <p className="text-sm text-muted-foreground">AI & Full Stack Developer</p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                  <a 
                    href="https://linkedin.com/in/naveen2408" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                  </a>
                  
                  <a 
                    href="https://github.com/Naveen-Arul" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                  
                  <a 
                    href="https://leetcode.com/u/NaveenA_kec/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    <span>LeetCode</span>
                  </a>
                  
                  <a 
                    href="https://naveenarul.netlify.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                  >
                    <Link className="w-4 h-4" />
                    <span>Portfolio</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate('/project')}
              className="group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-12 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            {[
              { icon: Eye, label: 'Object Detection', tech: 'YOLOv8' },
              { icon: Brain, label: 'Scene Analysis', tech: 'BERT' },
              { icon: MessageSquare, label: 'AI Explanation', tech: 'LLaMA 3.2' },
              { icon: Cpu, label: 'CPU Optimized', tech: 'Inference' },
            ].map(({ icon: Icon, label, tech }) => (
              <div
                key={label}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/50 border border-border/50 text-sm text-muted-foreground hover:bg-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <Icon className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
                <div>
                  <div className="font-medium">{label}</div>
                  <div className="text-xs text-muted-foreground/70">{tech}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
