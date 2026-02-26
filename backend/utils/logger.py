import json
import os
from datetime import datetime

# Use environment variable for log file path, fallback to local data directory
LOG_DIR = os.environ.get('LOG_DIR', 'data')
LOG_FILE = os.path.join(LOG_DIR, "scene_logs.jsonl")

# Ensure the log directory exists (may fail in some deployment environments)
try:
    os.makedirs(LOG_DIR, exist_ok=True)
except:
    # In deployment environments, we'll log to stdout instead
    LOG_FILE = None

def log_scene(scene_text: str, labels: dict):
    record = {
        "timestamp": datetime.utcnow().isoformat(),
        "scene_text": scene_text,
        "labels": labels
    }
    
    # If we can't write to file, log to stdout
    if LOG_FILE:
        try:
            with open(LOG_FILE, "a") as f:
                f.write(json.dumps(record) + "\n")
        except:
            # Fallback to stdout logging
            print(f"SCENE_LOG: {json.dumps(record)}")
    else:
        # Log to stdout for deployment environments
        print(f"SCENE_LOG: {json.dumps(record)}")