# Generated by Django 5.0.6 on 2024-06-29 08:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('odoo', '0004_crimereport_user_agent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='crimereport',
            name='number',
            field=models.CharField(max_length=255),
        ),
    ]
