from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .models import Question, Test, TestQuestion, Result, UserAnswer
from .serializers import (
    QuestionSerializer,
    ResultSerializer,
    UserAnswerSerializer
)

from resumes.models import Resume, ResumeSkill
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
# -----------------------------
# GENERATE TEST (USER SIDE)
# -----------------------------
class GenerateTestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, resume_id):

        # A valid token must never allow access to another candidate's resume.
        if not Resume.objects.filter(id=resume_id, user=request.user).exists():
            return Response({"detail": "Resume not found."}, status=status.HTTP_404_NOT_FOUND)

        skills = ResumeSkill.objects.filter(resume_id=resume_id)

        skill_names = [
            skill.skill.name
            for skill in skills
        ]

        generated_questions = generate_test(skill_names)
        test = Test.objects.create(
            user=request.user,
            title="Resume aptitude test",
            skills=", ".join(skill_names),
        )

        data = []

        for q in generated_questions:

            # AI-generated questions
            if isinstance(q, dict):
                category = str(q.get("category", "aptitude")).lower()
                valid_categories = {choice[0] for choice in Question.CATEGORY_CHOICES}
                category = category if category in valid_categories else "aptitude"
                try:
                    q = Question.objects.create(
                        question_text=q["question"], option1=q["option1"], option2=q["option2"],
                        option3=q["option3"], option4=q["option4"],
                        correct_answer=q["correct_answer"], category=category, difficulty="medium",
                    )
                except KeyError:
                    continue

            # Database questions
            TestQuestion.objects.get_or_create(test=test, question=q)
            data.append({
                "id": q.id, "question": q.question_text,
                "options": [q.option1, q.option2, q.option3, q.option4],
                "topic": q.category,
            })

        if not data:
            test.delete()
            return Response({"detail": "No valid questions could be generated."}, status=status.HTTP_502_BAD_GATEWAY)

        return Response({"test_id": test.id, "questions": data})
# -----------------------------
# SUBMIT TEST (CORE LOGIC)
# -----------------------------
class SubmitTestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        answers = request.data.get("answers", {})
        test_id = request.data.get("test_id")

        if not isinstance(answers, dict) or not test_id:
            return Response({"detail": "test_id and an answers object are required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            test = Test.objects.get(id=test_id, user=request.user)
        except Test.DoesNotExist:
            return Response({"detail": "Test not found."}, status=status.HTTP_404_NOT_FOUND)

        score = 0
        total = test.test_questions.count()

        # 🔥 FIX: attach user
        result = Result.objects.create(
            user=request.user,
            test=test,
            score=0,
            total_questions=total
        )

        for question_id, selected_answer in answers.items():

            try:
                question = Question.objects.get(id=question_id, testquestion__test=test)

                is_correct = (question.correct_answer == selected_answer)

                if is_correct:
                    score += 1

                UserAnswer.objects.create(
                    result=result,
                    question=question,
                    selected_answer=selected_answer,
                    is_correct=is_correct
                )

            except (Question.DoesNotExist, ValueError, TypeError):
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
