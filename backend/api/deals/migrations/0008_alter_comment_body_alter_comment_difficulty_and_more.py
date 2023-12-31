# Generated by Django 4.2.7 on 2023-12-06 14:54

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("deals", "0007_comment_directory_alter_comment_author"),
    ]

    operations = [
        migrations.AlterField(
            model_name="comment",
            name="body",
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="comment",
            name="difficulty",
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name="comment",
            name="tags",
            field=models.ManyToManyField(
                blank=True, null=True, related_name="tags", to="deals.tag"
            ),
        ),
    ]
