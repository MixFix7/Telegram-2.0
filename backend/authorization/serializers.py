from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import *
from chats.models import Chat
from django.db.models import Q


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['avatar'] = user.profile.avatar.url
        token['isAdmin'] = user.is_superuser
        token['phone'] = user.profile.phone_number
        token['chat_count'] = Chat.objects.filter(Q(interlocutor1=user) | Q(interlocutor2=user)).count()

        return token