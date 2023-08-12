from django.contrib.auth.models import User
from django.db import models
from chats.models import Chat


class Message(models.Model):
    sender = models.ForeignKey(User, related_name='message', on_delete=models.SET_NULL, null=True)
    chat = models.ForeignKey(Chat, related_name='chat_message', on_delete=models.CASCADE, null=True)
    dispatch_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=10, default='Unknown')

    text = models.TextField(default='', null=True, blank=True)
    image = models.ImageField(null=True, blank=True)
    file = models.FileField(null=True, blank=True)

    def __str__(self):
        return f"Sender: {self.sender} to: {self.chat} {self.type}:  date: {self.dispatch_date}"




