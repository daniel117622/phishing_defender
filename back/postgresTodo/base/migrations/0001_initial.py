# Generated by Django 4.2.7 on 2023-11-09 20:49

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Publicacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('last_updated', models.DateTimeField(auto_now_add=True)),
                ('description', models.CharField(max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='URLRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=200)),
                ('last_checked', models.DateTimeField(auto_now_add=True)),
                ('vulnerable', models.BooleanField(default=True)),
                ('lvl', models.IntegerField(default=0)),
            ],
        ),
    ]
