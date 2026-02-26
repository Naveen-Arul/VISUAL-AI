import os
import requests
from dotenv import load_dotenv

load_dotenv()
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")

def transcribe_audio(audio_bytes: bytes) -> str:
    url = "https://api.elevenlabs.io/v1/speech-to-text"

    headers = {
        "xi-api-key": ELEVENLABS_API_KEY or ""
    }

    files = {
        "file": ("audio.wav", audio_bytes, "audio/wav")
    }
    
    data = {
        "model_id": "scribe_v1"
    }

    response = requests.post(url, headers=headers, files=files, data=data)

    if response.status_code != 200:
        raise Exception(f"STT failed: {response.text}")

    return response.json().get("text", "")
