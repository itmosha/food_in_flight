# Generated by Django 4.1.7 on 2023-05-07 12:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0009_remove_productcategory_icon_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='tg_notified',
            field=models.BooleanField(default=False),
        ),
    ]