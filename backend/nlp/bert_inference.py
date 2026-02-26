"""
BERT inference module for scene classification.
Provides functions to load a trained model and make predictions
on scene text, with decoding of label IDs to human-readable labels.
"""

import torch
from transformers import BertTokenizer

from nlp.bert_model import MultiHeadBERTClassifier
from nlp.label_vocab import (
    ENVIRONMENT_IDS,
    ACTIVITY_IDS,
    HUMAN_PRESENCE_IDS
)

def load_model(model_path=None):
    """
    Load BERT model for inference.
    
    Args:
        model_path (str, optional): Path to saved model weights
        
    Returns:
        MultiHeadBERTClassifier: Loaded model in evaluation mode
    """
    model = MultiHeadBERTClassifier()

    if model_path:
        model.load_state_dict(torch.load(model_path, map_location="cpu"))

    model.eval()
    return model

def predict_scene(scene_text, model, tokenizer):
    """
    Predict scene labels from scene text using the BERT model.
    
    Args:
        scene_text (str): Scene description text
        model (MultiHeadBERTClassifier): Trained BERT model
        tokenizer (BertTokenizer): BERT tokenizer
        
    Returns:
        dict: Human-readable predictions for each classification head
    """
    # Tokenize the input text
    inputs = tokenizer(
        scene_text,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=64
    )

    # Make prediction
    with torch.no_grad():
        outputs = model(
            input_ids=inputs["input_ids"],
            attention_mask=inputs["attention_mask"]
        )

    # Get predicted class indices
    env_id = torch.argmax(outputs["environment_logits"], dim=1).item()
    act_id = torch.argmax(outputs["activity_logits"], dim=1).item()
    human_id = torch.argmax(outputs["human_presence_logits"], dim=1).item()

    # Decode IDs to human-readable labels
    return {
        "environment": ENVIRONMENT_IDS[env_id],
        "activity_context": ACTIVITY_IDS[act_id],
        "human_presence": HUMAN_PRESENCE_IDS[human_id]
    }

def compare_with_rule_based(scene_text, objects_detected=None):
    """
    Compare BERT predictions with rule-based analyzer output.
    
    Args:
        scene_text (str): Scene description text
        objects_detected (list, optional): List of detected objects for rule-based analysis
        
    Returns:
        dict: Comparison between rule-based and BERT predictions
    """
    # Import here to avoid circular imports
    from nlp.scene_text import generate_scene_text
    from nlp.scene_analyzer import analyze_scene
    
    # If objects_detected is not provided, try to parse from scene text
    if objects_detected is None:
        objects_detected = []
        
        # Simple parsing for processing purposes
        if "person" in scene_text or "persons" in scene_text:
            # Extract number of persons
            import re
            person_matches = re.findall(r'(\d+)\s+persons?', scene_text)
            if person_matches:
                count = int(person_matches[0])
                objects_detected.extend([{"label": "person"}] * count)
            else:
                objects_detected.append({"label": "person"})
                
        if "car" in scene_text or "cars" in scene_text:
            # Extract number of cars
            import re
            car_matches = re.findall(r'(\d+)\s+cars?', scene_text)
            if car_matches:
                count = int(car_matches[0])
                objects_detected.extend([{"label": "car"}] * count)
            else:
                objects_detected.append({"label": "car"})
    
    # Get rule-based analysis
    rule_based_result = analyze_scene(objects_detected)
    
    # Get BERT prediction
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    model = load_model()
    bert_prediction = predict_scene(scene_text, model, tokenizer)
    
    return {
        "rule_based": {
            "environment": rule_based_result["environment"],
            "activity_context": rule_based_result["activity_context"],
            "human_presence": rule_based_result["human_presence"]
        },
        "bert_prediction": bert_prediction
    }