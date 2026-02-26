import { Mic, Volume2, VolumeX, Globe, Lock, Brain, TrendingUp, Clock, AlertTriangle, Tag, MessageSquare, Cpu, Zap, Layers, Eye } from 'lucide-react';

const voiceFeatures = [
  {
    icon: Mic,
    title: 'Voice Recording',
    subtitle: 'Audio Capture with MediaRecorder',
    description: 'Users record voice notes directly in the browser with high-quality audio capture and noise reduction.',
    highlights: ['MediaRecorder API', 'Browser-based', 'Privacy-focused'],
    stats: [
      { label: 'Quality', value: '48kHz' },
      { label: 'Format', value: 'WAV' },
      { label: 'Latency', value: '<100ms' }
    ],
    color: 'primary',
  },
  {
    icon: Volume2,
    title: 'Speech Recognition',
    subtitle: 'STT with ElevenLabs API',
    description: 'Advanced speech-to-text conversion with high accuracy and support for multiple languages and accents.',
    highlights: ['ElevenLabs STT', 'Multi-language', 'Noise filtering'],
    stats: [
      { label: 'Accuracy', value: '96%' },
      { label: 'Languages', value: '15+' },
      { label: 'Words/min', value: '180+' }
    ],
    color: 'info',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    subtitle: 'Intelligence with LLaMA 3.1',
    description: 'Groq-powered LLaMA 3.1 8B model processes transcripts to extract insights, sentiment, and actionable items.',
    highlights: ['Groq LLaMA 3.1', 'Real-time', 'Structured output'],
    stats: [
      { label: 'Models', value: '1' },
      { label: 'Outputs', value: '6' },
      { label: 'Speed', value: '<2s' }
    ],
    color: 'success',
  },
];

const voiceTechStack = [
  {
    id: 'stt',
    icon: Volume2,
    title: 'Speech-to-Text',
    subtitle: 'ElevenLabs API',
    description: 'Industry-leading automatic speech recognition for converting voice to text.',
    technologies: ['ElevenLabs STT', 'WebRTC', 'Audio codecs'],
    details: [
      'High accuracy transcription',
      'Multiple language support',
      'Real-time processing'
    ],
    color: 'primary'
  },
  {
    id: 'llm',
    icon: Brain,
    title: 'AI Processing',
    subtitle: 'Groq LLaMA 3.1 8B Instant',
    description: 'Advanced reasoning engine that extracts insights from transcribed text.',
    technologies: ['LLaMA 3.1', 'Groq', 'Prompt engineering'],
    details: [
      'Sentiment analysis',
      'Action item extraction',
      'Confidence scoring'
    ],
    color: 'info'
  },
  {
    id: 'tts',
    icon: Volume2,
    title: 'Text-to-Speech',
    subtitle: 'ElevenLabs TTS',
    description: 'High-quality text-to-speech synthesis for output playback.',
    technologies: ['ElevenLabs TTS', 'Neural vocoders', 'Voice cloning'],
    details: [
      'Natural sounding voices',
      'Multiple voice options',
      'Emotion control'
    ],
    color: 'success'
  },
  {
    id: 'frontend',
    icon: Eye,
    title: 'Frontend Tech',
    subtitle: 'MediaRecorder & Browser APIs',
    description: 'Client-side audio processing using native browser capabilities.',
    technologies: ['MediaRecorder API', 'Web Audio API', 'React Hooks'],
    details: [
      'No server storage',
      'Privacy-first',
      'Real-time feedback'
    ],
    color: 'warning'
  },
  {
    id: 'backend',
    icon: Cpu,
    title: 'Backend Tech',
    subtitle: 'FastAPI Integration',
    description: 'Secure, scalable backend for AI processing and orchestration.',
    technologies: ['FastAPI', 'Async processing', 'Memory management'],
    details: [
      'In-memory processing',
      'No audio persistence',
      'Secure transmission'
    ],
    color: 'secondary'
  }
];

