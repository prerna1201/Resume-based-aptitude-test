from django.contrib import admin
from .models import Question, Test, Result

admin.site.register(Question)
admin.site.register(Test)
admin.site.register(Result)