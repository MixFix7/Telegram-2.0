# Generated by Django 4.2.4 on 2023-08-12 18:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("message", "0002_message_chat_message_sender_message_type"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="imagemessage",
            name="message_ptr",
        ),
        migrations.RemoveField(
            model_name="textmessage",
            name="message_ptr",
        ),
        migrations.DeleteModel(
            name="FileMessage",
        ),
        migrations.DeleteModel(
            name="ImageMessage",
        ),
        migrations.DeleteModel(
            name="TextMessage",
        ),
    ]