from django.urls import path, include
from .views import *

urlpatterns = [
    path('chats/', include('chats.urls')),
    path('messages/', include('message.urls')),
]
