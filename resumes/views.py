from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from drf_spectacular.utils import extend_schema

from .models import Resume, ResumeSkill, Skill
from .serializers import ResumeSerializer
from .parser import extract_text_from_pdf
from .skills import extract_skills


@extend_schema(
    request=ResumeSerializer,
    responses={201: ResumeSerializer},
)
class ResumeUploadView(generics.CreateAPIView):
    queryset = Resume.objects.all()
    serializer_class = ResumeSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        # your existing code
        ...

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Attach logged-in user
        resume = serializer.save(user=request.user)

        # Extract text from uploaded PDF
        text = extract_text_from_pdf(resume.resume.path)

        # Extract skills
        skills = extract_skills(text)

        # Save skills
        for skill_name in skills:

            skill_obj, created = Skill.objects.get_or_create(
                name=skill_name.lower().strip()
            )

            ResumeSkill.objects.create(
                resume=resume,
                skill=skill_obj
            )

        # Return response AFTER all skills are saved
        return Response({
            "message": "Resume uploaded successfully",
            "resume_id": resume.id,
            "skills": skills
        })