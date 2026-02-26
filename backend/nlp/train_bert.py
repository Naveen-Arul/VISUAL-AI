"""
Training skeleton for multi-head BERT scene classifier.
This is a minimal, safe, CPU-friendly training pipeline that proves:
- Dataset format correctness
- Tokenization works
- Model forward pass works
- Loss computation works
- Multi-head learning works
"""

import torch
from torch.utils.data import DataLoader
from torch.optim import AdamW

from transformers import BertTokenizer

from nlp.bert_model import MultiHeadBERTClassifier
from nlp.bert_dataset import SceneClassificationDataset
from nlp.dataset_builder import build_dataset

def load_training_data():
    """
    Load training data from scene logs.
    
    Returns:
        list: List of BERT-ready samples
    """
    data = build_dataset("../data/scene_logs.jsonl")
    return data

def main():
    """
    Main training function - minimal skeleton to prove correctness.
    """
    print("Loading training data...")
    data = load_training_data()
    
    if not data:
        print("No training data found. Please run the system to generate some data first.")
        return
    
    print(f"Loaded {len(data)} samples")
    
    # Initialize tokenizer
    print("Initializing tokenizer...")
    tokenizer = BertTokenizer.from_pretrained("bert-base-uncased")
    
    # Create dataset and dataloader
    print("Creating dataset and dataloader...")
    dataset = SceneClassificationDataset(data, "bert-base-uncased", max_length=64)
    
    # Use small batch size for CPU safety
    loader = DataLoader(
        dataset,
        batch_size=2,  # Small batch for skeleton
        shuffle=True
    )
    
    # Initialize model
    print("Initializing model...")
    model = MultiHeadBERTClassifier()
    model.train()
    
    # Initialize optimizer
    print("Initializing optimizer...")
    optimizer = AdamW(model.parameters(), lr=2e-5)
    
    # Training loop - just 2 epochs for skeleton
    print("Starting training loop...")
    for epoch in range(2):  # just 2 epochs for skeleton
        total_loss = 0
        batch_count = 0
        
        for batch in loader:
            optimizer.zero_grad()
            
            input_ids = batch["input_ids"]
            attention_mask = batch["attention_mask"]
            
            env_labels = batch["environment_label"]
            act_labels = batch["activity_label"]
            human_labels = batch["human_presence_label"]
            
            # Forward pass with labels for loss calculation
            outputs = model(
                input_ids=input_ids,
                attention_mask=attention_mask,
                env_labels=env_labels,
                act_labels=act_labels,
                human_labels=human_labels
            )
            
            loss = outputs["loss"]
            loss.backward()
            optimizer.step()
            
            total_loss += loss.item()
            batch_count += 1
            
            # Print progress for each batch
            print(f"  Batch {batch_count} | Loss: {loss.item():.4f}")
        
        avg_loss = total_loss / batch_count if batch_count > 0 else 0
        print(f"Epoch {epoch+1} | Average Loss: {avg_loss:.4f}")
    
    print("Training skeleton completed successfully!")
    print("Model is officially trainable.")

if __name__ == "__main__":
    main()