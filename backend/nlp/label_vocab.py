"""
Label vocabulary definitions for BERT scene classification.
These vocabularies are frozen and should not be modified to ensure
consistent training and inference.
"""

# Environment labels
ENVIRONMENT_LABELS = {
    "Indoor – Residential": 0,
    "Indoor – Commercial": 1,
    "Indoor – Public": 2,
    "Urban Outdoor – Road": 3,
    "Urban Outdoor – Public Space": 4,
    "Urban Outdoor – Transport Hub": 5,
    "Suburban / Residential Outdoor": 6,
    "Rural Outdoor – Farming": 7,
    "Rural Outdoor – Open Land": 8,
    "Natural – Wildlife": 9,
    "Water / Coastal": 10,
    "Unknown": 11
}

# Activity context labels
ACTIVITY_LABELS = {
    "No Activity": 0,
    "Living / Daily Life": 1,
    "Working / Studying": 2,
    "Travel / Transportation": 3,
    "Leisure / Recreation": 4,
    "Shopping / Commercial": 5,
    "Farming Activity": 6,
    "Wildlife Activity": 7,
    "Unknown Activity": 8
}

# Human presence labels
HUMAN_PRESENCE_LABELS = {
    "No Humans": 0,
    "Single Human": 1,
    "Small Group": 2,
    "Group": 3,
    "Crowd": 4,
    "Dense Crowd": 5
}

# Reverse mappings for inference
ENVIRONMENT_IDS = {v: k for k, v in ENVIRONMENT_LABELS.items()}
ACTIVITY_IDS = {v: k for k, v in ACTIVITY_LABELS.items()}
HUMAN_PRESENCE_IDS = {v: k for k, v in HUMAN_PRESENCE_LABELS.items()}