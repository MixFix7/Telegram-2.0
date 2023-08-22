from django.contrib.auth.models import User
from django.db import models
from django.contrib.postgres.fields import ArrayField


class Chat(models.Model):
    interlocutor1 = models.ForeignKey(User, related_name='chat', on_delete=models.SET_NULL, null=True)
    interlocutor2 = models.ForeignKey(User, related_name='chat2', on_delete=models.SET_NULL, null=True)
    isDelete = models.BooleanField(default=False)

    def __str__(self):
        return f"Chat with {self.interlocutor1} & {self.interlocutor2}"



