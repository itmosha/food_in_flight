# Generated by Django 4.1.6 on 2023-03-11 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_order_alter_product_options_alter_product_title_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='state',
            field=models.CharField(choices=[('PENDING', 'Ожидает оплаты'), ('PAID', 'Оплачен'), ('COOKING', 'Готовится'), ('DELIVERING', 'В доставке'), ('DELIVERED', 'Доставлен'), ('CANCELED', 'Отменен')], default='PENDING', max_length=10),
        ),
    ]
