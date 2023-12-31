# Generated by Django 4.2.7 on 2023-12-06 14:41

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0003_profile_directories"),
        ("deals", "0006_alter_comment_tags_alter_tournament_series"),
    ]

    operations = [
        migrations.AddField(
            model_name="comment",
            name="directory",
            field=models.CharField(default="other", max_length=100),
        ),
        migrations.AlterField(
            model_name="comment",
            name="author",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="users.profile"
            ),
        ),
    ]
