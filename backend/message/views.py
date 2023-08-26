from django.http import FileResponse
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.views.generic import TemplateView
from .serializers import *
from .models import *
import os
from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from chats.models import Chat


class SendMessage(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            sender_username = request.data.get('sender_name')
            chat_id = request.data.get('chat_id')
            message_type = request.data.get('message_type')
            message_content = request.data.get('message_content') if message_type == 'Text' else request.FILES.get(
                'message_content')

            sender_account = User.objects.get(username=sender_username)
            chat = Chat.objects.get(id=chat_id)

            new_message = Message(
                sender=sender_account,
                chat=chat,
                type=message_type,
            )

            if message_type == 'Text':
                new_message.text = message_content
            elif message_type == 'Image':
                new_message.image = message_content
            else:
                new_message.file = message_content

            new_message.save()

            return Response({'message': 'message was sent successfully '})

        except Exception as e:
            return Response({'message': str(e)})


class ChangeMessage(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            message_id = request.data.get('message_id')
            changes = request.data.get('changes')

            message = Message.objects.get(id=message_id)

            if message.type != 'Text':
                return Response(
                    {'message': 'Unsupported a changed message type'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            message.text = changes
            message.save()

            return Response({'message': 'message was change successfully'})

        except Exception as e:
            return Response({'message': str(e)})


class DeleteMessage(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            message_id = request.data.get('message_id')
            print(message_id)

            message = Message.objects.get(id=message_id).delete()

            return Response({'message': 'message was deleted successfully'})

        except Exception as e:
            return Response({'message': str(e)})


