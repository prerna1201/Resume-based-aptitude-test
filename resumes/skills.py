import string

from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords

from .models import Skill

STOP_WORDS = set(stopwords.words("english"))


def extract_skills(text):
    """
    Extract technical skills using NLTK preprocessing
    and the Skill database table.
    """

    text = text.lower()

    tokens = word_tokenize(text)

    cleaned_tokens = [
        token
        for token in tokens
        if token not in STOP_WORDS and token not in string.punctuation
    ]

    cleaned_text = " ".join(cleaned_tokens)

    # Read skills from database
    skills = Skill.objects.values_list("name", flat=True)

    found_skills = []

    for skill in skills:
        if skill.lower() in cleaned_text:
            found_skills.append(skill)

    return sorted(set(found_skills))