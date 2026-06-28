from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView,
)


def home(request):
    return HttpResponse(
        "Resume Aptitude Platform Backend Running 🚀"
    )


urlpatterns = [

    path(
        '',
        home,
        name='home'
    ),

    path(
        'admin/',
        admin.site.urls
    ),

    path(
        'api/users/',
        include('users.urls')
    ),

    path(
        'api/resumes/',
        include('resumes.urls')
    ),

    path(
        'api/tests/',
        include('tests.urls')
    ),

    # OpenAPI Schema
    path(
        'api/schema/',
        SpectacularAPIView.as_view(),
        name='schema',
    ),

    # Swagger UI
    path(
        'swagger/',
        SpectacularSwaggerView.as_view(url_name='schema'),
        name='swagger-ui',
    ),

    # ReDoc UI
    path(
        'redoc/',
        SpectacularRedocView.as_view(url_name='schema'),
        name='redoc',
    ),

]


if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )