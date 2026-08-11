from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [("resumes", "0001_initial")]

    operations = [
        migrations.AddConstraint(
            model_name="resumeskill",
            constraint=models.UniqueConstraint(fields=("resume", "skill"), name="unique_resume_skill"),
        ),
    ]
