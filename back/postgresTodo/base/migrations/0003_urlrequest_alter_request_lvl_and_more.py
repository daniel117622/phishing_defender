# Generated by Django 4.2.1 on 2023-11-05 18:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0002_rename_date_request_last_checked_request_lvl_and_more'),
    ]

    operations = [
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
        migrations.AlterField(
            model_name='request',
            name='lvl',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='request',
            name='vulnerable',
            field=models.BooleanField(default=True),
        ),
    ]
