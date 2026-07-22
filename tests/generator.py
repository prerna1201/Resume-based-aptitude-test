import random

from .models import Question
from .ai.question_generator import generate_ai_questions


def generate_database_questions(skills):

    selected_questions = []

    for skill in skills:

        questions = list(
            Question.objects.filter(
                category=skill.lower()
            )
        )

        random.shuffle(questions)

        selected_questions.extend(
            questions[:5]
        )

    aptitude = list(
        Question.objects.filter(category="aptitude")
    )

    random.shuffle(aptitude)

    selected_questions.extend(
        aptitude[:10]
    )

    return selected_questions


def generate_test(skills):

    try:
        return generate_ai_questions(skills)

    except Exception as e:

        print("Gemini Error:", e)

        return generate_database_questions(skills)