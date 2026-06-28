from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Question, Result, UserAnswer
from .serializers import (
    QuestionSerializer,
    ResultSerializer,
    UserAnswerSerializer
)

from resumes.models import ResumeSkill
from .generator import generate_test


# -----------------------------
# QUESTION BANK (ADMIN SIDE)
# -----------------------------
class QuestionListCreateView(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated]


# -----------------------------
# GENERATE TEST (USER SIDE)
# -----------------------------
class GenerateTestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, resume_id):

        skills = ResumeSkill.objects.filter(resume_id=resume_id)

        skill_names = [
            skill.skill.name   # 🔥 FIXED (ForeignKey now)
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


# -----------------------------
# SUBMIT TEST (CORE LOGIC)
# -----------------------------
class SubmitTestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        answers = request.data.get("answers", {})

        score = 0
        total = len(answers)

        # 🔥 FIX: attach user
        result = Result.objects.create(
            user=request.user,
            score=0,
            total_questions=total
        )

        for question_id, selected_answer in answers.items():

            try:
                question = Question.objects.get(id=question_id)

                is_correct = (question.correct_answer == selected_answer)

                if is_correct:
                    score += 1

                UserAnswer.objects.create(
                    result=result,
                    question=question,
                    selected_answer=selected_answer,
                    is_correct=is_correct
                )

            except Question.DoesNotExist:
                pass

        result.score = score
        result.save()

        return Response({
            "score": score,
            "total_questions": total,
            "result_id": result.id
        })


# -----------------------------
# RESULT LIST (USER-SPECIFIC)
# -----------------------------
class ResultListView(generics.ListAPIView):
    serializer_class = ResultSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Result.objects.filter(
            user=self.request.user
        ).order_by("-submitted_at")


# -----------------------------
# RESULT DETAIL
# -----------------------------
class ResultDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, result_id):

        try:
            result = Result.objects.get(
                id=result_id,
                user=request.user   # 🔥 SECURITY FIX
            )

        except Result.DoesNotExist:
            return Response(
                {"error": "Result not found"},
                status=404
            )

        answers = UserAnswer.objects.filter(result=result)

        answer_serializer = UserAnswerSerializer(
            answers,
            many=True
        )

        percentage = (
            (result.score / result.total_questions) * 100
            if result.total_questions > 0 else 0
        )

        return Response({
            "result_id": result.id,
            "score": result.score,
            "total_questions": result.total_questions,
            "correct": result.score,
            "wrong": result.total_questions - result.score,
            "percentage": round(percentage, 2),
            "answers": answer_serializer.data
        })