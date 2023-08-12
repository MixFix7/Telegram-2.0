from django.urls import path
from .views import *

urlpatterns = [
    path('all-chats-and-messages/', GetAllUserChatsAndMessages.as_view()),
    path('all-user-chats/', GetAllUserChats.as_view()),
    path('chat-messages/', GetChatMessages.as_view()),
    path('start-new-chat/', StartNewChat.as_view()),
    path('delete-chat/', DeleteChat.as_view()),
]