import { Upload, Scan, BarChart3, FileText, ArrowRight, CheckCircle2, Eye, Brain, MessageSquare, Zap, Globe } from 'lucide-react';

const steps = [
  {
    icon: Upload,
    label: 'Upload Image',
    description: 'Select or drag & drop',
    color: 'text-foreground',
  },
  {
    icon: Eye,
    label: 'Object Detection',
    description: 'AI identifies objects with YOLOv8',
    color: 'text-primary',
  },
  {
    icon: Brain,
    label: 'Scene Analysis',
    description: 'Context understanding with BERT',
    color: 'text-info',
  },
  {
    icon: MessageSquare,
    label: 'AI Explanation',
    description: 'Natural language output with LLaMA',
    color: 'text-success',
  },
];

export const PipelineSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-card/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>Processing Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Simple 4-Step</span>
            <span className="text-foreground"> Process</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From image upload to intelligent explanation in seconds
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 -translate-y-1/2" />

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
              {steps.map((step, index) => (
                <div key={step.label} className="relative">
                  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 group hover:shadow-lg hover:shadow-primary/5">
                    {/* Icon Container */}
                    <div className="relative mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-105">
                        <step.icon className={`w-8 h-8 ${step.color}`} />
                      </div>
                      {/* Step Badge */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center animate-pulse">
                        {index + 1}
                      </div>
                    </div>

                    <h3 className="font-semibold text-foreground mb-1">
                      {step.label}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow (hidden on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 z-10">
                      <ArrowRight className="w-6 h-6 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-6">
          {[
            { label: 'Real-time Processing', icon: Zap },
            { label: 'Transparent AI', icon: Eye },
            { label: 'Educational Interface', icon: Brain },
            { label: 'No Black Box', icon: Globe },
          ].map((benefit) => (
            <div key={benefit.label} className="flex items-center gap-2 text-muted-foreground group hover:text-primary transition-colors">
              <benefit.icon className="w-5 h-5 text-success group-hover:scale-110 transition-transform" />
              <span>{benefit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
