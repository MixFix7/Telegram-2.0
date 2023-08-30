import json

from .serializers import *
from .models import *

from message.models import Message
from message.serializers import MessageSerializer
from authorization.models import Profile

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer

import datetime

channel_layer = get_channel_layer()


class GetAllUserChatsAndMessagesConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

        username = self.scope['url_route']['kwargs']['username']
        self.room_group_name = f"user_{username}"

        Profile.objects.get(user__username=username)\
            .update(is_online=True, was_online=None)

    async def disconnect(self, close_code):
        username = self.scope['url_route']['kwargs']['username']

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

        Profile.objects.get(user__username=username)\
            .update(is_online=False, was_online=datetime.datetime.now())

    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            command = data['command']

            if command == 'subscribe':
                await self.subscribe()
            elif command == 'chat_message':
                await self.send_notification(
                    data['sender_name'],
                    data['recipient_name'],
                    data['chat_id']
                )

        except Exception as e:
            await self.send_error(str(e))

    async def subscribe(self):
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        await self.send(text_data=json.dumps({
            'command': 'subscribe', 'message': 'Subscribed to room'
        }))

    @database_sync_to_async
    def get_chat_messages(self, chat_id):
        chat = Chat.objects.get(id=chat_id)
        username = self.scope['url_route']['kwargs']['username']

        messages = Message.objects.filter(chat=chat)

        chat_json = ChatSerializer(chat).data
        messages_json = MessageSerializer(messages, many=True).data
        chat_json['messages'] = messages_json
        chat_json['last_message'] = messages_json[-1]
        chat_json['unread_messages'] = chat.unread_message_count(username=username)

        return chat_json

    async def add_message(self, text_data):
        try:
            data = json.loads(text_data)
            message_type = data.get('message_type')
            message_content = data.get('message_content')

            sender_account = User.objects.get(username=data['sender_name'])
            chat = Chat.objects.get(id=data['chat_id'])

            new_message = Message(
                sender=sender_account,
                chat=chat,
                type=message_type,
            )

            if message_type == 'Text':
                new_message.text = message_content
            elif message_type == 'Image':
                new_message.image = message_content
            elif message_type == 'File':
                new_message.file = message_content

            new_message.save()

        except Exception as e:
            return self.send_error({'message': str(e)})

    async def send_chat_data(self, data):

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




