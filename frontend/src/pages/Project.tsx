import { useState, useCallback } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ImageUploader } from '@/components/project/ImageUploader';
import { ProcessingSteps, ProcessingStep } from '@/components/project/ProcessingSteps';
import { ObjectDetectionResults } from '@/components/project/ObjectDetectionResults';
import { SceneAnalysisPanel } from '@/components/project/SceneAnalysisPanel';
import { ExplanationPanel } from '@/components/project/ExplanationPanel';
import { HistoryPanel } from '@/components/project/HistoryPanel';
import { DemoImageSelector } from '@/components/project/DemoImageSelector';
import { api, DetectedObject, SceneAnalysis } from '@/lib/api';
import { storage, HistoryEntry } from '@/lib/storage';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { RotateCcw, Sparkles, Zap } from 'lucide-react';

interface AnalysisResults {
  imagePreview: string;
  annotatedImage: string;
  objectsDetected: DetectedObject[];
  totalObjects: number;
  sceneText: string;
  sceneAnalysis: SceneAnalysis;
  explanation: string;
}

interface ProcessingTimes {
  detection?: number;
  analysis?: number;
  explanation?: number;
}

const Project = () => {
  const { toast } = useToast();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [currentStep, setCurrentStep] = useState<ProcessingStep>('idle');
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<AnalysisResults | null>(null);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [currentHistoryId, setCurrentHistoryId] = useState<string>();
  const [processingTimes, setProcessingTimes] = useState<ProcessingTimes>({});

  const handleImageSelect = useCallback((file: File, preview: string) => {
    setImageFile(file);
    setImagePreview(preview);
    setResults(null);
    setError(null);
    setCurrentStep('idle');
    setCurrentHistoryId(undefined);
    setProcessingTimes({});
  }, []);

  const handleClear = useCallback(() => {
    setImageFile(null);
    setImagePreview('');
    setResults(null);
    setError(null);
    setCurrentStep('idle');
    setCurrentHistoryId(undefined);
    setProcessingTimes({});
  }, []);

  const handleDemoSelect = async (imageUrl: string, imageName: string) => {
    try {
      // Fetch the demo image and convert to File
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], `${imageName.toLowerCase().replace(' ', '-')}.jpg`, { type: 'image/jpeg' });

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        const preview = e.target?.result as string;
        handleImageSelect(file, preview);
      };
      reader.readAsDataURL(blob);

      toast({
        title: 'Sample Image Loaded',
        description: `${imageName} is ready for analysis.`,
      });
    } catch (err) {
      toast({
        title: 'Failed to Load Sample Image',
        description: 'Could not load the sample image. Please try uploading your own.',
        variant: 'destructive',
      });
    }
  };

  const processImage = async () => {
    if (!imageFile) return;

    setError(null);
    setCurrentStep('detection');
    setProcessingTimes({});

    try {
      // Step 1: Object Detection
      const detectionStart = performance.now();
      const detectionResult = await api.detectObjects(imageFile);
      const detectionTime = Math.round(performance.now() - detectionStart);
      setProcessingTimes(prev => ({ ...prev, detection: detectionTime }));

      setCurrentStep('analysis');

      // Step 2: Scene Analysis
      const analysisStart = performance.now();
      const analysisResult = await api.analyzeScene(detectionResult.objects_detected);
      const analysisTime = Math.round(performance.now() - analysisStart);
      setProcessingTimes(prev => ({ ...prev, analysis: analysisTime }));

      setCurrentStep('explanation');

      // Step 3: AI Explanation
      const explanationStart = performance.now();
      const explanationResult = await api.explainScene(detectionResult.objects_detected);
      const explanationTime = Math.round(performance.now() - explanationStart);
      setProcessingTimes(prev => ({ ...prev, explanation: explanationTime }));

      setCurrentStep('complete');

      const newResults: AnalysisResults = {
        imagePreview,
        annotatedImage: detectionResult.annotated_image,
        objectsDetected: detectionResult.objects_detected,
        totalObjects: detectionResult.total_objects,
        sceneText: analysisResult.scene_text,
        sceneAnalysis: analysisResult.analysis,
        explanation: explanationResult.explanation,
      };

      setResults(newResults);

      // Save to history
      const historyEntry = storage.addEntry({
        imagePreview,
        annotatedImage: detectionResult.annotated_image,
        objectsDetected: detectionResult.objects_detected,
        sceneAnalysis: analysisResult.analysis,
        explanation: explanationResult.explanation,
        sceneText: analysisResult.scene_text,
      });

      setCurrentHistoryId(historyEntry.id);

      toast({
        title: 'Analysis Complete',
        description: `Detected ${detectionResult.total_objects} objects in ${((detectionTime + analysisTime + explanationTime) / 1000).toFixed(2)}s`,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred';
      setError(message);
      toast({
        title: 'Processing Failed',
        description: message,
        variant: 'destructive',
      });
    }
  };

  const handleRegenerate = async () => {
    if (!results) return;

    setIsRegenerating(true);
    try {
      const explanationResult = await api.explainScene(results.objectsDetected);
      setResults({
        ...results,
        explanation: explanationResult.explanation,
      });
      toast({
        title: 'Explanation Regenerated',
        description: 'A new explanation has been generated.',
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to regenerate';
      toast({
        title: 'Regeneration Failed',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleSelectHistory = (entry: HistoryEntry) => {
    setImagePreview(entry.imagePreview);
    setImageFile(null);
    setCurrentStep('complete');
    setResults({
      imagePreview: entry.imagePreview,
      annotatedImage: entry.annotatedImage,
      objectsDetected: entry.objectsDetected,
      totalObjects: entry.objectsDetected.length,
      sceneText: entry.sceneText,
      sceneAnalysis: entry.sceneAnalysis,
      explanation: entry.explanation,
    });
    setCurrentHistoryId(entry.id);
    setProcessingTimes({});
  };

  const showResults = currentStep === 'complete' && results;
  const isProcessing = currentStep !== 'idle' && currentStep !== 'complete';

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Image & Effects */}
      <div className="absolute inset-0 z-[-1] bg-background/90 backdrop-blur-md" />
      <div
        className="absolute inset-0 z-[-2] bg-cover bg-center bg-fixed bg-no-repeat opacity-20 mix-blend-luminosity"
        style={{ backgroundImage: 'url(/waves-bg.png)' }}
      />

      <Header />
      <main className="flex-1 pt-16 relative z-10">
        <div className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Scene Analysis <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Upload an image to analyze its contents and generate AI explanations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Upload & Controls */}
            <div className="space-y-6">
              <ImageUploader
                onImageSelect={handleImageSelect}
                isProcessing={isProcessing}
                currentPreview={imagePreview}
                onClear={handleClear}
              />

              {/* Process Button */}
              {imageFile && currentStep === 'idle' && (
                <Button
                  variant="hero"
                  size="lg"
                  onClick={processImage}
                  className="w-full"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Analysis
                </Button>
              )}

              {/* Reset Button */}
              {showResults && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={handleClear}
                  className="w-full"
                >
                  <RotateCcw className="w-5 h-5" />
                  Analyze New Image
                </Button>
              )}

              {/* Demo Images */}
              {!imagePreview && (
                <DemoImageSelector
                  onSelectDemo={handleDemoSelect}
                  isProcessing={isProcessing}
                />
              )}

              {/* Processing Steps */}
              <ProcessingSteps
                currentStep={currentStep}
                error={error}
                processingTimes={processingTimes}
              />

              {/* History */}
              <HistoryPanel
                onSelectEntry={handleSelectHistory}
                currentEntryId={currentHistoryId}
              />
            </div>

            {/* Right Column - Results */}
            <div className="lg:col-span-2 space-y-8">
              {showResults ? (
                <>
                  <ObjectDetectionResults
                    annotatedImage={results.annotatedImage}
                    objectsDetected={results.objectsDetected}
                    totalObjects={results.totalObjects}
                    originalImage={results.imagePreview}
                  />

                  <SceneAnalysisPanel
                    sceneText={results.sceneText}
                    analysis={results.sceneAnalysis}
                  />

                  <ExplanationPanel
                    explanation={results.explanation}
                    onRegenerate={handleRegenerate}
                    isRegenerating={isRegenerating}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center h-[500px] rounded-2xl border-2 border-dashed border-border bg-card/30">
                  <div className="text-center max-w-md px-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-6 flex items-center justify-center">
                      <Zap className="w-10 h-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      Ready to Analyze
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Upload an image to see AI-powered object detection,
                      scene analysis, and natural language explanations.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                      <span className="px-3 py-1 rounded-full bg-secondary">YOLOv8 Detection</span>
                      <span className="px-3 py-1 rounded-full bg-secondary">Scene Understanding</span>
                      <span className="px-3 py-1 rounded-full bg-secondary">LLaMA 3.2</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Project;
