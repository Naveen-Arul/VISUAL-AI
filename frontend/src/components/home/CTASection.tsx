import { useNavigate } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 rounded-full blur-3xl" />
      
      {/* Floating Elements */}
      <div className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-primary/5 blur-xl animate-float" />
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 rounded-full bg-info/5 blur-xl animate-float" style={{ animationDelay: '1s' }} />

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6 animate-fade-in">
            <Zap className="w-4 h-4" />
            <span>Ready to Experience AI Vision?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 animate-slide-up">
            <span className="text-foreground">Experience Our </span>
            <span className="gradient-text">AI System</span>
          </h2>

          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Upload an image and watch as our multimodal AI system analyzes, 
            understands, and explains the visual scene step by step.
          </p>

          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button
              variant="hero"
              size="xl"
              onClick={() => navigate('/project')}
              className="group"
            >
              Start Analyzing
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
            No signup required • Works with any image
          </p>
        </div>
      </div>
    </section>
  );
};
