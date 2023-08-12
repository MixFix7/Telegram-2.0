from django.contrib.auth.models import User
from django.db import models
from chats.models import Chat


class Message(models.Model):
    sender = models.ForeignKey(User, related_name='message', on_delete=models.SET_NULL, null=True)
    chat = models.ForeignKey(Chat, related_name='chat_message', on_delete=models.CASCADE, null=True)
    dispatch_date = models.DateTimeField(auto_now_add=True)
    type = models.CharField(max_length=10, default='Unknown')


class TextMessage(Message):
    title = models.TextField(default='', null=True, blank=True)

    def __str__(self):
        return f"Sender: {self.sender} to: {self.chat} text: {self.title} date: {self.dispatch_date}"


class ImageMessage(Message):
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return f"Sender: {self.sender} to: {self.chat} image: {self.image.name} date: {self.dispatch_date}"


class FileMessage(Message):
    file = models.FileField(null=True, blank=True)

    def __str__(self):
        return f"Sender: {self.sender} to: {self.chat} file: {self.file.name} date: {self.dispatch_date}"




