import json
import os

from channels.generic.websocket import AsyncWebsocketConsumer
from .serializers import *
from .models import *
from channels.db import database_sync_to_async
from django.conf import settings
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from message.models import Message
from message.serializers import MessageSerializer
from channels.layers import get_channel_layer
from django.db.models.signals import post_save
from django.dispatch import receiver
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

channel_layer = get_channel_layer()


class GetAllUserChatsAndMessagesConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        username = self.scope['url_route']['kwargs']['username']
        self.room_group_name = f"user_{username}"

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            command = data['command']

            if command == 'subscribe':
                await self.subscribe()
            elif command == 'chat_message':
                await self.send_notification(
                    data['sender_name'], data['recipient_name'], data['chat_id']
                )

            # all_chats_with_last_message = \
            #     await self.get_all_chats_with_last_message(
            #         self.scope['url_route']['kwargs**']['username']  # username
            #     )
            #
            # await self.send(all_chats_with_last_message)

        except Exception as e:
            await self.send_error(str(e))

    async def subscribe(self):
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.send(text_data=json.dumps({'command': 'subscribe', 'message': 'Subscribed to room'}))

    async def get_all_chats_with_last_message(self, username):
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

            all_chats_with_last_message.append(chat_json)

        return all_chats_with_last_message

    @database_sync_to_async
    def get_chat_messages(self, chat_id):
        chat = Chat.objects.get(id=chat_id)
        messages = Message.objects.filter(chat=chat)

        chat_json = ChatSerializer(chat).data
        messages_json = MessageSerializer(messages, many=True).data
        chat_json['messages'] = messages_json
        chat_json['last_message'] = messages_json[-1]

        return chat_json

    async def add_message(self, text_data):
        try:
            data = json.loads(text_data)
            sender_username = data.get('sender_name')
            chat_id = data.get('chat_id')
            message_type = data.get('message_type')
            message_content = data.get('message_content')

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

        except Exception as e:
            return self.send_error({'message': str(e)})

    async def send_chat_data(self, data):
        # await self.send(text_data=json.dumps({"data": data}))

        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat.update',
                'data': data
            }
        )

    async def send_notification(self, sender, recipient_username, chat_id):
        await self.channel_layer.group_send(
            f"user_{recipient_username}",
            {
                'type': 'chat.notification',
                'chat_id': chat_id,
                'message': 'You have a new message'
            }
        )
        await self.channel_layer.group_send(
            f"user_{sender}",
            {
                'type': 'chat.notification',
                'chat_id': chat_id,
                'message': 'You sent new message'
            }
        )

    async def send_error(self, message):
        await self.send(text_data=json.dumps({'error': message}))

    async def chat_notification(self, event):
        chat_id = event['chat_id']

        chat_data = await self.get_chat_messages(chat_id)

        await self.send(text_data=json.dumps({
            'type': 'chat.notification',
            'command': 'update_chat',
            'data': chat_data,
        }))





