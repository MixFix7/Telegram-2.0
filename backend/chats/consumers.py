import json
from channels.generic.websocket import AsyncWebsocketConsumer
from .serializers import *
from .models import *
import os
from channels.db import database_sync_to_async
from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from message.models import Message
from message.serializers import MessageSerializer


class GetAllUserChatsAndMessagesConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            username = data.get('username')

            all_chats_with_last_message = await self.get_all_chats_with_last_message(username)

            await self.send_chat_data(all_chats_with_last_message)

        except Exception as e:
            await self.send_error(str(e))

    @database_sync_to_async
    def get_all_chats_with_last_message(self, username):
        all_chats_with_last_message = []

        all_chats = Chat.objects.filter(
            Q(interlocutor1__username=username) | Q(interlocutor2__username=username)
        )
        for chat in all_chats:
            messages = Message.objects.filter(chat=chat)
            chat_json = ChatSerializer(chat).data
            messages_json = MessageSerializer(messages, many=True).data
            chat_json['message'] = messages_json
            chat_json['last_messages'] = messages_json[-1]

        return all_chats_with_last_message

    async def send_chat_data(self, data):
        await self.send(text_data=json.dumps({'data': data}))

    async def send_error(self, message):
        await self.send(text_data=json.dumps({'error': message}))


