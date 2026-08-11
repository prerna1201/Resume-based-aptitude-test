from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .serializers import RegisterSerializer

from rest_framework_simplejwt.tokens import RefreshToken


def user_payload(user):
    return {
        "user_id": user.id,
        "full_name": user.get_full_name().strip() or user.username,
        "email": user.email,
    }


# -------------------------
# REGISTER VIEW
# -------------------------
class RegisterView(APIView):

    def post(self, request):

        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        return Response({
            "message": "User created successfully",
            "user_id": user.id,
            "username": user.username,
            "email": user.email,
        }, status=status.HTTP_201_CREATED)


# -------------------------
# LOGIN VIEW (JWT)
# -------------------------
class LoginView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        user = authenticate(username=username, password=password)

        if user is None:
            return Response(
                {"error": "Invalid credentials"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": user_payload(user),
        })


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(user_payload(request.user))
