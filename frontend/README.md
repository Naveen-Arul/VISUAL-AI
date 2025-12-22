# VisualAI - Multimodal Scene Understanding System

## Project Overview

VisualAI is a comprehensive multimodal AI system that combines computer vision, natural language processing, and large language models to analyze and explain visual scenes. The system detects objects in images, analyzes the scene context, and generates human-readable explanations.

## How to Run the Application

Follow these steps to set up and run the application locally:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the frontend directory
cd frontend

# Step 3: Install the necessary dependencies
npm install

# Step 4: Start the development server with auto-reloading and an instant preview
npm run dev
```

Make sure the backend server is running on `http://localhost:8000` for the application to work properly.

## Technology Stack

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Router
- React Query

## Backend API Integration

The frontend communicates with a FastAPI backend that provides the following endpoints:

- `/cv/detect` - Computer vision object detection using YOLOv8
- `/scene/analyze` - Scene analysis with rule-based engine
- `/scene/explain` - Natural language explanation using LLaMA

## Deployment

To deploy this application:

1. Build the production version:
   ```bash
   npm run build
   ```

2. Serve the built files using any static file server or deploy to your preferred hosting platform.

## Project Structure

- `src/components/` - Reusable UI components
- `src/pages/` - Main application pages
- `src/lib/` - Utility functions and API clients
- `src/hooks/` - Custom React hooks