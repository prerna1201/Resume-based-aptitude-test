from django.db import models
from django.contrib.auth.models import User


class Resume(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    resume = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username


class Skill(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class ResumeSkill(models.Model):
    resume = models.ForeignKey(
        Resume,
        on_delete=models.CASCADE
    )

    # 🔥 FIX: use ForeignKey instead of CharField
    skill = models.ForeignKey(
        Skill,
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.skill.name