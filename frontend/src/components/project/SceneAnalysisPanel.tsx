import { useState } from 'react';
import { Brain, MapPin, Activity, Users, ChevronDown, ChevronUp, PawPrint, Building2, Layers, AlertCircle, Sparkles } from 'lucide-react';
import { SceneAnalysis } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SceneAnalysisPanelProps {
  sceneText: string;
  analysis: SceneAnalysis;
}

const primaryCards = [
  { key: 'environment', label: 'Environment', icon: MapPin, color: 'primary' },
  { key: 'activity_context', label: 'Activity Context', icon: Activity, color: 'info' },
  { key: 'human_presence', label: 'Human Presence', icon: Users, color: 'success' },
];

const advancedCards = [
  { key: 'animal_context', label: 'Animal Context', icon: PawPrint },
  { key: 'infrastructure', label: 'Infrastructure', icon: Building2 },
  { key: 'scene_complexity', label: 'Scene Complexity', icon: Layers },
  { key: 'attention_level', label: 'Attention Level', icon: AlertCircle },
];

export const SceneAnalysisPanel = ({ sceneText, analysis }: SceneAnalysisPanelProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const getValue = (key: string): string => {
    const value = analysis[key as keyof SceneAnalysis];
    if (value === undefined || value === null) return 'N/A';
    if (typeof value === 'number') return value.toString();
    return value;
  };

  const getCardGradient = (color: string) => {
    switch (color) {
      case 'primary': return 'from-primary/10 to-primary/5 border-primary/20';
      case 'info': return 'from-info/10 to-info/5 border-info/20';
      case 'success': return 'from-success/10 to-success/5 border-success/20';
      default: return 'from-secondary to-secondary/50 border-border';
    }
  };

  const getIconColor = (color: string) => {
    switch (color) {
      case 'primary': return 'text-primary';
      case 'info': return 'text-info';
      case 'success': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
          <Brain className="w-5 h-5 text-info" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Scene Analysis</h3>
          <p className="text-sm text-muted-foreground">Semantic understanding of the scene</p>
        </div>
      </div>

      {/* Scene Text Summary */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-info/5 to-transparent border border-info/20">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-info shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-info font-medium uppercase tracking-wider mb-1">Scene Summary</p>
            <p className="text-foreground font-medium">{sceneText}</p>
          </div>
        </div>
      </div>

      {/* Primary Analysis Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        {primaryCards.map(({ key, label, icon: Icon, color }) => {
          const value = getValue(key);
          return (
            <div
              key={key}
              className={cn(
                "p-5 rounded-xl bg-gradient-to-br border transition-all hover:scale-[1.02]",
                getCardGradient(color)
              )}
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className={cn("w-4 h-4", getIconColor(color))} />
                <span className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{label}</span>
              </div>
              <p className="font-semibold text-foreground text-lg">{value}</p>
            </div>
          );
        })}
      </div>

      {/* Person Count Highlight */}
      {analysis.person_count !== undefined && analysis.person_count > 0 && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-primary/5 border border-primary/20">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{analysis.person_count}</p>
            <p className="text-sm text-muted-foreground">
              {analysis.person_count === 1 ? 'Person' : 'People'} Detected
            </p>
          </div>
        </div>
      )}

      {/* Advanced Details Toggle */}
      <Button
        variant="ghost"
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="w-full justify-between hover:bg-secondary"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4" />
          <span>Advanced Details</span>
        </div>
        {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </Button>

      {/* Advanced Analysis Cards */}
      <div
        className={cn(
          "grid gap-3 sm:grid-cols-2 transition-all duration-300 overflow-hidden",
          showAdvanced ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        {advancedCards.map(({ key, label, icon: Icon }) => {
          const value = getValue(key);
          if (value === 'N/A') return null;

          return (
            <div
              key={key}
              className="p-4 rounded-xl bg-secondary/30 border border-border hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-2">
                <Icon className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{label}</span>
              </div>
              <p className="text-foreground font-medium">{value}</p>
            </div>
          );
        })}
      </div>

      {/* Analysis Method Note */}
      <div className="text-xs text-muted-foreground text-center pt-2 border-t border-border/50">
        Analysis performed using rule-based inference on detected objects
      </div>
    </div>
  );
};
