from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken


# -------------------------
# REGISTER VIEW
# -------------------------
class RegisterView(APIView):

    def post(self, request):

        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "username and password required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "User already exists"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = User.objects.create_user(
            username=username,
            password=password
        )

        return Response({
            "message": "User created successfully",
            "user_id": user.id
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
        })