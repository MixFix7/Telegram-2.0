from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class InterlocutorSerializer(serializers.ModelSerializer):
    avatar = serializers.CharField(source='profile.avatar', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar']


class ChatSerializer(serializers.ModelSerializer):
    interlocutor1 = InterlocutorSerializer()
    interlocutor2 = InterlocutorSerializer()

    class Meta:
        model = Chat
        fields = ['id', 'interlocutor1', 'interlocutor2']

