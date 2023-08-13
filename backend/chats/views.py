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
from message.models import Message
from message.serializers import MessageSerializer


class GetAllUserChatsAndMessages(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            username = request.data.get('username')

            all_chats_and_all_messages = []
            all_chats = Chat.objects.filter(Q(interlocutor1_username=username) | Q(interlocutor2_name=username))

            for chat in all_chats:
                chat_messages = Message.objects.filter(chat=chat)

                chat_json = ChatSerializer(chat).data
                chat_messages_json = MessageSerializer(chat_messages, many=True).data
                chat_json['messages'] = chat_messages_json

                all_chats_and_all_messages.append(chat_json)

            return Response(all_chats_and_all_messages, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'message': e})


class GetAllUserChats(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            username = request.data.get('username')

            all_chats_with_last_message = []
            all_chats = Chat.objects.filter(Q(interlocutor1__username=username) | Q(interlocutor2__username=username))

            for chat in all_chats:
                last_message = Message.objects.filter(chat=chat).last()

                chat_json = ChatSerializer(chat).data
                last_message_json = MessageSerializer(last_message).data
                chat_json['last_message'] = last_message_json

                all_chats_with_last_message.append(chat_json)

            return Response(all_chats_with_last_message, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'message': str(e)})


class GetChatMessages(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            chat_id = request.data.get('chat_id')

            chat = Chat.objects.get(id=chat_id)
            messages = Message.objects.filter(chat=chat)

            chat_json = ChatSerializer(chat).data
            messages_json = MessageSerializer(messages, many=True).data
            chat_json['messages'] = messages_json

            return Response({chat_json}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'message': e})


class StartNewChat(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            interlocutor1_username = request.data.get('interlocutor1_username')
            interlocutor2_username = request.data.get('interlocutor2_username')

            interlocutor1_account = User.objects.get(username=interlocutor1_username)
            interlocutor2_account = User.objects.get(username=interlocutor2_username)

            new_chat = Chat.objects.create(
                interlocutor1=interlocutor1_account,
                interlocutor2=interlocutor2_account
            )

            return Response({'message': 'chat was created successfully'}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({'message': e})


class DeleteChat(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        try:

            interlocutor_username = request.data.get('username')
            chat_id = request.data.get('chat_id')

            interlocutor = User.objects.get(username=interlocutor_username)

            chat = Chat.objects\
                .get(Q(interlocutor1=interlocutor) | Q(interlocutor2=interlocutor))\
                .delete()

            return Response({'message': 'chat was deleted successfully'})

        except Exception as e:
            return Response({'message': e})







