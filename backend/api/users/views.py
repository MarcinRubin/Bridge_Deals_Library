from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_protect, ensure_csrf_cookie
from rest_framework import generics, mixins, permissions, status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Profile
from .serializers import ProfileDirectoriesSerializer, UserSerializer


@method_decorator(ensure_csrf_cookie, name="dispatch")
class GetCSRFToken(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        return JsonResponse({"success": "CSRF token set"})


@method_decorator(csrf_protect, name="dispatch")
class UserRegistration(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


@method_decorator(csrf_protect, name="dispatch")
class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(request, email=email, password=password)

        if user and user.is_active:
            login(request, user)
            return Response(
                {"detail": "Logged in sucesfully.", "user": email},
                status=status.HTTP_200_OK,
            )

        return Response(
            {"detail": "Incorrect email or password"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class UserLogout(APIView):
    def post(self, request):
        logout(request)
        return Response(
            {"detail": "Logged out successfully."}, status=status.HTTP_200_OK
        )


class ActiveSession(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        if request.user.is_authenticated:
            return JsonResponse(
                {
                    "profile": request.user.profile.username,
                    "isAuthenticated": True,
                    "profile_pic": request.user.profile.image.url,
                }
            )
        return JsonResponse({"isAuthenticated": False})


class ProfileDirectoryView(generics.RetrieveUpdateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileDirectoriesSerializer

    def get_object(self):
        return self.request.user.profile
