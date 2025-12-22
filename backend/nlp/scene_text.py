from collections import Counter

def generate_scene_text(objects_detected):
    """
    Convert detected objects into a natural language scene description
    """

    if not objects_detected:
        return "The image does not contain any recognizable objects."

    labels = [obj["label"] for obj in objects_detected]
    counts = Counter(labels)

    phrases = []
    for label, count in counts.items():
        if count == 1:
            phrases.append(f"1 {label}")
        else:
            phrases.append(f"{count} {label}s")

    description = ", ".join(phrases)

    return f"The image contains {description}."