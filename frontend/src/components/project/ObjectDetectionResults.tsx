import { useState } from 'react';
import { Eye, Target, Percent, EyeOff, MapPin } from 'lucide-react';
import { DetectedObject } from '@/lib/api';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

interface ObjectDetectionResultsProps {
  annotatedImage: string;
  objectsDetected: DetectedObject[];
  totalObjects: number;
  originalImage?: string;
}

export const ObjectDetectionResults = ({
  annotatedImage,
  objectsDetected,
  totalObjects,
  originalImage,
}: ObjectDetectionResultsProps) => {
  const [showBoundingBoxes, setShowBoundingBoxes] = useState(true);
  const [showCoordinates, setShowCoordinates] = useState(false);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-success';
    if (confidence >= 0.5) return 'text-warning';
    return 'text-destructive';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-success/10';
    if (confidence >= 0.5) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  const getConfidenceBarColor = (confidence: number) => {
    if (confidence >= 0.8) return 'bg-success';
    if (confidence >= 0.5) return 'bg-warning';
    return 'bg-destructive';
  };

  const formatBbox = (bbox?: [number, number, number, number]) => {
    if (!bbox) return 'N/A';
    return `[${bbox.map(n => Math.round(n)).join(', ')}]`;
  };

  // Determine which image to show
  const displayImage = showBoundingBoxes 
    ? `data:image/jpeg;base64,${annotatedImage}`
    : originalImage || `data:image/jpeg;base64,${annotatedImage}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Eye className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Object Detection Results</h3>
            <p className="text-sm text-muted-foreground">
              {totalObjects} object{totalObjects !== 1 ? 's' : ''} detected
            </p>
          </div>
        </div>

        {/* Bounding Box Toggle */}
        <div className="flex items-center gap-2">
          {showBoundingBoxes ? (
            <Eye className="w-4 h-4 text-muted-foreground" />
          ) : (
            <EyeOff className="w-4 h-4 text-muted-foreground" />
          )}
          <span className="text-sm text-muted-foreground">Bounding Boxes</span>
          <Switch
            checked={showBoundingBoxes}
            onCheckedChange={setShowBoundingBoxes}
          />
        </div>
      </div>

      {/* Annotated Image with Bounding Boxes */}
      <div className="rounded-2xl overflow-hidden border border-border bg-secondary/20 relative">
        <img
          src={displayImage}
          alt="Detection results with bounding boxes"
          className="w-full h-auto max-h-[500px] object-contain"
        />
        
        {/* Image Caption */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 to-transparent p-4">
          <p className="text-sm text-muted-foreground">
            {showBoundingBoxes 
              ? '🎯 AI-annotated image with detected objects and confidence scores'
              : '📷 Original uploaded image'}
          </p>
        </div>
      </div>

      {/* Objects Table/List */}
      {objectsDetected.length > 0 && (
        <div className="p-4 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-muted-foreground" />
              <h4 className="font-medium text-foreground">Detected Objects</h4>
            </div>
            
            {/* Show Coordinates Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowCoordinates(!showCoordinates)}
              className="text-xs"
            >
              <MapPin className="w-3 h-3 mr-1" />
              {showCoordinates ? 'Hide' : 'Show'} Coordinates
            </Button>
          </div>

          {/* Objects Grid */}
          <div className="space-y-3">
            {objectsDetected.map((obj, index) => (
              <div
                key={index}
                className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-semibold text-foreground capitalize text-lg">
                        {obj.label}
                      </span>
                      {showCoordinates && obj.bbox && (
                        <p className="text-xs text-muted-foreground font-mono mt-0.5">
                          bbox: {formatBbox(obj.bbox)}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className={cn(
                    "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-bold",
                    getConfidenceBg(obj.confidence),
                    getConfidenceColor(obj.confidence)
                  )}>
                    <Percent className="w-3.5 h-3.5" />
                    <span>{(obj.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>

                {/* Confidence Progress Bar */}
                <div className="relative">
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        getConfidenceBarColor(obj.confidence)
                      )}
                      style={{ width: `${obj.confidence * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                    <span>0%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-muted-foreground">High Confidence (≥80%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-muted-foreground">Medium (50-79%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-muted-foreground">Low (&lt;50%)</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
