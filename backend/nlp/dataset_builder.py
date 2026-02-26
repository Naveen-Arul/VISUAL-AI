"""
Dataset builder for converting auto-logged scene analysis data into BERT-ready samples.
This module reads JSONL logs, maps string labels to frozen numeric IDs, and produces
clean training samples for BERT multi-label classification.
"""

import json
import os
import sys
import pathlib

# Add the parent directory to the path to allow imports
sys.path.append(str(pathlib.Path(__file__).parent.parent))

from nlp.label_vocab import (
    ENVIRONMENT_LABELS,
    ACTIVITY_LABELS,
    HUMAN_PRESENCE_LABELS
)

def load_scene_logs(log_file_path):
    """
    Load scene analysis logs from JSONL file.
    
    Args:
        log_file_path (str): Path to the JSONL log file
        
    Returns:
        list: List of log entries as dictionaries
    """
    samples = []
    
    # Check if file exists
    if not os.path.exists(log_file_path):
        print(f"Warning: Log file {log_file_path} not found. Returning empty dataset.")
        return samples
    
    with open(log_file_path, "r") as f:
        for line in f:
            if line.strip():  # Skip empty lines
                samples.append(json.loads(line))
                
    return samples

def build_sample(log_entry):
    """
    Convert a single log entry into a BERT-ready sample.
    
    Args:
        log_entry (dict): A single log entry with scene_text and labels
        
    Returns:
        dict: BERT-ready sample with text and numeric labels
    """
    text = log_entry["scene_text"]
    labels = log_entry["labels"]
    
    return {
        "text": text,
        "environment_label": ENVIRONMENT_LABELS[labels["environment"]],
        "activity_label": ACTIVITY_LABELS[labels["activity_context"]],
        "human_presence_label": HUMAN_PRESENCE_LABELS[labels["human_presence"]]
    }

def build_dataset(log_file_path):
    """
    Build a complete BERT-ready dataset from scene analysis logs.
    
    Args:
        log_file_path (str): Path to the JSONL log file
        
    Returns:
        list: List of BERT-ready samples
    """
    logs = load_scene_logs(log_file_path)
    dataset = []
    
    for entry in logs:
        dataset.append(build_sample(entry))
        
    return dataset