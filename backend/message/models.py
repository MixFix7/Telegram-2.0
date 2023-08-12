from django.db import models

class Message(models.Model):
    dispatch_date = models.DateTimeField(auto_now_add=True)


class TextMessage(Message):
    title = models.TextField(default='', null=True, blank=True)

    def __str__(self):
        return f"{self.title} {self.dispatch_date}"


class ImageMessage(Message):
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return f"{self.image.name} {self.dispatch_date}"


class FileMessage(Message):
    file = models.FileField(null=True, blank=True)

    def __str__(self):
        return f"{self.file.name} {self.dispatch_date}"




