"""
Dataset class for BERT scene classification training.
Handles tokenization and batching of scene text data with multi-label targets.
"""

import torch
from torch.utils.data import Dataset, DataLoader
from transformers import BertTokenizer

class SceneClassificationDataset(Dataset):
    """
    Dataset class for scene classification with BERT.
    Handles tokenization of text and conversion of labels to tensors.
    """
    
    def __init__(self, samples, model_name='bert-base-uncased', max_length=512):
        """
        Initialize the dataset.
        
        Args:
            samples (list): List of dictionaries with 'text' and label fields
            model_name (str): Name of the BERT model for tokenizer
            max_length (int): Maximum sequence length for tokenization
        """
        self.samples = samples
        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        self.max_length = max_length
        
    def __len__(self):
        """Return the number of samples in the dataset."""
        return len(self.samples)
    
    def __getitem__(self, idx):
        """
        Get a single sample from the dataset.
        
        Args:
            idx (int): Index of the sample to retrieve
            
        Returns:
            dict: Dictionary containing input_ids, attention_mask, and labels
        """
        sample = self.samples[idx]
        
        # Tokenize the text
        encoding = self.tokenizer(
            sample['text'],
            truncation=True,
            padding='max_length',
            max_length=self.max_length,
            return_tensors='pt'
        )
        
        # Return the tokenized inputs and labels
        return {
            'input_ids': encoding['input_ids'].flatten(),
            'attention_mask': encoding['attention_mask'].flatten(),
            'environment_label': torch.tensor(sample['environment_label'], dtype=torch.long),
            'activity_label': torch.tensor(sample['activity_label'], dtype=torch.long),
            'human_presence_label': torch.tensor(sample['human_presence_label'], dtype=torch.long)
        }

# Example usage (commented out for now)
# if __name__ == "__main__":
#     # This would be used in conjunction with dataset_builder
#     # from dataset_builder import build_dataset
#     # samples = build_dataset("../data/scene_logs.jsonl")
#     # dataset = SceneClassificationDataset(samples)
#     # dataloader = DataLoader(dataset, batch_size=4, shuffle=True)
#     pass