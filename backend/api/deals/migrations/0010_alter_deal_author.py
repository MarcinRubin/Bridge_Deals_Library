# Generated by Django 4.2.7 on 2023-12-07 00:28

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0004_alter_profile_directories"),
        ("deals", "0009_alter_comment_tags"),
    ]

    operations = [
        migrations.AlterField(
            model_name="deal",
            name="author",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="deals",
                to="users.profile",
            ),
        ),
    ]
