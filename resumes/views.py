from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
import PyPDF2

from drf_spectacular.utils import extend_schema

from .models import Resume, ResumeSkill, Skill
from .serializers import ResumeSerializer
from .parser import extract_text_from_resume
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
        try:
            # Validate request
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)

            # Save resume with logged-in user
            resume = serializer.save(user=request.user)

            # Extract text from PDF
            text = extract_text_from_resume(resume.resume.path)

            print("=" * 80)
            print("Extracted Resume Text:")
            print(text)
            print("=" * 80)

            # Extract skills
            skills = extract_skills(text)
            print("Extracted Skills:")
            print(skills)

            # Save skills in database
            for skill_name in skills:
                skill_obj, created = Skill.objects.get_or_create(
                    name=skill_name.lower().strip()
                )

                ResumeSkill.objects.get_or_create(
                    resume=resume,
                    skill=skill_obj
                )

            # Success response
            return Response(
                {
                    "message": "Resume uploaded successfully",
                    "resume_id": resume.id,
                    "skills": skills,
                },
                status=status.HTTP_201_CREATED,
            )

        except (ValueError, PyPDF2.errors.PdfReadError) as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response(
                {
                    "error": str(e),
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
