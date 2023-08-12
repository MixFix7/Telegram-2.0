from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from django.contrib.auth import login, authenticate
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from .models import *


class SignUpJWT(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        avatar = request.FILES.get('avatar')

        user = User.objects.create_user(username=username, email=email, password=password)
        profile = Profile.objects.create(user=user, avatar=avatar)
        profile.save()

        refresh_token = RefreshToken.for_user(user)
        access_token = MyTokenObtainPairSerializer.get_token(user)

        return Response({
            'refresh': str(refresh_token),
            'access': str(access_token.token)
        })


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer







