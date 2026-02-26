import { useState, useRef, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { Mic, Square, Play, Sparkles, Volume2, Globe, Clock, BarChart3, ListTodo, AlertTriangle, FileText, Bot } from 'lucide-react';

interface VoiceAnalysis {
    summary?: string;
    action_items?: any[];
    sentiment?: string;
    sentiment_reasoning?: string;
    confidence_score?: number;
    confidence_reasoning?: string;
    urgency?: string;
    topics?: string[];
    error?: string;
}

const Voice = () => {
    const { toast } = useToast();

    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [recordingTime, setRecordingTime] = useState(0);

    const [customFile, setCustomFile] = useState<File | null>(null);

    const [isProcessing, setIsProcessing] = useState(false);
    const [currentStep, setCurrentStep] = useState<string>('idle'); // idle -> transcription -> analysis -> complete

    const [transcript, setTranscript] = useState<string | null>(null);
    const [analysis, setAnalysis] = useState<VoiceAnalysis | null>(null);
    const [ttsAudioBase64, setTtsAudioBase64] = useState<string | null>(null);
    const [isPlayingTts, setIsPlayingTts] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<BlobPart[]>([]);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const ttsAudioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
            if (audioUrl) URL.revokeObjectURL(audioUrl);
        };
    }, [audioUrl]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) chunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = () => {
                const _blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudioBlob(_blob);
                const url = URL.createObjectURL(_blob);
                setAudioUrl(url);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);
            setAudioBlob(null);
            setAudioUrl(null);
            setCustomFile(null);
            setTranscript(null);
            setAnalysis(null);
            setTtsAudioBase64(null);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);

        } catch (err) {
            toast({
                title: "Microphone Access Denied",
                description: "Please allow microphone permissions to record audio.",
                variant: "destructive"
            });
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setCustomFile(file);
            setAudioBlob(file);
            setAudioUrl(URL.createObjectURL(file));
            setTranscript(null);
            setAnalysis(null);
            setTtsAudioBase64(null);
        }
    };

    const handleTranscribeAndAnalyze = async () => {
        if (!audioBlob) return;

        setIsProcessing(true);
        setCurrentStep('transcription');

        try {
            // 1. Transcribe
            const startTranscribe = performance.now();
            const transcribeRes = await api.transcribeAudio(audioBlob);
            const transcribedText = transcribeRes.transcript;
            setTranscript(transcribedText);
            const transcribeTime = Math.round(performance.now() - startTranscribe);

            // 2. Analyze
            setCurrentStep('analysis');
            const analyzeStart = performance.now();
            const analyzeRes = await api.analyzeTranscript(transcribedText);
            setAnalysis(analyzeRes);
            const analyzeTime = Math.round(performance.now() - analyzeStart);

            setCurrentStep('complete');

            toast({
                title: 'Voice Intelligence Complete',
                description: `Transcribed in ${transcribeTime / 1000}s, Analyzed in ${analyzeTime / 1000}s`,
            });

        } catch (error) {
            const message = error instanceof Error ? error.message : "Failed to process audio";
            toast({
                title: 'Processing Error',
                description: message,
                variant: 'destructive',
            });
            setCurrentStep('idle');
        } finally {
            setIsProcessing(false);
        }
    };

    const handlePlayTTS = async () => {
        if (!transcript) return;
        if (isPlayingTts && ttsAudioRef.current) {
            ttsAudioRef.current.pause();
            ttsAudioRef.current.currentTime = 0;
            setIsPlayingTts(false);
            return;
        }
        if (ttsAudioBase64 && ttsAudioRef.current) {
            ttsAudioRef.current.play();
            setIsPlayingTts(true);
            return;
        }

        setIsPlayingTts(true);
        try {
            toast({ title: 'Generating audio...' });
            const res = await api.textToSpeech(analysis?.summary || transcript);
            setTtsAudioBase64(res.audio_base64);

            const audio = new Audio("data:audio/mpeg;base64," + res.audio_base64);
            ttsAudioRef.current = audio;
            audio.onended = () => setIsPlayingTts(false);
            audio.play();
        } catch (err) {
            setIsPlayingTts(false);
            toast({
                title: 'TTS Failed',
                description: 'Failed to generate speech.',
                variant: 'destructive'
            });
        }
    };

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
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Voice Intelligence <span className="gradient-text">Studio</span>
                        </h1>
                        <p className="text-muted-foreground">
                            Record meetings, lectures or notes, and let AI transcribe and extract actionable insights.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Left Column - Controls */}
                        <div className="space-y-6">

                            {/* Record Card */}
                            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-info opacity-50" />
                                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2 mb-6">
                                    <Mic className="w-5 h-5 text-primary" />
                                    Capture Audio
                                </h3>

                                <div className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-border/50 rounded-xl bg-background/50 mb-6">
                                    <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-destructive/10 animate-pulse' : 'bg-primary/10'}`}>
                                        {isRecording ? (
                                            <Mic className="w-10 h-10 text-destructive" />
                                        ) : (
                                            <Mic className="w-10 h-10 text-primary" />
                                        )}
                                    </div>

                                    <div className="mt-4 text-center">
                                        {isRecording ? (
                                            <>
                                                <div className="text-2xl font-mono text-destructive font-semibold">
                                                    {formatTime(recordingTime)}
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1 animate-pulse">Recording active...</p>
                                            </>
                                        ) : (
                                            <>
                                                <div className="text-xl font-medium text-foreground">Ready to Record</div>
                                                <p className="text-sm text-muted-foreground mt-1">Press the button below to start</p>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 mb-6">
                                    {!isRecording ? (
                                        <Button
                                            variant="hero"
                                            onClick={startRecording}
                                            className="col-span-2 relative group overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-info opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <span className="relative z-10 flex items-center gap-2">
                                                <Mic className="w-4 h-4" /> Start Recording
                                            </span>
                                        </Button>
                                    ) : (
                                        <Button
                                            variant="destructive"
                                            onClick={stopRecording}
                                            className="col-span-2 shadow-lg shadow-destructive/20 animate-pulse relative"
                                        >
                                            <Square className="w-4 h-4 mr-2" /> Stop Recording
                                        </Button>
                                    )}
                                </div>

                                <div className="relative mb-6">
                                    <div className="absolute inset-0 flex items-center">
                                        <span className="w-full border-t border-border/50" />
                                    </div>
                                    <div className="relative flex justify-center text-xs uppercase">
                                        <span className="bg-card px-2 text-muted-foreground">Or Upload File</span>
                                    </div>
                                </div>

                                <label className="flex items-center justify-center gap-2 px-4 py-3 border border-border rounded-lg bg-secondary/50 hover:bg-secondary cursor-pointer transition-colors text-sm font-medium">
                                    <FileText className="w-4 h-4 text-muted-foreground" />
                                    <span>Choose Audio File</span>
                                    <input type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
                                </label>
                                {(customFile || audioBlob) && !isRecording && (
                                    <div className="mt-4 text-center text-sm text-success font-medium bg-success/10 py-2 rounded-lg border border-success/20">
                                        Audio ready for analysis: {customFile ? customFile.name : 'recorded_audio.webm'}
                                    </div>
                                )}
                            </div>

                            {/* Action Button */}
                            {audioBlob && !isRecording && currentStep === 'idle' && (
                                <Button
                                    variant="hero"
                                    size="lg"
                                    onClick={handleTranscribeAndAnalyze}
                                    className="w-full"
                                    disabled={isProcessing}
                                >
                                    <Sparkles className="w-5 h-5 mr-2" />
                                    {isProcessing ? 'Processing AI Models...' : 'Extract Voice Intelligence'}
                                </Button>
                            )}

                            {/* Processing Steps */}
                            {isProcessing && (
                                <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg">
                                    <h3 className="text-sm font-medium text-foreground mb-4">Processing Pipeline</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'transcription' ? 'bg-primary text-primary-foreground animate-pulse' : 'bg-primary text-primary-foreground'}`}>
                                                1
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-sm">Speech to Text</div>
                                                <div className="text-xs text-muted-foreground">ElevenLabs STT Transcription</div>
                                            </div>
                                        </div>
                                        <div className="w-px h-4 bg-border ml-4" />
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === 'analysis' ? 'bg-info text-info-foreground animate-pulse' : currentStep === 'complete' ? 'bg-info text-info-foreground' : 'bg-secondary text-muted-foreground'}`}>
                                                2
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-medium text-sm">Intelligence Extraction</div>
                                                <div className="text-xs text-muted-foreground">LLaMA 3.1 8B Groq Inference</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right Column - Results */}
                        <div className="lg:col-span-2 space-y-6">
                            {currentStep === 'complete' && transcript && analysis ? (
                                <>
                                    {/* Full Transcript (Collapsible or Scrollable) */}
                                    <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg mb-6">
                                        <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                                            <FileText className="w-5 h-5 text-primary" />
                                            Full Transcript
                                        </h3>
                                        <div className="p-4 rounded-xl bg-background/50 border border-border text-sm text-foreground max-h-64 overflow-y-auto whitespace-pre-wrap leading-relaxed font-mono">
                                            {transcript}
                                        </div>
                                    </div>

                                    {/* Summary & Audio Playback Card */}
                                    <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg relative overflow-hidden group">
                                        {/* Decorative gradient overlay */}
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 transition-all group-hover:bg-primary/10" />

                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 relative z-10">
                                            <div>
                                                <h3 className="text-xl font-bold flex items-center gap-2">
                                                    <Bot className="w-6 h-6 text-primary" />
                                                    Executive Summary
                                                </h3>
                                                <p className="text-sm text-muted-foreground mt-1">Generated by LLaMA 3.1</p>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {audioUrl && (
                                                    <audio controls src={audioUrl} className="h-10 w-48 hidden sm:block grayscale contrast-125 sepia-0 invert" style={{ borderRadius: '4px' }} />
                                                )}
                                                <Button
                                                    variant="secondary"
                                                    onClick={handlePlayTTS}
                                                    className="flex items-center gap-2 border border-border/50 hover:border-primary/50 text-primary"
                                                >
                                                    {isPlayingTts ? <Square className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                                    {isPlayingTts ? 'Stop TTS' : 'Play Summary'}
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-xl bg-background/50 border border-border leading-relaxed text-foreground relative z-10">
                                            {analysis.summary || 'No summary generated.'}
                                        </div>
                                    </div>

                                    {/* Grid for Metrics */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                        <div className="p-5 rounded-xl bg-card border border-border/50 flex flex-col hover:border-primary/30 transition-colors">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5"><BarChart3 className="w-3.5 h-3.5" /> Sentiment</span>
                                            <span className={`text-xl font-bold ${analysis.sentiment?.toLowerCase() === 'negative' ? 'text-destructive' : analysis.sentiment?.toLowerCase() === 'positive' ? 'text-success' : 'text-info'}`}>
                                                {analysis.sentiment || 'Unknown'}
                                            </span>
                                        </div>
                                        <div className="p-5 rounded-xl bg-card border border-border/50 flex flex-col hover:border-primary/30 transition-colors">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Urgency</span>
                                            <span className={`text-xl font-bold ${analysis.urgency?.toLowerCase() === 'high' ? 'text-destructive' : analysis.urgency?.toLowerCase() === 'medium' ? 'text-warning' : 'text-success'}`}>
                                                {analysis.urgency || 'Normal'}
                                            </span>
                                        </div>
                                        <div className="p-5 rounded-xl bg-card border border-border/50 flex flex-col hover:border-primary/30 transition-colors">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Confidence</span>
                                            <div className="flex items-end gap-1">
                                                <span className="text-xl font-bold text-primary">{analysis.confidence_score || 0}</span>
                                                <span className="text-sm font-medium text-muted-foreground mb-0.5">/100</span>
                                            </div>
                                        </div>
                                        <div className="p-5 rounded-xl bg-card border border-border/50 flex flex-col hover:border-primary/30 transition-colors">
                                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Duration</span>
                                            <span className="text-xl font-bold text-foreground">{audioUrl ? formatTime(recordingTime) : 'Audio'}</span>
                                        </div>
                                    </div>

                                    {/* Action Items */}
                                    {analysis.action_items && analysis.action_items.length > 0 && (
                                        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg">
                                            <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
                                                <ListTodo className="w-5 h-5 text-primary" />
                                                Action Items
                                            </h3>
                                            <div className="space-y-3">
                                                {analysis.action_items.map((item: any, idx: number) => (
                                                    <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-background/50 border border-border/40 gap-3">
                                                        <div className="flex items-start gap-3 flex-1">
                                                            <div className="mt-0.5 min-w-[20px]">
                                                                <div className="w-5 h-5 rounded-full border-2 border-primary/40" />
                                                            </div>
                                                            <div>
                                                                <div className="font-medium">{item.task || item}</div>
                                                                {item.responsible && <div className="text-xs text-muted-foreground mt-1">Assigned to: <span className="text-info font-medium">{item.responsible}</span></div>}
                                                            </div>
                                                        </div>
                                                        {item.deadline && (
                                                            <div className="px-3 py-1 rounded-full bg-secondary text-xs font-medium whitespace-nowrap">
                                                                {item.deadline}
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Topics Tags */}
                                    {analysis.topics && analysis.topics.length > 0 && (
                                        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg">
                                            <span className="text-sm font-semibold text-muted-foreground mb-3 block uppercase tracking-wider">Detected Topics</span>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.topics.map((topic: string, i: number) => (
                                                    <span key={i} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm border border-primary/20">
                                                        {topic}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </>
                            ) : (
                                <div className="flex items-center justify-center h-full min-h-[500px] rounded-2xl border-2 border-dashed border-border bg-card/30">
                                    <div className="text-center max-w-md px-4">
                                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-6 flex items-center justify-center">
                                            <Bot className="w-10 h-10 text-primary" />
                                        </div>
                                        <h3 className="text-xl font-semibold text-foreground mb-3">
                                            Awaiting Audio Input
                                        </h3>
                                        <p className="text-muted-foreground mb-6">
                                            Record an audio clip or upload a file. The AI Voice Intelligence module will transcribe and extract meeting insights automatically.
                                        </p>
                                        <div className="flex flex-wrap justify-center gap-2 text-xs text-muted-foreground">
                                            <span className="px-3 py-1 rounded-full bg-secondary">ElevenLabs STT</span>
                                            <span className="px-3 py-1 rounded-full bg-secondary">Groq LLaMA 3.1</span>
                                            <span className="px-3 py-1 rounded-full bg-secondary">Real-time Insight</span>
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

export default Voice;
