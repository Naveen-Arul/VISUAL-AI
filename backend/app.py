from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from cv.detector import detect_objects
from nlp.scene_analyzer import analyze_scene
from nlp.scene_text import generate_scene_text
from utils.logger import log_scene
from pydantic import BaseModel
from typing import List, Dict
import sys
import pathlib

# Add the backend directory to the path
sys.path.append(str(pathlib.Path(__file__).parent))

# Conditional import for LLaMA explainer (to avoid dependency issues during development)
try:
    from llm.llama_explainer import explain_scene as generate_llama_explanation
    LLaMA_AVAILABLE = True
except ImportError:
    LLaMA_AVAILABLE = False
    print("LLaMA explainer not available. Install required dependencies for full functionality.")

from routes.voice_routes import router as voice_router

app = FastAPI(title="Multimodal Visual Scene Understanding System")

app.include_router(voice_router)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8080", "https://your-vercel-domain.vercel.app"],  # Frontend origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class SceneAnalyzeRequest(BaseModel):
    objects_detected: List[Dict]

class FullAnalysisRequest(BaseModel):
    image_bytes: bytes

@app.get("/health")
def health():
    return {"status": "CV service running"}

@app.post("/cv/detect")
async def detect_image(file: UploadFile = File(...)):
    image_bytes = await file.read()
    result = detect_objects(image_bytes)
    return result

@app.post("/scene/analyze")
async def analyze_scene_endpoint(payload: SceneAnalyzeRequest):
    # Analyze scene
    scene_result = analyze_scene(payload.objects_detected)
    
    # Generate scene text
    scene_text = generate_scene_text(payload.objects_detected)
    
    # Log data for future BERT training
    log_scene(scene_text, scene_result)
    
    return {
        "scene_text": scene_text,
        "analysis": scene_result
    }

@app.post("/scene/explain")
async def explain_scene_endpoint(payload: SceneAnalyzeRequest):
    """Generate natural language explanation using LLaMA"""
    # Generate scene text
    scene_text = generate_scene_text(payload.objects_detected)
    
    # Get rule-based analysis
    rule_analysis = analyze_scene(payload.objects_detected)
    
    # For now, we'll use the rule analysis as both rule and BERT output
    # In a full implementation, this would be the actual BERT prediction
    bert_output = {
        "environment": rule_analysis["environment"],
        "activity_context": rule_analysis["activity_context"],
        "human_presence": rule_analysis["human_presence"]
    }
    
    # Generate explanation using LLaMA
    if LLaMA_AVAILABLE:
        try:
            explanation = generate_llama_explanation(scene_text, rule_analysis, bert_output)
        except Exception as e:
            explanation = f"Error generating explanation: {str(e)}"
    else:
        explanation = "LLaMA explanation service not available. Please check dependencies."
    
    return {
        "scene_text": scene_text,
        "analysis": rule_analysis,
        "explanation": explanation
    }