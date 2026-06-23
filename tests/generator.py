from .models import Question
import random


def generate_test(skills):

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

    aptitude_questions = list(
        Question.objects.filter(
            category="aptitude"
        )
    )

    random.shuffle(aptitude_questions)

    selected_questions.extend(
        aptitude_questions[:10]
    )

    return selected_questions