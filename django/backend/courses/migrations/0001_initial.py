# Generated by Django 3.0.4 on 2020-06-01 08:59

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('careers', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('career', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='careers.Career')),
            ],
        ),
    ]
