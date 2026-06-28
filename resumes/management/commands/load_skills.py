from django.core.management.base import BaseCommand
from resumes.models import Skill
from resumes.skill_data import SKILLS


class Command(BaseCommand):
    help = "Load skills into database"

    def handle(self, *args, **kwargs):
        count = 0

        for skill in SKILLS:
            _, created = Skill.objects.get_or_create(name=skill)
            if created:
                count += 1

        self.stdout.write(
            self.style.SUCCESS(f"{count} skills loaded successfully!")
        )