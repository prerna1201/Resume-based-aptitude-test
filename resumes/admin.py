from django.contrib import admin
from .models import Resume, ResumeSkill, Skill

admin.site.register(Resume)
admin.site.register(ResumeSkill)
admin.site.register(Skill)