from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/get-all-user-chats-messages/', consumers.GetAllUserChatsAndMessagesConsumer.as_asgi())
]
