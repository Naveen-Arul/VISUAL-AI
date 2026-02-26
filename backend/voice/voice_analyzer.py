import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def analyze_transcript(transcript: str) -> dict:
    prompt = f"""
You are a privacy-first multilingual AI voice intelligence system.

Analyze transcript and return structured JSON.

Example:
Transcript:
"Priya will complete the report by Monday. We are behind schedule and this is urgent."

Output:
{{
  "summary": "Priya will complete the report by Monday. The team is behind schedule and considers the task urgent.",
  "action_items": [
    {{
      "task": "Complete report",
      "responsible": "Priya",
      "deadline": "Monday"
    }}
  ],
  "sentiment": "Negative",
  "sentiment_reasoning": "Phrase 'behind schedule' indicates stress.",
  "confidence_score": 88,
  "confidence_reasoning": "Clear urgency language supports negative sentiment.",
  "urgency": "High",
  "topics": ["Project Planning"]
}}

Now analyze:
{transcript}

Return JSON only.
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
