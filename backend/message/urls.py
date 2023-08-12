from django.urls import path
from .views import *

urlpatterns = [
    path('send-message/', SendMessage.as_view()),
    path('change-message/', ChangeMessage.as_view()),
    path('delete-message/', DeleteMessage.as_view()),
]