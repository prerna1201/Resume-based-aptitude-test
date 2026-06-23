from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Question, Result
from .serializers import QuestionSerializer

from resumes.models import ResumeSkill
from .generator import generate_test
from .evaluation import calculate_score


class QuestionListCreateView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


class GenerateTestView(APIView):

    def get(self, request, resume_id):

        skills = ResumeSkill.objects.filter(
            resume_id=resume_id
        )

        skill_names = [
            skill.skill
            for skill in skills
        ]

        questions = generate_test(skill_names)

        data = []

        for q in questions:
            data.append({
                "id": q.id,
                "question": q.question_text,
                "option1": q.option1,
                "option2": q.option2,
                "option3": q.option3,
                "option4": q.option4,
                "category": q.category
            })

        return Response(data)


class SubmitTestView(APIView):

    def post(self, request):

        answers = request.data.get("answers", {})

        score, total = calculate_score(
            answers
        )

        result = Result.objects.create(
            score=score,
            total_questions=total
        )

        return Response({
            "score": score,
            "total_questions": total,
            "result_id": result.id
        })