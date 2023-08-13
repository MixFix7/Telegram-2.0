from rest_framework import serializers
from .models import Message
from chats.serializers import InterlocutorSerializer
import datetime


class MessageSerializer(serializers.ModelSerializer):
    sender = InterlocutorSerializer()

    class Meta:
        model = Message
        fields = '__all__'