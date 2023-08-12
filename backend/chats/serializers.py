from rest_framework import serializers
from .models import *


class ChatSerializer(serializers.Serializer):
    class Meta:
        model = Chat
        fields = ['interlocutor1', 'interlocutor2']

