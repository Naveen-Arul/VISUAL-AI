"""
Enhanced rule-based scene analyzer that interprets object detection results
across multiple semantic dimensions for comprehensive scene understanding.
"""

# Object group definitions for detailed environment classification
INDOOR_RESIDENTIAL_OBJECTS = {
    "bed", "sofa", "couch", "chair", "dining table", "tv",
    "laptop", "keyboard", "mouse", "remote",
    "refrigerator", "microwave", "oven", "toaster",
    "sink", "toilet", "mirror", "clock", "book", "vase"
}

INDOOR_COMMERCIAL_OBJECTS = {
    "laptop", "chair", "table", "monitor", "keyboard", "mouse",
    "desk", "office chair", "computer", "printer"
}

INDOOR_PUBLIC_OBJECTS = {
    "bench", "chair", "book"
}

ROAD_INFRASTRUCTURE_OBJECTS = {
    "car", "bus", "truck", "motorcycle",
    "traffic light", "stop sign",
    "parking meter", "fire hydrant"
}

PUBLIC_SPACE_OBJECTS = {
    "bench", "umbrella", "bicycle"
}

TRANSPORT_HUB_OBJECTS = {
    "train", "bus"
}

SUBURBAN_OUTDOOR_OBJECTS = {
    "dog", "cat", "bicycle"
}

FARMING_OBJECTS = {
    "cow", "sheep", "goat", "horse"
}

WILDLIFE_OBJECTS = {
    "elephant", "deer", "bear", "zebra", "giraffe", "bird"
}

WATER_COASTAL_OBJECTS = {
    "boat"
}

# Animal classifications
DOMESTIC_ANIMALS = {"dog", "cat"}
FARM_ANIMALS = {"cow", "sheep", "goat", "horse"}
WILD_ANIMALS = {"elephant", "deer", "bear", "zebra", "giraffe", "bird"}

def extract_labels(objects_detected):
    """Extract labels from CV output"""
    return [obj["label"] for obj in objects_detected]

def analyze_environment_detailed(labels):
    """Analyze detailed environment type with priority order"""
    # Check for indoor environments first
    has_residential_indicators = any(label in INDOOR_RESIDENTIAL_OBJECTS for label in labels)
    has_commercial_indicators = any(label in INDOOR_COMMERCIAL_OBJECTS for label in labels)
    has_public_indicators = any(label in INDOOR_PUBLIC_OBJECTS for label in labels)
    
    # Check for outdoor environments
    has_road_infrastructure = any(label in ROAD_INFRASTRUCTURE_OBJECTS for label in labels)
    has_public_space_objects = any(label in PUBLIC_SPACE_OBJECTS for label in labels)
    has_transport_hub_objects = any(label in TRANSPORT_HUB_OBJECTS for label in labels)
    has_suburban_objects = any(label in SUBURBAN_OUTDOOR_OBJECTS for label in labels)
    has_farming_objects = any(label in FARMING_OBJECTS for label in labels)
    has_wildlife_objects = any(label in WILDLIFE_OBJECTS for label in labels)
    has_water_objects = any(label in WATER_COASTAL_OBJECTS for label in labels)
    
    # People presence
    person_count = labels.count("person")
    has_person = person_count > 0
    
    # Vehicle presence
    vehicle_objects = {"car", "bus", "truck", "motorcycle", "train", "boat"}
    has_vehicles = any(label in vehicle_objects for label in labels)
    
    # Indoor classification (highest priority)
    if has_residential_indicators and not has_commercial_indicators:
        return "Indoor – Residential"
    elif has_commercial_indicators:
        return "Indoor – Commercial"
    elif has_public_indicators and has_person:
        return "Indoor – Public"
    
    # Outdoor classifications
    elif has_road_infrastructure:
        return "Urban Outdoor – Road"
    elif has_transport_hub_objects and (person_count > 3 or has_vehicles):
        return "Urban Outdoor – Transport Hub"
    elif has_public_space_objects and has_person:
        return "Urban Outdoor – Public Space"
    elif has_suburban_objects and has_person and not has_road_infrastructure:
        return "Suburban / Residential Outdoor"
    elif has_farming_objects and has_person:
        return "Rural Outdoor – Farming"
    elif has_farming_objects and not has_person and not has_vehicles:
        return "Rural Outdoor – Open Land"
    elif has_wildlife_objects and not has_person and not has_vehicles:
        return "Natural – Wildlife"
    elif has_water_objects:
        return "Water / Coastal"
    
    # Default outdoor if people present
    elif has_person:
        return "Outdoor"
    
    # Unknown if no clear indicators
    else:
        return "Unknown"

