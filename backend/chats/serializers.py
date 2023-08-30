from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class InterlocutorSerializer(serializers.ModelSerializer):
    avatar = serializers.CharField(source='profile.avatar', read_only=True)
    phoneNumber = serializers.CharField(source='profile.phone_number', read_only=True)
    is_online = serializers.BooleanField(source='profile.is_online', read_only=True)
    was_online = serializers.DateTimeField(source='profile.was_online', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar', 'phoneNumber', 'is_online', 'was_online']


class ChatSerializer(serializers.ModelSerializer):
    interlocutor1 = InterlocutorSerializer()
    interlocutor2 = InterlocutorSerializer()

    class Meta:
        model = Chat
        fields = ['id', 'interlocutor1', 'interlocutor2']