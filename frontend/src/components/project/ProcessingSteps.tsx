import { Check, Loader2, Circle, Eye, Brain, MessageSquare, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ProcessingStep = 'idle' | 'detection' | 'analysis' | 'explanation' | 'complete';

interface ProcessingStepsProps {
  currentStep: ProcessingStep;
  error?: string | null;
  processingTimes?: {
    detection?: number;
    analysis?: number;
    explanation?: number;
  };
}

const steps = [
  {
    id: 'detection',
    label: 'Object Detection',
    description: 'Identifying objects with YOLOv8',
    icon: Eye,
  },
  {
    id: 'analysis',
    label: 'Scene Analysis',
    description: 'Understanding scene context',
    icon: Brain,
  },
  {
    id: 'explanation',
    label: 'AI Explanation',
    description: 'Generating with LLaMA 3.2',
    icon: MessageSquare,
  },
];

export const ProcessingSteps = ({ currentStep, error, processingTimes }: ProcessingStepsProps) => {
  const getStepStatus = (stepId: string): 'pending' | 'active' | 'complete' | 'error' => {
    if (currentStep === 'idle') return 'pending';
    if (error && currentStep === stepId) return 'error';
    
    const stepOrder = ['detection', 'analysis', 'explanation', 'complete'];
    const currentIndex = stepOrder.indexOf(currentStep);
    const stepIndex = stepOrder.indexOf(stepId);

    if (currentStep === 'complete' || stepIndex < currentIndex) return 'complete';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const getProcessingTime = (stepId: string): number | undefined => {
    if (!processingTimes) return undefined;
    return processingTimes[stepId as keyof typeof processingTimes];
  };

  const formatTime = (ms: number): string => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  if (currentStep === 'idle') return null;

  const totalTime = processingTimes 
    ? (processingTimes.detection || 0) + (processingTimes.analysis || 0) + (processingTimes.explanation || 0)
    : 0;

  return (
    <div className="p-6 rounded-2xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold text-foreground">Processing Pipeline</h3>
        {currentStep === 'complete' && totalTime > 0 && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>Total: {formatTime(totalTime)}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          const time = getProcessingTime(step.id);

          return (
            <div key={step.id} className="flex items-start gap-4">
              {/* Status Icon */}
              <div className="relative">
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300",
                    status === 'complete' && "bg-success/20",
                    status === 'active' && "bg-primary/20 animate-pulse",
                    status === 'pending' && "bg-secondary",
                    status === 'error' && "bg-destructive/20"
                  )}
                >
                  {status === 'complete' ? (
                    <Check className="w-5 h-5 text-success" />
                  ) : status === 'active' ? (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  ) : status === 'error' ? (
                    <Circle className="w-5 h-5 text-destructive" />
                  ) : (
                    <Icon className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "absolute left-1/2 top-10 w-0.5 h-6 -translate-x-1/2",
                      status === 'complete' ? "bg-success/50" : "bg-border"
                    )}
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 pb-4">
                <div className="flex items-center justify-between">
                  <p
                    className={cn(
                      "font-medium transition-colors",
                      status === 'complete' && "text-success",
                      status === 'active' && "text-primary",
                      status === 'pending' && "text-muted-foreground",
                      status === 'error' && "text-destructive"
                    )}
                  >
                    {step.label}
                  </p>
                  
                  {/* Processing Time Badge */}
                  {status === 'complete' && time !== undefined && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-success/10 text-success font-mono">
                      {formatTime(time)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {status === 'active' ? step.description + '...' : step.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {/* Completion Message */}
      {currentStep === 'complete' && !error && (
        <div className="mt-4 p-4 rounded-xl bg-success/10 border border-success/20 flex items-center gap-3">
          <Check className="w-5 h-5 text-success" />
          <p className="text-sm text-success font-medium">Analysis complete! Results are ready.</p>
        </div>
      )}
    </div>
  );
};
