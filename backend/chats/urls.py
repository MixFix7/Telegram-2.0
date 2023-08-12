from django.urls import path
from .views import *

urlpatterns = [
    path('get-all-chats-and-messages/', GetAllUserChatsAndMessages.as_view()),
    path('get-all-user-chats/', GetAllUserChats.as_view()),
    path('get-chat-messages/', GetChatMessages.as_view()),
    path('start-new-chat/', StartNewChat.as_view()),
    path('delete-chat/', DeleteChat.as_view()),
]