def analyze_human_presence(labels):
    """Analyze detailed human presence with expanded categories"""
    person_count = labels.count("person")

    if person_count == 0:
        return "No Humans"
    elif person_count == 1:
        return "Single Human"
    elif 2 <= person_count <= 3:
        return "Small Group"
    elif 4 <= person_count <= 6:
        return "Group"
    elif 7 <= person_count <= 12:
        return "Crowd"
    else:
        return "Dense Crowd"

def analyze_activity_context(labels):
    """Analyze activity context based on object combinations"""
    has_person = "person" in labels
    has_laptop = "laptop" in labels
    has_car = "car" in labels
    has_dog = "dog" in labels
    has_cat = "cat" in labels
    has_farm_animals = any(label in FARM_ANIMALS for label in labels)
    has_wild_animals = any(label in WILD_ANIMALS for label in labels)
    
    # Count total animals
    animal_count = sum([
        labels.count(animal) for animal_list in [DOMESTIC_ANIMALS, FARM_ANIMALS, WILD_ANIMALS] 
        for animal in animal_list if animal in labels
    ])
    
    # Determine activity based on object combinations
    if has_person and has_laptop:
        return "Working / Studying"
    elif has_person and has_car:
        return "Travel / Transportation"
    elif has_person and (has_dog or has_cat):
        return "Living / Daily Life"
    elif has_person and has_farm_animals:
        return "Farming Activity"
    elif not has_person and animal_count > 0:
        return "Wildlife Activity"
    elif has_person:
        return "Unknown Activity"
    else:
        return "No Activity"

def analyze_animals_detailed(labels):
    """Analyze detailed animal context"""
    has_domestic = any(label in DOMESTIC_ANIMALS for label in labels)
    has_farm = any(label in FARM_ANIMALS for label in labels)
    has_wild = any(label in WILD_ANIMALS for label in labels)

    if sum([has_domestic, has_farm, has_wild]) > 1:
        return "Mixed Animal Context"
    elif has_wild:
        return "Wild Animals"
    elif has_farm:
        return "Farm Animals"
    elif has_domestic:
        return "Domestic Animals"
    else:
        return "No Animals"

def analyze_infrastructure(labels):
    """Analyze infrastructure context"""
    has_road_infrastructure = any(label in ROAD_INFRASTRUCTURE_OBJECTS for label in labels)
    has_public_infrastructure = "bench" in labels
    has_commercial_infrastructure = any(label in INDOOR_COMMERCIAL_OBJECTS for label in labels)
    has_residential_infrastructure = any(label in INDOOR_RESIDENTIAL_OBJECTS for label in labels)
    
    if has_road_infrastructure:
        return "Road Infrastructure"
    elif has_commercial_infrastructure:
        return "Commercial Infrastructure"
    elif has_residential_infrastructure:
        return "Residential Infrastructure"
    elif has_public_infrastructure:
        return "Public Infrastructure"
    else:
        return "No Infrastructure"

def analyze_complexity_detailed(objects_detected):
    """Analyze scene complexity based on unique object types and total detections"""
    labels = extract_labels(objects_detected)
    unique_object_types = len(set(labels))
    total_detections = len(labels)
    
    # Combine both metrics for complexity assessment
    complexity_score = unique_object_types + (total_detections // 3)
    
    if complexity_score <= 2:
        return "Minimal"
    elif complexity_score <= 4:
        return "Simple"
    elif complexity_score <= 7:
        return "Moderate"
    elif complexity_score <= 10:
        return "Complex"
    else:
        return "Very Complex"

def analyze_attention_level(labels):
    """Analyze scene risk/attention level"""
    person_count = labels.count("person")
    vehicle_count = sum(labels.count(vehicle) for vehicle in ["car", "bus", "truck", "motorcycle"])
    
    # High activity: crowds with vehicles
    if person_count >= 5 and vehicle_count >= 2:
        return "High Activity"
    # Attention required: dense crowds
    elif person_count >= 7:
        return "Attention Required"
    # Normal: everything else
    else:
        return "Normal"

def analyze_scene(objects_detected):
    """
    Main function to analyze a scene from object detection results
    
    Returns:
        dict: Comprehensive analysis results across multiple semantic dimensions
    """
    labels = extract_labels(objects_detected)

    environment = analyze_environment_detailed(labels)
    human_presence = analyze_human_presence(labels)
    activity_context = analyze_activity_context(labels)
    animal_context = analyze_animals_detailed(labels)
    infrastructure = analyze_infrastructure(labels)
    scene_complexity = analyze_complexity_detailed(objects_detected)
    attention_level = analyze_attention_level(labels)
    
    # Also include person count for additional context
    person_count = labels.count("person")

    return {
        "environment": environment,
        "human_presence": human_presence,
        "activity_context": activity_context,
        "animal_context": animal_context,
        "infrastructure": infrastructure,
        "scene_complexity": scene_complexity,
        "attention_level": attention_level,
        "person_count": person_count
    }