export const VoiceIntelligenceSection = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-card/20 to-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            <Mic className="w-4 h-4" />
            <span>Voice Intelligence</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-foreground">🎙 AI Voice Intelligence System</span>
          </h2>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg mb-8">
            Transcription + Summarization + Sentiment + Translation + On-Demand Speech
          </p>
        </div>

        {/* Voice Features - Similar to FeaturesSection */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-info/10 border border-info/20 text-info text-sm font-medium mb-4">
              <Zap className="w-4 h-4" />
              <span>How It Works</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="text-foreground">Voice Processing </span>
              <span className="gradient-text">Pipeline</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From voice recording to intelligent insights in milliseconds
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {voiceFeatures.map((feature, index) => (
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

        {/* Voice Tech Stack - Similar to ProjectOverviewSection */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              <span className="text-foreground">Deep Dive Into Our </span>
              <span className="gradient-text">Voice System</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Explore the cutting-edge technologies powering our AI voice intelligence platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            {voiceTechStack.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.id}
                  className="group relative p-5 rounded-2xl bg-card border border-border/50 transition-all duration-500 hover:shadow-xl hover:border-primary/30"
                  style={{
                    animationDelay: `${Math.random() * 0.3}s`
                  }}
                >
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {card.title}
                  </h3>
                  <p className="text-xs text-primary font-medium uppercase tracking-wider mb-2">
                    {card.subtitle}
                  </p>
                  <p className="text-muted-foreground mb-3 text-xs leading-relaxed">
                    {card.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {card.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded-full bg-secondary text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Details */}
                  <div className="pt-2 border-t border-border/50">
                    <ul className="space-y-1">
                      {card.details.map((detail, index) => (
                        <li key={index} className="flex items-start gap-1 text-xs text-muted-foreground">
                          <svg className="w-3 h-3 text-primary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Voice Metrics - Similar to ProjectOverviewSection stats */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'AI APIs', value: '3', icon: Cpu },
              { label: 'Intelligence Outputs', value: '6', icon: Brain },
              { label: 'Languages', value: '20+', icon: Globe },
              { label: 'Real-time Processing', value: '✓', icon: Zap },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="p-4 rounded-2xl bg-card border border-border/50 text-center hover:border-primary/30 transition-colors"
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Privacy-First Design */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">🔐 Privacy-First Architecture</h3>
          <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl p-6">
            <p className="text-muted-foreground mb-4 text-center">
              We prioritize your privacy with a secure, transparent architecture:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20">
                <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">No Server Storage</h4>
                  <p className="text-sm text-muted-foreground">Audio never stored on servers, processed in-memory only</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20">
                <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Memory Cleanup</h4>
                  <p className="text-sm text-muted-foreground">Audio data cleared after processing completes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20">
                <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Browser Control</h4>
                  <p className="text-sm text-muted-foreground">Optional local caching with user control</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20">
                <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Manual Playback</h4>
                  <p className="text-sm text-muted-foreground">All audio output requires explicit user action</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Intelligence Layer */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Advanced Intelligence Layer</h3>
          <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl p-6">
            <p className="text-muted-foreground mb-6 text-center">
              This system provides sophisticated analysis beyond basic summarization:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5 border border-primary/10">
                <Brain className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Explainable Sentiment Detection</h4>
                  <p className="text-sm text-muted-foreground">Identifies emotional tone with reasoning</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-info/5 border border-info/10">
                <TrendingUp className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Confidence Score with Reasoning</h4>
                  <p className="text-sm text-muted-foreground">Quantifies certainty with explanations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-warning/5 border border-warning/10">
                <AlertTriangle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Task Extraction</h4>
                  <p className="text-sm text-muted-foreground">Identifies actionable items from conversations</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-success/5 border border-success/10">
                <Clock className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Deadline Detection</h4>
                  <p className="text-sm text-muted-foreground">Recognizes time-sensitive commitments</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-destructive/5 border border-destructive/10">
                <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Urgency Classification</h4>
                  <p className="text-sm text-muted-foreground">Flags high-priority items requiring immediate attention</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/5 border border-secondary/10">
                <Tag className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Topic Classification</h4>
                  <p className="text-sm text-muted-foreground">Categorizes content by subject matter</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Multilingual Support */}
        <div>
          <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">Multilingual Support</h3>
          <div className="max-w-4xl mx-auto bg-card border border-border/50 rounded-2xl p-6">
            <p className="text-muted-foreground mb-4 text-center">
              Our translation feature enables global accessibility:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 rounded-xl bg-primary/5">
                <Globe className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Language Selection</h4>
                  <p className="text-sm text-muted-foreground">Intuitive dropdown for target language selection</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-info/5">
                <MessageSquare className="w-5 h-5 text-info mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">AI Translation</h4>
                  <p className="text-sm text-muted-foreground">Preserves semantic meaning of insights</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-success/5">
                <Zap className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Format Preservation</h4>
                  <p className="text-sm text-muted-foreground">Structure remains intact after translation</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/5">
                <Layers className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Global Coverage</h4>
                  <p className="text-sm text-muted-foreground">Supports major Indian and global languages</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};