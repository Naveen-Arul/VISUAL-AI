import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_transcript(transcript: str) -> dict:
    prompt = f"""
You are a privacy-first multilingual AI voice intelligence system.

Analyze the following transcript and return strictly structured JSON format representing a detailed meeting or recording analysis.
Estimate timestamps (format MM:SS) based on the relative logical progression of the discussion (e.g., 00:00 for Intro, 02:00 for the next topic, etc.) if true timestamps are missing.

Return EXACTLY the following JSON structure:
{{
  "summary": "Detailed overall summary of the recording.",
  "action_items": [
    {{
      "task": "Complete report",
      "responsible": "Priya",
      "deadline": "Monday"
    }}
  ],
  "sentiment": "Negative",
  "intensity": "8.5 / 10",
  "emotion_type": "Frustration",
  "sentiment_reasoning": "Reason behind this emotion.",
  "confidence_score": 88,
  "confidence_reasoning": "Clear urgency language.",
  "urgency": "High",
  "risk_level": "High",
  "risk_reasoning": "Missed deadline and tight budget constraints.",
  "topics": ["Project Planning", "Budget"],
  "keywords": ["Deadline", "Budget", "Deployment", "API", "Frustration"],
  "speaker_tasks": [
    {{
      "person": "Priya",
      "task": "Report"
    }},
    {{
      "person": "Arjun",
      "task": "Backend integration"
    }}
  ],
  "timeline": [
    {{
      "start_time": "00:00",
      "topic": "Introduction",
      "emotion": "Neutral",
      "reasoning": "Standard greeting"
    }},
    {{
      "start_time": "02:15",
      "topic": "Budget Discussion",
      "emotion": "Concern",
      "reasoning": "Discussing cost overruns"
    }}
  ]
}}

Transcript to analyze:
{transcript}

Rules:
1. "keywords" must be an array of top 10 most relevant single words or short phrases.
2. "timeline" must break the transcript down into 2-5 major sequential logical segments with estimated fake timestamps like 00:00, 02:15, 05:40 based on conversational flow if real ones don't exist.
3. "speaker_tasks" uses heuristic mapping even without true diarization to guess who does what (e.g. Person 1, Team, Specific names).
4. Return ONLY valid JSON block.
"""

    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2
    )

    try:
        content = response.choices[0].message.content
        if "```json" in content:
            content = content.split("```json")[1].split("```")[0].strip()
        elif "```" in content:
            content = content.split("```")[1].split("```")[0].strip()
        
        return json.loads(content)
    except Exception as e:
        return {
            "error": f"Failed to parse LLM output: {str(e)}",
            "raw_output": response.choices[0].message.content
        }
