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

from .func import define_file_type
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes


class SendMessage(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            sender_username = request.data.get('sender_name')
            chat_id = request.data.get('chat_id')
            content = request.data.get('message_content')
            files = request.FILES.getlist('message_files')

            sender_account = User.objects.get(username=sender_username)
            chat = Chat.objects.get(id=chat_id)

            filed = ''

            for file in files:
                file_type = define_file_type(file.name)
                filed = file_type

                new_message = Message(
                    sender=sender_account,
                    chat=chat,
                )

                if not files:
                    new_message.type = 'Text'
                    new_message.text = content
                    new_message.save()
                else:
                    new_message.type = file_type
                    if file_type == 'Image':
                        new_message.image = file
                    if file_type == 'Video' or file_type == 'File':
                        new_message.file = file
                        if new_message.type == 'File':
                            new_message.file_name = file.name
                    new_message.text = content if content else None
                    new_message.save()

            return Response({'message': filed})

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

            message = Message.objects.get(id=message_id).delete()

            return Response({'message': 'message was deleted successfully'})

        except Exception as e:
            return Response({'message': str(e)})


