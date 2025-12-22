// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface DetectedObject {
  label: string;
  confidence: number;
  bbox?: [number, number, number, number];
}

export interface DetectionResponse {
  objects_detected: DetectedObject[];
  total_objects: number;
  annotated_image: string;
}

export interface SceneAnalysis {
  environment: string;
  human_presence: string;
  activity_context: string;
  animal_context?: string;
  infrastructure?: string;
  scene_complexity?: string;
  attention_level?: string;
  person_count?: number;
}

export interface AnalysisResponse {
  scene_text: string;
  analysis: SceneAnalysis;
}

export interface ExplanationResponse {
  scene_text: string;
  analysis: SceneAnalysis;
  explanation: string;
}

export interface HealthResponse {
  status: string;
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_BASE_URL;
  }

  async healthCheck(): Promise<HealthResponse> {
    const response = await fetch(`${this.baseUrl}/health`);
    if (!response.ok) {
      throw new Error('Health check failed');
    }
    return response.json();
  }

  async detectObjects(imageFile: File): Promise<DetectionResponse> {
    const formData = new FormData();
    formData.append('file', imageFile);

    const response = await fetch(`${this.baseUrl}/cv/detect`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Object detection failed');
    }

    return response.json();
  }

  async analyzeScene(objectsDetected: DetectedObject[]): Promise<AnalysisResponse> {
    const response = await fetch(`${this.baseUrl}/scene/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ objects_detected: objectsDetected }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Scene analysis failed');
    }

    return response.json();
  }

  async explainScene(objectsDetected: DetectedObject[]): Promise<ExplanationResponse> {
    const response = await fetch(`${this.baseUrl}/scene/explain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ objects_detected: objectsDetected }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || 'Scene explanation failed');
    }

    return response.json();
  }
}

export const api = new ApiService();
