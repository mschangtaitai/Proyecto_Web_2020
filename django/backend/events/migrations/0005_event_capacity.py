# Generated by Django 3.0.4 on 2020-06-03 01:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0004_remove_event_capacity'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='capacity',
            field=models.PositiveIntegerField(default=15),
            preserve_default=False,
        ),
    ]
