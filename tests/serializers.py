from rest_framework import serializers
from .models import Question, Result, UserAnswer


class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = "__all__"


class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = "__all__"


class UserAnswerSerializer(serializers.ModelSerializer):

    question = serializers.CharField(
        source="question.question_text",
        read_only=True
    )

    correct_answer = serializers.CharField(
        source="question.correct_answer",
        read_only=True
    )

    class Meta:
        model = UserAnswer
        fields = [
            "question",
            "selected_answer",
            "correct_answer",
            "is_correct",
        ]