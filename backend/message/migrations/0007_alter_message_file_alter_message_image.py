# Generated by Django 4.0.1 on 2023-08-28 10:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('message', '0006_message_file_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='file',
            field=models.FileField(blank=True, null=True, upload_to='files_messages'),
        ),
        migrations.AlterField(
            model_name='message',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='images_message'),
        ),
    ]
