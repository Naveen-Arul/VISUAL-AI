"""
LLaMA explainer module for generating human-readable explanations
of visual scenes based on structured analysis from CV, rules, and BERT.
"""

import os
from dotenv import load_dotenv
from groq import Groq

# Load environment variables from .env file
load_dotenv()

# Initialize Groq client
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

def build_llama_prompt(scene_text, rule_output, bert_output):
    """
    Build a prompt for LLaMA to generate scene explanations.
    
    Args:
        scene_text (str): Scene description text
        rule_output (dict): Output from rule-based analyzer
        bert_output (dict): Output from BERT classifier
        
    Returns:
        str: Formatted prompt for LLaMA
    """
    return f"""
You are an AI assistant that explains visual scenes clearly and professionally.
Do not guess objects. Do not hallucinate.

Scene description:
{scene_text}

Rule-based analysis:
- Environment: {rule_output['environment']}
- Activity: {rule_output['activity_context']}
- Human presence: {rule_output['human_presence']}

BERT prediction:
- Environment: {bert_output['environment']}
- Activity: {bert_output['activity_context']}
- Human presence: {bert_output['human_presence']}

Task:
Explain the scene in simple language.
Mention what is happening and any notable observations.

Note: If there is a difference between rule-based and BERT predictions, briefly explain why the difference may occur.
"""

def generate_explanation(prompt):
    """
    Generate explanation using LLaMA 3.1 8B Instant via Groq.
    
    Args:
        prompt (str): Formatted prompt for LLaMA
        
    Returns:
        str: Generated explanation
    """
    response = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": "You explain scenes clearly and accurately."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.3
    )

    return response.choices[0].message.content

def explain_scene(scene_text, rule_output, bert_output):
    """
    Generate a complete scene explanation using LLaMA.
    
    Args:
        scene_text (str): Scene description text
        rule_output (dict): Output from rule-based analyzer
        bert_output (dict): Output from BERT classifier
        
    Returns:
        str: Generated explanation
    """
    prompt = build_llama_prompt(scene_text, rule_output, bert_output)
    explanation = generate_explanation(prompt)
    return explanation