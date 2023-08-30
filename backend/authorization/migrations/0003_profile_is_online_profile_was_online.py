# Generated by Django 4.0.1 on 2023-08-30 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authorization', '0002_profile_phone_number'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='is_online',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='profile',
            name='was_online',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]