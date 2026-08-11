import re

from .models import Skill

def extract_skills(text):
    """
    Extract technical skills using NLTK preprocessing
    and the Skill database table.
    """

    cleaned_text = text.lower()

    # Read skills from database
    skills = Skill.objects.values_list("name", flat=True)

    found_skills = []

    for skill in skills:
        # Boundaries avoid matching a short skill inside an unrelated word.
        if re.search(r"(?<!\w)" + re.escape(skill.lower()) + r"(?!\w)", cleaned_text):
            found_skills.append(skill)

    return sorted(set(found_skills))
