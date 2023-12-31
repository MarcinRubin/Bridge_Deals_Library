# Generated by Django 4.2.7 on 2023-11-20 00:45

import deals.validators
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("deals", "0003_rename_visiblity_deal_visibility"),
    ]

    operations = [
        migrations.AlterField(
            model_name="deal",
            name="deal_info",
            field=models.JSONField(validators=[deals.validators.validate_deal]),
        ),
        migrations.AlterField(
            model_name="deal",
            name="name",
            field=models.CharField(max_length=100, unique=True),
        ),
    ]
