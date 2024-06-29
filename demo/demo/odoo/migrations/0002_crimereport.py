# Generated by Django 5.0.6 on 2024-06-29 06:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('odoo', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CrimeReport',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField()),
                ('number', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=254)),
                ('location', models.CharField(max_length=255)),
                ('crime_type', models.CharField(max_length=100)),
            ],
        ),
    ]