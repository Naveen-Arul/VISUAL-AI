from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from voice.stt_service import transcribe_audio
from voice.voice_analyzer import analyze_transcript
from voice.tts_service import text_to_speech

router = APIRouter(prefix="/voice", tags=["Voice Intelligence"])

class TranscriptRequest(BaseModel):
    transcript: str

class TTSRequest(BaseModel):
    text: str

@router.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):
    audio_bytes = await file.read()
    transcript = transcribe_audio(audio_bytes)
    return {"transcript": transcript}

@router.post("/analyze")
def analyze(request: TranscriptRequest):
    result = analyze_transcript(request.transcript)
    return result

@router.post("/tts")
def tts(request: TTSRequest):
    audio_base64 = text_to_speech(request.text)
    return {"audio_base64": audio_base64}
