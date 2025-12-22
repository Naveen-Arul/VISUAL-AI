import { Eye, Brain, MessageSquare, Zap, Cpu, Globe } from 'lucide-react';

const features = [
  {
    icon: Eye,
    title: 'Image Understanding',
    subtitle: 'Computer Vision',
    description: 'Upload any image and our AI instantly detects all visible objects with precise bounding boxes and confidence scores.',
    highlights: ['YOLOv8 Detection', 'Bounding Boxes', 'Confidence Scores'],
    stats: [
      { label: 'Models', value: '1' },
      { label: 'Objects', value: '80+' },
      { label: 'Speed', value: '<1s' }
    ],
    color: 'primary',
  },
  {
    icon: Brain,
    title: 'Scene Analysis',
    subtitle: 'Semantic Understanding',
    description: 'Detected objects are analyzed to infer environment type, activity context, human presence, and scene complexity.',
    highlights: ['Environment Detection', 'Activity Context', 'Scene Complexity'],
    stats: [
      { label: 'Classifiers', value: '5' },
      { label: 'Context Types', value: '12+' },
      { label: 'Accuracy', value: '94%' }
    ],
    color: 'info',
  },
  {
    icon: MessageSquare,
    title: 'AI Explanation',
    subtitle: 'Natural Language',
    description: 'The system generates clear, human-readable explanations of what\'s happening in the scene — grounded and accurate.',
    highlights: ['LLaMA 3.2', 'No Hallucination', 'Contextual'],
    stats: [
      { label: 'Tokens', value: '200+' },
      { label: 'Languages', value: 'English' },
      { label: 'Reliability', value: '98%' }
    ],
    color: 'success',
  },
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-card/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Zap className="w-4 h-4" />
            <span>How It Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-foreground">How the </span>
            <span className="gradient-text">AI Pipeline</span>
            <span className="text-foreground"> Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A transparent, step-by-step approach to understanding visual scenes
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group relative p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Step Number */}
              <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold animate-pulse-glow">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 mx-auto">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>

              {/* Content */}
              <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2 text-center">
                {feature.subtitle}
              </p>
              <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed text-center">
                {feature.description}
              </p>

              {/* Highlights */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                {feature.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-3 py-1 text-xs rounded-full bg-secondary text-muted-foreground hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border/50">
                {feature.stats.map((stat, statIndex) => (
                  <div key={statIndex} className="text-center">
                    <div className="text-lg font-bold text-foreground">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
