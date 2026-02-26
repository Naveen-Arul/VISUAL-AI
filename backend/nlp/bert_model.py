"""
Multi-head BERT model for scene classification.
Implements a shared BERT encoder with three classification heads:
- Environment classification (12 classes)
- Activity classification (9 classes) 
- Human presence classification (6 classes)
"""

import torch
import torch.nn as nn
from transformers import BertModel, BertTokenizer
from nlp.label_vocab import ENVIRONMENT_LABELS, ACTIVITY_LABELS, HUMAN_PRESENCE_LABELS

class MultiHeadBERTClassifier(nn.Module):
    """
    Multi-head BERT classifier for scene understanding.
    
    Uses a shared BERT encoder with three separate classification heads
    for environment, activity, and human presence prediction.
    """
    
    def __init__(self, model_name='bert-base-uncased'):
        """
        Initialize the multi-head BERT classifier.
        
        Args:
            model_name (str): Name of the pre-trained BERT model to use
        """
        super(MultiHeadBERTClassifier, self).__init__()
        
        # Load pre-trained BERT model and tokenizer
        self.bert = BertModel.from_pretrained(model_name)
        self.tokenizer = BertTokenizer.from_pretrained(model_name)
        
        # Freeze BERT parameters (optional, can be unfrozen for fine-tuning)
        # for param in self.bert.parameters():
        #     param.requires_grad = False
            
        # Get the hidden size of BERT embeddings
        hidden_size = self.bert.config.hidden_size  # 768 for bert-base-uncased
        
        # Define classification heads
        self.environment_classifier = nn.Linear(hidden_size, len(ENVIRONMENT_LABELS))
        self.activity_classifier = nn.Linear(hidden_size, len(ACTIVITY_LABELS))
        self.human_presence_classifier = nn.Linear(hidden_size, len(HUMAN_PRESENCE_LABELS))
        
        # Dropout for regularization
        self.dropout = nn.Dropout(0.1)
        
    def forward(self, input_ids, attention_mask, env_labels=None, act_labels=None, human_labels=None):
        """
        Forward pass through the multi-head BERT classifier.
        
        Args:
            input_ids (torch.Tensor): Tokenized input sequences
            attention_mask (torch.Tensor): Attention mask for input sequences
            env_labels (torch.Tensor, optional): Environment labels for loss calculation
            act_labels (torch.Tensor, optional): Activity labels for loss calculation
            human_labels (torch.Tensor, optional): Human presence labels for loss calculation
            
        Returns:
            dict: Logits for each classification head and optional loss
        """
        # Pass through BERT encoder
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        
        # Use the [CLS] token representation for classification
        pooled_output = outputs.last_hidden_state[:, 0, :]  # [batch_size, hidden_size]
        
        # Apply dropout
        pooled_output = self.dropout(pooled_output)
        
        # Pass through each classification head
        environment_logits = self.environment_classifier(pooled_output)
        activity_logits = self.activity_classifier(pooled_output)
        human_presence_logits = self.human_presence_classifier(pooled_output)
        
        result = {
            'environment_logits': environment_logits,
            'activity_logits': activity_logits,
            'human_presence_logits': human_presence_logits
        }
        
        # Calculate loss if labels are provided
        if env_labels is not None and act_labels is not None and human_labels is not None:
            loss_fct = nn.CrossEntropyLoss()
            
            environment_loss = loss_fct(environment_logits, env_labels)
            activity_loss = loss_fct(activity_logits, act_labels)
            human_presence_loss = loss_fct(human_presence_logits, human_labels)
            
            # Total loss is sum of all individual losses
            total_loss = environment_loss + activity_loss + human_presence_loss
            
            result['loss'] = total_loss
            result['environment_loss'] = environment_loss
            result['activity_loss'] = activity_loss
            result['human_presence_loss'] = human_presence_loss
        
        return result
    
    def predict(self, text):
        """
        Predict labels for a given text input.
        
        Args:
            text (str or list): Input text(s) to classify
            
        Returns:
            dict: Predicted labels for each classification head
        """
        # Handle single string input
        if isinstance(text, str):
            text = [text]
            
        # Tokenize input text
        encoded = self.tokenizer(
            text,
            padding=True,
            truncation=True,
            max_length=512,
            return_tensors='pt'
        )
        
        # Get predictions
        with torch.no_grad():
            outputs = self.forward(
                encoded['input_ids'], 
                encoded['attention_mask']
            )
            
        # Convert logits to predicted class indices
        environment_preds = torch.argmax(outputs['environment_logits'], dim=1)
        activity_preds = torch.argmax(outputs['activity_logits'], dim=1)
        human_presence_preds = torch.argmax(outputs['human_presence_logits'], dim=1)
        
        return {
            'environment': environment_preds,
            'activity': activity_preds,
            'human_presence': human_presence_preds
        }