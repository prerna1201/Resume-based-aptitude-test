from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("tests", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="test",
            name="user",
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name="tests", to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="result",
            name="user",
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name="results", to=settings.AUTH_USER_MODEL),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name="TestQuestion",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("question", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to="tests.question")),
                ("test", models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name="test_questions", to="tests.test")),
            ],
        ),
        migrations.AddConstraint(
            model_name="testquestion",
            constraint=models.UniqueConstraint(fields=("test", "question"), name="unique_test_question"),
        ),
    ]
