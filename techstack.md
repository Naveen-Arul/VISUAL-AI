# Multimodal Visual Scene Understanding System – Tech Stack

## Design Principles

- CPU-only inference
- Render-friendly deployment
- Modular architecture
- Production-ready implementation

## 1. Computer Vision (Object Detection)

### Purpose
Detect all objects in an image and extract bounding boxes and confidence scores.

### Model
- YOLOv8 (COCO pretrained)

### Tech
- Python
- OpenCV
- Ultralytics YOLO
- NumPy

### Output
```json
{
  "label": "car",
  "confidence": 0.91,
  "bbox": [x1, y1, x2, y2]
}
```

### Features
* Bounding box visualization
* Annotated image generation
* Lightweight CPU inference

## 2. NLP Understanding Layer (BERT)

### Purpose
Understand image content at a semantic level.

### Model
* `bert-base-uncased`

### Tasks
* Scene classification
* Context extraction
* Crowd / environment analysis

### Tech
* HuggingFace Transformers
* PyTorch
* Tokenizers

### Why BERT
* Deterministic outputs
* Lightweight compared to LLMs
* Ideal for structured understanding

## 3. Reasoning & Explanation (LLaMA)

### Purpose
Generate natural language explanations of image content.

### Model Options
* LLaMA 2 7B (quantized)
* Mistral 7B (quantized)

### Usage
* Prompt-based reasoning
* Instruction-style input
* No full retraining

### Tech
* ctransformers
* llama.cpp
* Quantized GGUF models

### Render Optimization
* CPU inference
* Token limits
* Single model load at startup

## 4. Backend

### Framework
* FastAPI

### Stack
* FastAPI
* Uvicorn
* Python 3.10
* Pydantic
* Multipart file handling

### API Modules
```
/cv/detect
/nlp/analyze
/llm/explain
```

## 5. Frontend

### Framework
* React (Vite)

### Features
* Image upload
* Bounding box visualization
* Object list with confidence
* Scene summary display

### Tech
* React
* Axios
* Canvas / SVG overlays

## 6. Database (Optional)

### Choice
* MongoDB Atlas (Free Tier)

Stores:
* Detection metadata
* Scene summaries
* Timestamps

## 7. Deployment

### Backend
* Render Web Service

Build:
```bash
pip install -r requirements.txt
```

Start:
```bash
uvicorn app:app --host 0.0.0.0 --port 10000
```

### Frontend
* Vercel or Render Static Site

## Memory & Stability
* Models loaded once
* CPU-only inference
* Input size limits
* No video processing

## Folder Structure
```
backend/
 ├── app.py
 ├── cv/
 │    └── detector.py
 ├── nlp/
 │    └── bert_analyzer.py
 ├── llm/
 │    └── llama_explainer.py
 ├── models/
 ├── requirements.txt
```

Clean. Modular. Ready for deployment.