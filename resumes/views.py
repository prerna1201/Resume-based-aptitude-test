from rest_framework import generics
from rest_framework.response import Response

from .models import Resume, ResumeSkill
from .serializers import ResumeSerializer

from .parser import extract_text_from_pdf
from .skills import extract_skills


class ResumeUploadView(generics.CreateAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer

    def create(self, request, *args, **kwargs):

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        resume = serializer.save()

        text = extract_text_from_pdf(
            resume.resume.path
        )

        skills = extract_skills(text)

        for skill in skills:
            ResumeSkill.objects.create(
                resume=resume,
                skill=skill
            )

        return Response({
            "message": "Resume uploaded successfully",
            "skills": skills
        })