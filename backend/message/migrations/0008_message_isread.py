# Generated by Django 4.0.1 on 2023-08-29 13:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0007_alter_message_file_alter_message_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='message',
            name='isRead',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
