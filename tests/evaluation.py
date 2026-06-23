# tests/evaluation.py

from .models import Question


def calculate_score(answers):

    score = 0

    total = len(answers)

    for question_id, selected_answer in answers.items():

        try:
            question = Question.objects.get(id=question_id)

            if question.correct_answer == selected_answer:
                score += 1

        except Question.DoesNotExist:
            pass

    return score, total