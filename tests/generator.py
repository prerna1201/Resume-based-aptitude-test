import random

from .models import Question
from .ai.question_generator import generate_ai_questions


DEFAULT_QUESTIONS = [
    {
        "question": "What is 15% of 200?", "option1": "20", "option2": "25",
        "option3": "30", "option4": "35", "correct_answer": "30", "category": "aptitude",
    },
    {
        "question": "Which SQL statement retrieves data from a table?", "option1": "INSERT",
        "option2": "SELECT", "option3": "UPDATE", "option4": "DELETE",
        "correct_answer": "SELECT", "category": "sql",
    },
]


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
        questions = generate_ai_questions(skills)
        if not isinstance(questions, list) or not questions:
            raise ValueError("The AI returned no questions")
        return questions

    except Exception as e:

        print("Gemini Error:", e)

        return generate_database_questions(skills) or DEFAULT_QUESTIONS
