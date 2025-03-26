# Generated by Django 5.1.7 on 2025-03-26 11:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('rollnumber', models.CharField(max_length=10, unique=True)),
                ('cgpa', models.FloatField()),
            ],
        ),
    ]
